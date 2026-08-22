const RatingAndReview = require("../models/RatingAndReview"); 
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

//createrating
exports.createRatingAndReview = async(req,res)=>{
    try{
        //get user id
        const userId = req.user.id;

        //fetch data
        const {rating, review, courseId} = req.body;

        //check if user enrolled or not
        const courseDetails = await Course.findOne({_id: courseId, studentsEnrolled : {$elemMatch : {$eq: userId}}});

        if(!courseDetails){
            return res.status(404).json({
                success : false,
                message : "Student is not enrolled in the course."
            });
        }

        //check already reviwed or not
        const alreadyReviewed = await RatingAndReview.findOne({user: userId, course : courseId});
        if(alreadyReviewed){
            return res.status(403).json({
                success : false,
                message : "Course is already reviewed by Student."
            })
        }

        //create rating and review
        const ratingReview = await RatingAndReview.create({
                                            rating, review,
                                            course : courseId,
                                            user: userId
                                    });

        //update Course with objeId
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
                                {
                                    $push :{
                                        ratingAndReviews : ratingReview._id,
                                    }
                                }
        )
        console.log(updatedCourseDetails);

        //return response
        return res.status(200).json({
            success : true,
            message : "Course successfully rated and reviewed.",
            ratingReview
        })


    }

    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong",
            ratingReview
        })
    }
}

//getAvgRating
exports.getAverageRating = async(req,res) =>{
    try{
        //get courseId
        const courseId = req.body.courseId;

        //calculate avg rating
        const result = await RatingAndReview.aggregate([
                                {
                                    $match : {
                                        course : new mongoose.Types.ObjectId(courseId)
                                    }
                                },
                                {
                                    $group :{
                                        _id: null,
                                        averageRating : {$avg : "$rating"}
                                    }
                                }
        ]);

        if(result.length > 0){
            res.status(200).json({
                success : true,
                averageRating : result[0].averageRating,
            })
        }
        //if no rating review exist
        res.status(200).json({
            success : true,
            message : "Average Rating is 0, no ratings given till now.",
            averageRating : 0,
        })
    }
    catch(error){
        console.log(error);

        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

//getAllRating for all courses
exports.getAllRatingsAndReviews = async(req,res) => {
    try{
        const allReviews = await RatingAndReview.find().sort({rating : "desc"}).populate({
                                                                        path: "user",
                                                                        select : "firstName lastName email image"
                                                            })
                                                            .populate({
                                                                path : "course",
                                                                select : "courseName",
                                                            }).exec();
        
        return res.status(200).json({
            success : true,
            message : "All rating and reviews are fetched successfully",
            allReviews
        })
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}