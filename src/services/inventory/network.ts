import { api } from "../auth/baseQuery";
import type { UploadPagination } from "types/api";
import type { NetworkList, IPAddressList } from "types/network";

const networkWithTags = api.enhanceEndpoints({
    addTagTypes: ["IP", "Network"],
});

type SearchParams = {
    device?: number;
    network?: number;
    vlan?: number;
    search?: string;
} & Partial<UploadPagination>;

export const networkAPI = networkWithTags.injectEndpoints({
    endpoints: build => ({
        // ------------------- Network -------------------
        fetchNetworks: build.query<NetworkList, SearchParams>({
            query: params => ({
                url: "/networks/networks/",
                method: "GET",
                params,
            }),
            providesTags: () => ["Network"],
        }),

        // ------------------- IP -------------------
        fetchIpAddresses: build.query<IPAddressList, SearchParams>({
            query: params => ({
                url: "/networks/device-ip-addresses/",
                method: "GET",
                params,
            }),
            providesTags: () => ["IP"],
        }),
    }),
});

export const {
    useFetchNetworksQuery,
    useFetchIpAddressesQuery,
} = networkAPI;
