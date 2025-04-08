// Import Library
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

// Import hooks
import useBlogs from "../../components/hooks/getBlog";
import useDeleteBlog from "../../components/hooks/deleteBlog";

// Import ui
import Navbar_Admin from "../../components/ui/Navbar_Admin";

const Blog = () => {
    const navigate = useNavigate();
    const { blogs, setBlogs, loading: loadingBlogs, error } = useBlogs();
    const { deleteBlog, loading: loadingDelete } = useDeleteBlog();

    const handleDelete = async (blogId) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?");
        if (!confirmed) return;

        try {
            await deleteBlog(blogId);
            alert("Xóa bài viết thành công!");
            setBlogs((prev) => prev.filter((b) => b._id !== blogId));
        } catch (err) {
            console.error(err);
            alert(err.message || "Xóa thất bại!");
        }
    };

    if (loadingBlogs) return <p className="text-center">Đang tải dữ liệu...</p>;
    if (error) return <p className="text-center text-red-500">Lỗi: {error}</p>;

    return (
        <>
            <Navbar_Admin />
            <div className="flex justify-between items-center px-8 py-6 bg-green-50 shadow-sm">
                <h1 className="text-3xl font-bold text-green-700">Quản lý bài viết về thực phẩm</h1>
                <button
                    onClick={() => navigate("/admin/create_blog")}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                >
                    + Tạo bài viết mới
                </button>
            </div>

            <div className="py-10 bg-white min-h-screen">
                <div className="container mx-auto px-6">
                    {blogs.length === 0 ? (
                        <p className="text-center text-gray-500">Chưa có bài viết nào.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {blogs.map((blog) => (
                                <div key={blog._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
                                    <img
                                        src={blog.imageUrl || "https://via.placeholder.com/400x200?text=No+Image"}
                                        alt={blog.title}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                                        }}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-green-700 mb-1 line-clamp-2">{blog.title}</h3>
                                        <p className="text-sm text-gray-600 line-clamp-3 mb-2">{blog.content}</p>
                                        <p className="text-xs text-gray-500">Tác giả: {blog.author}</p>
                                    </div>
                                    <div className="flex border-t">
                                        <button
                                            className="w-1/2 py-2 text-green-600 hover:bg-green-50 border-r border-gray-200 text-sm font-medium"
                                            onClick={() => navigate(`/admin/edit_blog/${blog._id}`)}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog._id)}
                                            disabled={loadingDelete}
                                            className="w-1/2 py-2 text-red-600 hover:bg-red-50 text-sm font-medium"
                                        >
                                            {loadingDelete ? "Đang xóa..." : "Xóa"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Blog;