import mongoose from "mongoose";
import userModel from "./user.model";
const taskSchema=mongoose.Schema({

userId:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"userModel"
},

endDate:{
    type:Date,
    required:true

},

startDate:{
    type:Date,
    required:true
},

status:{
    type:String,
    required:true
},

title:{
    type:String,
    required:true
}

});
//creating the task Schema
const taskModel=mongoose.Model("taskModel",taskSchema);
//creating the task model
export default taskModel; 