
import React, { useState, useMemo } from 'react';
import { PAST_RESULTS, SCHEDULE } from '../constants';
import { RaceSeries, Result, DetailedRace } from '../types';
import { 
  Trophy, 
  Flag, 
  BarChart3, 
  ChevronLeft, 
  Calendar, 
  Activity,
  ExternalLink,
  ChevronRight,
  Medal,
  Timer,
  Zap,
  Thermometer,
  Droplets,
  MoveUp,
  MoveDown,
  X,
  Clock
} from 'lucide-react';

const OfficialRaceReport: React.FC<{ race: DetailedRace; onBack: () => void }> = ({ race, onBack }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-[#05060a] overflow-y-auto px-4 py-8 md:p-12 animate-in fade-in zoom-in-95 duration-300">
      <div className="max-w-[1400px] mx-auto bg-[#0a0c14] border border-white/5 rounded-[2.5rem] p-6 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative">
        
        {/* Close Button */}
        <button 
          onClick={onBack}
          className="absolute top-8 right-8 md:top-12 md:right-12 w-12 h-12 bg-white/5 hover:bg-red-600 transition-all rounded-full flex items-center justify-center text-white border border-white/10 group"
        >
          <X size={24} className="group-hover:scale-110" />
        </button>

        {/* Header Section */}
        <header className="mb-12 md:mb-20">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-[10px] font-black text-red-600 bg-red-600/10 px-3 py-1 rounded uppercase tracking-[0.3em]">CNA Racing Official Result</span>
            <span className="text-[10px] font-black text-gray-600 bg-white/5 px-3 py-1 rounded uppercase tracking-[0.3em]">ID: {race.subsession_id}</span>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-7xl font-oswald font-bold text-white uppercase italic leading-[0.9] tracking-tighter mb-4">
                {race.track_name}
              </h1>
              <p className="text-xl text-gray-500 font-medium">{race.track_config}</p>
            </div>

            <div className="flex items-center gap-12">
              <div className="text-center px-6 border-r border-white/10">
                <span className="block text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2">Strength of Field</span>
                <span className="text-4xl font-oswald font-bold text-white leading-none tracking-tighter">{race.strength_of_field}</span>
              </div>
              <div className="flex gap-8">
                <div className="flex items-center gap-3">
                  <Thermometer size={24} className="text-red-500" />
                  <span className="text-2xl font-oswald font-bold text-white">{race.temp}°C</span>
                </div>
                <div className="flex items-center gap-3">
                  <Droplets size={24} className="text-blue-500" />
                  <span className="text-2xl font-oswald font-bold text-white">{race.humidity}%</span>
                </div>
              </div>
            </div>
          </header>

        {/* Results Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-600 border-b border-white/5">
                <th className="pb-8 px-4">Pos</th>
                <th className="pb-8 px-4">Driver</th>
                <th className="pb-8 px-4">Car</th>
                <th className="pb-8 px-4">Interval</th>
                <th className="pb-8 px-4">Best Lap</th>
                <th className="pb-8 px-4">Inc</th>
                <th className="pb-8 px-4 text-right">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {race.results.map((row) => {
                const posChange = row.startPos - row.pos;
                return (
                  <tr key={row.name} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-8 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-oswald font-bold text-white leading-none">
                          {row.pos.toString().padStart(2, '0')}
                        </span>
                        <div className="flex items-center gap-1 min-w-[30px]">
                          {posChange > 0 ? (
                            <><MoveUp size={12} className="text-green-500" /> <span className="text-[10px] font-black text-green-500">{posChange}</span></>
                          ) : posChange < 0 ? (
                            <><MoveDown size={12} className="text-red-500" /> <span className="text-[10px] font-black text-red-500">{Math.abs(posChange)}</span></>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="py-8 px-4">
                      <div>
                        <span className="text-lg font-bold text-white block mb-0.5">{row.name}</span>
                        <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Start Pos: {row.startPos}</span>
                      </div>
                    </td>
                    <td className="py-8 px-4">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{row.car}</span>
                    </td>
                    <td className="py-8 px-4">
                      <span className={`text-xs font-black tracking-widest ${row.pos === 1 ? 'text-yellow-500' : 'text-gray-400'}`}>
                        {row.interval}
                      </span>
                    </td>
                    <td className="py-8 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-lg font-oswald font-bold ${row.pos === 1 ? 'text-purple-400' : 'text-white'}`}>
                          {row.bestLap}
                        </span>
                        {row.pos === 1 && <Timer size={14} className="text-purple-400" />}
                      </div>
                    </td>
                    <td className="py-8 px-4">
                      <span className={`text-sm font-bold ${row.incidents > 15 ? 'text-red-500' : 'text-gray-500'}`}>{row.incidents}x</span>
                    </td>
                    <td className="py-8 px-4 text-right">
                      <div className="inline-flex items-center justify-center min-w-[60px] h-10 border border-yellow-500/30 bg-yellow-500/5 rounded-lg">
                        <span className="text-xl font-oswald font-bold text-yellow-500">{row.points}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SeasonCard: React.FC<{ res: Result; onSelect: (res: Result) => void }> = ({ res, onSelect }) => {
  const isLive = res.status === 'active';
  const leader = res.standings[0];
  return (
    <div 
      onClick={() => onSelect(res)}
      className={`group bg-neutral-900 border rounded-3xl p-8 cursor-pointer transition-all hover:translate-y-[-8px] shadow-xl relative overflow-hidden ${
        isLive ? 'border-red-600/30 hover:border-red-600' : 'border-white/5 hover:border-red-600/30'
      }`}
    >
      <div className="absolute -right-4 -top-4 p-8 opacity-5 group-hover:rotate-12 transition-transform">
        {isLive ? <Activity size={140} className="text-red-500" /> : <Trophy size={140} className="text-white" />}
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${
            res.series === RaceSeries.GT3_OPEN ? 'bg-red-600/20 text-red-500' : 'bg-blue-600/20 text-blue-500'
          }`}>
            {res.series}
          </span>
          <span className="text-gray-600 font-bold uppercase text-[9px] tracking-widest">{res.seasonName}</span>
        </div>
        <div className="mb-10">
          <span className="block text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">
            {isLive ? 'Current Leader' : 'Season Winner'}
          </span>
          <h3 className="text-3xl font-oswald font-bold text-white uppercase italic tracking-tighter leading-none group-hover:text-red-500 transition-colors">
            {isLive ? (leader?.name || "TBD") : res.champion.name}
          </h3>
        </div>
        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex gap-6 text-white font-oswald">
            <div><span className="block text-xl leading-none">{isLive ? (leader?.wins || 0) : res.champion.wins}</span><span className="text-[9px] text-gray-600 uppercase font-black tracking-widest">Wins</span></div>
            <div><span className="block text-xl leading-none">{isLive ? (leader?.points || 0) : res.champion.points}</span><span className="text-[9px] text-gray-600 uppercase font-black tracking-widest">Points</span></div>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all group-hover:scale-110 ${isLive ? 'bg-red-600 text-white' : 'bg-white/5 text-white group-hover:bg-red-600'}`}><ChevronRight size={24} /></div>
        </div>
      </div>
    </div>
  );
};

const Results: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<Result | null>(null);
  const [activeRace, setActiveRace] = useState<DetailedRace | null>(null);

  const activeSeasons = PAST_RESULTS.filter(r => r.status === 'active');
  const pastSeasons = PAST_RESULTS.filter(r => r.status === 'completed');

  // Filter scheduled races that belong to the selected season's series
  const seasonRounds = useMemo(() => {
    if (!selectedSeason) return [];
    return SCHEDULE.filter(r => r.series === selectedSeason.series);
  }, [selectedSeason]);

  if (activeRace) {
    return <OfficialRaceReport race={activeRace} onBack={() => setActiveRace(null)} />;
  }

  if (selectedSeason) {
    return (
      <div className="py-12 px-4 max-w-7xl mx-auto space-y-12 pb-32">
        <button 
          onClick={() => setSelectedSeason(null)}
          className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
        >
          <ChevronLeft size={16} /> Back to Results
        </button>

        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] ${
                selectedSeason.series === RaceSeries.GT3_OPEN ? 'bg-red-600/20 text-red-500' : 'bg-blue-600/20 text-blue-500'
              }`}>
                {selectedSeason.series}
              </span>
              <span className="text-gray-600 font-bold uppercase text-[10px] tracking-widest">{selectedSeason.seasonName}</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-oswald font-bold text-white uppercase italic tracking-tighter leading-none">
              Season <span className="text-red-600">Standings</span>
            </h1>
          </div>

          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 flex items-center gap-6 min-w-[280px]">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 border-black shadow-lg ${
              selectedSeason.status === 'active' ? 'bg-red-600' : 'bg-yellow-500'
            }`}>
              {selectedSeason.status === 'active' ? <Activity size={24} className="text-white" /> : <Trophy size={24} className="text-black" />}
            </div>
            <div>
              <span className="block text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1">
                {selectedSeason.status === 'active' ? 'Current Leader' : 'Season Champion'}
              </span>
              <span className="text-2xl font-oswald font-bold text-white uppercase italic leading-none">
                {selectedSeason.status === 'active' ? selectedSeason.standings[0].name : selectedSeason.champion.name}
              </span>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Standings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <BarChart3 size={18} className="text-red-600" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">Classification</h3>
            </div>
            <div className="bg-neutral-900 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
              <table className="w-full text-left">
                <thead className="bg-black/40 text-[10px] font-black uppercase tracking-widest text-gray-500">
                  <tr>
                    <th className="px-8 py-6">Rank</th>
                    <th className="px-8 py-6">Driver</th>
                    <th className="px-8 py-6 text-center">Wins</th>
                    <th className="px-8 py-6 text-center">Podiums</th>
                    <th className="px-8 py-6 text-right">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {selectedSeason.standings.map((entry) => (
                    <tr key={entry.name} className={`group hover:bg-white/5 transition-colors ${entry.pos === 1 ? 'bg-red-600/5' : ''}`}>
                      <td className="px-8 py-6">
                        <span className={`text-xl font-oswald font-bold ${
                          entry.pos === 1 ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {entry.pos.toString().padStart(2, '0')}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div>
                          <span className="text-sm font-bold text-gray-100 block">{entry.name}</span>
                          <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{entry.car}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-center text-xs font-black text-gray-400">{entry.wins}</td>
                      <td className="px-8 py-6 text-center text-xs font-black text-gray-400">{entry.podiums}</td>
                      <td className="px-8 py-6 text-right">
                        <span className={`text-2xl font-oswald font-bold ${entry.pos === 1 ? 'text-red-600' : 'text-white'}`}>
                          {entry.points}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Race Archives */}
          <div className="space-y-6">
             <div className="flex items-center gap-2">
                <Flag size={18} className="text-red-600" />
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">Race Events</h3>
             </div>
             <div className="space-y-4 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
               {seasonRounds.map((round) => {
                 // Try to find if we have a detailed result for this round in the season's race list
                 // Since subsession IDs are used to identify races, we match by idx for demo or subsession
                 const detailedResult = selectedSeason.races.find(dr => dr.track_name.includes(round.track.split(' ')[0]));
                 
                 return (
                   <button 
                    key={round.id}
                    disabled={!detailedResult}
                    onClick={() => detailedResult && setActiveRace(detailedResult)}
                    className={`w-full text-left p-6 bg-neutral-900 border border-white/5 rounded-2xl transition-all group ${detailedResult ? 'hover:border-red-600/50 cursor-pointer' : 'opacity-50 cursor-not-allowed grayscale'}`}
                   >
                     <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                           <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Round {round.round}</span>
                           {!detailedResult && <span className="text-[8px] bg-white/5 text-gray-500 px-1.5 py-0.5 rounded uppercase font-black">Awaiting Data</span>}
                           {detailedResult && <span className="text-[8px] bg-red-600/20 text-red-500 px-1.5 py-0.5 rounded uppercase font-black animate-pulse">Official Result</span>}
                        </div>
                        {detailedResult && <ChevronRight size={16} className="text-gray-700 group-hover:text-red-500 transition-colors" />}
                     </div>
                     <h4 className="text-lg font-oswald font-bold text-white uppercase italic mb-3 group-hover:text-red-500 transition-colors">{round.track}</h4>
                     
                     {detailedResult ? (
                       <div className="flex gap-4">
                         <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-500 uppercase">
                            <Zap size={12} className="text-yellow-500" /> Winner: {detailedResult.results[0].name.split(' ')[0]}
                         </div>
                         <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-500 uppercase">
                            <Timer size={12} className="text-blue-500" /> SOF: {detailedResult.strength_of_field}
                         </div>
                       </div>
                     ) : (
                       <div className="flex items-center gap-2 text-[10px] font-bold text-gray-600 uppercase">
                         <Calendar size={12} /> Scheduled: {new Date(round.date).toLocaleDateString()}
                       </div>
                     )}
                   </button>
                 );
               })}
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto pb-32">
      <header className="mb-16 space-y-4">
        <div className="inline-flex items-center gap-3">
          <div className="w-12 h-1 bg-red-600"></div>
          <span className="text-xs font-black uppercase tracking-[0.4em] text-gray-500">Hall of Fame</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-oswald font-bold uppercase tracking-tighter italic text-white leading-none">
          League <span className="text-red-600">Results</span>
        </h1>
        <p className="text-gray-400 text-xl font-light max-w-2xl leading-relaxed">
          The official competitive history of CNA Racing. Monitor live battles and explore past seasons.
        </p>
      </header>

      {/* Active Campaigns */}
      <section className="mb-20">
        <div className="flex items-center gap-4 mb-10">
          <Activity size={24} className="text-red-600" />
          <h2 className="text-3xl font-oswald font-bold uppercase tracking-tighter text-white italic">Active Campaigns</h2>
          <div className="h-px flex-grow bg-white/5"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activeSeasons.map((res) => (
            <SeasonCard key={res.id} res={res} onSelect={setSelectedSeason} />
          ))}
        </div>
      </section>

      {/* Past Seasons */}
      <section>
        <div className="flex items-center gap-4 mb-10">
          <Trophy size={24} className="text-yellow-500" />
          <h2 className="text-3xl font-oswald font-bold uppercase tracking-tighter text-white italic">Historical Archives</h2>
          <div className="h-px flex-grow bg-white/5"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastSeasons.map((res) => (
            <SeasonCard key={res.id} res={res} onSelect={setSelectedSeason} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Results;
