let mongoose = require("mongoose");

let modelSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

let Model = module.exports = mongoose.model("Model",modelSchema)