import React, { useEffect, useRef, useState } from 'react';
import { Location, IndoorLevel } from '../types';
import { Search } from 'lucide-react';

interface MapViewProps {
  locations: Location[];
  isRainy: boolean;
  onSearchArea: (lat: number, lng: number) => void;
}

// Declare Leaflet global type
declare const L: any;

const MapView: React.FC<MapViewProps> = ({ locations, isRainy, onSearchArea }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [showSearchButton, setShowSearchButton] = useState(false);
  const [mapCenter, setMapCenter] = useState<{lat: number, lng: number} | null>(null);

  // Cuter, bolder icons
  const getIconHtml = (level: IndoorLevel, colorClass: string, shadowClass: string) => {
    let iconSvg = '';
    // Shield for Lv1
    if (level === IndoorLevel.LEVEL_1) {
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-white"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.89 7 3.89V12h-7v1z"/></svg>`;
    }
    // Building for Lv2
    else if (level === IndoorLevel.LEVEL_2) {
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-white"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>`;
    }
    // Umbrella for Lv3
    else {
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-white"><path d="M12 6c-3.87 0-7 3.13-7 7h14c0-3.87-3.13-7-7-7zm0-4C6.48 2 2 6.48 2 12h1v11h2V13h2v7h2V13h2v7h2V13h2v11h1c0-5.52-4.48-10-10-10z"/></svg>`;
    }

    return `
      <div class="relative group">
        <div class="${colorClass} w-10 h-10 rounded-full flex items-center justify-center shadow-xl border-[3px] border-white transform transition-transform hover:scale-110 custom-marker-bounce relative z-10">
          ${iconSvg}
        </div>
        <div class="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 translate-y-0 z-0">
          <div class="w-3 h-3 bg-white rotate-45 transform origin-center shadow-sm"></div>
        </div>
      </div>
    `;
  };

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([25.0330, 121.5654], 13);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapInstanceRef.current);

      mapInstanceRef.current.on('moveend', () => {
        const center = mapInstanceRef.current.getCenter();
        setMapCenter({ lat: center.lat, lng: center.lng });
        setShowSearchButton(true);
      });
    }

    const map = mapInstanceRef.current;

    setTimeout(() => {
        map.invalidateSize();
    }, 100);

    markersRef.current.forEach(marker => map.removeLayer(marker));
    markersRef.current = [];

    const bounds = L.latLngBounds([]);
    
    locations.forEach(location => {
      let colorClass = 'bg-blue-500';
      if (location.indoorLevel === IndoorLevel.LEVEL_1) colorClass = 'bg-emerald-500';
      if (location.indoorLevel === IndoorLevel.LEVEL_2) colorClass = 'bg-amber-400';
      if (location.indoorLevel === IndoorLevel.LEVEL_3) colorClass = 'bg-rose-500';

      const customIcon = L.divIcon({
        className: 'bg-transparent border-none', 
        html: getIconHtml(location.indoorLevel, colorClass, ''),
        iconSize: [40, 48],
        iconAnchor: [20, 48], 
        popupAnchor: [0, -48]
      });

      const navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`;

      const marker = L.marker([location.coordinates.lat, location.coordinates.lng], { icon: customIcon })
        .addTo(map)
        .bindPopup(`
          <div class="font-sans min-w-[200px] p-1">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xs font-bold px-2 py-0.5 rounded text-white ${colorClass}">
                Lv${location.indoorLevel}
              </span>
              <span class="text-xs font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                ${location.parkingType === 'underground' ? '地下' : '室外'}
              </span>
            </div>
            <h3 class="font-bold text-base text-slate-800 mb-1">${location.name}</h3>
            <p class="text-xs text-slate-600 leading-relaxed mb-3 line-clamp-2">${location.description}</p>
            
            <a href="${navigationUrl}" target="_blank" class="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg text-xs transition-colors shadow-sm flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
              前往導航
            </a>
          </div>
        `);
      
      markersRef.current.push(marker);
      bounds.extend([location.coordinates.lat, location.coordinates.lng]);
    });

    if (locations.length > 0 && !showSearchButton) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }

  }, [locations, isRainy]);

  const handleSearchClick = () => {
    if (mapCenter) {
      onSearchArea(mapCenter.lat, mapCenter.lng);
      setShowSearchButton(false);
    }
  };

  return (
    <div className="w-full h-full relative z-0">
      <div ref={mapRef} className="w-full h-full bg-gray-100" />
      
      {showSearchButton && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[400]">
          <button 
            onClick={handleSearchClick}
            className="bg-white text-slate-800 px-4 py-2 rounded-full shadow-lg border border-slate-200 font-bold text-sm flex items-center gap-2 animate-in fade-in zoom-in duration-200 hover:bg-gray-50 active:scale-95"
          >
            <Search className="w-4 h-4 text-blue-500" />
            用此地圖中心查詢
          </button>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-6 right-2 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg text-xs z-[400] border border-gray-100 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-sm border border-white"></div>
          <span className="font-medium text-slate-700">Lv1 絕對防禦</span>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-4 h-4 rounded-full bg-amber-400 shadow-sm border border-white"></div>
          <span className="font-medium text-slate-700">Lv2 室內區域</span>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-4 h-4 rounded-full bg-rose-500 shadow-sm border border-white"></div>
          <span className="font-medium text-slate-700">Lv3 有遮蔽</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;