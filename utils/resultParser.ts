
import { DetailedRace, RaceResultRow } from '../types';

export function formatLapTime(time: number): string {
  if (time <= 0) return "-";
  // iRacing API usually provides time in 1/10000 of a second
  const seconds = time / 10000;
  const m = Math.floor(seconds / 60);
  const s = (seconds % 60).toFixed(3);
  return `${m}:${s.padStart(6, '0')}`;
}

export function formatInterval(interval: number): string {
  if (interval === 0) return "LEADER";
  if (interval === -1) return "-"; // Lapped or DNF
  // Convert 1/10000s to seconds
  return `+${(interval / 10000).toFixed(3)}s`;
}

export function parseIRacingResult(jsonData: any): DetailedRace {
  const session = jsonData.data.session_results.find((s: any) => s.simsession_name === "RACE");
  const raceResults = session ? session.results : [];
  
  const results: RaceResultRow[] = raceResults.map((r: any) => ({
    pos: r.finish_position + 1,
    startPos: r.starting_position + 1,
    name: r.display_name,
    car: r.car_name,
    interval: formatInterval(r.interval),
    bestLap: formatLapTime(r.best_lap_time),
    incidents: r.incidents,
    points: r.league_points,
    status: r.reason_out
  }));

  // Sort by position
  results.sort((a, b) => a.pos - b.pos);

  return {
    subsession_id: jsonData.data.subsession_id,
    track_name: jsonData.data.track.track_name,
    track_config: jsonData.data.track.config_name,
    start_time: jsonData.data.start_time,
    strength_of_field: jsonData.data.event_strength_of_field,
    temp: jsonData.data.weather.temp_value,
    humidity: jsonData.data.weather.rel_humidity,
    results: results
  };
}
