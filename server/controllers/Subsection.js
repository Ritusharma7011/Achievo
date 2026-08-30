const SubSection = require("../models/SubSection");
const cloudinary = require("cloudinary").v2;
const Section = require("../models/Section");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();

//create,update,delete subsection
exports.createSubsection = async(req,res) =>{
    try{
        //fetch data from req body
        // const {sectionId, title, timeDuration, description } = req.body;
        const {sectionId, title, description } = req.body;

        //extract file/video
        const video = req.files.videoFile;

        //validation
        // if(!sectionId || !title || !timeDuration || !description || !video){
        if(!sectionId || !title || !description || !video){
            return res.status(400).json({
                success : false,
                message : "All fields are required",
            })
        }

        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        //create a subsection in db
        const subsectionDetails = await SubSection.create(
            {
                title:title,
                // timeDuration : timeDuration,
                description : description,
                videoUrl : uploadDetails.secure_url,
                
            }
        )
        //update Section with ss objId
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
                                                            {
                                                                $push : {
                                                                    subsection : subsectionDetails._id
                                                                }
                                                            },
                                                            {returnDocument: "after"})
                                                            .populate("subsection").exec()
                                                            

        console.log("Updated Section:", updatedSection);

        //return response
        return res.status(200).json({
            success : true,
            message : "Subsection created successfully",
            updatedSection
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong while creating subsection, please try later",
            error : error.message
        })
    }
}

exports.updateSubsection = async (req, res) => {
    try {
        // fetch data
        const {
            subsectionId,
            title,
            // duration,
            description
        } = req.body;

        const video = req.files?.videoFile;

        console.log("UPDATE SUBSECTION BODY:", req.body);
        console.log("UPDATE SUBSECTION FILES:", req.files);

        // validation
        if (!subsectionId 
            // || !title || 
            // !duration ||
            //  !description
            //  !video
            ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // fetch existing subsection
        const existingsubsection = await SubSection.findById(subsectionId);

        if (!existingsubsection) {
            return res.status(404).json({
                success: false,
                message: "subsection not found"
            });
        }


        // // upload new video
        // const uploadDetails = await uploadImageToCloudinary(
        //     video,
        //     process.env.FOLDER_NAME
        // );

        // // update subsection
        // const updatedsubsectionDetails =
        //     await SubSection.findByIdAndUpdate(
        //         subsectionId,
        //         {
        //             $set: {
        //                 title: title,
        //                 // duration: duration,
        //                 description: description,
        //                 videoUrl: uploadDetails.secure_url,
        //                 videoPublicId: uploadDetails.public_id
        //             }
        //         },
        //         { new: true }
        //     );
        
        // // delete old video from Cloudinary
        // // using old video's public_id
        // await cloudinary.uploader.destroy(
        //     existingsubsection.videoPublicId,
        //     {
        //         resource_type: "video"
        //     }
        // );

        let updatedsubsectionDetails;

        if (video) {
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            );

            updatedsubsectionDetails = await SubSection.findByIdAndUpdate(
                subsectionId,
                {
                    $set: {
                        title,
                        description,
                        videoUrl: uploadDetails.secure_url,
                        videoPublicId: uploadDetails.public_id
                    }
                },
                { new: true }
            );

            await cloudinary.uploader.destroy(
                existingsubsection.videoPublicId,
                {
                    resource_type: "video"
                }
            );
        } else {
            updatedsubsectionDetails = await SubSection.findByIdAndUpdate(
                subsectionId,
                {
                    $set: {
                        title,
                        description
                    }
                },
                { returnDocument: "after" }
            );
        }

        // response
        return res.status(200).json({
            success: true,
            message: "subsection updated successfully",
            updatedsubsectionDetails
        });
    }
    catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong, please try later",
            error: error.message
        });
    }
};

// exports.deleteSubsection = async(req,res) => {
//     try{
//         //fetch subsetionID from req.body
//         const {subsectionId} = req.body;

//         //delete from db
//         await SubSection.findByIdAndDelete(subsectionId);

//         //update in Course - remove sectionId from course //DONE BY ME
//         //TODO: Do we need to do this
//         const updatedCourseDetails = await Section.updateOne(
//                     { subsection: subsectionId },
//                     {
//                         $pull: {
//                             subsection: subsectionId 
//                         }
//                     },
//                     {
//                         returnDocument: "after"
//                     }
//                 );

//         //return response
//         return res.status(200).json({
//             success : true,
//             message : "subsection Deleted Successfully",
//             updatedCourseDetails
//         })
//     }
//     catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success : false,
//             message : "Something went wrong"
//         });
//     }
// }

exports.deleteSubsection = async (req, res) => {
    try {
        const { subsectionId, sectionId } = req.body;

        // Delete subsection
        await SubSection.findByIdAndDelete(subsectionId);

        // Remove subsection reference from Section
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                $pull: {
                    subsection: subsectionId
                }
            },
            {
                new: true
            }
        );

        return res.status(200).json({
            success: true,
            message: "Subsection Deleted Successfully",
            updatedSection
        });
    }
    catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};