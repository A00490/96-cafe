import mongoose from 'mongoose';
import dotenv from 'dotenv'; // We import dotenv here just to be safe, though usually loaded in server.js

dotenv.config(); // Ensure environment variables are loaded if this file is run independently

const connectDB = async () => {
  try {
    // Attempt to connect using the URI we set up in the .env file
    const conn = await mongoose.connect(process.env.MONGODB_URI); 

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Exit process with failure
    process.exit(1); 
  }
};

export default connectDB;