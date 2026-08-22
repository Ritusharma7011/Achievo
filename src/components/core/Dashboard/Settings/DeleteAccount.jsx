import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProfile } from "../../../../services/operations/settingsAPI";

export default function DeleteAccount() {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleDeleteAccount() {
        try {
            dispatch(deleteProfile(token, navigate));
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message);
        }
    }

    return (
        <div
            className="
                mt-7
                w-full
                rounded-xl
                border border-red-500/40
                bg-red-500/10
                p-5
                sm:p-6
                lg:p-8
            "
        >
            <div className="flex flex-col sm:flex-row gap-5">

                {/* Delete Icon */}
                <div
                    className="
                        flex
                        items-center
                        justify-center
                        h-12
                        w-12
                        sm:h-14
                        sm:w-14
                        shrink-0
                        rounded-full
                        bg-red-500/20
                    "
                >
                    <FiTrash2
                        className="
                            text-2xl
                            sm:text-3xl
                            text-red-400
                        "
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">

                    <h2
                        className="
                            text-lg
                            sm:text-xl
                            font-semibold
                            text-white
                        "
                    >
                        Delete Account
                    </h2>

                    <div
                        className="
                            text-sm
                            sm:text-base
                            text-red-300
                            space-y-1
                            leading-relaxed
                        "
                    >
                        <p>
                            Would you like to delete your account?
                        </p>

                        <p className="text-sm sm:text-base">
                            This account may contain paid courses.
                            Deleting your account is permanent and
                            will remove all the content associated
                            with it.
                        </p>
                    </div>

                    {/* Desktop Button */}
                    <button
                        type="button"
                        onClick={handleDeleteAccount}
                        className="
                            hidden
                            sm:block
                            w-fit
                            mt-2
                            px-4
                            py-2
                            rounded-xl
                            bg-red-500/20
                            text-red-300
                            text-sm
                            sm:text-base
                            font-medium
                            cursor-pointer
                            transition-all
                            duration-150
                            hover:bg-red-500/30
                            hover:text-red-200
                            hover:scale-105
                        "
                    >
                        I want to delete my account
                    </button>
                </div>
            </div>

            {/* Mobile Button */}
            <div className="mt-5 flex justify-center sm:hidden">
                <button
                    type="button"
                    onClick={handleDeleteAccount}
                    className="
                        w-fit
                        px-4
                        py-2
                        rounded-xl
                        bg-red-500/20
                        text-red-300
                        text-sm
                        font-medium
                        cursor-pointer
                        transition-all
                        duration-150
                        hover:bg-red-500/30
                        hover:text-red-200
                        hover:scale-105
                    "
                >
                    I want to delete my account
                </button>
            </div>
        </div>
    );
}