import React from "react";
import { SlGlobe } from "react-icons/sl";
import { GoGraph } from "react-icons/go";
import { FaMobile } from "react-icons/fa";
import { IoInfiniteSharp } from "react-icons/io5";
import { FaCode } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import { FiFigma } from "react-icons/fi";

const courseCategory = [
    {
        icon: <SlGlobe className="text-[38px] text-blue-500 px-1 py-1"/> ,
        name: "Web Development",
        desc: "120+ Courses"
    },
    {
        icon: <GoGraph className="text-[38px] text-purple-500 px-1 py-1" /> ,
        name: "Data Science",
        desc: "80+ Courses"
    },
    {
        icon: <FaMobile className="text-[38px] text-green-500 px-1 py-1"/> ,
        name: "Mobile Development",
        desc: "70+ Courses"
    },
    {
        icon: <IoInfiniteSharp className="text-[38px] text-cyan-500 px-1 py-1"/> ,
        name: "DevOps",
        desc: "60+ Courses"
    },
    {
        icon: <FaCode className="text-[38px] text-pink-500 px-1 py-1"/> ,
        name: "Programming",
        desc: "70+ Courses"
    },
    {
        icon: <FaShieldAlt className="text-[38px] text-yellow-500 px-1 py-1"/> ,
        name: "Cyber Security",
        desc: "50+ Courses"
    },
    {
        icon: <FiFigma className="text-[38px] text-red-500 px-1 py-1"/> ,
        name: "UI/UX Design",
        desc: "40+ Courses"
    }

]
function CourseCategories() {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mt-7 w-11/12 mx-auto">
            {
                courseCategory.map((element, index) => {
                    return (
                        <div
                            key={index}
                            className="bg-gray-950 border border-white/10 rounded-xl flex items-center gap-3 p-4 hover:border-primary-500 transition-all duration-300"
                        >
                            <div className="shrink-0">
                                {element.icon}
                            </div>

                            <div className="text-white flex flex-col">
                                <span className="text-sm md:text-[15px] font-bold">
                                    {element.name}
                                </span>

                                <span className="text-xs md:text-sm text-body">
                                    {element.desc}
                                </span>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default CourseCategories;