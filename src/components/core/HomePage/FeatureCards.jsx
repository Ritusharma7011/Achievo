import React from "react";
import { LuBookOpenText } from "react-icons/lu";
import { FaCode } from "react-icons/fa6";
import { MdOutlinePeople } from "react-icons/md";
import { PiCertificateLight } from "react-icons/pi";
import { FaRoad } from "react-icons/fa6";
import { FaLaptopCode } from "react-icons/fa6";

const features = [
    {
        icon : <LuBookOpenText className=" text-purple-icon text-[40px]"/>, 
        name : "High Quality Courses",
        description : "Learn from industry experts with well structured and up-to-date content"
    },
    {
        icon : <FaCode className=" text-blue-icon text-[40px]"/>, 
        name : "Hands-on Projects",
        description : "Build real-world projects and strengthen your portfolio"
    },
    {
        icon : <MdOutlinePeople className=" text-green-icon text-[40px]"/>, 
        name : "Expert Instructors",
        description : "Learn from professionals who have worked in top tech companies "
    },
    {
        icon : <PiCertificateLight className="text-pink-icon text-[40px]"/>, 
        name : "Certificates",
        description : "Earn shareable certificates and boost your career opportunities. Coming Soon!"
    },
    {
        icon : <FaRoad className="text-orange-icon text-[40px]"/>, 
        name : "Career Roadmaps",
        description : "Structured roadmaps to guide you from begginer to job-ready. Coming Soon!"
    },
    // {
    //     icon : <FaLaptopCode className="text-yellow-icon text-[40px]"/>, 
    //     name : "Showcase Projects",
    //     description : "After completion of course you can showcase your projects to on Achievo."
    // },

]
function FeatureCards(){
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mx-auto">
            {
                features.map((element,index) =>{
                    return(
                        <div
                        key={index}
                        className=" bg-gray-950 rounded-2xl border border-white/10 bg-card-bg p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary-500/30 hover:shadow-xl"
                        >
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-1">
                                {element.icon}
                            </div>

                            <h3 className="text-white text-md font-semibold mb-1">
                                {element.name}
                            </h3>

                            <p className="text-body text-sm leading-6">
                                {element.description}
                            </p>
                        </div>

                    )
                })
            }
            
        </div>
    )
}

export default FeatureCards;