import React from "react";
import ContactUsForm from "../components/common/ContactPage/ContactUsForm";
function ContactUs(){
    return(
        <div className="w-11/12 mx-auto">
        <div className="max-w-[520px] text-white mx-auto pt-5 pb-10">
            <div>
                <h2 className="text-[26px] font-bold text-center">We'd Love to Hear From You</h2>
                <p className="text-body text-[16px] text-purple-600 text-center py-1">Have a question, feedback, or need help?</p>
                <p className="text-body text-[15px] text-center py-1">Reach out to us and we'll get back to you as soon as possible.</p>
            </div>
            
            <div>
                <ContactUsForm/>
            </div>
            
        </div>
        </div>
    )
}

export default ContactUs;