import React, { useEffect, useState } from "react";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import { useSelector } from "react-redux";
import Loading from "../../common/Loading";
import ProgressBar from "@ramonak/react-progress-bar";

//STYLING PENDING - DO IT AFTER PAYMENT WALA PART 
function EnrolledCourses(){

    const {token} = useSelector((state)=> state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourse = async()=>{
        try{
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        }
        catch(error){
            console.log("Unable to fetch enrolled courses")
        }
    }
    useEffect(()=>{
        getEnrolledCourse();
    },[])

    return(
        <div>
            <div className="text-2xl font-bold text">Enrolled Courses</div>
            {
                !enrolledCourses ? (
                    <Loading/>
                ) 
                : 
                (
                    !enrolledCourses.length ? (<div className="text-2xl h-[60vh] text-gray-500 font-semibold flex justify-center items-center">Oops! You have not enrolled in any course yet.</div>)
                    : (
                        <div>
                            <div>
                                <p>Course Name</p>
                                <p>Duration</p>
                                <p>Progess</p>
                            </div>
                            {/* Cards */}
                            {
                                enrolledCourses.map((course,index)=>(
                                    <div>
                                        {/* course part */}
                                        <div>
                                            <img src={course.thumbNail}/>
                                            <div>
                                                <p>{course.courseName}</p>
                                                <p>{course.description}</p>
                                            </div>
                                        </div>

                                        {/* durations part */}
                                        <div>
                                            {course?.totalDuration}
                                        </div>
                                        {/* Progess */}
                                        <p> Progess : {course.progressPercentage || 0}%</p>
                                        <ProgressBar completed={course.progressPercentage || 0}
                                            height="8px"
                                            isLabelVisible={false}
                                            />
                                    </div>
                                )

                                )
                            }
                            
                        </div>
                    )
                )
            }

        </div>
    )
}

export default EnrolledCourses