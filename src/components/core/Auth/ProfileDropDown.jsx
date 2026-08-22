import React from "react"
import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import useonClickOutside from "../../../hook/useOnClickOutside"
import { logout } from "../../../services/operations/authAPI"


export default function ProfileDropdown() {

    const { user } = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)

    const ref = useRef(null)

    useonClickOutside(ref, () => setOpen(false))

    if (!user) return null

    return (
        
        <div className="relative" ref={ref}>
        {/* <div className="relative"> */}

            

            {/* Profile Button */}
            <div
                onClick={() => setOpen((prev) => !prev)}
                className="
                    max-w-max flex items-center border border-white/10 rounded-full bg-btn-secondary
                    p-1 transition-all duration-200 hover:bg-white/10 focus:outline-none"
                >

                <img
                    src={user?.image}
                    // alt={`profile-${user?.firstName}`}
                    className="
                        h-9
                        w-9
                        rounded-full
                        border
                        border-white/20
                        object-cover
                        transition-all
                        duration-200
                        hover:border-purple-400
                        sm:h-10
                        sm:w-10
                    "
                />

                <AiOutlineCaretDown
                    className={`
                        
                        text-gray-400
                        transition-transform
                        duration-200
                        sm:block
                        ${open ? "rotate-180 text-purple-400" : ""}
                    `}
                />

            </div>


            {/* Dropdown */}
            {open && (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="
                        absolute
                        right-0
                        top-[115%]
                        z-1000
                        w-[190px]
                        overflow-hidden
                        rounded-xl
                        border
                        border-white/10
                        bg-[#161923]
                        shadow-xl
                        shadow-black/30
                        backdrop-blur-xl

                        sm:w-[210px]
                    "
                >

                    {/* User Info */}
                    <div className="
                        border-b
                        border-white/10
                        px-4
                        py-3
                    ">
                        <p className="
                            truncate
                            text-sm
                            font-semibold
                            text-white
                        ">
                            {user?.firstName} {user?.lastName}
                        </p>

                        <p className="
                            mt-0.5
                            truncate
                            text-xs
                            text-gray-400
                        ">
                            {user?.email}
                        </p>
                    </div>


                    {/* Dashboard */}
                    <Link
                        to="/dashboard/my-profile"
                        onClick={() => setOpen(false)}
                        className="
                            flex
                            w-full
                            items-center
                            gap-3
                            px-4
                            py-3
                            text-sm
                            text-gray-300
                            transition-all
                            duration-200
                            hover:bg-white/5
                            hover:text-purple-400
                        "
                    >

                        <VscDashboard className="text-lg" />

                        <span>
                            Dashboard
                        </span>

                    </Link>


                    {/* Logout */}
                    <button
                        onClick={() => {
                            dispatch(logout(navigate))
                            setOpen(false)
                        }}
                        className="
                            flex
                            w-full 
                            items-center
                            gap-3
                            border-t
                            border-white/10
                            px-4
                            py-3
                            text-left
                            text-sm
                            text-gray-300
                            transition-all
                            duration-200
                            hover:bg-red-500/10
                            hover:text-red-400
                            hover:cursor-pointer
                        "
                    >

                        <VscSignOut className="text-lg" />

                        <span>
                            Logout
                        </span>

                    </button>

                </div>
            )}

        </div>
    )
}