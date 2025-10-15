import React from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from 'store/slices/geoSlice';
import type { RegionDTO } from 'types/geo';

interface RegionCardProps {
    region: RegionDTO;
    isSelected: boolean;
}

const RegionCard: React.FC<RegionCardProps> = ({ region, isSelected }) => {
    const dispatch = useDispatch();

    return (
        <div 
            className={`w-48 p-4 border-2 flex flex-col gap-1 rounded-lg cursor-pointer bg-white transition ${isSelected ? 'border-gray-400 shadow-md' : 'border-gray-200 hover:border-gray-400'}`}
            onClick={() => dispatch(setLocation(region.id))}
        >
            <h3 className="font-semibold">{region.name}</h3>
            <p className={`text-xs ${region.is_active ? 'text-green-600' : 'text-red-600'}`}>
                {region.is_active ? 'Активен' : 'Неактивен'}
            </p>
            <div className='flex flex-col gap-0.5'>
                <p className="text-infra-blue text-xs">Серверы: {region.device_count ?? '-'}</p>
                <p className="text-infra-blue text-xs">Стойки: {region.rack_count ?? '-'}</p>
            </div>
        </div>
    );
};

export default RegionCard;