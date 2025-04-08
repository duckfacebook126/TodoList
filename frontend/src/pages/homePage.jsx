import React from 'react'
import Navbar from '../components/navbar'
import { sidebarStore } from '../store/sidebarStore'
const HomePage = () => {
// get the current state of the selected Sidebar elements
const {selectedSidebarItem,setSelectedSidebarItem}=sidebarStore();
const navBarHeight='88px';
  return (
    <> 
    <div className=' h-screen'>
        <Navbar/>
        <div className="flex bg-white  w-screen border-4 items-center justify-center "
          style={{height:`calc(100vh - ${navBarHeight})`}}>

            {selectedSidebarItem==='Done'&&
            <p>Done Tasks Page</p>
            }

            {selectedSidebarItem==='ToDo'&&
            <p>ToDo Tasks Page</p>
            }

            {selectedSidebarItem==='Progress Report'&&
            <p>Progress Report Page</p>
            }

            {selectedSidebarItem==='In Progress'&&
            <p>In Progress Page</p>
            }

        </div>

    </div>
    </>
  )
}

export default HomePage