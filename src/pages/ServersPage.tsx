import { Fragment, useState } from 'react';
import { useAppSelector } from 'hooks/useAppSelector';
import { useFetchDevicesQuery, useUploadDeviceMutation } from 'services/index';
import ServerDetail from 'components/ServerDetail';
import FileUploadButton from 'components/FileUpload';

const headers = [
    { key: 'index', label: '№' },
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
        region: regionID,
    });
    const [uploadServer, { isLoading }] = useUploadDeviceMutation();

    const handleUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        
        uploadServer(formData).unwrap();
    };

    const handleRowClick = (serverId: number) => {
        setServerID(prevId => prevId === serverId ? null : serverId);
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Серверы</h1>
                <FileUploadButton
                    label="+ Добавить сервер"
                    onUpload={handleUpload}
                    isLoading={isLoading}
                />
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
                        {servers?.results.map((server, index) => (
                            <Fragment key={server.id}>
                                <tr 
                                    className={`hover:bg-gray-100 cursor-pointer ${serverID === server.id ? 'bg-blue-50 border-b-2 border-infra-blue' : ''}`} 
                                    onClick={() => handleRowClick(server.id)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{server.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{server.ip_addresses?.[0]?.ip}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{server?.platform?.name}</td>
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