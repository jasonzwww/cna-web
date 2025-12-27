
import React, { useEffect, useState } from 'react';
import { geminiService } from '../services/geminiService';
import { ChevronRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [hype, setHype] = useState('Loading hype...');

  useEffect(() => {
    geminiService.generateHypeMessage("CNA Racing League").then(setHype);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <div 
        className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: 'url(https://picsum.photos/id/1071/1920/1080)' }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-8xl font-oswald font-bold text-white mb-4 tracking-tight uppercase italic leading-none">
            Speed is <span className="text-red-600">Mandatory</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto font-light">
            {hype}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/schedule" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest flex items-center gap-2 transition-transform hover:scale-105"
            >
              Race Schedule <ChevronRight size={20} />
            </Link>
            <Link 
              to="/members" 
              className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-transform hover:scale-105"
            >
              Meet the Drivers
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Series */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-oswald font-bold mb-12 uppercase border-l-4 border-red-600 pl-4 tracking-tighter">
            Active Series
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden rounded-2xl bg-neutral-900 border border-white/5 p-8 transition-all hover:border-red-600/50">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap size={120} />
              </div>
              <h3 className="text-2xl font-oswald font-bold mb-2">GT3 OPEN SERIES</h3>
              <p className="text-gray-400 mb-6">High-speed endurance and sprint races featuring the latest GT3 machinery. Open to all Class C and above drivers.</p>
              <ul className="text-sm text-gray-500 mb-6 space-y-2">
                <li>• 60 Minute Races</li>
                <li>• Custom BoP</li>
                <li>• Live Marshaling</li>
              </ul>
              <Link to="/schedule" className="text-red-500 font-bold uppercase text-sm tracking-widest hover:text-red-400 flex items-center gap-1">
                View Schedule <ChevronRight size={16} />
              </Link>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-neutral-900 border border-white/5 p-8 transition-all hover:border-red-600/50">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap size={120} />
              </div>
              <h3 className="text-2xl font-oswald font-bold mb-2">ROOKIE SPRINT CUP</h3>
              <p className="text-gray-400 mb-6">The perfect starting point. Fixed setup racing in the Mazda MX-5 and Toyota GR86. Focus on racecraft and safety.</p>
              <ul className="text-sm text-gray-500 mb-6 space-y-2">
                <li>• 20 Minute Sprints</li>
                <li>• Fixed Setup</li>
                <li>• Mentorship Program</li>
              </ul>
              <Link to="/schedule" className="text-red-500 font-bold uppercase text-sm tracking-widest hover:text-red-400 flex items-center gap-1">
                View Schedule <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
