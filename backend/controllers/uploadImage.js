// const multer = require('multer');
// const User = require('../models/User'); // Import your User model
// const jwt = require("jsonwebtoken");

// // Set up Multer for handling file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Endpoint for handling image uploads
// const uploadImage = async (req, res) => {
//     try {
//         const token = req.header("authToken");
//         if (!token) {
//             return res.status(401).json({ success: false, message: "Not Allowed" });
//         }
//         const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
//         const userId = decode.id;
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         // Get the binary data and content type from the request
//         const imageData = req.file.buffer;
//         const contentType = req.file.mimetype;

//         // Update user's img field with the uploaded image data
//         user.img = {
//             data: imageData,
//             contentType: contentType,
//         };

//         await user.save();

//         res.status(201).json({ success: true, message: 'Image uploaded successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// };

// module.exports = uploadImage;


const multer = require('multer');
const User = require('../models/User'); // Import your User model
const jwt = require('jsonwebtoken');

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint for handling image uploads
const uploadImage = async (req, res) => {
  try {
    const token = req.header('authToken');
    if (!token) {
      return res.status(401).json({ success: false, message: 'Not Allowed' });
    }

    const decode = jwt.verify(token, process.env.JWT_LOGIN_TOKEN);
    const userId = decode.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Get the binary data and content type from the request
    const imageData = req.file.buffer;
    const contentType = req.file.mimetype;

    // Update user's img field with the uploaded image data
    user.img = {
      data: imageData,
      contentType: contentType,
    };

    await user.save();

    res.status(201).json({ success: true, message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = uploadImage;
