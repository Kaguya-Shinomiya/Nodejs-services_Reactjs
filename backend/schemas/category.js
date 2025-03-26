const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    isDelete: { 
        type: Boolean, 
        default: false 
    } 
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
