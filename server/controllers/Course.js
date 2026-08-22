const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/SecToDuration");

//createCourser handler function
exports.createCourse = async (req,res) =>{
    try{
        //fetch data
        let {courseName, courseDescription, whatYouWillLearn, price, tag: _tag, category, status, instructions :_instructions  } = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;
        const tag = JSON.parse(_tag);
        const instructions = JSON.parse(_instructions);

        //validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tag.length || !thumbnail || !instructions.length){
            return res.status(401).json({
                success : false,
                message : "All fields are required"
            });
        }

        if(!status || status == undefined){
            status = "Draft";
        }

        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details: ", instructorDetails);
        //TODO : verify userId and instructor_id same or not


        if(!instructorDetails){
            return res.status(404).json({
                success : false,
                message : "Instructor Details Not Found"
            });
        }

        if (instructorDetails.accountType !== "Instructor") { //SUggested code from chatgpt if need you can remove it 
            return res.status(403).json({
                success: false,
                message: "Only instructors can create courses"
            });
        }


        //check category is valid or not
        const categoryDetails = await Category.findById(category); // category is a id

        if(!categoryDetails){
            return res.status(404).json({
                success : false,
                message : "Category Details Not Found"
            });
        }

        //Upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor : instructorDetails._id, //because instructor is an id
            whatYouWillLearn :whatYouWillLearn,
            price,
            tag,
            category: categoryDetails._id,
            thumbNail: thumbnailImage.secure_url,
            status : status,
            instructions
        });

        //add the new Course in courses list of instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push :{
                    courses : newCourse._id,
                }
            },
            {returnDocument: "after"},
        );

        //update category Schema
        await Category.findByIdAndUpdate(
            {_id: categoryDetails._id},
            {
                $push :{
                    courses : newCourse._id,
                }
            }
        )

        //return response
        return res.status(200).json({
            success : true,
            message : "Course created successfully",
            data : newCourse
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong, please try later"
        })
    }
}

//getAllCourses handler function
exports.showAllCourses = async (req, res) =>{
    try{
        const allCourses = await Course.find({},{courseName:true,
                                                price:true,
                                                instructor:true,
                                                thumbNail:true,
                                                ratingAndReviews:true,
                                                studentsEnrolled:true })
                                                .populate("instructor")
                                                .exec();
        return res.status(200).json({
            success : true,
            message : "Data for all courses fetched successfully",
            data : allCourses,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong, please try later"
        })
    }
}

//getCourseDetails
exports.getCourseDetails = async(req,res) =>{
    try{
        //get id
        const {courseId} = req.body;

        //find course details
        const courseDetails = await Course.find(
                                        {_id : courseId})
                                        .populate(
                                            {
                                                path : "instructor",
                                                populate : {
                                                    path : "additionalDetails"
                                                }
                                            }
                                        )
                                        .populate("category")
                                        .populate("ratingAndReviews")
                                        .populate(
                                            {
                                                path : "courseContent",
                                                populate :{
                                                    path : "subsection",
                                                    select :"-videoUrl",
                                                }
                                            }
                                        )
                                        .exec();
        //Validation
        if(!courseDetails){
            return res.status(404).json({
                success : false,
                message : `Could not find the course with ${courseId}`
            });
        }

        //course duration
        // let totalDurationInSeconds = 0;

        // courseDetails.courseContent.forEach((content) => {
        // content.subsection.forEach((subsection) => {
        //     const timeDurationInSeconds = parseInt(subsection.timeDuration);
        //     totalDurationInSeconds += timeDurationInSeconds;
        //     });
        // });

        // const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        //return response 
        return res.status(200).json({
            success : true,
            message : "Course Details found successfully",
            courseDetails,
            // totalDuration
        });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message,
        });
    }
}

// exports.editCourse = async (req, res) => {
//     try {
//         const { courseId } = req.body;
//         const updates = req.body;
//         const course = await Course.findById(courseId);

//         if (!course) {
//         return res.status(404).json({ error: "Course not found" });
//         }

//         if (req.files) {
//         console.log("thumbnail update");
//         const thumbnail = req.files.thumbnailImage;
//         const thumbnailImage = await uploadImageToCloudinary(
//             thumbnail,
//             process.env.FOLDER_NAME
//         );
//         course.thumbNail = thumbnailImage.secure_url;
//         }

