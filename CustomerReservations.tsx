import React, { useState, useEffect } from 'react';
import { MOCK_RESERVATIONS, MOCK_WAITLIST } from '../constants';
import { Reservation, WaitlistEntry } from '../types';
import { Calendar, Clock, User, Plus, X, Hourglass, Bell, CheckCircle, AlertCircle } from 'lucide-react';

export const CustomerReservations: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>(MOCK_RESERVATIONS);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>(MOCK_WAITLIST);
  
  // UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'info'} | null>(null);
  const [step, setStep] = useState<'select' | 'confirm' | 'waitlist'>('select');

  // Form State
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2
  });

  // Simulated Availability Check
  const checkAvailability = (time: string) => {
    return !['19:00', '20:00'].includes(time);
  };

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.time) return;

    const isAvailable = checkAvailability(formData.time);
    setStep(isAvailable ? 'confirm' : 'waitlist');
  };

  const handleConfirmReservation = () => {
    const newRes: Reservation = {
      id: `r${Date.now()}`,
      date: formatDate(formData.date),
      time: formData.time,
      guests: formData.guests,
      status: 'Confirmed'
    };
    setReservations([...reservations, newRes]);
    showNotification(`Table reserved for ${newRes.date} at ${newRes.time}`, 'success');
    resetModal();
  };

  const handleJoinWaitlist = () => {
    const newWait: WaitlistEntry = {
      id: `w${Date.now()}`,
      date: formatDate(formData.date),
      time: formData.time,
      guests: formData.guests,
      status: 'Waiting',
      joinedAt: new Date().toISOString()
    };
    setWaitlist([...waitlist, newWait]);
    showNotification('Added to waitlist. We will notify you when a spot opens!', 'info');
    resetModal();

    // SIMULATION: Spot opens up after 5 seconds
    setTimeout(() => {
      setWaitlist(prev => prev.map(w => w.id === newWait.id ? { ...w, status: 'Notified' } : w));
      showNotification('Good news! A table has opened up for your waitlisted slot!', 'success');
    }, 5000);
  };

  const handleAcceptWaitlistOffer = (entry: WaitlistEntry) => {
    const newRes: Reservation = {
      id: `r${Date.now()}`,
      date: entry.date,
      time: entry.time,
      guests: entry.guests,
      status: 'Confirmed'
    };
    setReservations([...reservations, newRes]);
    setWaitlist(prev => prev.filter(w => w.id !== entry.id));
    showNotification('Table confirmed from waitlist!', 'success');
  };

  const showNotification = (msg: string, type: 'success' | 'info') => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setStep('select');
    setFormData({ date: '', time: '', guests: 2 });
  };

  // Helper to convert YYYY-MM-DD to DD/MM/YYYY
  const formatDate = (dateString: string) => {
    if (dateString.includes('/')) return dateString;
    const [y, m, d] = dateString.split('-');
    return `${d}/${m}/${y}`;
  };

  return (
    <div className="space-y-8 relative">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in transform transition-all duration-500
          ${notification.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-coffee-800 text-white'}`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <Bell size={20} />}
          <span className="font-medium text-sm">{notification.message}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-coffee-900">My Reservations</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#A1887F] hover:bg-[#8D6E63] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg transition-all active:scale-95"
        >
          <Plus size={20} />
          New Table
        </button>
      </div>

      <div className="space-y-10">
         
         {/* Waitlist Section */}
         {waitlist.length > 0 && (
           <div className="animate-fade-in">
             <h3 className="text-xs font-bold text-orange-600 uppercase tracking-wider mb-4 ml-2 flex items-center gap-2">
               <Hourglass size={14} /> Waitlist
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {waitlist.map(w => (
                   <div key={w.id} className={`bg-white p-6 rounded-3xl shadow-sm border-2 flex flex-col gap-4 relative overflow-hidden transition-all duration-300
                     ${w.status === 'Notified' ? 'border-green-400 shadow-green-100' : 'border-orange-100'}`}>
                       
                       {w.status === 'Notified' && (
                         <div className="absolute top-0 left-0 w-full bg-green-100 text-green-800 text-[10px] font-bold text-center py-1 uppercase tracking-wide">
                           Table Available!
                         </div>
                       )}

                       <div className="flex justify-between items-center mt-2">
                           <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${w.status === 'Notified' ? 'bg-green-100 text-green-600' : 'bg-orange-50 text-orange-400'}`}>
                                 <Calendar size={18} />
                              </div>
                              <div>
                                 <p className="text-xs text-coffee-400 font-medium uppercase">Date</p>
                                 <p className="text-coffee-900 font-bold">{w.date}</p>
                              </div>
                           </div>
                           <div className="text-right">
                                 <p className="text-xs text-coffee-400 font-medium uppercase">Time</p>
                                 <p className="text-coffee-900 font-bold">{w.time}</p>
                           </div>
                       </div>
                       
                       <div className="flex justify-between items-center pt-4 border-t border-coffee-50">
                           <span className="text-xs text-coffee-500 flex items-center gap-1">
                             <User size={14} /> {w.guests} Guests
                           </span>
                           
                           {w.status === 'Notified' ? (
                             <button 
                               onClick={() => handleAcceptWaitlistOffer(w)}
                               className="bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-green-700 transition-colors shadow-md"
                             >
                               Book Now
                             </button>
                           ) : (
                             <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-3 py-1 rounded-full">
                               Waiting
                             </span>
                           )}
                       </div>
                   </div>
                ))}
             </div>
           </div>
         )}

         {/* Upcoming Section */}
         <div>
             <h3 className="text-xs font-bold text-coffee-400 uppercase tracking-wider mb-4 ml-2">Upcoming</h3>
             {reservations.filter(r => r.status === 'Confirmed').length === 0 ? (
                <div className="text-coffee-400 text-sm ml-2 italic">No upcoming reservations.</div>
             ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reservations.filter(r => r.status === 'Confirmed').map(r => (
                     <div key={r.id} className="bg-white p-8 rounded-3xl shadow-sm border border-coffee-100 flex justify-between items-center group hover:shadow-md transition-all">
                         <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded-full border-2 border-coffee-600 flex items-center justify-center text-coffee-600 bg-coffee-50 group-hover:bg-white transition-colors">
                               <Calendar size={24} />
                            </div>
                            <span className="text-xs font-bold text-coffee-900">Date</span>
                            <span className="text-xs text-coffee-600">{r.date}</span>
                         </div>
                         <div className="h-12 w-px bg-coffee-100"></div>
                         <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded-full border-2 border-coffee-600 flex items-center justify-center text-coffee-600 bg-coffee-50 group-hover:bg-white transition-colors">
                               <Clock size={24} />
                            </div>
                            <span className="text-xs font-bold text-coffee-900">Time</span>
                            <span className="text-xs text-coffee-600">{r.time}</span>
                         </div>
                         <div className="h-12 w-px bg-coffee-100"></div>
                         <div className="flex flex-col items-center gap-2">
                            <div className="w-16 h-16 rounded-full border-2 border-coffee-600 flex items-center justify-center text-coffee-600 bg-coffee-50 group-hover:bg-white transition-colors">
                               <User size={24} />
                            </div>
                            <span className="text-xs font-bold text-coffee-900">Guests</span>
                            <span className="text-xs text-coffee-600">{r.guests} pax.</span>
                         </div>
                     </div>
                  ))}
               </div>
             )}
         </div>

         {/* History Section */}
         <div>
            <h3 className="text-xs font-bold text-coffee-400 uppercase tracking-wider mb-4 ml-2">History</h3>
            <div className="opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reservations.filter(r => r.status === 'Completed').map(r => (
                   <div key={r.id} className="bg-white p-8 rounded-3xl shadow-sm border border-coffee-50 flex justify-between items-center relative overflow-hidden">
                       <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-[10px] px-2 py-1 rounded-full font-bold uppercase">Completed</div>
                       <div className="flex flex-col items-center gap-2">
                          <div className="w-16 h-16 rounded-full border-2 border-coffee-400 flex items-center justify-center text-coffee-400">
                             <Calendar size={24} />
                          </div>
                          <span className="text-xs font-bold text-coffee-800">Date</span>
                          <span className="text-xs text-coffee-500">{r.date}</span>
                       </div>
                       <div className="flex flex-col items-center gap-2">
                          <div className="w-16 h-16 rounded-full border-2 border-coffee-400 flex items-center justify-center text-coffee-400">
                             <Clock size={24} />
                          </div>
                          <span className="text-xs font-bold text-coffee-800">Time</span>
                          <span className="text-xs text-coffee-500">{r.time}</span>
                       </div>
                       <div className="flex flex-col items-center gap-2">
                          <div className="w-16 h-16 rounded-full border-2 border-coffee-400 flex items-center justify-center text-coffee-400">
                             <User size={24} />
                          </div>
                          <span className="text-xs font-bold text-coffee-800">Guests</span>
                          <span className="text-xs text-coffee-500">{r.guests} pax.</span>
                       </div>
                   </div>
                ))}
             </div>
            </div>
         </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-coffee-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
            <button 
              onClick={resetModal}
              className="absolute top-6 right-6 text-coffee-300 hover:text-coffee-800 transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-coffee-900 mb-2">
              {step === 'select' ? 'Book a Table' : step === 'waitlist' ? 'Table Unavailable' : 'Confirm Booking'}
            </h2>
            <p className="text-coffee-500 mb-8 text-sm">
              {step === 'select' ? 'Select your preferred date and time.' : 
               step === 'waitlist' ? 'This slot is fully booked. Join the waitlist?' : 'Review your details below.'}
            </p>

            {step === 'select' && (
              <form onSubmit={handleCheckAvailability} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-coffee-700 uppercase mb-2 ml-2">Date</label>
                  <input 
                    type="date" 
                    required
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-4 bg-coffee-50 rounded-xl text-coffee-900 font-medium outline-none focus:ring-2 focus:ring-coffee-400"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-coffee-700 uppercase mb-2 ml-2">Time</label>
                    <select 
                      required
                      className="w-full p-4 bg-coffee-50 rounded-xl text-coffee-900 font-medium outline-none focus:ring-2 focus:ring-coffee-400 appearance-none"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                    >
                      <option value="">Select</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                      <option value="19:00">19:00 (Busy)</option>
                      <option value="20:00">20:00 (Busy)</option>
                      <option value="21:00">21:00</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-coffee-700 uppercase mb-2 ml-2">Guests</label>
                    <input 
                      type="number" 
                      min="1" 
                      max="10"
                      required
                      className="w-full p-4 bg-coffee-50 rounded-xl text-coffee-900 font-medium outline-none focus:ring-2 focus:ring-coffee-400"
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-coffee-800 text-white rounded-xl font-bold mt-4 hover:bg-coffee-900 transition-colors shadow-lg">
                  Check Availability
                </button>
              </form>
            )}

            {step === 'waitlist' && (
              <div className="text-center space-y-6">
                 <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto text-orange-500 mb-4">
                   <Hourglass size={40} />
                 </div>
                 <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 text-left">
                    <p className="text-sm text-coffee-800 font-medium">
                      <span className="font-bold text-orange-600">Note:</span> Tables at {formData.time} on {formatDate(formData.date)} are currently full.
                    </p>
                 </div>
                 <div className="flex gap-3">
                   <button 
                    onClick={() => setStep('select')}
                    className="flex-1 py-3 text-coffee-600 font-bold rounded-xl hover:bg-coffee-50 transition-colors"
                   >
                     Back
                   </button>
                   <button 
                    onClick={handleJoinWaitlist}
                    className="flex-[2] py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200"
                   >
                     Join Waitlist
                   </button>
                 </div>
              </div>
            )}

            {step === 'confirm' && (
              <div className="space-y-6">
                 <div className="bg-green-50 p-6 rounded-2xl border border-green-100 text-center">
                    <CheckCircle className="mx-auto text-green-600 mb-2" size={32} />
                    <p className="text-green-800 font-bold text-lg">Available!</p>
                    <p className="text-green-700 text-sm">We have a table ready for you.</p>
                 </div>
                 <div className="flex justify-between px-4 py-2 border-b border-coffee-100">
                   <span className="text-coffee-500">Date</span>
                   <span className="text-coffee-900 font-bold">{formatDate(formData.date)}</span>
                 </div>
                 <div className="flex justify-between px-4 py-2 border-b border-coffee-100">
                   <span className="text-coffee-500">Time</span>
                   <span className="text-coffee-900 font-bold">{formData.time}</span>
                 </div>
                 <div className="flex justify-between px-4 py-2 border-b border-coffee-100">
                   <span className="text-coffee-500">Guests</span>
                   <span className="text-coffee-900 font-bold">{formData.guests} People</span>
                 </div>
                 
                 <div className="flex gap-3 pt-2">
                   <button 
                    onClick={() => setStep('select')}
                    className="flex-1 py-3 text-coffee-600 font-bold rounded-xl hover:bg-coffee-50 transition-colors"
                   >
                     Back
                   </button>
                   <button 
                    onClick={handleConfirmReservation}
                    className="flex-[2] py-3 bg-coffee-800 text-white font-bold rounded-xl hover:bg-coffee-900 transition-colors shadow-lg"
                   >
                     Confirm Booking
                   </button>
                 </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};