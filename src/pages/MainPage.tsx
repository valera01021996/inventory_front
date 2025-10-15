import React, { useMemo } from "react";
import { getLocations } from "../hooks/dataFetcher";
import RegionCard from "../components/RegionCard";
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
                <div className="p-4 bg-white shadow-sm rounded-lg flex flex-col justify-between border-t-4 border-white hover:border-infra-blue hover:shadow-lg transition-all duration-200 cursor-default">
                    <div className="flex-shrink-0 mb-4 h-20 w-20 p-1 bg-blue-50 rounded-full flex items-center justify-center">
                        <img src="/images/location-settings.png" alt="Настройки локации" className="w-20 h-20 object-contain" />
                    </div>
                    
                    <h4 className="text-sm font-medium text-gray-700 mt-2">Настройки локации</h4>

                    <div className="mb-5">
                        <p className="text-sm text-gray-500 mb-1">Шаблоны</p>
                        <p className="text-base font-medium text-gray-700">26 ОС, 1 шаблон диагностики</p>
                    </div>

                    <div className="mb-5">
                        <p className="text-sm text-gray-500 mb-1">Интерфейсы DHCP</p>
                        <p className="text-lg font-mono font-semibold text-gray-900">eth0</p>
                    </div>

                    <a href="#" className="inline-block text-base font-medium text-blue-600 hover:text-blue-700 hover:underline pt-4 border-t border-gray-100 mt-2">
                        Все настройки
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
