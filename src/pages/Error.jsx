import React from "react";
import { Link } from "react-router-dom";

function Error() {
    return (
        <div className="min-h-[83vh] w-full bg-[#07070B] flex items-center justify-center px-4">

            <div className="w-full max-w-[550px] text-center">

                {/* Error Code */}
                <h1 className="text-[120px] sm:text-[150px] font-extrabold leading-none
                    bg-linear-to-r from-purple-500 via-violet-500 to-fuchsia-500
                    bg-clip-text text-transparent">
                    404
                </h1>

                {/* Heading */}
                <h2 className="mt-4 text-3xl sm:text-4xl font-semibold text-white">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="mt-4 text-gray-400 text-sm sm:text-base leading-6 max-w-md mx-auto">
                    Oops! The page you're looking for doesn't exist or may have
                    been moved somewhere else.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">

                    <Link
                        to="/"
                        className="
                            w-full sm:w-auto
                            rounded-lg
                            bg-btn-primary
                            px-7 py-3
                            text-white
                            font-medium
                            transition-all duration-300
                            hover:bg-btn-primary-hover
                            hover:scale-105
                        "
                    >
                        Back to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="
                            w-full hover:cursor-pointer sm:w-auto
                            rounded-lg
                            border border-white/20
                            bg-btn-secondary
                            px-7 py-3
                            text-white
                            font-medium
                            transition-all duration-300
                            hover:bg-btn-secondary-hover
                            hover:scale-105
                        "
                    >
                        Go Back
                    </button>

                </div>

                {/* Small Branding */}
                <p className="mt-12 text-sm text-gray-500">
                    Lost your way?{" "}
                    <Link
                        to="/"
                        className="text-purple-500 hover:text-purple-400 transition"
                    >
                        Let Achievo guide you home.
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Error;