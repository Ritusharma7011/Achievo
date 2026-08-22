import React, { useState } from "react"
import { useSelector } from "react-redux"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

import {
  deleteCourse,
} from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import { formatDate } from "../../../../services/formatDate"

import ConfirmationModal from "../../../common/ConfirmationModal"

export default function CoursesTable({ courses, setCourses }) {
  const navigate = useNavigate()

  const { token } = useSelector((state) => state.auth)

  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleCourseDelete = async (courseId) => {
    setLoading(true)

    await deleteCourse({ courseId }, token)

    setCourses((prev) =>
      prev.filter((course) => course._id !== courseId)
    )

    setConfirmationModal(null)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-purple-400" />
      </div>
    )
  }

  return (
    <>
      {/* ================= MAIN CONTAINER ================= */}
      <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-btn-secondary">

        {/* ================= DESKTOP HEADER ================= */}
        <div
          className="
            hidden
            border-b
            border-white/10
            bg-btn-secondary-hover
            px-6
            py-4
            lg:grid
            lg:grid-cols-[minmax(0,1fr)_140px_120px]
            lg:items-center
            lg:gap-6
          "
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Course
          </p>

          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Price
          </p>

          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Actions
          </p>
        </div>

        {/* ================= EMPTY STATE ================= */}
        {!courses || courses.length === 0 ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center px-5 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/10">
              <span className="text-2xl text-purple-300">+</span>
            </div>

            <h3 className="text-lg font-semibold text-white sm:text-xl">
              No Courses Yet
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
              You haven't created any courses yet. Start building your first
              course on Achievo.
            </p>
          </div>
        ) : (
          <div>
            {courses.map((course) => (
              <div
                key={course?._id}
                className="
                  border-b
                  border-white/10
                  p-4
                  last:border-b-0
                  sm:p-5
                  lg:grid
                  lg:grid-cols-[minmax(0,1fr)_140px_120px]
                  lg:items-center
                  lg:gap-6
                  lg:px-6
                  lg:py-5
                "
              >

                {/* ================= COURSE ================= */}
                <div className="flex min-w-0 flex-col gap-4 sm:flex-row">

                  {/* Thumbnail */}
                  <img
                    src={course?.thumbNail}
                    alt={course?.courseName}
                    className="
                      aspect-video
                      w-full
                      rounded-lg
                      border
                      border-white/10
                      object-cover
                      sm:h-[120px]
                      sm:w-[180px]
                      sm:shrink-0
                    "
                  />

                  {/* Course Details */}
                  <div className="flex min-w-0 flex-1 flex-col">

                    <h3
                      className="
                        truncate
                        text-base
                        font-semibold
                        text-white
                        sm:text-lg
                      "
                    >
                      {course?.courseName}
                    </h3>

                    <p
                      className="
                        mt-1
                        line-clamp-2
                        text-xs
                        leading-relaxed
                        text-gray-400
                        sm:text-sm
                      "
                    >
                      {course?.courseDescription}
                    </p>

                    {/* Created Date */}
                    <p className="mt-3 text-[11px] text-gray-500 sm:text-xs">
                      Created{" "}
                      {formatDate(
                        course?.createdAt || course?.updatedAt
                      )}
                    </p>

                    {/* Status */}
                    <div className="mt-3">

                      {course?.status === COURSE_STATUS.DRAFT ? (
                        <div
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-orange-500/10
                            px-2.5
                            py-1
                            text-[11px]
                            font-medium
                            text-orange-300
                            sm:text-xs
                          "
                        >
                          <HiClock size={13} />
                          Draft
                        </div>
                      ) : (
                        <div
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-green-500/10
                            px-2.5
                            py-1
                            text-[11px]
                            font-medium
                            text-green-300
                            sm:text-xs
                          "
                        >
                          <span
                            className="
                              flex
                              h-3.5
                              w-3.5
                              items-center
                              justify-center
                              rounded-full
                              bg-green-400
                              text-black
                            "
                          >
                            <FaCheck size={7} />
                          </span>

                          Published
                        </div>
                      )}

                    </div>
                  </div>
                </div>

                {/* ================= MOBILE PRICE ================= */}
                <div
                  className="
                    mt-4
                    flex
                    items-center
                    justify-between
                    border-t
                    border-white/10
                    pt-4
                    lg:hidden
                  "
                >
                  <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                    Price
                  </span>

                  <span className="text-sm font-semibold text-white">
                    ₹{course?.price}
                  </span>
                </div>

                {/* ================= DESKTOP PRICE ================= */}
                <div className="hidden lg:block">
                  <p className="text-sm font-semibold text-white">
                    ₹{course?.price}
                  </p>
                </div>

                {/* ================= ACTIONS ================= */}
                <div
                  className="
                    mt-4
                    flex
                    items-center
                    gap-2
                    border-t
                    border-white/10
                    pt-4
                    lg:mt-0
                    lg:border-0
                    lg:pt-0
                  "
                >

                  {/* Edit */}
                  <button
                    type="button"
                    disabled={loading}
                    title="Edit course"
                    onClick={() =>
                      navigate(
                        `/dashboard/edit-course/${course._id}`
                      )
                    }
                    className="
                      flex
                      h-9
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      border
                      border-white/10
                      bg-white/5
                      text-xs
                      font-medium
                      text-gray-300
                      transition
                      hover:border-purple-500/30
                      hover:bg-purple-500/10
                      hover:text-purple-300
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      sm:flex-none
                      sm:w-10
                    "
                  >
                    <FiEdit2 size={17} />

                    <span className="sm:hidden">
                      Edit
                    </span>
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    disabled={loading}
                    title="Delete course"
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Delete this course?",
                        text2:
                          "All data related to this course will be permanently deleted.",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () =>
                          handleCourseDelete(course._id),
                        btn2Handler: () =>
                          setConfirmationModal(null),
                      })
                    }}
                    className="
                      flex
                      h-9
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      rounded-lg
                      border
                      border-white/10
                      bg-white/5
                      text-xs
                      font-medium
                      text-gray-300
                      transition
                      hover:border-red-500/30
                      hover:bg-red-500/10
                      hover:text-red-400
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                      sm:flex-none
                      sm:w-10
                    "
                  >
                    <RiDeleteBin6Line size={18} />

                    <span className="sm:hidden">
                      Delete
                    </span>
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= CONFIRMATION MODAL ================= */}
      {confirmationModal && (
        <ConfirmationModal
          modalData={confirmationModal}
        />
      )}
    </>
  )
}