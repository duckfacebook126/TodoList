import mongoose from "mongoose";

const userSchema=mongoose.Schema(
    {
        email:{
            type:String,
            unique:true,
            required:true
        },

        firstName:{
            type:String,
            required:true
        }
        ,
        lastName:{
            type:String,
            required:true
        },

        password:{
            type:String,
            required:true,
            minlength:6
        },

        profilePic:{
            type:String,
            required:false,
            default:""

        }
    },

    {timestamps:true}
);
//userSchema created for the documents and their attributes 
const userModel=mongoose.model("User",userSchema);
//user model
export default userModel;