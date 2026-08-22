// import React from "react"

// export default function CourseCard() {
//   return (
//     <div className="text-white">
//         This is course card component
//     </div>
//   )
// }

import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

import GetAvgRating from "../../../utils/avgRating"
import RatingStars from "../../common/RatingStars"

function CourseCard({ course, Height = "h-[220px]" }) {
    console.log("COURSES IN SLIDER:", course)
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews || [])
    setAvgReviewCount(count)
  }, [course])

  return (
    <Link
      to={`/courses/${course?._id}`}
      className="group block h-full"
    >
      <div className="h-full overflow-hidden rounded-2xl border border-white/10 bg-[#15151b] transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10">

        {/* Thumbnail */}
        <div className="relative overflow-hidden">
          <img
            src={course?.thumbNail}
            alt={course?.courseName || "Course thumbnail"}
            className={`${Height} w-full object-cover transition duration-500`}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
        </div>

        {/* Course Information */}
        <div className="flex flex-col gap-2.5 p-4">

          {/* Course Name */}
          <h3 className="line-clamp-2 min-h-12 text-lg font-semibold leading-6 text-white transition-colors group-hover:text-purple-400">
            {course?.courseName}
          </h3>

          {/* Instructor */}
          <p className="truncate text-sm text-gray-400">
            {course?.instructor?.firstName}{" "}
            {course?.instructor?.lastName}
          </p>

          {/* Rating */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-yellow-400">
              {avgReviewCount ? avgReviewCount.toFixed(1) : "0"}
            </span>

            <RatingStars
              Review_Count={avgReviewCount}
            />

            <span className="text-xs text-gray-500">
              ({course?.ratingAndReviews?.length || 0})
            </span>
          </div>

          {/* Price */}
          <div className="pt-1">
            <span className="text-xl font-bold text-white">
              ₹{course?.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard