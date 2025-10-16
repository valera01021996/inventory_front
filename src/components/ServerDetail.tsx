import type { DeviceDTO } from "types/device";

interface ServerDetailProps {
    server: DeviceDTO;
}

export default function ServerDetail({ server }: ServerDetailProps) {
    return (
        <td colSpan={9} className="p-0 border-b-2 border-gray-300 shadow-sm">
            <div className="p-6 bg-gray-50/50">
                {/* General Info */}
                <div className="flex justify-between text-sm mb-6 pb-4 border-b border-gray-200">
                    <div>
                        <p className="text-xs text-gray-500">Серийный номер</p>
                        <p className="font-medium text-gray-700">{server.serial_number ?? '-'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Платформа</p>
                        <p className="font-medium text-gray-700 truncate">{server?.platform?.name ?? '-'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Стойка</p>
                        <p className="font-medium text-gray-700 truncate">{server?.rack?.name ?? '-'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Локация / Расположение</p>
                        <p className="font-medium text-gray-700">{server?.location?.name ?? '-'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Тип устройства</p>
                        <p className="font-medium text-gray-700">{server?.device_type?.name ?? '-'}</p>
                        <p className="text-gray-500">{server?.device_type?.manufacturer?.name ?? '-'}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Роль</p>
                        <p className="font-medium text-gray-700">{server?.role?.name ?? '-'}</p>
                    </div>
                </div>

                <div className="max-h-[420px] overflow-y-auto pr-2 space-y-4">
                    <Card title="IP адреса">
                        {server?.ip_addresses?.length ? (
                            server.ip_addresses.map(ip => (
                                <CardRow
                                    key={ip.id}
                                    label={ip.ip}
                                    value={`Сеть: ${ip.network.name} • Шлюз: ${ip.network.gateway} • VLAN: ${ip.network.vlan} • Префикс: ${ip.network.prefix_len}`}
                                />
                            ))
                        ) : (
                            <EmptyRow />
                        )}
                    </Card>

                    <Card title="Процессоры">
                        {server?.processors?.length ? (
                            server.processors.map(cpu => (
                                <CardRow
                                    key={cpu.id}
                                    label={cpu.cpu_model}
                                    value={`${cpu.frequency} MHz • ${cpu.number_of_cors} ядер • ${cpu.threads} потоков`}
                                />
                            ))
                        ) : (
                            <EmptyRow />
                        )}
                    </Card>

                    <Card title="Модули памяти (RAM)">
                        {server.memory_modules?.length ? (
                            server.memory_modules.map(mem => (
                                <CardRow
                                    key={mem.id}
                                    label={mem.slot}
                                    value={`${mem.size} GB • ${mem.memory_type} • ${mem.frequency_mhz} MHz • [${mem.manufacturer}]`}
                                />
                            ))
                        ) : (
                            <EmptyRow />
                        )}
                    </Card>

                    <Card title="Диски">
                        {server.disks?.length ? (
                            server.disks.map(disk => (
                                <CardRow
                                    key={disk.id}
                                    label={disk.disk_model}
                                    value={`${disk.size} GB • ${disk.disk_type} • [${disk.status}]`}
                                />
                            ))
                        ) : (
                            <EmptyRow />
                        )}
                    </Card>

                    <Card title="Блоки питания (PSU)">
                        {server.power_units?.length ? (
                            server.power_units.map(psu => (
                                <CardRow
                                    key={psu.id}
                                    label={psu.model}
                                    value={`${psu.power_watts}W • [${psu.status}]`}
                                />
                            ))
                        ) : (
                            <EmptyRow />
                        )}
                    </Card>

                    <Card title="Вентиляторы">
                        {server.fans?.length ? (
                            server.fans.map(fan => (
                                <CardRow
                                    key={fan.id}
                                    label={fan.fan_name}
                                    value={`${fan.speed_rpm} RPM • [${fan.status}]`}
                                />
                            ))
                        ) : (
                            <EmptyRow />
                        )}
                    </Card>

                    <Card title="RAID массивы">
                        {server.raid_volumes?.length ? (
                            server.raid_volumes.map(raid => (
                                <CardRow
                                    key={raid.id}
                                    label={raid.name}
                                    value={`Уровень: ${raid.raid_level} • Контроллер: ${raid.controller} • Размер: ${raid.size} GB • [${raid.status}]`}
                                />
                            ))
                        ) : (
                            <EmptyRow />
                        )}
                    </Card>
                </div>

                <button className="flex items-center text-blue-500 hover:text-blue-700 mt-5 text-sm font-medium cursor-pointer">
                    <span className="text-lg mr-1">+</span> Добавить подключение
                </button>
            </div>
        </td>
    );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
            <h3 className="font-semibold text-gray-700 text-sm mb-2">
                {title}
            </h3>
            <div className="divide-y divide-gray-100">{children}</div>
        </div>
    );
}

function CardRow({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex justify-between text-sm py-1.5">
            <span className="text-gray-600">{label}</span>
            <span className="text-gray-800 font-medium truncate max-w-[55%] text-right">
                {value}
            </span>
        </div>
    );
}

function EmptyRow() {
    return (
        <div className="text-gray-400 text-sm py-2 text-center">
            Нет данных
        </div>
    );
}