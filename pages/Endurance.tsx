
import React, { useState } from 'react';
import { EnduranceTeam } from '../types';
import { Plus, Car, CheckCircle, Trophy, Medal, Clock, Calendar, Zap, Beer, X, User } from 'lucide-react';

interface MockEnduranceResult {
  eventName: string;
  date: string;
  podium: {
    team: string;
    car: string;
    pos: number;
  }[];
}

const CAR_OPTIONS = [
  "Ferrari 296 GT3",
  "Porsche 911 GT3 R (992)",
  "BMW M4 GT3",
  "Lamborghini Huracan GT3 EVO2",
  "Mercedes-AMG GT3 2020",
  "Audi R8 LMS GT3",
  "McLaren 720S GT3 EVO",
  "Ford Mustang GT3",
  "Chevrolet Corvette Z06 GT3.R",
  "Cadillac V-Series.R (GTP)",
  "Porsche 963 (GTP)",
  "Acura ARX-06 (GTP)",
  "BMW M Hybrid V8 (GTP)"
];

const MOCK_ENDURANCE_RESULTS: MockEnduranceResult[] = [
  {
    eventName: "6 Hours of Watkins Glen",
    date: "2025-11-15",
    podium: [
      { team: "CNA Motorsports Red", car: "Ferrari 296 GT3", pos: 1 },
      { team: "Black Mamba Racing", car: "Lamborghini Huracan GT3", pos: 2 },
      { team: "Apex Sim Sport", car: "Porsche 911 GT3 R", pos: 3 },
    ]
  },
  {
    eventName: "Petit Le Mans (10H)",
    date: "2025-10-02",
    podium: [
      { team: "Apex Sim Sport", car: "BMW M4 GT3", pos: 1 },
      { team: "CNA Motorsports Red", car: "Ferrari 296 GT3", pos: 2 },
    ]
  }
];

