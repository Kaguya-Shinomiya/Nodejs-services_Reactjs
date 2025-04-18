import { useState } from "react";

const useDeleteProduct = () => {
    const [loading, setLoading] = useState(false);

    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");

            const res = await fetch(`http://127.0.0.1:5000/products/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Xóa sản phẩm thất bại");

            return data;
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { deleteProduct, loading };
};

export default useDeleteProduct;
