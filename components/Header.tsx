import React from 'react';
import { CloudRain, Sun, MapPin, Loader2 } from 'lucide-react';
import { WeatherState } from '../types';

interface HeaderProps {
  isRainy: boolean;
  onToggleMode: () => void;
  weatherState: WeatherState;
  onTimeSelect: (index: number) => void;
}

const Header: React.FC<HeaderProps> = ({ isRainy, onToggleMode, weatherState, onTimeSelect }) => {
  const currentForecast = weatherState.forecasts[weatherState.selectedTimeIndex];

  return (
    <header 
      className={`shadow-md transition-colors duration-500 relative z-50 ${
        isRainy ? 'bg-rain-900 text-white' : 'bg-sun-500 text-white'
      }`}
    >
      <div className="w-full px-4 pt-3 pb-3 flex justify-between items-start">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full mt-1 ${isRainy ? 'bg-rain-800' : 'bg-sun-400'}`}>
            {isRainy ? <CloudRain className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none">
              雨備景點
            </h1>
            <p className="text-[10px] opacity-80 mt-1">
              {isRainy ? '躲雨指南' : '出遊建議'}
            </p>
          </div>
        </div>
        
        {/* Manual Toggle */}
        <button
          onClick={onToggleMode}
          className={`flex-none ml-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm active:scale-95 whitespace-nowrap self-center ${
            isRainy 
              ? 'bg-rain-800 hover:bg-rain-700 text-rain-50 border border-rain-600' 
              : 'bg-sun-600 hover:bg-sun-700 text-sun-50 border border-sun-400'
          }`}
        >
          {isRainy ? '強制晴天' : '強制雨天'}
        </button>
      </div>

      {/* Weather Info Bar - Full Width below title */}
      <div className={`px-4 py-2 text-xs flex items-center justify-between border-t ${
        isRainy ? 'border-rain-800 bg-rain-800/50' : 'border-sun-400 bg-sun-600/50'
      }`}>
        {/* Location Info */}
        <div className="flex items-center gap-1.5 min-w-0">
          <MapPin className="w-3.5 h-3.5 opacity-80 shrink-0" />
          {weatherState.loading ? (
             <span className="flex items-center gap-1">
               <Loader2 className="w-3 h-3 animate-spin" /> 定位中...
             </span>
          ) : (
            <span className="font-medium truncate max-w-[80px]">
              {weatherState.locationName || '未知地點'}
            </span>
          )}
        </div>

        {/* Forecast Selector */}
        <div className="flex items-center gap-2 flex-1 justify-end">
           {weatherState.forecasts.length > 0 && !weatherState.loading ? (
             <>
                <span className={`font-bold ${currentForecast?.pop >= 30 ? 'text-blue-200' : 'text-yellow-100'}`}>
                   ☔ {currentForecast?.pop}%
                </span>
                <div className="h-4 w-px bg-white/20 mx-1"></div>
                <select 
                  className={`bg-transparent border-none p-0 text-xs font-medium focus:ring-0 cursor-pointer ${
                    isRainy ? 'text-rain-50' : 'text-sun-50'
                  }`}
                  value={weatherState.selectedTimeIndex}
                  onChange={(e) => onTimeSelect(Number(e.target.value))}
                >
                  {weatherState.forecasts.map((f, idx) => (
                    <option key={idx} value={idx} className="text-slate-800">
                      {f.startTime.substring(5, 13)} ~ {f.endTime.substring(8, 13)}
                    </option>
                  ))}
                </select>
             </>
           ) : (
             <span className="opacity-70">暫無預報資料</span>
           )}
        </div>
      </div>
    </header>
  );
};

export default Header;