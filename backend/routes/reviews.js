const express = require('express');
const router = express.Router();
const Review = require('../schemas/review');
let reviewController = require('../controllers/review')

router.post('/', async (req, res) => {
  try {
    const { productId, userName, rating, comment } = req.body;

    if (!productId || !userName || !rating || !comment) {
      return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin đánh giá.' });
    }

    // const newReview = new Review({
    //   productId,
    //   userName,
    //   rating,
    //   comment,
    //   createdAt: new Date()
    // });

    // const savedReview = await newReview.save();
    let savedReview = await reviewController.createReview(req, res);
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi thêm đánh giá.', message: err.message });
  }
});

router.get('/:productId', async (req, res) => {
  try {
    
    let reviews = await reviewController.getReviewsByProduct(req, res);
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'Chưa có đánh giá nào cho sản phẩm này.' });
    }

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lấy đánh giá.', message: err.message });
  }
});

module.exports = router;
