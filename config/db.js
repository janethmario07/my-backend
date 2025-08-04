import mongoose from 'mongoose';
const connectDb=async(req,res)=>{
    try{
        const conn=await mongoose.connect(process.env.MONGOOSEID);
         console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(err){
            console.error(`MongoDB Connection Error: ${err.message}`);
            process.exit(1);
    }
}

export default connectDb