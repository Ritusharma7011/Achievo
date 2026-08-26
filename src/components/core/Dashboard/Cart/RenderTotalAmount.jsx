import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BuyCourse } from "../../../../services/operations/studentFeaturesAPI";

export default function RenderTotalAmount() {
    const { total, cart } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);

        BuyCourse(
            token,
            courses,
            user,
            navigate,
            dispatch
        );
    };

    return (
        <div className="w-full mt-4 rounded-2xl border border-[#2C2C2C] bg-[#161616] p-5 text-white shadow-lg sm:p-6">
            <p className="text-sm font-medium text-gray-400">
                Total Amount
            </p>

            <p className="mt-1 text-3xl font-bold text-purple-400">
                ₹ {total}
            </p>

            <div className="my-5 h-px w-full bg-[#2C2C2C]" />

            <button
                onClick={handleBuyCourse}
                disabled={!cart?.length}
                className="w-full rounded-xl cursor-pointer bg-purple-600 px-4 py-3 font-semibold text-white transition-all duration-200 hover:bg-purple-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
                Buy Now
            </button>
        </div>
    );
}