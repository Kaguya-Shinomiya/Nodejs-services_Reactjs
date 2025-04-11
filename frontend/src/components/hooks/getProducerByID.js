import { useState, useEffect } from "react";
import axios from "axios";

const useGetProducerById = (id) => {
    const [producer, setProducer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducer = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/producers/${id}`);
                setProducer(response.data.data);
            } catch (error) {
                console.error("Failed to fetch producer:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducer();
    }, [id]);

    return { producer, loading };
};

export default useGetProducerById;
