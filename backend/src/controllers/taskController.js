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
//function to get all the tasks in the database
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
//function to delete Tasks by taks Id

export const deleteTask=async(req,res)=>{
//get the taks id from the parameters
    const taskId=req.params.taskId;
    //convert the id into object type
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
//function to edit the task by id
export const editTask=async(req,res)=>{
//get the task from the path params
    const taskId=req.params.taskId;
    //get the attributees from the  req body
    const{ title,status,endDate,startDate}=req.body;
    const objTaskId=new mongoose.Types.ObjectId(taskId);

    try
    {
        //find if the task is present by searching its id
        const isTaskExist= await taskModel.findOne({_id:objTaskId});
        // if the taks exist then perform edit action on the taask
        if(isTaskExist!==null)
        {
            const editTaskResult= await taskModel.updateOne({_id:objTaskId},{$set:{startDate:startDate,endDate:endDate,title:title,status:status}});
            return res.status(200).json({message:'Task updated successfully'});

        }

        return res.status(404).json({message:'Task not found'});
    }
    catch(error){
        console.log('The error inside the backend edit task controller',error);
        return res.status(500).json({message:'Internal server Error'});
    }
    


}