import { Fragment, useState } from 'react';
import { useAppSelector } from 'hooks/useAppSelector';
import { useFetchDevicesQuery } from 'services/index';
import ServerDetail from 'components/ServerDetail';

const headers = [
    { key: 'name', label: 'Серверы' },
    { key: 'ip', label: 'IP/MAC' },
    { key: 'platform', label: 'Платформа' },
    { key: 'location', label: 'Локация' },
    { key: 'rack_location', label: 'Стойка' },
    { key: 'site', label: 'Сайт' },
    { key: 'device_type', label: 'Тип устройства' },
    { key: 'manufacturer', label: 'Производитель' },
];

export default function ServersPage() {
    const [serverID, setServerID] = useState<number | null>(null);
    const regionID = useAppSelector(state => state.geo.region);

    const { data: servers } = useFetchDevicesQuery({
        region: regionID ?? undefined,
    });

    const handleRowClick = (serverId: number) => {
        setServerID(prevId => prevId === serverId ? null : serverId);
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-4">
                <div className='flex gap-1 items-center'>
                    <h1 className="text-2xl font-bold">Серверы</h1>
                    {servers && (<span className="text-gray-600">({servers?.results.length})</span>)}
                </div>
                <button className="text-white px-4 py-2 rounded text-sm bg-blue-500 hover:bg-blue-600 transition">
                    + Добавить сервер
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {headers.map(header => (
                                <th key={header.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {header.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {servers?.results.map(server => (
                            <Fragment key={server.id}>
                                <tr 
                                    className={`hover:bg-gray-100 cursor-pointer ${serverID === server.id ? 'bg-blue-50 border-b-2 border-infra-blue' : ''}`} 
                                    onClick={() => handleRowClick(server.id)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{server.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{server.ip_addresses?.[0]?.ip}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs overflow-hidden text-ellipsis">{server?.platform?.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{server?.location?.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{server?.rack?.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{server?.site?.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{server?.device_type?.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{server?.device_type?.manufacturer?.name}</td>
                                </tr>

                                {serverID === server.id && (
                                    <tr><ServerDetail server={server} /></tr>
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};