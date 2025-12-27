
import { RaceSeries, Race, Result, Member, DetailedRace } from './types';

// Raw data provided by user
export const rookieData = {
    seriesName: "CNA 新手赛",
    seasonName: "Season 26S1",
    races: [
        { round: 1, track: "Circuito de Navarra 纳瓦拉", start: "2025-12-27T04:00:00Z", format: "MX-5 Cup · P(20min) + Q(20min) + R(20min)", note: "揭幕战" },
        { round: 2, track: "Lime Rock Park 莱姆洛克", start: "2026-01-03T04:00:00Z", format: "MX-5 Cup · P(20min) + Q(20min) + R(20min)" },
        { round: 3, track: "Summit Point Raceway 萨米特角", start: "2026-01-10T04:00:00Z", format: "MX-5 Cup · P(20min) + Q(20min) + R(20min)" },
        { round: 4, track: "Tsukuba Circuit 筑波", start: "2026-01-17T04:00:00Z", format: "MX-5 Cup · P(20min) + Q(20min) + R(20min)" },
        { round: 5, track: "Circuit de Lédenon 勒德农", start: "2026-01-24T04:00:00Z", format: "MX-5 Cup · P(20min) + Q(20min) + R(20min)" },
        { round: 6, track: "Oulton Park Circuit 奥尔顿公园", start: "2026-01-31T04:00:00Z", format: "MX-5 Cup · P(20min) + Q(20min) + R(20min)" },
        { round: 7, track: "Charlotte Motor Speedway 夏洛特", start: "2026-02-07T04:00:00Z", format: "MX-5 Cup · P(20min) + Q(20min) + R(20min)" },
        { round: 8, track: "Winton Motor Raceway 温顿", start: "2026-02-14T04:00:00Z", format: "MX-5 Cup · P(20min) + Q(20min) + R(20min)" },
        { round: 9, track: "Okayama International Circuit 冈山", start: "2026-02-21T04:00:00Z", format: "MX-5 Cup · P(20min) + Q(20min) + R(20min)" },
        { round: 10, track: "Summit Point Raceway 萨米特角", start: "2026-02-28T04:00:00Z", format: "MX-5 Cup · P(20min) + Q(20min) + R(20min)", note: "收官战" },
    ]
};

export const gt3openData = {
    seriesName: "CNA GT3 Open",
    seasonName: "Season 26S1",
    races: [
        { round: 1, track: "Autodromo Internazionale Enzo e Dino Ferrari 伊莫拉", start: "2025-12-21T03:59:00Z", format: "P(60分钟) + Q(20分钟) + R(40分钟,强制1停)", note: "揭幕战" },
        { round: 2, track: "Silverstone Circuit 银石", start: "2025-12-28T03:59:00Z", format: "P(60分钟) + Q(20分钟) + R(40分钟,强制1停)" },
        { round: 3, track: "Circuit des 24 Heures du Mans 勒芒", start: "2026-01-04T03:59:00Z", format: "P(60分钟) + Q(20分钟) + R(40分钟,强制1停)" },
        { round: 4, track: "Circuit de Spa-Francorchamps 斯帕", start: "2026-01-11T03:59:00Z", format: "P(60分钟) + Q(20分钟) + R(40分钟,强制1停)" },
        { round: 5, track: "Daytona International Speedway 代托纳", start: "2026-01-18T03:59:00Z", format: "P(60分钟) + Q(20分钟) + R(40分钟,强制1停)" },
        { round: 6, track: "Suzuka International Racing Course 铃鹿", start: "2026-01-25T03:59:00Z", format: "P(60分钟) + Q(20分钟) + R(40分钟,强制1停)" },
        { round: 7, track: "Autodromo Nazionale Monza 蒙扎", start: "2026-02-01T03:59:00Z", format: "P(60分钟) + Q(20分钟) + R(40分钟,强制1停)" },
        { round: 8, track: "Virginia International Raceway VIR", start: "2026-02-08T03:59:00Z", format: "P(60分钟) + Q(20分钟) + R(40分钟,强制1停)" },
        { round: 9, track: "Mount Panorama Circuit 巴瑟斯特", start: "2026-02-15T03:59:00Z", format: "P(60分钟) + Q(20分钟) + R(40分钟,强制1停)" },
        { round: 10, track: "Nürburgring Grand Prix Strecke 纽博格林GP", start: "2026-02-22T03:59:00Z", format: "P(60分钟) + Q(20分钟) + R(40分钟,强制1停)" },
        { round: 11, track: "Okayama International Circuit 冈山", start: "2026-03-01T04:59:00Z", format: "P(60分钟) + Q(20分钟) + R(40分钟,强制1停)" },
        { round: 12, track: "Nürburgring Combined 纽博格林综合", start: "2026-03-08T04:59:00Z", format: "P(10分钟) + Q(30分钟) + R(80分钟)", note: "收官战" },
    ]
};

