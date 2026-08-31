// // import React, { useEffect, useState } from "react";
// // import ReactStars from "react-rating-stars-component";
// // import { Swiper, SwiperSlide } from "swiper/react";
// // import "swiper/css";
// // import "swiper/css/free-mode";
// // import "swiper/css/pagination";
// // import "../../App.css";
// // import { FaStar } from "react-icons/fa";
// // import { Autoplay, FreeMode, Pagination } from "swiper/modules";
// // import { apiConnector } from "../../services/apiConnector";
// // import { ratingsEndpoints } from "../../services/apis";

// // function ReviewSlider() {
// //   const [reviews, setReviews] = useState([]);
// //   const truncateWords = 15;

// //   useEffect(() => {
// //     const fetchReviews = async () => {
// //       try {
// //         const { data } = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);
// //         console.log("Review Data: ",data);
// //         console.log("Review Data: ",data?.allReviews);
// //         if (data?.success) {
// //           setReviews(data?.allReviews);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching reviews: ", error);
// //       }
// //     };

// //     fetchReviews();
// //   }, []);

// //   return (
// //     <div className="text-white">
// //       <div className="my-[50px] h-[184px] max-w-[100vw] lg:max-w-maxContent p-1">
// //         <Swiper
// //           slidesPerView={reviews?.length < 2 ? reviews?.length % 2 : 2}
// //           spaceBetween={14}
// //           loop={true}
// //           freeMode={true}
// //           autoplay={{
// //             delay: 1000,
// //             disableOnInteraction: false,
// //           }}
// //           modules={[FreeMode, Pagination, Autoplay]}
// //           className="w-full"
// //         >
// //           {reviews?.map((review, index) => (
// //             <SwiperSlide key={index}>
// //               <div className="bg-btn-secondary p-4 text-richblack-25 rounded-lg">
// //                 <div className="flex items-center gap-4">
// //                   <img
// //                     src={review?.user?.image ? review?.user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
// //                     alt={`${review?.user?.firstName} ${review?.user?.lastName}`}
// //                     className="h-12 w-12 rounded-full object-cover"
// //                   />
// //                   <div className="flex flex-col">
// //                       <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
// //                       <h2 className="text-[12px] font-medium text-richblack-500">
// //                         {review?.course?.courseName}
// //                       </h2>
// //                     </div>
// //                 </div>
// //                 <p className="font-medium text-richblack-25">
// //                     {review?.review.split(" ").length > truncateWords
// //                       ? `${review?.review
// //                           .split(" ")
// //                           .slice(0, truncateWords)
// //                           .join(" ")} ...`
// //                       : `${review?.review}`}
// //                   </p>
// //                 <div className="flex items-center mt-3 gap-2">
// //                   <h3 className="font-semibold text-yellow-400">{review.rating.toFixed(1)}</h3>
// //                   <ReactStars
// //                     count={5}
// //                     value={review.rating}
// //                     size={20}
// //                     edit={false}
// //                     activeColor="#ffd700"
// //                     emptyIcon={<FaStar />}
// //                     fullIcon={<FaStar />}
// //                   />
// //                 </div>
// //               </div>
// //             </SwiperSlide>
// //           ))}
// //         </Swiper>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ReviewSlider;

// import React, { useEffect, useState } from "react";
// import ReactStars from "react-rating-stars-component";
// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/pagination";

// import "../../App.css";

// import { FaStar } from "react-icons/fa";
// import { Autoplay, FreeMode, Pagination } from "swiper/modules";

// import { apiConnector } from "../../services/apiConnector";
// import { ratingsEndpoints } from "../../services/apis";

// function ReviewSlider() {
//   const [reviews, setReviews] = useState([]);

//   const truncateWords = 15;

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const { data } = await apiConnector(
//           "GET",
//           ratingsEndpoints.REVIEWS_DETAILS_API
//         );

//         console.log("Review Data:", data);
//         console.log("All Reviews:", data?.allReviews);

//         if (data?.success) {
//           setReviews(data?.allReviews || []);
//         }
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       }
//     };

//     fetchReviews();
//   }, []);

//   return (
//     <section className="w-full text-white">
//       <div className="mx-auto w-full max-w-maxContent px-4 sm:px-6 lg:px-8">


