const Review = require('../schemas/review');

// Lấy đánh giá theo productId
exports.getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Thêm đánh giá mới
exports.createReview = async (req, res) => {
  try {
    const { productId, userName, rating, comment } = req.body;
    const review = new Review({ productId, userName, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: "Lỗi khi tạo đánh giá", error: err.message });
  }
};
