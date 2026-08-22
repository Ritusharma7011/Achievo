// import React from "react"
// import { useForm } from "react-hook-form"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"

// import { updateProfile } from "../../../../services/operations/settingsAPI"
// import IconBtn from "../../../common/IconBtn"
// import { useState } from "react"

// const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

// export default function EditProfile() {
//     const { user } = useSelector((state) => state.profile)
//     const { token } = useSelector((state) => state.auth)
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const [loading, setLoading] = useState(false);
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm()

//     const submitProfileForm = async (data) => {
//         // console.log("Form Data - ", data)
//         try {
//         dispatch(updateProfile(token, data))
//         } catch (error) {
//         console.log("ERROR MESSAGE - ", error.message)
//         }
//     }
//     return (
//         <div className="bg-btn-secondary rounded-xl px-6 py-6">
//         <form onSubmit={handleSubmit(submitProfileForm)}>
//             <div>
//             <h1 className="text-xl font-semibold pb-3" >Profile Information</h1>

//             <div >
//                 <div className="flex" >

//                 <label >
//                     <p className="text-[16px] text-body py-1">First Name <span className="text-red-400">*</span></p>
//                     <input
//                     type='text'
//                     name='firstName'
//                     placeholder='Enter first name'
//                     defaultValue={user?.firstName}
//                     className='w-full bg-btn-secondary-hover px-3 py-2 rounded-xl border border-transparent focus:outline-none focus:border-gray-500'
//                     {...register('firstName', { required: true })}
//                     />

//                     {
//                     errors.firstName && <p className='' >Please enter your first name</p>
//                     }
//                 </label>


//                 <label className='' >
//                     <p className="text-[16px] text-body py-1" >Last Name <span className='text-red-400'>*</span></p>
//                     <input
//                     type='text'
//                     name='lastName'
//                     placeholder='Enter last name'
//                     defaultValue={user?.lastName}
//                     className='w-full bg-btn-secondary-hover px-3 py-2 rounded-xl border border-transparent focus:outline-none focus:border-gray-500'
//                     {...register('lastName', { required: true })}
//                     />

//                     {
//                     errors.lastName && <p className='' >Please enter your last name</p>
//                     }
//                 </label>
//                 </div>

//                 <div className='flex '>

//                 <label className='' >
//                     <p className='text-[16px] text-body py-1' >Date of Birth <span className='text-red-400'>*</span></p>
//                     <input
//                     type='date'
//                     name='dob'
//                     max={new Date().toISOString().split('T')[0]}
//                     placeholder='Enter first name'
//                     defaultValue={user?.profile?.dob?.split('T')[0]}
//                     className='w-full bg-btn-secondary-hover px-3 py-2 rounded-xl border border-transparent focus:outline-none focus:border-gray-500'
//                     {...register('dob', {
//                         required: {
//                         value: true,
//                         message: 'Please enter your Date of Birth'
//                         },
//                         max: {
//                         value: new Date().toISOString().split('T')[0],
//                         message: 'Date of Birth cannot be in the future'
//                         }
//                     })}
//                     />

//                     {
//                     errors.dob && <p className='' >{errors.dob.message}</p>
//                     }
//                 </label>


//                 <label className='' >
//                     <p className='text-[16px] text-body py-1' >Gender <span className='text-red-400'>*</span></p>
//                     <select
//                     type='text'
//                     name='gender'
//                     className='w-full bg-btn-secondary-hover px-3 py-2 rounded-xl border border-transparent focus:outline-none focus:border-gray-500'
//                     defaultValue={user?.profile?.gender}
//                     {...register('gender', { required: true })}
//                     >

//                     {
//                         genders.map((gender, ind) => (
//                         <option className='' key={ind} value={gender} > {gender} </option>
//                         ))
//                     }
//                     </select>
//                 </label>
//                 </div>

//                 <div className='flex '>

//                 <label className='' >
//                     <p className='text-[16px] text-body py-1' >Contact Number <span className='text-red-400'>*</span></p>
//                     <input
//                     type='tel'
//                     name='contactNumber'
//                     placeholder='Enter contact number'
//                     defaultValue={user?.profile?.contactNumber}
//                     className='w-full bg-btn-secondary-hover px-3 py-2 rounded-xl border border-transparent focus:outline-none focus:border-gray-500'
//                     {...register('contactNumber', {
//                         required: {
//                         value: true,
//                         message: 'Please enter your Contact Number'
//                         },
//                         maxLength: {
//                         value: 12,
//                         message: 'Invalid Contact Number'
//                         },
//                         minLength: {
//                         value: 10,
//                         message: 'Invalid Contact Number'
//                         }
//                     })}
//                     />

