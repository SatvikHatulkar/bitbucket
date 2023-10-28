const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/User'); // Import your User model

const validate = (req, res) => {
    const { email } = req.body;
    if (!email || email.trim().length === 0) {
        res.status(400).json({ success: false, message: "Please Enter Email" });
        return false;
    }
    return true;
};

module.exports = async (req, res) => {
    try {
        const { email } = req.body;
        const isValid = validate(req, res);
        if (!isValid) {
            return;
        }

        // Use await here to ensure the promise is resolved
        const user = await User.findOne({ email: email });

        if (!user) {
            res.status(404).json({ success: false, message: "Not Found" });
            return;
        }

        // Generate a secure random token with crypto library
        const resetToken = crypto.randomBytes(20).toString('hex');

        // Hash the reset token before saving it to the database (optional)
        const hashedToken = bcrypt.hashSync(resetToken, 10);

        // Save the hashed reset token and its expiration time in the user's document
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 60000; // Token expires in 1 min

        // Save the user document with the updated reset token and expiration time
        await user.save();

        // Send the reset password email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: 'satvik.hatulkar.bussiness@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            text: `Click on the following link to reset your password: ${process.env.CLIENT_URL}/reset-password/${resetToken}`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ success: true, message: 'Reset email sent successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
