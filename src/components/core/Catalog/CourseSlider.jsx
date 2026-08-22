import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import { FreeMode, Pagination } from "swiper/modules"

import CourseCard from "./CourseCard"

function CourseSlider({ courses }) {
    console.log("COURSES IN SLIDER:", courses)
  return (
    <>
      {courses?.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            480: {
              slidesPerView: 1.2,
              spaceBetween: 16,
            },

            640: {
              slidesPerView: 2,
              spaceBetween: 18,
            },

            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },

            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },

            1280: {
              slidesPerView: 3,
              spaceBetween: 28,
            },
          }}
          className="pb-10"
        >
          {courses.map((course, index) => (
            <SwiperSlide key={course?._id || index} className="h-auto">
              <CourseCard
                course={course}
                Height="h-[220px] sm:h-[230px] lg:h-[240px]"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="rounded-xl border border-white/10 bg-[#15151b] px-6 py-12 text-center">
          <p className="text-base font-medium text-gray-400">
            No courses available in this category.
          </p>
        </div>
      )}
    </>
  )
}

export default CourseSlider