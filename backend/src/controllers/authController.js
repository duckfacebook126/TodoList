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
        //returns the user detailsa after acount creation


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




export const userLogin=async (req,res)=>{


    try {
        const {email,password}=req.body;
       //now check if the user is present by cross checking the email
       
       const dbUser= await userModel.findOne({email});

       //if the user is present then check if the password is correct or not

       if(!dbUser)
       {
        return res.status(400).json("Invalid Credentials");
       }

       //now compare the enntered passowrd from the entered password

       const isPasswordCorrect= await bcrypt.compare(password,dbUser.password);
       //if passowr ddoes not matches
       if(!isPasswordCorrect)
        {
         return res.status(400).json("Invalid Credentials");
        }
       //if the password is correct then just  generate a jwt token for the user by using the user id

       const token =await generateToken(dbUser._id,res);
        // then just send the user as a response on successfull userlogin

       return res.status(200).json(
        {
            userId:dbUser._id,
            firstName:dbUser.firstName,
            lastName:dbUser.lastName,
            profilePic:dbUser.profilePic
        });
        
    }

     catch (error) {
        console.log("Something broke in the backend  origin login controller function",error);

        return res.status(500).json({message:"Internal Server Error"});

        
    }
}
//logout out function that will clear the cookies and log the user out
export const logout=async(req,res)=>{

    try {
     res.cookie("jwt","",{maxAge:0});
     
     return req.status(200).json("successfully Logged out from the client")
    }
    
    catch(error) {
        console.log("Error in backend logout function",error);
        return res.status(500).json("kInternal Server Error");
    }
}
