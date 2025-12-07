import Table from '../models/Table.js';

// 1. GET all tables (Sorted by number)
export const getTables = async (req, res) => {
  try {
    const tables = await Table.find().sort({ tableNumber: 1 });
    res.status(200).json({ status: 'success', data: { tables } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// 2. UPDATE a table status (e.g., 'Available' -> 'Occupied')
export const updateTableStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const table = await Table.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true, runValidators: true }
    );
    res.status(200).json({ status: 'success', data: { table } });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
};

// 3. SEED TABLES (Run this once to generate the layout in DB)
export const seedTables = async (req, res) => {
    try {
        // Clear existing tables to avoid duplicates
        await Table.deleteMany(); 
        
        // These match the layout in your frontend StaffTables.tsx
        const tables = [
            // Window Seats
            { tableNumber: 1, capacity: 4, status: 'Available' },
            { tableNumber: 2, capacity: 4, status: 'Available' },
            { tableNumber: 3, capacity: 4, status: 'Available' },
            
            // Center Round Tables
            { tableNumber: 4, capacity: 4, status: 'Occupied' },
            { tableNumber: 5, capacity: 4, status: 'Available' },
            { tableNumber: 6, capacity: 4, status: 'Available' },
            
            // Booths
            { tableNumber: 7, capacity: 2, status: 'Dirty' },
            { tableNumber: 8, capacity: 2, status: 'Available' },
            
            // Large Group Table
            { tableNumber: 9, capacity: 8, status: 'Reserved' },
            
            // Extra Table
            { tableNumber: 10, capacity: 2, status: 'Available' },
        ];
        
        await Table.insertMany(tables);
        res.status(201).json({ msg: "Tables Seeded Successfully!" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}