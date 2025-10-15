import React, { useMemo } from 'react';
import { useParams } from 'react-router';
import { getRacks } from '../hooks/dataFetcher';
import type { RackUnit } from '../types/inventory';

// Utility to determine background color for rack units
const getUnitColor = (unitType: RackUnit['type']) => {
    switch (unitType) {
        case 'server': return 'bg-blue-300 hover:bg-blue-400';
        case 'switch': return 'bg-green-300 hover:bg-green-400';
        case 'pdu': return 'bg-yellow-300 hover:bg-yellow-400';
        case 'reserved': return 'bg-purple-300 hover:bg-purple-400';
        default: return 'bg-white';
    }
};


const RackDetailPage: React.FC = () => {
    const { rackId } = useParams<{ rackId: string }>();
    const allRacks = getRacks();
    const rack = useMemo(() => allRacks.find(r => r.id === rackId), [rackId, allRacks]);

    if (!rack) {
        return <div className="p-8 text-red-600">Rack with ID "{rackId}" not found.</div>;
    }

    const { name, unit_height, utilization_percent, units } = rack;
    const locationName = rack.locationId.charAt(0).toUpperCase() + rack.locationId.slice(1);

    // Create a map for quick lookup of units by starting U position
    const unitMap = new Map<number, RackUnit>();
    units.forEach(u => unitMap.set(u.unit, u));

    // Determine total units available for quick status checks
    const occupiedUnitsCount = units.reduce((sum, u) => sum + u.u_size, 0);
    const freeUnitsCount = unit_height - occupiedUnitsCount;

    // The fixed height for the rack and markers (20px per U)
    const visualizationHeight = unit_height * 20;

    // Component to render the rack visualization
    const RackVisualization: React.FC = () => {
        let currentU = 1;
        const visualizationUnits = [];

        // Build the visualization from bottom (U1) to top (U42)
        while (currentU <= unit_height) {
            const unitData = unitMap.get(currentU);

            if (unitData) {
                // --- OCCUPIED UNIT LOGIC ---
                const { name, type, u_size, reserved_until } = unitData;
                const colorClass = getUnitColor(type);
                
                let content;
                if (type === 'reserved') {
                    content = `${name} (${u_size}U) - ${reserved_until}`;
                } else {
                    content = `${name} (${u_size}U)`;
                }

                visualizationUnits.push(
                    <div 
                        key={currentU} 
                        style={{ height: `${u_size * 20}px` }} // Each unit is 20px high
                        className={`w-full ${colorClass} text-xs text-gray-800 border-b border-gray-400 flex items-center justify-start p-1 cursor-pointer transition-colors duration-150 relative group`}
                    >
                        {content}
                    </div>
                );
                currentU += u_size; // Skip units occupied by this equipment
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
                        className="w-full bg-gray-100 border-b border-gray-300 flex items-center justify-center text-xs text-gray-500 relative"
                    >
                        {/* Only show the 'Empty Slot' text if the slot is large enough to contain it visually */}
                        {emptyUSize >= 2 && <span className="opacity-70">{emptyUSize}U Empty Slot</span>}
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


    return (
        <div className="flex h-full">
            {/* Left Sidebar / Details Panel */}
            <div className="w-1/3 p-8 border-r bg-white flex flex-col space-y-6">
                <p className="text-sm text-gray-500 mb-2">
                    <span className="text-infra-blue cursor-pointer">{locationName}</span> &gt; Стойки &gt; {name}
                </p>
                <h1 className="text-3xl font-bold text-gray-900 flex justify-between items-center">
                    {name}
                    <span className="text-gray-400 cursor-pointer text-xl">...</span>
                </h1>

                {/* Utilization Chart & Summary */}
                <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                    <div className="relative w-16 h-16">
                        {/* Simple utilization circle */}
                        <div 
                            className="w-full h-full rounded-full border-4 border-gray-200"
                            style={{ 
                                background: `conic-gradient(#3b82f6 ${utilization_percent}%, #f3f4f6 ${utilization_percent}%)`
                            }}
                        ></div>
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-800">
                            {utilization_percent}%
                        </span>
                    </div>
                    <div>
                        <p className="text-md font-medium text-gray-700">{rack.occupied_u}U из {unit_height}U занято</p>
                        <p className="text-sm text-gray-500 mt-1">
                            {/* NOTE: freeUnitsCount is the true free U, rack.free_u is likely a description of RESERVED U */}
                            <span className="text-red-500">{freeUnitsCount}U свободно</span>, {rack.free_u.replace(' свободно', '')}U служебные
                        </p>
                    </div>
                </div>

                {/* Main Actions */}
                <button className="flex items-center justify-center bg-yellow-400 text-gray-900 font-medium py-2 px-4 rounded-lg shadow-md hover:bg-yellow-500 transition">
                    Добавить оборудование штучно
                </button>
                <a href="#" className="text-infra-blue text-sm hover:underline">Добавить примечание</a>
                
                {/* Details and Metrics */}
                <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-3">Оборудование</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li>Серверы: <span className="float-right font-semibold">15</span></li>
                        <li>Коммутаторы: <span className="float-right font-semibold">1</span></li>
                        <li>Распределители питания: <span className="float-right font-semibold">3</span></li>
                        <li>ИБП: <span className="float-right font-semibold">3</span></li>
                    </ul>
                </div>
            </div>

            {/* Right Visualization Panel */}
            <div className="w-2/3 p-8 bg-gray-100 flex justify-center overflow-auto">
                <div className="flex space-x-2 items-start">
                    {/* Left U markers */}
                    <div 
                        className="flex flex-col-reverse text-right text-xs text-gray-500 font-mono"
                        style={{ height: `${visualizationHeight}px` }}
                    >
                        {/* Array from 1 to unit_height. flex-col-reverse places U1 at the bottom. */}
                        {Array.from({ length: unit_height }, (_, i) => i + 1).map(u => (
                            <div key={`left-${u}`} className="h-5 flex items-center justify-end">{u}</div>
                        ))}
                    </div>
                    
                    {/* Rack Body Visualization */}
                    <div 
                        className="w-96 border-4 border-gray-700 bg-gray-50 rounded-md shadow-inner relative"
                        style={{ height: `${visualizationHeight}px` }}
                    >
                        {/* Title/Label for the visualization */}
                        <div className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700">
                            Стойка спереди
                        </div>
                        <RackVisualization />
                    </div>

                    {/* Right U markers */}
                    <div 
                        className="flex flex-col-reverse text-left text-xs text-gray-500 font-mono"
                        style={{ height: `${visualizationHeight}px` }}
                    >
                        {/* Array from 1 to unit_height. flex-col-reverse places U1 at the bottom. */}
                        {Array.from({ length: unit_height }, (_, i) => i + 1).map(u => (
                            <div key={`right-${u}`} className="h-5 flex items-center justify-start">{u}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RackDetailPage;
