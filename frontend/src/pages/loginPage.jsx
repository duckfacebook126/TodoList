import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { authStore } from '../store/authStore';
import { MessageSquare ,Mail,Lock, Eye, EyeOff, Loader2} from 'lucide-react';
import { User } from 'lucide-react';
import { Link,useNavigate } from 'react-router-dom';
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


// Add this CSS to hide browser's default password toggle
const hidePasswordToggleStyle = `
  input[type="password"]::-ms-reveal,
  input[type="password"]::-ms-clear {
    display: none;
  }

  input[type="password"]::-webkit-contacts-auto-fill-button,
  input[type="password"]::-webkit-credentials-auto-fill-button,
  input[type="password"]::-webkit-strong-password-auto-fill-button,
  input[type="password"]::-webkit-text-security-disc-button,
  input[type="password"]::-webkit-inner-spin-button,
  input[type="password"]::-webkit-caps-lock-indicator,
  input[type="password"]::-webkit-search-cancel-button {
    display: none !important;
    pointer-events: none !important;
    visibility: hidden !important;
  }
`;
const LoginPage = () => {


  const navigate=useNavigate();

  // create a Scheme Object from zod
  const loginSchema = z.object({


    email: z
      .string()
      .email("Invalid email format"),
  
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password must be at most 12 characters")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"), // Ensures at least one special char
  });
  
  //destructure the form functions from the 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode:"onBlur"
  });


  const [showPassword,setShowPassword] = useState(false);

//state from the zustand library imported for signing up and signedup
  const {login,isSigningUp,isLoggedIn,isLoggingIn}=authStore.getState();

  //custom onusubmit function
  const onSubmit=async(data)=>{

    try {
      await login(data);

      console.log("Successfully  logged Up");
      navigate('/');

      
    } 

    catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage); 
      console.log('Signupp Failed',error)
    }
  }




useEffect(()=>{
  console.log("This runs oonce  the component mounts");
},[]);


  return (
    <>
   {/* added thsi to turn of the browsers auto eye and off button */}
   <style>{hidePasswordToggleStyle}</style>

<div 
  className="h-screen flex items-center justify-center bg-cover bg-center"
  style={{ backgroundImage: "url('/mbl-head-office.jpg')" }}
>
  {/* Login Flex Row */}
  <div className="h-130 w-200 flex flex-row gap-0 bg-white/73 p-4 rounded-lg shadow-lg">

    {/* Left Side (Meezan Bank Logo) */}
    <div className="w-1/2  p-4 flex items-center justify-center">
      <img src="/MeezanBankLogo.png" alt="Logo" />
    </div>

    {/* Right Side (Login Form) */}
    <div className="w-1/2 border-3 border-white/73  rounded-2xl flex-col bg-white">

            {/* Signup Form */}
      <form className="space-y-3 p-3"onSubmit={handleSubmit(onSubmit)} >

                {/* Email Field */}
        <div className="form-control gap-5 ">

          <label className="lablel ">
            <span className="label-text font-medium font text-primary">Enter Your Email</span>
          </label>

          <div className="relative flex items-center">
              <Mail className="absolute left-3 size-6 text-primary z-10"/>
            <input 
                  type="text"
                  className="mt-1 input input-bordered w-full pl-10 z-9 border-primary border-3 focus:outline-none"
                  placeholder="John@gmail.com"
                  {...register("email")}

                   />
                   

          </div>
          {errors.email&& <p className='text-error text-xs'>{errors.email.message}</p>}

        </div>
                {/* Password Field */}
        <div className="form-control gap-5 ">

          <label className="lablel ">
            <span className="label-text font-medium font text-primary">Enter Your Password</span>
          </label>

          <div className="relative flex items-center">

              <Lock className="absolute left-3 size-6 text-primary z-10"/>

            <div className="relative w-full ">

              <input 
                  type={showPassword?"text":"password"}
                  className="mt-1 input input-bordered w-full pl-10 z-9 border-primary border-3 focus:outline-none"
                  placeholder="**************"
                  {...register("password")}

                   />
            </div>
            <button
                type="button"
                className="absolute right-3 z-10 text-primary appearance-none"
                onClick={()=>setShowPassword(!showPassword)}
                style={{
                  WebkitTextSecurity: showPassword ? "none" : "disc",
                  MozTextSecurity: showPassword ? "none" : "disc",
                }}
                   >
                {showPassword?(
                <Eye className="size-5 text-primary"/>

                ):<EyeOff className="size-5 text-primary"/>}

            </button>

                   

          </div>
          {errors.password&& <p className='text-error text-xs'>{errors.password.message}</p>}

        </div>
          {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full " disabled={ isLoggingIn}>

        {isSigningUp ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : (
                  "Login"
                )}  

        </button>      

      </form>

      <div className="text-center">
            <p className="text-base-content/60">
            Don't have an Account?{" "}
            <Link to="/signup" className="link link-primary">
            Sign up Here
            </Link>
            
            </p>

          </div>  

    </div>

  </div>
</div>


    </>
  )
}

export default LoginPage