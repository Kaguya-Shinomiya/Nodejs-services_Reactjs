const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        isDelete: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);


module.exports = mongoose.model("Log", logSchema);
