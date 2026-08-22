// import React from "react"
// import { HiOutlineVideoCamera } from "react-icons/hi"

// function CourseSubSectionAccordion({ subSec }) {
//   return (
//     <div className="text-white">
//       <div className="flex justify-between py-2">
//         <div className={`flex items-center gap-2`}>
//           <span>
//             <HiOutlineVideoCamera />
//           </span>
//           <p>{subSec?.title}</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CourseSubSectionAccordion

import React from "react"
import { HiOutlineVideoCamera } from "react-icons/hi"

function CourseSubSectionAccordion({ subSec }) {
    return (
        <div className="rounded-lg text-white transition-all duration-200 hover:bg-white/3">
            <div className="flex justify-between px-2 py-3 sm:px-3">
                <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-purple-500/10 text-purple-400">
                        <HiOutlineVideoCamera size={17} />
                    </span>

                    <p className="text-sm font-medium text-gray-300 sm:text-base">
                        {subSec?.title}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CourseSubSectionAccordion