const StintManager: React.FC<{ team: EnduranceTeam; currentUser: string; onClose: () => void; onUpdate: (updatedTeam: EnduranceTeam) => void }> = ({ team, currentUser, onClose, onUpdate }) => {
  const startDate = new Date(team.eventDate);
  const hours = Array.from({ length: team.eventLength }, (_, i) => i);

  const toggleAvailability = (hourIdx: number) => {
    const currentSlot = team.availability[hourIdx] || [];
    let newSlot;
    if (currentSlot.includes(currentUser)) {
      newSlot = currentSlot.filter(u => u !== currentUser);
    } else {
      newSlot = [...currentSlot, currentUser];
    }
    
    const updatedTeam = {
      ...team,
      availability: {
        ...team.availability,
        [hourIdx]: newSlot
      }
    };
    onUpdate(updatedTeam);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0a0d14] border border-white/10 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-neutral-900">
          <div>
            <h2 className="text-2xl font-oswald font-bold text-white uppercase italic">Stint Strategy</h2>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{team.name} • {team.eventLength}H Event</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24} /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="mb-6 bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl flex items-start gap-3">
             <Clock className="text-blue-400 shrink-0 mt-1" size={18} />
             <div>
               <p className="text-blue-100 font-bold text-sm">Declare Availability</p>
               <p className="text-blue-300 text-xs mt-1">Click on the time blocks below to toggle your availability. Managers will assign final stints based on this data.</p>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {hours.map((hourIdx) => {
              const slotTime = new Date(startDate.getTime() + hourIdx * 60 * 60 * 1000);
              const availableDrivers = team.availability[hourIdx] || [];
              const isAvailable = availableDrivers.includes(currentUser);

              return (
                <button 
                  key={hourIdx}
                  onClick={() => toggleAvailability(hourIdx)}
                  className={`relative p-4 rounded-xl border transition-all text-left group ${
                    isAvailable 
                      ? 'bg-green-900/20 border-green-500/50 hover:bg-green-900/30' 
                      : 'bg-neutral-900 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-oswald font-bold text-white">
                      {slotTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="text-[10px] font-black text-gray-600 uppercase">H{hourIdx + 1}</span>
                  </div>
                  
                  <div className="space-y-1 min-h-[40px]">
                    {availableDrivers.length > 0 ? (
                      availableDrivers.map(driver => (
                        <div key={driver} className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${driver === currentUser ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                          <span className={`text-xs font-bold ${driver === currentUser ? 'text-white' : 'text-gray-400'}`}>
                            {driver === currentUser ? 'Me' : driver}
                          </span>
                        </div>
                      ))
                    ) : (
                      <span className="text-[10px] text-red-900 uppercase font-black tracking-widest">No Drivers</span>
                    )}
                  </div>

                  {isAvailable && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle size={14} className="text-green-500" />
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
};

const Endurance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'teams' | 'results'>('teams');
  const [teams, setTeams] = useState<EnduranceTeam[]>([
    { 
      id: 't1', 
      name: 'CNA Motorsports Red', 
      car: 'Ferrari 296 GT3', 
      owner: 'Admin_CNA', 
      members: ['Admin_CNA', 'SpeedyGonzales', 'DriftKing'], 
      maxSlots: 4,
      goal: 'podium',
      eventDate: '2025-11-15T12:00',
      eventLength: 6,
      availability: { 0: ['Admin_CNA'], 1: ['Admin_CNA', 'DriftKing'] }
    },
    { 
      id: 't2', 
      name: 'Black Mamba Racing', 
      car: 'Lamborghini Huracan GT3 EVO2', 
      owner: 'ApexPredator', 
      members: ['ApexPredator', 'GhostRider'], 
      maxSlots: 3,
      goal: 'fun',
      eventDate: '2025-12-05T18:00',
      eventLength: 4,
      availability: {}
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newTeam, setNewTeam] = useState({ 
    name: '', 
    car: '', 
    maxSlots: 4, 
    goal: 'fun' as 'podium' | 'fun',
    eventDate: '',
    eventLength: 6
  });

  const [managingTeamId, setManagingTeamId] = useState<string | null>(null);

  const currentUser = "You"; // Mock user

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeam.name || !newTeam.car || !newTeam.eventDate) return;
    
    const team: EnduranceTeam = {
      id: Math.random().toString(36).substr(2, 9),
      name: newTeam.name,
      car: newTeam.car,
      owner: currentUser,
      members: [currentUser],
      maxSlots: newTeam.maxSlots,
      goal: newTeam.goal,
      eventDate: newTeam.eventDate,
      eventLength: newTeam.eventLength,
      availability: {}
    };
    
    setTeams([...teams, team]);
    setNewTeam({ name: '', car: '', maxSlots: 4, goal: 'fun', eventDate: '', eventLength: 6 });
    setShowForm(false);
  };

  const joinTeam = (teamId: string) => {
    setTeams(teams.map(t => {
      if (t.id === teamId && t.members.length < t.maxSlots && !t.members.includes(currentUser)) {
        return { ...t, members: [...t.members, currentUser] };
      }
      return t;
    }));
  };

  const updateTeamData = (updatedTeam: EnduranceTeam) => {
    setTeams(teams.map(t => t.id === updatedTeam.id ? updatedTeam : t));
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-oswald font-bold uppercase tracking-tighter mb-2">Endurance Paddock</h1>
          <p className="text-gray-400">Assemble your squad for upcoming major endurance events.</p>
        </div>
        
        <div className="flex bg-neutral-900 p-1 rounded-full border border-white/5">
           <button 
             onClick={() => setActiveTab('teams')}
             className={`px-6 py-2 rounded-full font-bold transition-all text-[10px] uppercase tracking-widest ${activeTab === 'teams' ? 'bg-[#eb1923] text-white shadow-lg shadow-red-600/20' : 'text-gray-400 hover:text-white'}`}
           >
             Active Teams
           </button>
           <button 
             onClick={() => setActiveTab('results')}
             className={`px-6 py-2 rounded-full font-bold transition-all text-[10px] uppercase tracking-widest ${activeTab === 'results' ? 'bg-white text-black shadow-lg shadow-white/20' : 'text-gray-400 hover:text-white'}`}
           >
             Race Results
           </button>
        </div>
      </header>

      {activeTab === 'teams' ? (
        <>
          <div className="flex justify-end mb-8">
            <button 
              onClick={() => setShowForm(!showForm)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-600/20"
            >
              {showForm ? 'Cancel Registration' : <><Plus size={20} /> Register New Team</>}
            </button>
          </div>

          {showForm && (
            <div className="mb-12 bg-neutral-900 border border-white/10 rounded-3xl p-8 shadow-2xl max-w-2xl mx-auto animate-in fade-in zoom-in-95">
              <h2 className="text-2xl font-bold mb-6 font-oswald uppercase italic">New Team Application</h2>
              <form onSubmit={handleCreateTeam} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Team Name</label>
                  <input 
                    type="text" 
                    value={newTeam.name}
                    onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                    placeholder="e.g., Scuderia CNA"
                    className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-600"
                  />
                </div>
                
                {/* Car Selection */}
                <div>
                   <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Vehicle Choice</label>
                   <select 
                     value={newTeam.car}
                     onChange={(e) => setNewTeam({...newTeam, car: e.target.value})}
                     className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-600 appearance-none"
                   >
                     <option value="">Select a car...</option>
                     {CAR_OPTIONS.map(car => <option key={car} value={car}>{car}</option>)}
                   </select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   {/* Event Date */}
                   <div>
                     <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Start Date & Time</label>
                     <input 
                       type="datetime-local" 
                       value={newTeam.eventDate}
                       onChange={(e) => setNewTeam({...newTeam, eventDate: e.target.value})}
                       className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-600"
                     />
                   </div>
                   
                   {/* Duration */}
                   <div>
                     <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Event Length (Hours)</label>
                     <input 
                       type="number"
                       min="1"
                       max="24"
                       value={newTeam.eventLength}
                       onChange={(e) => setNewTeam({...newTeam, eventLength: parseInt(e.target.value)})}
                       className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-600"
                     />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   {/* Team Goal */}
                   <div>
                      <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Team Objective</label>
                      <div className="flex bg-black p-1 rounded-xl border border-white/10">
                         <button
                           type="button"
                           onClick={() => setNewTeam({...newTeam, goal: 'podium'})}
                           className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all ${newTeam.goal === 'podium' ? 'bg-red-600 text-white' : 'text-gray-500 hover:text-white'}`}
                         >
                            Podium
                         </button>
                         <button
                           type="button"
                           onClick={() => setNewTeam({...newTeam, goal: 'fun'})}
                           className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase transition-all ${newTeam.goal === 'fun' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-white'}`}
                         >
                            Fun
                         </button>
                      </div>
                   </div>

                   {/* Slots */}
                   <div>
                    <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest">Roster Size (2-16)</label>
                    <input 
                      type="number" 
                      min="2" 
                      max="16"
                      value={newTeam.maxSlots}
                      onChange={(e) => setNewTeam({...newTeam, maxSlots: parseInt(e.target.value)})}
                      className="w-full bg-black border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-xl uppercase tracking-[0.2em] hover:bg-gray-200 transition-colors shadow-lg">
                  Establish Team
                </button>
              </form>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teams.map(team => (
              <div key={team.id} className="bg-[#0a0d14] border border-white/5 rounded-3xl overflow-hidden shadow-lg hover:border-red-600/30 transition-all group flex flex-col">
                <div className="h-32 bg-neutral-900/50 relative flex items-center justify-center p-4 border-b border-white/5 group-hover:bg-neutral-800/50 transition-colors">
                  <Car size={64} className="text-white/5 absolute transform -rotate-12 scale-125" />
                  <div className="absolute top-4 left-4">
                     {team.goal === 'podium' ? (
                        <div className="flex items-center gap-1 bg-red-600/20 border border-red-600/30 px-2 py-1 rounded text-[9px] font-black text-red-500 uppercase tracking-widest">
                           <Trophy size={10} /> Competitive
                        </div>
                     ) : (
                        <div className="flex items-center gap-1 bg-blue-600/20 border border-blue-600/30 px-2 py-1 rounded text-[9px] font-black text-blue-500 uppercase tracking-widest">
                           <Beer size={10} /> Just for Fun
                        </div>
                     )}
                  </div>
                  <div className="text-center relative z-10">
                    <h3 className="text-xl font-bold text-white uppercase italic font-oswald tracking-tight">{team.name}</h3>
                    <span className="text-[10px] text-red-500 font-black uppercase tracking-widest">{team.car}</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                   <div className="flex justify-between items-start mb-6">
                      <div className="space-y-1">
                         <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
                            <Calendar size={14} /> {new Date(team.eventDate).toLocaleDateString()}
                         </div>
                         <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
                            <Clock size={14} /> {new Date(team.eventDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} ({team.eventLength}H)
                         </div>
                      </div>
                      <div className="text-right">
                         <span className="block text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Slots</span>
                         <span className="text-lg font-oswald font-bold text-white">{team.members.length}/{team.maxSlots}</span>
                      </div>
                   </div>

                  <div className="mb-8">
                    {/* Avatar Stack */}
                    <div className="flex items-center -space-x-3 overflow-hidden py-2 pl-1 mb-4">
                       {team.members.map((member, i) => (
                         <div key={i} className="relative group/avatar">
                           <div className="w-10 h-10 rounded-full border-2 border-[#0a0d14] bg-neutral-800 flex items-center justify-center text-[10px] font-bold text-gray-300 uppercase shadow-lg z-10 relative" title={member}>
                             {member.substring(0, 2)}
                           </div>
                           {member === team.owner && (
                              <div className="absolute -top-1 -right-1 z-20 bg-red-600 text-white p-0.5 rounded-full border border-[#0a0d14]">
                                 <Zap size={8} />
                              </div>
                           )}
                         </div>
                       ))}
                       {Array.from({ length: team.maxSlots - team.members.length }).map((_, i) => (
                         <div key={`empty-${i}`} className="w-10 h-10 rounded-full border-2 border-[#0a0d14] border-dashed border-white/10 bg-transparent flex items-center justify-center text-[10px] text-gray-700">
                           +
                         </div>
                       ))}
                    </div>
                  </div>
                  
                  <div className="mt-auto space-y-3">
                    {team.members.includes(currentUser) && (
                      <button 
                         onClick={() => setManagingTeamId(team.id)}
                         className="w-full py-3 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl text-xs uppercase tracking-widest border border-white/10 transition-colors flex items-center justify-center gap-2"
                      >
                         <Clock size={14} /> Manage Stints
                      </button>
                    )}
                    
                    <button 
                      disabled={team.members.length >= team.maxSlots || team.members.includes(currentUser)}
                      onClick={() => joinTeam(team.id)}
                      className={`w-full py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs transition-all ${
                        team.members.includes(currentUser) 
                        ? 'bg-green-900/20 text-green-500 cursor-default border border-green-500/30' 
                        : team.members.length >= team.maxSlots
                          ? 'bg-neutral-900 text-red-900 cursor-not-allowed border border-white/5'
                          : 'bg-white text-black hover:bg-red-600 hover:text-white shadow-lg'
                      }`}
                    >
                      {team.members.includes(currentUser) ? <><CheckCircle size={14} className="inline mr-1" /> Registered</> : team.members.length >= team.maxSlots ? 'Full Grid' : 'Join Crew'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {MOCK_ENDURANCE_RESULTS.map((event, idx) => (
             <div key={idx} className="bg-[#0a0d14] border border-white/5 rounded-3xl p-8 relative overflow-hidden group hover:border-red-600/30 transition-all">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform">
                   <Trophy size={150} className="text-white" />
                </div>
                
                <div className="relative z-10">
                   <div className="flex items-center gap-3 mb-6">
                      <span className="bg-red-600/10 text-red-500 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-red-600/20">Official Result</span>
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{event.date}</span>
                   </div>
                   <h2 className="text-3xl font-oswald font-bold text-white uppercase italic tracking-tighter mb-8">{event.eventName}</h2>

                   <div className="space-y-4">
                      {event.podium.map((entry) => (
                         <div key={entry.pos} className={`flex items-center gap-6 p-4 rounded-2xl border ${
                            entry.pos === 1 ? 'bg-yellow-500/10 border-yellow-500/30' : 
                            entry.pos === 2 ? 'bg-gray-300/10 border-gray-300/30' : 
                            'bg-orange-700/10 border-orange-700/30'
                         }`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-black italic shadow-lg ${
                               entry.pos === 1 ? 'bg-yellow-500 text-black' :
                               entry.pos === 2 ? 'bg-gray-300 text-black' :
                               'bg-orange-700 text-white'
                            }`}>
                               {entry.pos}
                            </div>
                            <div>
                               <h3 className="text-lg font-bold text-white uppercase italic">{entry.team}</h3>
                               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{entry.car}</p>
                            </div>
                            {entry.pos === 1 && <Trophy className="ml-auto text-yellow-500" size={24} />}
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          ))}
        </div>
      )}

      {/* Stint Manager Modal */}
      {managingTeamId && (
         <StintManager 
            team={teams.find(t => t.id === managingTeamId)!} 
            currentUser={currentUser}
            onClose={() => setManagingTeamId(null)}
            onUpdate={updateTeamData}
         />
      )}
    </div>
  );
};

export default Endurance;
