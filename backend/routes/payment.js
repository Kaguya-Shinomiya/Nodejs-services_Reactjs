const express = require('express');
const router = express.Router();

// Thanh toán giả lập
router.post('/checkout', (req, res) => {
  const { cartItems, userEmail } = req.body;

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ success: false, message: "Giỏ hàng trống!" });
  }

  // Tính tổng tiền
  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * (item.quantity || 1);
  }, 0);

  // Mô phỏng xử lý thanh toán (ví dụ sau 2 giây)
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