//         for (const key in updates) {
//         if (updates.hasOwnProperty(key)) {
//             if (key === "tag" || key === "instructions") {
//             course[key] = JSON.parse(updates[key]);
//             } else {
//             course[key] = updates[key];
//             }
//         }
//         }

//         await course.save();

//         const updatedCourse = await Course.findOne({
//                                                     _id: courseId,
//                                                     })
//                                                     .populate({
//                                                         path: "instructor",
//                                                         populate: {
//                                                         path: "additionalDetails",
//                                                         },
//                                                     })
//                                                     .populate("category")
//                                                     .populate("ratingAndReviews")
//                                                     .populate({
//                                                         path: "courseContent",
//                                                         populate: {
//                                                         path: "subsection",
//                                                         },
//                                                     })
//                                                     .exec();

//         res.json({
//         success: true,
//         message: "Course updated successfully",
//         data: updatedCourse,
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//         success: false,
//         message: "Internal server error",
//         error: error.message,
//         });
//     }
// };

exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

        // Thumbnail
        if (req.files?.thumbnailImage) {
            console.log("Thumbnail update");

            const thumbnail = req.files.thumbnailImage;

            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            );

            course.thumbNail = thumbnailImage.secure_url;
        }

        // Other fields
        for (const key in req.body) {

            if (key === "courseId") continue;

            if (key === "tag" || key === "instructions") {
                course[key] = JSON.parse(req.body[key]);
            } 
            else if (key !== "thumbnailImage") {
                course[key] = req.body[key];
            }
        }

        await course.save();

        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subsection",
                },
            });

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });

    } catch (error) {
        console.error("EDIT COURSE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const allCourses = await Course.find(
        { status: "Published" },
        {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: true,
        }
        )
        .populate("instructor")
        .exec();

        return res.status(200).json({
        success: true,
        data: allCourses,
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
        success: false,
        message: `Can't Fetch Course Data`,
        error: error.message,
        });
    }
};

exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user.id;
        const courseDetails = await Course.findOne({
        _id: courseId,
        })
        .populate({
            path: "instructor",
            populate: {
            path: "additionalDetails",
            },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
            path: "subsection",
            },
        })
        .exec();

        let courseProgressCount = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        });

        console.log("courseProgressCount : ", courseProgressCount);

        if (!courseDetails) {
        return res.status(400).json({
            success: false,
            message: `Could not find course with id: ${courseId}`,
        });
        }

        // let totalDurationInSeconds = 0;
        // courseDetails.courseContent.forEach((content) => {
        // content.subsection.forEach((subsection) => {
        //     const timeDurationInSeconds = parseInt(subsection.timeDuration) || 0;
        //     totalDurationInSeconds += timeDurationInSeconds;
        // });
        // });

        // const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        return res.status(200).json({
        success: true,
        data: {
            courseDetails,
            // totalDuration,
            completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
        });
    } catch (error) {
        return res.status(500).json({
        success: false,
        message: error.message,
        });
    }
};

exports.getInstructorCourses = async (req, res) => {
    try {
        const instructorId = req.user.id;

        const instructorCourses = await Course.find({
        instructor: instructorId,
        })
        .sort({ createdAt: -1 })
        .populate({
            path: "courseContent",
            populate: {
            path: "subsection",
            },
        })
        .exec();

        res.status(200).json({
        success: true,
        data: instructorCourses,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
        success: false,
        message: "Failed to retrieve instructor courses",
        error: error.message,
        });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
        return res.status(404).json({ message: "Course not found" });
        }

        const studentsEnrolled = course.studentsEnrolled;
        for (const studentId of studentsEnrolled) {
        await User.findByIdAndUpdate(studentId, {
            $pull: { courses: courseId },
        });
        }

        const courseSections = course.courseContent;
        for (const sectionId of courseSections) {
        const section = await Section.findById(sectionId);
        if (section) {
            const subsections = section.subsection;
            for (const subsectionId of subsections) {
            await SubSection.findByIdAndDelete(subsectionId);
            }
        }

        await Section.findByIdAndDelete(sectionId);
        }

        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
        });
    }
};

