//funcition for adding the tasks inside the user and the database
import mongoose from "mongoose";
import taskModel from "../models/task.model.js";



export const addTask=async(req, res)=>{
    //destructure the elements form the things 
    const {title,status,startDate,endDate}=req.body;
    const userId=req.user._id;
    //insert the task inside the db
    try {
        //create a new taks with a user ref
        const newTask= await taskModel.create(
        {
            title,
            status,
            startDate,
            endDate,
            userId
        }
        );
        //save the task inside the collection
        await newTask.save();

       return res.status(201).json({message:'Task Sucessfully created in database'});
    }

    catch (error) {
        console.log('An error occured while adding tasks',error);

        return res.status(500).json({message:'internal server Error'});

        }




}
//hello there how are you
export const getTasks=async(req,res)=>{

    const userId=req.params.userId;

    let tasks;
    

    try {

    tasks=await taskModel.find({userId:userId});

    return res.status(200).json(tasks);
        
    } 
    
    catch (error) {
        console.log('Must be an error fetching the tasks controller',error);
        return res.status(500).json({message:'Internal Server Error'});
    }
}
//function to delwte Tasks

export const deleteTask=async(req,res)=>{

    const taskId=req.params.taskId;
    const objectIdTaskId = new mongoose.Types.ObjectId(taskId);
    console.log('the task Id recieved is',objectIdTaskId);

    try {

        const deleteResult = await taskModel.deleteOne({_id:objectIdTaskId });
        
        if(deleteResult.acknowledged==true&& deleteResult.deletedCount===1)
        {
            return res.status(200).json({message:' Task sucessfully deleted '});

        }

        else{
            return res.status(404).json({message:'Tasks Not found'});
        }
        
    } 

    catch (error)
     {
        console.log('Erro in backend delte taks controller,',error);
        return res.status(500).json({message:'INernal server Error'});

        
    }

}