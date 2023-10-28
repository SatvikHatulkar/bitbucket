const jwt = require("jsonwebtoken")
const User = require("../models/User")

const validateRequest = (req, res) => {
    const {username} = req.body;
    if(username){

        if(username.trim().length === 0){
            res.status(400).send({message:"Please Enter Username"});
            return false;
        }
    }
    return true;
}
module.exports = async(req, res) => {
    try {
        const token = req.header("authToken");
        if (!token) {
            return res.status(401).json({ success: false, message: "No token found in request!" });
        }
        const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
        const userId = decode.id;
        const {username, skills} = req.body;
        const isValid = validateRequest(req, res);
        if(!isValid){
            return ;
        }
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({ success: false, message: "User not found!" });
        }
        if(user._id.toString() !== userId){
            return res.status(401).json({ success: false, message: "Unauthorized!" });
        }
        const updateObject = {
            username: username,
            skills: skills
        }
        const updateduser = await User.findByIdAndUpdate(req.params.id, updateObject, {new:true});
        res.json({ success: true, message: "User updated successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}