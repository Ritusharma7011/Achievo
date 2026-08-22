import React from "react"
import { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import ConfirmationModal from "../../../../common/ConfirmationModal"
import SubSectionModal from "./SubSectionModal"

export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [addSubSection, setAddSubsection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [editSubSection, setEditSubSection] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleDeleleSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      // token,
    },token)

    if (result) {
      dispatch(setCourse(result))
    }

    setConfirmationModal(null)
  }

//   const handleDeleteSubSection = async (subsectionId, sectionId) => {
//     const result = await deleteSubSection({
//       subsectionId,
//       sectionId,
//       // token,
//     },token)

//     if (result) {
//   const updatedCourseContent = course.courseContent.map((section) =>
//     section._id === result._id
//       ? result
//       : section
//   )

//   const updatedCourse = {
//     ...course,
//     courseContent: updatedCourseContent,
//   }

//   dispatch(setCourse(updatedCourse))
// }

//     setConfirmationModal(null)
//   }

    const handleDeleteSubSection = async (subsectionId, sectionId) => {
		const result = await deleteSubSection(
			{
			subsectionId,
			sectionId,
			},
			token
		)

		if (result) {
			const updatedCourseContent = course.courseContent.map((section) =>
			section._id === sectionId
				? {
					...section,
					subsection: section.subsection.filter(
					(subsection) => subsection._id !== subsectionId
					),
				}
				: section
			)

			const updatedCourse = {
			...course,
			courseContent: updatedCourseContent,
			}

			dispatch(setCourse(updatedCourse))
		}

		setConfirmationModal(null)
	}

  return (
    <>
      <div
        className="w-full rounded-xl border border-white/10 bg-btn-secondary p-3 sm:p-4 md:p-5"
        id="nestedViewContainer"
      >
        {/* Course Sections */}
        <div className="flex flex-col gap-3">
          {course?.courseContent?.map((section, sectionIndex) => (
            <details
              key={section._id}
              open
              className="group overflow-hidden rounded-lg border border-white/10 bg-btn-secondary-hover"
            >
              {/*SECTION HEADER */}
              <summary
                className="
                  flex
                  min-h-[58px]
                  cursor-pointer
                  list-none
                  items-center
                  justify-between
                  gap-3
                  px-3
                  py-3
                  transition
                  hover:bg-white/3
                  sm:px-4
                "
              >
                {/* Left side */}
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-btn-primary/15">
                    <RxDropdownMenu className="text-base text-purple-300 sm:text-lg" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="hidden text-xs text-gray-500 sm:inline">
                        Section {sectionIndex + 1}
                      </span>

                      <p className="truncate text-sm font-semibold text-white sm:text-[15px]">
                        {section.sectionName}
                      </p>
                    </div>

                    <p className="mt-0.5 text-[11px] text-gray-500 sm:text-xs">
                      {section.subsection?.length || 0}{" "}
                      {section.subsection?.length === 1
                        ? "lecture"
                        : "lectures"}
                    </p>
                  </div>
                </div>

                {/* Right side */}
                <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                  {/* Edit */}
                  <button
                    type="button"
                    title="Edit section"
                    onClick={(e) => {
                      e.preventDefault()
                      handleChangeEditSectionName(
                        section._id,
                        section.sectionName
                      )
                    }}
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-md
                      text-gray-400
                      transition
                      hover:bg-white/10
                      hover:text-purple-300
                    "
                  >
                    <MdEdit className="text-base sm:text-lg" />
                  </button>

                  {/* Delete */}
                  <button
                    type="button"
                    title="Delete section"
                    onClick={(e) => {
                      e.preventDefault()

                      setConfirmationModal({
                        text1: "Delete this Section?",
                        text2:
                          "All the lectures in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () =>
                          handleDeleleSection(section._id),
                        btn2Handler: () =>
                          setConfirmationModal(null),
                      })
                    }}
                    className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-md
                      text-gray-400
                      transition
                      hover:bg-red-500/10
                      hover:text-red-400
                    "
                  >
                    <RiDeleteBin6Line className="text-base sm:text-lg" />
                  </button>

                  {/* Divider */}
                  <span className="mx-1 hidden h-5 w-px bg-white/10 sm:block" />

                  {/* Arrow */}
                  <AiFillCaretDown
                    className="
                      text-sm
                      text-gray-500
                      transition-transform
                      duration-200
                      group-open:rotate-180
                    "
                  />
                </div>
              </summary>

              {/* ================= LECTURES ================= */}
              <div className="border-t border-white/10 px-2 pb-3 pt-2 sm:px-4 sm:pb-4">
                {section.subsection?.length > 0 ? (
                  <div className="flex flex-col">
                    {section.subsection?.map((data, index) => (
                      <div
                        key={data?._id}
                        onClick={() => setViewSubSection(data)}
                        className="
                          group/lecture
                          flex
                          cursor-pointer
                          items-center
                          justify-between
                          gap-3
                          rounded-lg
                          px-2
                          py-2.5
                          transition
                          hover:bg-white/4
                          sm:px-3
                        "
                      >
                        {/* Lecture left */}
                        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/5">
                            <RxDropdownMenu className="text-sm text-gray-500" />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-xs font-medium text-gray-300 sm:text-sm">
                              <span className="mr-1.5 text-gray-600">
                                {index + 1}.
                              </span>

                              {data.title}
                            </p>
                          </div>
                        </div>

                        {/* Lecture actions */}
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="
                            flex
                            shrink-0
                            items-center
                            gap-1
                            opacity-100
                            transition
                            sm:opacity-0
                            sm:group-hover/lecture:opacity-100
                          "
                        >
                          {/* Edit lecture */}
                          <button
                            type="button"
                            title="Edit lecture"
                            onClick={() =>
                              setEditSubSection({
                                ...data,
                                sectionId: section._id,
                              })
                            }
                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-md
                              text-gray-500
                              transition
                              hover:bg-white/10
                              hover:text-purple-300
                            "
                          >
                            <MdEdit className="text-base" />
                          </button>

                          {/* Delete lecture */}
                          <button
                            type="button"
                            title="Delete lecture"
                            onClick={() =>
                              setConfirmationModal({
                                text1: "Delete this Lecture?",
                                text2:
                                  "This lecture will be permanently deleted",
                                btn1Text: "Delete",
                                btn2Text: "Cancel",
                                btn1Handler: () =>
                                  handleDeleteSubSection(
                                    data._id,
                                    section._id
                                  ),
                                btn2Handler: () =>
                                  setConfirmationModal(null),
                              })
                            }
                            className="
                              flex
                              h-8
                              w-8
                              items-center
                              justify-center
                              rounded-md
                              text-gray-500
                              transition
                              hover:bg-red-500/10
                              hover:text-red-400
                            "
                          >
                            <RiDeleteBin6Line className="text-base" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-white/10 px-3 py-5 text-center">
                    <p className="text-xs text-gray-500">
                      No lectures added yet
                    </p>
                  </div>
                )}

                {/* Add Lecture */}
                <button
                  type="button"
                  onClick={() => {
                      setAddSubsection(section._id)
                    }}
                  className="
                    mt-3
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-lg
                    border
                    border-dashed
                    border-purple-500/30
                    bg-purple-500/5
                    px-3
                    py-2.5
                    text-xs
                    font-medium
                    text-purple-300
                    transition
                    hover:border-purple-500/50
                    hover:bg-purple-500/10
                    hover:text-purple-200
                    sm:text-sm
                  "
                >
                  <FaPlus className="text-xs sm:text-sm" />
                  Add Lecture
                </button>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* ================= MODALS ================= */}

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : null}

      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : null}
    </>
  )
}