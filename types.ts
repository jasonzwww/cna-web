
export enum RaceSeries {
  GT3_OPEN = 'GT3 Open Series',
  ROOKIES = 'Rookies Series'
}

// Race represents an individual event entry in the league schedule
export interface Race {
  id: string;
  round: number;
  track: string;
  date: string;
  series: RaceSeries;
  duration: string;
  format?: string;
  note?: string;
  isCompleted: boolean;
}

export interface IRacingLicense {
  category: string;
  irating: number;
  safety_rating: string;
  license_level: string;
  color: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
  city: string;
  country: string;
}

export interface UserProfile {
  cust_id: number;
  display_name: string;
  licenses: {
    sports_car: IRacingLicense;
    formula: IRacingLicense;
  };
  last_sync: string;
  location?: UserLocation;
  cna_points: number;
  joined_race_ids: string[];
}

export interface StandingEntry {
  pos: number;
  name: string;
  points: number;
  wins: number;
  podiums: number;
  car?: string;
}

export interface RaceResultRow {
  pos: number;
  startPos: number;
  name: string;
  car: string;
  interval: string;
  bestLap: string;
  incidents: number;
  points: number;
  status: string;
}

export interface DetailedRace {
  subsession_id: number;
  track_name: string;
  track_config: string;
  start_time: string;
  strength_of_field: number;
  temp: number;
  humidity: number;
  results: RaceResultRow[];
}

export interface Result {
  id: string;
  seasonName: string;
  series: RaceSeries;
  status: 'active' | 'completed';
  champion: {
    name: string;
    points: number;
    wins: number;
    car: string;
  };
  standings: StandingEntry[];
  races: DetailedRace[];
}

export interface Member {
  id: string;
  name: string;
  iRating: number;
  safetyRating: string;
  joinedDate: string;
  favCar: string;
  location: {
    lat: number;
    lng: number;
    city: string;
  };
}

export interface EnduranceTeam {
  id: string;
  name: string;
  car: string;
  owner: string;
  members: string[];
  maxSlots: number;
}
