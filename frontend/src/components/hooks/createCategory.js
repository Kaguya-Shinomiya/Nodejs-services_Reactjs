import { useState } from "react";
import axios from "axios";

const useCreateCategory = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createCategory = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://127.0.0.1:5000/categories",
                {
                    name: data.name,
                    description: data.description || "",
                },
                {
                    headers: {
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

    return { createCategory, loading, error };
};

export default useCreateCategory;
