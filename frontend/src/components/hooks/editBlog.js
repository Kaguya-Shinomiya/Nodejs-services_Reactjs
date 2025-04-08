import { useState } from "react";

const useUpdateBlog = () => {
    const [loading, setLoading] = useState(false);

    const updateBlog = async (id, updatedData) => {
        setLoading(true);
        try {
            const res = await fetch(`http://127.0.0.1:5000/blogs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Cập nhật bài viết thất bại");

            return data;
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { updateBlog, loading };
};

export default useUpdateBlog;
