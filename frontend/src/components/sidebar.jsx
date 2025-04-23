import React, { useEffect,useState } from 'react'
import { AlarmClockCheck } from 'lucide-react';//for to lsit
import { Loader } from 'lucide-react'; //for INprogress Tasks
import { CheckCheck } from 'lucide-react';//for completted tasks
import { sidebarStore } from '../store/sidebarStore';
const Sidebar = () => {

  //destructure the side element statate  and the setter from sideBar store
const {selectedSidebarItem,setSelectedSidebarItem}=sidebarStore();

//uesEfect Function
  useEffect(
    ()=>{
      console.log("Sidebar Mounted");
    },[]
  );


const SidebarItems=[
  'Tasks',
  'Progress Report'
];

  return (
    <div className="fixed bg-base left-0 h-full w-64 shadow-2xl items-center justify-center z-60 bg-white">
      <div className="flex flex-col ">
          <div className="flex item-center justify-center">
            <img src="/navbarlogo.png" alt="navbar-logo-supposed--be-here" />
          </div>

        {SidebarItems.map((item, index) => (
          <button
            key={index}

            className={`p-4 w-full text-left hover:bg-base-300 ${selectedSidebarItem===item?'border-r-4 border-primary bg-base-300':''}`
            }

            onClick={()=>{setSelectedSidebarItem(item)}}
          >


            {item}
          </button>
        ))}
      </div>
    </div>
  ) 
}

export default Sidebar