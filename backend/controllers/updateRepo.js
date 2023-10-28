// const jwt = require("jsonwebtoken");
// const Repository = require("../models/Repo");

// const validateRequest = (req, res) => {
//     const { repositoryName, folderName, fileName } = req.body;

//     if(repositoryName){
//         if (repositoryName.trim().length === 0) {
//             res.status(400).json({ message: "Please Enter repository name" });
//             return false;
//         }
//     }
//     if(folderName){

//         if (folderName.trim().length === 0) {
//             res.status(400).json({ message: "Please Enter folder name" });
//             return false;
//         }
//     }
//     if(fileName){

//         if (fileName.trim().length === 0) {
//             res.status(400).json({ message: "Please Enter file name" });
//             return false;
//         }
//     }
//     return true;
// };

// module.exports = async (req, res) => {
//     try {
//         const token = req.header("authToken");
//         if (!token) {
//             return res.status(401).json({ success: false, message: "No token found in request!" });
//         }

//         const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
//         const userId = decode.id;

//         const { repositoryName, folderName, fileName } = req.body;

//         const isValid = validateRequest(req, res);
//         if (!isValid) {
//             return ; // Validation failed, response already sent
//         }

//         const repo = await Repository.findById(req.params.id);
//         if (!repo) {
//             return res.status(404).json({ success: false, message: "Repository not found!" });
//         }

//         if (repo.user.toString() !== userId) {
//             return res.status(401).json({ success: false, message: "Unauthorized!" });
//         }

//         // Prepare the update object based on the schema of your model

//         const updateObject = {
//             // repository: repositoryName,
//             // folder: [
//             //     {
//             //         name: folderName,
//             //         file: [{ name: fileName }]
//             //     }
//             // ]
//         };
//         if(repositoryName){updateObject.repository = repositoryName}
//         if(folderName){updateObject.repository.folder[0].name = folderName}
//         if(fileName){updateObject.repository.folder[0].file[0].name = fileName}

//         // Perform the update operation and return the updated repository
//         const updatedRepo = await Repository.findByIdAndUpdate(req.params.id, updateObject, { new: true });

//         res.json({ success: true, message: "Repository updated successfully", repo: updatedRepo });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

const jwt = require("jsonwebtoken");
const Repository = require("../models/Repo");

const validateRequest = (req, res) => {
    const { repositoryName, folderName, fileName, folderIndex, fileIndex, Code, tagIndex, tagName } = req.body;

    if (!repositoryName && folderIndex === undefined && fileIndex === undefined && tagIndex === undefined) {
        return res.status(400).json({ success: false, message: "Invalid request. Please provide valid data." });
    }

    if (repositoryName && repositoryName.trim().length === 0) {
        return res.status(400).json({ success: false, message: "Please enter a valid repository name." });
    }

    if (folderIndex !== undefined) {
        if (folderIndex < 0) {
            return res.status(400).json({ success: false, message: "Invalid folder index." });
        }
        if(folderName  !== undefined){
            if (folderName && folderName.trim().length === 0) {
                return res.status(400).json({ success: false, message: "Please enter a valid folder name." });
            }
        }
    }

    if (tagIndex !== undefined) {
        if (tagIndex < 0) {
            return res.status(400).json({ success: false, message: "Invalid tag index." });
        }
        if(tagName  !== undefined){
            if (tagName && tagName.trim().length === 0) {
                return res.status(400).json({ success: false, message: "Please enter a valid tag name." });
            }
        }
    }

    if(Code !== undefined){
        if(Code.trim().length === 0){
            res.status(400).json({success:false, message: "Please Enter The Valid Code"})
            return false;
        }
    }

    if (fileIndex !== undefined) {
        if (fileIndex < 0) {
            return res.status(400).json({ success: false, message: "Invalid file index." });
        }
        if (fileName && fileName.trim().length === 0) {
            return res.status(400).json({ success: false, message: "Please enter a valid file name." });
        }
    }

    return true;
};

module.exports = async (req, res) => {
    try {
        const token = req.header("authToken");
        if (!token) {
            return res.status(401).json({ success: false, message: "No token found in the request!" });
        }

        const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
        const userId = decode.id;

        const { repositoryName, folderName, fileName, folderIndex, fileIndex, Code, tagName, tagIndex } = req.body;

        const isValid = validateRequest(req, res);
        if (!isValid) {
            return; // Validation failed, response already sent
        }

        const repo = await Repository.findById(req.params.id);
        if (!repo) {
            return res.status(404).json({ success: false, message: "Repository not found!" });
        }

        if (repo.user.toString() !== userId) {
            return res.status(401).json({ success: false, message: "Unauthorized!" });
        }

        // Update repository name if provided
        if (repositoryName) {
            repo.repository = repositoryName;
        }

        // Update folder if provided
        if (folderIndex !== undefined) {
            if(folderName  !== undefined){

                if (folderIndex < repo.folder.length) {
                    repo.folder[folderIndex].name = folderName;
                } else {
                    return res.status(400).json({ success: false, message: "Invalid folder index!" });
                }
            }
        }

        // Update tag if provided
        if (tagIndex !== undefined) {
            if(tagName  !== undefined){

                if (tagIndex< repo.tags.length) {
                    repo.tags[tagIndex].name = tagName;
                } else {
                    return res.status(400).json({ success: false, message: "Invalid tag index!" });
                }
            }
        }

        // Update file if provided
        if (folderIndex !== undefined && fileIndex !== undefined && fileName !== undefined) {
            if (folderIndex < repo.folder.length && fileIndex < repo.folder[folderIndex].file.length) {
                repo.folder[folderIndex].file[fileIndex].name = fileName;
            } else {
                return res.status(400).json({ success: false, message: "Invalid folder or file index!" });
            }
        }
        //Update the code if provided
        if (folderIndex !== undefined && fileIndex !== undefined && Code !== undefined) {
            if (folderIndex < repo.folder.length && fileIndex < repo.folder[folderIndex].file.length) {
                repo.folder[folderIndex].file[fileIndex].code = Code;
            } else {
                return res.status(400).json({ success: false, message: "Invalid folder or file index!" });
            }
        }

        // Save the updated repository
        const updatedRepo = await repo.save();

        res.json({ success: true, message: "Repository updated successfully", repo: updatedRepo });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
