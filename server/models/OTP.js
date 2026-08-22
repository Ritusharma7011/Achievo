const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerification");

const OTPSchema = new mongoose.Schema({
    email :{
        type : String,
        required : true
    },
    otp : {
        type : Number,
        required : true
    },
    createdAt :{
        type : Date,
        default : Date.now,
        expires : 10*60,
        required : true
    }
});


//function to send verification email
async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email, "Verification Email from Achievo" , emailTemplate(otp));
        console.log("Email sent successfully" , mailResponse);
    }
    catch(error){
        console.log("Error occured while sending email", error);
        throw error;
    }
}

OTPSchema.pre("save" , async function(){
    await sendVerificationEmail(this.email, this.otp );
    
})


module.exports = mongoose.model("OTP", OTPSchema);