import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {editCourseDetails, fetchCourseCategories, addCourseDetails} from "../../../../../services/operations/courseDetailsAPI";
import { FaRupeeSign } from "react-icons/fa6";
import Tags from "./Tags";
import Upload from "./Upload";
import RequirementField from "./RequirementField";
import IconBtn from "../../../../common/IconBtn";
import toast from "react-hot-toast";
import {COURSE_STATUS} from "../../../../../utils/constants"
import { setCourse, setStep } from "../../../../../slices/courseSlice"

export default function CourseInformationForm(){
    const{
        register,
        handleSubmit,
        setValue,
        getValues,
        formState : {errors},
    } = useForm();

    const dispatch = useDispatch();

    const {course, editCourse} = useSelector((state)=>state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);
    const {token} = useSelector((state)=>state.auth);

    useEffect(()=>{
        const getCategories = async() =>{
            setLoading(true);
            const categories = await fetchCourseCategories();
            if(categories.length > 0){
                setCourseCategories(categories);
            }
            setLoading(false);
        }

        if(editCourse){
            setValue("courseTitle", course.courseName);
            setValue("courseShortDesc", course.courseDescription);
            setValue("coursePrice", course.price);
            setValue("courseTags", course.tag);
            
            setValue("courseBenefits", course.whatYouWillLearn);
            setValue("courseCategory", course.category);
            setValue("courseRequirements", course.instructions);
            setValue("thumbnailImage", course.thumbNail);
        }
        getCategories();
    },[]);

    const isFormUpdated=()=>{
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory !== course.category ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() ||
            currentValues.thumbnailImage !== course.thumbNail
        ){
            return true;
        }
        else return false
    }

    //handles next button submit
    const onSubmit = async(data)=>{
        if(editCourse){
            if(isFormUpdated()){
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("courseId", course._id);
                if(currentValues.courseTitle !== course.courseName ){
                    formData.append("courseName", data.courseTitle);
                }

                if(currentValues.courseShortDesc !== course.courseDescription){
                    formData.append("courseDescription", data.courseShortDesc);
                }

                if(currentValues.coursePrice !== course.price ){
                    formData.append("price", data.coursePrice);
                }

                if(currentValues.courseTags.toString() !== course.tag.toString() ){
                    // formData.append("tag", data.courseTags);
                    formData.append("tag", JSON.stringify(data.courseTags));
                }

                if(currentValues.courseBenefits !== course.whatYouWillLearn ){
                    formData.append("whatYouWillLearn", data.courseBenefits);
                }

                if( currentValues.courseCategory._id !== course.category._id ){
                    formData.append("category", data.courseCategory);
                }

                // if(currentValues.courseRequirements.toString() !== course.instructions.toString() ){
                //     formData.append("instructions", data.courseRequirements);
                // }

                // if(currentValues.thumbnailImage !== course.thumbNail){
                //     formData.append("thumbNail", data.thumbnailImage);
                // }


                formData.append(
                    "instructions",
                    JSON.stringify(data.courseRequirements)
                );

                if (data.courseImage instanceof FileList && data.courseImage.length > 0) {
                    formData.append("thumbnailImage", data.courseImage[0]);
                }

                // // Debug
                // for (const [key, value] of formData.entries()) {
                //     console.log(key, value);
                // }

                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);

                if(result){
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            }
            else{
                toast.error("No changes made to form");
            }
            return
        }

        //create a new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.thumbnailImage)

        setLoading(true)
        const result = await addCourseDetails(formData, token)

        if (result) {
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }
        setLoading(false)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}
        className="bg-btn-secondary rounded-xl p-6 space-y-6"
        >       
            {/* Course name */}
            <div>
                <label htmlFor="courseTitle">Course Title <span className="text-red-400">*</span></label>
                <input 
                    type="text"
                    id="courseTitle"
                    placeholder="Enter course title"
                    {...register("courseTitle",{required:true})}
                    className="w-full text-[15px]  bg-btn-secondary-hover rounded-md px-3 py-2 focus:outline-none focus:border focus:border-gray-700"
                />
                {
                    errors.courseTitle && (
                        <span className="text-xs text-red-400" >Course title is required</span>
                    )
                }
            </div>

            {/*Course short desc  */}
            <div>
                <label htmlFor="courseShortDesc"
                >Course Short Description <span className="text-red-400">*</span></label>
                <textarea 
                    rows={6}
                    id="courseShortDesc"
                    placeholder="Enter Description"
                    {...register("courseShortDesc",{required:true})}
                    className="w-full text-[15px]  bg-btn-secondary-hover rounded-md px-3 py-2 focus:outline-none focus:border focus:border-gray-700"
                />
                {
                    errors.courseShortDesc && (
                        <span className="text-xs text-red-400">Course description is required</span>
                    )
                }
            </div>

            {/*Course price */}
            <div>
                <label htmlFor="coursePrice"
                >Course Price <span className="text-red-400">*</span></label>
                <input 
                    id="coursePrice"
                    placeholder="Enter course price (₹)"
                    {...register("coursePrice",{required:true, valueAsNumber:true})}
                    className="w-full text-[15px] bg-btn-secondary-hover rounded-md px-3 py-2 focus:outline-none focus:border focus:border-gray-700 "
                />
                {
                    errors.coursePrice && (
                        <span className="text-xs text-red-400">Course price is required</span>
                    )
                }
            </div>

            {/*Course category */}
            <div>
                <label htmlFor="courseCategory"
                >Course category <span className="text-red-400">*</span></label>
                <select
                    id="courseCategory"
                    defaultValue={""}
                    placeholder="Enter course category"
                    {...register("courseCategory",{required:true})}
                    className="w-full bg-btn-secondary-hover rounded-md px-3 py-2 focus:outline-none focus:border focus:border-gray-700 
                    bg-btn-secondary-hover
                     sm:py-3
                     border border-transparent                   
                    text-sm sm:text-[15px]
                    text-white"
                >
                    <option value="" disabled className="">Choose a Category</option>

                    {
                        !loading && courseCategories.map((category,index)=>(
                            
                            <option key={index} value={category?._id}>{category?.name}</option>
                        ))
                    }
                </select>
                {
                    errors.courseCategory && (
                        <span className="text-xs text-red-400">Course category is required</span>
                    )
                }
            </div>

            {/* Course Tags */}
            <Tags
                label="Tags"
                name="courseTags"
                placeholder="Enter Tags and press Enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            {/* ThumbNail */}
            <Upload
                name="thumbnailImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbNail : null}
            />

            {/* Course benefits */}
            <div>
                <label htmlFor="courseBenefits">Course Benefits <span className="text-red-400">*</span></label>
                <textarea 
                    type="text"
                    id="courseBenefits"
                    placeholder="Enter course benefits"
                    {...register("courseBenefits",{required:true})}
                    className="w-full text-[15px]  bg-btn-secondary-hover rounded-md px-3 py-2 focus:outline-none focus:border focus:border-gray-700"
                />
                {
                    errors.courseBenefits && (
                        <span className="text-xs text-red-400">Course benefits are required</span>
                    )
                }
            </div>
            
            {/* Course requirements / instructions */}
            <RequirementField
                name="courseRequirements"
                label="Requirements/Instructions"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            {/* Submit buttons */}
            <div className="flex gap-4 justify-end">
                {
                    editCourse && (
                        <button onClick={()=> dispatch(setStep(2))}
                        className="flex items-center rounded-xl cursor-pointer px-5 py-2 bg-btn-secondary-hover hover:scale-102 transition-all duration-100">
                            Continue with Saving
                        </button>
                    )
                }

                <div className="bg-btn-primary flex justify-center items-center px-5 py-2 rounded-xl cursor-pointer hover:scale-102 transition-all duration-100">
                    <IconBtn 
                        text={!editCourse ? "Next" : "Save Changes"}
                    />
                </div>
                
            </div>

        </form>
    )
}