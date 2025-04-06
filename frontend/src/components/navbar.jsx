import React, { useEffect, useRef } from 'react'
import { LogOut } from 'lucide-react';
import { Menu } from 'lucide-react';
import { CircleUserRound } from 'lucide-react';
import { authStore } from '../store/authStore';
import Sidebar from './sidebar';

const Navbar = () => {

const {logout}=authStore();

const [showSideBar, setShowSideBar]=useState(false);
const sidebarRef=useRef()
  return (
<div className="navbar bg-secondary shadow-sm">
  <div className="flex justify-between items-center w-full p-4">
    {/* Side bar Button On the Left */}
    <button className="ml-0 btn btn-base" onClick={()=>setShowSideBar(true)}>
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
  )
}

export default Navbar