// Map raw data to application-wide Race[] format
export const SCHEDULE: Race[] = [
  ...gt3openData.races.map(r => ({
    id: `gt3-r${r.round}`,
    round: r.round,
    track: r.track,
    date: r.start,
    series: RaceSeries.GT3_OPEN,
    duration: r.round === 12 ? "80 min" : "40 min",
    format: r.format,
    note: r.note,
    isCompleted: new Date(r.start) < new Date()
  })),
  ...rookieData.races.map(r => ({
    id: `rookie-r${r.round}`,
    round: r.round,
    track: r.track,
    date: r.start,
    series: RaceSeries.ROOKIES,
    duration: "20 min",
    format: r.format,
    note: r.note,
    isCompleted: new Date(r.start) < new Date()
  }))
];

const IMOLA_RESULT: DetailedRace = {
  subsession_id: 82056585,
  track_name: "Autodromo Internazionale Enzo e Dino Ferrari",
  track_config: "Grand Prix",
  start_time: "2025-12-21T03:59:11Z",
  strength_of_field: 1759,
  temp: 26,
  humidity: 45,
  results: [
    { pos: 1, startPos: 4, name: "Songtao Bai", car: "Aston Martin Vantage GT3 EVO", interval: "LEADER", bestLap: "1:42.922", incidents: 9, points: 25, status: "Running" },
    { pos: 2, startPos: 3, name: "Handa Yang", car: "Porsche 911 GT3 R (992)", interval: "+9.901s", bestLap: "1:43.272", incidents: 13, points: 18, status: "Running" },
    { pos: 3, startPos: 5, name: "Yao Jianzhong", car: "Ferrari 296 GT3", interval: "+27.776s", bestLap: "1:43.643", incidents: 5, points: 15, status: "Running" },
    { pos: 4, startPos: 1, name: "Suncheng Shi", car: "Chevrolet Corvette Z06 GT3.R", interval: "+42.911s", bestLap: "1:43.473", incidents: 19, points: 12, status: "Running" },
    { pos: 5, startPos: 8, name: "Li Xina", car: "Porsche 911 GT3 R (992)", interval: "+63.031s", bestLap: "1:44.618", incidents: 16, points: 10, status: "Running" },
    { pos: 6, startPos: 7, name: "Shuming Shi", car: "Porsche 911 GT3 R (992)", interval: "+72.780s", bestLap: "1:43.917", incidents: 19, points: 8, status: "Running" },
  ]
};

const SILVERSTONE_RESULT: DetailedRace = {
  subsession_id: 82199042,
  track_name: "Silverstone Circuit",
  track_config: "Grand Prix",
  start_time: "2025-12-28T03:59:00Z",
  strength_of_field: 1840,
  temp: 18,
  humidity: 62,
  results: [
    { pos: 1, startPos: 1, name: "Handa Yang", car: "Porsche 911 GT3 R (992)", interval: "LEADER", bestLap: "1:58.402", incidents: 4, points: 25, status: "Running" },
    { pos: 2, startPos: 4, name: "Songtao Bai", car: "Aston Martin Vantage GT3 EVO", interval: "+2.415s", bestLap: "1:58.911", incidents: 7, points: 18, status: "Running" },
    { pos: 3, startPos: 2, name: "Ethan Wang", car: "BMW M4 GT3 EVO", interval: "+14.009s", bestLap: "1:59.102", incidents: 12, points: 15, status: "Running" },
  ]
};

