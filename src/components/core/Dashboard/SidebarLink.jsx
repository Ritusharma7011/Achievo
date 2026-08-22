// import React from "react";
// import { sidebarLinks } from "../../../data/Dashboard-Link";

// import * as Icons from "react-icons/vsc";
// import { useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import { matchPath } from "react-router-dom";

// function SidebarLink({link, iconName}){

//     const Icon = Icons[iconName];
//     const location = useLocation();
//     const dispatch = useDispatch();
    
//     const matchRoute = (route)=>{ // for showing active tabs
//         return matchPath({path: route}, location.pathname);
//     }

//     return(
//         <div>
//             <Link
//              to={link.path}
//                 className = {`relative
//                 flex
//                 items-center
//                 gap-x-3
//                 px-4
//                 py-2.5
//                 text-sm 
//                 rounded-r-xl
//                 transition-all
//                 duration-200 ${matchRoute(link.path) ? " bg-purple-600 " : "bg-btn-secondary"}`}
//             >

//                 <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-purple-900 ${matchRoute(link.path)? "opacity-100" : "opacity-0"}` }></span>

//                 <div className="flex items-center gap-x-2">
//                     <Icon className="text-[16px] "/>
//                     <span>{link.name}</span>
//                 </div>

//             </Link>
//         </div>
//     )
// }
// export default SidebarLink

import React from "react";
import { sidebarLinks } from "../../../data/Dashboard-Link";

import * as Icons from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { matchPath } from "react-router-dom";

function SidebarLink({link, iconName}){

    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();
    
    const matchRoute = (route)=>{
        return matchPath({path: route}, location.pathname);
    }

    return(
        <div className="w-full">

            <Link
                to={link.path}
                className={`
                    relative
                    flex
                    items-center
                    gap-x-3
                    px-3 sm:px-4
                    py-2.5
                    text-sm
                    rounded-r-xl
                    transition-all
                    duration-200
                    w-full
                    ${matchRoute(link.path) 
                        ? "bg-purple-600" 
                        : "bg-btn-secondary"
                    }
                `}
            >

                <span className={`
                    absolute
                    left-0
                    top-0
                    h-full
                    w-[0.2rem]
                    bg-purple-900
                    ${matchRoute(link.path)
                        ? "opacity-100" 
                        : "opacity-0"
                    }
                `}></span>

                <div className="flex items-center gap-x-2 min-w-0">

                    <Icon className="text-[16px] shrink-0"/>

                    <span className="whitespace-nowrap">
                        {link.name}
                    </span>

                </div>

            </Link>

        </div>
    )
}

export default SidebarLink