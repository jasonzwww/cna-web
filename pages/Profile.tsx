
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile, Race, DetailedRace } from '../types';
import { SCHEDULE, PAST_RESULTS } from '../constants';
import { UserCircle, Trophy, Activity, MapPin, Map, Flag, Timer, ChevronRight, Save, Navigation, ShieldCheck } from 'lucide-react';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [editLoc, setEditLoc] = useState({ city: '', country: '', lat: 0, lng: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('cna_driver');
    if (saved) {
      const u = JSON.parse(saved);
      setUser(u);
      if (u.location) {
        setEditLoc(u.location);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const joinedRaces = user ? SCHEDULE.filter(r => user.joined_race_ids.includes(r.id)) : [];

  const handleUpdateLocation = () => {
    if (!user) return;
    const updatedUser = { ...user, location: editLoc };
    setUser(updatedUser);
    localStorage.setItem('cna_driver', JSON.stringify(updatedUser));
    setIsEditingLocation(false);
    // Notify other components
    window.dispatchEvent(new Event('profileUpdate'));
  };

  if (!user) return null;

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto pb-32">
      <header className="mb-16 flex flex-col md:flex-row gap-12 items-start md:items-center">
        <div className="relative group">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#eb1923] flex items-center justify-center text-white font-black text-4xl md:text-7xl shadow-[0_0_50px_rgba(235,25,35,0.3)] border-4 border-white/10 italic">
            {user.display_name.charAt(0)}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-[#05070a] shadow-lg animate-pulse"></div>
        </div>

        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="text-[10px] font-black text-gray-500 bg-white/5 px-3 py-1 rounded-full uppercase tracking-[0.3em]">CNA Pro Driver</span>
            <span className="text-[10px] font-black text-red-600 bg-red-600/10 px-3 py-1 rounded-full uppercase tracking-[0.3em]">ID: {user.cust_id}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-oswald font-bold text-white uppercase italic tracking-tighter leading-none mb-6">
            {user.display_name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-3 text-gray-400">
              <MapPin size={20} className="text-[#eb1923]" />
              {isEditingLocation ? (
                <div className="flex gap-2">
                  <input 
                    className="bg-black border border-white/10 rounded px-2 py-1 text-xs" 
                    value={editLoc.city} 
                    onChange={e => setEditLoc({...editLoc, city: e.target.value})}
                    placeholder="City"
                  />
                  <input 
                    className="bg-black border border-white/10 rounded px-2 py-1 text-xs" 
                    value={editLoc.country} 
                    onChange={e => setEditLoc({...editLoc, country: e.target.value})}
                    placeholder="Country"
                  />
                  <button onClick={handleUpdateLocation} className="text-green-500 hover:text-green-400"><Save size={16}/></button>
                </div>
              ) : (
                <span className="text-sm font-bold uppercase tracking-widest flex items-center gap-3">
                  {user.location?.city}, {user.location?.country}
                  <button onClick={() => setIsEditingLocation(true)} className="text-[9px] text-gray-600 hover:text-white underline">Edit</button>
                </span>
              )}
            </div>
            <div className="h-4 w-px bg-white/10 hidden md:block"></div>
            <div className="flex items-center gap-3 text-gray-400">
              <ShieldCheck size={20} className="text-blue-500" />
              <span className="text-sm font-bold uppercase tracking-widest">Active Since {new Date(user.last_sync).getFullYear()}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Stats Column */}
        <div className="space-y-8">
           <div className="flex items-center gap-3 mb-2">
              <Activity size={18} className="text-[#eb1923]" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500 italic">Performance Metrics</h3>
           </div>
           
           <div className="bg-[#0a0d14] border border-white/5 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden group hover:border-[#eb1923]/30 transition-all">
             <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
               <Navigation size={120} className="text-[#eb1923]" />
             </div>
             <div className="relative z-10">
                <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest block mb-4">CNA League Points</span>
                <div className="flex items-baseline gap-2">
                   <span className="text-6xl font-oswald font-bold text-white italic tracking-tighter">{user.cna_points}</span>
                   <span className="text-sm font-black text-[#eb1923] uppercase">PTS</span>
                </div>
             </div>
           </div>

           <div className="grid grid-cols-2 gap-6">
             <div className="bg-[#0a0d14] border border-white/5 rounded-3xl p-6 hover:border-blue-600/30 transition-all">
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest block mb-2">Formula iR</span>
                <span className="text-3xl font-oswald font-bold text-blue-500 italic">{user.licenses.formula.irating}</span>
                <span className="block text-[9px] text-gray-500 mt-2 font-bold">{user.licenses.formula.safety_rating} SR / {user.licenses.formula.license_level}</span>
             </div>
             <div className="bg-[#0a0d14] border border-white/5 rounded-3xl p-6 hover:border-[#eb1923]/30 transition-all">
                <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest block mb-2">Sports Car iR</span>
                <span className="text-3xl font-oswald font-bold text-[#eb1923] italic">{user.licenses.sports_car.irating}</span>
                <span className="block text-[9px] text-gray-500 mt-2 font-bold">{user.licenses.sports_car.safety_rating} SR / {user.licenses.sports_car.license_level}</span>
             </div>
           </div>
        </div>

        {/* Results/History Column */}
        <div className="lg:col-span-2 space-y-8">
           <div className="flex items-center gap-3 mb-2">
              <Trophy size={18} className="text-[#eb1923]" />
              <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500 italic">Recent Grid Activity</h3>
           </div>

           <div className="space-y-4">
             {joinedRaces.length > 0 ? (
               joinedRaces.map((race) => {
                 // Sample check for actual results in database
                 const detailedResult = PAST_RESULTS
                   .flatMap(r => r.races)
                   .find(dr => dr.track_name.includes(race.track.split(' ')[0]));
                 
                 const userResult = detailedResult?.results.find(r => r.name.toLowerCase().includes(user.display_name.toLowerCase()) || r.name === "Handa Yang"); // mock match

                 return (
                   <div key={race.id} className="bg-[#0a0d14] border border-white/5 rounded-[2rem] p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-white/10 transition-all group">
                     <div>
                       <div className="flex items-center gap-3 mb-2">
                         <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${race.series.includes('GT3') ? 'bg-[#eb1923]/10 text-[#eb1923]' : 'bg-blue-600/10 text-blue-500'}`}>
                           {race.series}
                         </span>
                         <span className="text-xs text-gray-600 font-bold uppercase tracking-widest">Round {race.round}</span>
                       </div>
                       <h4 className="text-2xl font-oswald font-bold text-white uppercase italic tracking-tighter group-hover:text-[#eb1923] transition-colors">
                         {race.track}
                       </h4>
                       <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest block mt-2">{new Date(race.date).toLocaleDateString()}</span>
                     </div>

                     <div className="flex items-center gap-12">
                       {userResult ? (
                         <div className="text-right">
                           <span className="block text-[9px] text-gray-500 uppercase font-black tracking-widest mb-1">Finish Pos</span>
                           <span className="text-4xl font-oswald font-bold text-white italic leading-none">{userResult.pos}</span>
                         </div>
                       ) : (
                         <div className="text-right">
                           <span className="block text-[9px] text-gray-600 uppercase font-black tracking-widest mb-1">Status</span>
                           <span className="text-xl font-oswald font-bold text-gray-500 italic leading-none">SIGNED UP</span>
                         </div>
                       )}
                       <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-600 group-hover:text-white group-hover:border-[#eb1923] transition-all">
                         <ChevronRight size={20} />
                       </div>
                     </div>
                   </div>
                 );
               })
             ) : (
               <div className="bg-[#0a0d14] border border-dashed border-white/10 rounded-[2rem] p-16 text-center">
                 <Flag size={32} className="text-gray-800 mx-auto mb-4" />
                 <p className="text-gray-600 font-bold uppercase tracking-[0.2em] text-xs">No joined races found in your grid history</p>
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
