import React, { useState, useMemo } from 'react';
import { RotateCcw, Utensils, Clock, User } from 'lucide-react';


// The physical layout of the restaurant (Static)
const TABLE_LAYOUT = [
  { id: 1, label: 'T-01', type: 'rect', seats: 4, x: 1, y: 1, width: 2, height: 2 },
  { id: 2, label: 'T-02', type: 'rect', seats: 4, x: 1, y: 4, width: 2, height: 2 },
  { id: 3, label: 'T-03', type: 'circle', seats: 2, x: 4, y: 1, width: 2, height: 2 },
  { id: 4, label: 'T-04', type: 'circle', seats: 4, x: 4, y: 4, width: 2, height: 2 },
  { id: 5, label: 'T-05', type: 'rect', seats: 6, x: 7, y: 2, width: 3, height: 2 }, // Large table
  { id: 8, label: 'T-08', type: 'circle', seats: 2, x: 4, y: 7, width: 2, height: 2 },
  { id: 12, label: 'T-12', type: 'rect', seats: 2, x: 1, y: 7, width: 2, height: 2 },
];

// The live session data (Dynamic)
interface Order {
  id: string;
  tableId: string;
  orderTime: string;
  seatingTime: string;
  value: string;
  bookingType: 'Walk-in' | 'Reservation' | 'Online';
  status: 'Reserved' | 'Ordered' | 'Served' | 'Available'; 
  waitDuration: string;
}

const MOCK_ORDERS: Order[] = [
  { id: '#1024', tableId: 'T-04', orderTime: '09:15 AM', seatingTime: '1h 20m', value: '14.500', bookingType: 'Reservation', status: 'Ordered', waitDuration: '5m' },
  { id: '#1025', tableId: 'T-08', orderTime: '-', seatingTime: '-', value: '-', bookingType: 'Reservation', status: 'Reserved', waitDuration: '-' },
  { id: '#1026', tableId: 'T-02', orderTime: '09:45 AM', seatingTime: '15m', value: '22.000', bookingType: 'Walk-in', status: 'Ordered', waitDuration: '2m' },
  { id: '#1027', tableId: 'T-12', orderTime: '10:05 AM', seatingTime: 'Just seated', value: '5.500', bookingType: 'Walk-in', status: 'Ordered', waitDuration: '0m' },
  { id: '#1028', tableId: 'T-05', orderTime: '-', seatingTime: '-', value: '-', bookingType: 'Reservation', status: 'Reserved', waitDuration: '-' }
];

// Main Component