//         {/* Reviews */}
//         <div className="relative pb-10">

//           {reviews.length > 0 ? (
//             <Swiper
//               slidesPerView={1}
//               spaceBetween={16}
//               loop={reviews.length > 4}
//               freeMode={false}
//               grabCursor={true}
//               allowTouchMove={true}
//               watchOverflow={true}
//               autoplay={{
//                 delay: 3500,
//                 disableOnInteraction: false,
//                 pauseOnMouseEnter: true,
//               }}
//               pagination={{
//                 clickable: true,
//                 dynamicBullets: true,
//               }}
//               breakpoints={{
//                 // Mobile
//                 0: {
//                   slidesPerView: 1,
//                   spaceBetween: 14,
//                 },

//                 // Small tablets / large phones
//                 640: {
//                   slidesPerView: 2,
//                   spaceBetween: 16,
//                 },

//                 // Desktop
//                 1024: {
//                   slidesPerView: 4,
//                   spaceBetween: 18,
//                 },
//               }}
//               modules={[FreeMode, Pagination, Autoplay]}
//               className="review-swiper !pb-10"
//             >
//               {reviews.map((review, index) => {
//                 const fullName = `${review?.user?.firstName || ""} ${
//                   review?.user?.lastName || ""
//                 }`.trim();

//                 const reviewText = review?.review || "";

//                 const truncatedReview =
//                   reviewText.split(" ").length > truncateWords
//                     ? `${reviewText
//                         .split(" ")
//                         .slice(0, truncateWords)
//                         .join(" ")} ...`
//                     : reviewText;

//                 return (
//                   <SwiperSlide key={review?._id || index} className="h-auto">
//                     <div
//                       className="
//                         flex
//                         h-[230px]
//                         w-full
//                         flex-col
//                         rounded-xl
//                         border
//                         border-white/10
//                         bg-btn-secondary
//                         p-4
//                         shadow-md
//                         transition-all
//                         duration-300
//                         hover:-translate-y-1
//                         hover:border-purple-500/30
//                         hover:shadow-lg
//                         sm:h-[235px]
//                         sm:p-5
//                       "
//                     >
//                       {/* User */}
//                       <div className="flex items-center gap-3">

//                         <img
//                           src={
//                             review?.user?.image
//                               ? review.user.image
//                               : `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
//                                   fullName || "User"
//                                 )}`
//                           }
//                           alt={fullName || "User"}
//                           className="
//                             h-11
//                             w-11
//                             shrink-0
//                             rounded-full
//                             border
//                             border-white/10
//                             object-cover
//                             sm:h-12
//                             sm:w-12
//                           "
//                         />

//                         <div className="min-w-0">
//                           <h3 className="truncate text-sm font-semibold text-white sm:text-[15px]">
//                             {fullName || "Anonymous User"}
//                           </h3>

//                           <p className="mt-0.5 truncate text-[11px] font-medium text-gray-500 sm:text-xs">
//                             {review?.course?.courseName || "Achievo Course"}
//                           </p>
//                         </div>
//                       </div>

//                       {/* Review */}
//                       <div className="mt-4 flex-1">
//                         <p className="line-clamp-5 text-sm leading-6 text-gray-300">
//                           "{truncatedReview}"
//                         </p>
//                       </div>

//                       {/* Rating */}
//                       <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
//                         <span className="text-sm font-semibold text-yellow-400">
//                           {Number(review?.rating || 0).toFixed(1)}
//                         </span>

//                         <ReactStars
//                           count={5}
//                           value={Number(review?.rating || 0)}
//                           size={17}
//                           edit={false}
//                           activeColor="#FACC15"
//                           emptyIcon={<FaStar />}
//                           fullIcon={<FaStar />}
//                         />
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 );
//               })}
//             </Swiper>
//           ) : (
//             <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-white/10 bg-btn-secondary">
//               <p className="text-sm text-gray-500">
//                 No reviews available yet.
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ReviewSlider;

