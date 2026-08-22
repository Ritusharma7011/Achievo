import React from "react";

const HighlightText = ({text}) =>{
    return(
        <span className="bg-linear-to-r from-primary-500 via-primary-400 to-primary-300 bg-clip-text text-transparent ">
            {text}
        </span>
    )
}

export default HighlightText