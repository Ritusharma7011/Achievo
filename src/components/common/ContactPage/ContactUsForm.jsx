import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {apiConnector} from "../../../services/apiConnector";
import { contactusEndpoint } from "../../../services/apis";

function ContactUsForm() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("Logging Data: " , data);
        try{
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = {status: "OK"}
            console.log(response);
            setLoading(false);
        }
        catch(error){
            console.log("Error: ", error.message);
            setLoading(false)
        }
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            });
        }
    }, [reset, isSubmitSuccessful]);

    return (
        <form onSubmit={handleSubmit(submitContactForm)} className="w-full">
            <div className="
                flex flex-col gap-5
                rounded-2xl
                border border-white/10
                bg-btn-secondary
                p-5
                shadow-xl
                sm:p-6
                lg:p-7
            ">

                {/* First Name + Last Name */}
                <div className="flex flex-col gap-5 sm:flex-row">

                    {/* First Name */}
                    <div className="flex w-full flex-col gap-2">
                        <label
                            htmlFor="firstname"
                            className="text-sm font-medium text-gray-200"
                        >
                            First Name
                        </label>

                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder="Enter first name"
                            className="
                                w-full rounded-lg
                                border border-white/10
                                bg-[#090312]
                                px-4 py-3
                                text-sm text-white
                                outline-none
                                placeholder:text-gray-500
                                transition-all duration-200
                                focus:border-purple-500
                                focus:ring-1
                                focus:ring-purple-500
                            "
                            {...register("firstname", { required: true })}
                        />

                        {errors.firstname && (
                            <span className="text-xs text-red-400">
                                Please enter your name
                            </span>
                        )}
                    </div>


                    {/* Last Name */}
                    <div className="flex w-full flex-col gap-2">
                        <label
                            htmlFor="lastname"
                            className="text-sm font-medium text-gray-200"
                        >
                            Last Name
                        </label>

                        <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            placeholder="Enter last name"
                            className="
                                w-full rounded-lg
                                border border-white/10
                                bg-[#090312]
                                px-4 py-3
                                text-sm text-white
                                outline-none
                                placeholder:text-gray-500
                                transition-all duration-200
                                focus:border-purple-500
                                focus:ring-1
                                focus:ring-purple-500
                            "
                            {...register("lastname")}
                        />
                    </div>

                </div>


                {/* Email */}
                <div className="flex flex-col gap-2">

                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-200"
                    >
                        Email Address
                    </label>

                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter email address"
                        className="
                            w-full rounded-lg
                            border border-white/10
                            bg-[#090312]
                            px-4 py-3
                            text-sm text-white
                            outline-none
                            placeholder:text-gray-500
                            transition-all duration-200
                            focus:border-purple-500
                            focus:ring-1
                            focus:ring-purple-500
                        "
                        {...register("email", { required: true })}
                    />

                    {errors.email && (
                        <span className="text-xs text-red-400">
                            Please enter your email address
                        </span>
                    )}

                </div>


                {/* Message */}
                <div className="flex flex-col gap-2">

                    <label
                        htmlFor="message"
                        className="text-sm font-medium text-gray-200"
                    >
                        Message
                    </label>

                    <textarea
                        name="message"
                        id="message"
                        rows={6}
                        placeholder="Enter your message here"
                        className="
                            w-full resize-none rounded-lg
                            border border-white/10
                            bg-[#090312]
                            px-4 py-3
                            text-sm text-white
                            outline-none
                            placeholder:text-gray-500
                            transition-all duration-200
                            focus:border-purple-500
                            focus:ring-1
                            focus:ring-purple-500
                        "
                        {...register("message", { required: true })}
                    />

                    {errors.message && (
                        <span className="text-xs text-red-400">
                            Please enter your message
                        </span>
                    )}

                </div>


                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="
                        w-full rounded-lg
                        bg-btn-primary
                        px-5 py-3
                        cursor-pointer 
                        text-sm font-semibold text-white
                        transition-all duration-300
                        hover:bg-btn-primary-hover
                        hover:shadow-lg
                        hover:shadow-purple-500/20
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >
                    {loading ? "Sending..." : "Send Message"}
                </button>

            </div>
        </form>
    );
}

export default ContactUsForm;