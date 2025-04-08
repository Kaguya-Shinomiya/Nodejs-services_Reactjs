import { useState } from "react";
import axios from "axios";

const useDeleteCategory = () => {
    const [loading, setLoading] = useState(false);

    const deleteCategory = async (id) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`http://127.0.0.1:5000/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.data;
        } catch (error) {
            console.error("Delete category failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { deleteCategory, loading };
};

export default useDeleteCategory;
