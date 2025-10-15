import React from 'react';
import type { Server, PduConnection, NetworkConnection } from '../types/inventory';

// Component for PDU Connections
const PDUSection: React.FC<{ pdus: PduConnection[] }> = ({ pdus }) => (
    <div className="mt-4">
        <h3 className="text-md font-medium text-gray-700 mb-2">PDU (подключения)</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2">
            {pdus.map((p, i) => (
                <div key={i} className="p-3 border border-gray-200 rounded-lg flex-shrink-0 w-50 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-center mb-1">
                        <p className="font-semibold text-sm text-gray-800">{p.port}</p>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{p.pdu}</p>
                    <div className="flex justify-between items-center mt-2">
                        <span className={`text-xs font-medium ${p.status === 'Включен' ? 'text-green-600' : 'text-red-600'}`}>{p.status}</span>
                        {/* Placeholder for "Включить/Выключить" button */}
                        <button className="text-xs text-blue-500 hover:text-blue-700 transition">Выключить</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// Component for Network Connections
const NetworkSection: React.FC<{ networks: NetworkConnection[] }> = ({ networks }) => (
    <div className="mt-4">
        <h3 className="text-md font-medium text-gray-700 mb-2">Network ({networks.length} ports)</h3>
        <div className="flex space-x-3 overflow-x-auto pb-2">
            {networks.map((net, i) => (
                <div 
                    key={i} 
                    className={`p-3 border rounded-lg flex-shrink-0 w-50 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer ${net.link.includes('error') ? 'border-red-500/50' : 'border-gray-200'}`}
                >
                    <div className="flex justify-between items-center mb-1">
                        <p className="font-semibold text-sm text-gray-800 truncate">{net.name}</p>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{net.link}</p>
                    <div className="flex justify-between items-center mt-2">
                        <span className={`text-xs font-medium ${net.status === 'Включен' ? 'text-green-600' : 'text-red-600'}`}>{net.status}</span>
                        <button className="text-xs text-blue-500 hover:text-blue-700 transition">Выключить</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// Component for BMC Details
const BMCSection: React.FC<{ version: string; status: string; bmc_ip: string }> = ({ version, status, bmc_ip }) => (
    <div className="p-3 border border-gray-200 rounded-lg flex-shrink-0 w-60 bg-white shadow-sm">
        <div className='flex gap-2 items-center'>
            <h3 className="text-md font-medium text-gray-700">BMC</h3>
            <p className="font-semibold text-sm">{version}</p>
        </div>
        <div className="mt-2 text-xs">
             <p className="text-gray-500 mb-1">IP: <span className="text-gray-800 font-medium">{bmc_ip}</span></p>
             <span className={`font-medium ${status === 'Включен' ? 'text-green-600' : 'text-red-600'}`}>{status}</span>
        </div>
        <div className="mt-3 border-t border-gray-100 pt-2 flex space-x-2">
            <a href="#" className="text-xs text-blue-500 hover:underline">Перейти</a>
            <a href="#" className="text-xs text-blue-500 hover:underline">Открыть консоль</a>
        </div>
    </div>
);

const ServerDetailRow: React.FC<{ server: Server }> = ({ server }) => {
    if (!server.details) {
        return (
            <td colSpan={8} className="p-0 border-b-2 border-gray-300">
                 <p className="p-4 text-gray-500 text-sm italic bg-gray-50">Нет подробных данных для этого сервера.</p>
            </td>
        );
    }
    
    // Deconstruct for easier access
    const { details } = server;

    return (
        <td colSpan={8} className="p-0 border-b-2 border-infra-blue">
            <div className="p-6 bg-gray-50/50">
                
                {/* Top Info Row */}
                <div className="grid grid-cols-7 gap-6 text-sm mb-6 pb-4 border-b border-gray-200">
                    <div className="col-span-2">
                        <p className="text-gray-500">IP / MAC</p>
                        <p className="font-medium text-gray-800">{server.ip}</p>
                        <p className="text-xs text-gray-500">{server.mac}</p>
                    </div>
                    <div className="col-span-1">
                        <p className="text-gray-500">Конфигурация / Платформа</p>
                        <p className="font-medium text-gray-800 truncate">{server.config}</p>
                        <p className="text-xs text-gray-500 truncate">{server.platform}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Хост / Владелец</p>
                        <p className="font-medium text-gray-800 truncate">{server.host}</p>
                        <p className="text-xs text-gray-500 truncate">{server.owner}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Локация / Расположение</p>
                        <p className="font-medium text-gray-800">{server.location}</p>
                        <p className="text-xs text-gray-500">{server.rack_location}</p>
                    </div>
                     <div>
                        <p className="text-gray-500">IP-адрес BMC</p>
                        <p className="font-medium text-gray-800">{server.bmc_ip}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">OC</p>
                        <p className="font-medium text-gray-800">{server.os}</p>
                    </div>
                </div>

                {/* Connection Section */}
                <h2 className="text-xl font-bold text-gray-900 mb-2">Подключения</h2>

                <div className="flex space-x-8 items-start">
                    
                    {/* BMC Card (similar to the image) */}
                    <BMCSection 
                        version={details.bmc.version} 
                        status={details.bmc.status} 
                        bmc_ip={server.bmc_ip} 
                    />

                    {/* PDU and Network sections, separated for clarity */}
                    <div className="flex-grow flex space-x-6">
                        <PDUSection pdus={details.pdus} />
                        <NetworkSection networks={details.networks} />
                    </div>
                </div>
                
                {/* Placeholder for "Добавить подключение" button */}
                <button className="flex items-center text-blue-500 hover:text-blue-700 mt-4 text-sm font-medium">
                    <span className="text-lg mr-1">+</span> Добавить подключение
                </button>
            </div>
        </td>
    );
};

export default ServerDetailRow;
