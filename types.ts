
export enum RaceSeries {
  GT3_OPEN = 'GT3 Open Series',
  ROOKIES = 'Rookies Series'
}

export interface Race {
  id: string;
  track: string;
  date: string;
  series: RaceSeries;
  duration: string;
  isCompleted: boolean;
}

export interface Result {
  season: string;
  series: RaceSeries;
  track: string;
  winner: string;
  podium: string[];
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
