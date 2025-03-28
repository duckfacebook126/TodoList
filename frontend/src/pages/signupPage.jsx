import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { authStore } from '../store/authStore';
import { MessageSquare ,Mail,Lock, Eye, EyeOff, Loader2} from 'lucide-react';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const SignupPage = () => {

  // create a Scheme Object from zod
  const signupSchema = z.object({
    firstName: z
      .string()
      .max(12, "First name must be at most 12 characters")
      .regex(/^[A-Za-z]+$/, "First name must not contain numbers or special characters"),
  
    lastName: z
      .string()
      .max(12, "Last name must be at most 12 characters")
      .regex(/^[A-Za-z]+$/, "Last name must not contain numbers or special characters"),
  
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
  
  //destructure the form functions from the funtion
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });


  const [showPassword,setShowPassword] = useState(false);

//state from the zustand library imported for signing up and signedup
  const {signUp,isSigningUp}=authStore.getState();

  //custom onusubmit function
  const onSubmit=async(data)=>{

    try {
      await signUp(data);

      console.log("Successfully  Signed Up");
      
    } 

    catch (error) {
      const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
      toast.error(errorMessage); 
      console.log('Signupp Failed',error)
    }
  }




useEffect(()=>{},[]);

  return (
    <>
<div 
  className="h-screen flex items-center justify-center bg-cover bg-center"
  style={{ backgroundImage: "url('/mbl-head-office.jpg')" }}
>
  {/* Signup Flex Row */}
  <div className="h-130 w-200 flex flex-row gap-0 bg-white/73 p-4 rounded-lg shadow-lg">

    {/* Left Side (Meezan Bank Logo) */}
    <div className="w-1/2  p-4 flex items-center justify-center">
      <img src="/MeezanBankLogo.png" alt="Logo" />
    </div>

    {/* Right Side (Signup Form) */}
    <div className="w-1/2 border-3 border-white/73  rounded-2xl flex-col bg-white">

            {/* Signup Form */}
      <form className="space-y-3 p-3"onSubmit={handleSubmit(onSubmit)} >

        {/* first Name Field */}
        <div className="form-control gap-5 ">

          <label className="lablel ">
            <span className="label-text font-medium font text-primary">Enter First Name</span>
          </label>

          <div className="relative flex items-center">
              <User className="absolute left-3 size-6 text-primary z-10"/>
            <input 
                  type="text"
                  className="mt-1 input input-bordered w-full pl-10 z-9 border-primary border-3 focus:outline-none"
                  placeholder="John"
                  {...register("firstName")}

                   />
            {errors.firstName&& <p className='text-error'>{errors.firstName.message}</p>}

          </div>

        </div>

                {/* Last Name Field */}
        <div className="form-control gap-5 ">

          <label className="lablel ">
            <span className="label-text font-medium font text-primary">Enter Last Name</span>
          </label>

          <div className="relative flex items-center">
              <User className="absolute left-3 size-6 text-primary z-10"/>
            <input 
                  type="text"
                  className="mt-1 input input-bordered w-full pl-10 z-9 border-primary border-3 focus:outline-none"
                  placeholder=" Doe"
                  {...register("lastName")}

                   />
            {errors.lastName&& <p className='text-error'>{errors.lastName.message}</p>}
                   

          </div>

        </div>

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
            {errors.email&& <p className='text-error'>{errors.email.message}</p>}
                   

          </div>

        </div>
                {/* Password Field */}
        <div className="form-control gap-5 ">

          <label className="lablel ">
            <span className="label-text font-medium font text-primary">Enter Your Password</span>
          </label>

          <div className="relative flex items-center">

              <Lock className="absolute left-3 size-6 text-primary z-10"/>

            <div className="relative w-full overflow-hidden">

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

            {errors.password&& <p className='text-error'>{errors.password.message}</p>}
                   

          </div>

        </div>
          {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">Sign Up</button>      

      </form>

      <div className="text-center">
            <p className="text-base-content/60">
            Already have an Account?{" "}
            <Link to="/login" className="link link-primary">
            Log In Here
            </Link>
            
            </p>

          </div>  

    </div>

  </div>
</div>


    </>
  )
}

export default SignupPage