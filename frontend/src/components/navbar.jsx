import React, { useEffect,useState, useRef } from 'react'
import { LogOut } from 'lucide-react';
import { Menu } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { authStore } from '../store/authStore';
import Sidebar from './sidebar';

const Navbar = () => {

const {logout}=authStore();
//show the Side bar
const [showSideBar, setShowSideBar]=useState(false);

const[sidebarClickMenu,setSidebarClickMenu]=useState(1);

const handleMenuClickCounter = () => {
  if (sidebarClickMenu === 1) {
    setSidebarClickMenu(0); // Corrected: Call the function with the new value
  } else if (sidebarClickMenu === 0) {
    setSidebarClickMenu(1); // Corrected: Call the function with the new value
  }
};


const handleMenuClick=()=>
{
  handleMenuClickCounter();
  toggleVisibility();
}


//set use ref for the side bar visibility
const sidebarRef=useRef(null);

useEffect(() => {

    
}, []);



const toggleVisibility=()=>{
setShowSideBar(!showSideBar);
}

  return (
    <>
  
  {/* Sidebar Component TO be shown or hidden */}
<div ref={sidebarRef} className={`fixed top-[88px] left-0 h-full w-64 bg-base shadow-md z-50 transistion-transform duration-300 ${showSideBar&&sidebarClickMenu===0? 'transalate-x-0': '-translate-x-full'}`}>
<Sidebar>

</Sidebar>
</div>

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