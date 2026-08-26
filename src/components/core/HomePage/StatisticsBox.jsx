import React from "react"
import { GoPeople } from "react-icons/go";
import { SlBookOpen } from "react-icons/sl";
import { SiOpsgenie } from "react-icons/si";
import { CiStar } from "react-icons/ci";

function StatisticsBox(){
    return(
        <div>
            <div className="w-11/12 mx-auto mt-12">
                <div className="bg-linear-to-r from-[#22113C] via-[#130D22] to-[#22113C] border border-badge-border rounded-xl overflow-hidden">

                    <div className="grid grid-cols-2 lg:grid-cols-4">

                        {/* Card 1 */}
                        <div className="flex items-center justify-center gap-4 p-6 border-b border-r border-badge-border lg:border-b-0">

                            <div className="border border-badge-border bg-badge-bg rounded-lg p-2">
                            <GoPeople className="text-badge-text text-3xl lg:text-[36px]" />
                            </div>

                            <div>
                            <h2 className="text-white font-bold text-xl lg:text-2xl">
                                200+
                            </h2>

                            <p className="text-body text-xs sm:text-sm">
                                Active Learners
                            </p>
                            </div>

                        </div>

                        {/* Card 2 */}
                        <div className="flex items-center justify-center gap-4 p-6 border-b border-badge-border lg:border-b-0 lg:border-r">

                            <div className="border border-badge-border bg-badge-bg rounded-lg p-2">
                            <SlBookOpen className="text-badge-text text-2xl lg:text-[30px]" />
                            </div>

                            <div>
                            <h2 className="text-white font-bold text-xl lg:text-2xl">
                                50+
                            </h2>

                            <p className="text-body text-xs sm:text-sm">
                                Courses
                            </p>
                            </div>

                        </div>

                        {/* Card 3 */}
                        <div className="flex items-center justify-center gap-4 p-6 border-r border-badge-border lg:border-r">

                            <div className="border border-badge-border bg-badge-bg rounded-lg p-2">
                            <SiOpsgenie className="text-badge-text text-2xl lg:text-[30px]" />
                            </div>

                            <div>
                            <h2 className="text-white font-bold text-xl lg:text-2xl">
                                20+
                            </h2>

                            <p className="text-body text-xs sm:text-sm">
                                Expert Instructors
                            </p>
                            </div>

                        </div>

                        {/* Card 4 */}
                        <div className="flex items-center justify-center gap-4 p-6">

                            <div className="border border-badge-border bg-badge-bg rounded-lg p-2">
                            <CiStar className="text-badge-text text-3xl lg:text-[34px]" />
                            </div>

                            <div>
                            <h2 className="text-white font-bold text-xl lg:text-2xl">
                                High
                            </h2>

                            <p className="text-body text-xs sm:text-sm">
                                Satisfaction Rate
                            </p>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default StatisticsBox;





