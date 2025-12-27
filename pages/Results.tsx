
import React from 'react';
import { PAST_RESULTS } from '../constants';
import { Trophy, Medal, Star } from 'lucide-react';

const Results: React.FC = () => {
  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-oswald font-bold uppercase tracking-tighter mb-4">Hall of Fame</h1>
        <p className="text-gray-400">Chronicles of speed and precision from past seasons.</p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PAST_RESULTS.map((res, idx) => (
          <div key={idx} className="bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden group hover:border-yellow-500/30 transition-all">
            <div className="p-1 bg-gradient-to-r from-yellow-600 to-orange-600"></div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-500">{res.season}</span>
                  <h3 className="text-xl font-bold text-white">{res.track}</h3>
                </div>
                <Trophy className="text-yellow-500" size={24} />
              </div>
              
              <div className="space-y-4">
                <div className="bg-black/40 p-3 rounded-lg flex items-center gap-3">
                  <div className="bg-yellow-500 text-black rounded-full p-1"><Medal size={16} /></div>
                  <div>
                    <span className="block text-[10px] uppercase text-gray-500">Winner</span>
                    <span className="font-bold text-white">{res.winner}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block text-[10px] uppercase text-gray-500 pl-1">Podium</span>
                  {res.podium.map((driver, i) => (
                    <div key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-1 last:border-0">
                      <span className="text-gray-300 flex items-center gap-2">
                        <span className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-yellow-500' : i === 1 ? 'bg-gray-400' : 'bg-orange-600'}`}></span>
                        {driver}
                      </span>
                      <span className="text-gray-600 text-[10px]">#{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
