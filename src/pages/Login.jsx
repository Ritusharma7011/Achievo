import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo/Logo - noBg A2.png";
import LoginForm from "../components/core/Auth/LoginForm";

function Login(){
    return(
        <div className="min-h-screen mx-5 py-17 flex flex-col items-center ">

            {/* Form */}
            <div className="w-full  max-w-[460px] rounded-2xl border border-badge-border bg-white/3 px-5 py-8 sm:px-8 md:px-10">
                <div className="flex flex-col items-center">
                    <h2 className="text-white text-[24px] sm:text-[26px] md:text-3xl font-semibold">Welcome Back</h2>
                    <p className="text-gray-400 text-sm sm:text-[15px] pt-2 ">Login to continue you learning journey</p>
                </div>

                <LoginForm/>
            </div>
        </div>
    )
}

export default Login;