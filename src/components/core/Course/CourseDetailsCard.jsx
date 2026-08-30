// 

import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"

function CourseDetailsCard({
    course,
    setConfirmationModal,
    handleBuyCourse,
}) {
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        thumbNail: ThumbnailImage,
        price: CurrentPrice,
        _id: courseId,
    } = course

    const handleShare = () => {
        copy(window.location.href)
        toast.success("Link copied to Clipboard")
    }

    const handleAddToCart = () => {
        if (
            user &&
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR
        ) {
            toast.error(
                "You are an Instructor. You can't buy a course."
            )
            return
        }

        if (token) {
            dispatch(addToCart(course))
            return
        }

        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to add To Cart",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    return (
        <>
            <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#17171c] p-4 text-richblack-5 shadow-2xl shadow-black/30">

                {/* Course Image */}

                <div className="group overflow-hidden rounded-xl">
                    <img
                        src={ThumbnailImage}
                        alt={course?.courseName}
                        className="max-h-[300px] min-h-[180px] w-full overflow-hidden rounded-xl object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                </div>

                <div className="px-2 sm:px-3">
                    <div className="pb-5 text-3xl font-bold text-white">
                        Rs. {CurrentPrice}
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            className="yellowButton w-full bg-btn-primary p-2 rounded-md cursor-pointer transition-all duration-200 hover:scale-[1.01]"
                            onClick={
                                user &&
                                course?.studentsEnrolled.includes(
                                    user?._id
                                )
                                    ? () =>
                                          navigate(
                                            //   "/dashboard/enrolled-courses"
                                            ""
                                          )
                                    : handleBuyCourse
                            }
                        >
                            {user &&
                            course?.studentsEnrolled.includes(
                                user?._id
                            )
                                ? "Go To Course"
                                : "Buy Now"}
                        </button>

                        {(!user ||
                            !course?.studentsEnrolled.includes(
                                user?._id
                            )) && (
                            <button
                                onClick={handleAddToCart}
                                className="blackButton w-full border rounded-md px-2 py-2 border-white/10 transition-all duration-200 hover:border-purple-500"
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>

                    <div>
                        <p className="pb-4 pt-6 text-center text-xs text-gray-500">
                            30-Day Money-Back Guarantee
                        </p>
                    </div>

                    <div>
                        <p className="my-1 text-lg font-semibold text-white">
                            Pre - Requisite :
                        </p>

                        <div className="flex flex-col gap-3 text-sm text-gray-400">
                            {course?.instructions?.map((item, i) => {
                                return (
                                    <p
                                        className="flex items-start gap-2"
                                        key={i}
                                    >
                                        <BsFillCaretRightFill className="mt-1 shrink-0 text-purple-400" />

                                        <span>{item}</span>
                                    </p>
                                )
                            })}
                        </div>
                    </div>

                    <div className="mt-0 border-t border-white/5 text-center">
                        <button
                            className="mx-auto flex items-center gap-2 py-5 text-sm font-medium text-purple-400 transition hover:text-purple-300"
                            onClick={handleShare}
                        >
                            <FaShareSquare size={15} />
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseDetailsCard