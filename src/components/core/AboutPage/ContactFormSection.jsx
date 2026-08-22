import React from "react";
import ContactUsForm from "../../common/ContactPage/ContactUsForm";

function ContactFormSection() {
    return (
        <div className="mx-auto w-full">

            <h1 className="
                text-center
                text-3xl
                font-bold
                text-white
                sm:text-4xl
            ">
                Get in Touch
            </h1>

            <p className="
                mx-auto
                my-3
                max-w-lg
                text-center
                text-sm
                leading-6
                text-gray-400
                sm:text-[15px]
            ">
                We'd love to hear from you. Please fill out this form.
            </p>

            <div className="mt-7">
                <ContactUsForm />
            </div>

        </div>
    );
}

export default ContactFormSection;