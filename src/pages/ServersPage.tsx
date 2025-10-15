// src/pages/ServersList.tsx
import React, { useState, useMemo } from 'react';
import ServerDetailRow from '../components/ServerDetailRow';
import { getLocations, getServers } from '../hooks/dataFetcher';
import { useAppSelector } from 'hooks/useAppSelector';

const serverListHeaders = [
    { key: 'name', label: 'Серверы' },
    { key: 'ip', label: 'IP/MAC' },
    { key: 'platform', label: 'Конфигурация/Платформа' },
    { key: 'host', label: 'Хост/Владелец' },
    { key: 'rack_location', label: 'Стойка/Юнит' },
    { key: 'bmc_ip', label: 'IP-адрес ВМС' },
    { key: 'status', label: 'Питание' },
];

const allServers = getServers();
const allLocations = getLocations();

const ServersPage: React.FC = () => {
    const { location } = useAppSelector(state => state.geo);
    const [expandedServerId, setExpandedServerId] = useState<string | null>(null); 

    const locationName = useMemo(() => 
        allLocations.find(loc => loc.id === location)?.name || 'Unknown Location'
    , [location]);
    
    const servers = useMemo(() => 
        allServers.filter(s => s.location.toLowerCase() === location?.toLowerCase()), 
    [location]);

    const handleRowClick = (serverId: string) => {
        setExpandedServerId(prevId => prevId === serverId ? null : serverId);
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Серверы ({locationName})</h1>
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">В эксплуатации ({servers.length})</p>
                <button className="bg-infra-blue text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition">
                    Добавить сервер
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {serverListHeaders.map(header => (
                                <th key={header.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {header.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {servers.map(server => (
                            <React.Fragment key={server.id}>
                                <tr 
                                    className={`hover:bg-gray-100 cursor-pointer ${expandedServerId === server.id ? 'bg-blue-50 border-b-2 border-infra-blue' : ''}`} 
                                    onClick={() => handleRowClick(server.id)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{server.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{server.ip}<br/>{server.mac}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs overflow-hidden text-ellipsis">{server.platform}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{server.host}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{server.rack_location}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{server.bmc_ip}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`p-1 rounded-full text-xs font-semibold ${server.status === 'Включен' ? 'text-green-600' : 'text-red-600'}`}>
                                            {server.status}
                                        </span>
                                    </td>
                                </tr>

                                {expandedServerId === server.id && (
                                    <tr>
                                        <ServerDetailRow server={server} /> 
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ServersPage;