//User Roles
export type Role = 'customer' | 'staff';

// Menu Items (Matches your MongoDB Schema)
export interface MenuItem {
  _id: string;        
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  id?: string; // Optional helper if needed
}

// Table Statuses 
export type TableStatus = 'Available' | 'Occupied' | 'Reserved' | 'Dirty';

// Table Definition
export interface Table {
  _id: string;
  tableNumber: number;
  capacity: number;
  status: TableStatus;
}

// Cart Item (Used in CustomerMenu)
export interface CartItem extends MenuItem {
  quantity: number;
}