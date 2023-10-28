const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/User")

module.exports = async (req, res) => {
    const {username, password } = req.body;
    const DBUser = await User.findOne({ username }).exec()

    if (DBUser) {
        const match = await bcrypt.compare(password, DBUser.password)
        if (match) {
            const token = jwt.sign({ id: DBUser._id, username: DBUser.username, email: DBUser.email }, process.env.JWT_LOGIN_TOKEN, { expiresIn: "1d" });
            res.json({
                message: "Login Successfull",
                token
            })
        } else {
            res.status(400).json({ message: "Invalid Cred!" })
        }
    } else {
        res.status(400).json({ message: "Invalid Cred!" })
    }
}