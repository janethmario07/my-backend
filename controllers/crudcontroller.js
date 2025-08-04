import posts from "../models/Post.js";
import {users} from '../models/users.js';

export const create = async (req, res) => {
  const { content } = req.body;
  const userId = req.user.id;console.log(userId);  const name = req.user.name;console.log(req.user);
  if (!content) {
    return res.status(400).json({
      success: "failure",
      message: "Enter content",
    });
  }

  try {
    const newPost = new posts({ content,createdBy:userId,createdByName:name });
    await newPost.save(); 
    return res.status(201).json({
      success: "success",
      message: "Successfully created",
    });
  } catch (err) {
    console.error("Post creation error:", err.message);
    return res.status(500).json({
      success: "failure",
      message: "Failed to create post",
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await posts.find()
      .populate("createdAt", "createdBy") // show user name/email
      .sort({ createdAt: -1 });

    res.status(200).json(allPosts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts: " + err.message });
  }
};

export const update=async(req,res)=>{
    const {id}=req.params;
    const {content}=req.body;
try{
    const updaterec=await posts.findByIdAndUpdate(
        {_id:id},{content:content},{new:true})
        if(!updaterec){
            return req.status(400).json({success:"failure",message:"Post not found"});
        }
            return res.status(200).json({success:"success",message:"Post updated"});
    }catch(err){
  return res.status(400).json({success:"failure",err:err.message});
    }          



}


export const profileUpdate=async(req,res)=>{
      const {id}=req.params;
    const {name,email,designation,company,state,city}=req.body;


    const updaterec=await users.findByIdAndUpdate(
        {_id:id},
        {
        "name":name,      
        "email":email,
        "designation":designation,
        "company":company,
        "state":state,
        "city":city
      },{new:true})
        if(!updaterec){
            return req.status(400).json({success:"failure",message:"Profile not found"});
        }
            return res.status(200).json({success:"success",message:"Profile Data Updated",user:updaterec});


}

export const deleteRecord=async(req,res)=>{
    const {id}=req.params;
    const deletedata=await posts.findByIdAndDelete(id);
    if(!deletedata){
        return res.status(400).json('Post not found');
    }
    return res.status(200).json({success:"success",message:"Post deleted"})
}