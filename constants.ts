import { IndoorLevel, Location, ParkingType } from './types';

export const CWA_API_KEY = "CWA-D26EDAF5-97BE-43CC-BCFC-A9E5F7946D5F";

// Simplified City Center Coordinates for Taiwan (Major areas)
// Used to map Lat/Lng to a City Name for F-C0032-001 API
export const TAIWAN_CITIES = [
  { name: '臺北市', lat: 25.032969, lng: 121.565418 },
  { name: '新北市', lat: 25.016982, lng: 121.462786 },
  { name: '基隆市', lat: 25.127603, lng: 121.739183 },
  { name: '宜蘭縣', lat: 24.702107, lng: 121.737750 },
  { name: '桃園市', lat: 24.993628, lng: 121.300979 },
  { name: '新竹市', lat: 24.813829, lng: 120.967480 },
  { name: '新竹縣', lat: 24.839692, lng: 121.011891 },
  { name: '臺中市', lat: 24.1477, lng: 120.6736 },
  { name: '臺南市', lat: 22.9997, lng: 120.2270 },
  { name: '高雄市', lat: 22.6129, lng: 120.3056 },
];

export const MOCK_LOCATIONS: Location[] = [
  // --- 台北市 (Taipei City) ---
  {
    id: 'tp-01',
    name: '台北 101 購物中心',
    description: '國際級地標，完全室內連接捷運，美食購物一站滿足。',
    indoorLevel: IndoorLevel.LEVEL_1,
    parkingType: ParkingType.UNDERGROUND,
    distanceKm: 0.0,
    tags: ['Shopping', 'View', 'Dining'],
    coordinates: { lat: 25.0339, lng: 121.5645 },
  },
  {
    id: 'tp-02',
    name: 'BELLAVITA 寶麗廣塲',
    description: '貴婦百貨，歐式中庭採光極佳，下雨天也有好心情。',
    indoorLevel: IndoorLevel.LEVEL_1,
    parkingType: ParkingType.UNDERGROUND,
    distanceKm: 0.0,
    tags: ['Luxury', 'Photo', 'Dining'],
    coordinates: { lat: 25.0395, lng: 121.5663 },
  },
  {
    id: 'tp-03',
    name: '美麗華百樂園 (Miramar)',
    description: '內湖地標摩天輪，百貨本身為全室內，停車場位子多。',
    indoorLevel: IndoorLevel.LEVEL_1,
    parkingType: ParkingType.UNDERGROUND,
    distanceKm: 0.0,
    tags: ['Cinema', 'Family', 'Shopping'],
    coordinates: { lat: 25.0835, lng: 121.5574 },
  },
  {
    id: 'tp-04',
    name: 'CITYLINK 南港店',
    description: '三鐵共構，完全不出站即可抵達，最適合暴雨天。',
    indoorLevel: IndoorLevel.LEVEL_1,
    parkingType: ParkingType.UNDERGROUND,
    distanceKm: 0.0,
    tags: ['Transport', 'Books', 'Food'],
    coordinates: { lat: 25.0522, lng: 121.6067 },
  },
  {
    id: 'tp-05',
    name: '華山 1914 文創園區',
    description: '看展覽首選，但展館間移動需撐傘。',
    indoorLevel: IndoorLevel.LEVEL_2,
    parkingType: ParkingType.NEARBY_OUTDOOR,
    distanceKm: 0.0,
    tags: ['Art', 'Exhibition', 'Coffee'],
    coordinates: { lat: 25.0441, lng: 121.5294 },
  },
  {
    id: 'tp-06',
    name: '台北地下街 (Y區/Z區)',
    description: '超長地下步道，連接北車與捷運，完全避雨的平價選擇。',
    indoorLevel: IndoorLevel.LEVEL_1,
    parkingType: ParkingType.UNDERGROUND,
    distanceKm: 0.0,
    tags: ['Budget', 'Games', 'Walking'],
    coordinates: { lat: 25.0485, lng: 121.5173 },
  },
  {
    id: 'tp-07',
    name: '臺北市立美術館',
    description: '充滿現代感的藝術空間，室內挑高寬敞。',
    indoorLevel: IndoorLevel.LEVEL_1,
    parkingType: ParkingType.NEARBY_OUTDOOR,
    distanceKm: 0.0,
    tags: ['Art', 'Museum', 'Quiet'],
    coordinates: { lat: 25.0725, lng: 121.5246 },
  },
  {
    id: 'tp-08',
    name: '松山文創園區 (菸廠)',
    description: '誠品生活松菸店為全室內，但園區倉庫間需戶外移動。',
    indoorLevel: IndoorLevel.LEVEL_2,
    parkingType: ParkingType.UNDERGROUND,
    distanceKm: 0.0,
    tags: ['Design', 'Books', 'Walk'],
    coordinates: { lat: 25.0435, lng: 121.5606 },
  },

  // --- 新北市 (New Taipei City) ---
  {
    id: 'ntp-01',
    name: 'Mega City 板橋大遠百',
    description: '板橋車站連通，威秀影城與美食街一應俱全。',
    indoorLevel: IndoorLevel.LEVEL_1,
    parkingType: ParkingType.UNDERGROUND,
    distanceKm: 0.0,
    tags: ['Cinema', 'Food', 'Shopping'],
    coordinates: { lat: 25.0116, lng: 121.4646 },
  },
  {
    id: 'ntp-02',
    name: 'MITSUI OUTLET PARK 林口',
    description: '林口三井，半戶外美式風格，二樓有遮蔽長廊。',
    indoorLevel: IndoorLevel.LEVEL_2,
    parkingType: ParkingType.UNDERGROUND,
    distanceKm: 0.0,
    tags: ['Outlet', 'Shopping', 'OpenAir'],
    coordinates: { lat: 25.0715, lng: 121.3668 },
  },
  {
    id: 'ntp-03',
    name: '宏匯廣場 (Honhui Plaza)',
    description: '新莊副都心最大商場，VR 樂園適合雨天消磨時間。',
    indoorLevel: IndoorLevel.LEVEL_1,
    parkingType: ParkingType.UNDERGROUND,
    distanceKm: 0.0,
    tags: ['VR', 'Concert', 'Dining'],
    coordinates: { lat: 25.0596, lng: 121.4503 },
  },
  {
    id: 'ntp-04',
    name: 'Global Mall 中和環球',
    description: '適合親子家庭，室內空間大，停車方便。',
    indoorLevel: IndoorLevel.LEVEL_1,
    parkingType: ParkingType.UNDERGROUND,
    distanceKm: 0.0,
    tags: ['Family', 'Kids', 'Cinema'],
    coordinates: { lat: 25.0064, lng: 121.4751 },
  },

  // --- 基隆市 (Keelung City) ---
  {
    id: 'kl-01',
    name: '基隆海洋廣場',
    description: '雖然是戶外，但有部分遮雨棚，適合觀賞港口雨景。',
    indoorLevel: IndoorLevel.LEVEL_3,
    parkingType: ParkingType.NEARBY_OUTDOOR,
    distanceKm: 0.0,
    tags: ['View', 'Harbor', 'Walk'],
    coordinates: { lat: 25.1296, lng: 121.7397 },
  },
  {
    id: 'kl-02',
    name: '基隆東岸廣場 E-Square',
    description: '改建後的商場，樓上有跑道，樓下是室內商場與停車場。',
    indoorLevel: IndoorLevel.LEVEL_2,
    parkingType: ParkingType.UNDERGROUND,
    distanceKm: 0.0,
    tags: ['Food', 'View', 'Parking'],
    coordinates: { lat: 25.1287, lng: 121.7410 },
  },
  {
    id: 'kl-03',
    name: '國立海洋科技博物館',
    description: '八斗子的大型博物館，完全室內，雨天寓教於樂好去處。',
    indoorLevel: IndoorLevel.LEVEL_1,
    parkingType: ParkingType.UNDERGROUND,
    distanceKm: 0.0,
    tags: ['Education', 'Museum', 'Family'],
    coordinates: { lat: 25.1415, lng: 121.8029 },
  },

  // --- 宜蘭縣 (Yilan County) ---
  {
    id: 'yl-01',
    name: '蘭陽博物館',
    description: '建築本身就是藝術，全室內展覽，避雨同時看龜山島。',
    indoorLevel: IndoorLevel.LEVEL_1,
    parkingType: ParkingType.NEARBY_OUTDOOR,
    distanceKm: 0.0,
    tags: ['Museum', 'Architecture', 'Culture'],
    coordinates: { lat: 24.8691, lng: 121.8335 },
  },
  {
    id: 'yl-02',
    name: '新月廣場 (Luna Plaza)',
    description: '宜蘭最大購物中心，結合晶英酒店，吃喝玩樂全包。',
    indoorLevel: IndoorLevel.LEVEL_1,
    parkingType: ParkingType.UNDERGROUND,
    distanceKm: 0.0,
    tags: ['Shopping', 'Hotel', 'Food'],
    coordinates: { lat: 24.7538, lng: 121.7513 },
  },
  {
    id: 'yl-03',
    name: '國立傳統藝術中心',
    description: '老街有騎樓遮蔽，但園區較大，穿梭各館需撐傘。',
    indoorLevel: IndoorLevel.LEVEL_3,
    parkingType: ParkingType.NEARBY_OUTDOOR,
    distanceKm: 0.0,
    tags: ['Culture', 'History', 'Crafts'],
    coordinates: { lat: 24.6866, lng: 121.8239 },
  },
  {
    id: 'yl-04',
    name: '金車噶瑪蘭威士忌酒廠',
    description: '員山鄉的製酒殿堂，各館間有長廊或需開車移動。',
    indoorLevel: IndoorLevel.LEVEL_2,
    parkingType: ParkingType.NEARBY_OUTDOOR,
    distanceKm: 0.0,
    tags: ['Alcohol', 'Tour', 'Tasting'],
    coordinates: { lat: 24.7126, lng: 121.6917 },
  },
];

export const INDOOR_LEVEL_LABELS: Record<IndoorLevel, string> = {
  [IndoorLevel.LEVEL_1]: 'Lv 1 絕對防禦 (完全室內)',
  [IndoorLevel.LEVEL_2]: 'Lv 2 室內區域 (需短暫戶外)',
  [IndoorLevel.LEVEL_3]: 'Lv 3 有遮蔽 (半戶外)',
};

export const PARKING_TYPE_LABELS: Record<ParkingType, string> = {
  [ParkingType.UNDERGROUND]: '地下停車場 (直達)',
  [ParkingType.NEARBY_OUTDOOR]: '附近室外停車',
};

export function getNearestCity(lat: number, lng: number): string {
  let minDistance = Infinity;
  let nearestCity = '臺北市'; // Default

  TAIWAN_CITIES.forEach(city => {
    // Euclidean distance
    const dist = Math.sqrt(Math.pow(city.lat - lat, 2) + Math.pow(city.lng - lng, 2));
    if (dist < minDistance) {
      minDistance = dist;
      nearestCity = city.name;
    }
  });

  return nearestCity;
}
