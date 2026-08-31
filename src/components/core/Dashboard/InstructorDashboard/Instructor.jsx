import React from "react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI"
import { getInstructorData } from "../../../../services/operations/profileAPI"
import InstructorChart from "./InstructorChart"
import Loading from "../../../common/Loading"

export default function Instructor() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [loading, setLoading] = useState(false)
  const [instructorData, setInstructorData] = useState(null)
  const [courses, setCourses] = useState([])

  useEffect(() => {
    ; (async () => {
      setLoading(true)
      const instructorApiData = await getInstructorData(token)
      const result = await fetchInstructorCourses(token)
      console.log(instructorApiData)
      console.log('RESULT', result);
      if (instructorApiData.length) setInstructorData(instructorApiData)
      if (result) {
        setCourses(result)
      }
      setLoading(false)
    })()
  }, [])

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  )

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  )

  return (
    <div>
      <div className='space-y-2' >
        <p className='text-white text-2xl font-bold ' >Hi, {user.firstName} 👋 </p>
        <p className='text-gray-500 font-medium ' >Let's start something new</p>
      </div>

      <div>
        {
          loading ?
            (
              <div className='h-[calc(100vh-10rem)] grid place-items-center' >
                <Loading />
              </div>
            )
            : !instructorData || !courses.length ?
              (
                <div className='text-center mt-20 bg-btn-secondary px-6  py-20 rounded-md' >
                  <p className='text-2xl font-bold text-richblack-5' >You have <span className='font-extrabold text-pink-50'>not</span> published any courses yet</p>
                  <Link to={'/dashboard/add-course'} >
                    <p className='mt-3  text-lg font-semibold text-purple-300 underline' >Create a course</p>
                  </Link>
                </div>
              )
              :
              (
                <div>
                  {/* Pie charts and Stats */}
                  <div className='flex flex-col md:flex-row gap-5 my-10' >
                    {/* Pie charts */}
                    <div className='w-full' >
                      {
                        (totalAmount > 0 || totalStudents > 0)
                          ?
                          (
                            <div className='h-full' >
                              <InstructorChart courses={instructorData} />
                            </div>
                          )
                          :
                          (
                            <div className='bg-btn-secondary h-full  rounded-md p-6' >
                              <p className='text-lg text-white font-bold' >Visualize</p>
                              <p className='mt-4 text-xl text-gray-400 font-medium ' >Not Enough Data To Visualize</p>
                            </div>
                          )
                      }
                    </div>
                    {/* Statistics */}
                    <div className='min-h-fit min-w-[250px] rounded-md bg-btn-secondary p-6' >
                      <p className='text-lg font-bold text-white' >Statistics</p>

                      <div className='flex flex-col gap-4 mt-4 mb-4' >
                        <div>
                          <p className='text-lg text-gray-300' >Total Courses</p>
                          <p className='text-3xl font-semibold text-richblack-50' >{courses.length}</p>
                        </div>

                        <div>
                          <p className='text-lg text-gray-300'>Total Students</p>
                          <p className='text-3xl font-semibold text-richblack-50'>{totalStudents}</p>
                        </div>

                        <div>
                          <p className='text-lg text-gray-300'>Total Income</p>
                          <p className='text-3xl font-semibold text-richblack-50'>₹ {totalAmount}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Published Courses */}
                  <div className='w-full rounded-md bg-btn-secondary p-6' >
                    <div className='flex justify-between items-center' >
                      <p className='text-white text-lg font-bold' >Your Published Courses</p>
                      <Link to={'/dashboard/my-courses'} >
                        <div className=' text-purple-600 text-xs font-semibold' >
                          View All
                        </div>
                      </Link>
                    </div>

                    <div className='flex flex-col md:flex-row gap-x-5 gap-y-7 my-4' >
                      {
                        courses.slice(0, 3).map((course, ind) => (
                          <div key={ind} className='w-full md:w-1/3' >
                            <img
                              src={course.thumbNail}
                              alt={course.courseName}
                              className='h-[200px] w-full rounded-md object-cover'
                            />

                            <p className='mt-3 text-sm font-medium text-gray-100' > {course.courseName} </p>

                            <p className='mt-1 text-xs font-medium text-gray-200' >{course.studentsEnrolled.length} students | ₹ {course.price}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>

                </div>
              )
        }
      </div>
    </div>
  )
}