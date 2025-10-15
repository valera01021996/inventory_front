import { api } from "../auth/baseQuery";
import type { LocationList, RackList, RegionList, SiteList } from "types/geo";
import type { UploadPagination } from "types/api";

const geoWithTags = api.enhanceEndpoints({
    addTagTypes: ["Region", "Site", "Location", "Rack"],
});

type SearchParams = {
    is_active?: boolean;
} & Partial<UploadPagination>;

export const geoAPI = geoWithTags.injectEndpoints({
    endpoints: build => ({
        // ------------------- Region -------------------
        fetchRegions: build.query<RegionList, SearchParams>({
            query: params => ({
                url: "/geo/regions/",
                method: "GET",
                params,
            }),
            providesTags: () => ["Region"],
        }),

        // ------------------- Site -------------------
        fetchSites: build.query<SiteList, SearchParams>({
            query: params => ({
                url: "/geo/sites/",
                method: "GET",
                params,
            }),
            providesTags: () => ["Site"],
        }),

        // ------------------- Location -------------------
        fetchLocations: build.query<LocationList, SearchParams>({
            query: params => ({
                url: "/geo/locations/",
                method: "GET",
                params,
            }),
            providesTags: () => ["Location"],
        }),

        // ------------------- Rack -------------------
        fetchRacks: build.query<RackList, SearchParams>({
            query: params => ({
                url: "/geo/racks/",
                method: "GET",
                params,
            }),
            providesTags: () => ["Rack"],
        }),
    }),
});

export const {
    useFetchRegionsQuery,
    useFetchSitesQuery,
    useFetchLocationsQuery,
    useFetchRacksQuery,
} = geoAPI;
