import {create} from 'zustand';


export const sidebarStore=create(
    (set,get)=>
    (
        {
            selectedSidebarItem:null,
            setSelectedSidebarItem:(item)=>set({selectedSidebarItem:item}),

        }
    )
)