const {instance} = require("../config/razorpay");
const Course = require('../models/Course');
const User = require("../models/User");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const courseEnrollmentEmail = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const {paymentSuccessEmail} = require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");

//capture the payment and initialize the Razorpay order
exports.capturePayment = async(req,res) =>{
        //fetch courseId and user id
        const {courseId} = req.body;
        const userId = req.user.id;

        //valid courseId
        //validation
        if(!courseId){
            return res.status(400).json({
                success : false,
                message : "Please provide valid course ID"
            })
        }

        //valid coursedetails
        let course;
        try{
            course = await Course.findById(courseId);
            if(!course){
                return res.status(404).json({
                    success : false,
                    message : "Could not find the course"
                })   
            }

            //user already pay the same course
            const uid = new mongoose.Types.ObjectId(userId); //userid here is string but in schema it is ObjId therefore conversion string to objeid
            if(course.studentsEnrolled.includes(uid)){
                return res.status(400).json({
                    success : false,
                    message : "Student is already enrolled"
                })
            }
        }
        catch(error){
            return res.status(500).json({
                success : false,
                message : error.message
            });
        }
        
        //order create
        const amount = course.price;
        const currency = "INR"

        const options = {
            amount : amount * 100,
            currency,
            receipt :  Math.random(Date.now()).toString(),
            notes :{
                courseId : courseId,
                userId
            }
        }
        try{
            //initiate payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);

            //return response
            return res.status(200).json({
                success : true,
                courseName : course.courseName,
                courseDescription : courseDescription,
                thumbnail : course.thumbNail,
                orderId : paymentResponse.id,
                currency : paymentResponse.currency,
                amount : paymentResponse.amount,
            })
        }
        catch(error){
            return res.status(500).json({
                success : false,
                message : "Course could not initiate order"
            })
        }
        
}

//verifySignature - verifies secret sent by razorpay success notificiation
exports.verifySignature = async(req,res) =>{
    const webhookSecret = "12345678"; //Server has this secret 

    const signature = req.headers["x-razorpay-signature"]; //Razorpay sent this secret key 

    //hashing webhookSecret to match with already hashed signature
    crypto.createHmac("sha256", webhookSecret);//Step - 1 //two parameters passed - sha256 is hashing algo and webhookSecret is secret key 
    shasum.update(JSON.stringify(req.body)) ; //Step - 2 convert hmac obj to string
    const digest = shasum.digest("hex"); //Step - 3 convert in hexadecimal format in digest

    //now match digest and signature
    if(digest === signature){
        console.log("Payment is Authorized");

        // const emailResponseSuccessfulPayment = await mailSender(enrolledStudent.email, "Successful Payment - Achievo", 
        //                                                         paymentSuccessEmail(enrolledStudent.firstName, req.body.payload.payment.entity.amount, add Orderid here, add paymentid here))


        const {courseId, userId} = req.body.payload.payment.entity.notes;
        try{
            //fulfill the action
            //find the course and enroll the student
            const enrolledCourse = await Course.findByIdAndUpdate({_id : courseId},
                                                                {
                                                                    $push:{
                                                                        studentsEnrolled : userId
                                                                    }
                                                                },
                                                                {returnDocument : "after"}
            )

            if(!enrolledCourse){
                return res.status(404).json({
                    success : false,
                    message : "Course not found"
                })
            }

            console.log(enrolledCourse);

            //find the student and add the course to their enrolled courses
            const enrolledStudent = await User.findByIdAndUpdate({_id : userId},{$push : {courses : courseId}},{returnDocument : "after"});

            console.log(enrolledStudent);

            //mail send confirmation
            const emailResponseCourseEnrollment = await mailSender(
                                        enrolledStudent.email,
                                        "Congratulations from Achievo",
                                        // `Congratulations, you enrolled new Course - ${enrolledCourse.courseName} on Achiveo`,
                                        courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName),
            );
            console.log(emailResponseCourseEnrollment);

            

            return res.status(200).json({
                success : true,
                message : "Signature verified and Course added"
            })
        }
        catch(error){
            return res.status(500).json({
                success : false,
                message : "Something went wrong, please try later"
            })
        }
    }
    else{
        return res.status(400).json({
                success : false,
                message : "Invalid request"
            })
    }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;

    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" });
    }

    try {
        const enrolledStudent = await User.findById(userId);

        await mailSender(
                            enrolledStudent.email,
                            `Payment Received`,
                            paymentSuccessEmail(
                                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                                amount / 100,
                                orderId,
                                paymentId
                            )
                            );
                            
    } catch (error) {
        console.log("error in sending mail", error);
        return res
        .status(400)
        .json({ success: false, message: "Could not send email" });
    }
};

// const enrollStudents = async (courses, userId, res) => {
//     if (!courses || !userId) {
//         return res
//         .status(400)
//         .json({
//             success: false,
//             message: "Please Provide Course ID and User ID",
//         });
//     }

//     for (const courseId of courses) {
//         try {
//         const enrolledCourse = await Course.findOneAndUpdate(
//             { _id: courseId },
//             { $push: { studentsEnrolled: userId } },
//             { new: true }
//         );

//         if (!enrolledCourse) {
//             return res
//             .status(500)
//             .json({ success: false, error: "Course not found" });
//         }
//         console.log("Updated course: ", enrolledCourse);

//         const courseProgress = await CourseProgress.create({
//             courseID: courseId,
//             userId: userId,
//             completedVideos: [],
//         });

//         const enrolledStudent = await User.findByIdAndUpdate(
//             userId,
//             {
//             $push: {
//                 courses: courseId,
//                 courseProgress: courseProgress._id,
//             },
//             },
//             { new: true }
//         );

//         console.log("Enrolled student: ", enrolledStudent);

//         const emailResponse = await mailSender(
//             enrolledStudent.email,
//             `Successfully Enrolled into ${enrolledCourse.courseName}`,
//             courseEnrollmentEmail(
//             enrolledCourse.courseName,
//             `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
//             )
//         );

//         console.log("Email sent successfully: ", emailResponse.response);
//         } catch (error) {
//         console.log(error);
//         return res.status(400).json({ success: false, error: error.message });
//         }
//     }
// };
//MANY CHANGES 
 

