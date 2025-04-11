import { useState } from "react";
import axios from "axios";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        fullName: "",
        address: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            let response;
            if (isLogin) {
                response = await axios.post("http://127.0.0.1:5000/auth/login", {
                    email: formData.email,
                    password: formData.password
                });

                console.log("Login Response:", response.data);

                if (!response.data.data.token) {
                    throw new Error("Login failed: Missing token.");
                }

                if (!response.data.data?.user?.role?.name) {
                    throw new Error("Login failed: Missing role.");
                }

                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem("role", response.data.data.user.role.name);

                alert("Login successful!");

                if (response.data.data.user.role.name === "admin") {
                    window.location.href = "/admin/admin_dashboard";
                } else {
                    window.location.href = "/";
                }
            } else {
                if (!formData.username || !formData.email || !formData.password || !formData.fullName) {
                    setError("Please fill in all required fields.");
                    setLoading(false);
                    return;
                }

                response = await axios.post("http://127.0.0.1:5000/auth/signup", formData);
                alert("Registration successful! Please log in.");
                setIsLogin(true);
            }

            setFormData({ username: "", email: "", password: "", fullName: "", address: "" });

        } catch (err) {
            console.error("Auth Error:", err.response?.data || err.message);
            setError(err.response?.data?.message || "An unexpected error occurred.");
        }

        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">

               
                <div className="flex justify-center mb-6">
                    <button
                        className={`px-4 py-2 text-lg font-semibold ${isLogin ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`px-4 py-2 text-lg font-semibold ${!isLogin ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>
                </div>

                {error && <p className="text-red-500 text-center">{error}</p>}

               
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Username"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Full Name"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Address"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </>
                    )}
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    
                    {isLogin && (
                        <div className="text-right text-sm text-blue-500 hover:underline mb-2 cursor-pointer">
                            <a href="/forgot-password">Forgot password?</a>
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        {loading ? (isLogin ? "Logging in..." : "Registering...") : isLogin ? "Login" : "Register"}
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-4">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 underline">
                        {isLogin ? "Sign up" : "Sign in"}
                    </button>
                </p>
            </div>
        </div>
    );
}
