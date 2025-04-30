import React, { useEffect } from 'react'
import { useTaskStore } from '../store/taskStore'
import { authStore } from '../store/authStore';
const ProgressReport = () => {

    const {tasks,fetchTasks,isEditFormOpen,isAddFormOpen,isDeleteDialogOpen}=useTaskStore();
    const {authUser}=authStore();
    //wil rerender on every update edit delete and addition method and ftech the updated Tasks

    useEffect(()=>{fetchTasks(authUser.userId);},[fetchTasks,isAddFormOpen,isDeleteDialogOpen,isEditFormOpen]);
    let completedTasks=0
    let remainingTasks=0
    let onGoingTasks=0
    tasks.forEach((task,index)=>{
        if(task.status==='Done')
        {

        completedTasks++;

        }

        else if(task.status==='To Do')
        {
            remainingTasks++;
        }
        
        else if(task.status==='In Progress')
            {
                onGoingTasks++;
            }
        
        

    });

    console.log('counted completed tasks are',completedTasks);




    

  return (
    // Main grid that will contain the cards
    <div className='grid-cols-4'>
        {/* Tasks comlpeted  */}
        <div className='col-span-1'>
            <div className='card card-xl bg-base-100 w-96 shadow-sm'>
                <div className='card-body'>
                    <div className='flex flex-col justify-center items-center'>
                    <p className='text'>Total Completed Tasks</p>
                    <p className='text text-6xl text-blue-700'>{completedTasks}</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Tasks in Progress*/}
        <div className='col-span-1'>

        </div>     

        {/* Tasks in Remaining*/}
        <div className='col-span-1'>

        </div>        


    </div>
  )
}

export default ProgressReport