// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import IconBtn from "../../../../common/IconBtn";
// import {GrAddCircle} from "react-icons/gr"
// import { useDispatch, useSelector } from "react-redux";
// import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
// import toast from "react-hot-toast";
// import { createSection, updateSection } from "../../../../../services/operations/courseDetailsAPI";

// export default function CourseBuilderForm(){

//     const {register, handleSubmit, setValue, formState:{errors}} = useForm();

//     const [editSectionName, setEditSectionName] = useState(null);
//     const {course} = useSelector((state)=> state.course)
//     const dispatch = useDispatch();
//     const [loading, setLoading] = useState(false);
//     const {token} = useSelector((state)=>state.auth);

//     const cancelEdit = ()=>{
//         setEditSectionName(null);
//         setValue("sectionName","");
//     }

//     const goBack = ()=>{
//         dispatch(setStep(1));
//         dispatch(setEditCourse(true));
//     }

//     const goToNext = ()=>{
//         if(course.courseContent.length === 0){
//             toast.error("Please add atleast one section");
//             return
//         }

//         if(course.courseContent.some((section)=> section.subSection.length === 0)){
//             toast.error("Please add atleast one lecture in each section")
//             return;
//         }

//         dispatch(setStep(3));
//     }

//     const onSubmit = async (data) =>{
//         setLoading(true);
//         let result;

//         if(editSectionName){
//             //editing
//             result = await updateSection(
//                 {
//                     sectionName : data.sectionName,
//                     sectionId : editSectionName,
//                     courseId : course._id,
//                 }, token
//             )
//         }else{
//             result = await createSection({
//                 sectionName: data.sectionName,
//                 courseId: course._id, 
//             },token)
//         }
        

//         //update values
//         if(result){
//             dispatch(setCourse(result));
//             setEditSectionName(null);
//             setValue("sectionName","");
//         }

//         setLoading(false);
//     }

//     const handleChangeEditSectionName = (sectionId, sectionName)=>{

//         if(editSectionName === sectionId){
//             cancelEdit();
//             return
//         }

//         setEditSectionName(sectionId);
//         setValue("sectionName", sectionName);
//     }

//     return(
//         <div className="text-white bg-btn-secondary rounded-xl px-5 py-5">
//             <h2>Course Builder</h2>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div>
//                     <label htmlFor="sectionName"> Section Name <span>*</span></label>
//                     <input type="text"
//                         id="sectionName"
//                         placeholder="Add section name"
//                         {...register("sectionName", {required: true})}
//                         className="w-full text-[15px]  bg-btn-secondary-hover rounded-md px-3 py-2 focus:outline-none focus:border focus:border-gray-700"
//                     />
//                     {
//                         errors.sectionName && (
//                             <span className="text-xs text-red-400">Section name is required</span>
//                         )
//                     }
//                 </div>

//                 <div className="text-white mt-10 flex w-full ">
//                     <IconBtn 
//                         type={"Submit"}
//                         text={editSectionName ? "Edit Section Name" : "Create Section"}
//                         outline= {true}
//                     >
//                        <GrAddCircle className="text-white"/> 
//                     </IconBtn>  
//                     {editSectionName && (
//                         <button type="button"
//                         onClick={cancelEdit}
//                         className="text-sm underline text-gray-600">
//                             Cancel Edit
//                         </button>
//                     )}
//                 </div>
//             </form>

//             {course.courseContent.length > 0 && (
//                 <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
//             )}

//             <div className="flex justify-end gap-x-3">
//                 <button onClick={goBack} className="rounded-md cursor-pointer flex items-center">Back</button>
//                 <IconBtn text={"Next"} onClick={goToNext} >
//                 </IconBtn>

//             </div>
//         </div>
//     )
// }

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GrAddCircle } from "react-icons/gr";
import { FiArrowLeft, FiArrowRight, FiEdit2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
    setCourse,
    setEditCourse,
    setStep,
} from "../../../../../slices/courseSlice";

import toast from "react-hot-toast";
import {
    createSection,
    updateSection,
} from "../../../../../services/operations/courseDetailsAPI";

import NestedView from "./NestedView";

