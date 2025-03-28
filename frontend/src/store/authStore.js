import  { createStore } from "zustand"
import toast from "react-hot-toast";
const baseURL="http://localhost:5006";
import { axiosInstance } from "../lib/axios";

    export const authStore= createStore((set,get)=>({

            authUser:null,
            isSigningup:false,  
            isLoggingIn: false,
            isUpdatingProfile: false,
            isCheckingAuth: true,

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
                    
                } 

                catch (error) {

                    console.log("Error caught from signup Frontend",error);
                    const errorMessage=error.response.data.message;
                    toast.error(errorMessage);

                    
                }

                finally{

                    set({isSigningup:false});
                }
            }


    }));