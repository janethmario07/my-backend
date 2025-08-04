import jwt from "jsonwebtoken";
export const protect=async(req,res,next)=>{
    const authheader=req.headers.authorization;
    if(authheader && authheader.startsWith("Bearer ")){
        const token=authheader.split(" ")[1];
        try {

        const verify=jwt.verify(token,process.env.JWT_SECRET);
            req.user=verify;
            next();
    }catch{
        return res.status(400).json({success:"failure",message:"invalid token"})
    }

    }else{
                return res.status(400).json({success:"failure",message:"No Token provided"})

    }


}