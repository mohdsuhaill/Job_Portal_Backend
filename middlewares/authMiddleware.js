import jwt from "jsonwebtoken"
import { User } from "../models/userSchema.js"
import dotenv from "dotenv"
dotenv.config({})

const authMiddleware = async (req,res,next)=>{
    // const token = req.header('Authorization')
    const token =req.headers.authorization?.split(' ')[1]
    if(!token){
        return res.status(401).json({message:"token not Found"})
    }
    try {
         const decode = jwt.verify(token,process.env.SECRET_KEY)
         req.user = decode
         console.log("decode"+decode);
         console.log("req",req.user);
         console.log("req",req.user.userId);
         const user = await User.findById(req.user.userId)
         console.log("user"+user);
         if(!user){
            return res.status(401).json({message:"Access Denied"})
         }
         next()
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Invalid Token Internal Server Error"})
        
    }
}

export default authMiddleware;