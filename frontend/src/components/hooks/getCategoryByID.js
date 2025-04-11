import { useState, useEffect } from "react";
import axios from "axios";

const useGetCategoryById = (id) => {
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/categories/${id}`);
                setCategory(response.data.data);
            } catch (error) {
                console.error("Failed to fetch category:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [id]);

    return { category, loading };
};

export default useGetCategoryById;
