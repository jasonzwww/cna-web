
import React, { useEffect, useState } from 'react';
import { geminiService } from '../services/geminiService';
import { ChevronRight, Zap, Trophy, Timer, Flag, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SCHEDULE } from '../constants';
import { RaceSeries, Race } from '../types';

const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="bg-black/80 border border-white/5 rounded-2xl w-14 h-16 md:w-20 md:h-24 flex items-center justify-center mb-2 shadow-inner">
      <span className="text-3xl md:text-5xl font-oswald font-bold text-white tracking-tighter italic">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="text-[10px] uppercase font-black text-gray-600 tracking-widest">{label}</span>
  </div>
);

const RaceCountdown: React.FC<{ series: RaceSeries; accentColor: 'red-600' | 'blue-600' }> = ({ series, accentColor }) => {
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);
  const [nextRace, setNextRace] = useState<Race | null>(null);

  useEffect(() => {
    const findNext = () => {
      const now = new Date().getTime();
      const future = SCHEDULE
        .filter(r => r.series === series && new Date(r.date).getTime() > now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
      setNextRace(future || null);
    };

    findNext();
    const interval = setInterval(() => {
      if (!nextRace) {
        findNext();
        return;
      }
      const now = new Date().getTime();
      const target = new Date(nextRace.date).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft(null);
        findNext();
      } else {
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / (1000 * 60)) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [series, nextRace]);

  if (!nextRace) return null;

  const colorStyles = accentColor === 'red-600' 
    ? { border: 'hover:border-red-600/30', text: 'text-[#eb1923]', bg: 'bg-[#eb1923]', glow: 'shadow-[0_0_40px_rgba(235,25,35,0.15)]' }
    : { border: 'hover:border-blue-600/30', text: 'text-blue-500', bg: 'bg-blue-500', glow: 'shadow-[0_0_40px_rgba(59,130,246,0.15)]' };

  return (
    <div className={`relative overflow-hidden bg-[#0a0d14] backdrop-blur-md border border-white/5 rounded-[2rem] p-8 md:p-12 transition-all duration-500 ${colorStyles.border} ${colorStyles.glow} group`}>
      <div className={`absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity`}>
        <Flag size={200} className={colorStyles.text} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-2.5 h-2.5 rounded-full ${colorStyles.bg} animate-pulse shadow-[0_0_10px_currentColor]`}></div>
          <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Next {series} Grid</span>
        </div>

        <h3 className="text-4xl md:text-5xl font-oswald font-bold text-white mb-4 uppercase italic leading-none tracking-tighter">
          {nextRace.track}
        </h3>
        
        <div className="flex items-center gap-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-10">
          <span className="flex items-center gap-2"><Clock size={14} className={colorStyles.text} /> {nextRace.duration}</span>
          <span className="flex items-center gap-2"><Timer size={14} className={colorStyles.text} /> {new Date(nextRace.date).toLocaleDateString()}</span>
        </div>

        <div className="flex gap-4 md:gap-6">
          {timeLeft ? (
            <>
              <CountdownUnit value={timeLeft.d} label="Days" />
              <CountdownUnit value={timeLeft.h} label="Hrs" />
              <CountdownUnit value={timeLeft.m} label="Mins" />
              <CountdownUnit value={timeLeft.s} label="Secs" />
            </>
          ) : (
            <span className="text-[#eb1923] text-3xl font-oswald font-black uppercase italic animate-pulse">Race in Progress</span>
          )}
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [hype, setHype] = useState('Initializing grid systems...');

  useEffect(() => {
    geminiService.generateHypeMessage("CNA Racing League").then(setHype);
  }, []);

  return (
    <div className="flex flex-col bg-[#05070a]">
      {/* Hero Section */}
      <div 
        className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1541443131876-44b03de101c5?q=80&w=2070&auto=format&fit=crop)' 
        }}
      >
        <div className="absolute inset-0 bg-[#05070a]/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-[#05070a]/20"></div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#eb1923]/10 border border-[#eb1923]/30 text-[#eb1923] text-[10px] uppercase font-black tracking-[0.4em] mb-10 animate-pulse">
            <Timer size={14} /> Official Season Open
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-oswald font-bold text-white mb-8 tracking-tighter uppercase italic leading-[0.8] drop-shadow-2xl">
            CNA <span className="text-[#eb1923]">RACING</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-gray-300 mb-14 max-w-3xl mx-auto font-light leading-relaxed italic opacity-80">
            "{hype}"
          </p>
          
          <div className="flex flex-wrap justify-center gap-8">
            <Link 
              to="/schedule" 
              className="bg-[#eb1923] hover:bg-[#ff1e26] text-white px-12 py-5 rounded-full font-bold uppercase italic tracking-widest flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(235,25,35,0.4)] hover:shadow-[0_0_50px_rgba(235,25,35,0.6)]"
            >
              Join the League <ChevronRight size={20} />
            </Link>
            <Link 
              to="/members" 
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 backdrop-blur-xl px-12 py-5 rounded-full font-bold uppercase italic tracking-widest transition-all hover:scale-105 active:scale-95"
            >
              Driver Database
            </Link>
          </div>
        </div>

        {/* Bottom stats bar */}
        <div className="absolute bottom-0 left-0 right-0 py-10 bg-gradient-to-t from-[#05070a] to-transparent z-10 hidden md:block">
          <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
            <div className="flex gap-16">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] mb-1">Active Grids</span>
                <span className="text-2xl font-oswald font-bold text-white italic">120+ DRIVERS</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase font-black tracking-[0.3em] mb-1">Prize Pool</span>
                <span className="text-2xl font-oswald font-bold text-[#eb1923] italic">$2,500 USD</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white/30 italic text-xs font-bold tracking-widest uppercase border-l border-white/10 pl-8">
              Official Partner <Trophy size={18} className="text-[#eb1923]" />
            </div>
          </div>
        </div>
      </div>

      {/* Countdown Section */}
      <section className="py-32 px-4 bg-[#05070a] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[#eb1923] font-black uppercase tracking-[0.5em] text-[10px] block mb-4">Racing Heartbeat</span>
            <h2 className="text-5xl font-oswald font-bold uppercase tracking-tighter text-white italic">Battle Countdown</h2>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <RaceCountdown series={RaceSeries.GT3_OPEN} accentColor="red-600" />
            <RaceCountdown series={RaceSeries.ROOKIES} accentColor="blue-600" />
          </div>
        </div>
      </section>

      {/* Featured Series Section */}
      <section className="py-32 px-4 bg-[#05070a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-20 border-b border-white/5 pb-10">
            <div>
              <span className="text-[#eb1923] font-black uppercase tracking-[0.5em] text-[10px] block mb-4">Competitive Classes</span>
              <h2 className="text-6xl font-oswald font-bold uppercase tracking-tighter text-white italic leading-none">
                Elite <span className="text-[#eb1923]">Series</span>
              </h2>
            </div>
            <Link to="/schedule" className="text-gray-500 hover:text-white transition-colors text-[10px] uppercase font-black tracking-widest flex items-center gap-3 bg-white/5 px-6 py-3 rounded-full border border-white/5">
              Event Calendar <ChevronRight size={14} className="text-[#eb1923]" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* GT3 Series */}
            <div className="group relative overflow-hidden rounded-[2.5rem] bg-[#0a0d14] border border-white/5 p-12 transition-all hover:bg-[#0d111a] hover:border-[#eb1923]/30 shadow-2xl">
              <div className="absolute -top-10 -right-10 p-12 opacity-[0.02] group-hover:opacity-10 transition-all transform group-hover:rotate-12 group-hover:scale-110 duration-700">
                <Zap size={300} />
              </div>
              
              <div className="relative z-10">
                <div className="flex gap-3 mb-6">
                  <span className="px-3 py-1 bg-[#eb1923]/10 text-[10px] font-black text-[#eb1923] uppercase tracking-widest rounded-full border border-[#eb1923]/20">License C+</span>
                  <span className="px-3 py-1 bg-white/5 text-[10px] font-black text-gray-500 uppercase tracking-widest rounded-full border border-white/5">Season 26</span>
                </div>
                <h3 className="text-4xl font-oswald font-bold mb-6 text-white uppercase italic tracking-tighter">GT3 Open Championship</h3>
                <p className="text-gray-500 mb-10 leading-relaxed text-lg font-light">
                  Elite competition featuring multi-class endurance and high-intensity sprint formats. Live stewarding and custom BOP.
                </p>
                
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="border-l-2 border-[#eb1923]/30 pl-6">
                    <span className="block text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">Duration</span>
                    <span className="text-xl font-oswald font-bold text-white italic">60 MINS</span>
                  </div>
                  <div className="border-l-2 border-[#eb1923]/30 pl-6">
                    <span className="block text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">Setup Type</span>
                    <span className="text-xl font-oswald font-bold text-white italic">OPEN GEAR</span>
                  </div>
                </div>

                <Link to="/series/gt3" className="inline-flex items-center gap-3 text-[#eb1923] font-black uppercase italic text-xs tracking-[0.3em] hover:text-[#ff1e26] transition-all group/link bg-[#eb1923]/5 px-8 py-4 rounded-full border border-[#eb1923]/10">
                  Enter Season <ChevronRight size={18} className="group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Rookie Series */}
            <div className="group relative overflow-hidden rounded-[2.5rem] bg-[#0a0d14] border border-white/5 p-12 transition-all hover:bg-[#0d111a] hover:border-blue-600/30 shadow-2xl">
              <div className="absolute -top-10 -right-10 p-12 opacity-[0.02] group-hover:opacity-10 transition-all transform group-hover:-rotate-12 group-hover:scale-110 duration-700">
                <Trophy size={300} />
              </div>
              
              <div className="relative z-10">
                <div className="flex gap-3 mb-6">
                  <span className="px-3 py-1 bg-blue-600/10 text-[10px] font-black text-blue-500 uppercase tracking-widest rounded-full border border-blue-600/20">All Licenses</span>
                  <span className="px-3 py-1 bg-white/5 text-[10px] font-black text-gray-500 uppercase tracking-widest rounded-full border border-white/5">Free Entry</span>
                </div>
                <h3 className="text-4xl font-oswald font-bold mb-6 text-white uppercase italic tracking-tighter">Rookie Sprint Cup</h3>
                <p className="text-gray-500 mb-10 leading-relaxed text-lg font-light">
                  Perfect for starting your sim racing journey. Fixed setups ensure focus on racecraft and pure consistency.
                </p>

                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="border-l-2 border-blue-600/30 pl-6">
                    <span className="block text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">Duration</span>
                    <span className="text-xl font-oswald font-bold text-white italic">20 MINS</span>
                  </div>
                  <div className="border-l-2 border-blue-600/30 pl-6">
                    <span className="block text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">Setup Type</span>
                    <span className="text-xl font-oswald font-bold text-white italic">FIXED SPEC</span>
                  </div>
                </div>

                <Link to="/series/rookies" className="inline-flex items-center gap-3 text-blue-500 font-black uppercase italic text-xs tracking-[0.3em] hover:text-blue-400 transition-all group/link bg-blue-600/5 px-8 py-4 rounded-full border border-blue-600/10">
                  Claim Seat <ChevronRight size={18} className="group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
