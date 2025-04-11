import { useState } from "react";
import axios from "axios";

const useCreateProducer = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const createProducer = async (data) => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://127.0.0.1:5000/producers",
                data,
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

    return { createProducer, loading, error };
};

export default useCreateProducer;
