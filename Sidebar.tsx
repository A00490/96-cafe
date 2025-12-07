import React from 'react';
import { LayoutDashboard, UtensilsCrossed, CalendarRange, Coffee, ClipboardList, Table as TableIcon } from 'lucide-react';
import { Role } from '../types';

interface SidebarProps {
  role: Role;
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ role, activePage, onNavigate, onLogout }) => {
  const staffItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ClipboardList },
    { id: 'reservations', label: 'Reservations', icon: CalendarRange },
  ];

  const customerItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
    { id: 'reservations', label: 'My Reservations', icon: CalendarRange },
  ];

  const items = role === 'staff' ? staffItems : customerItems;

  return (
    <aside className="w-20 lg:w-64 h-screen bg-coffee-50 fixed left-0 top-0 border-r border-coffee-200 flex flex-col justify-between z-20 transition-all duration-300">
      <div>
        <div className="h-32 flex flex-col items-center justify-center border-b border-coffee-100 mb-4">
          <div className="bg-coffee-800 text-white p-2 rounded-full mb-2 transform hover:rotate-12 transition-transform">
            <Coffee size={32} strokeWidth={1.5} />
          </div>
          <span className="text-coffee-900 font-bold text-xl hidden lg:block">96 Cafe</span>
        </div>

        <nav className="flex flex-col gap-2 px-4">
          {items.map((item) => {
            const isActive = activePage === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-4 p-3 rounded-2xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-white shadow-lg text-coffee-700 shadow-coffee-100 font-semibold' 
                    : 'text-coffee-600 hover:bg-white hover:shadow-md hover:text-coffee-800'
                  }`}
              >
                <Icon size={20} className={isActive ? 'text-coffee-600' : 'text-coffee-400 group-hover:text-coffee-600'} />
                <span className="hidden lg:block">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-4 mb-4">
        <button 
          onClick={onLogout}
          className="flex items-center gap-4 p-3 rounded-2xl text-coffee-600 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
        >
          <LogOut size={20} />
          <span className="hidden lg:block">Sign Out</span>
        </button>
      </div>

    </aside>
  );
};


const LogOut = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);