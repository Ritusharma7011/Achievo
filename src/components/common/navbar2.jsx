import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { ImMenu3 } from "react-icons/im";
import logo from "../../assets/Logo/Logo - noBg A2.png"

function navbar2() {

  const [open, setOpen] = useState(false);

  const navLinks = [
    "Home",
    "Categories",
    "About Us",
    "Contact Us"
  ];

  return (
    <header className="sticky top-0 z-50 border-b mb-5 border-white/10 backdrop-blur-xl bg-[#090312]/80">

      <div className="w-11/12 max-w-7xl h-20 mx-auto flex items-center justify-between">

        {/* Logo */}

        <Link to="/" className="flex items-center">

          <img
            src={logo}
            alt="logo"
            className="h-23 bg-[#090312]/80"
          />

          <span className="text-white text-4xl font-bold">
            Achievo
          </span>

        </Link>

        {/* Desktop Nav */}

        <nav className="hidden lg:flex items-center gap-9">

          {
            navLinks.map((item) => (

              <Link
                key={item}
                to="/"
                className="relative text-body hover:text-white transition duration-300 after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-0 after:bg-primary-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </Link>

            ))
          }

        </nav>

        {/* Right Side */}

        <div className="hidden lg:flex items-center gap-4">

          <Link
            to="/login"
            className="text-body hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-btn-primary hover:bg-btn-primary-hover px-5 py-2.5 text-white font-medium transition-all duration-300 hover:scale-105"
          >
            Sign Up
          </Link>

        </div>

        {/* Mobile */}

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white text-3xl"
        >
          {
            open ? <HiX /> : <ImMenu3 />
          }
        </button>

      </div>

      {/* Mobile Menu */}

      {
        open && (

          <div className="lg:hidden border-t border-white/10 bg-[#090312]/95 backdrop-blur-xl">

            <div className="w-11/12 mx-auto py-6 flex flex-col gap-5">

              {
                navLinks.map((item) => (

                  <Link
                    key={item}
                    to="/"
                    className="text-body hover:text-white transition"
                  >
                    {item}
                  </Link>

                ))
              }

              <div className="flex flex-col gap-4 pt-3">

                <Link
                  to="/login"
                  className="text-body"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="rounded-lg bg-btn-primary text-center py-3 text-white font-medium"
                >
                  Sign Up
                </Link>

              </div>

            </div>

          </div>

        )
      }

    </header>
  );
}

export default navbar2;