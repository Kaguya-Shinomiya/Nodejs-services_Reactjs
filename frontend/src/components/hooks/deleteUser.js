import { useState } from "react";
import axios from "axios";

const useDeleteUser = () => {
    const [loading, setLoading] = useState(false);

    const deleteUser = async (id) => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`http://127.0.0.1:5000/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data.data;
        } catch (error) {
            console.error("Delete user failed:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { deleteUser, loading };
};

export default useDeleteUser;
