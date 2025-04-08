import { useState } from "react";

const useDeleteBlog = () => {
    const [loading, setLoading] = useState(false);

    const deleteBlog = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`http://127.0.0.1:5000/blogs/${id}`, {
                method: "DELETE",
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Xóa bài viết thất bại");

            return data;
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { deleteBlog, loading };
};

export default useDeleteBlog;