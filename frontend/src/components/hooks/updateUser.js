import { useState } from "react";
import axios from "axios";

const useUpdateUser = () => {
    const [loading, setLoading] = useState(false);

    const updateUser = async (id, data) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");

            const response = await axios.put(
                `http://127.0.0.1:5000/users/${id}`,
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

    return { updateUser, loading };
};

export default useUpdateUser;
