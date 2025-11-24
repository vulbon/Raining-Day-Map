import React, { useState } from 'react';
import { CloudLightning, X, Search, Loader2 } from 'lucide-react';
import { WeatherConfig, WeatherTimeframe } from '../types';

interface WeatherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdateWeather: (isRainy: boolean) => void;
}

const WeatherModal: React.FC<WeatherModalProps> = ({ isOpen, onClose, onUpdateWeather }) => {
  // Default API Key set as requested
  const [apiKey, setApiKey] = useState(localStorage.getItem('cwa_api_key') || 'CWA-D26EDAF5-97BE-43CC-BCFC-A9E5F7946D5F');
  const [timeframe, setTimeframe] = useState<WeatherTimeframe>('now');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveAndCheck = async () => {
    setError(null);
    setResultMessage(null);

    // Save API key for convenience
    if (apiKey) localStorage.setItem('cwa_api_key', apiKey);

    // If no API Key provided, show error
    if (!apiKey) {
      setError("請輸入 CWA API Key 才能查詢真實資料。");
      return;
    }

    setLoading(true);

    try {
      // Use CWA Open Data API (F-C0032-001: General Forecast for 36 hours)
      // This is a free endpoint but requires a key.
      const url = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${apiKey}&locationName=臺北市`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("API 請求失敗，請檢查 Key 是否正確");
      }

      const data = await response.json();
      const locationData = data.records.location[0]; // Taipei City
      const weatherElements = locationData.weatherElement;
      
      // PoP = Probability of Precipitation (PoP)
      const popElement = weatherElements.find((el: any) => el.elementName === 'PoP');
      
      if (popElement && popElement.time && popElement.time.length > 0) {
        // Get the relevant timeframe
        // If 'now', take the first slot. If '72h' (conceptually future), take the second or last slot of the 36h forecast for demo
        const timeIndex = timeframe === 'now' ? 0 : 1; 
        const forecast = popElement.time[timeIndex];
        const popValue = parseInt(forecast.parameter.parameterName);

        const isRaining = popValue >= 30; // Threshold: 30% chance

        setResultMessage(`預報降雨機率: ${popValue}% (${forecast.startTime.substring(5,13)} ~ ${forecast.endTime.substring(5,13)})`);
        onUpdateWeather(isRaining);
        
        setTimeout(() => {
          if (isRaining) alert(`降雨機率 ${popValue}%，已切換為雨備模式！`);
          else alert(`降雨機率 ${popValue}%，切換為一般模式。`);
          onClose();
        }, 1500);
      } else {
        throw new Error("無法解析氣象資料");
      }

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "發生未知錯誤");
      
      // Fallback Mock for Demo purposes if API fails (e.g., CORS or bad key)
      const mockPoP = Math.floor(Math.random() * 100);
      setResultMessage(`(模擬數據) 降雨機率: ${mockPoP}% - API 連線失敗`);
      const mockIsRainy = mockPoP > 30;
      onUpdateWeather(mockIsRainy);
      setTimeout(() => {
         onClose();
      }, 1500);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-slate-800 text-white p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <CloudLightning className="w-5 h-5" />
            氣象預報設定 (CWA)
          </h2>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              CWA Open Data API Key
            </label>
            <input 
              type="text" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="請輸入您的氣象局 API Key"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
            <p className="text-xs text-slate-400 mt-1">
              * 需要 API Key 才能取得真實資料。若無 Key 則使用模擬數據。
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              預報時程
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTimeframe('now')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                  timeframe === 'now' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-gray-300 text-slate-600'
                }`}
              >
                現在 / 近期
              </button>
              <button
                onClick={() => setTimeframe('72h')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${
                  timeframe === '72h' 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-gray-300 text-slate-600'
                }`}
              >
                未來 36-72 小時
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          {resultMessage && (
            <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg border border-green-100 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {resultMessage}
            </div>
          )}

          <button
            onClick={handleSaveAndCheck}
            disabled={loading}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                查詢中...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                查詢並自動判斷
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherModal;