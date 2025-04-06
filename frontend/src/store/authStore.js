import  { createStore } from "zustand"
import {create} from "zustand"
import toast from "react-hot-toast";
const baseURL="http://localhost:5006";
import { axiosInstance } from "../lib/axios";
import{persist,createJSONStorage} from 'zustand/middleware'
    export const authStore= create(
        persist(
        (set,get)=>({

            authUser:null,
            isSigningup:false,  
            isLoggingIn: false,
            isUpdatingProfile: false,
            isCheckingAuth: true,
            isSignedUp:false,
            isLoggedIn:false,

            checkAuth:async()=>{
                try{
                const res= await axiosInstance.get("/auth/check");
                set({authUser:res.data});
                }

                catch(error)
                {    set({authUser:null});

                    console.log("Error in Authcheck",error);
                }


                finally{
                    set({isCheckingAuth: false});
                }

            },

           // Signup function forwardiin the signup requests from the front end page and recieving the responses from the backend

            signUp:async(data)=>{

                try {
                
                    set({isSigningup:true});

                    const userData =await axiosInstance.post("/auth/signup",data);
                    //if the data is null
                    if(!userData)
                    {

                    set({authUser:null});
                    
                    }
                    // if the data is present  then set the user as the data recieved from the backend with toaster success 
                    set({authUser:userData});
                    toast.success("Account Created Successfully");
                    set({isSignedUp:true});
                    
                } 

                catch (error) {

                    console.log("Error caught from signup Frontend",error.response.data.message);
                    const errorMessage=error.response.data.message;
                    toast.error(errorMessage);
                    throw error;


                    
                }

                finally{

                    set({isSigningup:false});
                }
            },

            login:async(data)=>{
                try {

                    set({isLoggingIn:true});
                    
                    const res =await axiosInstance.post("/auth/login",data);

                     set({authUser:res.data});

                     toast.success("Successfully Logged in");


                } 
                catch (error) {
                    console.log("Error in login zustand call",error.response.data);
                    const errorMessage=error.response.data;
                    toast.error(errorMessage);
                }

                finally{
                    set({isLoggingIn:false});

                }
            
            },

            logout:async()=>{
                try {

                    set({isLoggedIn:false});
                    
                    const res = await axiosInstance.post("/auth/logout");

                    set({authUser:null});

                    toast.success("ILogout Successfull");
                    }
                 catch (error)
                 {
                    console.log("Eror Logout Zustand Call",error);
                    toast.error(error.response.data);
                }
            }
            


    }
),

    {
        name: 'auth-storage', // Unique name for the storage key
        storage: createJSONStorage(() => sessionStorage), // Use sessionStorage
    }
));