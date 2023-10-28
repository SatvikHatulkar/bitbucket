const jwt = require("jsonwebtoken");
const Repository = require("../models/Repo");

module.exports = async (req, res) => {
    try {
        const token = req.header("authToken");
        if (!token) {
            return res.status(401).json({ success: false, message: "Not Allowed" });
        }

        const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
        const userId = decode.id;

        const repositoryId = req.params.repositoryId;
        const folderId = req.params.folderId;
        const fileId = req.params.fileId;

        // Check if repositoryId exists in the database
        const repository = await Repository.findById(repositoryId);

        if (!repository) {
            return res.status(400).json({ success: false, message: "Invalid Repository ID provided" });
        }

        // Check if the user attempting to delete is the owner of the repository
        if (repository.user.toString() !== userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: You are not the owner of this repository" });
        }

        // Modify the repository object in JavaScript
        if (folderId && fileId) {
            const folderIndex = repository.folder.findIndex(f => f._id.toString() === folderId);
            if (folderIndex !== -1) {
                const fileIndex = repository.folder[folderIndex].file.findIndex(f => f._id.toString() === fileId);
                if (fileIndex !== -1) {
                    // Remove the file from the folder
                    repository.folder[folderIndex].file.splice(fileIndex, 1);
                }
            }
        } else if (folderId) {
            // Remove the entire folder
            const folderIndex = repository.folder.findIndex(f => f._id.toString() === folderId);
            if (folderIndex !== -1) {
                repository.folder.splice(folderIndex, 1);
            } else {
                return res.status(400).json({ success: false, message: "Invalid Folder ID provided" });
            }
        } else {
            // If neither folderId nor fileId is provided, delete the entire repository
            await Repository.findByIdAndDelete(repositoryId);
            return res.status(200).json({ success: true, message: "Repository deleted successfully" });
        }

        // Save the updated repository back to the database without validation
        const updatedRepository = await Repository.findByIdAndUpdate(repositoryId, repository, { new: true, runValidators: false });

        res.status(200).json({ success: true, message: "Operation completed successfully", repository: updatedRepository });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
