import React from 'react'
import Navbar from '../components/navbar'
import { sidebarStore } from '../store/sidebarStore'
import TaskPage from './taksPage';
import ProgressReport from './ProgressReport';
const HomePage = () => {
// get the current state of the selected Sidebar elements
const {selectedSidebarItem,setSelectedSidebarItem}=sidebarStore();


const navBarHeight='88px';
  return (
    <> 
    <div className=' h-screen'>
        <Navbar/>
        <div className="flex bg-white  w-screen  items-center justify-center "
          style={{height:`calc(100vh - ${navBarHeight})`}}>

            {(selectedSidebarItem==='Tasks'||selectedSidebarItem===null)&&

            <TaskPage/>
            
            }



            {selectedSidebarItem==='Progress Report'&&
            <ProgressReport></ProgressReport>
            }



        </div>

    </div>
    </>
  )
}

export default HomePage