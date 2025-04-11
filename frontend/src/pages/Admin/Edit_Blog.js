// EditBlog.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar_Admin from "../../components/ui/Navbar_Admin";

const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        content: "",
        imageUrl: "",
        author: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:5000/blogs/${id}`);
                const data = await res.json();

                if (!res.ok) throw new Error(data.message || "Không tìm thấy blog");
                setForm({
                    title: data.data.title || "",
                    content: data.data.content || "",
                    imageUrl: data.data.imageUrl || "",
                    author: data.data.author || "",
                });
            } catch (err) {
                console.error(err);
                setError(err.message);
            }
        };

        fetchBlog();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`http://127.0.0.1:5000/blogs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Cập nhật thất bại");

            alert("Cập nhật thành công!");
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
                <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Cập nhật bài viết</h2>
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
                        {loading ? "Đang cập nhật..." : "Cập nhật bài viết"}
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditBlog;
