import { useState } from "react";
import axios from "axios";

const useCreateProduct = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createProduct = async (data) => {
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

            if (data.imageUrl.length > 0) {
                for (let i = 0; i < data.imageUrl.length; i++) {
                    formData.append("images", data.imageUrl[i]);
                }
            }

            const response = await axios.post("http://127.0.0.1:5000/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`, 
                },
            });

            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            setError(error);
            throw error;
        }
    };

    return { createProduct, loading, error };
};

export default useCreateProduct;
