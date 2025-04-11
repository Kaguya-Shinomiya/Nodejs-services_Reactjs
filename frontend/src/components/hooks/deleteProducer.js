import { useState } from "react";
import axios from "axios";

const useDeleteProducer = () => {
    const [loading, setLoading] = useState(false);

    const deleteProducer = async (id) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`http://127.0.0.1:5000/producers/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.data;
        } catch (error) {
            console.error("Delete producer failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { deleteProducer, loading };
};

export default useDeleteProducer;
