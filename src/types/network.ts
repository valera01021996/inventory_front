import type { ResultList } from "./api";

// ------------------- Network -------------------
export interface NetworkDTO {
    id: number;
    name: string;
    gateway: string;
    prefix_len: number;
    vlan: number;
}

export type NetworkList = ResultList<NetworkDTO>;

// ------------------- IP address -------------------
export interface IPAddressDTO {
    id: number;
    ip: string;
    device: number;
    network: NetworkDTO;
}

export type IPAddressList = ResultList<IPAddressDTO>;
