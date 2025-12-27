
import React, { useState } from 'react';
import { SCHEDULE } from '../constants';
import { RaceSeries } from '../types';
import { Calendar, Clock, MapPin, BrainCircuit, X } from 'lucide-react';
import { geminiService } from '../services/geminiService';

const Schedule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RaceSeries>(RaceSeries.GT3_OPEN);
  const [trackGuide, setTrackGuide] = useState<{ track: string; text: string } | null>(null);
  const [loadingGuide, setLoadingGuide] = useState(false);

  const filteredRaces = SCHEDULE.filter(race => race.series === activeTab);

  const handleTrackGuide = async (track: string) => {
    setLoadingGuide(true);
    const car = activeTab === RaceSeries.GT3_OPEN ? 'GT3 car' : 'Rookie car';
    const guide = await geminiService.getTrackGuide(track, car);
    setTrackGuide({ track, text: guide || '' });
    setLoadingGuide(false);
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-oswald font-bold uppercase tracking-tighter mb-4">Race Schedule</h1>
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab(RaceSeries.GT3_OPEN)}
            className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === RaceSeries.GT3_OPEN ? 'bg-red-600 text-white' : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700'}`}
          >
            GT3 Open
          </button>
          <button 
            onClick={() => setActiveTab(RaceSeries.ROOKIES)}
            className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === RaceSeries.ROOKIES ? 'bg-red-600 text-white' : 'bg-neutral-800 text-gray-400 hover:bg-neutral-700'}`}
          >
            Rookies
          </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {filteredRaces.map((race) => (
            <div key={race.id} className="bg-neutral-900 border border-white/5 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-red-600/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="bg-neutral-800 p-4 rounded-lg text-center min-w-[80px]">
                  <span className="block text-red-500 font-bold text-xl">{new Date(race.date).getDate()}</span>
                  <span className="text-xs uppercase text-gray-400">{new Date(race.date).toLocaleString('default', { month: 'short' })}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{race.track}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1"><Clock size={14} /> {race.duration}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> iRacing</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleTrackGuide(race.track)}
                disabled={loadingGuide}
                className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 self-start md:self-center"
              >
                <BrainCircuit size={16} className="text-red-500" />
                {loadingGuide && trackGuide?.track === race.track ? 'Analyzing...' : 'Track Briefing'}
              </button>
            </div>
          ))}
        </div>

        {/* Sidebar Track Guide */}
        <div className="relative">
          <div className="sticky top-24 bg-neutral-900 border border-white/5 rounded-2xl p-6 shadow-2xl">
            {trackGuide ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-oswald font-bold text-red-500 uppercase">AI Race Engineer</h3>
                  <button onClick={() => setTrackGuide(null)} className="text-gray-500 hover:text-white"><X size={18} /></button>
                </div>
                <h4 className="text-xl font-bold mb-2">{trackGuide.track}</h4>
                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                  {trackGuide.text}
                </p>
                <div className="mt-6 pt-6 border-t border-white/10 text-[10px] text-gray-600 uppercase tracking-widest">
                  Powered by Gemini 3 Flash
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <BrainCircuit size={48} className="mx-auto text-neutral-800 mb-4" />
                <p className="text-gray-500 italic">Select a track to get your custom race briefing from our AI Engineer.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
