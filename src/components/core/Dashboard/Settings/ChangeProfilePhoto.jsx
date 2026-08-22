// import React from "react";
// import {useEffect, useRef, useState} from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateDisplayPicture } from "../../../../services/operations/settingsAPI";
// import IconBtn from "../../../common/IconBtn"
// import { FiUpload } from "react-icons/fi"
// import { GrInProgress } from "react-icons/gr"
// import { MdDeleteForever } from "react-icons/md";


// function ChangeProfilePhoto(){

//     const {token} = useSelector((state)=>state.auth);
//     const {user} = useSelector((state)=>state.profile);
//     const dispatch = useDispatch();

//     const [loading, setLoading] = useState(false);
//     const [imageFile, setImageFile] = useState(null);
//     const [previewSource, setPreviewSource] = useState(null);

//     const fileInputRef = useRef(null)

//     const handleClick = () => {
//         fileInputRef.current.click()
//     }

//     const handleFileChange = (e) => {
//         const file = e.target.files[0]
//         // console.log(file)
//         if (file) {
//         setImageFile(file)
//         previewFile(file)
//         }
//     }

//     const previewFile = (file) => {
//         const reader = new FileReader()
//         reader.readAsDataURL(file)
//         reader.onloadend = () => {
//         setPreviewSource(reader.result)
//         }
//     }

//     const handleFileUpload = async () => {
//         if (!imageFile) return;

//         try {
//             setLoading(true);

//             const formData = new FormData();
//             formData.append("displayPicture", imageFile);

//             await dispatch(updateDisplayPicture(token, formData));
//         } catch (error) {
//             console.log("ERROR MESSAGE - ", error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return(
//         <div className=" bg-btn-secondary rounded-xl flex px-6 py-6 gap-5 items-center">
//             <div>
//                 <img src={previewSource || user?.image} className="w-16 h-16 rounded-full"/>
//             </div>
//             <div>
//                 <h2 className="text-[16px] text-body pb-2">Change Profile Picture</h2>

//                 <div className="flex gap-4">

//                     <input type="file" ref={fileInputRef} onChange={handleFileChange} className='hidden'
//                         accept="image/*"/>

//                     {/* <button className="px-3 py-2 bg-btn-primary rounded-xl text-[15px] cursor-pointer hover:scale-102 transition-all duration-100"
//                         onClick={ handleClick}
//                     >
//                         Change
//                     </button> */}

//                     <button onClick={handleClick} disabled={loading} className={`px-5 py-2 bg-btn-primary rounded-xl text-[15px] transition-all duration-100
//                     ${loading ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-102'}
//                     `} >Select</button>

                    
//                     {/* <button onClick={() => removePictureHandler(e)} className="px-3 py-2 bg-btn-secondary-hover rounded-xl text-[15px] cursor-pointer hover:scale-102 transition-all duration-100">
//                         Remove
//                     </button> */}

//                     {/* <IconBtn text={loading ? 'Uploading...' : 'Upload'}
//                         onClick={handleFileUpload}
//                         customClasses='lg:py-2 lg:px-5'
//                         disabled={loading || !imageFile}>
//                         {
//                             !loading ?
//                             <FiUpload className='text-lg text-richblack-900' />
//                             :
//                             <GrInProgress className='text-lg text-richblack-900' />
//                         }
//                     </IconBtn> */}

//                     <button className="px-5 flex gap-1 items-center py-2 bg-btn-secondary-hover rounded-xl text-[15px] cursor-pointer hover:scale-102 transition-all duration-100" 
//                     disabled={loading || !imageFile}
//                     onClick={handleFileUpload}
//                     >
//                         {
//                             !loading ? <FiUpload/> : <GrInProgress/>
//                         }

//                         {   loading ? "Uploading..." : "Upload" }
//                     </button>

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ChangeProfilePhoto

import React from "react";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayPicture } from "../../../../services/operations/settingsAPI";
import { FiUpload } from "react-icons/fi";
import { GrInProgress } from "react-icons/gr";

function ChangeProfilePhoto() {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);

    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setImageFile(file);
            previewFile(file);
        }
    };

    const previewFile = (file) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleFileUpload = async () => {
        if (!imageFile) return;

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("displayPicture", imageFile);

            await dispatch(updateDisplayPicture(token, formData));

        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="
            bg-btn-secondary
            rounded-xl
            flex
            flex-col
            sm:flex-row
            px-4
            py-5
            sm:px-6
            sm:py-6
            gap-4
            sm:gap-5
            items-center
            sm:items-center
            w-full
        ">

            {/* Profile Image */}
            <div className="shrink-0">

                <img
                    src={previewSource || user?.image}
                    alt="Profile"
                    className="
                        w-16
                        h-16
                        sm:w-16
                        sm:h-16
                        rounded-full
                        object-cover
                    "
                />

            </div>


            {/* Content */}
            <div className="w-full min-w-0">

                <h2 className="
                    text-sm
                    sm:text-[16px]
                    text-body
                    pb-2
                    text-center
                    sm:text-left
                ">
                    Change Profile Picture
                </h2>


                <div className="
                    flex
                    flex-col
                    xs:flex-row
                    sm:flex-row
                    gap-3
                    sm:gap-4
                    w-full
                ">

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                    />


                    {/* Select Button */}
                    <button
                        onClick={handleClick}
                        disabled={loading}
                        className={`
                            w-full
                            xs:w-auto
                            sm:w-auto
                            px-5
                            py-2
                            bg-btn-primary
                            rounded-xl
                            text-sm
                            sm:text-[15px]
                            transition-all
                            duration-100
                            ${loading
                                ? "cursor-not-allowed opacity-60"
                                : "cursor-pointer hover:scale-102"
                            }
                        `}
                    >
                        Select
                    </button>


                    {/* Upload Button */}
                    <button
                        className="
                            w-full
                            xs:w-auto
                            sm:w-auto
                            px-5
                            flex
                            justify-center
                            gap-1
                            items-center
                            py-2
                            bg-btn-secondary-hover
                            rounded-xl
                            text-sm
                            sm:text-[15px]
                            cursor-pointer
                            hover:scale-102
                            transition-all
                            duration-100
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                        disabled={loading || !imageFile}
                        onClick={handleFileUpload}
                    >

                        {
                            !loading
                                ? <FiUpload />
                                : <GrInProgress />
                        }

                        {
                            loading
                                ? "Uploading..."
                                : "Upload"
                        }

                    </button>

                </div>

            </div>

        </div>
    );
}

export default ChangeProfilePhoto;