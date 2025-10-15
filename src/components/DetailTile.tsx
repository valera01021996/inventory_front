// src/components/Locations/DetailTile.tsx
import React from 'react';
import { Link } from 'react-router'; // Using react-router-dom Link (Assuming this is the correct dependency)
import type { LocationDetailTile } from '../types/inventory';

interface DetailTileProps {
    tile: LocationDetailTile;
    locationId: string;
}

const tileIcons: Record<string, string> = {
    // Note: I'm assuming your icons are in the public root folder, not /images.
    // If you created an /images folder, the path should be '/images/filename.png'
    "Настройки локации": "/images/location-settings.png", 
    "Сети и пулы IP-адресов": "/images/ip-address.png",
    "Сетевое оборудование": "/images/network-equipment.png",
    "Управление питанием": "/images/power-management.png",
    "Серверы": "/images/servers.png",
    // Fallback titles used in London/Amsterdam data (must be explicitly added)
    "Настройки": "/images/location-settings.png",
    "Сети": "/images/ip-address.png",
    "Оборудование": "/images/network-equipment.png",
    "Питание": "/images/power-management.png"
};

const DetailTile: React.FC<DetailTileProps> = ({ tile, locationId }) => {
    // Use fallback icon if path is undefined
    const iconSrc = tileIcons[tile.title] || "/vite.svg"; 

    // Determine the route to link to (Servers tile links to the list)
    const linkPath = tile.title === "Серверы" ? `/servers/${locationId}` : '#';

    return (
        <div className="p-4 bg-white shadow-sm rounded-lg flex flex-col justify-between border-t-4 border-white hover:border-infra-blue hover:shadow-lg transition-all duration-200 cursor-default">
            
            {/* ICON CONTAINER: Large and aligned to the left/top */}
            <div className="flex-shrink-0 mb-4 h-20 w-20 p-1 bg-blue-50 rounded-full flex items-center justify-center">
                <img src={iconSrc} alt={tile.title} className="w-20 h-20 object-contain" />
            </div>
            
            <h4 className="text-sm font-medium text-gray-700 mt-2">{tile.title}</h4>
            <p className="text-xl font-bold text-gray-900 mt-1">{tile.count}</p>
            
            {/* Status Text Styling */}
            <p className={`text-xs mt-1 font-medium ${
                tile.status.includes('исправны') || tile.status.includes('ОК') || tile.status.includes('настройки') 
                    ? 'text-green-600' : 'text-red-500' // Use a subtle red for non-OK status
            }`}>
                {tile.status}
            </p>
            
            {/* Action Link Styling */}
            {tile.title === "Серверы" && (
                <Link 
                    className="text-infra-blue text-xs mt-3 font-medium hover:text-blue-600 transition" 
                    to={linkPath}
                >
                    Перейти к серверам
                </Link>
            )}
            {/* Add action links for other tiles to match the images */}
            {tile.title === "Сети и пулы IP-адресов" && (
                <a href="#" className="text-infra-blue text-xs mt-3 font-medium hover:text-blue-600 transition">
                    + Добавить физическую сеть
                </a>
            )}
            {tile.title === "Сетевое оборудование" && (
                <a href="#" className="text-infra-blue text-xs mt-3 font-medium hover:text-blue-600 transition">
                    + Добавить оборудование
                </a>
            )}
            {tile.title === "Управление питанием" && (
                <a href="#" className="text-infra-blue text-xs mt-3 font-medium hover:text-blue-600 transition">
                    + Добавить PDU
                </a>
            )}
        </div>
    );
};

export default DetailTile;