const nodemailer = require('nodemailer');
const User = require('../models/users');
const crypto = require('crypto');
require('dotenv').config();

const resetPasswordRequest = async (req,res)=>{
    try {
        
        
        const {email} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({msg: 'User does not exist. Please sign up!'});
        }

        // generating and setting password reset token
        user.generatePasswordReset();
        await user.save();

        res.status(200).json({msg:'Mail has been sent'});
        
        // reset URL
        const resetUrl = `http://${req.headers.host}/api/v1/account/reset/${user.resetPasswordToken}`;

        // send email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL,
            subject: 'Password Reset',
            text: `Hi ${user.name}!` +
                  `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                  `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
                  `${resetUrl}\n\n` +
                  `If you did not request this, please ignore this email and your password will remain unchanged.\n` +
                  `Regards, \n` +
                  `Chonk Bus`
        };

        
        await transporter.sendMail(mailOptions);
        
          

    } catch (error) {
        return res.status(500).json({msg:error});
    }
}

const resetPassword = async (req,res) => {
    try {
        const user = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: {$gt : Date.now()}  //check if it has expired
        });

        if(!user){
            return res.status(400).json({ msg: 'Password reset token is invalid or has expired.' });
        }

        // set new password
        const user_password = req.body.password;
        const user_confirmPassword = req.body.confirmPassword;

        if(user_password != user_confirmPassword){
            return res.status(400).json({msg: 'Password does not match!'});
        }
        
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

    
        return res.status(200).json({ msg: 'Password has been reset successfully!' });

    } catch (error) {
        return res.status(500).json({msg:error});
    }
}

module.exports = {resetPasswordRequest, resetPassword};