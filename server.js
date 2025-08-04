import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dbconnect from './config/db.js';
import authroutes from './routes/authroutes.js';
import crudroutes from './routes/crudroutes.js';
import cors from "cors";
//const cors = require("cors");
const app=express();

// Enable CORS
app.use(cors({
  origin: "https://my-frontend-hz1a.vercel.app/", // Allow frontend
  credentials: true               // Allow cookies if you're using them
}));
app.use(express.json());
dotenv.config();
dbconnect();
//routes files
app.use('/api/v1/auth',authroutes);
app.use('/api/v1/crud',crudroutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));