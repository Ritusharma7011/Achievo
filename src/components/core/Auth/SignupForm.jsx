import React from "react";

import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sendOtp } from "../../../services/operations/authAPI"
import { setSignupData } from "../../../slices/authSlice"



function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

    const [accountType, setAccountType] = useState("Student");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
    } = formData;

    const handleOnChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
        toast.error("Passwords Do Not Match");
        return;
        }

        const signupData = {
          ...formData,
          accountType,
        }

        dispatch(setSignupData(signupData))
        dispatch(sendOtp(formData.email,navigate))

        console.log({
        ...formData,
        accountType,
        });
    };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex flex-col gap-5"
    >
      {/* Tabs */}

      <div className="flex w-full rounded-full gap-1 p-1">
        <button
          type="button"
          onClick={() => setAccountType("Student")}
          className={`flex-1 rounded-full py-2.5 cursor-pointer text-sm sm:text-[15px] font-medium transition-all duration-300
            ${
              accountType === "Student"
                ? "bg-btn-primary text-white"
                : "bg-btn-secondary text-body "
            }`}
        >
          Student
        </button>

        <button
          type="button"
          onClick={() => setAccountType("Instructor")}
          className={`flex-1 rounded-full cursor-pointer py-2.5 text-sm sm:text-base font-medium transition-all duration-300
            ${
              accountType === "Instructor"
                ? "bg-btn-primary text-white"
                : "text-body bg-btn-secondary"
            }`}
        >
          Instructor
        </button>
      </div>

      {/* First Last Name */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <label>

          <p className="text-body text-sm mb-2">
            First Name <span className="text-red-400">*</span>
          </p>

          <input
            required
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleOnChange}
            placeholder="Enter first name"
            className="w-full rounded-xl border border-white/20 bg-btn-secondary px-4 py-3 text-white placeholder:text-gray-500 focus:border-btn-primary outline-none"
          />

        </label>

        <label>

          <p className="text-body text-sm mb-2">
            Last Name <span className="text-red-400">*</span>
          </p>

          <input
            required
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleOnChange}
            placeholder="Enter last name"
            className="w-full rounded-xl border border-white/20 bg-btn-secondary px-4 py-3 text-white placeholder:text-gray-500 focus:border-btn-primary outline-none"
          />

        </label>

      </div>

      {/* Email */}

      <label>

        <p className="text-body text-sm mb-2">
          Email Address <span className="text-red-400">*</span>
        </p>

        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="w-full rounded-xl border border-white/20 bg-btn-secondary px-4 py-3 text-white placeholder:text-gray-500 focus:border-btn-primary outline-none"
        />

      </label>

      {/* Passwords */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <label className="relative">

          <p className="text-body text-sm mb-2">
            Create Password <span className="text-red-400">*</span>
          </p>

          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter password"
            className="w-full rounded-xl border border-white/20 bg-btn-secondary px-4 py-3 pr-12 text-white placeholder:text-gray-500 focus:border-btn-primary outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-[68%] -translate-y-1/2"
          >
            {showPassword ? (
              <FaEyeSlash
                size={20}
                className="text-body hover:text-btn-primary cursor-pointer"
              />
            ) : (
              <FaEye
                size={20}
                className="text-body hover:text-btn-primary cursor-pointer"
              />
            )}
          </button>

        </label>

        <label className="relative">

          <p className="text-body text-sm mb-2">
            Confirm Password <span className="text-red-400">*</span>
          </p>

          <input
            required
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleOnChange}
            placeholder="Confirm password"
            className="w-full rounded-xl border border-white/20 bg-btn-secondary px-4 py-3 pr-12 text-white placeholder:text-gray-500 focus:border-btn-primary outline-none"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            className="absolute right-4 top-[68%] -translate-y-1/2"
          >
            {showConfirmPassword ? (
              <FaEyeSlash
                size={20}
                className="text-body hover:text-btn-primary cursor-pointer"
              />
            ) : (
              <FaEye
                size={20}
                className="text-body hover:text-btn-primary cursor-pointer"
              />
            )}
          </button>

        </label>

      </div>

      {/* Button */}

      <button
        type="submit"
        className="mt-2 w-full rounded-xl cursor-pointer bg-btn-primary py-3 text-white font-medium transition-all duration-300 hover:scale-[1.02]"
      >
        Create Account
      </button>

      {/* Footer */}

      <div className="text-center text-sm text-white/60">
        Already have an account?{" "}
        <a
          href="/login"
          className="text-btn-primary hover:underline"
        >
          Sign In
        </a>
      </div>
    </form>
  );
}

export default SignupForm