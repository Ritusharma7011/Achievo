import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from "../services/operations/authAPI";
import Loading from "../components/common/Loading";

function ResetPassword(){
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }
    

    return(
        <div className="min-h-[calc(100vh-7rem)] flex items-center justify-center px-4 py-10">
            {
                loading ? (
                    <Loading/>
                ) : (
                    <div className="
                    w-full
                    max-w-[450px]
                    rounded-2xl
                    border border-white/10
                    bg-white/3
                    px-5 py-8
                    sm:px-8 sm:py-10
                    shadow-2xl
                    ">
                    <div className="text-center">
                        <h1 className="
                            text-2xl
                            sm:text-3xl
                            font-semibold
                            text-white
                            ">
                            {
                                !emailSent ? "Reset your Password" : "Check your Email"
                            }
                        </h1>
                        <p className="
                            mt-3
                            text-sm
                            sm:text-[15px]
                            leading-6
                            text-gray-400
                            ">
                            {
                                !emailSent ? "Forgot your password? Don't worry, we'll email you instructions to reset your password" : `We have sent the reset email to ${email}`
                            }
                        </p>
                    </div>
                        
                        <form className="mt-7"
                            onSubmit={handleOnSubmit}
                        >
                            {
                                !emailSent && (
                                    <label htmlFor="email" 
                                        className="block"
                                        >
                                        <p className="
                                        mb-2
                                        text-sm
                                        font-medium
                                        text-gray-300
                                        ">Email Address <span className="ml-1 text-red-400">*</span> </p>
                                        <input type="email" 
                                        name="email" 
                                        id="email" 
                                        required
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        placeholder="Enter your Email Address" className="
                                        w-full
                                        rounded-xl
                                        border border-white/10
                                        bg-btn-secondary
                                        px-4 py-3
                                        text-sm
                                        text-white
                                        placeholder:text-gray-500
                                        outline-none
                                        transition-all
                                        duration-200
                                        focus:border-purple-500
                                        focus:ring-1
                                        focus:ring-purple-500
                                        "
                                        />
                                    </label>
                                )
                            }

                            <button type="submit"
                                className="
                                    mt-6
                                    w-full
                                    rounded-xl
                                    bg-btn-primary
                                    px-4 py-3
                                    text-sm
                                    sm:text-base
                                    font-medium
                                    text-white
                                    transition-all
                                    duration-300
                                    hover:bg-btn-primary-hover
                                    hover:scale-[1.01]
                                    active:scale-[0.99]
                                    cursor-pointer
                                ">
                                {
                                    !emailSent ? "Reset Password" : "Resend Email"
                                }
                            </button>
                        </form>

                        <div className="mt-6 flex justify-center">
                            <Link to={"/login"} className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                font-medium
                                text-gray-400
                                transition-colors
                                duration-200
                                hover:text-purple-400
                                ">
                                <FaLongArrowAltLeft className="text-base"/>
                                <p>Back to Log in</p> 
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default ResetPassword