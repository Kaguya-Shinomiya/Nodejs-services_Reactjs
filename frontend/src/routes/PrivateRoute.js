import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PrivateRoute = ({ element, roles }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const checkRole = async () => {
            if (!token) {
                setIsAuthorized(false);
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get("http://127.0.0.1:5000/auth/check-role", {
                    headers: { 
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },

                });

                if (roles.includes(response.data.role)) {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                console.error("Role Check Error:", error);
                setIsAuthorized(false);
            } finally {
                setLoading(false);
            }
        };

        checkRole();
    }, [token, roles]);

    if (loading) return <p>Loading...</p>;
    if (!isAuthorized) return <Navigate to="/404" replace />;

    return element;
};

export default PrivateRoute;
