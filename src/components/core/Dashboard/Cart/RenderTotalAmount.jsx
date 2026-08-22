import React from "react";
import { useSelector } from "react-redux";

export default function RenderTotalAmount(){
    const {total} = useSelector((state)=>state.cart);

    const handleBuyCourse = ()=>{
        const courses = cart.map((course) => course._id);
        console.log("Bought these courses: ", courses);
        //TODO: API integrate -> payment gateway tak lete jayegi
    }

    return(
        <div className="text-white">
            <p>Total:</p>
            <p>Rs {total}</p>

            <button onClick={handleBuyCourse}>
                Buy Now
            </button>
        </div>
    )
}