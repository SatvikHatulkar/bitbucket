const Repository = require("../models/Repo");
const jwt = require('jsonwebtoken');

const validateRepoData = ({ repositoryName, folderName, fileName, Code, tagName }) => {
    return repositoryName.trim().length > 0 && folderName.trim().length > 0 && fileName.trim().length > 0 && Code.trim().length > 0 && tagName.trim().length > 0;
};

module.exports = async (req, res) => {
    const { repositoryName, folderName, fileName, Code, tagName } = req.body;

    try {
        if (!validateRepoData({ repositoryName, folderName, fileName, Code, tagName })) {
            return res.status(400).json({ success: false, message: "Invalid data provided" });
        }

        const token = req.header("authToken");
        if (!token) {
            return res.status(401).json({ success: false, message: "No token found in request!" });
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
            const userId = decode.id;

            const newFolder = {
                name: folderName,
                file: {
                    name: fileName,
                    code: Code
                }

            };
            const newTags = {
                name: tagName,
            };

            const newRepositoryData = {
                user: userId,
                repository: repositoryName,
                folder: newFolder,
                tags: newTags
            };

            const newRepository = await Repository.create(newRepositoryData);

            return res.status(201).json({
                success: true,
                message: "Data created successfully",
                data: newRepository
            });
        } catch (error) {
            console.error(error);
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ success: false, message: "Invalid token" });
            } else {
                return res.status(500).json({ success: false, message: "Internal Server Error" });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
