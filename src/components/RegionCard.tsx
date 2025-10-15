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
            className={`w-48 p-4 border-2 flex flex-col gap-2 rounded-lg cursor-pointer bg-white transition ${isSelected ? 'border-gray-400 shadow-md' : 'border-gray-200 hover:border-gray-400'}`}
            onClick={() => dispatch(setLocation(region.id))}
        >
            <h3 className="font-semibold">{region.name}</h3>
            {/* <p className="text-xs text-green-600">{location?.status}</p> */}
            {region.device_count != null && (
                <p className="text-infra-blue text-xs mt-2">{region.device_count} devices</p>
            )}
            {/* <p className="text-xs text-gray-500">{location.ip_address}</p> */}
        </div>
    );
};

export default RegionCard;