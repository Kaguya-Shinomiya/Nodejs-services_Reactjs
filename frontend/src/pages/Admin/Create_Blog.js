import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar_Admin from "../../components/ui/Navbar_Admin";

const CreateBlog = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        content: "",
        imageUrl: "",
        author: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://127.0.0.1:5000/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Tạo blog thất bại!");

            alert("Tạo bài viết thành công!");
            navigate("/admin/show_blog");
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar_Admin />
            <div className="max-w-2xl mx-auto mt-10 bg-green-50 shadow-lg rounded-xl p-8">
                <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
                    Tạo bài viết mới
                </h2>
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-green-800 font-medium mb-1">Tiêu đề</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            className="w-full border border-green-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div>
                        <label className="block text-green-800 font-medium mb-1">Nội dung</label>
                        <textarea
                            name="content"
                            value={form.content}
                            onChange={handleChange}
                            required
                            className="w-full border border-green-300 px-4 py-2 rounded-md min-h-[150px] resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <div>
                        <label className="block text-green-800 font-medium mb-1">Link hình ảnh</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={form.imageUrl}
                            onChange={handleChange}
                            className="w-full border border-green-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                        {form.imageUrl && (
                            <img
                                src={form.imageUrl}
                                alt="Preview"
                                className="mt-3 max-h-60 object-cover rounded-lg shadow"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/400x200?text=No+Image";
                                }}
                            />
                        )}
                    </div>

                    <div>
                        <label className="block text-green-800 font-medium mb-1">Tác giả</label>
                        <input
                            type="text"
                            name="author"
                            value={form.author}
                            onChange={handleChange}
                            required
                            className="w-full border border-green-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-all duration-200"
                    >
                        {loading ? "Đang tạo..." : "Tạo bài viết"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateBlog;
