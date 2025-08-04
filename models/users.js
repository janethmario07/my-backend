import mongoose from 'mongoose';
const userschema=new mongoose.Schema({
    name:{type:String,default:null},
    username:{type:String,default:null},
    email:{type:String,default:null},
    designation:{type:String,default:null},
    company:{type:String,default:null},
    state:{type:String,default:null},
    city:{type:String,default:null},
    password:{type:String,default:null}
});

export const users=mongoose.model('users',userschema);