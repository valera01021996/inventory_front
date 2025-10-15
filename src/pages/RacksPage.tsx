import React, { useMemo } from 'react';
import { useNavigate } from 'react-router';
import { getRacks } from '../hooks/dataFetcher';
import type { Rack } from '../types/inventory';

const RacksPage: React.FC = () => {
    const allRacks = getRacks();
    const navigate = useNavigate();

    // Group racks by location for a more organized view
    const racksByLocation = useMemo(() => {
        return allRacks.reduce((acc, rack) => {
            const locationName = rack.locationId.charAt(0).toUpperCase() + rack.locationId.slice(1);
            if (!acc[locationName]) {
                acc[locationName] = [];
            }
            acc[locationName].push(rack);
            return acc;
        }, {} as Record<string, Rack[]>);
    }, [allRacks]);

    const handleRackClick = (rackId: string) => {
        navigate(`/racks/${rackId}`);
    };

    const TableHeader = () => (
        <thead className="bg-gray-50">
            <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Стойка</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Занято, U</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Высота, U</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Всего устройств</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Пул IP-адресов</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Примечание</th>
                <th className="px-4 py-2"></th>
            </tr>
        </thead>
    );

    const TableRow: React.FC<{ rack: Rack }> = ({ rack }) => (
        <tr 
            className="hover:bg-blue-50 cursor-pointer transition duration-150"
            onClick={() => handleRackClick(rack.id)}
        >
            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-infra-blue">{rack.name}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{rack.id.split('-').pop()}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{rack.occupied_u} <span className="text-gray-500 ml-1">{rack.free_u}</span></td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{rack.unit_height}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{rack.total_devices}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{rack.ip_pool}</td>
            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{rack.note || 'HA'}</td>
            <td className="px-4 py-3 text-right text-sm font-medium text-gray-500">
                <span className="cursor-pointer hover:text-gray-800 transition">...</span>
            </td>
        </tr>
    );

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Стойки</h1>
                <button className="flex items-center bg-blue-500 text-white font-medium py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition">
                    + Добавить стойки
                </button>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
                {Object.entries(racksByLocation).map(([locationName, racks]) => (
                    <div key={locationName} className="mb-4 last:mb-0">
                        <div className="px-4 py-3 bg-gray-100 text-sm font-semibold text-gray-700 border-b border-gray-200">
                            Локация: {locationName} ({racks.length} стоек)
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <TableHeader />
                            <tbody className="bg-white divide-y divide-gray-100">
                                {racks.map(rack => <TableRow key={rack.id} rack={rack} />)}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RacksPage;
