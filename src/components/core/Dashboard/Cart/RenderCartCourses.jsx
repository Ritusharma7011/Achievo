import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from 'react-rating-stars-component';
import { FaStar } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { removeFromCart } from "../../../../slices/cartSlice";

function RenderCartCourses(){

    const {cart} = useSelector((state)=> state.cart);
    const dispatch = useDispatch();

    return(
        <div className="text-white">
            {
                cart.map((course, index)=>(
                    <div key={index}>
                        <div>
                            <img src={course?.thumbNail} alt="" />
                            <div>
                                <p>{course?.courseName}</p>
                                <p>{course?.category?.name}</p>
                                <div>
                                    <span>4.8</span>
                                    <ReactStars
                                        count={5}
                                        size={20}
                                        edit ={false}
                                        emptyIcon = {<FaStar/>} 
                                        fullIcon = {<FaStar/>} 
                                    />

                                    <span>{course?.ratingAndReviews?.length || 0} Ratings</span>

                                    
                                </div>
                            </div>
                        </div>

                        <div>
                            <button onClick={()=> dispatch(removeFromCart(course._id))}>
                                <MdDelete/>
                                <span>Remove</span>
                            </button>

                            <p>Rs. {course.price}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default RenderCartCourses;