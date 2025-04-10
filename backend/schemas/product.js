const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        unique: true,
        maxlength: 100
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    old_price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        default: ""
    },
    imageUrl: {
        type: String,
        default: null
    },
    isDelete: {
        type: Boolean,
        default: false
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    producerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producer",
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    isPreOrder: {
        type: Boolean,
        required: true
    },
    releaseDate: {
        type: Date,
        default: null
    },
    isNewProduct:{
        type: Boolean,
        default: false
    },
    rating:{
        type: Number,
        default: 5,
        min: 0,
        max: 5
    },
    sold:{
        type: Number,
        default: 0,
        min: 0
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
