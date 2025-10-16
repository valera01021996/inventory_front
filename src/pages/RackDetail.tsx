import { useMemo } from "react";
import { useParams } from "react-router";
import { useFetchDevicesQuery } from "services/index";

interface VisualDevice {
    id: number;
    name: string;
    height: number;
    position: number;
    roleName: string; 
    manufacturerName: string;
    deviceTypeName: string;
}

const getDeviceColor = (roleName: string) => {
    // Assigning distinct colors based on common roles for better visual differentiation
    switch (roleName.toLowerCase()) {
        case 'nginx':
        case 'clickhouse':
            return 'bg-blue-300 hover:bg-blue-400 text-blue-900'; // Servers/Compute
        case 'switch':
            return 'bg-green-300 hover:bg-green-400 text-green-900'; // Networking
        default:
            return 'bg-gray-300 hover:bg-gray-400 text-gray-900'; // Default/Other
    }
};

/**
 * Component to render the rack visualization column.
 */
const RackVisualization = ({ unitMap, unit_height }: { unitMap: Map<number, VisualDevice>, unit_height: number }) => {
    let currentU = 1;
    const visualizationUnits = [];

    // Build the visualization from bottom (U1) to top (U42)
    while (currentU <= unit_height) {
        const unitData = unitMap.get(currentU);

        if (unitData) {
            // --- OCCUPIED UNIT LOGIC ---
            const { name, height, roleName, manufacturerName, deviceTypeName } = unitData;
            const colorClass = getDeviceColor(roleName);
            const content = `${name} (${height}U)`;

            visualizationUnits.push(
                <div
                    key={currentU}
                    style={{ height: `${height * 20}px` }} // Each unit is 20px high
                    className={`w-full ${colorClass} font-medium text-xs border-b border-gray-600/30 flex items-center justify-start px-2 py-1 cursor-pointer transition-colors duration-150 relative group shadow-inner rounded-sm`}
                >
                    {/* Device Label */}
                    {content}
                    
                    {/* Tooltip for detailed info on hover */}
                    <div className="absolute left-full top-0 ml-2 p-2 bg-gray-800 text-white rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 w-64 pointer-events-none">
                        <p className="font-bold text-sm">{name}</p>
                        <p className="text-xs text-gray-300">{roleName} ({height}U)</p>
                        <p className="text-xs text-gray-400 mt-1">
                            {manufacturerName} {deviceTypeName}
                        </p>
                    </div>
                </div>
            );
            currentU += height; // Skip units occupied by this equipment
        } else {
            // --- EMPTY SLOT LOGIC ---
            let emptyUSize = 0;
            let nextU = currentU;

            // Look ahead to find the size of the contiguous empty slot
            while (nextU <= unit_height && !unitMap.has(nextU)) {
                emptyUSize += 1;
                nextU += 1;
            }

            // Render the empty slot as one block
            visualizationUnits.push(
                <div
                    key={currentU}
                    style={{ height: `${emptyUSize * 20}px` }}
                    className="w-full bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 flex items-center justify-center text-xs text-gray-500 relative"
                >
                    {emptyUSize >= 2 && <span className="opacity-70">{emptyUSize}U свободно</span>}
                </div>
            );
            currentU += emptyUSize; // Move the counter past the entire empty slot
        }
    }

    // Reverse the array to display bottom-up (U1 at the bottom)
    return (
        <div className="flex flex-col-reverse items-center relative h-full">
            {visualizationUnits}
        </div>
    );
};

// --- 4. Main Component ---

const RackDetail = () => {
    const { rackId } = useParams<{ rackId: string }>();    
    const totalUnits = 42; // Standard rack height

    const { data: servers } = useFetchDevicesQuery({ rack: rackId }, { skip: !rackId });

    const unitMap = useMemo(() => {
        const map = new Map<number, VisualDevice>();
        servers?.results.forEach(d => {
            if (d.position >= 1 && d.position <= totalUnits) {
                map.set(d.position, {
                    id: d.id,
                    name: d.name,
                    height: d.height,
                    position: d.position,
                    roleName: d.role.name,
                    manufacturerName: d.device_type.manufacturer.name,
                    deviceTypeName: d.device_type.name,
                });
            }
        });
        return map;
    }, [servers]);

    // The fixed height for the rack and markers (20px per U)
    const visualizationHeight = totalUnits * 20;

    return (
        <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-inter">
            <div className="w-full lg:w-2/3 p-4 sm:p-8 bg-gray-100 dark:bg-gray-950 flex justify-center overflow-auto">
                <div className="flex space-x-2 items-start pt-10">
                    {/* Left U markers */}
                    <div 
                        className="flex flex-col-reverse text-right text-sm text-gray-500 dark:text-gray-400 font-mono pr-2"
                        style={{ height: `${visualizationHeight}px` }}
                    >
                        {/* Array from 1 to unit_height. flex-col-reverse places U1 at the bottom. */}
                        {Array.from({ length: totalUnits }, (_, i) => i + 1).map(u => (
                            <div key={`left-${u}`} className="h-5 flex items-center justify-end font-bold">{u}</div>
                        ))}
                    </div>
                    
                    {/* Rack Body Visualization */}
                    <div 
                        className="w-96 border-4 border-gray-700 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-md shadow-2xl relative"
                        style={{ height: `${visualizationHeight}px`, minHeight: '840px' }}
                    >
                        {/* Title/Label for the visualization */}
                        <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Стойка спереди
                        </div>
                        <RackVisualization 
                            unitMap={unitMap} 
                            unit_height={totalUnits} 
                        />
                    </div>

                    {/* Right U markers */}
                    <div 
                        className="flex flex-col-reverse text-left text-sm text-gray-500 dark:text-gray-400 font-mono pl-2"
                        style={{ height: `${visualizationHeight}px` }}
                    >
                        {/* Array from 1 to unit_height. flex-col-reverse places U1 at the bottom. */}
                        {Array.from({ length: totalUnits }, (_, i) => i + 1).map(u => (
                            <div key={`right-${u}`} className="h-5 flex items-center justify-start font-bold">{u}</div>
                        ))}
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default RackDetail;
