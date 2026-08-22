import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from "../components/common/Loading"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { resetPassword } from '../services/operations/authAPI';

function UpdatePassword(){
const [formData, setformData] = useState({
password : "",
confirmPassword : ""
})
const [showPassword, setShowPassword] = useState(false)
const [showConfirmPassword, setShowConfirmPassword] = useState(false)
const {loading} = useSelector( (state) => state.auth);
const dispatch = useDispatch();
const {password, confirmPassword} = formData;

const navigate = useNavigate();

const handleOnChange = (e) => {
    setformData( (prevData) => (
        {
            ...prevData,
            [e.target.name] : e.target.value
        }
    ))
}

const handleOnSubmit = (e) =>{
    e.preventDefault();
    const token = location.pathname.split('/').at(-1);
    dispatch(resetPassword(password, confirmPassword, token,navigate))
}

return(
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 text-white sm:px-6">

        {
            loading ? (
                <Loading/>
            ) : 
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
                    <div className="mb-7 text-center">

                        <h1 className="
                            text-2xl
                            font-semibold
                            text-white
                            sm:text-3xl
                        ">
                            Choose new Password
                        </h1>

                        <p className="
                            mt-2
                            text-sm
                            leading-6
                            text-gray-400
                            sm:text-[15px]
                        ">
                            Create your new password.
                        </p>

                    </div>

                    {/* Form */}
                    <form 
                        onSubmit={handleOnSubmit}
                        className="flex flex-col gap-5"
                    >

                        {/* New Password */}
                        <label 
                            htmlFor="password"
                            className="relative block"
                        >

                            <p className="
                                mb-2
                                text-sm
                                font-medium
                                text-gray-300
                            ">
                                New Password
                                <span className="ml-1 text-red-400">*</span>
                            </p>

                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                name='password'
                                value={password}
                                onChange={handleOnChange}
                                placeholder='Enter new password'
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/15
                                    bg-btn-secondary
                                    px-4
                                    py-3
                                    pr-11
                                    text-sm
                                    text-white
                                    outline-none
                                    transition-all
                                    duration-200
                                    placeholder:text-gray-500
                                    focus:border-purple-500
                                    focus:ring-1
                                    focus:ring-purple-500/40
                                "
                            />

                            <span 
                                onClick={()=> setShowPassword((prev) => !prev)}
                                className="
                                    absolute
                                    right-4
                                    bottom-3
                                    cursor-pointer
                                    text-gray-400
                                    transition-colors
                                    hover:text-btn-primary
                                "
                            >
                                {
                                    showPassword ? <FaEyeSlash size={18}/> : <FaEye size={18}/>
                                }
                            </span>

                        </label> 


                        {/* Confirm Password */}
                        <label 
                            htmlFor="confirmPassword"
                            className="relative block"
                        >

                            <p className="
                                mb-2
                                text-sm
                                font-medium
                                text-gray-300
                            ">
                                Confirm Password
                                <span className="ml-1 text-red-400">*</span>
                            </p>

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder='Confirm your password'
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/15
                                    bg-btn-secondary
                                    px-4
                                    py-3
                                    pr-11
                                    text-sm
                                    text-white
                                    outline-none
                                    transition-all
                                    duration-200
                                    placeholder:text-gray-500
                                    focus:border-purple-500
                                    focus:ring-1
                                    focus:ring-purple-500/40
                                "
                            />

                            <span 
                                onClick={()=> setShowConfirmPassword((prev) => !prev)}
                                className="
                                    absolute
                                    right-4
                                    bottom-3
                                    cursor-pointer
                                    text-gray-400
                                    transition-colors
                                   hover:text-btn-primary
                                "
                            >
                                {
                                    showConfirmPassword ? <FaEyeSlash size={18}/> : <FaEye size={18}/>
                                }
                            </span>

                        </label> 


                        {/* Submit Button */}
                        <button 
                            type='submit'
                            className="
                                mt-2
                                w-full
                                rounded-xl
                                bg-btn-primary
                                px-4
                                py-3
                                text-sm
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
                            Reset Password
                        </button>

                    </form>


                    {/* Back to Login */}
                    <div className="mt-7 flex justify-center">

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

                </div>
            )
        }

    </div>
)
}

export default UpdatePassword;