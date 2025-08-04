import express from "express"; 
import {signup,login} from "../controllers/authcontroller.js"
const router=express.Router();
//const {login,signup}=require('../controllers/authcontroller');

router.post('/login',login);
router.post('/signup',signup);

export default router