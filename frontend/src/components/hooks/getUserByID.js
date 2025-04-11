import { useState, useEffect } from "react";
import axios from "axios";

const useGetUserById = (id) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchUser = async () => {
            try {
                const response = await axios.get(`
                    http://127.0.0.1:5000/users/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setUser(response.data.data);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id]);

    return { user, loading };
};

export default useGetUserById;