
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, Calendar, Users, Home, ShieldAlert, Flag, Globe } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Schedule', path: '/schedule', icon: <Calendar size={20} /> },
    { name: 'Results', path: '/results', icon: <Trophy size={20} /> },
    { name: 'Members', path: '/members', icon: <Users size={20} /> },
    { name: 'Globe', path: '/globe', icon: <Globe size={20} /> },
    { name: 'Endurance', path: '/endurance', icon: <ShieldAlert size={20} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-red-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-red-600 p-1 rounded italic font-bold text-white px-2 font-oswald text-xl tracking-tighter">
                CNA
              </div>
              <span className="font-oswald font-bold text-xl tracking-widest text-white hidden sm:block">
                RACING LEAGUE
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-red-900/30 z-50 flex justify-around p-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 p-2 rounded-md text-[10px] uppercase font-bold transition-colors ${
              location.pathname === item.path ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>

      <main className="flex-grow pb-20 md:pb-0">
        {children}
      </main>

      <footer className="bg-neutral-900 border-t border-white/5 py-8 text-center text-gray-500 text-sm">
        <div className="flex justify-center gap-4 mb-4">
          <Flag size={20} className="text-red-600" />
        </div>
        <p>&copy; {new Date().getFullYear()} CNA Racing League. Powered by iRacing.</p>
      </footer>
    </div>
  );
};

export default Layout;
