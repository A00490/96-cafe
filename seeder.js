import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables (needed to connect to MongoDB)
dotenv.config();

// Assuming your connectDB function is working and exported as default from config/db.js
// We don't need to import it if we handle the connection here, but we will reuse the URI.
const MONGODB_URI = process.env.MONGODB_URI;

// Import your Mongoose Model
import MenuItem from './models/MenuItem.js'; 

if (!MONGODB_URI) {
  console.error('FATAL ERROR: MONGODB_URI is not defined in .env');
  process.exit(1);
}

// Connect to the Database
mongoose.connect(MONGODB_URI)
  .then(() => console.log('DB Connection Successful for Seeder!'))
  .catch(err => {
    console.error('DB Connection Failed for Seeder:', err);
    process.exit(1);
  });


// Read JSON Data File
const menuitem = JSON.parse(
  fs.readFileSync('./_data/menuData.json', 'utf-8')
);

// Import Data into DB
const importData = async () => {
  try {
    // 1. Clear out any existing data first
    await MenuItem.deleteMany(); 
    
    // 2. Insert the new data
    await MenuItem.insertMany(menuitem);
    
    console.log('Data Successfully Imported!');
    process.exit();
  } catch (err) {
    console.error('Data Import Failed:', err);
    process.exit(1);
  }
};

// Delete All Data from DB
const deleteData = async () => {
  try {
    await MenuItem.deleteMany();
    console.log('Data Successfully Destroyed!');
    process.exit();
  } catch (err) {
    console.error('Data Destruction Failed:', err);
    process.exit(1);
  }
};

// Check Command Line Arguments to determine action
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--destroy') {
  deleteData();
} else {
    console.log("Usage: node seeder.js --import OR node seeder.js --destroy");
    process.exit(1);
}