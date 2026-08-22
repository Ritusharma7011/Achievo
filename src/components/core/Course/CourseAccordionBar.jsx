// import React from "react"
// import { useEffect, useRef, useState } from "react"
// import { AiOutlineDown } from "react-icons/ai"

// import CourseSubSectionAccordion from "./‎CourseSubSectionAccordion"

// export default function CourseAccordionBar({ course, isActive, handleActive }) {
//     const contentEl = useRef(null)


//     const [active, setActive] = useState(false)
//     useEffect(() => {
//         setActive(isActive?.includes(course._id))
//     }, [isActive])
//     const [sectionHeight, setSectionHeight] = useState(0)
//     useEffect(() => {
//         setSectionHeight(active ? contentEl.current.scrollHeight : 0)
//     }, [active])

//     return (
//         <div className="text-white overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0">
//         <div>
//             <div
//             className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]`}
//             onClick={() => {
//                 handleActive(course._id)
//             }}
//             >
//             <div className="flex items-center gap-2">
//                 <i
//                 className={
//                     isActive.includes(course._id) ? "rotate-180" : "rotate-0"
//                 }
//                 >
//                 <AiOutlineDown />
//                 </i>
//                 <p>{course?.sectionName}</p>
//             </div>
//             <div className="space-x-4">
//                 <span className="text-yellow-25">
//                 {`${course.subsection.length || 0} lecture(s)`}
//                 </span>
//             </div>
//             </div>
//         </div>
//         <div
//             ref={contentEl}
//             className={`relative h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}
//             style={{
//             height: sectionHeight,
//             }}
//         >
//             <div className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold">
//             {course?.subsection?.map((subSec, i) => {
//                 return <CourseSubSectionAccordion subSec={subSec} key={i} />
//             })}
//             </div>
//         </div>
//         </div>
//     )
// }

import React from "react"
import { useEffect, useRef, useState } from "react"
import { AiOutlineDown } from "react-icons/ai"

import CourseSubSectionAccordion from "./‎CourseSubSectionAccordion"

export default function CourseAccordionBar({
    course,
    isActive,
    handleActive,
}) {
    const contentEl = useRef(null)

    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(isActive?.includes(course._id))
    }, [isActive])

    const [sectionHeight, setSectionHeight] = useState(0)

    useEffect(() => {
        if (contentEl.current) {
            setSectionHeight(
                active ? contentEl.current.scrollHeight : 0
            )
        }
    }, [active])

    return (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#17171c] text-white transition-all duration-200 hover:border-purple-500/30">

            <div>
                <div
                    className="flex cursor-pointer items-center justify-between gap-4 px-4 py-5 transition-all duration-200 hover:bg-white/3 sm:px-6"
                    onClick={() => {
                        handleActive(course._id)
                    }}
                >
                    <div className="flex min-w-0 items-center gap-3">
                        <i
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-400 transition-transform duration-300 ${
                                isActive.includes(course._id)
                                    ? "rotate-180"
                                    : "rotate-0"
                            }`}
                        >
                            <AiOutlineDown size={15} />
                        </i>

                        <p className="truncate text-sm font-semibold text-white sm:text-base">
                            {course?.sectionName}
                        </p>
                    </div>

                    <div className="shrink-0">
                        <span className="rounded-full bg-purple-500/10 px-3 py-1.5 text-xs font-medium text-purple-400 sm:text-sm">
                            {`${course?.subsection?.length || 0} lecture(s)`}
                        </span>
                    </div>
                </div>
            </div>

            <div
                ref={contentEl}
                className="relative h-0 overflow-hidden bg-[#101014] transition-[height] duration-[0.35s] ease-[ease]"
                style={{
                    height: sectionHeight,
                }}
            >
                <div className="flex flex-col gap-1 border-t border-white/5 px-5 py-4 sm:px-7 sm:py-5">
                    {course?.subsection?.map((subSec, i) => {
                        return (
                            <CourseSubSectionAccordion
                                subSec={subSec}
                                key={i}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}