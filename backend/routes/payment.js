const express = require('express');
const router = express.Router();


router.post('/checkout', (req, res) => {
  const { cartItems, userEmail } = req.body;

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ success: false, message: "Giỏ hàng trống!" });
  }


  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * (item.quantity || 1);
  }, 0);


  setTimeout(() => {
    return res.status(200).json({
      success: true,
      message: "Thanh toán thành công!",
      totalAmount,
      orderId: `ORDER_${Date.now()}`
    });
  }, 2000);
});

module.exports = router;
