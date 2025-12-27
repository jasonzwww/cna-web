
import React, { useState, useMemo, useEffect } from 'react';
import { SCHEDULE, MEMBERS } from '../constants';
import { RaceSeries, Race, Member } from '../types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  List, 
  CheckCircle2, 
  ArrowUpDown, 
  History,
  Users,
  PenLine,
  Zap,
  Trophy
} from 'lucide-react';

interface RaceRegistration {
  [raceId: string]: string[]; // array of member IDs
}

const RaceCard: React.FC<{
  race: Race;
  isNext: boolean;
  isPast: boolean;
  registrations: string[];
  allMembers: Member[];
  onRegister: (raceId: string) => void;
  isRegistered: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  showSeriesTag?: boolean;
}> = ({ race, isNext, isPast, registrations, allMembers, onRegister, isRegistered, isExpanded, onToggle, showSeriesTag }) => {
  const registeredDrivers = allMembers.filter(m => registrations.includes(m.id));
  const regCount = registrations.length;
  
  const isGT3 = race.series === RaceSeries.GT3_OPEN;
  const seriesColor = isGT3 ? 'red' : 'blue';
  
  const nextStyles = isNext 
    ? isGT3 
      ? 'border-red-600 shadow-[0_0_25px_rgba(220,38,38,0.15)] ring-1 ring-red-600' 
      : 'border-blue-600 shadow-[0_0_25px_rgba(37,99,235,0.15)] ring-1 ring-blue-600'
    : 'border-white/5 hover:border-red-600/30';

  const dateBoxStyles = isNext 
    ? isGT3 ? 'bg-red-600 border-white/20' : 'bg-blue-600 border-white/20'
    : 'bg-neutral-800 border-white/5';

  return (
    <div 
      className={`group bg-neutral-900 border rounded-xl overflow-hidden transition-all duration-300 ${
        isPast 
          ? 'opacity-60 border-white/5 grayscale-[0.5] hover:opacity-100 hover:grayscale-0' 
          : nextStyles
      } ${isExpanded ? 'bg-neutral-800/50' : ''}`}
    >
      {/* Header / Summary Bar */}
      <div 
        onClick={onToggle}
        className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-lg text-center min-w-[80px] border transition-colors ${dateBoxStyles}`}>
            <span className={`block font-bold text-xl font-oswald ${isNext ? 'text-white' : isGT3 ? 'text-red-500' : 'text-blue-500'}`}>
              {new Date(race.date).getDate()}
            </span>
            <span className={`text-[10px] uppercase font-bold ${isNext ? 'text-white/80' : 'text-gray-500'}`}>
              {new Date(race.date).toLocaleString('default', { month: 'short' })}
            </span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              {showSeriesTag && (
                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest border ${
                  isGT3 
                    ? 'border-red-500/30 text-red-500 bg-red-500/5' 
                    : 'border-blue-500/30 text-blue-500 bg-blue-500/5'
                }`}>
                  {isGT3 ? 'GT3' : 'Rookie'}
                </span>
              )}
              <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter ${
                isNext 
                  ? `bg-white ${isGT3 ? 'text-red-600' : 'text-blue-600'} animate-pulse` 
                  : isGT3 ? 'bg-red-600/20 text-red-500' : 'bg-blue-600/20 text-blue-500'
              }`}>
                {isNext ? 'NEXT UP - Round ' + race.round : 'Round ' + race.round}
              </span>
              {regCount > 0 && (
                <span className="text-[10px] font-black bg-white/5 text-gray-400 px-2 py-0.5 rounded uppercase tracking-tighter flex items-center gap-1">
                  <Users size={10} /> {regCount} Signed Up
                </span>
              )}
              {isPast && (
                <span className="text-[10px] font-black bg-green-600/20 text-green-500 px-2 py-0.5 rounded uppercase tracking-tighter flex items-center gap-1">
                  <CheckCircle2 size={10} /> Completed
                </span>
              )}
            </div>
            <h3 className={`text-xl font-bold transition-colors ${isNext ? 'text-white' : isGT3 ? 'text-white group-hover:text-red-500' : 'text-white group-hover:text-blue-500'}`}>
              {race.track}
            </h3>
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-2">
              <span className={`flex items-center gap-1 font-medium ${isNext ? 'text-white/60' : ''}`}>
                <Clock size={14} className={isNext ? 'text-white' : isGT3 ? 'text-red-600' : 'text-blue-600'} /> {race.format || race.duration}
              </span>
              <span className={`flex items-center gap-1 font-medium ${isNext ? 'text-white/60' : ''}`}>
                <MapPin size={14} className={isNext ? 'text-white' : isGT3 ? 'text-red-600' : 'text-blue-600'} /> iRacing
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`hidden sm:flex flex-col items-end ${isExpanded ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
             <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Entry Status</span>
             <span className={`text-xs font-bold ${isRegistered ? 'text-green-500' : 'text-gray-400'}`}>
               {isRegistered ? 'REGISTERED' : 'OPEN'}
             </span>
          </div>
          <div className={`p-2 rounded-full bg-white/5 text-gray-500 transition-transform duration-300 ${isExpanded ? `rotate-180 ${isGT3 ? 'text-red-500 bg-red-500/10' : 'text-blue-500 bg-blue-500/10'}` : ''}`}>
            <ChevronDown size={20} />
          </div>
        </div>
      </div>

      {/* Expanded Detail Drop Bar */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[1000px] border-t border-white/5' : 'max-h-0'
        }`}
      >
        <div className="p-6 md:p-8 bg-black/20">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left side: Registered Drivers */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4 flex items-center gap-2">
                <Users size={14} className={isGT3 ? "text-red-600" : "text-blue-600"} /> Entry List ({registeredDrivers.length})
              </h4>
              <div className="space-y-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {registeredDrivers.length > 0 ? (
                  registeredDrivers.map(driver => (
                    <div key={driver.id} className="flex items-center justify-between p-3 bg-neutral-900/50 border border-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-gray-400 border border-white/5">
                          {driver.name.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-gray-200">{driver.name}</span>
                      </div>
                      <div className="text-[9px] font-black flex gap-2">
                        <span className="text-blue-400 uppercase">iR: {driver.iRating}</span>
                        <span className="text-green-500 uppercase">{driver.safetyRating}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 bg-black/20 rounded-xl border border-dashed border-white/5">
                    <p className="text-xs text-gray-600 uppercase font-bold">No entries yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Action & Brief */}
            <div className="space-y-6">
              <div className="bg-neutral-900/40 rounded-xl p-5 border border-white/5">
                <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] ${isGT3 ? 'text-red-500' : 'text-blue-500'} mb-2`}>Technical Brief</h4>
                <p className="text-xs text-gray-400 leading-relaxed italic">
                  Series: {race.series}<br/>
                  Event: {race.track} - Round {race.round}.<br/>
                  Session starts at {new Date(race.date).toLocaleTimeString()}.<br/>
                  Ensure you are in the Discord voice channel 15 mins prior.
                </p>
              </div>

              {!isPast && (
                isRegistered ? (
                  <div className="flex flex-col items-center gap-2 p-6 bg-green-500/5 border border-green-500/20 rounded-xl">
                    <CheckCircle2 size={24} className="text-green-500" />
                    <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Entry Confirmed</span>
                  </div>
                ) : (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onRegister(race.id);
                    }}
                    className={`w-full ${isGT3 ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-4 rounded-xl uppercase tracking-[0.2em] text-xs transition-all shadow-lg hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3`}
                  >
                    <PenLine size={16} /> Confirm Attendance
                  </button>
                )
              )}
              
              {isPast && (
                <div className="p-4 bg-neutral-800/50 rounded-xl border border-white/5 text-center">
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Event Concluded</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CalendarView: React.FC<{
  races: Race[];
  activeSeries: RaceSeries | 'all';
  nextRaceId: string | null;
}> = ({ races, activeSeries, nextRaceId }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1));
  const now = new Date();

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const calendarDays = useMemo(() => {
    const totalDays = daysInMonth(year, month);
    const startDay = firstDayOfMonth(year, month);
    const days = [];
    for (let i = 0; i < (startDay === 0 ? 6 : startDay - 1); i++) {
      days.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
      const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
      const dayRaces = races.filter(r => r.date.startsWith(dateStr));
      days.push({ day: i, races: dayRaces });
    }
    return days;
  }, [year, month, races]);

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
        <h3 className="font-oswald font-bold text-xl uppercase italic tracking-tighter text-white">
          {monthName} <span className="text-red-600">{year}</span>
        </h3>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400"><ChevronLeft size={20} /></button>
          <button onClick={nextMonth} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400"><ChevronRight size={20} /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 border-b border-white/5 bg-black/40">
        {weekDays.map(d => (
          <div key={d} className="py-3 text-center text-[10px] font-black uppercase tracking-widest text-gray-500 border-r border-white/5 last:border-0">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {calendarDays.map((dayObj, idx) => (
          <div 
            key={idx} 
            className={`min-h-[100px] md:min-h-[140px] p-2 border-r border-b border-white/5 last:border-r-0 relative group ${!dayObj ? 'bg-black/20' : 'bg-neutral-900/50'}`}
          >
            {dayObj && (
              <>
                <span className="text-xs font-bold text-gray-600 group-hover:text-white transition-colors">{dayObj.day}</span>
                <div className="mt-2 space-y-1">
                  {dayObj.races.map(race => {
                    const isPast = new Date(race.date) < now;
                    const isNext = race.id === nextRaceId;
                    const isGT3 = race.series === RaceSeries.GT3_OPEN;
                    return (
                      <div
                        key={race.id}
                        className={`w-full text-left p-1.5 rounded text-[9px] font-bold uppercase tracking-tighter truncate ${
                          isNext 
                            ? isGT3 ? 'bg-red-600 text-white animate-pulse' : 'bg-blue-600 text-white animate-pulse'
                            : isPast
                              ? 'bg-neutral-800 text-gray-600 opacity-60'
                              : isGT3 
                                ? 'bg-red-600/20 text-red-500' 
                                : 'bg-blue-600/20 text-blue-500'
                        }`}
                      >
                        {isNext && "⭐ "}R{race.round}: {race.track.split(' ')[0]}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const Schedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RaceSeries | 'all'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [showChronological, setShowChronological] = useState(false);
  const [expandedRaceId, setExpandedRaceId] = useState<string | null>(null);
  const [registrations, setRegistrations] = useState<RaceRegistration>({});
  
  const now = new Date();

  useEffect(() => {
    const mockRegs: RaceRegistration = {};
    SCHEDULE.forEach(race => {
      const numMembers = Math.floor(Math.random() * 4) + 2;
      const shuffled = [...MEMBERS].sort(() => 0.5 - Math.random());
      mockRegs[race.id] = shuffled.slice(0, numMembers).map(m => m.id);
    });
    setRegistrations(mockRegs);
  }, []);

  const baseRaces = useMemo(() => 
    activeTab === 'all' ? SCHEDULE : SCHEDULE.filter(race => race.series === activeTab),
  [activeTab]);

  const nextRaceId = useMemo(() => {
    const future = baseRaces
      .filter(r => new Date(r.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return future.length > 0 ? future[0].id : null;
  }, [baseRaces, now]);

  const sortedRaces = useMemo(() => {
    if (showChronological || activeTab === 'all') {
      return [...baseRaces].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    
    const nextRace = baseRaces.filter(r => r.id === nextRaceId);
    const otherFutureRaces = baseRaces.filter(r => r.id !== nextRaceId && new Date(r.date) >= now);
    const pastRaces = baseRaces.filter(r => new Date(r.date) < now);

    otherFutureRaces.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    pastRaces.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return [...nextRace, ...otherFutureRaces, ...pastRaces];
  }, [baseRaces, nextRaceId, now, showChronological, activeTab]);

  const handleRegister = (raceId: string) => {
    const mockUserId = 'm1';
    setRegistrations(prev => {
      const current = prev[raceId] || [];
      if (current.includes(mockUserId)) return prev;
      return { ...prev, [raceId]: [...current, mockUserId] };
    });
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-oswald font-bold uppercase tracking-tighter mb-4 italic text-white">Race <span className="text-red-600">Schedule</span></h1>
          <div className="flex flex-wrap gap-4">
            <div className="flex bg-neutral-900 p-1 rounded-full border border-white/5">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-6 py-2 rounded-full font-bold transition-all text-[10px] uppercase tracking-widest ${activeTab === 'all' ? 'bg-white text-black shadow-lg shadow-white/20' : 'text-gray-400 hover:text-white'}`}
              >
                All Races
              </button>
              <button 
                onClick={() => setActiveTab(RaceSeries.GT3_OPEN)}
                className={`px-6 py-2 rounded-full font-bold transition-all text-[10px] uppercase tracking-widest ${activeTab === RaceSeries.GT3_OPEN ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-gray-400 hover:text-white'}`}
              >
                GT3 Open
              </button>
              <button 
                onClick={() => setActiveTab(RaceSeries.ROOKIES)}
                className={`px-6 py-2 rounded-full font-bold transition-all text-[10px] uppercase tracking-widest ${activeTab === RaceSeries.ROOKIES ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-400 hover:text-white'}`}
              >
                Rookies
              </button>
            </div>

            {viewMode === 'list' && activeTab !== 'all' && (
              <button
                onClick={() => setShowChronological(!showChronological)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all ${
                  showChronological 
                    ? 'bg-neutral-100 text-black border-white' 
                    : 'bg-neutral-900 text-gray-400 border-white/5 hover:border-white/20'
                }`}
              >
                {showChronological ? <ArrowUpDown size={14} /> : <History size={14} />}
                {showChronological ? 'Timeline' : 'Smart Sort'}
              </button>
            )}
          </div>
        </div>

        <div className="flex bg-neutral-900 p-1 rounded-xl border border-white/5 self-start md:self-auto">
          <button 
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white'}`}
          >
            <List size={16} /> List
          </button>
          <button 
            onClick={() => setViewMode('calendar')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'calendar' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white'}`}
          >
            <CalendarIcon size={16} /> Calendar
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto">
        {viewMode === 'list' ? (
          <div className="space-y-4">
            {sortedRaces.length > 0 ? (
              sortedRaces.map((race) => (
                <RaceCard 
                  key={race.id}
                  race={race}
                  isNext={race.id === nextRaceId}
                  isPast={new Date(race.date) < now}
                  registrations={registrations[race.id] || []}
                  allMembers={MEMBERS}
                  onRegister={handleRegister}
                  isRegistered={(registrations[race.id] || []).includes('m1')}
                  isExpanded={expandedRaceId === race.id}
                  onToggle={() => setExpandedRaceId(expandedRaceId === race.id ? null : race.id)}
                  showSeriesTag={activeTab === 'all'}
                />
              ))
            ) : (
              <div className="text-center py-20 bg-neutral-900/50 rounded-3xl border border-dashed border-white/10">
                <Trophy size={48} className="text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No races found in this series</p>
              </div>
            )}
          </div>
        ) : (
          <CalendarView 
            races={baseRaces} 
            activeSeries={activeTab}
            nextRaceId={nextRaceId}
          />
        )}
      </div>
    </div>
  );
};

export default Schedule;
