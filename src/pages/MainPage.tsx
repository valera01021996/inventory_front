import { useFetchDevicesQuery, useFetchRegionsQuery } from "services/index";
import { useAppSelector } from "hooks/useAppSelector";
import RegionDetail from "components/RegionDetail";
import RegionCard from "components/RegionCard";

export default function MainPage() {
    const regionID = useAppSelector(state => state.geo.region);
    const { data: regions } = useFetchRegionsQuery({});
    const { data: servers} = useFetchDevicesQuery({
        region: regionID
    }, { skip: !regionID });

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
            {regionID && (
                <RegionDetail server_count={servers?.results.length ?? 0} />
            )}
        </div>
    );
};