// import React, { useEffect, useState } from "react";
// import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
// import { useSelector } from "react-redux";
// import Loading from "../../common/Loading";
// import ProgressBar from "@ramonak/react-progress-bar";

// //STYLING PENDING - DO IT AFTER PAYMENT WALA PART 
// function EnrolledCourses(){

//     const {token} = useSelector((state)=> state.auth);
//     const [enrolledCourses, setEnrolledCourses] = useState(null);

//     const getEnrolledCourse = async()=>{
//         try{
//             const response = await getUserEnrolledCourses(token);
//             setEnrolledCourses(response);
//         }
//         catch(error){
//             console.log("Unable to fetch enrolled courses")
//         }
//     }
//     useEffect(()=>{
//         getEnrolledCourse();
//     },[])

//     return(
//         <div>
//             <div className="text-2xl font-bold text">Enrolled Courses</div>
//             {
//                 !enrolledCourses ? (
//                     <Loading/>
//                 ) 
//                 : 
//                 (
//                     !enrolledCourses.length ? (<div className="text-2xl h-[60vh] text-gray-500 font-semibold flex justify-center items-center">Oops! You have not enrolled in any course yet.</div>)
//                     : (
//                         <div>
//                             <div>
//                                 <p>Course Name</p>
//                                 <p>Duration</p>
//                                 <p>Progess</p>
//                             </div>
//                             {/* Cards */}
//                             {
//                                 enrolledCourses.map((course,index)=>(
//                                     <div key={index}>
//                                         {/* course part */}
//                                         <div>
//                                             <img src={course.thumbNail}/>
//                                             <div>
//                                                 <p>{course.courseName}</p>
//                                                 <p>{course.description}</p>
//                                             </div>
//                                         </div>

//                                         {/* durations part */}
//                                         <div>
//                                             {course?.totalDuration}
//                                         </div>
//                                         {/* Progess */}
//                                         <p> Progess : {course.progressPercentage || 0}%</p>
//                                         <ProgressBar completed={course.progressPercentage || 0}
//                                             height="8px"
//                                             isLabelVisible={false}
//                                             />
//                                     </div>
//                                 )

//                                 )
//                             }
                            
//                         </div>
//                     )
//                 )
//             }

//         </div>
//     )
// }

// export default EnrolledCourses

import React, { useEffect, useState } from "react"
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"
import { useSelector } from "react-redux"
import Loading from "../../common/Loading"
import ProgressBar from "@ramonak/react-progress-bar"
import { FiBookOpen, FiClock, FiPlayCircle } from "react-icons/fi"

