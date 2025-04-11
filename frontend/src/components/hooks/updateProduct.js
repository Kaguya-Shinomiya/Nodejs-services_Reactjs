import { useState } from "react";
import axios from "axios";

const useUpdateProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateProduct = async (id, data) => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");

            const formData = new FormData();
            formData.append("productName", data.productName);
            formData.append("price", data.price);
            formData.append("old_price", data.old_price);
            formData.append("description", data.description || "");
            formData.append("categoryId", data.categoryId);
            formData.append("producerId", data.producerId);
            formData.append("stockQuantity", data.stockQuantity);
            formData.append("isPreOrder", data.isPreOrder);
            formData.append("releaseDate", data.releaseDate || "");
            formData.append("isNew", data.isNew);
            formData.append("rating", data.rating);
            formData.append("sold", data.sold);

            if (data.imageUrl && data.imageUrl.length > 0 && typeof data.imageUrl !== "string") {
                for (let i = 0; i < data.imageUrl.length; i++) {
                    formData.append("images", data.imageUrl[i]);
                }
            }

            const response = await axios.put(
                `http://127.0.0.1:5000/products/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(error);
            throw error;
        }
    };

    return { updateProduct, loading, error };
};

export default useUpdateProduct;
