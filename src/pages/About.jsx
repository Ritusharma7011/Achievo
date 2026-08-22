import React from "react";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import { Link } from "react-router-dom";
import {
    FaGraduationCap,
    FaCode,
    FaUsers,
    FaRocket,
    FaArrowRight,
    FaCircleCheck,
} from "react-icons/fa6";

function About() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center mx-auto w-11/12 bg-[#090312] text-white">

            {/* Hero Section */}
            <section className="relative overflow-hidden px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-28">

                {/* Background Glow */}
                <div className="absolute left-1/2 top-10 z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />

                <div className="relative z-10 mx-auto max-w-5xl text-center">

                    <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-purple-400">
                        About Achievo
                    </p>

                    <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                        Learn. Build.{" "}
                        <span className="text-purple-500">
                            Achieve.
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
                        Achievo is a complete tech learning platform designed
                        to help learners build practical skills, explore
                        technology, and move closer to their career goals.
                    </p>

                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

                        <Link to="/signup">
                            <button className="
                                flex w-full cursor-pointer items-center justify-center gap-2
                                rounded-lg bg-btn-primary px-6 py-3
                                font-semibold transition-all duration-300
                                hover:scale-105 hover:bg-btn-primary-hover
                                sm:w-auto
                            ">
                                Start Learning
                                <FaArrowRight className="text-sm" />
                            </button>
                        </Link>

                    </div>
                </div>
            </section>


            {/* What is Achievo */}
            <section className="px-5 mx-auto py-16 sm:px-8 lg:px-16">

                <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">

                    <div>
                        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-purple-400">
                            Our Mission
                        </p>

                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Learning should lead to{" "}
                            <span className="text-purple-500">
                                building.
                            </span>
                        </h2>

                        <p className="mt-5 leading-7 text-gray-400">
                            At Achievo, we believe that learning technology
                            should go beyond watching lectures and taking
                            notes. The real learning happens when you
                            understand concepts and apply them to real
                            projects.
                        </p>

                        <p className="mt-4 leading-7 text-gray-400">
                            That's why Achievo brings courses, practical
                            learning and project-based development together
                            in one platform.
                        </p>
                    </div>


                    {/* Mission Card */}
                    <div className="
                        rounded-2xl border border-white/10
                        bg-white/3 p-6 shadow-xl
                        sm:p-8
                    ">

                        <div className="grid gap-5 sm:grid-cols-2">

                            <div className="rounded-xl bg-purple-500/10 p-5">
                                <FaGraduationCap className="text-2xl text-purple-400" />
                                <h3 className="mt-4 font-semibold">
                                    Learn
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-gray-400">
                                    Understand concepts through structured
                                    learning.
                                </p>
                            </div>

                            <div className="rounded-xl bg-purple-500/10 p-5">
                                <FaCode className="text-2xl text-purple-400" />
                                <h3 className="mt-4 font-semibold">
                                    Build
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-gray-400">
                                    Turn knowledge into practical projects.
                                </p>
                            </div>

                            <div className="rounded-xl bg-purple-500/10 p-5">
                                <FaUsers className="text-2xl text-purple-400" />
                                <h3 className="mt-4 font-semibold">
                                    Grow
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-gray-400">
                                    Develop skills that matter in the real
                                    world.
                                </p>
                            </div>

                            <div className="rounded-xl bg-purple-500/10 p-5">
                                <FaRocket className="text-2xl text-purple-400" />
                                <h3 className="mt-4 font-semibold">
                                    Achieve
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-gray-400">
                                    Move confidently toward your career goals.
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </section>


            {/* Why Achievo */}
            <section className="border-y border-white/10 bg-white/2 px-5 py-16 sm:px-8 lg:px-16">

                <div className="mx-auto max-w-6xl">

                    <div className="mx-auto max-w-2xl text-center">

                        <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">
                            Why Achievo?
                        </p>

                        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                            Everything you need to keep moving forward.
                        </h2>

                        <p className="mt-4 text-gray-400">
                            A learning experience focused on practical
                            knowledge, consistency and growth.
                        </p>

                    </div>


                    <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                        {/* Card 1 */}
                        <div className="
                            rounded-xl border border-white/10
                            bg-[#0f081b] p-6 transition-all duration-300
                            hover:-translate-y-1 hover:border-purple-500/40
                        ">
                            <FaCircleCheck className="text-xl text-purple-400" />

                            <h3 className="mt-5 text-xl font-semibold">
                                Structured Learning
                            </h3>

                            <p className="mt-3 leading-6 text-gray-400">
                                Learn technologies through organized courses
                                and a clear learning path.
                            </p>
                        </div>


                        {/* Card 2 */}
                        <div className="
                            rounded-xl border border-white/10
                            bg-[#0f081b] p-6 transition-all duration-300
                            hover:-translate-y-1 hover:border-purple-500/40
                        ">
                            <FaCircleCheck className="text-xl text-purple-400" />

                            <h3 className="mt-5 text-xl font-semibold">
                                Practical Skills
                            </h3>

                            <p className="mt-3 leading-6 text-gray-400">
                                Focus on applying what you learn by building
                                meaningful projects.
                            </p>
                        </div>


                        {/* Card 3 */}
                        <div className="
                            rounded-xl border border-white/10
                            bg-[#0f081b] p-6 transition-all duration-300
                            hover:-translate-y-1 hover:border-purple-500/40
                        ">
                            <FaCircleCheck className="text-xl text-purple-400" />

                            <h3 className="mt-5 text-xl font-semibold">
                                Learn at Your Pace
                            </h3>

                            <p className="mt-3 leading-6 text-gray-400">
                                Study whenever you want and continue your
                                learning journey at your own pace.
                            </p>
                        </div>

                    </div>
                </div>

            </section>


            {/* Vision */}
            <section className="px-5 py-16 sm:px-8 lg:px-16">

                <div className="
                    mx-auto max-w-5xl rounded-2xl
                    border border-purple-500/20
                    bg-linear-to-br from-purple-500/10
                    to-transparent p-8 text-center
                    sm:p-12 lg:p-16
                ">

                    <FaRocket className="mx-auto text-3xl text-purple-400" />

                    <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
                        Our Vision
                    </h2>

                    <p className="
                        mx-auto mt-5 max-w-2xl
                        leading-7 text-gray-400
                    ">
                        To make technology education more practical,
                        accessible and engaging — helping learners turn
                        curiosity into skills and skills into opportunities.
                    </p>

                </div>

            </section>


            {/* Get in Touch Form */}
            <div className="mx-auto mb-15 w-full max-w-2xl px-4 sm:px-6 lg:px-0">
                <ContactFormSection />
            </div>
            
            {/* Reviews */}
            <section>
                Reviews from other learners
                {/* <ReviewSlider/> */}
            </section>
        </div>
    );
}

export default About;