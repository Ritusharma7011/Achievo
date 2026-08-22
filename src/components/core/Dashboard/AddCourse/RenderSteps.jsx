import React from "react";
import { FaCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformationForm/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder.jsx/CourseBuilderForm";
import PublishCourse from "./PublishCourse/PublishCourse";

export default function RenderSteps(){

    const {step} = useSelector((state)=>state.course);

    const steps = [
        {
            id:1,
            title: "Course Details"
        },
        {
            id:2,
            title: "Course Builder"
        },
        {
            id:3,
            title: "Publish Course"
        }
    ]

    return(
        <div className="text-white w-full">

            {/* Step Numbers */}
            <div className="
                grid
                grid-cols-3
                pt-6
                px-1
                sm:px-4
            ">
                {steps.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex justify-center"
                    >
                        <div
                            className={`
                                ${
                                    step === item.id
                                        ? "bg-purple-500 text-purple-900"
                                        : "border border-gray-500"
                                }
                                w-10
                                h-10
                                rounded-full
                                flex
                                justify-center
                                items-center
                                text-base
                            `}
                        >
                            {
                                step > item.id
                                    ? <FaCheck className="text-purple-900" />
                                    : item.id
                            }
                        </div>
                    </div>
                ))}
            </div>


            {/* Step Titles */}
            <div className="
                grid
                grid-cols-3
                pt-2
                pb-6
                px-1
                sm:px-4
            ">
                {steps.map((item, idx) => (
                    <div
                        key={idx}
                        className="flex justify-center text-center"
                    >
                        <p className="
                            text-xs
                            sm:text-sm
                            text-gray-300
                            whitespace-nowrap
                        ">
                            {item.title}
                        </p>
                    </div>
                ))}
            </div>


            {
                step === 1 && <CourseInformationForm/>
            }

            {
                step === 2 && <CourseBuilderForm/>
            }

            {
                step === 3 && <PublishCourse/>
            }

        </div>
    )
}