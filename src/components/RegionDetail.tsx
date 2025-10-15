

interface RegionDetailProps {
    server_count: number
}

export default function RegionDetail({ server_count }: RegionDetailProps) {
    return (
        <div className="flex gap-4 flex-wrap">
            <div className="p-4 bg-white w-[280px] rounded-lg flex flex-col gap-2 shadow-sm hover:shadow-lg transition-all duration-200">
                <div className="w-25 h-25 p-1 bg-blue-50 rounded-full flex items-center justify-center m-auto">
                    <img src="/images/location-settings.png" alt="Настройки локации" className="w-20 h-20 object-contain" />
                </div>
                <h4 className="font-semibold text-gray-700 mt-2">Настройки локации</h4>
                <div>
                    <p className="text-xs text-gray-500">Шаблоны</p>
                    <p className="text-sm font-medium text-gray-700">26 ОС, 1 шаблон диагностики</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Интерфейсы DHCP</p>
                    <p className="text-sm font-medium text-gray-700">eth0</p>
                </div>
                <a href="#" className="inline-block text-base font-medium text-blue-600 hover:text-blue-700 hover:underline pt-4 border-t border-gray-100 mt-2">
                    Все настройки
                </a>
            </div>
            <div className="p-4 bg-white w-[280px] rounded-lg flex flex-col gap-2 shadow-sm hover:shadow-lg transition-all duration-200">
                <div className="w-25 h-25 p-1 bg-blue-50 rounded-full flex items-center justify-center m-auto">
                    <img src="/images/ip-address.png" alt="Сети и пулы IP-адресов" className="w-20 h-20 object-contain" />
                </div>
                <h4 className="font-semibold text-gray-700 mt-2">Сети и пулы IP-адресов</h4>
                <div>
                    <p className="text-xs text-gray-500">В локации развернуто</p>
                    <p className="text-sm font-medium text-gray-700">2 физических сети</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Из них выделено</p>
                    <p className="text-sm font-medium text-gray-700">3 пула IP-адресов</p>
                </div>
                <a href="#" className="inline-block text-base font-medium text-blue-600 hover:text-blue-700 hover:underline pt-4 border-t border-gray-100 mt-2">
                    + Добавить физическую сеть
                </a>
            </div>
            <div className="p-4 bg-white w-[280px] rounded-lg flex flex-col gap-2 shadow-sm hover:shadow-lg transition-all duration-200">
                <div className="w-25 h-25 p-1 bg-blue-50 rounded-full flex items-center justify-center m-auto">
                    <img src="/images/network-equipment.png" alt="Сетевое оборудование" className="w-20 h-20 object-contain" />
                </div>
                <h4 className="font-semibold text-gray-700 mt-2">Сетевое оборудование</h4>
                <div>
                    <p className="text-xs text-gray-500">Коммутатор</p>
                    <p className="text-sm font-medium text-gray-700">Cisco Catalyst 2960</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Статус</p>
                    <p className="text-sm font-medium text-gray-500">Исправен</p>
                </div>
                <a href="#" className="inline-block text-base font-medium text-blue-600 hover:text-blue-700 hover:underline pt-4 border-t border-gray-100 mt-2">
                    + Добавить оборудование
                </a>
            </div>
            <div className="p-4 bg-white w-[280px] rounded-lg flex flex-col gap-2 shadow-sm hover:shadow-lg transition-all duration-200">
                <div className="w-25 h-25 p-1 bg-blue-50 rounded-full flex items-center justify-center m-auto">
                    <img src="/images/power-management.png" alt="Управление питанием" className="w-20 h-20 object-contain" />
                </div>
                <h4 className="font-semibold text-gray-700 mt-2">Управление питанием</h4>
                <div>
                    <p className="text-xs text-gray-500">Всего</p>
                    <p className="text-sm font-medium text-gray-700">3 PDU</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Статус</p>
                    <p className="text-sm font-medium text-gray-500">Все исправны</p>
                </div>
                <a href="#" className="inline-block text-base font-medium text-blue-600 hover:text-blue-700 hover:underline pt-4 border-t border-gray-100 mt-2">
                    + Добавить PDU
                </a>
            </div>
            <div className="p-4 bg-white w-[280px] rounded-lg flex flex-col gap-2 shadow-sm hover:shadow-lg transition-all duration-200">
                <div className="w-25 h-25 p-1 bg-blue-50 rounded-full flex items-center justify-center m-auto">
                    <img src="/images/servers.png" alt="Серверы" className="w-20 h-20 object-contain" />
                </div>
                <h4 className="font-semibold text-gray-700 mt-2">Серверы</h4>
                <div>
                    <p className="text-xs text-gray-500">Всего</p>
                    <p className="text-sm font-medium text-gray-700">{server_count}</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500">Статус</p>
                    <p className="text-sm font-medium text-gray-500">Все исправны</p>
                </div>
                <a href="#" className="inline-block text-base font-medium text-blue-600 hover:text-blue-700 hover:underline pt-4 border-t border-gray-100 mt-2">
                    + Добавить серверы
                </a>
            </div>
        </div>
    );
}
