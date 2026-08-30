import React from "react";
import RenderSteps from "./RenderSteps";

export default function AddCourse(){
    return(
        <>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-15">

                <div className="w-full lg:w-auto">
                    <h1 className="text-2xl font-semibold">Add Course</h1>

                    <div className="w-full sm:w-[490px] max-w-full">
                        <RenderSteps/>
                    </div>
                </div>

                <div className="
                    text-sm
                    h-max
                    bg-btn-secondary
                    text-gray-300
                    px-5 sm:px-6
                    py-5
                    flex
                    flex-col
                    w-full
                    lg:w-[360px]
                    max-w-[360px]
                    rounded-xl
                    mt-2
                    lg:mt-0
                ">
                    <p className="text-yellow-500 font-stretch-semi-expanded">
                        ⚡Code Upload Tips
                    </p>

                    <ul className="flex flex-col gap-1.5">
                        <li>👉 Set the course price option or make it free.</li>
                        <li>👉 Standard size of the course thumbnail is 1024 X 576.</li>
                        <li>👉 Video section controls the course overview video.</li>
                        <li>👉 Course Builder is where you create & organize a course.</li>
                        <li>👉 Add Topic in the Course Builder section to create lessons, quizzes, and assignments.</li>
                        <li>👉 Information from the Additional Data section shows up on the course single page.</li>
                        <li>👉 Make Announcements to notify any important.</li>
                    </ul>
                </div>

            </div>
        </>
    )
}