const User = require('../models/User');
const OTP = require('../models/OTP');
const Profile = require('../models/Profile');
const otpGenerator = require("otp-generator");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken"); 
const mailSender = require('../utils/mailSender');
const { passwordUpdated } = require('../mail/templates/passwordUpdate');

require("dotenv").config();

//sendotp
exports.sendotp = async(req,res) => {
    try{
        //fetch email from req
        const {email} = req.body;

        //check if user exists already
        const checkUserPresent = await User.findOne({email});

        //if already exists -> return response
        if(checkUserPresent){
            return res.status(400).json({
                success : false,
                message : "User already registered"
            })
        }

        //generate OTP
        var otp = otpGenerator.generate(6, {
            lowerCaseAlphabets : false,
            upperCaseAlphabets : false,
            specialChars : false,
        })

        console.log("OTP Generated: ", otp);

        //check unique otp or not
        let result = await OTP.findOne({otp : otp});

        //This is not happen in real industry, in real world rather than checking db and generating againa and again we use a otp generator which garauntees unique otp each time 
        while(result){ // while unique otp not found generate and check again and again
            //generate OTP
            otp = otpGenerator.generate(6, {
                lowerCaseAlphabets : false,
                upperCaseAlphabets : false,
                specialChars : false,
            })
            result = await OTP.findOne({otp : otp});
        }

        //save otp in db
        const otpPayload = {email, otp};
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP Body: ", otpBody);

        // return successful response
        res.status(200).json({
            success : true,
            message : "OTP sent successfully",
            otp
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message : error.message,
        })
    }
}

//signup
exports.signUp = async(req,res) => {
    try{
        // fetch user data from req body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        //validate user data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success : false,
                message : "All fields are required"
            })
        }

        //match password and confirmPassword
        if(password !== confirmPassword){
            return res.status(403).json({
                success : false,
                message : "Password and Confirm Password value does not match"
            })
        }

        //check user already exists?
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success : false,
                message : "User is already registered"
            })
        }

        //find most recent otp for user from db 
        const recentOTP = await OTP.find({email}).sort({createdAt : -1}).limit(1);
        console.log("Recentotp : " , recentOTP);

        //validate OTP
        if(recentOTP.length === 0){
            //otp not found
            return res.status(400).json({
                success : false,
                message : "OTP Not Found"
            })
        }
        
        else if(Number(otp) !== recentOTP[0].otp){
            //otp not matched
            return res.status(400).json({
                success : false,
                message : "Invalid OTP"
            })
        }

        console.log(otp, typeof otp);
        console.log(recentOTP[0].otp, typeof recentOTP[0].otp);

        //Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create entry in db
        const profileDetails = await Profile.create({
            gender : null,
            dateOfBirth : null,
            about : null,
            contactNumber : null
        })

        const user = await User.create({
            firstName, lastName, email, contactNumber, 
            password : hashedPassword,
            accountType, additionalDetails : profileDetails._id,
            image : `https://api.dicebear.com/5.x/initials/svg?seed= ${firstName} ${lastName}`
        })

        // OTP successfully verified
        const deleteResult = await OTP.deleteOne({
            _id: recentOTP[0]._id
        });

        //return res
        return res.status(200).json({
                success : true,
                message : "User registered successfully",
                user
            })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message : "User cannot be registered, Please try again",
        })
    }
}

//login
exports.login = async (req,res) =>{
    try{
        //fetch data from req body
        const {email, password} = req.body;
        //validate data
        if(!email || !password){
            return res.status(403).json({
                success : false,
                message : "All fields are required"
            })
        }

        //check user exist or not
        const user = await User.findOne({email}).populate("additionalDetails");

        if(!user){
            return res.status(401).json({
                success : false,
                message : "User does not exist, Please sign up"
            })
        }

        //match password and generate JWT token
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email : user.email,
                id : user._id,
                accountType : user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn : "24h"
            });
            user.token = token;
            user.password = undefined;


            //create cookie and send response
            const options = {
                expiresIn : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly : true
            }
            res.cookie("token", token, options).status(200).json({
                success : true,
                token,
                user,
                message : "Logged in successfully"
            });
        }
        else{
            return res.status(401).json({
                success : false,
                message : "Password is incorrect"
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Login Failure, Please try again"
        })
    }
}

//changepassword
exports.changePassword = async (req,res) =>{
    try{
        //fetch data from user -> oldPass , newPass, confirmNew Pass
        const {oldPassword, newPassword, confirmNewPassword} = req.body;

        //validation of data
        if(!oldPassword || !newPassword || !confirmNewPassword){
            return res.status(401).json({
                success : false,
                message : "All fields are required"
            })
        }
        //logged-in user id
        const userId = req.user.id;

        //match old password from db 
        const user = await User.findById(userId);

        //check user exist or not
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User doesn't exist"
            })
        }

        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
        
        if(!isPasswordMatch) {
            return res.status(401).json({
                success : false,
                message : "Old Password is Incorrect"
            })
        }
        
        // match new password and confirmnewPassword
        if(newPassword !== confirmNewPassword){
            return res.status(401).json({
                success : false,
                message : "New Password does not match with Confirm New Password"
            })
        }
        //Hash new Password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        //update in DB
        const updatedPassword = await User.findByIdAndUpdate(userId,{password : hashedPassword},{returnDocument : "after"});

        // Send password changed notification email
        // await mailSender(
        //     user.email,
        //     "Password Updated Successfully - Achievo",
        //     `
        //         <h2>Password Changed Successfully</h2>
        //         <p>Hello ${user.firstName},</p>
        //         <p>Your Achievo account password has been changed successfully.</p>
        //         <p>If you did not make this change, please contact support immediately.</p>
        //     `
        // )
        //This chnage is made by me
        await mailSender(passwordUpdated(user.email,user.firstName));

        res.status(200).json({
            success : true,
            message : "Password changed successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}