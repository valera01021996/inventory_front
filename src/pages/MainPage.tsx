// src/pages/LocationsDashboard.tsx
import React, { useMemo } from "react";
import { getLocations } from "../hooks/dataFetcher";
import RegionCard from "../components/RegionCard";
import DetailTile from "../components/DetailTile";
import { useAppSelector } from "hooks/useAppSelector";
import { useFetchRegionsQuery } from "services/index";

const allLocations = getLocations();

const MainPage: React.FC = () => {
    const { data: regions } = useFetchRegionsQuery({});
    const regionID = useAppSelector(state => state.geo.region);

    const selectedLocation = useMemo(
        () =>
            allLocations.find(loc => loc.id === regionID) ||
            allLocations[0],
        [regionID]
    );

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Ваши локации</h1>
            <div className="flex space-x-4 mb-8">
                {regions?.results.map(region => (
                    <RegionCard
                        key={region.id}
                        region={region}
                        isSelected={region.id === regionID}
                    />
                ))}
                <div className="w-48 h-28 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:border-infra-blue transition">
                    <span className="text-2xl">+</span>
                    <span className="text-xs mt-1">Добавить локацию</span>
                </div>
            </div>

            <p className="text-sm mb-4 text-gray-600">
                Настройка {selectedLocation.name}, 1 локация: 1
            </p>

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

export default MainPage;
