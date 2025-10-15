import type { DeviceList, DiskList } from "types/device";
import { api } from "../auth/baseQuery";
import type { UploadPagination } from "types/api";

const deviceWithTags = api.enhanceEndpoints({
    addTagTypes: ["Device", "Disk"],
});

type SearchParams = {
    region?: number;
    device_type?: number;
    role?: number;
    rack?: number;
    platform?: number;
    search?: string;

    device?: number;
    raid_controller?: string;
} & Partial<UploadPagination>;

export const deviceAPI = deviceWithTags.injectEndpoints({
    endpoints: build => ({
        // ------------------- Device -------------------
        fetchDevices: build.query<DeviceList, SearchParams>({
            query: params => ({
                url: "/devices/devices/",
                method: "GET",
                params,
            }),
            providesTags: () => ["Device"],
        }),
        uploadDevice: build.mutation<unknown, { file: string }>({
            query: data => ({
                url: "/devices/devices/import-xlsx/",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Device"],
        }),

        // ------------------- Disk -------------------
        fetchDisks: build.query<DiskList, SearchParams>({
            query: params => ({
                url: "/devices/disks/",
                method: "GET",
                params,
            }),
            providesTags: () => ["Disk"],
        }),
    }),
});

export const {
    useFetchDevicesQuery,
    useUploadDeviceMutation,
    useFetchDisksQuery,
} = deviceAPI;
