const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const validateRequest = (req, res) => {
    const { CurrentPassword, newPassword } = req.body;
    if (!CurrentPassword) {
        res.status(400).json({ message: "Enter Current Password." });
        return false;
    }
    if (!newPassword) {
        res.status(400).json({ message: "Enter New Password." });
        return false;
    }
    if (newPassword.trim().length <= 5) {
        res.status(400).json({ message: "Password should be at least 6 characters long." });
        return false;
    }
    return true;
};

module.exports = async (req, res) => {
    const { CurrentPassword, newPassword } = req.body;
    try {
        const token = req.header("authToken");
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Allowed" });
        }
        const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
        const userId = decode.id;
        const isValid = validateRequest(req, res);
        if (!isValid) {
            return;
        }
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found!" });
        }
        if (user._id.toString() !== userId) {
            return res.status(401).json({ success: false, message: "Unauthorized!" });
        }

        // Compare hashed password
        const match = await bcrypt.compare(CurrentPassword, user.password);
        if (!match) {
            return res.status(400).json({ success: false, message: "Wrong Password!" });
        }

        // Hash the new password before saving
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
