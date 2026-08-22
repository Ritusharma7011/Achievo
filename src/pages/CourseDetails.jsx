import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import ConfirmationModal from "../components/common/ConfirmationModal"
import Footer from "../components/common/Footer"
import RatingStars from "../components/common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { BuyCourse } from "../services/operations/studentFeaturesAPI"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"
import Loading from "../components/common/Loading"

function CourseDetails() {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { loading } = useSelector((state) => state.profile)
    const { paymentLoading } = useSelector((state) => state.course)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { courseId } = useParams()

    const [response, setResponse] = useState(null)
    const [confirmationModal, setConfirmationModal] = useState(null)

    useEffect(() => {
        ;(async () => {
            try {
                const res = await fetchCourseDetails(courseId)

                setResponse(res)
            } catch (error) {
                console.log("Could not fetch Course Details")
            }
        })()
    }, [courseId])

    const [avgReviewCount, setAvgReviewCount] = useState(0)

    useEffect(() => {
        const count = GetAvgRating(
            response?.courseDetails?.[0]?.ratingAndReviews
        )

        setAvgReviewCount(count)
    }, [response])

    const [isActive, setIsActive] = useState(Array(0))

    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id)
                ? isActive.concat([id])
                : isActive.filter((e) => e != id)
        )
    }

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)

    useEffect(() => {
        let lectures = 0

        response?.courseDetails?.[0]?.courseContent?.forEach((sec) => {
            lectures += sec.subsection.length || 0
        })

        setTotalNoOfLectures(lectures)
    }, [response])

    if (loading || !response) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-[#0f0f12]">
                <Loading/>
            </div>
        )
    }

    if (!response.success) {
        return <Error />
    }

    console.log("FULL RESPONSE AAGYAA :", response)
    // console.log("FULL RESPONSE AAGYAA :", response.data);
    // console.log("FULL RESPONSE AAGYAA :", response.data?.courseDetails);
    console.log("FULL RESPONSE AAGYAA :", response.courseDetails[0])

    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbNail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = response?.courseDetails?.[0]

    const handleBuyCourse = () => {
        if (token) {
            BuyCourse(token, [courseId], user, navigate, dispatch)
            return
        }

        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to Purchase Course.",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    if (paymentLoading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-[#0f0f12]">
                <Loading/>
            </div>
        )
    }

    return (
        <>
            <div className="relative w-full bg-purple-400/10 text-white">

                {/* Hero Section */}

                <div className="relative mx-auto box-content px-4 sm:px-6 xl:w-[1260px]">

                    <div className="mx-auto grid min-h-[450px] max-w-max justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-3 xl:max-w-[810px]">

                        {/* Mobile Thumbnail */}

                        <div className="relative block w-full overflow-hidden rounded-2xl border border-white/10 bg-[#18181d] shadow-2xl lg:hidden">
                            <div className="absolute inset-0 z-10 bg-linear-to-t from-[#0f0f12] via-transparent to-transparent"></div>

                            <img
                                src={thumbNail}
                                alt="course thumbnail"
                                className="aspect-video w-full object-cover"
                            />
                        </div>

                        <div
                            className={`z-30 my-5 flex w-full flex-col justify-center gap-5 py-5 text-lg `}
                        >
                            <div>
                                <p className="text-center text-3xl font-bold leading-tight tracking-wide text-white sm:text-4xl lg:text-left lg:text-[42px]">
                                    {courseName}
                                </p>
                            </div>

                            <div className="text-center text-sm leading-7 text-gray-400 sm:text-base lg:text-left">
                                <ul className="space-y-1">
                                    {courseDescription
                                        .split("\n")
                                        .map((line, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start"
                                            >
                                                <span className="mr-2 text-purple-400">
                                                    {index + 1}.
                                                </span>

                                                <span>
                                                    {line
                                                        .trim()
                                                        .substring(
                                                            line.indexOf(".") + 1
                                                        )
                                                        .trim()}
                                                </span>
                                            </li>
                                        ))}
                                </ul>
                            </div>

                            <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-0 text-sm lg:justify-start">
                                <span className="font-semibold text-[22px]  text-yellow-400">
                                    {avgReviewCount}
                                </span>

                                <RatingStars
                                    Review_Count={avgReviewCount}
                                    Star_Size={24}
                                />

                                <span className="text-gray-400">
                                    {`(${ratingAndReviews.length} reviews)`}
                                </span>

                                <span className="text-gray-400">
                                    {`${studentsEnrolled.length} students enrolled`}
                                </span>
                            </div>

                            <div>
                                <p className="text-center text-sm text-gray-400 lg:text-left">
                                    Created By{" "}
                                    <span className="font-semibold text-white">
                                        {`${instructor.firstName} ${instructor.lastName}`}
                                    </span>
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 lg:justify-start">
                                <p className="flex items-center gap-2">
                                    <BiInfoCircle className="text-purple-400" />
                                    Created at {formatDate(createdAt)}
                                </p>

                                <p className="flex items-center gap-2">
                                    <HiOutlineGlobeAlt className="text-purple-400" />
                                    English
                                </p>
                            </div>
                        </div>

                        {/* Mobile Purchase Section */}

                        <div className="flex w-full flex-col gap-4 rounded-2xl border border-white/10 bg-[#17171c] p-5 shadow-xl lg:hidden">
                            <p className="pb-1 text-3xl font-bold text-white">
                                Rs. {price}
                            </p>

                            <button
                                className="yellowButton bg-btn-primary rounded-md p-2 w-full transition-all duration-200 hover:scale-[1.01]"
                                onClick={handleBuyCourse}
                            >
                                Buy Now
                            </button>

                            <button className="blackButton w-full rounded-md p-2 border border-white/10 transition-all duration-200 hover:border-purple-500">
                                Add to Cart
                            </button>
                        </div>
                    </div>

                    {/* Courses Card */}

                    <div className="absolute right-4 top-8 hidden w-[380px] max-w-[calc(100%-2rem)] lg:block xl:right-0">
                        <CourseDetailsCard
                            course={response?.courseDetails?.[0]}
                            setConfirmationModal={setConfirmationModal}
                            handleBuyCourse={handleBuyCourse}
                        />
                    </div>
                </div>
            </div>

            <div className="mx-auto box-content px-4 py-4 text-start sm:px-6 lg:w-[1260px] lg:px-6">
                <div className="mx-auto max-w-maxContentTab lg:mx-0 md:max-w-[810px]">

                    {/* What will you learn section */}

                    <div className="my-8 rounded-2xl border border-white/10 bg-[#15151a] p-5 shadow-lg sm:p-8">
                        <p className="text-2xl font-bold tracking-wide text-white sm:text-3xl">
                            What you'll Learn?
                        </p>

                        <div className="mt-5">
                            <ul className="space-y-2 leading-relaxed text-sm text-gray-300 sm:text-base">
                                {whatYouWillLearn
                                    .split("\n")
                                    .map((line, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start"
                                        >
                                            <span className="mr-2 min-w-fit font-semibold text-purple-400">
                                                {index + 1}.
                                            </span>

                                            <span>
                                                {line
                                                    .trim()
                                                    .substring(
                                                        line.indexOf(".") + 1
                                                    )
                                                    .trim()}
                                            </span>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>

                    {/* Course Content Section */}

                    <div className="max-w-[830px]">
                        <div className="flex flex-col gap-4">
                            <p className="text-2xl font-bold tracking-wide text-white sm:text-[28px]">
                                Course Content
                            </p>

                            <div className="flex flex-col justify-between gap-3 text-sm text-gray-400 sm:flex-row sm:flex-wrap">
                                <div className="flex flex-wrap gap-3 tracking-wide">
                                    <span>
                                        {courseContent.length} {`section(s)`}
                                    </span>

                                    <span>•</span>

                                    <span>
                                        {totalNoOfLectures} {`lecture(s)`}
                                    </span>

                                    {/* <span>{response.data?.totalDuration}</span> */}
                                </div>

                                <div>
                                    <button
                                        className="text-sm font-medium text-purple-400 transition hover:text-purple-300"
                                        onClick={() => setIsActive([])}
                                    >
                                        Collapse all sections
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Course Details Accordion */}

                        <div className="space-y-3 py-5">
                            {courseContent?.map((course, index) => (
                                <CourseAccordionBar
                                    course={course}
                                    key={index}
                                    isActive={isActive}
                                    handleActive={handleActive}
                                />
                            ))}
                        </div>

                        {/* Author Details */}

                        <div className="mb-12 mt-8 rounded-2xl border border-white/10 bg-[#15151a] p-5 sm:p-7">
                            <p className="text-2xl font-bold text-white sm:text-[28px]">
                                Author
                            </p>

                            <div className="flex items-center gap-4 py-5">
                                <img
                                    src={
                                        instructor.image
                                            ? instructor.image
                                            : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                                    }
                                    alt="Author"
                                    className="h-14 w-14 rounded-full border border-purple-500/30 object-cover sm:h-16 sm:w-16"
                                />

                                <p className="text-base font-semibold text-white sm:text-lg">
                                    {`${instructor.firstName} ${instructor.lastName}`}
                                </p>
                            </div>

                            <p className="text-sm leading-7 text-gray-400 sm:text-base">
                                {instructor?.additionalDetails?.about}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {confirmationModal && (
                <ConfirmationModal modalData={confirmationModal} />
            )}
        </>
    )
}

export default CourseDetails