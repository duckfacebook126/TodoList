import React, { useState, useEffect } from 'react'
import { useTaskStore } from '../store/taskStore'
import { format } from 'date-fns';
import { Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { CheckCheck } from 'lucide-react';
import { Loader } from 'lucide-react';
import { CircleAlert } from 'lucide-react';
const TasksTable = () => {
    const {
        tasks,
        isAddFormOpen,
        isEditFormOpen,
        isDeleteDialogOpen,
        set,
        deleteTask,
        openDeleteDialogBox,
        closeDeleteDialogBox,
        openEditForm,
        closeEditForm,
        setSelectedTask
    } = useTaskStore();

    const [taskToDelete, setTaskToDelete] = useState(null);
    const [takstoEdit, setTasktoEdit] = useState(null);
    
 
    
    useEffect(() => {
    }, [isDeleteDialogOpen]);



    // handles the editing the specific tasks
    const editTaskHandler = (task) => {
        console.log('slected Task is:', task);
        openEditForm();
        setSelectedTask(task);
    }
    
    // sets the task id in the task table for setting up deletion
    const deleteTaskHandler = (task) => {
        openDeleteDialogBox();
        const taskId = task._id
        setTaskToDelete(taskId);
    }    

    // fires on deleteion of the clicking on the dialog deletion box
    const deleteTaskById = (taskToDelete) => {
        console.log('Slected taks toDelte is', taskToDelete);
        deleteTask(taskToDelete);
        closeDeleteDialogBox();
    }

    // will fire when the close button onn the delete dialog box will be clicked
    const closeDeleteDialog = () => {
        console.log('close delete dialog called');
        closeDeleteDialogBox();
        setTaskToDelete(null);
    }

//pagination algorithm 
   // Pagination state
   const [currentPage, setCurrentPage] = useState(1);
   //appearing the taks per Page
   const tasksPerPage = 5;
   
   // Calculate total pages
   const totalPages = Math.ceil(tasks.length / tasksPerPage);
   
   // will show the index of the last element on the current page
   const indexOfLastTask = currentPage * tasksPerPage;
   //will show the index of the the last element  to display on current page  
   const indexOfFirstTask = indexOfLastTask - tasksPerPage;
   //will initialize the custom tasks array like what to be do with the 
   const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
    // Pagination navigation handlers
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Go to specific page
    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };


    // Generate page buttons for the specific range
    const renderPageButtons = () => {
        const pageButtons = [];
        const maxVisibleButtons = 5; // Show at most 5 page buttons
        
        let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
        let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
        
        // Adjust if we're at the end
        if (endPage - startPage + 1 < maxVisibleButtons) {
            startPage = Math.max(1, endPage - maxVisibleButtons + 1);
        }
            
        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button 
                    key={i} 
                    className={`btn btn-sm ${currentPage === i ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => goToPage(i)}
                >
                    {i}
                </button>
            );
        }
        
        return pageButtons;
    };

    return (
        <>
            {/* Delete Dialog box */}
            <dialog className={`modal ${isDeleteDialogOpen ? 'modal-open z-35' : ''}`}>
                <div className='modal-box w-80 h-60 relative flex flex-col'>
                    <h3 className='text-primary font-bold text-2xl'>Delete</h3>
                    <p className='flex-grow'>Are you sure you want to delete this?</p>
                    
                    <div className='modal-actions flex items-center justify-between w-full'>
                        <button className='btn btn-base text-primary' onClick={closeDeleteDialog} type="button">Close</button>
                        <button className='btn btn-primary' onClick={() => { deleteTaskById(taskToDelete) }} type="button">Delete</button>
                    </div>
                </div>
            </dialog>
            
            <div className='overflow-x-auto rounded-box border border-base-content/5 bg-base-100 z-30'>
                <table className='table table-layout: auto'>
                    {/* table header */}
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    
                    {/* Table Body */}
                    <tbody>
                        {currentTasks.map((task, index) => {
                            const formattedStartDate = task.startDate ?
                                format(new Date(task.startDate), 'yyyy-MM-dd') : 'N/A';

                            const formattedEndDate = task.endDate ?
                                format(new Date(task.endDate), 'yyyy-MM-dd') : 'N/A';

                            return (
                                <tr key={index}>
                                    {/* row data */}
                                    <td>{task.title}</td>
                                    <td>{formattedStartDate}</td>
                                    <td>{formattedEndDate}</td>
                                    <td><div className='flex flex-row justify-start items-center gap-2 '>{task.status}{task.status=='Done'&&<CheckCheck color='blue'></CheckCheck> }{task.status=='In Progress'&&<Loader color='orange'></Loader>}{task.status=='To Do'&&<CircleAlert color='red'></CircleAlert>}</div></td>

                                    {/* edit button */}
                                    <td>
                                        <button 
                                            className='btn' 
                                            type="button"

                                            onClick={() => { editTaskHandler(task) }}
                                        >
                                            <Pencil className='size-5 text-primary'></Pencil>
                                        </button>     
                                    </td>
                                    
                                    {/* delete button */}
                                    <td>
                                        <button 
                                            className='btn' 
                                            type="button"

                                            onClick={() => { deleteTaskHandler(task) }}
                                        >
                                            <Trash2 className='size-5 text-error'></Trash2> 
                                        </button>     
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                
                {/* Pagination Controls */}
                {tasks.length > 0 && (
                    <div className="flex justify-center items-center p-4 space-x-2">
                        <button 
                            onClick={goToPrevPage} 
                            disabled={currentPage === 1}
                            className="btn btn-sm btn-ghost"
                        >
                            <ChevronLeft className="size-4" />
                        </button>
                        
                        {renderPageButtons()}
                        
                        <button 
                            onClick={goToNextPage} 
                            disabled={currentPage === totalPages}
                            className="btn btn-sm btn-ghost"
                        >
                            <ChevronRight className="size-4" />
                        </button>
                        
                        <span className="text-sm ml-2">
                            Page {currentPage} of {totalPages}
                        </span>
                    </div>
                )}
            </div>
        </>
    )
}

export default TasksTable