import type { DeviceDTO } from 'types/device';

interface ServerDetailProps {
    server: DeviceDTO;
}

export default function ServerDetail({ server }: ServerDetailProps) {
    if (!server?.id) {
        return (
            <td colSpan={8} className="p-0 border-b-2 border-gray-300">
                 <p className="p-4 text-gray-500 text-sm italic bg-gray-50">Нет подробных данных для этого сервера.</p>
            </td>
        );
    }
    return (
        <td colSpan={8} className="p-0 border-b-2 border-gray-300 shadow-sm">
            <div className="p-6 bg-gray-50/50">                
                <div className="flex justify-between text-sm mb-6 pb-4 border-b border-gray-200">
                    <div>
                        <p className="text-xs text-gray-500">IP / MAC</p>
                        <p className="font-medium text-gray-700">{server.ip_addresses?.[0]?.ip}</p>
                        <p className="text-gray-500">{server.ip_addresses?.[0]?.network?.name}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Платформа</p>
                        <p className="font-medium text-gray-700 truncate">{server.platform.name}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Стойка</p>
                        <p className="font-medium text-gray-700 truncate">{server.rack.name}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Локация / Расположение</p>
                        <p className="font-medium text-gray-700">{server.location.name}</p>
                    </div>
                     <div>
                        <p className="text-xs text-gray-500">Тип устройства</p>
                        <p className="font-medium text-gray-700">{server.device_type.name}</p>
                        <p className="font-medium text-gray-700">{server.device_type.manufacturer.name}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Роль</p>
                        <p className="font-medium text-gray-700">{server.role.name}</p>
                    </div>
                </div>

                {/* <h2 className="text-md font-semibold text-gray-900 mb-2">Подключения</h2> */}
                
                <button className="flex items-center text-blue-500 hover:text-blue-700 mt-4 text-sm font-medium cursor-pointer">
                    <span className="text-lg mr-1">+</span> Добавить подключение
                </button>
            </div>
        </td>
    );
};