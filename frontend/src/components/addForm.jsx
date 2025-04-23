import React, { useEffect } from 'react'
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { isBefore } from 'date-fns';
import { useTaskStore } from '../store/taskStore';

const AddForm = () => {

const {closeAddForm,addTask}=useTaskStore();
 // create a Scheme Object from zod
 const addTaskSchema = z.object({
  startDate: z
    .string()
    .nonempty('Start date is required')
    .transform(val => new Date(val)),

  endDate: z
    .string()
    .nonempty('End date is required')
    .transform(val => new Date(val)),

  status: z
    .string()
    .nonempty('Status is required'),

  title: z
    .string()
    .nonempty('Title is required')
    .min(5, 'The minimum length should be 5 characters')
    .max(20, 'The maximum length should be 20 characters'),

  
})


  //destructure the form functions from the rhf

 const {
    register,
    handleSubmit,
    formState: { errors },watch
  } = useForm({
    resolver: zodResolver(addTaskSchema),
    mode:"onBlur",
    criteriaMode: "firstError"

  });



  //custom onusubmit function
  const onSubmit=async(data)=>{

    try {
      await addTask(data);
    } catch (error) {
    }

  }
//track the zod schema start dat date to fit in min of actul form start date filed 
const startDate=watch("startDate");

///retunrning the form in jsx
  return (
<>
 <div className='flex flex-col items-center'>
    <form className='gap-2' onSubmit={handleSubmit(onSubmit)} >

        {/* title input field */}
      <div className='form-control'>
        <label className='label text-primary'>Enter the task Title</label>
        <input type="textarea"
         className='input focus:outline-none border-full  border-primary'
         {...register("title")}
        />
      </div>

      {/* title Error */}
      <div style={{ minHeight: '20px' }}>
      {errors.title&& <p className='text-error text-xs'>{errors.title.message}</p>}
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

         {/* start Date field */}
       <div className='form-control'>
        <label className=' label text-primary'>Select Start Date</label>
        <input 
        type="date"
        className='date border-full border-primary input w-full  focus:ring-0 appearance-none '
        {...register("startDate")}
        style={{
                outline: 'none',
                boxShadow: 'none'
        }}       
         />
       </div>

      {/* startDate Error */}
      <div style={{ minHeight: '20px' }}>
      {errors.startDate&& <p className='text-error text-xs'>{errors.startDate.message}</p>}
      </div>

          {/* End Date field */}
        <div className='form-control'>
          <label className=' label text-primary'>Select End Date</label>
          <input 
          type="date"
          className='date border-full border-primary input w-full focus:ring-0 appearance-none '
          {...register("endDate")}
          min={startDate || ""}

          style={{
                  outline: 'none',
                  boxShadow: 'none'
          }}       
         />
      </div>

      {/* EndDate Error */}
      <div style={{ minHeight: '20px' }}>
      {errors.endDate&& <p className='text-error text-xs'>{errors.endDate.message}</p>}
      </div>

      <div className='form-control w-full flex justify-between'>
        <button className='btn btn-white text-primary'onClick={closeAddForm} type='button'>
          Close 
        </button>
              
        <button type="submit" className='btn  btn-primary'>
          Add
        </button>

      </div>

      
    </form>
 </div>
   

    </>
  )
}

export default AddForm;