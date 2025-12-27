
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RaceSeries } from '../types';
import { PAST_RESULTS, SCHEDULE } from '../constants';
import { ChevronLeft, Zap, Trophy, GraduationCap, ChevronRight, MapPin, Calendar, Clock } from 'lucide-react';

const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-xl w-16 h-20 flex items-center justify-center mb-2 shadow-lg">
      <span className="text-4xl font-oswald font-bold text-white italic tracking-tighter">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{label}</span>
  </div>
);

const SeriesRookies: React.FC = () => {
  const seriesName = RaceSeries.ROOKIES;
  const activeSeason = PAST_RESULTS.find(s => s.series === seriesName && s.status === 'active');
  
  // Find next race
  const nextRace = SCHEDULE
    .filter(r => r.series === seriesName && new Date(r.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  
  const standings = activeSeason?.standings.slice(0, 3) || [];

  // Countdown State
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    if (!nextRace) return;
    const calculateTime = () => {
      const now = new Date().getTime();
      const target = new Date(nextRace.date).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft(null);
      } else {
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / (1000 * 60)) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [nextRace]);

  return (
    <div className="min-h-screen bg-[#05070a] text-white">
      {/* Full Screen Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
         {/* Background Image */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552062638-34988708246a?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
         <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/80 to-transparent"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent"></div>
         
         {/* Hero Content */}
         <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-12 items-center pt-20">
            {/* Left Column: Text Info */}
            <div>
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 text-xs font-black uppercase tracking-[0.2em] transition-colors">
                  <ChevronLeft size={14} /> Back to Hub
                </Link>

                <div className="flex flex-wrap items-center gap-3 mb-6 animate-in fade-in slide-in-from-left-4 duration-700">
                   <span className="bg-blue-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] rounded">Academy</span>
                   <span className="border border-white/20 backdrop-blur-sm px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] rounded">Free Entry</span>
                </div>
                
                <h1 className="text-7xl md:text-9xl font-oswald font-bold uppercase italic tracking-tighter leading-[0.9] mb-6 animate-in fade-in zoom-in-50 duration-700 delay-100">
                   ROOKIE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">CUP</span>
                </h1>
                
                <p className="text-xl text-gray-300 max-w-xl font-light leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                   The perfect starting grid. Fixed setup Mazda MX-5 Cup racing designed to hone your racecraft in a safe, competitive environment.
                </p>

                <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                   <a href="#stats" className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs rounded-full hover:bg-gray-200 transition-colors">
                      Series Standings
                   </a>
                   <Link to="/schedule" className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/10 transition-colors">
                      Full Schedule
                   </Link>
                </div>
            </div>

            {/* Right Column: Countdown Card */}
            <div className="flex justify-center lg:justify-end animate-in fade-in slide-in-from-right-8 duration-1000">
               {nextRace ? (
                 <div className="bg-[#0a0d14]/60 backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl max-w-md w-full relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 bg-blue-600 blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-8">
                         <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> Next Event
                         </span>
                         <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{new Date(nextRace.date).toLocaleDateString()}</span>
                      </div>

                      <h3 className="text-4xl font-oswald font-bold uppercase italic text-white mb-2 leading-none">{nextRace.track}</h3>
                      <p className="text-gray-400 text-sm font-medium mb-8 flex items-center gap-2">
                        <MapPin size={14} className="text-blue-500" /> Round {nextRace.round}
                      </p>

                      <div className="flex justify-between gap-2 mb-8 border-t border-b border-white/5 py-8">
                         {timeLeft ? (
                           <>
                             <CountdownUnit value={timeLeft.d} label="Days" />
                             <CountdownUnit value={timeLeft.h} label="Hrs" />
                             <CountdownUnit value={timeLeft.m} label="Min" />
                             <CountdownUnit value={timeLeft.s} label="Sec" />
                           </>
                         ) : (
                           <div className="w-full text-center py-4">
                             <span className="text-2xl font-oswald font-bold uppercase italic text-blue-500 animate-pulse">Race in Progress</span>
                           </div>
                         )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="bg-white/5 rounded-xl p-3 text-center">
                            <span className="block text-[9px] text-gray-500 uppercase font-black tracking-widest mb-1">Duration</span>
                            <div className="flex items-center justify-center gap-1 text-white font-bold">
                               <Clock size={14} /> {nextRace.duration}
                            </div>
                         </div>
                         <div className="bg-white/5 rounded-xl p-3 text-center">
                            <span className="block text-[9px] text-gray-500 uppercase font-black tracking-widest mb-1">Format</span>
                            <div className="flex items-center justify-center gap-1 text-white font-bold">
                               <Trophy size={14} /> Fixed Setup
                            </div>
                         </div>
                      </div>
                    </div>
                 </div>
               ) : (
                 <div className="bg-black/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 text-center">
                    <h3 className="text-2xl font-oswald text-white uppercase italic">Season Concluded</h3>
                 </div>
               )}
            </div>
         </div>
      </div>

      {/* Stats & Info Section */}
      <div id="stats" className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-3 gap-16">
         {/* Standings */}
         <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-10">
               <div className="p-3 bg-blue-600/10 rounded-xl">
                  <GraduationCap className="text-blue-600" size={24} />
               </div>
               <div>
                  <h2 className="text-3xl font-oswald font-bold uppercase italic tracking-tighter leading-none">Rising Stars</h2>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Top 3 Rookies</p>
               </div>
            </div>
            
            {standings.length > 0 ? (
               <div className="space-y-4">
                  {standings.map((driver, idx) => (
                     <div key={idx} className="bg-[#0a0d14] border border-white/5 rounded-3xl p-6 flex items-center gap-8 hover:border-blue-600/30 transition-all group">
                        <div className={`w-16 h-16 flex items-center justify-center font-oswald font-bold text-3xl italic rounded-2xl ${
                           idx === 0 ? 'bg-blue-600 text-white shadow-[0_0_30px_rgba(37,99,235,0.3)]' : 'bg-neutral-800 text-gray-500'
                        }`}>
                           {driver.pos}
                        </div>
                        <div className="flex-1">
                           <h3 className="text-2xl font-bold uppercase italic font-oswald text-white group-hover:text-blue-500 transition-colors">{driver.name}</h3>
                           <p className="text-xs text-gray-500 font-black uppercase tracking-widest">Mazda MX-5 Cup</p>
                        </div>
                        <div className="text-right">
                           <span className="block text-4xl font-oswald font-bold italic text-white">{driver.points}</span>
                           <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Points</span>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <div className="p-16 border border-dashed border-white/10 rounded-[2.5rem] text-center bg-white/5">
                  <Trophy size={48} className="text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Season in progress - Standings updating</p>
               </div>
            )}
            
            <div className="mt-10 text-center md:text-left">
               <Link to="/results?series=Rookies%20Series" className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-xs font-black uppercase tracking-widest transition-colors">
                  View Full Standings <ChevronRight size={14} />
               </Link>
            </div>
         </div>

         {/* Rules / Details */}
         <div>
            <div className="bg-[#0a0d14] border border-white/5 rounded-[2.5rem] p-10 sticky top-24">
               <h3 className="text-2xl font-oswald font-bold uppercase italic tracking-tighter mb-8 flex items-center gap-3">
                  <Zap size={24} className="text-blue-600" /> Sprint Format
               </h3>
               
               <div className="space-y-8 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-white/5"></div>

                  <div className="relative pl-8">
                     <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[#0a0d14] border-2 border-blue-600 z-10"></div>
                     <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">Pre-Race</span>
                     <div className="flex justify-between items-baseline">
                        <span className="text-white font-bold text-sm">Practice</span>
                        <span className="font-oswald font-bold text-xl italic text-gray-300">20m</span>
                     </div>
                  </div>

                  <div className="relative pl-8">
                     <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-[#0a0d14] border-2 border-blue-600 z-10"></div>
                     <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">Qualifying</span>
                     <div className="flex justify-between items-baseline">
                        <span className="text-white font-bold text-sm">Lone Quali</span>
                        <span className="font-oswald font-bold text-xl italic text-gray-300">20m</span>
                     </div>
                  </div>

                  <div className="relative pl-8">
                     <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)] z-10"></div>
                     <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-1">Race Session</span>
                     <div className="flex justify-between items-baseline">
                        <span className="text-white font-bold text-sm">Sprint Race</span>
                        <span className="font-oswald font-bold text-xl italic text-white">20m</span>
                     </div>
                     <p className="mt-2 text-xs text-blue-500 font-bold uppercase tracking-wide border-t border-white/5 pt-2">
                        * Fixed Setup Enforced
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SeriesRookies;
