
import { RaceSeries, Race, Result, Member } from './types';

export const SCHEDULE: Race[] = [
  { id: '1', track: 'Spa-Francorchamps', date: '2024-06-15', series: RaceSeries.GT3_OPEN, duration: '60 min', isCompleted: false },
  { id: '2', track: 'Okayama International', date: '2024-06-16', series: RaceSeries.ROOKIES, duration: '20 min', isCompleted: false },
  { id: '3', track: 'Mount Panorama', date: '2024-06-22', series: RaceSeries.GT3_OPEN, duration: '60 min', isCompleted: false },
  { id: '4', track: 'Laguna Seca', date: '2024-06-23', series: RaceSeries.ROOKIES, duration: '20 min', isCompleted: false },
  { id: '5', track: 'Nürburgring Combined', date: '2024-06-29', series: RaceSeries.GT3_OPEN, duration: '90 min', isCompleted: false },
];

export const PAST_RESULTS: Result[] = [
  { season: 'Season 1', series: RaceSeries.GT3_OPEN, track: 'Daytona', winner: 'Max Verstappen', podium: ['Max Verstappen', 'Lewis Hamilton', 'Lando Norris'] },
  { season: 'Season 1', series: RaceSeries.ROOKIES, track: 'Lime Rock', winner: 'CNA_Racer99', podium: ['CNA_Racer99', 'SpeedyGonzales', 'DriftKing'] },
  { season: 'Season 2', series: RaceSeries.GT3_OPEN, track: 'Suzuka', winner: 'Charles Leclerc', podium: ['Charles Leclerc', 'Sergio Perez', 'Oscar Piastri'] },
];

export const MEMBERS: Member[] = [
  { id: 'm1', name: 'Admin_CNA', iRating: 4500, safetyRating: 'A 4.99', joinedDate: '2023-01-01', favCar: 'Ferrari 296 GT3', location: { lat: 51.5074, lng: -0.1278, city: 'London' } },
  { id: 'm2', name: 'ApexPredator', iRating: 3200, safetyRating: 'B 3.20', joinedDate: '2023-05-12', favCar: 'Porsche 911 GT3 R', location: { lat: 40.7128, lng: -74.0060, city: 'New York' } },
  { id: 'm3', name: 'SimGhost', iRating: 2800, safetyRating: 'C 2.50', joinedDate: '2023-08-20', favCar: 'Mazda MX-5', location: { lat: 35.6762, lng: 139.6503, city: 'Tokyo' } },
  { id: 'm4', name: 'Oversteer_Fan', iRating: 1500, safetyRating: 'D 3.80', joinedDate: '2024-02-10', favCar: 'Toyota GR86', location: { lat: -33.8688, lng: 151.2093, city: 'Sydney' } },
  { id: 'm5', name: 'NordschleifeKing', iRating: 5200, safetyRating: 'A 4.10', joinedDate: '2022-11-15', favCar: 'Mercedes AMG GT3', location: { lat: 50.3341, lng: 6.9427, city: 'Nürburg' } },
  { id: 'm6', name: 'DesertDrifter', iRating: 2100, safetyRating: 'B 2.80', joinedDate: '2024-01-05', favCar: 'Lamborghini Huracan', location: { lat: 25.2048, lng: 55.2708, city: 'Dubai' } },
];
