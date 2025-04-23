import React from 'react'
import { CirclePlus } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import { useEffect } from 'react';
import AddForm from '../components/addForm';
import TasksTable from '../components/tasksTable';
import EditForm from '../components/editForm';
import { authStore } from '../store/authStore';
const TaskPage = () =>  {

  const {authUser}=authStore();
  const userId=authUser.userId;
  //get the taks state from the zustand store
const{openAddForm,isAddFormOpen,isEditFormOpen,isDeleteDialogOpen,closeAddForm,tasks,fetchTasks, openEditForm,closeEditForm}=useTaskStore();
//open add form whne it is true thesee elements will be shown


// will fetch all the tasks on first time loading and also fetchees alll the tasks on update and deltes
const updateTable=async()=>
{
  await fetchTasks(userId);
}

  useEffect(()=>{
    updateTable();
  },[isAddFormOpen,isDeleteDialogOpen,isEditFormOpen]);

  return (
  <>
  {/* Full Parent column with Tasks Table and the Table and adding the Taks Modal */}
    <div className={`w-full h-full flex flex-col items-center  mt-[298px] gap-y-3`}>

      {/* The modal that will open when Clicking on the add AddTasks Button */}
      <dialog className={`modal  ${isAddFormOpen?'modal-open z-35':''}`} >
        {/* Modal box containing the form and actions */}
        <div className='modal-box  w-100 h-110 relative'>

          {/* Modal form to Add taks here */}
          
          <AddForm/>

          <div className='modal-actions'>
          </div>
        </div>


      </dialog>


        {/* The modal that will open when Clicking on the Edit Button on the table */}
      <dialog className={`modal  ${isEditFormOpen?'modal-open z-35':''}`} >
        {/* Modal box containing the form and actions */}
        <div className='modal-box  w-100 h-110 relative'>

          {/* Modal form to Add taks here */}
          
            <EditForm/>
          <div className='modal-actions'>
          </div>
        </div>

        
      </dialog>

      


        

      {/* Add button to add the tasks */}

      <div className='text-3xl text-primary'>
               Add New Tasks
      </div>
      {/* addtasks Buton */}
      <button className="btn btn-primary " onClick={openAddForm}>
        <CirclePlus className='size-7'/>
      </button>  
          {/* Taks Table */}
        {tasks&&tasks.length>0?(
      <div>
        <TasksTable/>
      </div>
        ):
        (
        <>
        Tasks not Loaded yet
        </>
        )
        }

    </div>


  </>
  );
}

export default TaskPage;