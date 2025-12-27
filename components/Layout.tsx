
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Trophy, Calendar, Users, Home, ShieldAlert, Flag, Globe, LogIn, UserCircle, Settings, LogOut, ChevronDown, Zap } from 'lucide-react';
import LoginModal from './LoginModal';
import { UserProfile } from '../types';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('cna_driver');
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // Listen for storage changes in the same window (profile updates)
  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('cna_driver');
      if (saved) setUser(JSON.parse(saved));
    };
    window.addEventListener('storage', handleStorage);
    // Custom event for internal updates
    window.addEventListener('profileUpdate', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('profileUpdate', handleStorage);
    };
  }, []);

  const handleLoginSuccess = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem('cna_driver', JSON.stringify(profile));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('cna_driver');
    navigate('/');
  };

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { 
      name: 'Series', 
      path: '#', 
      icon: <Flag size={18} />,
      children: [
        { name: 'GT3 Open', path: '/series/gt3', icon: <Zap size={14} /> },
        { name: 'Rookies', path: '/series/rookies', icon: <Trophy size={14} /> }
      ]
    },
    { name: 'Schedule', path: '/schedule', icon: <Calendar size={18} /> },
    { name: 'Results', path: '/results', icon: <Trophy size={18} /> },
    { name: 'Members', path: '/members', icon: <Users size={18} /> },
    { name: 'Globe', path: '/globe', icon: <Globe size={18} /> },
    { name: 'Endurance', path: '/endurance', icon: <ShieldAlert size={18} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#05070a]">
      <nav className="sticky top-0 z-50 bg-[#05070a]/90 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-24">
            {/* Logo Area */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-4 group">
                <div className="bg-[#eb1923] p-2 rounded-lg italic font-bold text-white px-4 font-oswald text-3xl tracking-tighter group-hover:scale-105 transition-transform shadow-[0_0_20px_rgba(235,25,35,0.4)]">
                  CNA
                </div>
                <div className="hidden lg:block">
                  <span className="font-oswald font-bold text-xl tracking-widest text-white block leading-none italic">RACING</span>
                  <span className="text-[10px] text-gray-600 uppercase font-black tracking-[0.4em]">League Hub</span>
                </div>
              </Link>
            </div>

            {/* Main Nav */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                item.children ? (
                  <div key={item.name} className="relative group">
                    <button 
                      className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-[10px] uppercase font-black tracking-widest transition-all text-gray-500 hover:text-white hover:bg-white/5 border border-transparent`}
                    >
                      {item.icon}
                      {item.name}
                      <ChevronDown size={14} />
                    </button>
                    <div className="absolute top-full left-0 mt-2 w-56 bg-[#0a0d14] border border-white/10 rounded-2xl p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all translate-y-2 group-hover:translate-y-0 shadow-2xl z-[60]">
                      {item.children.map(child => (
                        <Link 
                          key={child.path} 
                          to={child.path}
                          className="flex items-center gap-3 w-full text-left px-5 py-3 text-[10px] font-black uppercase text-gray-300 hover:bg-white/5 rounded-xl transition-colors tracking-widest italic hover:text-[#eb1923]"
                        >
                          {child.icon} {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-[10px] uppercase font-black tracking-widest transition-all ${
                      location.pathname === item.path
                        ? 'text-[#eb1923] bg-[#eb1923]/5 border border-[#eb1923]/10'
                        : 'text-gray-500 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                )
              ))}
            </div>

            {/* Auth Area */}
            <div className="flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="hidden xl:flex items-center gap-8 border-l border-white/10 pl-8 mr-2">
                    <div className="text-right">
                      <span className="block text-[9px] text-gray-600 uppercase font-black tracking-widest mb-1">Formula</span>
                      <span className="text-base font-oswald font-bold text-blue-500 italic">{user.licenses.formula.irating} iR</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[9px] text-gray-600 uppercase font-black tracking-widest mb-1">Sports Car</span>
                      <span className="text-base font-oswald font-bold text-[#eb1923] italic">{user.licenses.sports_car.irating} iR</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-full pl-2 pr-6 py-2 hover:border-[#eb1923]/30 transition-all group relative cursor-pointer">
                    <Link to="/profile" className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#eb1923] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(235,25,35,0.5)]">
                        {user.display_name.charAt(0)}
                      </div>
                      <div className="hidden sm:block">
                        <span className="text-xs font-black text-white block leading-none mb-1 italic">{user.display_name}</span>
                        <span className="text-[9px] text-gray-600 font-black block uppercase tracking-tighter">Profile & Results</span>
                      </div>
                    </Link>
                    
                    <div className="absolute top-full right-0 mt-3 w-56 bg-[#0a0d14] border border-white/10 rounded-2xl p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all translate-y-2 group-hover:translate-y-0 shadow-2xl z-[60]">
                       <Link to="/profile" className="flex items-center gap-3 w-full text-left px-5 py-3 text-[10px] font-black uppercase text-gray-300 hover:bg-white/5 rounded-xl transition-colors tracking-widest italic mb-1">
                         <Settings size={14} className="text-[#eb1923]" /> Dashboard
                       </Link>
                       <button 
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full text-left px-5 py-3 text-[10px] font-black uppercase text-[#eb1923] hover:bg-[#eb1923]/10 rounded-xl transition-colors tracking-widest italic"
                       >
                         <LogOut size={14} /> Disconnect
                       </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setIsLoginOpen(true)}
                  className="flex items-center gap-3 bg-[#eb1923] hover:bg-[#ff1e26] text-white px-8 py-3 rounded-full text-[10px] font-black uppercase italic tracking-widest transition-all shadow-[0_0_20px_rgba(235,25,35,0.4)] active:scale-95"
                >
                  <LogIn size={18} />
                  Join the Grid
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#05070a]/95 backdrop-blur-3xl border-t border-white/5 z-50 flex justify-around p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        {navItems.filter(item => !item.children).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-2 transition-colors ${
              location.pathname === item.path ? 'text-[#eb1923]' : 'text-gray-600'
            }`}
          >
            {item.icon}
            <span className="text-[9px] uppercase font-black tracking-widest italic">{item.name}</span>
          </Link>
        ))}
      </div>

      <main className="flex-grow pb-24 md:pb-0">
        {children}
      </main>

      <footer className="bg-[#030407] border-t border-white/5 py-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center gap-6 mb-10">
            <Flag size={28} className="text-[#eb1923] opacity-30" />
          </div>
          <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.5em] mb-6">
            Official CNA iRacing Community Portal
          </p>
          <p className="text-xs text-gray-700 max-w-2xl mx-auto leading-loose font-medium px-4">
            &copy; {new Date().getFullYear()} CNA Racing League. This application connects to official iRacing Data APIs to synchronize career metrics and seasonal standings. Telemetry and brand assets are the property of iRacing.com Motorsport Simulations.
          </p>
        </div>
      </footer>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default Layout;
