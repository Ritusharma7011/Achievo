import React, { Children } from "react";

const IconBtn = ({text, onClick, children, disabled, outline= false , customClasses,type})=>{
    return(
        <button className="cursor-pointer"  disabled={disabled}
            onClick={onClick}
            type={type}
            
        >
            {
                children ? (
                    <>
                        <span className={`flex items-center gap-2 ${outline ? "text-white" : "text-white"} ${customClasses}`}>
                            {text}
                        </span>
                        {children}
                    </>
                ) : (text)
            }
        </button>
    )
}

export default IconBtn