
// Table Layout for demo purposes for StaffTables.tsx
export interface TableLayoutItem {
  id: string;
  label: string;
  tableNumber: number;
  type: 'rect' | 'circle';
  x: number;
  y: number;
  width: number;
  height: number;
  seats: number;
}

export const TABLE_LAYOUT: TableLayoutItem[] = [
  { id: 't1', label: 'T1', tableNumber: 1, type: 'rect', x: 2, y: 1, width: 2, height: 2, seats: 4 },
  { id: 't2', label: 'T2', tableNumber: 2, type: 'rect', x: 5, y: 1, width: 2, height: 2, seats: 4 },
  { id: 't3', label: 'T3', tableNumber: 3, type: 'rect', x: 8, y: 1, width: 2, height: 2, seats: 4 },
  { id: 't4', label: 'T4', tableNumber: 4, type: 'circle', x: 3, y: 4, width: 2, height: 2, seats: 4 },
  { id: 't5', label: 'T5', tableNumber: 5, type: 'circle', x: 6, y: 4, width: 2, height: 2, seats: 4 },
  { id: 't6', label: 'T6', tableNumber: 6, type: 'circle', x: 9, y: 4, width: 2, height: 2, seats: 4 },
  { id: 't7', label: 'T7', tableNumber: 7, type: 'rect', x: 1, y: 7, width: 2, height: 2, seats: 2 },
  { id: 't8', label: 'T8', tableNumber: 8, type: 'rect', x: 3, y: 7, width: 2, height: 2, seats: 2 },
  { id: 't9', label: 'T9', tableNumber: 9, type: 'rect', x: 7, y: 7, width: 4, height: 2, seats: 8 },
  { id: 't10', label: 'T10', tableNumber: 10, type: 'circle', x: 11, y: 2, width: 2, height: 2, seats: 2 },
];

// Orders for demo purposes for StaffOrders.tsx
export const MOCK_ORDERS = [
  {
    id: '1',
    tableId: 'T1',
    items: [
      { name: 'Cappuccino', quantity: 2, price: 3.50 },
      { name: 'Croissant', quantity: 1, price: 2.50 }
    ],
    status: 'pending',
    time: '10:30 AM'
  },
  {
    id: '2',
    tableId: 'T3',
    items: [
      { name: 'Iced Latte', quantity: 1, price: 4.00 }
    ],
    status: 'ready',
    time: '10:35 AM'
  }
];

// Reservations for demo purposes 
export const MOCK_RESERVATIONS = [
  {
    id: 1,
    name: 'Ali Ahmed',
    date: '2024-03-20',
    time: '19:00',
    guests: 4,
    status: 'confirmed',
    tableId: 'T2'
  },
  {
    id: 2,
    name: 'Sarah Smith',
    date: '2024-03-20',
    time: '20:30',
    guests: 2,
    status: 'pending',
    tableId: 'T7'
  },
  {
    id: 3,
    name: 'Mohammed Al-Farsi',
    date: '2024-03-21',
    time: '18:00',
    guests: 6,
    status: 'confirmed',
    tableId: 'T9'
  }
];

// ==========================================
// 4. MOCK WAITLIST (This was the missing piece!)
// ==========================================
export const MOCK_WAITLIST = [
  {
    id: 1,
    name: 'Fatima Ali',
    guests: 3,
    phone: '+973 3333 4444',
    timeJoined: '19:15',
    status: 'waiting'
  },
  {
    id: 2,
    name: 'John Doe',
    guests: 2,
    phone: '+973 5555 6666',
    timeJoined: '19:30',
    status: 'notified'
  }
];