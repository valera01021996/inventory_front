import type { ResultList } from "./api";
import type { RackDTO } from "./geo";
import type { IPAddressDTO } from "./network";

// ------------------- Device -------------------
export interface DeviceDTO {
    id: number;
    device_id: string;
    device_type: DeviceType;
    disks: DiskDTO[];
    ip_addresses: IPAddressDTO[];
    rack: RackDTO;
    platform: {
        id: number;
        name: string;
    };
    role: {
        id: number;
        name: string;
    };
    location: {
        id: number;
        name: string;
        site: number;
    };
    site: {
        id: number;
        name: string;
        region: number;
    };
    name: string;
    height: number;
    position: number;
    fan: string;
    psu: string;
    cpu_model: string;
    cpu_count: number;
    ram: number;
    serial_number: string;
}

export type DeviceList = ResultList<DeviceDTO>;

// ------------------- Disk -------------------
export interface DiskDTO {
    id: number;
    size: number;
    device: number;
    disk_model: string;
    raid_controller: string;
}

export type DiskList = ResultList<DiskDTO>;

// ------------------- Device type -------------------
export interface DeviceType {
    id: number;
    name: string;
    manufacturer: {
        id: number;
        name: string;
    };
}
