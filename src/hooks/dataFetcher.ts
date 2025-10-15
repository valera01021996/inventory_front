// src/api/dataFetcher.ts
import type { InventoryData, Location, Rack, Server } from "../types/inventory";
import locationsData from "../db/locations.json";
import serversData from "../db/servers.json";
import racksData from "../db/racks.json";

// Simulate a delay for API fetch
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// NOTE: We assume the locations.json and servers.json are correctly typed
// by casting them to the defined interfaces.
const allLocations: Location[] = locationsData as Location[];
const allServers: Server[] = serversData as Server[];
const allRacks: Rack[] = racksData as Rack[]; // <-- Type cast new rack data

/**
 * Simulates fetching all inventory data.
 * @returns A promise resolving to the structured inventory data.
 */
export const fetchInventoryData = async (): Promise<InventoryData> => {
    await delay(300); // Uncomment to test loading state
    return {
        locations: allLocations,
        servers: allServers,
        racks: allRacks, 
    };
};

// Exporting individual lists for easier direct consumption in simple components
export const getLocations = () => allLocations;
export const getServers = () => allServers;
export const getRacks = () => allRacks;
