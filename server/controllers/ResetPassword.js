//This controller creates a frontend link to rest password and send it to user's email and updates the password in db
  
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');

//resetPasswordToken
exports.resetPasswordToken = async(req,res) =>{
    try{
        //fetch email from req body
        const {email} = req.body;

        //check user for the email, and validate email
        if(!email){
            return res.status(401).json({
                success : false,
                message : "Email is missing."
            })
        }
        const user = await User.findOne({email : email});

        if(!user){
            return res.status(401).json({
                success : false,
                message : "Your Email is not registered with us."
            })
        }
        //generate token
        const token = crypto.randomUUID();

        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({email : email},
                                                            {
                                                                token : token,
                                                                resetPasswordExpires : Date.now() + 100*60*1000,
                                                            },
                                                            {returnDocument : "after"}
        )

        //create url
        // const url = `http://localhost:5173/update-password/${token}`;
        const url = `https://achievo-ed-tech.vercel.app/${token}`;

        //send mail containing url 
        await mailSender(email, "Password Reset Link - Achievo" ,
            `<p>Reset your Achievo password using link given below </p>
            <p> Reset Password Link: <p> ${url}
            `
        )
        //return response
        return res.status(200).json({
            success : true,
            message : "Email sent successfully, please check email and change password"
        })
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong while generating token."
        })
    }
}

//resetPassword
exports.resetPassword = async(req,res) =>{
    try{
        //fetch data
        const {password, confirmPassword, token} = req.body;

        //validation
        if(password !== confirmPassword){
            return res.status(401).json({
                success : false,
                message : "Password and Confirm Password do not matching, Please enter again!"
            })
        }

        //get userdetails from db uisng token
        const userDetails = await User.findOne({token : token});

        //if no entry - invalid token
        if(!userDetails){
            return res.status(400).json({
                success : false,
                message : "Invalid Token"
            })
        }
        
        //check token expiry time
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success : false,
                // message : "Token is Expired, Please regenerate the token" //changing it to imporove user interaction
                message : "Link Expired, Please regenerate the Link"
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //update in db
        await User.findOneAndUpdate({token : token},{password : hashedPassword},{ returnDocument: "after" });

        //return response
        return res.status(200).json({
            success : true,
            message : "Password reset Successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong while changing password."
        })
    }
}
