import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";

export const isAuthenticated = async (req,res,next)=>{

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({
            success:false,
            message:"Token Not Found or Invalid Token"
        });
    }

    jwt.verify(token,process.env.JWT_SECRET, async (err,user) =>{

        if(err) return next(new ErrorHandler("Token Not Found",403));
        
        console.log(user)
        req.user =  await User.findById(user._id);
        next();

    });

}