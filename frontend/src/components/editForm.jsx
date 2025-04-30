import React, { useEffect } from 'react'
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTaskStore } from '../store/taskStore';
import { isBefore, format } from 'date-fns';
import { addTask } from '../../../backend/src/controllers/taskController';
const EditForm = () => {

    const {isEditFormOpen,editTask,selectedTask,closeEditForm}=useTaskStore();


  

// initialize zod schema

const editTaskSchema=z.object(
    {
        startDate:z
        .string()
        .nonempty('Start date is required')
        .transform(val=>new Date(val)),

        endDate:z
        .string()
        .nonempty('End date is required')
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
      const taskId=selectedTask._id;
      await editTask(data,taskId);
      closeEditForm();
    } catch (error) {
      console.log('error  in onsubmit editpage function',error);
    }

  } 


  const editTaskData={}
//will set the selected Task State on each render
const formatDateYYYYMMDD=(date)=>{
  if(date instanceof Date)
  {
    return format(date, 'yyyy-MM-dd');

  }
    else {
      console.log(' tthe input is not a date object');
      return null;
    }

}


//convert the date into the format the form can read and then prefill using the reset function
  useEffect(()=>{
    if(selectedTask)
    {

      const formattedStartDate=formatDateYYYYMMDD(new Date(selectedTask.startDate));
      const formattedEndDate=formatDateYYYYMMDD(new Date(selectedTask.endDate));
      console.log('fomated satrt date is',formattedStartDate);
      console.log('formattted End date is',formattedEndDate);

      reset(
        {
          ...selectedTask,
          startDate:formattedStartDate,
          endDate:formattedEndDate
        }
      );
      console.log("Form values after reset:", watch()); // Log the entire form state

    }
  },[reset,selectedTask,watch]);

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
           
            
            className='input border-full input w-full border-primary  '
            style={{
                outline: 'none',
                boxShadow: 'none'
                }} 
                
            {...register('startDate')}
            >
                
            </input>
        </div>

        {/* start date errors */}

        <div style={{minHeight:'20px'}}>{errors.startDate&& <p className='text-error text-xs'>{errors.startDate.message}</p>}</div>

        {/* endDate */}

        <div className='form-control'>
            <label className='label text-primary'>End Date</label>
            <input 
            type="date"
           
            
            className='input border-full input w-full border-primary  '
            style={{
                outline: 'none',
                boxShadow: 'none'
                }} 
                
            {...register('endDate')}

            min={startDate}
            >
                
            </input>
        </div>

        {/* end date errors */}

        <div style={{minHeight:'20px'}}>{errors.endDate&& <p className='text-error text-xs'>{errors.endDate.message}</p>}</div>

          {/* form Buttons */}
        <div className='form-control w-full flex justify-between'>
        <button className='btn btn-white text-primary'onClick={closeEditForm} type='button'>
          Close 
        </button>
              
        <button type="submit" className='btn  btn-primary'>
          Save
        </button>

      </div>


            </form>
        </div>




 

    </>
  )
}

export default EditForm;