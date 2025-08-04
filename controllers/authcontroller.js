import {users} from '../models/users.js';
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const login=async(req,res)=>{
    try{
       const {username,password}=req.body;
       if(!username || !password){
            return res.status(400).json({success:'failure',message:"name and password must required"})
       }
       const userrec=await users.findOne({ email:username });
      
       const passwdstatus=await bcryptjs.compare(password,userrec.password);
       if(passwdstatus==false){
        return res.status(401).json({success:"failure",message:"Enter correct password"});
       }
       const token=jwt.sign({id:userrec._id,username:userrec.username,name:userrec.name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES});
        res.status(200).json({ success: 'success', message: "Login successful", token,user:userrec });
    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ success: 'failure', message: "Server error" });
    }
}   

export const signup=async(req,res)=>{
    const {name,password,email,designation,company,state,city}=req.body;
     const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const hashpassword=await bcryptjs.hash(password,10);    console.log(name,hashpassword)

    const createUser=new users({
        "name":name,
        "password":hashpassword,
        "email":email,
        "designation":designation,
        "company":company,
        "state":state,
        "city":city
    });
    const saveuser=createUser.save().then(()=>{console.log("created succssfully");}).catch((err)=>{console.log("error:",err)})
        return res.status(201).json({success:"success",message:"User Created Succesfully"});
}

