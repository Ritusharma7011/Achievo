import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo - noBg A2.png"
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/Navbar-Link";
import { useLocation } from "react-router-dom";
import { FaCartShopping, FaCaretDown, FaBars, FaXmark } from "react-icons/fa6";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import Loading from "./Loading";

function Navbar() {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector((state) => state.cart);

    //API Call
    const [subLinks, setSubLinks] = useState([]);

    // Mobile menu
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isCatalogOpen, setIsCatalogOpen] = useState(false);

    const fetchSubLinks = async() =>{
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing Sublinks result: ", result);
            setSubLinks(result.data.allCategories);
        }
        catch(error){
            console.log("Could not fetch the catalog list")
        }
    }

    useEffect( () =>{
        fetchSubLinks();
    },[]);

    //Route Matching to change color
    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname); // checking whether route and current location is same or not. if same change color
    }

    return(
        <div className="flex relative z-100 h-22 w-full items-center justify-center border-b border-white/15">

            <div className="flex w-11/12 items-center justify-between gap-4 md:inline-flex md:justify-around md:gap-12">

                {/* Logo */}
                <Link to={"/"} onClick={() => setIsMenuOpen(false)}>
                    <div className="flex items-center font-bold text-4xl">
                        <img 
                            src={logo} 
                            alt="Logo" 
                            className="w-[75px] h-20 sm:w-[85px] sm:h-[90px] md:w-[100px] md:h-[105px]" 
                            loading="lazy"
                        />
                        <p className="text-white text-3xl sm:text-4xl md:text-4xl">
                            Achievo
                        </p>
                    </div>
                </Link>

                {/* NavLinks */}
                <nav className="hidden lg:block">
                    <ul className="flex justify-center gap-x-8 text-white">
                        {
                            NavbarLinks.map((element,index) =>(
                                
                                <li key={index}>
                                    {
                                        element.title === "Catalog" ? (
                                            <div className="relative flex items-center gap-1 group">
                                                <p>{element.title}</p>
                                                <FaCaretDown className="group-hover:text-btn-primary"/>

                                                <div className="invisible
                                                    absolute left-1/2 top-full
                                                    translate-x-[-50%]
                                                    mt-1
                                                    z-200
                                                    flex flex-col
                                                    rounded-xl
                                                    bg-btn-secondary
                                                    text-white
                                                    opacity-0
                                                    transition-all duration-200
                                                    group-hover:visible group-hover:opacity-100
                                                    lg:w-[300px]">
                                                                                                    

                                                {   
                                                    !subLinks ? (
                                                        <Loading/>
                                                    )
                                                    : subLinks.length ? (
                                                        
                                                            
                                                            subLinks.map((subLink,idx) => (
                                                                <Link to={`/catalog/${subLink.name.split(" ").join("-")
                                                                    .toLowerCase()}`}
                                                                    className=""
                                                                    key={idx}
                                                                >
                                                                    <p className={`${idx != subLinks.length-1 ? "border-b border-b-btn-secondary-hover" : ""} text-[15px] py-[3px] px-4 hover:text-purple-500 `}>
                                                                        {subLink.name}
                                                                    </p>
                                                                </Link>
                                                            ))
                                                        
                                                    ) : (<div></div>)
                                                }
                                                </div>
                                            </div>) : (
                                            <Link to={element?.path}>
                                                <p className={`${matchRoute(element?.path) ? "text-purple-600" : "relative hover:text-white transition duration-300 after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-0 after:bg-primary-500 after:transition-all after:duration-300 hover:after:w-full"}`}>
                                                    {element.title}
                                                </p>
                                            </Link>
                                        ) 
                                    }
                                </li>
                                
                            ))
                        }
                    </ul>
                </nav>

                {/* Login/SignUp/Dashboard */}
                <div className="hidden lg:flex gap-x-4 items-center ">

                        {
                            user && user?.accountType != "Instructor" && (
                                <Link to={"/dashboard/cart"}className="relative">
                                    <FaCartShopping className = "text-white text-[20px]"/>
                                    {
                                        totalItems > 0 && (
                                            <span>
                                                {totalItems}
                                            </span>
                                        )
                                    }
                                </Link>
                            )
                        }
                        {
                            token === null && (
                                <Link to={"/login"}>
                                    <button className="border border-white/20 rounded-lg text-[15px] bg-btn-secondary hover:bg-btn-secondary-hover px-5 py-2.5 text-white font-medium transition-all duration-300 hover:scale-105 hover:cursor-pointer">Log in</button>
                                </Link>
                            )
                        }
                        {
                            token === null && (
                                <Link to={"/signup"} className="rounded-lg bg-btn-primary hover:bg-btn-primary-hover px-5 py-2.5 text-white font-medium transition-all duration-300 hover:scale-105 text-[15px] hover:cursor-pointer">
                                    <button>Sign Up</button>
                                </Link>
                            )
                        }
                        {
                            token !== null && (
                                
                                <ProfileDropDown/>
                                
                            )
                        }
                </div>

                {/* Mobile Cart + Menu Button */}
                <div className="flex items-center gap-4 lg:hidden">

                    {
                        user && user?.accountType != "Instructor" && (
                            <Link to={"/dashboard/cart"}className="relative">
                                <FaCartShopping className = "text-white text-[20px]"/>
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }

                    <button
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className="text-white text-2xl hover:text-btn-primary transition-all duration-300"
                    >
                        {
                            isMenuOpen ? <FaXmark /> : <FaBars />
                        }
                    </button>

                </div>

            </div>

            {/* Mobile Menu */}
            {
                isMenuOpen && (
                    <div className="absolute top-full left-0 z-999 w-full border-b border-white/15 bg-[#090312] px-6 py-6 lg:hidden">

                        <nav>
                            <ul className="flex flex-col gap-y-5 text-white">

                                {
                                    NavbarLinks.map((element,index) =>(

                                        <li key={index}>

                                            {
                                                element.title === "Catalog" ? (

                                                    <div className="flex flex-col gap-3">

                                                        <div
                                                            className="flex items-center gap-1 cursor-pointer"
                                                            onClick={() => setIsCatalogOpen((prev) => !prev)}
                                                            >
                                                            <p>{element.title}</p>
                                                            <FaCaretDown
                                                                className={`transition-transform duration-200 ${
                                                                    isCatalogOpen ? "text-btn-primary" : ""
                                                                }`}
                                                            />
                                                        </div>
                                                        
                                                        {isCatalogOpen && (
                                                            <div className="ml-3 flex flex-col rounded-lg bg-btn-secondary">

                                                                {
                                                                    !subLinks ? (
                                                                        <Loading/>
                                                                    )
                                                                    : subLinks.length ? (

                                                                        subLinks.map((subLink,idx) => (

                                                                            <Link
                                                                                to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                                                                                key={idx}
                                                                                onClick={() => setIsMenuOpen(false)}
                                                                            >
                                                                                <p className={`${idx != subLinks.length-1 ? "border-b border-b-btn-secondary-hover" : ""} text-[15px] py-3 px-4 hover:text-purple-500`}>
                                                                                    {subLink.name}
                                                                                </p>
                                                                            </Link>

                                                                        ))

                                                                    ) : (
                                                                        <div></div>
                                                                    )
                                                                }

                                                            </div>
                                                        )}

                                                    </div>

                                                ) : (

                                                    <Link
                                                        to={element?.path}
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        <p className={`${matchRoute(element?.path) ? "text-purple-600" : "hover:text-white transition duration-300"}`}>
                                                            {element.title}
                                                        </p>
                                                    </Link>

                                                )
                                            }

                                        </li>

                                    ))
                                }

                            </ul>
                        </nav>

                        {/* Mobile Login/Signup/Profile */}
                        <div className="mt-6 flex flex-col gap-3 border-t border-white/15 pt-5">

                            {
                                token === null && (
                                    <Link
                                        to={"/login"}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <button className="w-full border border-white/20 rounded-lg text-[15px] bg-btn-secondary hover:bg-btn-secondary-hover px-5 py-2.5 text-white font-medium transition-all duration-300 hover:cursor-pointer">
                                            Log in
                                        </button>
                                    </Link>
                                )
                            }

                            {
                                token === null && (
                                    <Link
                                        to={"/signup"}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="w-full rounded-lg bg-btn-primary hover:bg-btn-primary-hover px-5 py-2.5 text-white font-medium text-center transition-all duration-300 text-[15px] hover:cursor-pointer"
                                    >
                                        <button>
                                            Sign Up
                                        </button>
                                    </Link>
                                )
                            }

                            {
                                token !== null && (
                                    <div>
                                        <ProfileDropDown/>
                                    </div>
                                )
                            }

                        </div>

                    </div>
                )
            }

        </div>
    )
}

export default Navbar