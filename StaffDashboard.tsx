import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MenuItem } from '../types'; // Ensure you have this type defined in src/types.ts

// Dashboard Stats Data (Hardcoded for UI demo)
const data = [
  { name: 'Reservations', value: 79 },
  { name: 'Walk-ins', value: 21 },
];

const COLORS = ['#8D6E63', '#FFFFFF'];

export const StaffDashboard: React.FC = () => {
  // 1. State to hold the fetched menu items
  const [popularItems, setPopularItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Fetch Data from your Backend
  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        // Fetch from your actual API
        const response = await fetch('/api/v1/menu'); 
        const json = await response.json();
        
        if (json.data && Array.isArray(json.data.items)) {
          // 3. LOGIC: Take the first 3 items from the database. This makes the dashboard look active immediately.
          setPopularItems(json.data.items.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularItems();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-4xl font-bold text-coffee-900 mb-8">Your Dashboard</h1>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tables Stats */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-coffee-100/50 hover:shadow-md transition-shadow">
          <h3 className="text-xs font-bold text-coffee-400 uppercase tracking-wider mb-4">Today</h3>
          <h2 className="text-2xl font-bold text-coffee-900 mb-6">Tables</h2>
          
          <div className="flex justify-between items-center">
            <div className="text-center">
               <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-coffee-600 mb-2">
                  <span className="text-2xl font-bold text-coffee-800">80%</span>
               </div>
               <p className="text-sm font-medium text-coffee-800">Table utilisation</p>
               <p className="text-xs text-coffee-400">2 tables not used</p>
            </div>
            
            <div className="h-16 w-px bg-coffee-100 mx-2"></div>

            <div className="text-center">
               <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-coffee-400 mb-2">
                  <span className="text-2xl font-bold text-coffee-800">85%</span>
               </div>
               <p className="text-sm font-medium text-coffee-800">Guests served</p>
               <p className="text-xs text-coffee-400">2 tables waiting</p>
            </div>

            <div className="h-16 w-px bg-coffee-100 mx-2"></div>

             <div className="text-center">
               <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-dashed border-coffee-300 mb-2">
                  <span className="text-2xl font-bold text-coffee-800">2</span>
               </div>
               <p className="text-sm font-medium text-coffee-800">Recommendations</p>
               <p className="text-xs text-coffee-400">Improvement possible</p>
            </div>
          </div>
        </div>

        {/* Orders Stats */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-coffee-100/50 hover:shadow-md transition-shadow">
           <h3 className="text-xs font-bold text-coffee-400 uppercase tracking-wider mb-4">Today</h3>
           <h2 className="text-2xl font-bold text-coffee-900 mb-6">Orders</h2>

           <div className="space-y-6">
             <div className="flex items-center justify-between">
               <span className="text-4xl font-bold text-coffee-600">53</span>
               <span className="text-coffee-700 font-medium flex-1 ml-6 pb-2 border-b border-coffee-50">Total orders today</span>
             </div>
             <div className="flex items-center justify-between">
               <span className="text-4xl font-bold text-coffee-400">2</span>
               <span className="text-coffee-700 font-medium flex-1 ml-6 pb-2 border-b border-coffee-50">Tables without orders</span>
             </div>
             <div className="flex items-center justify-between">
               <span className="text-4xl font-bold text-coffee-400">6</span>
               <span className="text-coffee-700 font-medium flex-1 ml-6">Active orders handled</span>
             </div>
           </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Reservations Pie Chart */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-coffee-100/50 hover:shadow-md transition-shadow">
           <div className="mb-2">
             <h3 className="text-xs font-bold text-coffee-400 uppercase tracking-wider mb-1">Today</h3>
             <h2 className="text-2xl font-bold text-coffee-900">Reservations</h2>
           </div>
           
           <div className="flex flex-col sm:flex-row items-center justify-between h-64 gap-8">
              {/* Chart Side */}
              <div className="relative w-full sm:w-1/2 h-full flex flex-col items-center justify-center">
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      dataKey="value"
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={0}
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      labelLine={true}
                    >
                      {data.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index]} 
                          stroke={index === 1 ? '#8D6E63' : 'none'} 
                          strokeWidth={index === 1 ? 1 : 0}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Stats Side */}
              <div className="w-full sm:w-1/2 flex flex-col justify-center space-y-6 border-l border-coffee-100 pl-8">
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-coffee-600">4</p>
                  <p className="text-sm font-medium text-coffee-800">Reservations booked</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-coffee-400">2</p>
                  <p className="text-sm font-medium text-coffee-800">Waitlist entries</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-[#D7CCC8]">1</p>
                  <p className="text-sm font-medium text-coffee-800">Cancellation</p>
                </div>
              </div>
           </div>
        </div>

        {/* === UPDATED SECTION: Popular Menu Items === */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-coffee-100/50 hover:shadow-md transition-shadow">
          <h3 className="text-xs font-bold text-coffee-400 uppercase tracking-wider mb-4">Today</h3>
          <h2 className="text-2xl font-bold text-coffee-900 mb-6">Featured Menu Items</h2>
          
          <div className="space-y-6">
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <p className="text-coffee-500 animate-pulse">Loading menu data...</p>
                </div>
            ) : popularItems.length > 0 ? (
                popularItems.map((item, i) => (
                <div key={item._id || i} className="flex items-center justify-between group cursor-default">
                    <div className="flex items-center gap-4">
                        {/* Image Container */}
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-coffee-100 bg-coffee-50">
                             <img 
                                src={item.image} 
                                alt={item.name} 
                                // Fallback for image errors to keep dashboard clean
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Coffee';
                                }}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                             />
                        </div>
                        <span className="font-medium text-coffee-900">{item.name}</span>
                    </div>
                    
                    <div className="flex gap-8 text-sm">
                        <div className="text-right w-24">
                            <p className="text-xs text-coffee-400 uppercase">Price</p>
                            <p className="font-medium text-coffee-800">BHD {item.price.toFixed(2)}</p>
                        </div>
                        <div className="text-right w-24">
                            {/* Changed 'Revenue' to 'Category' for now */}
                            <p className="text-xs text-coffee-400 uppercase">Category</p>
                            <p className="font-medium text-coffee-600 bg-coffee-50 px-2 py-1 rounded-lg inline-block">
                                {item.category}
                            </p>
                        </div>
                    </div>
                </div>
                ))
            ) : (
                <div className="text-center py-8 bg-coffee-50/50 rounded-2xl">
                    <p className="text-coffee-400">No menu items found in database.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};