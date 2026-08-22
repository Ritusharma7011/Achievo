import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import ChangeProfilePhoto from "./ChangeProfilePhoto";
import EditProfile from "./EditProfile";
import DeleteAccount from "./DeleteAccount";
import { useNavigate } from "react-router-dom";

function Settings(){
    const navigate = useNavigate();
    return(
        <div className="text-white">
            <button onClick={()=> navigate(-1)} className="flex gap-2 text-gray-500 pb-3 text-[15px] cursor-pointer items-center">
                <IoMdArrowRoundBack/>
                <span>Back</span>
            </button>

            <h1 className="text-2xl font-semibold pb-6">Edit Profile</h1>

            <div className="w-11/12 mx-auto flex flex-col gap-6">
                <ChangeProfilePhoto/>
                <EditProfile/>
                <DeleteAccount/>
            </div>

        </div>
    )
}

export default Settings