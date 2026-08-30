import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { MdRateReview } from "react-icons/md";
import IconBtn from "../../Common/IconBtn"

import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa"

import {
  MdOutlineKeyboardArrowDown,
} from "react-icons/md"

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [videoActive, setVideoActive] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const {
    courseId,
    sectionId,
    subsectionId,
  } = useParams()

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse)

  const navigate = useNavigate()

  //   
  // FIND ACTIVE VIDEO
  //   

  useEffect(() => {
    if (!courseSectionData?.length) return

    const currentSection = courseSectionData.find(
      (section) => section?._id === sectionId
    )

    if (!currentSection) return

    const currentSubsection = currentSection?.subsection?.find(
      (subsection) => subsection?._id === subsectionId
    )

    if (!currentSubsection) return

    setVideoActive(currentSubsection._id)
  }, [
    courseSectionData,
    sectionId,
    subsectionId,
  ])

  //   
  // NAVIGATE TO VIDEO
  //   

  const handleVideoClick = (section, subsection) => {
    navigate(
      `/dashboard/enrolled-courses/view-course/${courseId}/section/${section._id}/subsection/${subsection._id}`
    )

    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false)
    }
  }

  // BACK TO ENROLLED COURSES

  const handleBack = () => {
    navigate("/dashboard/enrolled-courses")
  }

  return (
    <>
      {/* =================================================
          MOBILE OPEN BUTTON
      ================================================= */}

      {!isSidebarOpen && (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="
            fixed
            left-0
            top-1/2
            z-50
            flex
            h-10
            w-9
            -translate-y-1/2
            items-center
            justify-center
            rounded-r-xl
            bg-btn-primary
            text-white
            shadow-lg
            transition-all
            duration-200
            hover:opacity-90
            lg:hidden
          "
        >
          <FaChevronRight className="text-sm" />
        </button>
      )}

      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="
            fixed
            inset-0
            z-30
            bg-black/50
            backdrop-blur-[1px]
            lg:hidden
          "
        />
      )}

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`
          fixed
          left-0
          top-14
          z-40
          h-[calc(100vh-3.5rem)]
          w-[285px]
          transform
          border-r
          border-white/10
          bg-btn-secondary
          shadow-2xl
          transition-transform
          duration-300
          ease-in-out

          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:relative
          lg:top-0
          lg:z-auto
          lg:h-[calc(100vh-3.5rem)]
          lg:w-[320px]
          lg:translate-x-0
          lg:shadow-none
        `}
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            border-b
            border-white/10
            bg-btn-secondary-hover
            px-4
            py-4
            sm:px-5
          "
        >

          {/* Top buttons */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-2
            "
          >

            {/* Back */}

            <button
              type="button"
              onClick={handleBack}
              title="Back to enrolled courses"
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                border
                border-white/10
                bg-btn-secondary
                text-gray-400
                transition-all
                duration-200
                hover:border-purple-500/30
                hover:bg-purple-500/10
                hover:text-purple-300
              "
            >
              <FaChevronLeft className="text-sm" />
            </button>

            {/* Mobile close */}

            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              title="Close sidebar"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                border
                border-white/10
                bg-btn-secondary
                text-gray-400
                transition-all
                hover:bg-white/5
                hover:text-white
                lg:hidden
              "
            >
              <FaChevronLeft className="text-sm" />
            </button>

            {/* Review */}

            <div
              onClick={() => setReviewModal(true)}
              className="flex gap-2 items-center cursor-pointer text-sm border border-purple-400 px-2 py-2 rounded-md text-gray-400 hover:underline"
            >
               <MdRateReview />
               <IconBtn text="Add Review" />
            </div>

          </div>

          {/* Course information */}

          <div className="mt-4">

            <h2
              className="
                line-clamp-2
                text-base
                font-semibold
                leading-6
                text-white
                sm:text-lg
              "
            >
              {courseEntireData?.courseName}
            </h2>

            <div
              className="
                mt-3
                flex
                items-center
                justify-between
                gap-2
              "
            >

              <p
                className="
                  text-xs
                  font-medium
                  text-gray-400
                  sm:text-sm
                "
              >
                {completedLectures?.length || 0} of{" "}
                {totalNoOfLectures || 0} lectures
              </p>

              <span
                className="
                  shrink-0
                  rounded-full
                  border
                  border-purple-500/20
                  bg-purple-500/10
                  px-2.5
                  py-1
                  text-[10px]
                  font-semibold
                  text-purple-300
                  sm:text-xs
                "
              >
                Progress - {totalNoOfLectures ? Math.round( ((completedLectures?.length || 0) / totalNoOfLectures) * 100 ) : 0} %
              </span>

            </div>

          </div>

        </div>

        {/* =================================================
            COURSE CONTENT
        ================================================= */}

        <div
          className="
            h-[calc(100%-145px)]
            overflow-y-auto
            px-2
            pb-5
            sm:px-3
          "
        >

          {courseSectionData?.map((section, index) => (

            <details
              key={section?._id || index}
              className="
                group
                overflow-hidden
                rounded-xl
              "
              open={index === 0}
            >

              {/* =================================================
                  SECTION
              ================================================= */}

              <summary
                className="
                  mt-2
                  flex
                  cursor-pointer
                  list-none
                  items-center
                  justify-between
                  gap-3
                  rounded-lg
                  border
                  border-white/10
                  bg-btn-secondary-hover
                  px-3
                  py-3
                  text-sm
                  font-semibold
                  text-gray-200
                  transition-all
                  duration-200
                  hover:border-purple-500/20
                  hover:bg-white/5
                  sm:px-4
                  [&::-webkit-details-marker]:hidden
                "
              >

                <span className="min-w-0 truncate">
                  Section {index + 1}:{" "}
                  {section?.sectionName}
                </span>

                <MdOutlineKeyboardArrowDown
                  className="
                    shrink-0
                    text-xl
                    text-gray-500
                    transition-transform
                    duration-300
                    group-open:rotate-180
                    group-hover:text-purple-300
                  "
                />

              </summary>

              {/* =================================================
                  SUBSECTIONS
              ================================================= */}

              <div className="mt-1">

                {section?.subsection?.length ? (

                  section?.subsection?.map((subsection, subIndex) => {

                    const isActive =
                      subsection?._id === videoActive

                    const isCompleted =
                      completedLectures?.includes(
                        subsection?._id
                      )

                    return (
                      <div
                        key={subsection?._id}
                        onClick={() =>
                          handleVideoClick(
                            section,
                            subsection
                          )
                        }
                        className={`
                          relative
                          flex
                          cursor-pointer
                          items-start
                          gap-3
                          rounded-lg
                          px-3
                          py-2.5
                          transition-all
                          duration-200

                          ${
                            isActive
                              ? "bg-purple-500/10"
                              : "hover:bg-white/5"
                          }
                        `}
                      >

                        {/* Active indicator */}

                        {isActive && (
                          <div
                            className="
                              absolute
                              left-0
                              top-1/2
                              h-7
                              w-1
                              -translate-y-1/2
                              rounded-r-full
                              bg-purple-500
                            "
                          />
                        )}

                        {/* Checkbox */}

                        <div className="mt-0.5 shrink-0">

                          <input
                            type="checkbox"
                            checked={isCompleted}
                            readOnly
                            className="
                              h-4
                              w-4
                              cursor-pointer
                              rounded
                              border-white/20
                              bg-btn-secondary-hover
                              accent-purple-500
                            "
                          />

                        </div>

                        {/* Lecture title */}

                        <div className="min-w-0 flex-1">

                          <p
                            className={`
                              text-xs
                              leading-5
                              sm:text-sm
                              ${
                                isActive
                                  ? "font-semibold text-purple-300"
                                  : "font-medium text-gray-400"
                              }
                            `}
                          >
                            <span
                              className={`
                                mr-1.5
                                ${
                                  isActive
                                    ? "text-purple-400"
                                    : "text-gray-600"
                                }
                              `}
                            >
                              {subIndex + 1}.
                            </span>

                            {subsection?.title}
                          </p>

                        </div>

                      </div>
                    )
                  })

                ) : (

                  <div
                    className="
                      mx-2
                      my-2
                      rounded-lg
                      border
                      border-dashed
                      border-white/10
                      px-3
                      py-4
                      text-center
                    "
                  >
                    <p className="text-xs text-gray-600">
                      No lectures in this section
                    </p>
                  </div>

                )}

              </div>

            </details>

          ))}

        </div>

      </aside>
    </>
  )
}

export default VideoDetailsSidebar