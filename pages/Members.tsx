
import React, { useState } from 'react';
import { MEMBERS } from '../constants';
import { Search, UserCircle, ShieldCheck, Car } from 'lucide-react';

const Members: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = MEMBERS.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <h1 className="text-4xl font-oswald font-bold uppercase tracking-tighter">Drivers Directory</h1>
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search drivers..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-900 border border-white/10 rounded-full py-2 pl-10 pr-4 text-white focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map(member => (
          <div key={member.id} className="bg-neutral-900 rounded-2xl p-6 border border-white/5 hover:border-red-600/20 transition-all text-center group">
            <div className="w-20 h-20 bg-neutral-800 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform">
              <UserCircle size={48} />
            </div>
            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
            <div className="flex justify-center gap-2 mb-4">
              <span className="bg-blue-900/40 text-blue-400 text-[10px] px-2 py-0.5 rounded border border-blue-400/30 font-bold uppercase tracking-wider">iR: {member.iRating}</span>
              <span className="bg-green-900/40 text-green-400 text-[10px] px-2 py-0.5 rounded border border-green-400/30 font-bold uppercase tracking-wider">{member.safetyRating}</span>
            </div>
            
            <div className="space-y-2 text-left bg-black/40 p-3 rounded-lg border border-white/5">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Car size={14} className="text-red-500" />
                <span className="truncate">{member.favCar}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheck size={14} className="text-red-500" />
                <span>Since {new Date(member.joinedDate).getFullYear()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
