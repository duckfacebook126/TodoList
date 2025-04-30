import React, { useEffect,useState, useRef } from 'react'
import { LogOut } from 'lucide-react';
import { Menu } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { authStore } from '../store/authStore';
import Sidebar from './sidebar';

const Navbar = () => {


const {logout}=authStore();
//show the Side bar boolean
const [showSideBar, setShowSideBar]=useState(false);
//for tracking sidebar Menu clicks
const[sidebarClickMenu,setSidebarClickMenu]=useState(1);

const handleMenuClickCounter = () => {
  if (sidebarClickMenu === 1) {
    setSidebarClickMenu(0); // Corrected: Call the function with the new value
  } else if (sidebarClickMenu === 0) {
    setSidebarClickMenu(1); // Corrected: Call the function with the new value
  }
};

//menu clicking behaviour for sidebar
const handleMenuClick=()=>
{
  handleMenuClickCounter();
  toggleVisibility();
}


//set use ref for the side bar visibility
const sidebarRef=useRef(null);

useEffect(() => {
  console.log("Navbar Mounted");
    
}, []);


//for toggling the visiblity of the sidebar
const toggleVisibility=()=>{
setShowSideBar(!showSideBar);
}

  return (
    <>
  
  {/* Sidebar Component TO be shown or hidden */}
<div ref={sidebarRef} className={`fixed top-[88px] left-0 h-full w-64 bg-base shadow-md z-60 transition-transform duration-200 ${showSideBar&&sidebarClickMenu===0? 'translate-x-0': '-translate-x-full'}`}>
<Sidebar>

</Sidebar>
</div>

{/* Main navbar  Component */}
<div className="navbar bg-secondary shadow-sm">
  <div className="flex justify-between items-center w-full p-4">
    {/* Side bar Button On the Left */}
    <button className="ml-0 btn btn-base" onClick={handleMenuClick}>
      <Menu />
    </button>
  

    {/* Logout Button on the EXTREME Right */}
    <div className='flex item-center gap-3'>
        
    {/*Profile Page Button */}
    <button className='btn btn-base'>
      <CircleUserRound className="size-6" />
    </button>

      <button className="btn btn-base flex items-center" onClick={logout}>
       <LogOut />
       <p>Logout</p>  
      </button>
    </div>

  </div>
</div>
</>
  )
}

export default Navbar;