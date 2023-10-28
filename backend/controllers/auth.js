const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async(req, res) => {
    const token = req.header("authToken");
    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN)
            // req.users = decode;
            userId = decode.id;
            const user = await User.findById(userId).select("-password")
            res.send(user)
            // res.json({
            //     auth: true,
            //     data: decode
            // })
        } catch (error) {
            res.json({
                auth: false,
                data: error.message
            })
        }
    } else {
        res.json({
            auth: false,
            data: "No token found in request!"
        });
    }
}