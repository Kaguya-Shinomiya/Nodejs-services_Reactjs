const mongoose = require('mongoose');

const product_ImageSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("product_Image", product_ImageSchema);
