
// import React from "react";
// import { useSelector } from "react-redux";
// import RenderCartCourses from "./RenderCartCourses";
// import RenderTotalAmount from "./RenderTotalAmount"

// export default function Cart(){
//     const {total, totalItems} = useSelector((state)=> state.cart);
//     return(
//         <div className="text-white">
//             <h1 className="text-2xl font-bold mb-5">Your Cart</h1>
//             <p className="text-gray-500 text-sm pb-2 font-semibold">{totalItems || 0} Courses in Cart</p>
//             {
//                 total > 0 ?
//                 (<div>
//                     <RenderCartCourses/>
//                     <RenderTotalAmount/>
//                 </div>)
//                 :(<p className="h-[50vh] text-2xl flex justify-center items-center text-gray-500 font-semibold ">
//                     Your Cart is Empty
//                 </p>)
//             }
//         </div>
//     )
// }

import React from "react";
import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

export default function Cart() {
    const { total, totalItems } = useSelector((state) => state.cart);

    return (
        <div className="min-h-screen w-full px-4 py-6 text-white sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold sm:text-3xl">
                    Your Cart
                </h1>

                <p className="mt-2 text-sm font-medium text-gray-400">
                    {totalItems || 0}{" "}
                    {totalItems === 1 ? "Course" : "Courses"} in Cart
                </p>
            </div>

            {total > 0 ? (
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                    {/* Cart Courses */}
                    <div className="w-full lg:flex-1">
                        <RenderCartCourses />
                    </div>

                    {/* Total */}
                    <div className="w-full lg:w-[280px] xl:w-[360px]">
                        <RenderTotalAmount />
                    </div>
                </div>
            ) : (
                /* Empty Cart */
                <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-[#2C2C2C] bg-[#161616] px-6 text-center">
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">
                        Your Cart is Empty
                    </h2>

                    <p className="mt-2 max-w-md text-sm text-gray-400 sm:text-base">
                        Looks like you haven't added any courses to your cart
                        yet.
                    </p>
                </div>
            )}
        </div>
    );
}