function EnrolledCourses() {
    const { token } = useSelector((state) => state.auth)
    const [enrolledCourses, setEnrolledCourses] = useState(null)

    const getEnrolledCourse = async () => {
        try {
            const response = await getUserEnrolledCourses(token)
            setEnrolledCourses(response)
        } catch (error) {
            console.log("Unable to fetch enrolled courses")
        }
    }

    useEffect(() => {
        getEnrolledCourse()
    }, [])

    return (
        <div className="min-h-screen bg-btn-secondary px-3 py-6 sm:px-5 sm:py-8 md:px-8 lg:px-10">

            {/* Header */}
            <div className="mx-auto mb-7 w-full max-w-7xl">
                <h1 className="text-xl font-bold text-white sm:text-2xl md:text-3xl">
                    Enrolled Courses
                </h1>

                <p className="mt-1.5 text-xs text-gray-400 sm:text-sm md:text-base">
                    Continue learning and track your progress.
                </p>
            </div>

            {/* Loading */}
            {!enrolledCourses ? (
                <div className="flex min-h-[50vh] items-center justify-center">
                    <Loading />
                </div>
            ) : !enrolledCourses.length ? (

                /* Empty State */
                <div className="mx-auto flex min-h-[50vh] w-full max-w-7xl flex-col items-center justify-center rounded-xl border border-white/10 bg-btn-secondary-hover/50 px-5 text-center sm:rounded-2xl sm:px-8">

                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/10 sm:h-16 sm:w-16">
                        <FiBookOpen className="text-2xl text-purple-400 sm:text-3xl" />
                    </div>

                    <h2 className="text-lg font-semibold text-white sm:text-xl md:text-2xl">
                        No Courses Yet
                    </h2>

                    <p className="mt-2 max-w-md text-xs leading-5 text-gray-400 sm:text-sm sm:leading-6">
                        You haven't enrolled in any course yet. Start learning
                        something new and build your skills.
                    </p>
                </div>

            ) : (

                <div className="mx-auto w-full max-w-7xl overflow-hidden rounded-xl border border-white/10 bg-btn-secondary-hover/40 shadow-lg sm:rounded-2xl">

                    {/* Desktop Header */}
                    <div className="hidden grid-cols-[2fr_1fr_1.5fr] gap-6 border-b border-white/10 bg-btn-secondary-hover px-5 py-4 text-xs font-medium text-gray-400 md:grid lg:px-6">
                        <p>Course</p>
                        <p>Duration</p>
                        <p>Progress</p>
                    </div>

                    {/* Courses */}
                    <div>
                        {enrolledCourses.map((course, index) => (
                            <div
                                key={course._id || index}
                                className="border-b border-white/10 p-3 transition-all duration-200 last:border-b-0 hover:bg-white/3 sm:p-5 md:p-6"
                            >

                                {/* ================= DESKTOP ================= */}
                                <div className="hidden grid-cols-[2fr_1fr_1.5fr] items-center gap-5 md:grid lg:gap-6">

                                    {/* Course */}
                                    <div className="flex min-w-0 items-center gap-4">
                                        <img
                                            src={course.thumbNail}
                                            alt={course.courseName}
                                            className="h-16 w-28 shrink-0 rounded-lg object-cover lg:h-20 lg:w-32"
                                        />

                                        <div className="min-w-0 pl-4">
                                            <h3 className="truncate text-sm font-semibold text-white lg:text-base">
                                                {course.courseName}
                                            </h3>

                                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-400 lg:text-sm">
                                                {course.courseDescription}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Duration */}
                                    <div className="flex items-center gap-2 text-xs text-gray-300 lg:text-sm">
                                        <FiClock className="shrink-0 text-purple-400" />
                                        <span>
                                            {/* {course?.totalDuration || "N/A"} */}
                                            {"2hrs"}
                                        </span>
                                    </div>

                                    {/* Progress */}
                                    <div>
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-xs text-gray-400 lg:text-sm">
                                                Progress
                                            </span>

                                            <span className="text-xs font-semibold text-purple-400 lg:text-sm">
                                                {course.progressPercentage || 0}%
                                            </span>
                                        </div>

                                        <ProgressBar
                                            completed={course.progressPercentage || 0}
                                            height="6px"
                                            isLabelVisible={false}
                                            bgColor="#A855F7"
                                            baseBgColor="#374151"
                                            borderRadius="10px"
                                        />
                                    </div>
                                </div>

                                {/* ================= MOBILE / TABLET ================= */}
                                <div className="flex flex-col gap-4 md:hidden">

                                    {/* Course */}
                                    <div className="flex min-w-0 gap-3 sm:gap-4">
                                        <img
                                            src={course.thumbNail}
                                            alt={course.courseName}
                                            className="h-20 w-28 shrink-0 rounded-lg object-cover sm:h-24 sm:w-36"
                                        />

                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-sm font-semibold text-white sm:text-base">
                                                {course.courseName}
                                            </h3>
                                            <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-gray-400 sm:text-xs">
                                                {course.courseDescription}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Duration */}
                                    <div className="flex items-center justify-between rounded-lg border border-white/5 bg-btn-secondary-hover px-3 py-2.5">
                                        <div className="flex items-center gap-2 text-xs text-gray-400 sm:text-sm">
                                            <FiClock className="text-purple-400" />
                                            <span>Duration</span>
                                        </div>

                                        <span className="text-xs font-medium text-gray-200 sm:text-sm">
                                            {course?.totalDuration || "N/A"}
                                        </span>
                                    </div>

                                    {/* Progress */}
                                    <div>
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="flex items-center gap-2 text-xs text-gray-400 sm:text-sm">
                                                <FiPlayCircle className="text-purple-400" />
                                                Progress
                                            </span>

                                            <span className="text-xs font-semibold text-purple-400 sm:text-sm">
                                                {course.progressPercentage || 0}%
                                            </span>
                                        </div>

                                        <ProgressBar
                                            completed={course.progressPercentage || 0}
                                            height="6px"
                                            isLabelVisible={false}
                                            bgColor="#A855F7"
                                            baseBgColor="#374151"
                                            borderRadius="10px"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default EnrolledCourses