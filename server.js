import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; 
import menuRoutes from './routes/menuRoutes.js'; 
import authRoutes from './routes/authRoutes.js';
import tableRoutes from './routes/tableRoutes.js'; 

dotenv.config();
connectDB(); 

const app = express();

// 1. SIMPLIFIED CORS: Allow everyone. This fixes the "403" from the code side.
app.use(cors()); 

app.use(express.json());

// 2. REQUEST LOGGER: This proves if the request actually reaches YOUR server.
app.use((req, res, next) => {
    console.log(`➡️  HIT RECEIVED: ${req.method} ${req.originalUrl}`);
    next();
});

app.use('/api/v1/menu', menuRoutes); 
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tables', tableRoutes);

// 3. HARDCODED PORT: Ignore .env for now to guarantee we use 5001.
const PORT = 5001; 

app.listen(PORT, () => {
  console.log(`✅  Server is ABSOLUTELY running on port ${PORT}`);
});