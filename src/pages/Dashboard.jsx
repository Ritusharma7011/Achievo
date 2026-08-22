import React from "react";
import { useSelector } from "react-redux";
import Loading from "../components/common/Loading";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard(){
    const {loading: authLoading} = useSelector((state)=> state.auth);
    const {loading: profileLoading} = useSelector((state)=> state.profile);

    if(profileLoading || authLoading){
        return (
            <Loading/>
        )
    }

    return(
        <div className="text-white h-[calc(100vh-5.5rem)] flex overflow-hidden hide-scrollbar relative min-h-[calc(100vh-3.5rem)] flex-col md:flex-row">
            <Sidebar/>
            <div className="flex-1 overflow-y-auto hide-scrollbar">
                <div className="w-11/12 max-w-[1000px] mx-auto py-10 hide-scrollbar">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard