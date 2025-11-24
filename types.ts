export enum IndoorLevel {
  LEVEL_1 = 1, // Absolute Defense (Connected parking, fully indoor)
  LEVEL_2 = 2, // Indoor Area (Might need umbrella to get in/out)
  LEVEL_3 = 3, // Sheltered (Roofed outdoor areas)
}

export enum ParkingType {
  UNDERGROUND = 'underground',
  NEARBY_OUTDOOR = 'nearby',
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  indoorLevel: IndoorLevel;
  parkingType: ParkingType;
  distanceKm: number; // Simulated distance from user
  tags: string[];
  coordinates: Coordinates;
}

export interface FilterState {
  indoorLevel: IndoorLevel | 'all';
  parkingType: ParkingType | 'all';
}

export interface WeatherForecast {
  startTime: string;
  endTime: string;
  pop: number; // Probability of Precipitation %
}

export interface WeatherState {
  locationName: string; // e.g., "臺北市 - 信義區"
  forecasts: WeatherForecast[];
  selectedTimeIndex: number;
  loading: boolean;
  error: string | null;
}

export type WeatherTimeframe = 'now' | '72h';

export interface WeatherConfig {
  apiKey: string;
  timeframe: WeatherTimeframe;
}
