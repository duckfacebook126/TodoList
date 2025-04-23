import mongoose from "mongoose";
import userModel from "./user.model.js";
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

}
,{timestamps:true});
//creating the task Schema
const taskModel=mongoose.model("taskModel",taskSchema);
//creating the task model
export default taskModel; 