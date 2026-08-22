// import React, { useEffect, useState } from "react"
// import {
//   TiStarFullOutline,
//   TiStarHalfOutline,
//   TiStarOutline,
// } from "react-icons/ti"

// function RatingStars({ Review_Count, Star_Size }) {
//   const [starCount, SetStarCount] = useState({
//     full: 0,
//     half: 0,
//     empty: 0,
//   })

//   useEffect(() => {
//     const wholeStars = Math.floor(Review_Count) || 0
//     SetStarCount({
//       full: wholeStars,
//       half: Number.isInteger(Review_Count) ? 0 : 1,
//       empty: Number.isInteger(Review_Count) ? 5 - wholeStars : 4 - wholeStars,
//     })
//   }, [Review_Count])
//   return (
//     <div className="flex gap-1 text-yellow-100">
//       {[...new Array(starCount.full)].map((_, i) => {
//         return <TiStarFullOutline key={i} size={Star_Size || 20} />
//       })}
//       {[...new Array(starCount.half)].map((_, i) => {
//         return <TiStarHalfOutline key={i} size={Star_Size || 20} />
//       })}
//       {[...new Array(starCount.empty)].map((_, i) => {
//         return <TiStarOutline key={i} size={Star_Size || 20} />
//       })}
//     </div>
//   )
// }

// export default RatingStars

import React, { useEffect, useState } from "react"
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"

function RatingStars({ Review_Count = 0, Star_Size = 20 }) {
  const [starCount, setStarCount] = useState({
    full: 0,
    half: 0,
    empty: 5,
  })

  useEffect(() => {
    const rating = Number(Review_Count) || 0
    const wholeStars = Math.floor(rating)

    setStarCount({
      full: wholeStars,
      half: Number.isInteger(rating) ? 0 : 1,
      empty: Number.isInteger(rating)
        ? 5 - wholeStars
        : 4 - wholeStars,
    })
  }, [Review_Count])

  return (
    <div className="flex items-center gap-0.5 text-yellow-400">
      {[...Array(starCount.full)].map((_, i) => (
        <TiStarFullOutline
          key={`full-${i}`}
          size={Star_Size}
          className="drop-shadow-sm"
        />
      ))}

      {[...Array(starCount.half)].map((_, i) => (
        <TiStarHalfOutline
          key={`half-${i}`}
          size={Star_Size}
          className="drop-shadow-sm"
        />
      ))}

      {[...Array(starCount.empty)].map((_, i) => (
        <TiStarOutline
          key={`empty-${i}`}
          size={Star_Size}
          className="text-yellow-400/60"
        />
      ))}
    </div>
  )
}

export default RatingStars