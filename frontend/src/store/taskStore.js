import { create} from "zustand";
import toast from "react-hot-toast";
//create the state forstoring and send the requesgt for the crud forms and request
import { axiosInstance } from "../lib/axios";
import { authStore } from "./authStore";

export const useTaskStore= create((set,get)=>(
    {
        //for opening an closing for dialogs and forms
        tasks:[],
        selectedTask:null,
        isAddFormOpen:false,
        isEditFormOpen:false,
        isDeleteDialogOpen:false,
        istTaskEdited:false,
        isTaskDeleted:false,
        isTaksAdded:false,
        //
    

        openAddForm:async()=>{set({isAddFormOpen:true})},
        closeAddForm:()=>{set({isAddFormOpen:false})},

        openEditForm:()=>{set({isEditFormOpen:true})},
        closeEditForm:()=>{set({isEditFormOpen:false})},

        openDeleteDialogBox:()=>{set({isDeleteDialogOpen:true})},
        closeDeleteDialogBox:()=>{
            console.log("closeDeleteDialogBox called");

            set({isDeleteDialogOpen:false})
        },


        setSelectedTask:(task)=>{

                set({selectedTask:task});
            },


        addTask:async(data)=>{
            try {
                const res = await axiosInstance.post(`/task/add`,data,{ withCredentials: true });
                if(res.status==201){
                    
                   set({isAddFormOpen:false});
                toast.success('Task created Succesfully');
                set({isTaksAdded:true});
                }
                
            } 

            catch (error)
             {
                const errorMessage =
                error?.response?.data?.message || error.message || "Something went wrong";
                toast.error(errorMessage);
          
            }
        },
        //this will fetch all the tasks from the databse for the authenticated user
        fetchTasks:async(userId)=>
        {

            try {

                const res= await axiosInstance.get(`task/getask/${userId}`);

                set({tasks:res.data});
            } 
            catch (error) {
                const errorMessage=error?.response?.data?.message;

                    console.log('Error Inside the zustand get Tasks call',errorMessage); 

                    toast.error('falied to fetch task data',errorMessage);

            }
        },
        //delete the tasks by their id
        deleteTask:async(taskId)=>{
            try {
                const res =await axiosInstance.delete(`task/deltask/${taskId}`);
                
                if (res.status===200)
                {
                    toast.success("Succesfully deleted the task");
                }
                else if(res.status==404){
                    toast.error("Task Not found");
                }
            
            } 
            
            catch (error) {
                console.log (error);
                const errorMessage=error.message;
                console.log('Error Inside the zustand delete Tasks call',errorMessage); 

                toast.error('falied to delete task data',errorMessage);
                
            }
        },
        //update the task data with the specific task id
        editTask:async(data,taskId)=>{
            try {
                
                const res =await axiosInstance.patch(`task/editask/${taskId}`,data);

                if (res.status==200)
                {
                    toast.success('Task Successifully Edited');
                }

  
            }
             catch (error)
            
             {
                toast.error('Erorr in Editing Task',error.message)
             }
        }



        
    }



));