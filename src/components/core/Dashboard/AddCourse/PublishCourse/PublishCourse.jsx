import React from "react";

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI"
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"

export default function PublishCourse() {
    const { register, handleSubmit, setValue, getValues } = useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED) {
        setValue("public", true)
        }
    }, [course, setValue])

    const goBack = () => {
        dispatch(setStep(2))
    }

    const goToCourses = () => {
        dispatch(resetCourseState())
        navigate("/dashboard/my-courses")
    }

    const handleCoursePublish = async () => {
        // check if form has been updated or not
        if (
        (course?.status === COURSE_STATUS.PUBLISHED &&
            getValues("public") === true) ||
        (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
        ) {
        // form has not been updated
        // no need to make api call
        goToCourses()
        return
        }
        const formData = new FormData()
        formData.append("courseId", course._id)
        const courseStatus = getValues("public")
        ? COURSE_STATUS.PUBLISHED
        : COURSE_STATUS.DRAFT
        formData.append("status", courseStatus)
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        if (result) {
        goToCourses()
        }
        setLoading(false)
    }

    const onSubmit = (data) => {
        // console.log(data)
        handleCoursePublish()
}

  return (
  <div className="w-full rounded-xl border border-white/10 bg-btn-secondary p-4 shadow-xl sm:p-6 md:p-8">
    {/* Header */}
    <div className="mb-6 border-b border-white/10 pb-5 sm:mb-8 sm:pb-6">
      <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
        Publish Settings
      </p>

      <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
        Choose whether you want to make your course publicly available to
        learners.
      </p>
    </div>

    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Publish option */}
      <div
        className="
          rounded-xl
          border border-white/10
          bg-btn-secondary-hover/50
          p-4
          transition
          hover:border-white/15
          sm:p-5
          md:p-6
        "
      >
        <label
          htmlFor="public"
          className="flex cursor-pointer items-start gap-3 sm:gap-4"
        >
          {/* Checkbox */}
          <input
            type="checkbox"
            id="public"
            {...register("public")}
            className="
              mt-0.5
              h-4
              w-4
              shrink-0
              cursor-pointer
              appearance-none
              rounded
              border
              border-white/20
              bg-btn-secondary
              transition
              checked:border-purple-500
              checked:bg-purple-500
              focus:outline-none
              focus:ring-2
              focus:ring-purple-500/30
              sm:h-5
              sm:w-5
            "
          />

          <div className="min-w-0">
            <p className="text-sm font-semibold text-white sm:text-[15px]">
              Make this course public
            </p>

            <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
              Published courses can be discovered and accessed by learners on
              Achievo.
            </p>
          </div>
        </label>
      </div>

      {/* Buttons */}
      <div
        className="
          mt-6
          flex
          flex-col-reverse
          gap-3
          border-t
          border-white/10
          pt-5
          sm:mt-8
          sm:flex-row
          sm:justify-end
          sm:pt-6
        "
      >
        <button
          disabled={loading}
          type="button"
          onClick={goBack}
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
            hover:border-white/20
            hover:bg-white/5
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-50
            sm:w-auto
          "
        >
          Back
        </button>

        <div className="w-full flex items-center justify-center px-3 py-2 bg-btn-primary rounded-xl sm:w-auto">
          <IconBtn
            disabled={loading}
            text={loading ? "Saving..." : "Save Changes"}
          />
        </div>
      </div>
    </form>
  </div>
)
}

