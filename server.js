import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import dbconnect from './config/db.js';
import authroutes from './routes/authroutes.js';
import crudroutes from './routes/crudroutes.js';

dotenv.config();
const app = express();

// ✅ CORS configuration
const corsOptions = {
  origin: 'https://my-frontend-hz1a.vercel.app', // your frontend origin
  credentials: true, // allow credentials like Authorization header
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // ✅ handle preflight requests

// ✅ Body parser
app.use(express.json());

// ✅ Connect DB
dbconnect();

// ✅ Routes
app.use('/api/v1/auth', authroutes);
app.use('/api/v1/crud', crudroutes);

// ✅ Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));