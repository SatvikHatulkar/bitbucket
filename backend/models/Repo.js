const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Repository"],
        minLength: [1, "Minimum length should be 3"]
    },
    code:{
        type:String,
        required:[true, "Please enter the code"]
    }
});

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Repository"],
        minLength: [1, "Minimum length should be 3"]
    }
});



const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter folder name"],
        minLength: [1, "Minimum length should be 3"]
    },
    file: [fileSchema]
});

const repositorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    repository: {
        type: String,
        required: [true, "Please enter Repository"],
        minLength: [3, "Minimum length should be 3"],
    },
    folder: [folderSchema],

    tags:[tagSchema],

    date: {
        type: Date,
        default: Date.now
    }
});

repositorySchema.index({ user: 1, repository: 1 }, { unique: true });

const Repository = mongoose.model("repository", repositorySchema);
module.exports = Repository;
