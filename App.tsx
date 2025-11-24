import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import FilterSection from './components/FilterSection';
import LocationCard from './components/LocationCard';
import MapView from './components/MapView';
import { 
  MOCK_LOCATIONS, 
  CWA_API_KEY, 
  getNearestCity, 
} from './constants';
import { FilterState, WeatherState, Location, IndoorLevel } from './types';
import { MapPinOff, Map as MapIcon, List as ListIcon } from 'lucide-react';

const App: React.FC = () => {
  // Core State
  const [isRainy, setIsRainy] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');

  // Weather State
  const [weatherState, setWeatherState] = useState<WeatherState>({
    locationName: '定位中...',
    forecasts: [],
    selectedTimeIndex: 0,
    loading: true,
    error: null
  });

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    indoorLevel: 'all',
    parkingType: 'all',
  });

  // User Position Storage for distance calculation
  const [userPos, setUserPos] = useState<{lat: number, lng: number} | null>(null);

  // Weather Fetching Logic (F-C0032-001 General 36h Forecast)
  const fetchWeather = async (lat: number, lng: number) => {
    setWeatherState(prev => ({ ...prev, loading: true, error: null }));
    setUserPos({ lat, lng });
    
    try {
      const city = getNearestCity(lat, lng);
      const baseUrl = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${CWA_API_KEY}&format=JSON&locationName=${encodeURIComponent(city)}&elementName=PoP`;
      
      const res = await fetch(baseUrl);
      if (!res.ok) throw new Error(`Weather API Error: ${res.status}`);
      
      const data = await res.json();
      
      if (data.success === 'false') {
        throw new Error(data.error?.message || "Unknown API Error");
      }

      const locationData = data.records?.location?.[0];
      if (!locationData) {
        throw new Error("City weather data not found");
      }

      const popElement = locationData.weatherElement?.find((el: any) => el.elementName === 'PoP');
      
      if (popElement && popElement.time) {
        const rawForecasts = popElement.time.map((t: any) => {
          const val = parseInt(t.parameter.parameterName);
          return {
            startTime: t.startTime,
            endTime: t.endTime,
            pop: isNaN(val) ? 0 : val
          };
        });

        setWeatherState(prev => {
          const newIndex = prev.selectedTimeIndex < rawForecasts.length ? prev.selectedTimeIndex : 0;
          return {
            ...prev,
            locationName: city,
            forecasts: rawForecasts,
            loading: false,
            selectedTimeIndex: newIndex
          };
        });

      } else {
         throw new Error("No PoP data found");
      }

    } catch (err) {
      console.error("Fetch weather error:", err);
      setWeatherState(prev => ({
        ...prev,
        loading: false,
        error: "無法取得氣象資料，已切換至模擬模式",
        locationName: "氣象資料異常"
      }));
      setIsRainy(true); 
    }
  };

  // Initial Geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (error) => {
          console.error("Geolocation error:", error.message);
          fetchWeather(25.0339, 121.5645);
        }
      );
    } else {
       fetchWeather(25.0339, 121.5645);
    }
  }, []);

  // Monitor Rain Probability and Update Logic
  useEffect(() => {
    if (weatherState.forecasts.length > 0) {
      const currentPop = weatherState.forecasts[weatherState.selectedTimeIndex].pop;
      
      // 1. Update Rainy State (Threshold 30%)
      const isRainingNow = currentPop >= 30;
      setIsRainy(isRainingNow);

      // 2. Auto-Update Filter (Threshold 70%)
      // If rain probability > 70%, automatically switch filter to "Level 2 (Indoor Area)" or better
      if (currentPop > 70) {
        setFilters(prev => ({
          ...prev,
          indoorLevel: IndoorLevel.LEVEL_2
        }));
      }
    }
  }, [weatherState.selectedTimeIndex, weatherState.forecasts]);


  // Calculation & Filtering
  const filteredLocations = useMemo(() => {
    let result = MOCK_LOCATIONS.filter(loc => {
      // 1. Filter by Indoor Level (INCLUSIVE: Show selected level AND BETTER)
      // Level 1 is better than Level 2.
      // If user selects Lv2 (2), we want Lv1(1) and Lv2(2).
      // So loc.indoorLevel (1) <= filters.indoorLevel (2)
      if (filters.indoorLevel !== 'all') {
         if (loc.indoorLevel > filters.indoorLevel) {
           return false;
         }
      }

      // 2. Filter by Parking (Exact Match)
      if (filters.parkingType !== 'all' && loc.parkingType !== filters.parkingType) {
        return false;
      }
      return true;
    });

    // 3. Recalculate Distance
    if (userPos) {
      result = result.map(loc => {
        const dist = Math.sqrt(
          Math.pow(loc.coordinates.lat - userPos.lat, 2) + 
          Math.pow(loc.coordinates.lng - userPos.lng, 2)
        ) * 111;
        return { ...loc, distanceKm: parseFloat(dist.toFixed(1)) };
      });
      result.sort((a, b) => a.distanceKm - b.distanceKm);
    }

    return result;
  }, [filters, userPos]);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-gray-50 text-slate-900">
      
      {/* 1. Fixed Header */}
      <div className="flex-none">
        <Header 
          isRainy={isRainy} 
          onToggleMode={() => setIsRainy(!isRainy)}
          weatherState={weatherState}
          onTimeSelect={(index) => setWeatherState(prev => ({...prev, selectedTimeIndex: index}))}
        />
      </div>

      {/* 2. Fixed Filter Section */}
      <div className="flex-none z-40">
        <FilterSection 
          filters={filters} 
          setFilters={setFilters} 
          isRainy={isRainy} 
        />
      </div>

      {/* 3. Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        {viewMode === 'list' ? (
          <div className="h-full overflow-y-auto px-4 py-4 pb-20 space-y-4 scroll-smooth bg-gray-50">
            {filteredLocations.length > 0 ? (
              filteredLocations.map(loc => (
                <LocationCard key={loc.id} location={loc} isRainy={isRainy} />
              ))
            ) : (
              <div className="text-center py-12 opacity-60">
                <MapPinOff className="w-12 h-12 mx-auto mb-2" />
                <p>找不到符合條件的雨備地點</p>
                <button 
                  onClick={() => setFilters({ indoorLevel: 'all', parkingType: 'all' })}
                  className="mt-4 text-blue-600 font-bold text-sm"
                >
                  清除篩選條件
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full w-full">
            <MapView 
              locations={filteredLocations} 
              isRainy={isRainy} 
              onSearchArea={(lat, lng) => fetchWeather(lat, lng)}
            />
          </div>
        )}

        {/* Floating View Toggle Button */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={() => setViewMode(prev => prev === 'map' ? 'list' : 'map')}
            className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all font-bold border border-white/10"
          >
            {viewMode === 'map' ? (
              <>
                <ListIcon className="w-5 h-5" />
                列表模式
              </>
            ) : (
              <>
                <MapIcon className="w-5 h-5" />
                地圖模式
              </>
            )}
          </button>
        </div>

      </main>
    </div>
  );
};

export default App;