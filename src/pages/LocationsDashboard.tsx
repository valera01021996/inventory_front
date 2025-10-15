// src/pages/LocationsDashboard.tsx
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectSelectedLocationId } from '../redux/inventorySlice';
import { getLocations } from '../hooks/dataFetcher';
import LocationCard from '../components/LocationCard';
import DetailTile from '../components/DetailTile';

const allLocations = getLocations();

const LocationsDashboard: React.FC = () => {
    const selectedLocationId = useSelector(selectSelectedLocationId);

    const selectedLocation = useMemo(() => 
        allLocations.find(loc => loc.id === selectedLocationId) || allLocations[0]
    , [selectedLocationId]);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Ваши локации</h1>
            
            {/* Location Cards */}
            <div className="flex space-x-4 mb-8">
                {allLocations.map(loc => (
                    <LocationCard 
                        key={loc.id} 
                        location={loc} 
                        isSelected={loc.id === selectedLocationId}
                    />
                ))}
                <div className="w-48 h-28 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-infra-blue transition">
                    <span className="text-2xl">+</span>
                    <span className="text-xs mt-1">Добавить локацию</span>
                </div>
            </div>

            <p className="text-sm mb-4 text-gray-600">Настройка {selectedLocation.name}, 1 локация: 1</p>

            <div className="grid grid-cols-5 gap-4">
                {selectedLocation.details_tiles.map((tile, index) => (
                    <DetailTile 
                        key={index} 
                        tile={tile} 
                        locationId={selectedLocation.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default LocationsDashboard;