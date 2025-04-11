import { useState } from "react";

const useCreateBlog = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createBlog = async (newBlog) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch("http://127.0.0.1:5000/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newBlog),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Tạo blog thất bại");

            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { createBlog, loading, error };
};

export default useCreateBlog;
