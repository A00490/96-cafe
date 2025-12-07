import React from 'react';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

interface Props {
  onNavigate: (page: string) => void;
}

export const CustomerDashboard: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-coffee-900">Hello Sayera,</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Reservation */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-coffee-100/50 relative overflow-hidden">
          <h3 className="text-xs font-bold text-coffee-400 uppercase tracking-wider mb-8">Today</h3>
          <h2 className="text-xl font-bold text-coffee-900 mb-8">Your Upcoming Reservation</h2>

          <div className="flex justify-between items-start text-center">
             <div className="flex flex-col items-center gap-4">
               <div className="w-20 h-20 rounded-full border-2 border-coffee-600 flex items-center justify-center text-coffee-600 bg-coffee-50">
                 <Calendar size={32} />
               </div>
               <div>
                 <p className="text-sm font-medium text-coffee-900">Date</p>
                 <p className="text-sm text-coffee-600 mt-1">20/11/2025</p>
               </div>
             </div>

             <div className="flex flex-col items-center gap-4">
               <div className="w-20 h-20 rounded-full border-2 border-coffee-600 flex items-center justify-center text-coffee-600 bg-coffee-50">
                 <Clock size={32} />
               </div>
               <div>
                 <p className="text-sm font-medium text-coffee-900">Time</p>
                 <p className="text-sm text-coffee-600 mt-1">18:00</p>
               </div>
             </div>

             <div className="flex flex-col items-center gap-4">
               <div className="w-20 h-20 rounded-full border-2 border-coffee-600 flex items-center justify-center text-coffee-600 bg-coffee-50">
                 <User size={32} />
               </div>
               <div>
                 <p className="text-sm font-medium text-coffee-900">Guests</p>
                 <p className="text-sm text-coffee-600 mt-1">2 pax.</p>
               </div>
             </div>
          </div>
        </div>

        {/* Promo Card */}
        <div className="bg-gradient-to-br from-[#8D6E63] to-[#5D4037] p-8 rounded-3xl shadow-lg relative overflow-hidden group flex items-center justify-between min-h-[260px]">
          {/* Content */}
          <div className="z-10 max-w-[60%] relative">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight text-white">Planning your next visit?</h2>
            <p className="text-coffee-100 mb-8 text-sm opacity-90">Check out our menu before you book</p>
            
            <button 
              onClick={() => onNavigate('menu')}
              className="bg-[#D7CCC8] text-[#5D4037] px-6 py-3 rounded-xl font-bold text-sm hover:bg-white transition-colors flex items-center gap-2"
            >
              View Menu <ArrowRight size={16} />
            </button>
          </div>

          {/* Image */}
          <div className="relative z-10 mr-4">
              <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden transform group-hover:scale-105 transition-transform duration-500">
                <img 
                    src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80"
                    className="w-full h-full object-cover"
                    alt="Croissant"
                />
              </div>
          </div>

          {/* Background Decor */}
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};