import React from 'react';
import { FilterState, IndoorLevel, ParkingType } from '../types';
import { INDOOR_LEVEL_LABELS, PARKING_TYPE_LABELS } from '../constants';
import { Filter } from 'lucide-react';

interface FilterSectionProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  isRainy: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({ filters, setFilters, isRainy }) => {
  
  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilters(prev => ({
      ...prev,
      indoorLevel: value === 'all' ? 'all' : Number(value) as IndoorLevel
    }));
  };

  const handleParkingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilters(prev => ({
      ...prev,
      parkingType: value === 'all' ? 'all' : value as ParkingType
    }));
  };

  const selectBaseClass = `w-full p-2 text-sm rounded-lg border focus:ring-2 focus:outline-none appearance-none bg-white transition-colors duration-300`;
  const themeClass = isRainy 
    ? 'border-rain-200 focus:border-rain-500 focus:ring-rain-200 text-slate-700' 
    : 'border-sun-200 focus:border-sun-500 focus:ring-sun-200 text-slate-700';

  return (
    <div className={`py-3 px-4 shadow-sm transition-colors duration-500 relative z-40 ${
       isRainy ? 'bg-rain-50 border-b border-rain-100' : 'bg-sun-50 border-b border-sun-100'
    }`}>
      <div className="max-w-3xl mx-auto space-y-3">
        {/* Filters */}
        <div>
           <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold opacity-70">
            <Filter className="w-3 h-3" />
            <span>篩選條件 {filters.indoorLevel !== 'all' && '(含更高等級)'}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <select
                value={filters.indoorLevel}
                onChange={handleLevelChange}
                className={`${selectBaseClass} ${themeClass}`}
              >
                <option value="all">所有室內等級</option>
                {Object.entries(INDOOR_LEVEL_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
               <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>

            <div className="relative">
              <select
                value={filters.parkingType}
                onChange={handleParkingChange}
                className={`${selectBaseClass} ${themeClass}`}
              >
                <option value="all">所有停車類型</option>
                {Object.entries(PARKING_TYPE_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
               <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;