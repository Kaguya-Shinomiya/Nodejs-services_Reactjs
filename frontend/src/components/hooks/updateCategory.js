import { useState } from "react";
import axios from "axios";

const useUpdateCategory = () => {
    const [loading, setLoading] = useState(false);

    const updateCategory = async (id, data) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");

            const response = await axios.put(
                `http://127.0.0.1:5000/categories/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { updateCategory, loading };
};

export default useUpdateCategory;
