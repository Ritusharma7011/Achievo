import React from "react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { RxCross2 } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice";
import IconBtn from "../../../../common/IconBtn"
import Upload from "../CourseInformationForm/Upload"

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm()

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title)
      setValue("lectureDesc", modalData.description)
      setValue("lectureVideo", modalData.videoUrl)
    }
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()

    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true
    }

    return false
  }

  const handleEditSubsection = async () => {
    const currentValues = getValues()
    const formData = new FormData()

    formData.append("sectionId", modalData.sectionId)
    formData.append("subsectionId", modalData._id)

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle)
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc)
    }

    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("videoFile", currentValues.lectureVideo)
    }

    setLoading(true)

    const result = await updateSubSection(formData, token)

    if (result) {
    const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId
        ? {
            ...section,
            subsection: section.subsection.map((subsection) =>
                subsection._id === result._id ? result : subsection
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

    setModalData(null)
    setLoading(false)
  }

  const onSubmit = async (data) => {
    if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        handleEditSubsection()
      }

      return
    }

    const formData = new FormData()

    formData.append("sectionId", modalData)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("videoFile", data.lectureVideo)

    setLoading(true)

    const result = await createSubSection(formData, token)

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      )

      const updatedCourse = {
        ...course,
        courseContent: updatedCourseContent,
      }

      dispatch(setCourse(updatedCourse))
    }

    setModalData(null)
    setLoading(false)
  }

  

  return (
    <div
      className="
        fixed
        inset-0
        z-1000
        mt-0!
        flex
        min-h-screen
        w-screen
        items-center
        justify-center
        overflow-y-auto
        bg-black/60
        px-3
        py-6
        backdrop-blur-sm
        sm:px-5
        sm:py-8
      "
    >
      <div
        className="
          my-auto
          w-full
          max-w-[700px]
          overflow-hidden
          rounded-xl
          border
          border-white/10
          bg-btn-secondary
          shadow-2xl
        "
      >
        {/* ================= HEADER ================= */}
        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            border-b
            border-white/10
            bg-btn-secondary-hover
            px-4
            py-4
            sm:px-6
            sm:py-5
          "
        >
          <div className="min-w-0">
            <p className="text-base font-semibold text-white sm:text-lg">
              {view && "Viewing"}
              {add && "Adding"}
              {edit && "Editing"} Lecture
            </p>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              {view
                ? "View lecture details"
                : edit
                ? "Update your lecture details"
                : "Add a new lecture to this section"}
            </p>
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={() => (!loading ? setModalData(null) : {})}
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-md
              text-gray-400
              transition
              hover:bg-white/10
              hover:text-white
              disabled:cursor-not-allowed
              disabled:opacity-40
              sm:h-9
              sm:w-9
            "
          >
            <RxCross2 className="text-xl sm:text-2xl" />
          </button>
        </div>

        {/* ================= FORM ================= */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            space-y-6
            px-4
            py-5
            sm:space-y-7
            sm:px-6
            sm:py-7
            md:px-8
            md:py-8
          "
        >
          {/* ================= VIDEO ================= */}
          <div
            className="
              rounded-lg
              border
              border-white/10
              bg-btn-secondary-hover/50
              p-3
              sm:p-4
            "
          >
            <Upload
              name="lectureVideo"
              label="Lecture Video"
              register={register}
              setValue={setValue}
              errors={errors}
              video={true}
              viewData={view ? modalData.videoUrl : null}
              editData={edit ? modalData.videoUrl : null}
            />
          </div>

          {/* ================= TITLE ================= */}
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium text-gray-200"
              htmlFor="lectureTitle"
            >
              Lecture Title{" "}
              {!view && (
                <sup className="text-red-400">*</sup>
              )}
            </label>

            <input
              disabled={view || loading}
              id="lectureTitle"
              placeholder="Enter lecture title"
              {...register("lectureTitle", { required: true })}
              className="
                w-full
                rounded-lg
                border
                border-white/10
                bg-btn-secondary-hover
                px-3
                py-2.5
                text-sm
                text-white
                placeholder:text-gray-500
                outline-none
                transition
                focus:border-gray-700
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:px-4
                sm:py-3
                sm:text-[15px]
              "
            />

            {errors.lectureTitle && (
              <span className="text-xs text-red-400">
                Lecture title is required
              </span>
            )}
          </div>

          {/* ================= DESCRIPTION ================= */}
          <div className="flex flex-col gap-2">
            <label
              className="text-sm font-medium text-gray-200"
              htmlFor="lectureDesc"
            >
              Lecture Description{" "}
              {!view && (
                <sup className="text-red-400">*</sup>
              )}
            </label>

            <textarea
              disabled={view || loading}
              id="lectureDesc"
              placeholder="Enter lecture description"
              rows={5}
              {...register("lectureDesc", { required: true })}
              className="
                min-h-[120px]
                w-full
                resize-y
                rounded-lg
                border
                border-white/10
                bg-btn-secondary-hover
                px-3
                py-2.5
                text-sm
                text-white
                placeholder:text-gray-500
                outline-none
                transition
                focus:border-gray-700
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:px-4
                sm:py-3
                sm:text-[15px]
              "
            />

            {errors.lectureDesc && (
              <span className="text-xs text-red-400">
                Lecture description is required
              </span>
            )}
          </div>

          {/* ================= ACTIONS ================= */}
          {!view && (
            <div
              className="
                flex
                flex-col-reverse
                gap-3
                border-t
                border-white/10
                pt-5
                sm:flex-row
                sm:justify-end
                sm:pt-6
              "
            >
              <button
                type="button"
                disabled={loading}
                onClick={() => setModalData(null)}
                className="
                  w-full
                  rounded-lg
                  border
                  border-white/10
                  bg-btn-secondary-hover
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-gray-300
                  transition
                  hover:bg-white/10
                  hover:text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  sm:w-auto
                "
              >
                Cancel
              </button>

              <div className="w-full sm:w-auto bg-btn-primary px-3 py-2 rounded-xl">
                <IconBtn
                  disabled={loading}
                  text={
                    loading
                      ? "Saving..."
                      : edit
                      ? "Save Changes"
                      : "Save Lecture"
                  }
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}