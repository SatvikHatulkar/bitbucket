// const jwt = require("jsonwebtoken");
// const Repository = require("../models/Repo")

// const validate = (req, res) => {
//     const { folderIndex, fileName } = req.body;
//     if (fileName.trim().length === 0) {
//         res.status(400).json({ success: false, message: "Enter File Name" })
//         return false;
//     }
//     if (folderIndex < 0) {
//         return false;
//     }
//     return true;
// }

// module.exports = async (req, res) => {
//     try {
//         const { folderIndex, fileName } = req.body;
//         const token = req.header("authToken");
//         if (!token) {
//             return res.status(404).json({ success: false, message: "Not Found" });
//         }
//         const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
//         const userId = decode.id;
//         const isValid = validate(req, res);
//         if (!isValid) {
//             return;
//         }
//         const repo = await Repository.findById(req.params.id);
//         if (!repo) {
//             return res.status(404).json({ success: false, message: "Not Found" });
//         }
//         if (repo.user.toString() !== userId) {
//             return res.status(401).json({ success: false, message: "Unauthorized!" });
//         }

//         const newFile = {
//             name: fileName
//         }

//         repo.folder[folderIndex].file.push(newFile);

//         const updatedRepo = await repo.save();

//         res.json({ success: true, message: "Repository updated successfully", repo: updatedRepo });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// }

const jwt = require("jsonwebtoken");
const Repository = require("../models/Repo");

const validate = (req, res) => {
    const { folderIndex, fileName, Code } = req.body;
    if (fileName.trim().length === 0) {
        res.status(400).json({ success: false, message: "Enter File Name" });
        return false;
    }
    if(Code !== undefined){
        if(Code.trim().length === 0){
            res.status(400).json({success: false, message: "Please Enter Code"})
            return false;
        }
    }
    if (folderIndex < 0) {
        return false;
    }
    return true;
};

module.exports = async (req, res) => {
    try {
        const { folderIndex, fileName, Code } = req.body;
        const token = req.header("authToken");
        if (!token) {
            return res.status(404).json({ success: false, message: "Not Found" });
        }
        const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
        const userId = decode.id;
        const isValid = validate(req, res);
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

        const newFile = {
            name: fileName,
            code:( Code === undefined)?"Null":Code
        };

        if (!repo.folder[folderIndex].file) {
            repo.folder[folderIndex].file = [];
        }

        repo.folder[folderIndex].file.push(newFile);

        const updatedRepo = await repo.save();

        res.json({ success: true, message: "Repository updated successfully", repo: updatedRepo });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

