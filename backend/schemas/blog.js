const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        maxlength: 200
    },
    content: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: null
    },
    author: {
        type: String,
        required: true,
        maxlength: 100
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Blog", blogSchema, "blog");
