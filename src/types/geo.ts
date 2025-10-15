import type { ResultList } from "./api";

// ------------------- Region -------------------
export interface RegionDTO {
    id: number;
    name: string;
}

export type RegionList = ResultList<RegionDTO>;

// ------------------- Site -------------------
export interface SiteDTO {
    id: number;
    name: string;
    region: number;
}

export type SiteList = ResultList<SiteDTO>;

// ------------------- Location -------------------
export interface LocationDTO {
    id: number;
    name: string;
    site: number;
}

export type LocationList = ResultList<LocationDTO>;

// ------------------- Rack -------------------
export interface RackDTO {
    id: number;
    name: string;
    location: number;
}

export type RackList = ResultList<RackDTO>;
