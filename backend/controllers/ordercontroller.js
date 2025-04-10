const Order = require('../schemas/order');
const Product = require('../schemas/product');

exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice, userEmail } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    // Kiểm tra tồn kho & trừ số lượng sản phẩm
    for (const item of items) {
      const product = await Product.findById(item._id);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productName}` });
      }

      if (product.stockQuantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.productName}. Available: ${product.stockQuantity}, requested: ${item.quantity}`
        });
      }

      console.log("Trước:", product.stockQuantity);
      product.stockQuantity -= item.quantity;
      await product.save();
      console.log("Sau:", product.stockQuantity);
    }

    // Tạo đơn hàng mới
    const newOrder = new Order({ items, totalPrice, userEmail });
    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
