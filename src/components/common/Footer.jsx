import React from "react";
import logo from "../../assets/Logo/Logo - noBg A2.png"
function Footer(){
    return(
        <footer className="w-full border-t border-badge-border mt-15 bg-btn-secondary-hover">

            {/* Gradient Line */}
            <div className="h-px bg-linear-to-r from-transparent via-primary-500 to-transparent"></div>

            <div className="w-11/12 max-w-7xl mx-auto py-5">

                    {/* Logo */}
                    <div className="flex justify-center">
                        <img
                            src={logo}
                            alt="Achievo Logo"
                            className=" w-[180px] "
                        />
                    </div>

                    {/* Heading */}
                    <h2 className="mt-1 text-center text-white text-2xl sm:text-3xl font-bold">
                        Learn. Build. Achieve More.
                    </h2>

                    {/* Description */}
                    <p className="mt-5 mx-auto max-w-2xl text-center text-body text-sm sm:text-base leading-7">
                        Helping learners master tech skills through high-quality
                        courses, real-world projects, and expert guidance.
                    </p>

                    {/* Divider */}
                    <div className="m-5 h-px bg-white/10"></div>

                    {/* Bottom */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                        <p className="text-body text-xs sm:text-sm text-center md:text-left">
                            © 2026 Achievo. All Rights Reserved.
                        </p>

                        <p className="text-body text-xs sm:text-sm text-center md:text-right">
                            Made with
                            <span className="mx-1 text-red-500">❤️</span>
                            for passionate learners.
                        </p>

                    </div>

            </div>

        </footer>
    )
}

export default Footer;