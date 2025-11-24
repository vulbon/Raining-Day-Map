import React from 'react';
import { Location, IndoorLevel, ParkingType } from '../types';
import { Umbrella, Car, Navigation, ShieldCheck, CloudDrizzle } from 'lucide-react';

interface LocationCardProps {
  location: Location;
  isRainy: boolean;
}

const LocationCard: React.FC<LocationCardProps> = ({ location, isRainy }) => {
  const getLevelColor = (level: IndoorLevel) => {
    switch (level) {
      case IndoorLevel.LEVEL_1:
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case IndoorLevel.LEVEL_2:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case IndoorLevel.LEVEL_3:
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelLabel = (level: IndoorLevel) => {
    switch (level) {
      case IndoorLevel.LEVEL_1: return 'Lv1 絕對防禦';
      case IndoorLevel.LEVEL_2: return 'Lv2 室內區域';
      case IndoorLevel.LEVEL_3: return 'Lv3 有遮蔽';
    }
  };

  const getParkingColor = (type: ParkingType) => {
    return type === ParkingType.UNDERGROUND 
      ? 'bg-purple-100 text-purple-700' 
      : 'bg-orange-100 text-orange-700';
  };

  const getParkingLabel = (type: ParkingType) => {
    return type === ParkingType.UNDERGROUND ? '地下停車' : '戶外停車';
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-4 transition-all hover:shadow-md ${
      isRainy && location.indoorLevel === IndoorLevel.LEVEL_1 
        ? 'ring-2 ring-rain-400 border-transparent' 
        : 'border-gray-100'
    }`}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{location.name}</h3>
          <div className="flex items-center text-xs text-slate-500 mt-1 gap-1">
            <Navigation className="w-3 h-3" />
            <span>距離 {location.distanceKm} km</span>
          </div>
        </div>
        <div className={`text-xs font-bold px-2 py-1 rounded-full border ${getLevelColor(location.indoorLevel)} flex items-center gap-1`}>
          {location.indoorLevel === IndoorLevel.LEVEL_1 ? <ShieldCheck className="w-3 h-3" /> : <Umbrella className="w-3 h-3" />}
          {getLevelLabel(location.indoorLevel)}
        </div>
      </div>

      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
        {location.description}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <span className={`text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1 ${getParkingColor(location.parkingType)}`}>
          <Car className="w-3 h-3" />
          {getParkingLabel(location.parkingType)}
        </span>
        
        {location.tags.map(tag => (
          <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
            #{tag}
          </span>
        ))}
      </div>
      
      {isRainy && location.indoorLevel === IndoorLevel.LEVEL_3 && (
        <div className="mt-3 text-xs bg-red-50 text-red-600 px-3 py-1.5 rounded-lg flex items-center gap-2 border border-red-100">
          <CloudDrizzle className="w-3 h-3" />
          <span>注意：雨勢過大時可能會有潑雨</span>
        </div>
      )}
    </div>
  );
};

export default LocationCard;