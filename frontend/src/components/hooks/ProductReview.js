import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductReview({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ userName: '', rating: 5, comment: '' });

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/reviews/${productId}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy đánh giá:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/reviews', {
        ...form,
        productId,
      });
      setForm({ userName: '', rating: 5, comment: '' });
      fetchReviews(); 
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
    }
  };

  return (
    <div className="mt-10 border-t pt-6">
      <h3 className="text-xl font-semibold mb-4">Đánh giá sản phẩm</h3>

      
      {reviews.length > 0 ? (
        reviews.map((r, i) => (
          <div key={i} className="mb-3 p-4 bg-gray-100 rounded">
            <strong>{r.userName}</strong> - ⭐ {r.rating}
            <p>{r.comment}</p>
          </div>
        ))
      ) : (
        <p>Chưa có đánh giá nào.</p>
      )}

      
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input
          type="text"
          placeholder="Tên của bạn"
          value={form.userName}
          onChange={(e) => setForm({ ...form, userName: e.target.value })}
          required
          className="w-full border p-2 rounded"
        />
        <select
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
          className="w-full border p-2 rounded"
        >
          {[1, 2, 3, 4, 5].map((v) => (
            <option key={v} value={v}>{v} sao</option>
          ))}
        </select>
        <textarea
          placeholder="Bình luận"
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Gửi đánh giá
        </button>
      </form>
    </div>
  );
}

export default ProductReview;
