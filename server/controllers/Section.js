const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async(req,res) =>{
    try{
        //fetch data
        const {sectionName , courseId} = req.body;
        //validation
        if(!sectionName || !courseId){
            return res.status(400).json({
            success : false,
            message : "Missing section name"
            })
        }
        // instructor verification {SUGGESTED BY CHATGPT}
        const courseDetails = await Course.findById(courseId);

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        if (courseDetails.instructor.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to add a section"
            });
        }

        //create section
        const newSection = await Section.create({sectionName});

        //update course with section objectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
                                                                    {
                                                                        $push : {
                                                                            courseContent: newSection._id
                                                                        }
                                                                    },
                                                                    {returnDocument : "after"})
                                                                    .populate({
                                                                        path: "courseContent",
                                                                        populate: {
                                                                            path: "subsection"
                                                                        }
                                                                    })
                                                                    .exec();
        //HW: use populate to replace section/subsection both in updatedCourseDetails
        console.log(updatedCourseDetails);

        //return response
        res.status(200).json({
            success : true,
            message : "Section created successfully",
            updatedCourseDetails
        })
    }

    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong while creating Section, please try later",
            error : error.message
        })
    }
}

// exports.updateSection = async(req,res) => {
//     try{
//         //data input
//         const {sectionName, sectionId} = req.body;
//         //validation
//         if(!sectionName || !sectionId){
//             return res.status(400).json({
//                 success : false,
//                 message : "Missing section Name",
//             })
//         }
//         //update data in db
//         const updatedSectionDetails = await Section.findByIdAndUpdate(sectionId,
//                                                                     {
//                                                                         sectionName : sectionName
//                                                                     },
//                                                                     {returnDocument : "after"});
        
//         //return res
//         return res.status(200).json({
//             success : true,
//             message : "Section Updated Successfully",
//             updatedSectionDetails
//         })

//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success : false,
//             message : "Something went wrong while updating section, please try later",
//             error : error.message
//         })
//     }
// }

exports.updateSection = async (req, res) => {
    try {
        const { sectionName, sectionId, courseId } = req.body;

        if (!sectionName || !sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        );

        const updatedCourseDetails = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subsection",
                },
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "Section Updated Successfully",
            updatedCourseDetails,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating section",
            error: error.message,
        });
    }
};

exports.deleteSection = async(req,res) =>{
    try{
        //fetch sectionId - assum id is send in params
        const {sectionId} = req.body;

        //delete from db
        await Section.findByIdAndDelete(sectionId);

        //update in Course - remove sectionId from course //DONE BY ME
        //TODO: Do we need to do this

        const updatedCourseDetails = await Course.findOneAndUpdate(
                { courseContent: sectionId },
                {
                    $pull: {
                        courseContent: sectionId
                    }
                },
                { new: true }
            )
            .populate({
                path: "courseContent",
                populate: {
                    path: "subsection"
                }
            })
            .exec();
        
        //return response
        return res.status(200).json({
            success : true,
            message : "Section Deleted Successfully",
            updatedCourseDetails
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong while deleting section, please try later",
            error : error.message
        })
    }
}