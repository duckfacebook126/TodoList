import React from 'react'
import { AlarmClockCheck } from 'lucide-react';//for to lsit
import { Loader } from 'lucide-react'; //for INprogress Tasks
import { CheckCheck } from 'lucide-react';//for completted tasks

const Sidebar = () => {


const SidebarItems=[
  'ToDo',
  'In Progress',
  'Done',
  'Progress Report'
];

  return (
    <div className="fixed bg-base left-0 h-full w-64 shadow-2xl items-center justify-center">
      <div className="flex flex-col ">
        {SidebarItems.map((item, index) => (
          <button
            key={index}

            className={'p-4 w-full text-left hover:bg-base-300'
            }
          >


            {item}
          </button>
        ))}
      </div>
    </div>
  ) 
}

export default Sidebar