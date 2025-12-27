
import React, { useState } from 'react';
import { EnduranceTeam } from '../types';
import { ShieldAlert, Plus, Users, Car, CheckCircle } from 'lucide-react';

const Endurance: React.FC = () => {
  const [teams, setTeams] = useState<EnduranceTeam[]>([
    { id: 't1', name: 'CNA Motorsports Red', car: 'Ferrari 296 GT3', owner: 'Admin_CNA', members: ['Admin_CNA', 'SpeedyGonzales'], maxSlots: 3 },
    { id: 't2', name: 'Black Mamba Racing', car: 'Lamborghini Huracan GT3', owner: 'ApexPredator', members: ['ApexPredator'], maxSlots: 3 },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: '', car: '' });

  const currentUser = "You"; // Mock user

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeam.name || !newTeam.car) return;
    
    const team: EnduranceTeam = {
      id: Math.random().toString(36).substr(2, 9),
      name: newTeam.name,
      car: newTeam.car,
      owner: currentUser,
      members: [currentUser],
      maxSlots: 3
    };
    
    setTeams([...teams, team]);
    setNewTeam({ name: '', car: '' });
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

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-oswald font-bold uppercase tracking-tighter mb-2">Endurance Teams</h1>
          <p className="text-gray-400">Assemble your squad for upcoming major endurance events.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all"
        >
          {showForm ? 'Cancel' : <><Plus size={20} /> Register Team</>}
        </button>
      </header>

      {showForm && (
        <div className="mb-12 bg-neutral-900 border-2 border-red-600 rounded-2xl p-8 shadow-2xl max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Create Endurance Team</h2>
          <form onSubmit={handleCreateTeam} className="space-y-4">
            <div>
              <label className="block text-sm font-bold uppercase text-gray-500 mb-2">Team Name</label>
              <input 
                type="text" 
                value={newTeam.name}
                onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
                placeholder="e.g., Scuderia CNA"
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold uppercase text-gray-500 mb-2">Vehicle Choice</label>
              <select 
                value={newTeam.car}
                onChange={(e) => setNewTeam({...newTeam, car: e.target.value})}
                className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-600"
              >
                <option value="">Select a car...</option>
                <option value="Ferrari 296 GT3">Ferrari 296 GT3</option>
                <option value="Porsche 911 GT3 R">Porsche 911 GT3 R</option>
                <option value="BMW M4 GT3">BMW M4 GT3</option>
                <option value="Lamborghini Huracan GT3">Lamborghini Huracan GT3</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-lg uppercase tracking-widest hover:bg-gray-200 transition-colors">
              Establish Team
            </button>
          </form>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teams.map(team => (
          <div key={team.id} className="bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden shadow-lg hover:translate-y-[-4px] transition-all">
            <div className="h-32 bg-neutral-800 relative flex items-center justify-center p-4">
               <Car size={64} className="text-white/5 absolute" />
               <div className="text-center relative z-10">
                 <h3 className="text-xl font-bold text-white uppercase italic">{team.name}</h3>
                 <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{team.car}</span>
               </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 font-bold uppercase">Roster ({team.members.length}/{team.maxSlots})</span>
                  {team.members.includes(currentUser) && <span className="text-green-500 text-[10px] flex items-center gap-1 font-bold uppercase"><CheckCircle size={10} /> Joined</span>}
                </div>
                <div className="space-y-1">
                  {team.members.map((member, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                      {member} {member === team.owner && <span className="text-[10px] text-red-500 italic">(Owner)</span>}
                    </div>
                  ))}
                  {Array.from({ length: team.maxSlots - team.members.length }).map((_, i) => (
                    <div key={i} className="text-sm text-gray-700 italic border-b border-white/5 pb-1 last:border-0">Open Slot</div>
                  ))}
                </div>
              </div>
              
              <button 
                disabled={team.members.length >= team.maxSlots || team.members.includes(currentUser)}
                onClick={() => joinTeam(team.id)}
                className={`w-full py-3 rounded-xl font-bold uppercase tracking-tighter text-sm transition-all ${
                  team.members.includes(currentUser) 
                  ? 'bg-neutral-800 text-gray-500 cursor-not-allowed' 
                  : team.members.length >= team.maxSlots
                    ? 'bg-neutral-800 text-red-900 cursor-not-allowed'
                    : 'bg-white text-black hover:bg-red-600 hover:text-white'
                }`}
              >
                {team.members.includes(currentUser) ? 'ALREADY IN TEAM' : team.members.length >= team.maxSlots ? 'FULL' : 'JOIN CREW'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Endurance;