//                     {
//                     errors.contactNumber && <p className='' >{errors.contactNumber.message}</p>
//                     }
//                 </label>


//                 <label className='' >
//                     <p className='text-[16px] text-body py-1' >About <span className='text-red-400'>*</span></p>
//                     <input
//                     type='text'
//                     name='about'
//                     placeholder='Enter Bio Detail'
//                     defaultValue={user?.profile?.about}
//                     className='w-full bg-btn-secondary-hover px-3 py-2 rounded-xl border border-transparent focus:outline-none focus:border-gray-500'
//                     {...register('about', { required: true })}
//                     />

//                     {
//                     errors.about && <p className='' >Please enter your Bio Details</p>
//                     }
//                 </label>
//                 </div>
//             </div>

//             </div>


//             <div className=''>
//             <button onClick={() => navigate('/dashboard/my-profile')} className={`
//             ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}
//             `}>Cancel</button>

//             <IconBtn type={'submit'} disabled={loading} text={loading ? 'Saving...' : 'Save'} customClasses=''/>
//             </div>

//         </form>

//         </div>
//     )
// }

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateProfile } from "../../../../services/operations/settingsAPI";
import IconBtn from "../../../common/IconBtn";

const genders = [
    "Male",
    "Female",
    "Non-Binary",
    "Prefer not to say",
    "Other"
];

