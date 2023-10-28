const jwt = require("jsonwebtoken");
const Repository = require("../models/Repo");

const validateRequest = (req, res) => {
    const { folderName } = req.body;
    if (folderName.trim().length === 0) {
        res.status(400).json({ success: false, message: "Enter Folder Name" });
        return false;
    }
    return true;
};

module.exports = async (req, res) => {
    try {
        const { folderName } = req.body;
        const token = req.header("authToken");
        if (!token) {
            return res.status(404).json({ success: false, message: "Not Allowed" });
        }
        const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
        const userId = decode.id;
        const isValid = validateRequest(req, res);
        if (!isValid) {
            return;
        }
        const repo = await Repository.findById(req.params.id);
        if (!repo) {
            return res.status(404).json({ success: false, message: "Not Found" });
        }
        if (repo.user.toString() !== userId) {
            return res.status(401).json({ success: false, message: "Unauthorized!" });
        }

        // Create a new folder object
        const newFolder = {
            name: folderName,
            file: [{ name: "Null",
                     code: "Null" }]
        };

        // Push the new folder object into the existing folder array
        repo.folder.push(newFolder);

        // Save the updated repository with the new folder
        const updatedRepo = await repo.save();

        res.json({ success: true, message: "Repository updated successfully", repo: updatedRepo });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
