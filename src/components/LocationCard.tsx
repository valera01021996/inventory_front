import React from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from 'store/slices/geoSlice';
import type { Location } from 'types/inventory';

interface LocationCardProps {
    location: Location;
    isSelected: boolean;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, isSelected }) => {
    const dispatch = useDispatch();

    return (
        <div 
            className={`w-48 p-4 border-2 flex flex-col gap-2 rounded-lg cursor-pointer bg-white transition ${isSelected ? 'border-gray-400 shadow-md' : 'border-gray-200 hover:border-gray-400'}`}
            onClick={() => dispatch(setLocation(location.id))}
        >
            <h3 className="font-semibold">{location.name}</h3>
            <p className="text-xs text-green-600">{location.status}</p>
            {location.free_racks && <p className="text-infra-blue text-xs mt-2">{location.free_racks}</p>}
            <p className="text-xs text-gray-500">{location.ip_address}</p>
        </div>
    );
};

export default LocationCard;