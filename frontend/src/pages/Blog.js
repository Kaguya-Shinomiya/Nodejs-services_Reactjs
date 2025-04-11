import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/blogs`);
        const result = await res.json();
        setBlogs(result.data || []);
      } catch (error) {
        console.error("Lỗi khi gọi API blog:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleReadMore = (id) => {
    navigate(`/blogs/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-green-700 text-center mb-10">
        Bài viết mới nhất
      </h2>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">Hiện chưa có bài viết nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-green-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {blog.imageUrl && (
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-52 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                  }}
                />
              )}

              <div className="p-5">
                <h3 className="text-xl font-semibold text-green-800 mb-2">{blog.title}</h3>
                <p className="text-sm text-gray-500 mb-1">Tác giả: {blog.author}</p>
                <p className="text-gray-700 line-clamp-3 mb-3">{blog.content}</p>
                <button
                  onClick={() => handleReadMore(blog._id)}
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  Đọc tiếp →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
