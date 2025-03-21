import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDb=async()=>{


    try {

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDb connected : ${conn.connection.host}`);
        
    } 
    
    catch (error) {

        console.log(`MongoDb connection Error ${error}`);
    }
    
}

//connection fuction for connection with the mongo db database