const LEMANS_RESULT: DetailedRace = {
  subsession_id: 82341055,
  track_name: "Circuit des 24 Heures du Mans",
  track_config: "24 Heures",
  start_time: "2026-01-04T03:59:00Z",
  strength_of_field: 1910,
  temp: 22,
  humidity: 50,
  results: [
    { pos: 1, startPos: 3, name: "Ethan Wang", car: "BMW M4 GT3 EVO", interval: "LEADER", bestLap: "3:52.115", incidents: 8, points: 25, status: "Running" },
    { pos: 2, startPos: 1, name: "Handa Yang", car: "Porsche 911 GT3 R (992)", interval: "+1.082s", bestLap: "3:51.998", incidents: 5, points: 18, status: "Running" },
    { pos: 3, startPos: 5, name: "Songtao Bai", car: "Aston Martin Vantage GT3 EVO", interval: "+35.401s", bestLap: "3:53.402", incidents: 10, points: 15, status: "Running" },
  ]
};

export const PAST_RESULTS: Result[] = [
  { 
    id: 's3-gt3-active',
    seasonName: 'Season 26S1', 
    series: RaceSeries.GT3_OPEN, 
    status: 'active',
    champion: { name: 'Handa Yang', points: 120, wins: 2, car: 'Porsche 911 GT3 R' },
    races: [IMOLA_RESULT, SILVERSTONE_RESULT, LEMANS_RESULT],
    standings: [
      { pos: 1, name: 'Handa Yang', points: 61, wins: 1, podiums: 3, car: 'Porsche 911 GT3 R' },
      { pos: 2, name: 'Songtao Bai', points: 58, wins: 1, podiums: 3, car: 'Aston Martin Vantage' },
      { pos: 3, name: 'Ethan Wang', points: 40, wins: 1, podiums: 2, car: 'BMW M4 GT3' },
      { pos: 4, name: 'Yao Jianzhong', points: 15, wins: 0, podiums: 1, car: 'Ferrari 296 GT3' },
    ]
  },
  { 
    id: 's26s1-rookie-active',
    seasonName: 'Season 26S1',
    series: RaceSeries.ROOKIES,
    status: 'active',
    champion: { name: "TBD", points: 0, wins: 0, car: "" },
    races: [],
    standings: []
  },
  { 
    id: 's1-gt3',
    seasonName: 'Season 1 (2024)', 
    series: RaceSeries.GT3_OPEN, 
    status: 'completed',
    champion: { name: 'Admin_CNA', points: 420, wins: 4, car: 'Ferrari 296 GT3' },
    races: [],
    standings: [
      { pos: 1, name: 'Admin_CNA', points: 420, wins: 4, podiums: 8, car: 'Ferrari 296 GT3' },
      { pos: 2, name: 'NordschleifeKing', points: 395, wins: 3, podiums: 7, car: 'Mercedes AMG GT3' },
    ]
  }
];

export const MEMBERS: Member[] = [
  { id: 'm1', name: 'Admin_CNA', iRating: 4500, safetyRating: 'A 4.99', joinedDate: '2023-01-01', favCar: 'Ferrari 296 GT3', location: { lat: 51.5074, lng: -0.1278, city: 'London' } },
  { id: 'm2', name: 'ApexPredator', iRating: 3200, safetyRating: 'B 3.20', joinedDate: '2023-05-12', favCar: 'Porsche 911 GT3 R', location: { lat: 40.7128, lng: -74.0060, city: 'New York' } },
  { id: 'm3', name: 'Songtao Bai', iRating: 3057, safetyRating: 'A 4.60', joinedDate: '2023-08-15', favCar: 'Aston Martin Vantage GT3 EVO', location: { lat: 31.2304, lng: 121.4737, city: 'Shanghai' } },
  { id: 'm4', name: 'Handa Yang', iRating: 2985, safetyRating: 'A 3.29', joinedDate: '2023-09-20', favCar: 'Porsche 911 GT3 R (992)', location: { lat: 39.9042, lng: 116.4074, city: 'Beijing' } },
];