export default function EditProfile() {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const submitProfileForm = async (data) => {
        try {
            setLoading(true);

            dispatch(updateProfile(token, data));

        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full bg-btn-secondary rounded-xl border border-white/10
                        px-4 py-5
                        sm:px-6 sm:py-6
                        md:px-8 md:py-7">

            <form onSubmit={handleSubmit(submitProfileForm)}>

                {/* ================= HEADING ================= */}

                <h1 className="text-lg sm:text-xl md:text-2xl
                               font-semibold text-white
                               mb-5 sm:mb-6">
                    Profile Information
                </h1>


                {/* ================= FORM ================= */}

                <div className="grid grid-cols-1 md:grid-cols-2
                                gap-x-6 gap-y-5">


                    {/* ================= FIRST NAME ================= */}

                    <label className="w-full">

                        <p className="text-sm sm:text-[15px] text-body mb-2">
                            First Name
                            <span className="text-red-400"> *</span>
                        </p>

                        <input
                            type="text"
                            name="firstName"
                            placeholder="Enter first name"
                            defaultValue={user?.firstName}
                            className="w-full
                                       bg-btn-secondary-hover
                                       px-3 py-2.5 sm:py-3
                                       rounded-lg
                                       border border-transparent
                                       focus:outline-none
                                       focus:border-gray-500
                                       text-sm sm:text-[15px]
                                       text-white
                                       placeholder:text-gray-500"
                            {...register("firstName", {
                                required: true
                            })}
                        />

                        {errors.firstName && (
                            <p className="text-xs text-red-400 mt-1">
                                Please enter your first name
                            </p>
                        )}

                    </label>


                    {/* ================= LAST NAME ================= */}

                    <label className="w-full">

                        <p className="text-sm sm:text-[15px] text-body mb-2">
                            Last Name
                            <span className="text-red-400"> *</span>
                        </p>

                        <input
                            type="text"
                            name="lastName"
                            placeholder="Enter last name"
                            defaultValue={user?.lastName}
                            className="w-full
                                       bg-btn-secondary-hover
                                       px-3 py-2.5 sm:py-3
                                       rounded-lg
                                       border border-transparent
                                       focus:outline-none
                                       focus:border-gray-500
                                       text-sm sm:text-[15px]
                                       text-white
                                       placeholder:text-gray-500"
                            {...register("lastName", {
                                required: true
                            })}
                        />

                        {errors.lastName && (
                            <p className="text-xs text-red-400 mt-1">
                                Please enter your last name
                            </p>
                        )}

                    </label>


                    {/* ================= DATE OF BIRTH ================= */}

                    <label className="w-full">

                        <p className="text-sm sm:text-[15px] text-body mb-2">
                            Date of Birth
                            <span className="text-red-400"> *</span>
                        </p>

                        <input
                            type="date"
                            name="dateOfBirth"
                            max={new Date().toISOString().split("T")[0]}
                            defaultValue={user?.profile?.dateOfBirth?.split("T")[0]}
                            className="w-full
                                       bg-btn-secondary-hover
                                       px-3 py-2.5 sm:py-3
                                       rounded-lg
                                       border border-transparent
                                       focus:outline-none
                                       focus:border-gray-500
                                       text-sm sm:text-[15px]
                                       text-white"
                            {...register("dateOfBirth", {
                                required: {
                                    value: true,
                                    message: "Please enter your Date of Birth"
                                },
                                max: {
                                    value: new Date().toISOString().split("T")[0],
                                    message: "Date of Birth cannot be in the future"
                                }
                            })}
                        />

                        {errors.dateOfBirth && (
                            <p className="text-xs text-red-400 mt-1">
                                {errors.dateOfBirth.message}
                            </p>
                        )}

                    </label>


                    {/* ================= GENDER ================= */}

                    <label className="w-full">

                        <p className="text-sm sm:text-[15px] text-body mb-2">
                            Gender
                            <span className="text-red-400"> *</span>
                        </p>

                        <select
                            name="gender"
                            defaultValue={user?.additionalDetails?.gender}
                            className="w-full
                                       bg-btn-secondary-hover
                                       px-3 py-2.5 sm:py-3
                                       rounded-lg
                                       border border-transparent
                                       focus:outline-none
                                       focus:border-gray-500
                                       text-sm sm:text-[15px]
                                       text-white"
                            {...register("gender", {
                                required: true
                            })}
                        >

                            {genders.map((gender, index) => (
                                <option
                                    key={index}
                                    value={gender}
                                >
                                    {gender}
                                </option>
                            ))}

                        </select>

                    </label>


                    {/* ================= CONTACT NUMBER ================= */}

                    <label className="w-full">

                        <p className="text-sm sm:text-[15px] text-body mb-2">
                            Contact Number
                            <span className="text-red-400"> *</span>
                        </p>

                        <input
                            type="tel"
                            name="contactNumber"
                            placeholder="Enter contact number"
                            defaultValue={user?.additionalDetails?.contactNumber}
                            className="w-full
                                       bg-btn-secondary-hover
                                       px-3 py-2.5 sm:py-3
                                       rounded-lg
                                       border border-transparent
                                       focus:outline-none
                                       focus:border-gray-500
                                       text-sm sm:text-[15px]
                                       text-white
                                       placeholder:text-gray-500"
                            {...register("contactNumber", {
                                required: {
                                    value: true,
                                    message: "Please enter your Contact Number"
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Invalid Contact Number"
                                },
                                minLength: {
                                    value: 10,
                                    message: "Invalid Contact Number"
                                }
                            })}
                        />

                        {errors.contactNumber && (
                            <p className="text-xs text-red-400 mt-1">
                                {errors.contactNumber.message}
                            </p>
                        )}

                    </label>


                    {/* ================= ABOUT ================= */}

                    <label className="w-full">

                        <p className="text-sm sm:text-[15px] text-body mb-2">
                            About
                            <span className="text-red-400"> *</span>
                        </p>

                        <input
                            type="text"
                            name="about"
                            placeholder= "Enter Bio Details"
                            defaultValue={user?.additionalDetails?.about}
                            className="w-full
                                       bg-btn-secondary-hover
                                       px-3 py-2.5 sm:py-3
                                       rounded-lg
                                       border border-transparent
                                       focus:outline-none
                                       focus:border-gray-500
                                       text-sm sm:text-[15px]
                                       text-white
                                       placeholder:text-gray-500"
                            {...register("about", {
                                required: true
                            })}
                        />

                        {errors.about && (
                            <p className="text-xs text-red-400 mt-1">
                                Please enter your Bio Details
                            </p>
                        )}

                    </label>

                </div>


                {/* ================= BUTTONS ================= */}

                <div className="flex
                                flex-col-reverse
                                sm:flex-row
                                justify-end
                                items-stretch sm:items-center
                                gap-3 sm:gap-4
                                mt-7 sm:mt-8">

                    {/* Cancel */}

                    <button
                        type="button"
                        onClick={() => navigate("/dashboard/my-profile")}
                        className="w-full sm:w-auto
                                   px-5 py-2.5
                                   rounded-lg
                                   text-sm font-medium
                                   text-white
                                   bg-btn-secondary-hover
                                   hover:bg-white/10
                                   transition-all duration-100
                                   cursor-pointer"
                    >
                        Cancel
                    </button>


                    {/* Save */}
                    <div className="w-full sm:w-auto
                                   px-5 py-2.5
                                   rounded-lg
                                   text-sm font-medium
                                   text-white
                                   bg-btn-primary
                                   hover:scale-102
                                   transition-all duration-100
                                   cursor-pointer">
                        <IconBtn
                        type="submit"
                        disabled={loading}
                        text={loading ? "Saving..." : "Save"}
                        customClasses="w-full sm:w-auto px-5 py-2.5"
                    />
                    </div>
                    

                </div>

            </form>

        </div>
    );
}