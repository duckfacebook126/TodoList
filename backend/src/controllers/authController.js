import userModel from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs"

import { generateToken } from "../lib/jwt.js";

export const userSignup=async(req,res)=>{

    const {email,firstName,lastName,password}=req.body;
    const userEmail=email;
    try{
            //fisrt check if there is any other user present with the same email inside the database
    //if yes then return that the email is taken please try a new email
    //if there is no matching user just hash the password  before toring it inside the database
    //  the insert a new row inside the database of the user containg all the imformation


        if(!email||!firstName ||!lastName||!password)
        {
            return res.status(400).json({message:"All fileds are required"});
        }


        if(password.length<6)
        {
            return res.status(400).json({message:"Password must be greater than 6 characters"})
        }

        const findUserByEmail=await userModel.findOne({email});
        
        if(findUserByEmail)
        {
           return res.status(400).json({message:"This email is already taken please try a new one"}) 
        }

        //use bcrpyt here for hashing if the email is not unique       

        const salt =await bcrypt.genSalt(10);

        const hashedPassword=await bcrypt.hash(password,salt);

        //now store the hashed password, and all the details in the database
        const newUser =new userModel({email:email,firstName:firstName,lastName:lastName,password:hashedPassword});
        // and save the userin the db
        await newUser.save();

        if(newUser)
        {


            generateToken(newUser._id,res);


        return res.status(201).json({message:"New User has been inserted in the database",
            userId:newUser._id,
            firstName:newUser.firstName,
            lastName:newUser.lastName,
            profilePic:newUser.profilePic

        });
        //returns the user details


        }

        else{
            return res.status(400).json({message:"Invalid Userdata"});
        }
    
        

    }

    catch(error)

    {
        console.log("Error inside the backend controller signup function:",error);
    return res.status(500).json({message:'Internal Server Error'});

    }




}




export const userLogin=(req,res)=>{
    res.status(200).json({message:"helo there from the userLogin"});
}