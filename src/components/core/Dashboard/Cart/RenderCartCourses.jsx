// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ReactStars from 'react-rating-stars-component';
// import { FaStar } from "react-icons/fa6";
// import { MdDelete } from "react-icons/md";
// import { removeFromCart } from "../../../../slices/cartSlice";

// function RenderCartCourses(){

//     const {cart} = useSelector((state)=> state.cart);
//     const dispatch = useDispatch();

//     return(
//         <div className="text-white">
//             {
//                 cart.map((course, index)=>(
//                     <div 
//                     key={index}>
//                         <div>
//                             <img src={course?.thumbNail} alt="" />
//                             <div>
//                                 <p>{course?.courseName}</p>
//                                 <p>{course?.category?.name}</p>
//                                 <div>
//                                     <span>4.8</span>
//                                     <ReactStars
//     count={5}
//     size={25}
//     edit={false}
//     color="#6B7280"
//     activeColor="#ffd700"
// />

//                                     <span>{course?.ratingAndReviews?.length || 0} Ratings</span>

                                    
//                                 </div>
//                             </div>
//                         </div>

//                         <div>
//                             <button onClick={()=> dispatch(removeFromCart(course._id))}>
//                                 <MdDelete/>
//                                 <span>Remove</span>
//                             </button>

//                             <p>Rs. {course?.price}</p>
//                         </div>
//                     </div>
//                 ))
//             }
//         </div>
//     )
// }

// export default RenderCartCourses;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { MdDelete } from "react-icons/md";
import { removeFromCart } from "../../../../slices/cartSlice";

function RenderCartCourses() {
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <div className="flex flex-col gap-6">
            {cart.map((course) => (
                <div
                    key={course._id}
                    className="flex flex-col gap-5 rounded-xl border border-[#2C2C2C] bg-[#161616] p-4 transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 lg:flex-row lg:items-start lg:justify-between"
                >
                    {/* Left Section */}
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <img
                            src={course?.thumbNail}
                            alt={course?.courseName}
                            className="h-[180px] w-full rounded-lg object-cover sm:h-[140px] sm:w-[240px]"
                        />

                        <div className="flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-white">
                                    {course?.courseName}
                                </h3>

                                <p className="mt-1 text-sm text-gray-400">
                                    {course?.category?.name}
                                </p>

                                <p className="mt-4 text-[14px] text-gray-400">
                                    {course?.courseDescription}
                                </p>
                            </div>

                            <div className="mt-3 flex flex-wrap items-center gap-2">
                                <span className="font-semibold text-yellow-400">
                                    4.8
                                </span>

                                <ReactStars
                                    count={5}
                                    value={4.8}
                                    size={22}
                                    edit={false}
                                    activeColor="#FFD700"
                                />

                                <span className="text-sm text-gray-400">
                                    ({course?.ratingAndReviews?.length || 3} Ratings)
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-row items-center justify-between gap-4 lg:flex-col lg:items-end">
                        <button
                            onClick={() =>
                                dispatch(removeFromCart(course._id))
                            }
                            className="flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-red-400 transition-all duration-200 hover:bg-red-500/20"
                        >
                            <MdDelete className="text-lg" />
                            <span>Remove</span>
                        </button>

                        <p className="text-2xl font-bold text-purple-400">
                            ₹ {course?.price}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RenderCartCourses;