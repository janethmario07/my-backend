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
  origin: 'https://my-frontend-hz1a.vercel.app', // your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true // ✅ allow credentials (cookies or Authorization headers)
}));

// Optional but safe to include to handle preflight requests
app.options('/', cors({
  origin: 'https://my-frontend-hz1a.vercel.app',
  credentials: true
}));;

app.use(express.json());
dotenv.config();
dbconnect();
//routes files
app.use('/api/v1/auth',authroutes);
app.use('/api/v1/crud',crudroutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));