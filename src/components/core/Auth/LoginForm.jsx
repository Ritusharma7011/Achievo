import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login } from "../../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [currentTab, setCurrentTab] = useState("Student");

    const { email, password } = formData;

    const handleonClick = (tab) => {
        setCurrentTab(tab);
    };

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password, navigate)); 
    }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex flex-col gap-5"
    >
      {/* Student / Instructor Toggle */}

      {/* <div className="flex w-full rounded-full gap-1 p-1">
        <button
          type="button"
          onClick={() => handleonClick("Student")}
          className={`flex-1 rounded-full py-2.5 cursor-pointer text-sm sm:text-[15px] font-medium transition-all duration-300
            ${
              currentTab === "Student"
                ? "bg-btn-primary text-white"
                : "bg-btn-secondary text-body "
            }`}
        >
          Student
        </button>

        <button
          type="button"
          onClick={() => handleonClick("Instructor")}
          className={`flex-1 rounded-full cursor-pointer py-2.5 text-sm sm:text-base font-medium transition-all duration-300
            ${
              currentTab === "Instructor"
                ? "bg-btn-primary text-white"
                : "text-body bg-btn-secondary"
            }`}
        >
          Instructor
        </button>
      </div> */}

      {/* Email */}

      <label className="flex flex-col gap-2">
        <p className="text-body text-sm sm:text-[15px]">
          Email Address <span className="text-red-400">*</span>
        </p>

        <input
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          className="
            w-full
            rounded-xl
            border
            border-white/20
            bg-btn-secondary
            px-4
            py-3
            text-sm
            sm:text-base
            text-white
            placeholder:text-gray-500
            outline-none
            transition-all
            duration-300
            focus:border-btn-primary
            focus:ring-2
            focus:ring-btn-primary/20
          "
        />
      </label>

      {/* Password */}

      <label className="flex flex-col gap-2">

        <p className="text-body text-sm sm:text-[15px]">
          Password <span className="text-red-400">*</span>
        </p>

        <div className="relative">

          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter password"
            className="
              w-full
              rounded-xl
              border
              border-white/20
              bg-btn-secondary
              px-4
              py-3
              pr-12
              text-sm
              sm:text-base
              text-white
              placeholder:text-gray-500
              outline-none
              transition-all
              duration-300
              focus:border-btn-primary
              focus:ring-2
              focus:ring-btn-primary/20
            "
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-body
              hover:text-btn-primary
              transition-colors
              duration-300
              cursor-pointer
            "
          >
            {showPassword ? (
              <FaEyeSlash size={18} />
            ) : (
              <FaEye size={18} />
            )}
          </button>

        </div>

        <Link
          to="/forgot-password"
          className="
            ml-auto
            text-xs
            sm:text-sm
            text-btn-primary
            hover:text-purple-400
            transition-colors
          "
        >
          Forgot Password?
        </Link>

      </label>

      {/* Sign In */}

      <button
        type="submit"
        className="
          w-full
          rounded-xl
          bg-btn-primary
          cursor-pointer
          py-3
          text-sm
          sm:text-base
          text-white
          transition-all
          duration-300
          hover:scale-[1.02]
          hover:shadow-lg
          active:scale-100
        "
      >
        Sign In
      </button>

      {/* Bottom Text */}

      <div className="flex flex-wrap justify-center gap-1 text-center text-xs sm:text-sm text-white/60">
        <span>Don't have an account?</span>

        <Link
          to="/signup"
          className="font-medium text-btn-primary hover:underline"
        >
          Create Account
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;