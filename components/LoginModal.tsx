
import React, { useState } from 'react';
import { X, ShieldCheck, Activity, Key, Mail } from 'lucide-react';
import { iracingService } from '../services/iracingService';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStep, setSyncStep] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);
    
    setSyncStep('Authenticating with iRacing Data API...');
    await new Promise(r => setTimeout(r, 800));
    
    setSyncStep('Fetching Driver License Categories...');
    await new Promise(r => setTimeout(r, 600));
    
    setSyncStep('Calculating iRating & Safety Ratings...');
    const user = await iracingService.login(email);
    
    setSyncStep('Sync Complete!');
    await new Promise(r => setTimeout(r, 500));
    
    onSuccess(user);
    onClose();
    setIsSyncing(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-1 bg-gradient-to-r from-red-600 to-blue-600"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center border border-red-600/30">
              <ShieldCheck size={32} className="text-red-500" />
            </div>
          </div>

          <h2 className="text-2xl font-oswald font-bold text-center text-white uppercase italic tracking-tighter mb-2">
            iRacing <span className="text-red-600">Connect</span>
          </h2>
          <p className="text-center text-gray-500 text-xs uppercase tracking-widest font-bold mb-8">
            Sync your official credentials
          </p>

          {!isSyncing ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">iRacing Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input 
                    required
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="driver@iracing.com"
                    className="w-full bg-black border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">API Token / Password</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input 
                    required
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-black border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] mt-6"
              >
                Start Data Sync <Activity size={18} />
              </button>
            </form>
          ) : (
            <div className="py-10 text-center">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-sm font-bold text-white mb-2 animate-pulse">{syncStep}</p>
              <div className="w-full bg-neutral-800 h-1 rounded-full overflow-hidden max-w-[200px] mx-auto">
                <div className="h-full bg-red-600 animate-[loading_2s_ease-in-out_infinite]"></div>
              </div>
            </div>
          )}

          <p className="mt-8 text-[10px] text-center text-gray-600 leading-relaxed">
            By connecting, you authorize CNA Racing to access your public iRacing telemetry and career statistics. We do not store your credentials.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