export const StaffTables: React.FC = () => {
  // Shared Filter State
  const [filter, setFilter] = useState<'All' | 'Reserved' | 'Ordered'>('All');
  
  const getTableStatus = (tableLabel: string) => {
    const order = MOCK_ORDERS.find(o => o.tableId === tableLabel);
    return order ? order.status : 'Available';
  };

  const filteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter(order => 
      filter === 'All' ? true : order.status === filter
    );
  }, [filter]);

  return (
    <div className="h-full flex flex-col space-y-6 p-6 bg-gray-50 min-h-screen">
      
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-coffee-900">Floor Management</h1>
          <p className="text-coffee-500 text-sm">Real-time status overview</p>
        </div>

        {/* Unified Filter Controls */}
        <div className="flex p-1 bg-white rounded-xl border border-coffee-200 shadow-sm">
          {['All', 'Ordered', 'Reserved'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                filter === f 
                  ? 'bg-coffee-800 text-white shadow-md transform scale-105' 
                  : 'text-coffee-400 hover:text-coffee-600 hover:bg-coffee-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Floor Plan */}
      <div className="bg-white rounded-3xl border-4 border-coffee-900 p-8 relative h-[500px] shadow-inner overflow-hidden">
         <div className="absolute inset-0 p-8">
            {/* Visual Decoration: Entrance */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center opacity-20 pointer-events-none">
               <span className="text-xs font-bold uppercase tracking-widest text-coffee-800 rotate-90 mb-2">Entrance</span>
               <div className="h-16 w-1 bg-coffee-800 rounded-full"></div>
            </div>

            {/* GRID SYSTEM */}
            <div className="grid grid-cols-12 grid-rows-8 gap-4 h-full w-full relative">
                {TABLE_LAYOUT.map((layoutItem) => {
                  const status = getTableStatus(layoutItem.label);
                  const isCircle = layoutItem.type === 'circle';
                  
                  // Filter Visual Logic: Dim tables that don't match the filter
                  let isDimmed = false;
                  if (filter !== 'All' && status !== filter) isDimmed = true;

                  // Dynamic Styles based on Status
                  let bgColor = 'bg-white';
                  let textColor = 'text-coffee-800';
                  let borderColor = 'border-coffee-600';

                  if (status === 'Reserved') {
                    bgColor = 'bg-purple-100'; 
                    textColor = 'text-purple-900';
                    borderColor = 'border-purple-300';
                  } else if (status === 'Ordered') {
                    bgColor = 'bg-amber-100'; 
                    textColor = 'text-amber-900';
                    borderColor = 'border-amber-300';
                  }

                  // Apply Dimming
                  const opacityClass = isDimmed ? 'opacity-20 grayscale' : 'opacity-100 shadow-lg';

                  return (
                    <div 
                        key={layoutItem.id} 
                        style={{
                            gridColumn: `${layoutItem.x} / span ${layoutItem.width}`,
                            gridRow: `${layoutItem.y} / span ${layoutItem.height}`,
                        }}
                        className={`relative flex items-center justify-center transition-all duration-500 ${opacityClass}`}
                    >
                      {/* Decorative Chairs */}
                      {isCircle ? (
                         <>
                           <div className="absolute -top-2 w-6 h-2 bg-coffee-200 rounded-full" />
                           <div className="absolute -bottom-2 w-6 h-2 bg-coffee-200 rounded-full" />
                         </>
                      ) : (
                          <div className="absolute -top-2 w-full flex justify-center gap-1">
                             <div className="w-8 h-2 bg-coffee-200 rounded-sm" />
                             <div className="w-8 h-2 bg-coffee-200 rounded-sm" />
                          </div>
                      )}

                      {/* The Table Itself */}
                      <div 
                        className={`
                          border-2 ${borderColor} ${bgColor} ${textColor}
                          flex flex-col items-center justify-center 
                          ${isCircle ? 'rounded-full w-20 h-20' : 'rounded-xl w-full h-full'}
                          cursor-pointer hover:scale-105 transition-transform
                        `}
                      >
                        <span className="text-lg font-bold">{layoutItem.label}</span>
                        {status !== 'Available' && (
                            <span className="text-[10px] uppercase font-bold mt-1 px-2 py-0.5 rounded-full bg-white/50">
                                {status}
                            </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
         </div>
      </div>

      {/* Detailed Data Table*/}
      <div className="bg-white rounded-3xl shadow-sm border border-coffee-100 overflow-hidden">
        <div className="p-6 border-b border-coffee-50 flex items-center gap-2">
            <Utensils className="text-coffee-400" size={20} />
            <h2 className="text-xl font-bold text-coffee-900">Active Sessions Details</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-coffee-50/50 text-coffee-400 text-xs uppercase tracking-wider">
                <th className="p-5 font-medium">Table</th>
                <th className="p-5 font-medium">Status</th>
                <th className="p-5 font-medium">Order ID</th>
                <th className="p-5 font-medium">Time Seated</th>
                <th className="p-5 font-medium">Value</th>
                <th className="p-5 font-medium">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-coffee-50">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="p-5 font-bold text-coffee-900">{order.tableId}</td>
                    <td className="p-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        order.status === 'Ordered' 
                            ? 'bg-amber-50 text-amber-700 border-amber-100' 
                            : 'bg-purple-50 text-purple-700 border-purple-100'
                        }`}>
                        {order.status}
                        </span>
                    </td>
                    <td className="p-5 text-coffee-600 font-mono text-xs">{order.id}</td>
                    <td className="p-5 text-coffee-800 flex items-center gap-2">
                        <Clock size={14} className="text-coffee-300"/>
                        {order.seatingTime}
                    </td>
                    <td className="p-5 text-coffee-900 font-medium">
                        {order.value !== '-' ? `BHD ${order.value}` : '-'}
                    </td>
                    <td className="p-5 text-coffee-600 text-sm">
                        {order.bookingType}
                    </td>
                    </tr>
                ))
              ) : (
                  <tr>
                      <td colSpan={6} className="p-12 text-center text-coffee-400 italic">
                          No tables found matching "{filter}" filter.
                      </td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};