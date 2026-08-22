// import React from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import IconBtn from "../../common/IconBtn";
// import { RiEditFill } from "react-icons/ri";

// function MyProfile(){
//     const {user} = useSelector((state)=> state.profile);

//     console.log("User: ",user);
//     const navigate = useNavigate();

//     return(
        
//         <div className="text-white flex flex-col gap-y-8">
//             <h1 className="text-3xl font-bold pb-4">My Profile</h1>

//             {/* section 1 */}
//             <div className="flex items-center justify-between bg-btn-secondary rounded-xl px-10 py-8">
//                 <div className="flex gap-x-5 items-center justify-center">
//                     <img src={user?.image} alt={`profile-${user?.firstName}`} className="rounded-full h-16 w-16" />
//                     <div className="">
//                         <p className="font-[550] text-xl text-white/90 pb-1" >{user?.firstName + " " + user?.lastName} </p>
//                         <p className="text-sm text-body">{user?.email}</p>
//                     </div>
//                 </div>
//                 <div className="flex bg-btn-primary px-4 gap-1.5 py-2 border border-purple-800 text-[15px] rounded-2xl hover:bg-btn-primary-hover hover:scale-105 transition-all duration-10 cursor-pointer items-center">
//                     <IconBtn 
//                         text="Edit"
//                         onClick={()=>{
//                             navigate("/dashboard/settings")
//                         }}
//                     />

//                     <RiEditFill className = "text-[16px]" />
                    
//                 </div>
                
//             </div>

//             {/* Section 2 */}
//             <div className="bg-btn-secondary rounded-xl">
//                 <div className="flex justify-between items-center px-10 pt-8 ">
//                     <p className="text-xl font-[540] ">About</p>

//                     <div className="flex bg-btn-primary px-4 gap-1.5 py-2 border border-purple-800 text-[15px] rounded-2xl hover:bg-btn-primary-hover hover:scale-105 transition-all duration-10 cursor-pointer items-center">
//                         <IconBtn  
//                             text="Edit"
//                             onClick={()=>{
//                                 navigate("/dashboard/settings")
//                             }}
//                         />

//                         <RiEditFill className = "text-[16px]" />
                        
//                     </div>
//                 </div>

//                 <p className="text-gray-500 text-[15px] px-8 py-6">{user?.additionalDetails.about ?? "Write something about yourself"} </p>
//             </div>

//             {/* Section 3 */}
//             <div className="bg-btn-secondary rounded-xl">
//                 <div className="flex justify-between items-center px-10 pt-8">
//                     <p className="text-xl font-[540] ">Personal Details</p>
//                     <div className="flex bg-btn-primary px-4 gap-1.5 py-2 border border-purple-800 text-[15px] rounded-2xl hover:bg-btn-primary-hover hover:scale-105 transition-all duration-10 cursor-pointer items-center">
//                         <IconBtn 
//                             text="Edit"
//                             onClick={()=>{
//                                 navigate("/dashboard/settings")
//                             }}
//                         />

//                         <RiEditFill className = "text-[16px]" />
                        
//                     </div>
//                 </div>

//                 <div className="flex gap-20 pt-5">
//                     <div className="flex flex-col gap-3 pl-10 pb-8">
//                         <div>
//                             <p className="text-[15px] text-gray-500">First Name</p>
//                             <p className="text-[14px]">{user?.firstName}</p>
//                         </div>
//                         <div>
//                             <p className="text-[15px] text-gray-500">Email</p>
//                             <p className="text-[14px]">{user?.email}</p>
//                         </div>
//                         <div>
//                             <p className="text-[15px] text-gray-500">Gender</p>
//                             <p className="text-[14px]">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
//                         </div>
//                     </div>

//                     <div className="flex flex-col gap-3 pl-10 pb-8">
//                         <div>
//                             <p className="text-[15px] text-gray-500">Last Name</p>
//                             <p className="text-[14px]">{user?.lastName}</p>
//                         </div>
//                         <div>
//                             <p className="text-[15px] text-gray-500">Phone number</p>
//                             <p className="text-[14px]">{user?.additionalDetails.contactNumber ?? "Add contact number"} </p>
//                         </div>
//                         <div>
//                             <p className="text-[15px] text-gray-500">Date of Birth</p>
//                             <p className="text-[14px]">{user?.additionalDetails?.dateOfBirth ?? "Add Date of Birth"}</p>
//                         </div>
//                     </div>
                    
                    

//                 </div>
//             </div>

//         </div>
//     )
// }

// export default MyProfile

import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { RiEditFill } from "react-icons/ri";

