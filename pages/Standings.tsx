
import React, { useMemo, useState } from 'react';
import { PAST_RESULTS } from '../constants';
import { RaceSeries, StandingEntry } from '../types';
import { Trophy, Medal, Flag, Zap, Award } from 'lucide-react';

interface CalculatedStanding extends StandingEntry {
  totalIncidents: number;
}

const Standings: React.FC = () => {
  const [activeSeries, setActiveSeries] = useState<RaceSeries>(RaceSeries.GT3_OPEN);

  // Calculate standings dynamically from race results
  const currentStandings = useMemo(() => {
    const seriesData = PAST_RESULTS.find(s => s.series === activeSeries && s.status === 'active');
    
    if (!seriesData) return [];

    const driverMap = new Map<string, CalculatedStanding>();

    seriesData.races.forEach(race => {
      race.results.forEach(result => {
        const existing = driverMap.get(result.name) || {
          pos: 0,
          name: result.name,
          points: 0,
          wins: 0,
          podiums: 0,
          car: result.car,
          totalIncidents: 0
        };

        existing.points += result.points;
        existing.totalIncidents += result.incidents;
        if (result.pos === 1) existing.wins += 1;
        if (result.pos <= 3) existing.podiums += 1;
        // Keep latest car choice
        existing.car = result.car;

        driverMap.set(result.name, existing);
      });
    });

    return Array.from(driverMap.values())
      .sort((a, b) => b.points - a.points)
      .map((entry, index) => ({ ...entry, pos: index + 1 }));
  }, [activeSeries]);

  const seriesName = activeSeries === RaceSeries.GT3_OPEN ? 'GT3 Open Championship' : 'Rookie Cup Series';
  const seriesColor = activeSeries === RaceSeries.GT3_OPEN ? 'text-red-600' : 'text-blue-600';
  const seriesBg = activeSeries === RaceSeries.GT3_OPEN ? 'bg-red-600' : 'bg-blue-600';

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-oswald font-bold uppercase italic tracking-tighter text-white mb-6">
          Championship <span className={seriesColor}>Standings</span>
        </h1>
        
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setActiveSeries(RaceSeries.GT3_OPEN)}
            className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all border ${
              activeSeries === RaceSeries.GT3_OPEN 
                ? 'bg-red-600 text-white border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.4)]' 
                : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            GT3 Open
          </button>
          <button 
            onClick={() => setActiveSeries(RaceSeries.ROOKIES)}
            className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all border ${
              activeSeries === RaceSeries.ROOKIES 
                ? 'bg-blue-600 text-white border-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.4)]' 
                : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30 hover:text-white'
            }`}
          >
            Rookie Cup
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Top 3 Podium Display */}
        <div className="lg:col-span-3 grid md:grid-cols-3 gap-6 mb-8 order-first">
          {currentStandings.slice(0, 3).map((driver) => (
            <div 
              key={driver.name} 
              className={`relative overflow-hidden rounded-[2rem] p-8 border transition-all hover:-translate-y-2 ${
                driver.pos === 1 
                  ? `bg-gradient-to-b from-${activeSeries === RaceSeries.GT3_OPEN ? 'red-900' : 'blue-900'}/40 to-[#0a0d14] border-${activeSeries === RaceSeries.GT3_OPEN ? 'red-600' : 'blue-600'} shadow-[0_0_50px_rgba(0,0,0,0.5)] order-first md:order-2 md:-mt-8 z-10` 
                  : 'bg-[#0a0d14] border-white/5 md:order-1'
              }`}
            >
              <div className="absolute top-4 right-4">
                {driver.pos === 1 && <Trophy size={48} className={activeSeries === RaceSeries.GT3_OPEN ? 'text-yellow-500' : 'text-yellow-400'} />}
                {driver.pos === 2 && <Medal size={40} className="text-gray-300" />}
                {driver.pos === 3 && <Medal size={40} className="text-orange-700" />}
              </div>
              
              <div className="mt-8 text-center">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl font-black italic mb-4 border-4 ${
                  driver.pos === 1 ? 'border-yellow-500 bg-yellow-500/20 text-yellow-500' : 
                  driver.pos === 2 ? 'border-gray-400 bg-gray-400/20 text-gray-300' : 
                  'border-orange-700 bg-orange-700/20 text-orange-600'
                }`}>
                  {driver.pos}
                </div>
                <h3 className="text-2xl font-bold text-white uppercase italic tracking-tighter mb-1">{driver.name}</h3>
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-6">{driver.car}</p>
                
                <div className="flex justify-center gap-8 border-t border-white/5 pt-6">
                  <div>
                    <span className="block text-3xl font-oswald font-bold text-white">{driver.points}</span>
                    <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Points</span>
                  </div>
                  <div>
                    <span className="block text-3xl font-oswald font-bold text-white">{driver.wins}</span>
                    <span className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Wins</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full Table */}
        <div className="lg:col-span-3 bg-[#0a0d14] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <Flag size={20} className={seriesColor} />
              <h3 className="text-lg font-bold text-white uppercase tracking-widest italic">{seriesName}</h3>
            </div>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">{currentStandings.length} Drivers Classified</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 bg-black/40">
                  <th className="px-8 py-5">Rank</th>
                  <th className="px-8 py-5">Driver</th>
                  <th className="px-8 py-5">Vehicle</th>
                  <th className="px-8 py-5 text-center">Starts</th>
                  <th className="px-8 py-5 text-center">Wins</th>
                  <th className="px-8 py-5 text-center">Top 3</th>
                  <th className="px-8 py-5 text-center">Incidents</th>
                  <th className="px-8 py-5 text-right text-white">Total Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {currentStandings.map((driver) => (
                  <tr key={driver.name} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-5">
                      <span className={`font-oswald font-bold text-xl italic ${driver.pos <= 3 ? 'text-white' : 'text-gray-600'}`}>
                        {driver.pos}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="font-bold text-gray-200 group-hover:text-white transition-colors">{driver.name}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{driver.car}</span>
                    </td>
                    {/* Starts (assuming 1 race per entry in our calc logic for now, though logic aggregated. Need to track starts separately if needed) */}
                    <td className="px-8 py-5 text-center text-gray-400 font-bold text-xs">-</td>
                    <td className="px-8 py-5 text-center">
                      {driver.wins > 0 ? <span className="text-yellow-500 font-bold">{driver.wins}</span> : <span className="text-gray-700">-</span>}
                    </td>
                    <td className="px-8 py-5 text-center">
                      {driver.podiums > 0 ? <span className="text-gray-300 font-bold">{driver.podiums}</span> : <span className="text-gray-700">-</span>}
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className="text-xs font-bold text-gray-500">{driver.totalIncidents}x</span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className={`text-xl font-oswald font-bold italic ${driver.pos <= 3 ? seriesColor : 'text-white'}`}>
                        {driver.points}
                      </span>
                    </td>
                  </tr>
                ))}
                {currentStandings.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-8 py-12 text-center">
                      <div className="flex flex-col items-center justify-center opacity-50">
                        <Award size={48} className="text-gray-600 mb-4" />
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">No championship data available yet for this series</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Standings;
