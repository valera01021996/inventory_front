// src/types/inventory.ts

export interface LocationDetailTile {
    title: string;
    count: string;
    status: string;
}

export interface Location {
    id: string;
    name: string;
    status: string;
    free_racks: string | null;
    ip_address: string;
    details_tiles: LocationDetailTile[];
}

export interface PduConnection {
    port: string;
    pdu: string;
    status: 'Включен' | 'Выключен';
}

export interface NetworkConnection {
    name: string;
    link: string;
    status: 'Включен' | 'Выключен';
}

export interface Server {
    id: string;
    name: string;
    ip: string;
    mac: string;
    config: string;
    platform: string;
    host: string;
    // --- ADDED MISSING PROPERTY ---
    owner: string; 
    // -----------------------------
    location: string;
    rack_location: string;
    bmc_ip: string;
    os: string;
    status: 'Включен' | 'Выключен' | 'Ошибка';
    details?: {
        bmc: {
            version: string;
            status: 'Включен' | 'Выключен';
        };
        pdus: PduConnection[];
        networks: NetworkConnection[];
    };
}

export interface InventoryData {
    locations: Location[];
    servers: Server[];
    racks: Rack[];
}

export interface RootState {
    inventory: {
        selectedLocationId: string;
    };
}

export interface RackUnit {
    unit: number; // The unit number (e.g., 1, 2, 42)
    name: string; // Name of the equipment/server (e.g., "Big server 2", "APC PDU 2")
    type: 'server' | 'switch' | 'pdu' | 'reserved' | 'empty'; // Type of equipment
    u_size: number; // Number of units occupied by this equipment
    status: 'ok' | 'warning' | 'error';
    reserved_until?: string; // Date if type is 'reserved'
}

export interface Rack {
    id: string;
    locationId: string;
    name: string; // e.g., "Main rack", "Rack 1"
    unit_height: number; // e.g., 42U
    occupied_u: number; // U used
    free_u: string; // Free space description (e.g., "3 свободно")
    total_devices: number;
    ip_pool: string; // e.g., "HA"
    note: string;
    utilization_percent: number; // e.g., 92
    // Rack visualization data
    units: RackUnit[];
}