import React from "react";
import { FaStar } from "react-icons/fa6";
import HighlightText from "../components/core/HomePage/HighlightText"
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import AvatarGroup from "../components/core/HomePage/AvatarGroup";
import DashboardSS from "../assets/Image/Placeholder Dashboard.png";
import Animation from "../Animations/animation";
import FeatureCards from "../components/core/HomePage/FeatureCards";
import { MdOutlinePeople } from "react-icons/md";
import StatisticsBox from "../components/core/HomePage/StatisticsBox"
import CourseCategories from "../components/core/HomePage/CourseCategories"
import ProjectShowcase from "../components/core/HomePage/ProjectShowcase";
import Footer from "../components/common/Footer"

function Home(){
    return(
        <div className="pt-3">
            
            {/* Section 1 */}

            {/* Hero Section */}
            <div className="w-11/12 h-[60%] flex  gap-10 mx-auto flex-row max-[940px]:flex-col">
                {/* Left Hero Side */}
                <div className=" mx-10 max-w-[45%] max-[940px]:mx-auto max-[940px]:max-w-full  ">
                    {/* Badge */}
                    <div className=" mb-2 mt-2 inline-flex items-center gap-2 rounded-full border border-badge-border bg-badge-bg px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3">
                        <div className="flex items-center gap-1 ">
                            <FaStar className="text-yellow-500 lg:text-[17px] sm:text-sm"/>
                            <p className="text-badge-text text-[12px] sm:text-[13px] md:text-[14px] lg:text-[15px] font-medium whitespace-nowrap ">Your Complete Tech Learning Platform</p>
                        </div>
                    </div>

                    {/* Main Heading lines */}
                    <div>
                        <div className="flex flex-col gap-y-1.5 text-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                            <h1>Learn.</h1>
                            <h1>Build.</h1>
                            <HighlightText text={"Achieve More."}/>
                        </div>
                        <div className="text-wrap font-body text-[14px] md:text-[16px] lg:text-lg leading-8 text-body mt-3.5 max-w-[400px]">
                            <p>Achievo helps you master in-demand tech skills through high-quality courses, real world projects, and expert teachers.</p>
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="text-white font-bold inline-flex flex-col gap-5 sm:gap-7 my-7 sm:flex-row">
                        <Link to={"/signup"} className="bg-btn-primary hover:bg-btn-primary-hover rounded-md flex items-center gap-3 px-4 py-2.5 text-sm md:text-base md:px-6 md:py-3 transition-all duration-300 ">
                            <span className="text-[12px] sm:text-[14px] md:text-[16px]" >Explore Courses</span>
                            <FaArrowRightLong />
                        </Link>
                        <Link to={"/signup"} className="bg-btn-secondary hover:bg-btn-secondary-hover rounded-md flex items-center gap-3 px-4 py-2.5 text-sm md:text-base md:px-6 md:py-3 transition-all duration-300 ">
                            <span>Become an Instructor</span>
                        </Link>
                    </div>

                    {/* Students enrolled data illustration */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                        <AvatarGroup/>
                        <div className="text-body text-sm">
                            <div className="text-[13px] md:text-[14px] lg:text-[16px]"> <span className="bg-linear-to-r from-primary-500 via-primary-400 to-primary-300 bg-clip-text text-transparent font-bold text-[16px] sm:text-lg ">200+ </span>learners</div>
                            <div className="text-[13px] md:text-[14px] lg:text-[16px]">already growing with Achievo</div>
                        </div>
                    </div>
                </div>

                {/* Right Hero Side - filhaal khaali h */}
                <div className="md:max-h-full flex md:w-[55%] max-h-[80%] max-w-[80%] mx-auto items-center justify-center ">
                    <Animation/>
                </div>

            </div>

            <div className="w-[90%] mx-auto h-px bg-body opacity-15 my-6"></div>

            {/* Section 2 */}
            <div>

                {/* Features */}
                <div className="w-11/12 mx-auto">
                    <div className="flex flex-col items-center mt-15">
                        <div className=" uppercase text-primary-500 text-[14px] sm:text-[16px] md:text-[18px] lg:text-xl font-bold ">Why choose Achievo</div>
                        <div className=" text-white text-[19px] sm:[21px] md:text-[23px] lg:text-[1.7rem] font-semibold">Everything you need to learn and grow</div>
                        <div className="w-full mt-8">
                            <FeatureCards/>
                        </div>
                        
                    </div>
                </div>

                {/* Statistics */}
                <div>
                    <StatisticsBox/>
                </div>

                {/* Courses Categories */}
                <div className="flex flex-col items-center mt-12">
                    <div className=" uppercase text-primary-500 text-[14px] sm:text-[16px] md:text-[18px] lg:text-xl font-bold ">Explore Top Courses</div>
                    <div  className=" text-white text-[19px] sm:[21px] md:text-[23px] lg:text-[1.7rem] font-semibold">Find the right path for you</div>
                    <CourseCategories/>  
                </div>

                {/* Projects */}
                <div className="flex flex-col items-center mt-12">
                    <div className=" uppercase text-primary-500 text-[14px] sm:text-[16px] md:text-[18px] lg:text-xl font-bold ">Built by learners</div>
                    <div  className=" text-white text-[19px] sm:[21px] md:text-[23px] lg:text-[1.7rem] font-semibold">Real Projects. Real Impact.</div>
                    <ProjectShowcase/>  
                </div>               
                
            </div>
            

            {/* Section 3 */}
                {/* Reviews */} 

            {/* Footer */}
            <Footer/>
            
        </div>
    )
}

export default Home;
