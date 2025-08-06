import cors from "cors";
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dbconnect from './config/db.js';
import authroutes from './routes/authroutes.js';
import crudroutes from './routes/crudroutes.js';


//const cors = require("cors");
const app=express();

app.use(cors({
  origin: 'https://my-frontend-hz1a.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // <--- must explicitly allow Authorization
  credentials: true // okay to keep if you ever use cookies; harmless for bearer tokens
}));

// If you want an explicit preflight handler (optional, but correct path wildcard):
app.options('/*', cors({
  origin: 'https://my-frontend-hz1a.vercel.app',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
dotenv.config();
dbconnect();
//routes files
app.use('/api/v1/auth',authroutes);
app.use('/api/v1/crud',crudroutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));