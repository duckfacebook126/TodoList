
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config();


export const generateToken=async(userId,res)=>{
    //signing the jwt token
    const token=jwt.sign({userId},process.env.JWT_SECRET,
        {
            expiresIn:"7d"
            
        });



        //returning the jwt token inside the response object
        res.cookie("jwt",token,{
            maxAge:7*24*60*60*1000,
            httpOnly:true,
            secure: true, // HTTPS-only in production
            sameSite: "strict"

        });

        return token;
}