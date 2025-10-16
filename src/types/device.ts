import type { ResultList } from "./api";
import type { LocationDTO, RackDTO, SiteDTO } from "./geo";
import type { IPAddressDTO } from "./network";

// ------------------- Device -------------------
export interface DeviceDTO {
    id: number;
    device_id: string;
    device_type: DeviceType;
    rack: RackDTO;
    platform: {
        id: number;
        name: string;
    };
    role: {
        id: number;
        name: string;
    };
    location: LocationDTO;
    memory_modules: MemoryModuleDTO[];
    ip_addresses: IPAddressDTO[];
    power_units: PowerUnitsDTO[];
    processors: ProcessorDTO[];
    disks: DiskDTO[];
    fans: FanDTO[];
    site: SiteDTO;
    name: string;
    height: number;
    position: number;
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
    device: number;
    disk_id: string;
    disk_model: string;
    size: number;
    disk_type: string;
    interface: string;
    serial_number: string;
    position: string;
    controller: string;
    status: string;
}

export interface FanDTO {
    id: number;
    device: number;
    fan_name: string;
    speed_rpm: number;
    percentage: string;
    location: string;
    status: string;
    state: string;
}

export interface MemoryModuleDTO {
    id: number;
    device: number;
    slot: string;
    size: number;
    memory_type: string;
    frequency_mhz: string;
    manufacturer: string;
    status: string;
}

export interface PowerUnitsDTO {
    id: number;
    device: number;
    power_unit_name: string;
    model: string;
    serial_number: string;
    manufacturer: string;
    power_watts: number;
    current_load_watts: number;
    firmware_version: string;
    status: string;
    state: string;
}

export interface ProcessorDTO {
    id: number;
    device: number;
    cpu_id: string;
    cpu_model: string;
    manufacturer: string;
    number_of_cors: number;
    threads: number;
    frequency: number;
    status: string;
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
