const jwt = require("jsonwebtoken");
const Repository = require("../models/Repo");

module.exports = async (req, res) => {
    const token = req.header("authToken");
    if (token) {
        try {
            const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
            const userId = decode.id;
            
            // Find all repositories associated with the user's ID
            const repositories = await Repository.find({ user: userId });
            if(!repositories){
                res.status(400).json({success: false, message: "Not Allowed"})
            }
            res.json(repositories);
        } catch (err) {
            res.json({
                auth: false,
                data: err.message
            });
        }
    } else {
        res.json({
            auth: false,
            data: "No token found in request!"
        });
    }
};
