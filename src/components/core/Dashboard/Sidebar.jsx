// import React, { useState } from "react";
// import {sidebarLinks} from "../../../data/Dashboard-Link";
// import { logout } from "../../../services/operations/authAPI";
// import { useDispatch, useSelector } from "react-redux";
// import SidebarLink from "./SidebarLink"
// import { VscSettingsGear, VscSignOut } from "react-icons/vsc";
// import { useNavigate } from "react-router-dom";
// import IconBtn from "../../common/IconBtn";
// import ConfirmationModal from "../../common/confirmationModal";

// const Sidebar = ()=>{
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const {user, loading: profileLoading} = useSelector((state)=> state.profile);
//     const{loading: authLoading} = useSelector( (state)=>state.auth);

//     const modalData = {
//         text1 : "Are you sure?",
//         text2 : "You will be logged out from your account",
//         btn1Text: 'Logout',
//         btn2Text: 'Cancel',
//         btn1Handler: () => dispatch(logout(navigate)),
//         btn2Handler: () => setIsModalOpen(false),
//         closeModalHandler: () => setIsModalOpen(false),
//     }

//     return(
//         <div>
//             <div className="flex min-w-[222px] flex-col bg-btn-secondary h-full px-3">

//                 <div className="flex flex-col gap-y-2 my-12">
//                     {
//                         sidebarLinks.map((link)=>{
//                             if(link.type && user?.accountType !== link.type) return null;

//                             return(
//                                 <SidebarLink key={link.id} link={link} iconName={link.icon}/>
//                             )
//                         })
//                     }

//                     <div className="mx-auto mt-3 mb-3 w-full h-px bg-white/10"></div>

//                     {/* Setting */}
//                     <SidebarLink
//                         link={{ name: "Settings", path: "/dashboard/settings" }}
//                         iconName="VscSettingsGear"
//                     />

//                     {/* Logout */}
//                     <button onClick={()=> setIsModalOpen(true)}
//                         className="text-sm font-medium ">

//                         <div className="flex rounded-md items-center gap-x-2 px-3 py-2.5 hover:bg-red-500/10
//                             hover:text-red-400 hover:cursor-pointer cursor-pointer transition-all duration-100 ">
//                             <VscSignOut className="text-[16px]"/>
//                             <p className="text-sm">Logout</p>
//                         </div>
//                     </button>
                    
//                 </div>
//             </div>
//             {
//                 isModalOpen && <ConfirmationModal modalData = {modalData}/>
//             }
//         </div>
//     )
// }

// export default Sidebar

import React, { useState } from "react";
import {sidebarLinks} from "../../../data/Dashboard-Link";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink"
import { VscSettingsGear, VscSignOut } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import ConfirmationModal from "../../common/confirmationModal";

const Sidebar = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const {user, loading: profileLoading} = useSelector((state)=> state.profile);
    const{loading: authLoading} = useSelector( (state)=>state.auth);

    const modalData = {
        text1 : "Are you sure?",
        text2 : "You will be logged out from your account",
        btn1Text: 'Logout',
        btn2Text: 'Cancel',
        btn1Handler: () => dispatch(logout(navigate)),
        btn2Handler: () => setIsModalOpen(false),
        closeModalHandler: () => setIsModalOpen(false),
    }

    return(
        <div className="w-full md:w-auto">
            <div className="flex min-w-0 md:min-w-[222px] flex-col bg-btn-secondary h-full px-2 sm:px-3">

                <div className="flex flex-col gap-y-1 sm:gap-y-2 my-4 sm:my-12">

                    {
                        sidebarLinks.map((link)=>{
                            if(link.type && user?.accountType !== link.type) return null;

                            return(
                                <SidebarLink 
                                    key={link.id} 
                                    link={link} 
                                    iconName={link.icon}
                                />
                            )
                        })
                    }

                    <div className="mx-auto mt-2 sm:mt-3 mb-2 sm:mb-3 w-full h-px bg-white/10"></div>

                    {/* Setting */}
                    <SidebarLink
                        link={{ name: "Settings", path: "/dashboard/settings" }}
                        iconName="VscSettingsGear"
                    />

                    {/* Logout */}
                    <button 
                        onClick={()=> setIsModalOpen(true)}
                        className="text-sm font-medium w-full"
                    >

                        <div className="flex rounded-md items-center gap-x-2 px-3 py-2.5 hover:bg-red-500/10
                            hover:text-red-400 hover:cursor-pointer cursor-pointer transition-all duration-100">

                            <VscSignOut className="text-[16px] shrink-0"/>
                            <p className="text-sm whitespace-nowrap">Logout</p>

                        </div>
                    </button>
                    
                </div>
            </div>

            {
                isModalOpen && <ConfirmationModal modalData={modalData}/>
            }
        </div>
    )
}

export default Sidebar