function MyProfile(){
    const {user} = useSelector((state)=> state.profile);

    console.log("User: ",user);
    const navigate = useNavigate();

    return(
        
        <div className="text-white flex flex-col gap-y-6 sm:gap-y-8">
            <h1 className="text-2xl sm:text-3xl font-bold pb-3 sm:pb-4">
                My Profile
            </h1>

            {/* section 1 */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between bg-btn-secondary rounded-xl px-5 sm:px-10 py-6 sm:py-8">

                <div className="flex gap-x-4 sm:gap-x-5 items-center justify-center min-w-0">
                    <img 
                        src={user?.image} 
                        alt={`profile-${user?.firstName}`} 
                        className="rounded-full h-14 w-14 sm:h-16 sm:w-16 shrink-0 object-cover" 
                    />

                    <div className="min-w-0">
                        <p className="font-[550] text-lg sm:text-xl text-white/90 pb-1 truncate">
                            {user?.firstName + " " + user?.lastName}
                        </p>

                        <p className="text-sm text-body truncate">
                            {user?.email}
                        </p>
                    </div>
                </div>

                <div className="flex w-fit bg-btn-primary px-4 gap-1.5 py-2 border border-purple-800 text-[15px] rounded-2xl hover:bg-btn-primary-hover hover:scale-105 transition-all duration-200 cursor-pointer items-center">
                    <IconBtn 
                        text="Edit"
                        onClick={()=>{
                            navigate("/dashboard/settings")
                        }}
                    />

                    <RiEditFill className="text-[16px]" />
                </div>
                
            </div>

            {/* Section 2 */}
            <div className="bg-btn-secondary rounded-xl">

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center px-5 sm:px-10 pt-6 sm:pt-8">

                    <p className="text-lg sm:text-xl font-[540]">
                        About
                    </p>

                    <div className="flex w-fit bg-btn-primary px-4 gap-1.5 py-2 border border-purple-800 text-[15px] rounded-2xl hover:bg-btn-primary-hover hover:scale-105 transition-all duration-200 cursor-pointer items-center">
                        <IconBtn  
                            text="Edit"
                            onClick={()=>{
                                navigate("/dashboard/settings")
                            }}
                        />

                        <RiEditFill className="text-[16px]" />
                    </div>
                </div>

                <p className="text-gray-500 text-[15px] px-5 sm:px-8 py-6 wrap-break-word">
                    {user?.additionalDetails.about ?? "Write something about yourself"}
                </p>
            </div>

            {/* Section 3 */}
            <div className="bg-btn-secondary rounded-xl">

                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center px-5 sm:px-10 pt-6 sm:pt-8">

                    <p className="text-lg sm:text-xl font-[540]">
                        Personal Details
                    </p>

                    <div className="flex w-fit bg-btn-primary px-4 gap-1.5 py-2 border border-purple-800 text-[15px] rounded-2xl hover:bg-btn-primary-hover hover:scale-105 transition-all duration-200 cursor-pointer items-center">
                        <IconBtn 
                            text="Edit"
                            onClick={()=>{
                                navigate("/dashboard/settings")
                            }}
                        />

                        <RiEditFill className="text-[16px]" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-x-20 pt-5 px-5 sm:px-0">

                    <div className="flex flex-col gap-3 sm:pl-10 pb-5 sm:pb-8">

                        <div>
                            <p className="text-[15px] text-gray-500">First Name</p>
                            <p className="text-[14px] wrap-break-word">{user?.firstName}</p>
                        </div>

                        <div>
                            <p className="text-[15px] text-gray-500">Email</p>
                            <p className="text-[14px] break-all">{user?.email}</p>
                        </div>

                        <div>
                            <p className="text-[15px] text-gray-500">Gender</p>
                            <p className="text-[14px]">
                                {user?.additionalDetails?.gender ?? "Add Gender"}
                            </p>
                        </div>

                    </div>

                    <div className="flex flex-col gap-3 sm:pl-10 pb-5 sm:pb-8">

                        <div>
                            <p className="text-[15px] text-gray-500">Last Name</p>
                            <p className="text-[14px] wrap-break-word">{user?.lastName}</p>
                        </div>

                        <div>
                            <p className="text-[15px] text-gray-500">Phone number</p>
                            <p className="text-[14px] wrap-break-word">
                                {user?.additionalDetails.contactNumber ?? "Add contact number"}
                            </p>
                        </div>

                        <div>
                            <p className="text-[15px] text-gray-500">Date of Birth</p>
                            <p className="text-[14px]">
                                {user?.additionalDetails?.dateOfBirth
                                    ? user.additionalDetails.dateOfBirth.split("T")[0]
                                    : "Add Date of Birth"
                                }
                            </p>
                        </div>

                    </div>
                    
                </div>
            </div>

        </div>
    )
}

export default MyProfile