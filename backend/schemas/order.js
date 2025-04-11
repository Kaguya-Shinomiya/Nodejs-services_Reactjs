const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      productName: String,
      price: Number,
      quantity: Number,
      imageUrl: String,
    }
  ],
  totalPrice: Number,
  userEmail: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
