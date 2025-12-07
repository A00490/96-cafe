import React from 'react';

// Define the shape of an Order object (Optional but good for TypeScript)
interface Order {
  id: string;
  tableId: string;
  orderTime: string;
  seatingTime: string;
  value: string;
  bookingType: 'Walk-in' | 'Reservation' | 'Online';
  waitDuration: string;
}

// Define the Dummy Data here
const MOCK_ORDERS: Order[] = [
  {
    id: '#1024',
    tableId: 'T-04',
    orderTime: '09:15 AM',
    seatingTime: '1h 20m',
    value: '14.500',
    bookingType: 'Reservation',
    waitDuration: '5m',
  },
  {
    id: '#1025',
    tableId: 'T-08',
    orderTime: '09:22 AM',
    seatingTime: '45m',
    value: '8.200',
    bookingType: 'Walk-in',
    waitDuration: '12m',
  },
  {
    id: '#1026',
    tableId: 'T-02',
    orderTime: '09:45 AM',
    seatingTime: '15m',
    value: '22.000',
    bookingType: 'Reservation',
    waitDuration: '2m',
  },
  {
    id: '#1027',
    tableId: 'T-12',
    orderTime: '10:05 AM',
    seatingTime: 'Just seated',
    value: '5.500',
    bookingType: 'Walk-in',
    waitDuration: '0m',
  },
];

export const StaffOrders: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-coffee-900 mb-8">Your Orders</h1>

      <div className="bg-white rounded-3xl shadow-sm border border-coffee-100/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-coffee-50/50 text-coffee-400 text-xs uppercase tracking-wider border-b border-coffee-100">
                <th className="p-6 font-medium">Order No.</th>
                <th className="p-6 font-medium">Table</th>
                <th className="p-6 font-medium">Order time</th>
                <th className="p-6 font-medium">Seating time</th>
                <th className="p-6 font-medium">Order value</th>
                <th className="p-6 font-medium">Booking</th>
                <th className="p-6 font-medium">Waits since</th>
                <th className="p-6 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-coffee-50">
              {MOCK_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-coffee-50/30 transition-colors group">
                  <td className="p-6 text-coffee-800 font-medium">{order.id}</td>
                  <td className="p-6 text-coffee-900 font-bold">{order.tableId}</td>
                  <td className="p-6 text-coffee-800">{order.orderTime}</td>
                  <td className="p-6 text-coffee-800">{order.seatingTime}</td>
                  <td className="p-6 text-coffee-800">BHD {order.value}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.bookingType === 'Reservation' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-coffee-100 text-coffee-700'
                    }`}>
                      {order.bookingType}
                    </span>
                  </td>
                  <td className="p-6 text-coffee-800">{order.waitDuration}</td>
                  <td className="p-6 text-right">
                     <button className="text-coffee-300 hover:text-coffee-600 transition-colors">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                         <polyline points="9 18 15 12 9 6"></polyline>
                       </svg>
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};