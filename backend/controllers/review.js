const reviewSchema = require('../schemas/review');
const productSchema = require('../schemas/product');


exports.getReviewsByProduct = async (req, res) => {
  try {
    //const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
    const { productId } = req.params;
    return await reviewSchema.find({ productId }).sort({ createdAt: -1 });
    //res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server" });
  }
};


exports.createReview = async (req, res) => {
  try {
    const { productId, userName, rating, comment } = req.body;

    const review = new reviewSchema({
      productId,
      userName,
      rating,
      comment,
      createdAt: new Date()
    });

    await review.save();

    const result = await reviewSchema.aggregate([
      { $match: { productId: review.productId } }, 
      {
        $group: {
          _id: "$productId",
          averageRating: { $avg: "$rating" }
        }
      }
    ]);

    let product = await productSchema.findById(productId);
    product.rating = result[0].averageRating;
    await product.save();

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: "Lỗi khi tạo đánh giá", error: err.message });
  }
};
