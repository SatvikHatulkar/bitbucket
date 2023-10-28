const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please Enter username"],
        minLength:[3, "Minimum length should be 3"],
        unique:true
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter valid email!"]
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minLength: [6, "Minimum length should be 6"]
    },
    img: {
        data: Buffer, // Binary data of the image
        contentType: String, // MIME type of the image (e.g., 'image/jpeg', 'image/png', etc.)
    },
    skills:{
        type:String,
        default: "No Skills!"
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("user", userSchema);
module.exports = User;


