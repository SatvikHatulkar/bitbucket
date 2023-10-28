// const jwt = require('jsonwebtoken');
// const Repository = require('../models/Repo');
// const User = require('../models/User');

// module.exports = async (req, res) => {
//     try {
//         const token = req.header('authToken');
//         if (!token) {
//             return res.status(400).json({ success: false, message: 'Not Allowed' });
//         }

//         const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
//         const userId = decode.id;

//         // Find all repositories associated with the user's ID
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(400).json({ success: false, message: 'User not allowed' });
//         }

//         const repositories = await Repository.find(); // Query repositories by user ID
//         if (!repositories) {
//             return res.status(404).json({ success: false, message: 'Repositories not found' });
//         }

//         res.status(200).json({ success: true, repositories });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };
// backend/controllers/fetchRepositories.js




// const jwt = require('jsonwebtoken');
// const Repository = require('../models/Repo');
// const User = require('../models/User');

// module.exports = async (req, res) => {
//     try {
//         const token = req.header('authToken');
//         if (!token) {
//             return res.status(400).json({ success: false, message: 'Not Allowed' });
//         }

//         const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
//         const userId = decode.id;

//         // Find all repositories associated with the user's ID
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(400).json({ success: false, message: 'User not allowed' });
//         }

//         const repositories = await Repository.find().limit(6); // Limit to 6 repositories
//         if (!repositories) {
//             return res.status(404).json({ success: false, message: 'Repositories not found' });
//         }
//         let repoUserArray = [];
//         for(let i = 0; repositories.length; i++){
//            console.log(repositories[i].user)
//            const repoUser = await User.findById(repositories[i].user).select("-password")
//             repoUserArray.push(repoUser)
//         }
//         res.status(200).json({ success: true, repositories, repoUserArray});
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };



const jwt = require('jsonwebtoken');
const Repository = require('../models/Repo');
const User = require('../models/User');

module.exports = async (req, res) => {
    try {
        const token = req.header('authToken');
        // if (!token) {
        //     return res.status(400).json({ success: false, message: 'Not Allowed' });
        // }

        // const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
        // const userId = decode.id;

        // // Find all repositories associated with the user's ID
        // const user = await User.findById(userId);
        // if (!user) {
        //     return res.status(400).json({ success: false, message: 'User not allowed' });
        // }

        const repositories = await Repository.find().limit(6); // Limit to 6 repositories
        if (!repositories || repositories.length === 0) {
            return res.status(404).json({ success: false, message: 'Repositories not found' });
        }

        let repoUserArray = [];
        for (let i = 0; i < repositories.length; i++) {
            const repoUser = await User.findById(repositories[i].user).select("-password");
            repoUserArray.push(repoUser);
        }

        res.status(200).json({ success: true, repositories, repoUserArray });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};
