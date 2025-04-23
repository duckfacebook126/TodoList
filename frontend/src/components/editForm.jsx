import React, { useEffect } from 'react'
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isBefore } from 'date-fns';
import { useTaskStore } from '../store/taskStore';

const EditForm = () => {

    const {isEditFormOpen,editTask,selectedTask}=useTaskStore();




// initialize zod schema

const editTaskSchema=z.object(
    {
        startDate:z
        .string()
        .transform(val=>new Date(val)),

        endDate:z
        .string()
        .transform(val=>new Date(val)),

        status:z.
        string()
        .nonempty('Status is required'),

        title:z
        .string()
        .min(5,'The title must be min 5 characters')
        .max(20,'THe string must be maximum 20 characters')



    }

    
  
);

//destructure the form functions from the rhf

const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  }
  
  = useForm({
    resolver: zodResolver(editTaskSchema),
    mode:"onBlur",
    criteriaMode: "firstError"

  });
//custom on submit funcition
  const onSubmit=async(data)=>{

    try {
      await editTask(data);
    } catch (error) {
    }

  } 

//will set the selected Task State on each render
  useEffect(()=>{
    reset(selectedTask);
  },[selectedTask,reset]);

  //tracking start date to be used as miin and max slkeider inside the form field
  const startDate=watch("startDate");

  return (
    <>


        <div className='flex flex-col items-center'>
            <form className='gap-2' onSubmit={handleSubmit(onSubmit)}>

                {/* title input filed */}
                <div className='form-control'>
                    <label className='label text-primary'>Change the title</label>
                    <input type="textarea"
                    className='border-full input focus:outline-none border-full border-primary '
                    {...register("title")}
                    >

                    </input>
                </div>
                {/* title error */}
                <div style={{minHeight:'20px'}}>
                    {errors.title&&<p className='text-error text-xs'>{errors.title.message}</p>}
                </div>
                 {/* task status field */}
                <div className='form-control'>
                    <label className=' label text-primary'>Select Task Status</label>
                    <select className='select select-bordered w-full input focus:outline-none border-primary'
                    {...register("status")}
        >
          <option value="">Select Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
       </div>

           {/*Status Error */}
       <div style={{ minHeight: '20px' }}>
        {errors.status&& <p className='text-error text-xs'>{errors.status.message}</p>}
       </div>

        {/* start Date */}

        <div className='form-control'>
            <label className='label text-primary'>Start Date</label>
            <input 
            type="date"
            className='date border-full input w-full border-primary  '
            style={{
                outline: 'none',
                boxShadow: 'none'
                }} 
                
            {...register('startDate')}
            >
                
            </input>
        </div>

            </form>
        </div>




 

    </>
  )
}

export default EditForm;