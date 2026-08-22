import React from "react"
import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"
import Loading from "../../common/Loading"

export default function MyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector(state => state.auth)

  useEffect(() => {

    const fetchCourses = async () => {
      setLoading(true);
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourses(result);
      }
      setLoading(false);
    }
    fetchCourses();
  }, [token]);

  return (
  <div className="w-full">
    {/* Header */}
    <div
      className="
        mb-8
        flex
        flex-col
        gap-4
        sm:mb-10
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div>
        <h1 className="text-2xl font-semibold text-white sm:text-2xl">
          My Courses
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage, edit and track all your published and draft courses.
        </p>
      </div>

      <div className="gap-2 px-3 py-2 cursor-pointer flex-row items-center justify-center bg-btn-primary rounded-xl sm:w-auto flex">
        <IconBtn
          type="botton"
          text="Add Course"
          onClick={() =>
            navigate("/dashboard/add-course")
          }
        >
          {/* <VscAdd /> */}
        </IconBtn>
      </div>
    </div>

    {/* Content */}
    <div
      className="
        overflow-hidden
        rounded-xl
        border
        border-white/10
        bg-btn-secondary
      "
    >
      {loading ? (
        <div className="flex min-h-[350px] items-center justify-center">
          <Loading />
        </div>
      ) : !courses || courses.length === 0 ? (
        <div className="flex min-h-[350px] flex-col items-center justify-center px-6 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-btn-secondary-hover">
            <VscAdd className="text-2xl text-gray-500" />
          </div>

          <h2 className="text-lg font-semibold text-white sm:text-xl">
            No Courses Yet
          </h2>

          <p className="mt-2 max-w-md text-sm text-gray-500">
            You haven't created any courses yet. Start building your
            first learning experience on Achievo.
          </p>

          <button
            onClick={() =>
              navigate("/dashboard/add-course")
            }
            className="
              mt-5
              rounded-lg
              bg-btn-primary
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:opacity-90
            "
          >
            Create Course
          </button>
        </div>
      ) : (
        <div className="p-2 sm:p-4">
          <CoursesTable
            courses={courses}
            setCourses={setCourses}
          />
        </div>
      )}
    </div>
  </div>
)
}