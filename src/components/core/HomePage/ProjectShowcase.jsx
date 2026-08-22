import React from "react";
import proj1 from "../../../assets/Image/proj1.jpeg"
import proj2 from "../../../assets/Image/proj2.jpeg"
import proj3 from "../../../assets/Image/proj3.jpeg"
import proj5 from "../../../assets/Image/proj5.webp"


function ProjectShowcase(){
    return(
        // <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4 mt-7 ">
        //     <div className="border border-white/13 rounded-xl">
        //         <img src={proj1} alt="Project image" loading="lazy" className="w-[300px] rounded-t-xl"/>
        //         <div className="bg-gray-950 px-4 py-2">
        //             <h3 className="text-white font-semibold text-[16px]">Tour Planning App</h3>
        //             <span className="text-body text-sm">HTML, Tailwind, JS</span>

        //             <div className="w-full h-px bg-gray-600 opacity-40 mt-1"></div>

        //             <div className="flex items-center gap-4 pt-2">
        //                 <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="dp" className="w-10 h-10 rounded-full"/>
        //                 <span className="text-body text-sm ">By Ritu</span>
        //             </div>
        //         </div>
        //     </div>
            
        //     <div className="border border-white/13 rounded-xl">
        //         <img src={proj2} alt="Project image" loading="lazy" className="w-[300px] rounded-t-xl h-[163px]"/>
        //         <div className="bg-gray-950 px-4 py-2">
        //             <h3 className="text-white font-semibold text-[16px]">Weather App</h3>
        //             <span className="text-body text-sm">React, OpenWeather API</span>

        //             <div className="w-full h-px bg-gray-600 opacity-40 mt-1"></div>

        //             <div className="flex items-center gap-4 pt-2">
        //                 <img src="https://randomuser.me/api/portraits/women/59.jpg" alt="dp" className="w-10 h-10 rounded-full"/>
        //                 <span className="text-body text-sm ">By Ananya</span>
        //             </div>
        //         </div>
        //     </div>

        //     <div className="border border-white/13 rounded-xl">
        //         <img src={proj3} alt="Project image" loading="lazy" className="w-[300px] rounded-t-xl h-[163px]"/>
        //         <div className="bg-gray-950 px-4 py-2">
        //             <h3 className="text-white font-semibold text-[16px]">Tic Tac Toe Game</h3>
        //             <span className="text-body text-sm">React ,Python</span>

        //             <div className="w-full h-px bg-gray-600 opacity-40 mt-1"></div>

        //             <div className="flex items-center gap-4 pt-2">
        //                 <img src="https://randomuser.me/api/portraits/men/6.jpg" alt="dp" className="w-10 h-10 rounded-full"/>
        //                 <span className="text-body text-sm ">By Shubhanshu</span>
        //             </div>
        //         </div>
        //     </div>

        //     <div className="border border-white/13 rounded-xl">
        //         <img src={proj5} alt="Project image" loading="lazy" className="w-[300px] rounded-t-xl h-[163px]"/>
        //         <div className="bg-gray-950 px-4 py-2">
        //             <h3 className="text-white font-semibold text-[16px]">Expense Tracker</h3>
        //             <span className="text-body text-sm">React, Express, MongoDB</span>

        //             <div className="w-full h-px bg-gray-600 opacity-40 mt-1"></div>

        //             <div className="flex items-center gap-4 pt-2">
        //                 <img src="https://randomuser.me/api/portraits/women/25.jpg" alt="dp" className="w-10 h-10 rounded-full"/>
        //                 <span className="text-body text-sm ">By Kavita</span>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-7 w-11/12">

    {/* Card 1 */}
    <div className="border border-white/13 rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 ">
        <img
            src={proj1}
            alt="Project image"
            loading="lazy"
            className="w-full h-52 object-cover"
        />

        <div className="bg-gray-950 p-4">
            <h3 className="text-white font-semibold text-[15px] sm:text-base">
                Tour Planning App
            </h3>

            <span className="text-body text-xs sm:text-sm">
                HTML, Tailwind, JavaScript
            </span>

            <div className="w-full h-px bg-gray-600/40 my-3"></div>

            <div className="flex items-center gap-3">
                <img
                    src="https://randomuser.me/api/portraits/women/2.jpg"
                    alt="dp"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                />

                <span className="text-body text-sm">
                    By Ritu
                </span>
            </div>
        </div>
    </div>

    {/* Card 2 */}
    <div className="border border-white/13 rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300">
        <img
            src={proj2}
            alt="Project image"
            loading="lazy"
            className="w-full h-52 object-cover"
        />

        <div className="bg-gray-950 p-4">
            <h3 className="text-white font-semibold text-[15px] sm:text-base">
                Weather App
            </h3>

            <span className="text-body text-xs sm:text-sm">
                React, OpenWeather API
            </span>

            <div className="w-full h-px bg-gray-600/40 my-3"></div>

            <div className="flex items-center gap-3">
                <img
                    src="https://randomuser.me/api/portraits/women/59.jpg"
                    alt="dp"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                />

                <span className="text-body text-sm">
                    By Ananya
                </span>
            </div>
        </div>
    </div>

    {/* Card 3 */}
    <div className="border border-white/13 rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300">
        <img
            src={proj3}
            alt="Project image"
            loading="lazy"
            className="w-full h-52 object-cover"
        />

        <div className="bg-gray-950 p-4">
            <h3 className="text-white font-semibold text-[15px] sm:text-base">
                Tic Tac Toe Game
            </h3>

            <span className="text-body text-xs sm:text-sm">
                React, Python
            </span>

            <div className="w-full h-px bg-gray-600/40 my-3"></div>

            <div className="flex items-center gap-3">
                <img
                    src="https://randomuser.me/api/portraits/men/6.jpg"
                    alt="dp"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                />

                <span className="text-body text-sm">
                    By Shubhanshu
                </span>
            </div>
        </div>
    </div>

    {/* Card 4 */}
    <div className="border border-white/13 rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300">
        <img
            src={proj5}
            alt="Project image"
            loading="lazy"
            className="w-full h-52 object-cover"
        />

        <div className="bg-gray-950 p-4">
            <h3 className="text-white font-semibold text-[15px] sm:text-base">
                Expense Tracker
            </h3>

            <span className="text-body text-xs sm:text-sm">
                React, Express, MongoDB
            </span>

            <div className="w-full h-px bg-gray-600/40 my-3"></div>

            <div className="flex items-center gap-3">
                <img
                    src="https://randomuser.me/api/portraits/women/25.jpg"
                    alt="dp"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                />

                <span className="text-body text-sm">
                    By Kavita
                </span>
            </div>
        </div>
    </div>

</div>
    )
}

export default ProjectShowcase