export default function CourseBuilderForm() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const [editSectionName, setEditSectionName] = useState(null);
    const [loading, setLoading] = useState(false);

    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName", "");
    };

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    };

    const goToNext = () => {
        if (course.courseContent.length === 0) {
            toast.error("Please add atleast one section");
            return;
        }

        if (
            course.courseContent.some(
                (section) => section.subsection.length === 0
            )
        ) {
            toast.error("Please add atleast one lecture in each section");
            return;
        }

        dispatch(setStep(3));
    };

    const onSubmit = async (data) => {
        setLoading(true);

        let result;

        if (editSectionName) {
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id,
                },
                token
            );
        } else {
            result = await createSection(
                {
                    sectionName: data.sectionName,
                    courseId: course._id,
                },
                token
            );
        }

        if (result) {
            dispatch(setCourse(result));
            setEditSectionName(null);
            setValue("sectionName", "");
        }

        setLoading(false);
    };

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            cancelEdit();
            return;
        }

        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    };

    return (
        <div className="w-full rounded-xl bg-btn-secondary p-4 sm:p-5 md:p-6 text-white">

            {/* Header */}
            <div className="mb-4 pb-5">
                <div className="flex items-center gap-3">
                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-white">
                            Course Builder
                        </h2>

                        <p className="mt-1 text-xs sm:text-sm text-gray-400">
                            Create and organize sections and lectures for your course.
                        </p>
                    </div>
                </div>
            </div>

            {/* Section Form */}
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="rounded-xl border border-white/10 bg-btn-secondary-hover p-4 sm:p-5">

                    <div className="mb-4">
                        <h3 className="text-sm sm:text-base font-medium text-white">
                            {editSectionName
                                ? "Edit Section"
                                : "Add New Section"}
                        </h3>

                        <p className="mt-1 text-xs text-gray-500">
                            {editSectionName
                                ? "Update the name of your section."
                                : "Give your section a clear and meaningful name."}
                        </p>
                    </div>

                    {/* Input */}
                    <div>
                        <label
                            htmlFor="sectionName"
                            className="mb-2 block text-sm text-gray-300"
                        >
                            Section Name
                            <span className="ml-1 text-red-400">*</span>
                        </label>

                        <input
                            type="text"
                            id="sectionName"
                            placeholder="e.g. Introduction to React"
                            {...register("sectionName", {
                                required: true,
                            })}
                            className="
                                w-full
                                rounded-lg
                                border
                                border-white/10
                                bg-btn-secondary
                                px-3
                                py-2.5
                                text-sm
                                text-white
                                outline-none
                                placeholder:text-gray-500
                                transition
                                focus:border
                                focus:border-gray-700
                            "
                        />

                        {errors.sectionName && (
                            <span className="mt-1 block text-xs text-red-400">
                                Section name is required
                            </span>
                        )}
                    </div>

                    {/* Form Buttons */}
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-2
                                rounded-lg
                                bg-btn-primary
                                px-4
                                py-2.5
                                text-sm
                                font-medium
                                text-white
                                transition-all
                                duration-150
                                hover:scale-[1.02]
                                hover:opacity-90
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                sm:w-auto
                            "
                        >
                            <GrAddCircle className="text-sm" />

                            {loading
                                ? "Saving..."
                                : editSectionName
                                    ? "Update Section"
                                    : "Create Section"}
                        </button>

                        {editSectionName && (
                            <button
                                type="button"
                                onClick={cancelEdit}
                                className="
                                    w-full
                                    rounded-lg
                                    border
                                    border-white/10
                                    px-4
                                    py-2.5
                                    text-sm
                                    text-gray-400
                                    transition
                                    hover:bg-white/5
                                    hover:text-white
                                    sm:w-auto
                                "
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </div>
            </form>

            {/* Sections */}
            {course.courseContent.length > 0 && (
                <div className="mt-6">
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm sm:text-base font-semibold text-white">
                            Course Content
                        </h3>

                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
                            {course.courseContent.length}{" "}
                            {course.courseContent.length === 1
                                ? "Section"
                                : "Sections"}
                        </span>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-btn-secondary-hover p-3 sm:p-4">
                        <NestedView
                            handleChangeEditSectionName={
                                handleChangeEditSectionName
                            }
                        />
                    </div>
                </div>
            )}

            {/* Bottom Navigation */}
            <div className="
                mt-7
                flex
                flex-col-reverse
                gap-3
                border-t
                border-white/10
                pt-5
                sm:flex-row
                sm:justify-between
            ">

                {/* Back */}
                <button
                    type="button"
                    onClick={goBack}
                    className="
                        cursor-pointer
                        hover:scale-102 
                        transition-all 
                        duration-100
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        bg-btn-secondary-hover
                        px-5
                        py-2.5
                        sm:w-auto
                    "
                >
                    <FiArrowLeft />
                    Back
                </button>

                {/* Next */}
                <button
                    type="button"
                    onClick={goToNext}
                    className="
                        bg-btn-primary 
                        cursor-pointer 
                        hover:scale-102
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        px-6
                        py-2.5
                        text-white
                        transition-all
                        duration-150
                        sm:w-auto
                    "
                >
                    Next
                    <FiArrowRight />
                </button>
            </div>
        </div>
    );
}

// import React from "react"
// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { toast } from "react-hot-toast"
// import { IoAddCircleOutline } from "react-icons/io5"
// import { MdNavigateNext } from "react-icons/md"
// import { useDispatch, useSelector } from "react-redux"

// import {
//     createSection,
//     updateSection,
//     } from "../../../../../services/operations/courseDetailsAPI"
// import {
//     setCourse,
//     setEditCourse,
//     setStep,
//     } from "../../../../../slices/courseSlice"
//     import IconBtn from "../../../../common/IconBtn"
//     import NestedView from "./NestedView"

// export default function CourseBuilderForm() {
//     const {
//         register,
//         handleSubmit,
//         setValue,
//         formState: { errors },
//     } = useForm()

//     const { course } = useSelector((state) => state.course)
//     const { token } = useSelector((state) => state.auth)
//     const [loading, setLoading] = useState(false)
//     const [editSectionName, setEditSectionName] = useState(null)
//     const dispatch = useDispatch()


//     const onSubmit = async (data) => {

//         setLoading(true)

//         let result;

//         if (editSectionName) {
//         result = await updateSection(
//             {
//             sectionName: data.sectionName,
//             sectionId: editSectionName,
//             courseId: course._id,
//             },
//             token
//         )

//         } else {
//         result = await createSection(
//             {
//             sectionName: data.sectionName,
//             courseId: course._id,
//             },
//             token
//         )
//         }
//         if (result) {

//         dispatch(setCourse(result))
//         setEditSectionName(null)
//         setValue("sectionName", "")
//         }
//         setLoading(false)
//     }

//     const cancelEdit = () => {
//         setEditSectionName(null)
//         setValue("sectionName", "")
//     }

//     const handleChangeEditSectionName = (sectionId, sectionName) => {
//         if (editSectionName === sectionId) {
//         cancelEdit()
//         return
//         }
//         setEditSectionName(sectionId)
//         setValue("sectionName", sectionName)
//     }

//     const goToNext = () => {
//         if (course.courseContent.length === 0) {
//         toast.error("Please add atleast one section")
//         return
//         }
//         if (
//         course.courseContent.some((section) => section.subsection.length === 0)
//         ) {
//         toast.error("Please add atleast one lecture in each section")
//         return
//         }
//         dispatch(setStep(3))
//     }

//     const goBack = () => {
//         dispatch(setStep(1))
//         dispatch(setEditCourse(true))
//     }

//     return (
//         <div className="space-y-8 rounded-md border border-richblack-700 bg-richblack-800 p-6">
//         <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div className="flex flex-col space-y-2">
//             <label className="text-sm text-richblack-5" htmlFor="sectionName">
//                 Section Name <sup className="text-pink-200">*</sup>
//             </label>
//             <input
//                 id="sectionName"
//                 disabled={loading}
//                 placeholder="Add a section to build your course"
//                 {...register("sectionName", { required: true })}
//                 className="form-style w-full"
//             />
//             {errors.sectionName && (
//                 <span className="ml-2 text-xs tracking-wide text-pink-200">
//                 Section name is required
//                 </span>
//             )}
//             </div>
//             <div className="flex items-end gap-x-4">
//             <IconBtn
//                 type="submit"
//                 disabled={loading}
//                 text={editSectionName ? "Edit Section Name" : "Create Section"}
//                 outline={true}
//             >
//                 <IoAddCircleOutline size={20} className="text-yellow-50" />
//             </IconBtn>
//             {editSectionName && (
//                 <button
//                 type="button"
//                 onClick={cancelEdit}
//                 className="text-sm text-richblack-300 underline"
//                 >
//                 Cancel Edit
//                 </button>
//             )}
//             </div>
//         </form>
//         {course.courseContent.length > 0 && (
//             <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
//         )}
//         {/* Next Prev Button */}
//         <div className="flex justify-end gap-x-3">
//             <button
//             onClick={goBack}
//             className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-2 px-5 font-semibold text-richblack-900`}
//             >
//             Back
//             </button>
//             <IconBtn disabled={loading} text="Next" onClickHandler={goToNext}>
//                 <MdNavigateNext />
//             </IconBtn>
//         </div>
//     </div>
//   )
// }