// import { useEffect } from "react"
// import { useForm } from "react-hook-form"
// import { RxCross2 } from "react-icons/rx"
// import ReactStars from "react-rating-stars-component"
// import { useSelector } from "react-redux"

// import { createRating } from "../../../services/operations/courseDetailsAPI"
// import IconBtn from "../../common/IconBtn"

// export default function CourseReviewModal({ setReviewModal }) {
//   const { user } = useSelector((state) => state.profile)
//   const { token } = useSelector((state) => state.auth)
//   const { courseEntireData } = useSelector((state) => state.viewCourse)

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm()

//   useEffect(() => {
//     setValue("courseExperience", "")
//     setValue("courseRating", 0)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   const ratingChanged = (newRating) => {
//     // console.log(newRating)
//     setValue("courseRating", newRating)
//   }

//   const onSubmit = async (data) => {
//     await createRating(
//       {
//         courseId: courseEntireData._id,
//         rating: data.courseRating,
//         review: data.courseExperience,
//       },
//       token
//     )
//     setReviewModal(false)
//   }

//   return (
//     <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
//       <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
//         {/* Modal Header */}
//         <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
//           <p className="text-xl font-semibold text-richblack-5 uppercase">Add Review</p>
//           <button onClick={() => setReviewModal(false)}>
//             <RxCross2 className="text-2xl text-richblack-5" />
//           </button>
//         </div>
//         {/* Modal Body */}
//         <div className="p-6">
//           <div className="flex items-center justify-center gap-x-4">
//             <img
//               src={user?.image}
//               alt={user?.firstName + "profile"}
//               className="aspect-square w-[50px] rounded-full object-cover"
//             />
//             <div className="">
//               <p className="font-semibold text-richblack-5">
//                 {user?.firstName} {user?.lastName}
//               </p>
//               <p className="text-sm text-richblack-5">Posting Publicly</p>
//             </div>
//           </div>
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className="mt-6 flex flex-col items-center"
//           >
//             <ReactStars
//               count={5}
//               onChange={ratingChanged}
//               size={24}
//               activeColor="#ffd700"
//             />
//             <div className="flex w-11/12 flex-col space-y-2">
//               <label
//                 className="text-sm text-richblack-5"
//                 htmlFor="courseExperience"
//               >
//                 Add Your Experience <sup className="text-pink-200">*</sup>
//               </label>
//               <textarea
//                 id="courseExperience"
//                 placeholder="Add Your Experience"
//                 {...register("courseExperience", { required: true })}
//                 className="form-style resize-x-none min-h-[130px] w-full"
//               />
//               {errors.courseExperience && (
//                 <span className="ml-2 text-xs tracking-wide text-pink-200">
//                   Please Add Your Experience
//                 </span>
//               )}
//             </div>
//             <div className="mt-6 flex w-11/12 justify-end gap-x-2 items-baseline">
//               <button
//                 onClick={() => setReviewModal(false)}
//                 className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[4px] px-[20px] font-semibold text-richblack-900 uppercase`}
//               >
//                 Cancel
//               </button>
//               <button>
//                 <IconBtn text="Save" />
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

import React from "react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"
import { useSelector } from "react-redux"

import { createRating } from "../../../services/operations/courseDetailsAPI"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
  }, [setValue])

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )

    setReviewModal(false)
  }

  return (
    <div className="fixed inset-0 z-1000 grid place-items-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-[650px] overflow-hidden rounded-2xl border border-white/10 bg-btn-secondary shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-btn-secondary-hover px-4 py-4 sm:px-6">
          <p className="text-lg font-semibold text-white sm:text-xl">
            Add Review
          </p>

          <button
            onClick={() => setReviewModal(false)}
            className="rounded-lg p-2 text-gray-400 transition-all duration-200 hover:bg-white/5 hover:text-white"
          >
            <RxCross2 className="text-xl sm:text-2xl" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6">

          {/* User Info */}
          <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
            <img
              src={user?.image}
              alt={`${user?.firstName} profile`}
              className="h-14 w-14 rounded-full object-cover"
            />

            <div>
              <p className="font-semibold text-white">
                {user?.firstName} {user?.lastName}
              </p>

              <p className="text-sm text-gray-400">
                Posting Publicly
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col"
          >
            {/* Rating */}
            <div className="mb-6 flex justify-center">
              <ReactStars
                count={5}
                onChange={ratingChanged}
                size={30}
                activeColor="#facc15"
              />
            </div>

            {/* Review */}
            <div className="space-y-2">
              <label
                htmlFor="courseExperience"
                className="text-sm font-medium text-white"
              >
                Add Your Experience
                <span className="ml-1 text-red-400">*</span>
              </label>

              <textarea
                id="courseExperience"
                placeholder="Share your learning experience..."
                {...register("courseExperience", {
                  required: true,
                })}
                className="min-h-[140px] w-full rounded-xl border border-white/10 bg-btn-secondary-hover px-4 py-3 text-white outline-none transition-all duration-200 placeholder:text-gray-500 focus:border-purple-500"
              />

              {errors.courseExperience && (
                <p className="text-sm text-red-400">
                  Please add your experience
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="w-full rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-gray-300 transition-all duration-200 hover:bg-white/5 sm:w-auto"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-purple-700 sm:w-auto"
              >
                Save Review
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

