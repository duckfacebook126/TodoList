
import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

export const checkAuth=async(req,res,next)=>{
    try {
            
        const token=req.cookies.jwt;

        if(!token)
        {

            return res.status(400).json({message:"No token is provided"});

        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        if (!decoded)
        {
            return res.Status(400).json({message:"Invalid Token Provided"});
        }

        const currentUser= await userModel.findById(decoded.userId).select("-password");

        if(!currentUser)
        {
            return res.status(404).json({message:"User not found"});

        }

        req.user=currentUser;

        next();
        
    }
     catch (error) {
        console.log("Error in check Auth Middleware",error);
        return res.status(500).json({message:"Internal Server Error"});
        
    }


}
