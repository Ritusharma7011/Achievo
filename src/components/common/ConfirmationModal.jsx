import React from "react";
import IconBtn from "./IconBtn";


function ConfirmationModal({ modalData }) {
    return (
        <div className="
            fixed inset-0 z-1000
            grid place-items-center
            bg-black/2
            backdrop-blur-sm
        ">
            <div className="
                w-11/12 max-w-[350px]
                rounded-lg
                border border-white/10
                bg-[#161923]
                p-6
            ">
                <p className="text-2xl text-center font-semibold text-white">
                    {modalData?.text1}
                </p>

                <p className="mt-3 mb-5 text-center leading-6 text-gray-400">
                    {modalData?.text2}
                </p>

                <div className="flex items-center justify-around gap-x-6 pt-2">
                    <div className="top-[-1] bg-red-500/10 text-white hover:text-red-500 cursor-pointer rounded-xl px-6 py-2.5">
                        <IconBtn
                            onClick={modalData?.btn1Handler}
                            text={modalData?.btn1Text}
                        />
                    </div>
                    

                    <button
                        className="cursor-pointer rounded-md bg-gray-300 px-5 py-2 font-semibold text-black"
                        onClick={modalData?.btn2Handler}
                    >
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal