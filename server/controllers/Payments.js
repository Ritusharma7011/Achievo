const {instance} = require("../config/razorpay");
const Course = require('../models/Course');
const User = require("../models/User");
const crypto = require("crypto");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const {paymentSuccessEmail} = require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");


//capture the payment and initialize the Razorpay order(for multiple items in cart)
exports.capturePayment = async(req, res)=>{

    const {courses} = req.body; // all courses list fetched
    const userId = req.user.id;

    if(courses.length === 0){
        return res.status(400).json({
            success:  false,
            message: "Please provide course id"
        })
    }

    //calculate total amount
    let totalAmount = 0;
    for(const course_id of courses){
        let course;
        try{
            course = await Course.findById(course_id);
            if(!course){
                return res.status(404).json({
                    success : false,
                    message : "Could not find course"
                })
            }

            //is student already enrolled
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(400).json({
                    success : false,
                    message : `You are already enrolled in ${course.courseName}`
                })
            }

            totalAmount += course.price;
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message:error.message
            })
        }
    }

    const options = {
        amount : totalAmount * 100,
        currency : "INR",
        receipt : Math.random(Date.now()).toString(),
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        return res.status(200).json({
            success : true,
            message : paymentResponse,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Could not initiate order"
        })
    }
}

//verify the payment without webhook (can be named as verifyPayment)
exports.verifySignature = async(req, res)=>{
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses ||
        !userId ){
        return res.status(400).json({
            success : false,
            message: "Payment Failed"
        })
    }

    //steps for razorpay encrypt our expectedSignature with razorpay returned signature
    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).
    update(body.toString())
    .digest("hex");


    if(expectedSignature === razorpay_signature){
        //enroll student

        await enrollStudents(courses, userId, res);

        return res.status(200).json({
            success: true,
            message : "Payment Verified"
        })
    }
    return res.status(400).json({
        success: false,
        message : "Payment Failed"
    })

}

//function to enroll students
const enrollStudents = async(courses, userId, res)=>{
    if(!courses || !userId){
        return res.status(400).json({
            success: false,
            message : "Please provide data for courses and userId"
        });
    }

    for(const courseId of courses){
        try{
            //find course and enroll student
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id: courseId},
                {$push: {studentsEnrolled: userId}},
                {returnDocument: "after"}
            )

            await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
            });

            if(!enrolledCourse){
                return res.status(404).json({
                    success: false,
                    message : "Course not found"
                })
            }

            //insert courses to student enrolled list
            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {$push:{courses: courseId},
                }, {returnDocument:"after"}
                
            )

            //send mail to student
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Congratulations! Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}` )
            )

            console.log("Email sent successfully", emailResponse);
        }
        catch(error){
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
    
}

//capture the payment and initialize the Razorpay order (for single item)
// exports.capturePayment = async(req,res) =>{
//         //fetch courseId and user id
//         const {courseId} = req.body;
//         const userId = req.user.id;

//         //valid courseId
//         //validation
//         if(!courseId){
//             return res.status(400).json({
//                 success : false,
//                 message : "Please provide valid course ID"
//             })
//         }

//         //valid coursedetails
//         let course;
//         try{
//             course = await Course.findById(courseId);
//             if(!course){
//                 return res.status(404).json({
//                     success : false,
//                     message : "Could not find the course"
//                 })   
//             }

//             //user already pay the same course
//             const uid = new mongoose.Types.ObjectId(userId); //userid here is string but in schema it is ObjId therefore conversion string to objeid
//             if(course.studentsEnrolled.includes(uid)){
//                 return res.status(400).json({
//                     success : false,
//                     message : "Student is already enrolled"
//                 })
//             }
//         }
//         catch(error){
//             return res.status(500).json({
//                 success : false,
//                 message : error.message
//             });
//         }
        
//         //order create
//         const amount = course.price;
//         const currency = "INR"

//         const options = {
//             amount : amount * 100,
//             currency,
//             receipt :  Math.random(Date.now()).toString(),
//             notes :{
//                 courseId : courseId,
//                 userId
//             }
//         }
//         try{
//             //initiate payment using razorpay
//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);

//             //return response
//             return res.status(200).json({
//                 success : true,
//                 courseName : course.courseName,
//                 courseDescription : courseDescription,
//                 thumbnail : course.thumbNail,
//                 orderId : paymentResponse.id,
//                 currency : paymentResponse.currency,
//                 amount : paymentResponse.amount,
//             })
//         }
//         catch(error){
//             return res.status(500).json({
//                 success : false,
//                 message : "Course could not initiate order"
//             })
//         }
        
// }

// //verifySignature - verifies secret sent by razorpay success notificiation
// exports.verifySignature = async(req,res) =>{
//     const webhookSecret = process.env.WEBHOOK_SECRET; //Server has this secret 

//     const signature = req.headers["x-razorpay-signature"]; //Razorpay sent this secret key 

//     //hashing webhookSecret to match with already hashed signature
//     crypto.createHmac("sha256", webhookSecret);//Step - 1 //two parameters passed - sha256 is hashing algo and webhookSecret is secret key 
//     shasum.update(JSON.stringify(req.body)) ; //Step - 2 convert hmac obj to string
//     const digest = shasum.digest("hex"); //Step - 3 convert in hexadecimal format in digest

//     //now match digest and signature
//     if(digest === signature){
//         console.log("Payment is Authorized");

//         // const emailResponseSuccessfulPayment = await mailSender(enrolledStudent.email, "Successful Payment - Achievo", 
//         //                                                         paymentSuccessEmail(enrolledStudent.firstName, req.body.payload.payment.entity.amount, add Orderid here, add paymentid here))


//         const {courseId, userId} = req.body.payload.payment.entity.notes;
//         try{
//             //fulfill the action
//             //find the course and enroll the student
//             const enrolledCourse = await Course.findByIdAndUpdate({_id : courseId},
//                                                                 {
//                                                                     $push:{
//                                                                         studentsEnrolled : userId
//                                                                     }
//                                                                 },
//                                                                 {returnDocument : "after"}
//             )

//             if(!enrolledCourse){
//                 return res.status(404).json({
//                     success : false,
//                     message : "Course not found"
//                 })
//             }

//             console.log(enrolledCourse);

//             //find the student and add the course to their enrolled courses
//             const enrolledStudent = await User.findByIdAndUpdate({_id : userId},{$push : {courses : courseId}},{returnDocument : "after"});

//             console.log(enrolledStudent);

//             //mail send confirmation
//             const emailResponseCourseEnrollment = await mailSender(
//                                         enrolledStudent.email,
//                                         "Congratulations from Achievo",
//                                         // `Congratulations, you enrolled new Course - ${enrolledCourse.courseName} on Achiveo`,
//                                         courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName),
//             );
//             console.log(emailResponseCourseEnrollment);

            

//             return res.status(200).json({
//                 success : true,
//                 message : "Signature verified and Course added"
//             })
//         }
//         catch(error){
//             return res.status(500).json({
//                 success : false,
//                 message : "Something went wrong, please try later"
//             })
//         }
//     }
//     else{
//         return res.status(400).json({
//                 success : false,
//                 message : "Invalid request"
//             })
//     }
// };

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;

    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400)
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

