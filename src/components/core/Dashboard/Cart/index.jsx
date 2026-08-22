
import React from "react";
import { useSelector } from "react-redux";

export default function Cart(){
    const {total, totalItems} = useSelector((state)=> state.auth);

    return(
        <div className="text-white">
            <h1 className="text-2xl font-bold mb-5">Your Cart</h1>
            <p className="text-gray-500 text-sm pb-2 font-semibold">{totalItems || 0} Courses in Cart</p>
            {
                total > 0 ?
                (<div>
                    <RenderCartCourses/>
                    <RenderTotalAmount/>
                </div>)
                :(<p className="h-[50vh] text-2xl flex justify-center items-center text-gray-500 font-semibold ">
                    Your Cart is Empty
                </p>)
            }
        </div>
    )
}