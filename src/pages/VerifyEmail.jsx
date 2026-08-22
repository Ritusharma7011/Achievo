import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/common/Loading";
import OTPInput from "react-otp-input";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signUp } from "../services/operations/authAPI";
import { sendOtp } from "../services/operations/authAPI";

function VerifyEmail(){
const {signupData, loading} = useSelector((state)=>state.auth);
const [otp, setOtp] = useState("");
const dispatch = useDispatch();
const navigate = useNavigate();

useEffect( ()=>{
    if(!signupData){
        navigate("/signup");
    }
})

const handleOnSubmit =(e) =>{
    e.preventDefault();

    const{
        accountType,
        firstName,
        lastName,
        email, 
        password,
        confirmPassword
    } = signupData

    dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword, otp, navigate));

}

return(
    <div className="
        min-h-[80vh]
        flex
        items-center
        justify-center
        px-4
        py-10
        text-white
        sm:px-6
    ">
        {
            loading ?
            (
                <Loading/>
            ) 
            :
            (
                <div className="
                    w-full
                    max-w-md
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/3
                    px-5
                    py-7
                    shadow-xl
                    backdrop-blur-sm
                    sm:px-8
                    sm:py-9
                ">

                    {/* Heading */}
                    <div className="mb-8 text-center">

                        <h1 className="
                            text-2xl
                            font-semibold
                            text-white
                            sm:text-3xl
                        ">
                            Verify Email
                        </h1>

                        <p className="
                            mt-3
                            text-sm
                            leading-6
                            text-gray-400
                            sm:text-[15px]
                        ">
                            A verification code has been sent to you at your email.
                            Enter the code below:
                        </p>

                        {
                            signupData?.email && (
                                <p className="
                                    mt-2
                                    break-all
                                    text-sm
                                    font-medium
                                    text-purple-400
                                ">
                                    {signupData.email}
                                </p>
                            )
                        }

                    </div>


                    {/* OTP Form */}
                    <form 
                        onSubmit={handleOnSubmit}
                        className="flex flex-col items-center"
                    >

                        <div className="
                            flex
                            w-full
                            justify-center
                            overflow-hidden
                            py-2
                        ">
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props)=> (
                                    <input
                                        {...props}
                                        className="
                                            h-11!
                                            w-9!
                                            rounded-lg
                                            border
                                            border-white/15
                                            bg-btn-secondary
                                            text-center
                                            text-lg
                                            font-semibold
                                            text-white
                                            outline-none
                                            transition-all
                                            duration-200
                                            focus:border-purple-500
                                            focus:ring-1
                                            focus:ring-purple-500/40
                                            sm:h-12!
                                            sm:w-12!
                                        "
                                    />
                                )}
                                containerStyle="
                                    flex
                                    justify-center
                                    gap-2
                                    sm:gap-3
                                "
                            />
                        </div>


                        {/* Verify Button */}
                        <button
                            type="submit"
                            className="
                                mt-6
                                w-full
                                rounded-xl
                                bg-btn-primary
                                px-4
                                py-3
                                text-sm
                                font-semibold
                                text-white
                                transition-all
                                duration-300
                                hover:bg-btn-primary-hover
                                hover:shadow-lg
                                hover:shadow-purple-500/20
                                hover:cursor-pointer
                                sm:text-[15px]
                            "
                        >
                            Verify Email
                        </button>

                    </form>


                    {/* Bottom Section */}
                    <div className="
                        mt-7
                        flex
                        items-center
                        justify-between
                        
                    ">

                        {/* Back to Login */}
                        <div className="flex justify-center">

                            <Link 
                                to={"/login"} 
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-medium
                                    text-gray-400
                                    transition-colors
                                    duration-200
                                    hover:text-purple-400
                                "
                            >
                                <FaLongArrowAltLeft className="text-base"/>
                                <p>Back to Log in</p> 
                            </Link>

                        </div>


                        {/* Resend OTP */}
                        <button
                            type="button"
                            onClick={()=> dispatch(sendOtp(signupData.email,navigate))}
                            className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                font-medium
                                text-gray-400
                                transition-colors
                                duration-200
                                hover:text-purple-400
                                hover:cursor-pointer
                            "
                        >
                            <FaClockRotateLeft className="text-base"/>
                            <p>Resend it</p>
                        </button>

                    </div>

                </div>
            )
        }
    </div>
)
}

export default VerifyEmail;