import React, { useEffect, useRef, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "../../App.css";

import { FaStar } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const swiperRef = useRef(null);

  const truncateWords = 15;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );

        console.log("Review Data:", data);

        if (data?.success) {
          setReviews(data?.allReviews || []);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="w-full text-white">
      <div className="mx-auto w-11/12 max-w-maxContent px-4 py-6 sm:px-6 lg:px-8">
        {/* Slider wrapper */}
        <div className="relative">

          {/* LEFT BUTTON */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="
              absolute
              -left-7
              top-[50%]
              z-20
              hidden
              h-10
              w-10
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-btn-secondary
              text-gray-300
              shadow-lg
              transition-all
              duration-200
              hover:scale-110
              hover:border-purple-500/40
              hover:bg-purple-500/10
              hover:text-purple-300
              lg:flex
            "
            aria-label="Previous reviews"
          >
            <FaArrowLeft className="text-sm" />
          </button>

          {/* SWIPER */}
          {reviews.length > 0 ? (
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              slidesPerView={1}
              spaceBetween={16}
              loop={reviews.length > 4}
              grabCursor={true}
              allowTouchMove={true}
              watchOverflow={true}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 14,
                },

                640: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },

                1024: {
                  slidesPerView: 4,
                  spaceBetween: 18,
                },
              }}
              modules={[FreeMode, Pagination, Autoplay]}
              className="review-swiper"
            >
              {reviews.map((review, index) => {
                const fullName = `${review?.user?.firstName || ""} ${
                  review?.user?.lastName || ""
                }`.trim();

                const reviewText = review?.review || "";

                const truncatedReview =
                  reviewText.split(" ").length > truncateWords
                    ? `${reviewText
                        .split(" ")
                        .slice(0, truncateWords)
                        .join(" ")} ...`
                    : reviewText;

                return (
                  <SwiperSlide
                    key={review?._id || index}
                    className="h-auto"
                  >
                    <div
                      className="
                        flex
                        h-[230px]
                        w-full
                        flex-col
                        rounded-xl
                        border
                        border-white/10
                        bg-btn-secondary
                        p-4
                        shadow-md
                        transition-all
                        duration-300
                        hover:border-purple-500/30
                        hover:shadow-lg
                        sm:h-[235px]
                        sm:p-5
                      "
                    >
                      {/* User */}
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            review?.user?.image
                              ? review.user.image
                              : `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
                                  fullName || "User"
                                )}`
                          }
                          alt={fullName || "User"}
                          className="
                            h-11
                            w-11
                            shrink-0
                            rounded-full
                            border
                            border-white/10
                            object-cover
                            sm:h-12
                            sm:w-12
                          "
                        />

                        <div className="min-w-0">
                          <h3 className="truncate text-sm font-semibold text-white sm:text-[15px]">
                            {fullName || "Anonymous User"}
                          </h3>

                          <p className="mt-0.5 truncate text-[11px] font-medium text-gray-500 sm:text-xs">
                            {review?.course?.courseName || "Achievo Course"}
                          </p>
                        </div>
                      </div>

                      {/* Review */}
                      <div className="mt-4 flex-1">
                        <p className="line-clamp-5 text-sm leading-6 text-gray-300">
                          "{truncatedReview}"
                        </p>
                      </div>

                      {/* Rating */}
                      <div className="mt-3 flex items-center gap-2 border-t border-white/10 pt-3">
                        <span className="text-sm font-semibold text-yellow-400">
                          {Number(review?.rating || 0).toFixed(1)}
                        </span>

                        <ReactStars
                          count={5}
                          value={Number(review?.rating || 0)}
                          size={17}
                          edit={false}
                          activeColor="#FACC15"
                          emptyIcon={<FaStar />}
                          fullIcon={<FaStar />}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <div className="flex min-h-[180px] items-center justify-center rounded-xl border border-white/10 bg-btn-secondary">
              <p className="text-sm text-gray-500">
                No reviews available yet.
              </p>
            </div>
          )}

          {/* RIGHT BUTTON */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="
              absolute
              -right-7
              top-1/2
              z-20
              hidden
              h-10
              w-10
              translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-btn-secondary
              text-gray-300
              shadow-lg
              transition-all
              duration-200
              hover:scale-110
              hover:border-purple-500/40
              hover:bg-purple-500/10
              hover:text-purple-300
              lg:flex
            "
            aria-label="Next reviews"
          >
            <FaArrowRight className="text-sm" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ReviewSlider;
