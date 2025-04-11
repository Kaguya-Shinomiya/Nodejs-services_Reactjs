import { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaSearch, FaUser, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 45);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        //localStorage.removeItem("token");
        localStorage.clear();
        setIsLoggedIn(false);
        navigate("/");
        window.location.reload(); // Reload để cập nhật UI
    };

    return (
        <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-gray-100"}`}>
            {/* Top Bar */}
            <div className={`hidden lg:flex justify-between items-center px-10 py-2 transition-all duration-300 ${isScrolled ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto"}`}>
                <div className="text-sm text-gray-600">
                    <span className="mr-4">📍 123 Street, New York, USA</span>
                    <span>✉ info@example.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                    <span>Follow us:</span>
                    <a href="#" className="hover:text-blue-500"><FaFacebookF /></a>
                    <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
                    <a href="#" className="hover:text-blue-600"><FaLinkedinIn /></a>
                    <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
                </div>
            </div>

            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 lg:px-10 py-4">
                <a href="/" className={`text-2xl font-bold transition-all duration-300 ${isScrolled ? "text-green-600" : "text-primary"}`}>
                    F<span className="text-secondary">oo</span>dy
                </a>

                {/* Mobile Menu Toggle */}
                <button className="lg:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Menu Items */}
                <div className={`lg:flex lg:items-center lg:space-x-6 absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none transition-all duration-300 ${isOpen ? "block" : "hidden"}`}>
                    <a href="/" className="block lg:inline-block px-4 py-2 text-base lg:text-lg hover:text-primary hover:scale-105 transition-transform duration-200"> Home </a>
                    <a href="/about" className="block lg:inline-block px-4 py-2 text-base lg:text-lg hover:text-primary hover:scale-105 transition-transform duration-200"> About Us </a>
                    <a href="/products" className="block lg:inline-block px-4 py-2 text-base lg:text-lg hover:text-primary hover:scale-105 transition-transform duration-200"> Products </a>
                    <a href="/contact" className="block lg:inline-block px-4 py-2 text-base lg:text-lg hover:text-primary hover:scale-105 transition-transform duration-200"> Contact Us </a>
                    <a href="/blogs" className="block lg:inline-block px-4 py-2 text-base lg:text-lg hover:text-primary hover:scale-105 transition-transform duration-200"> Blog </a>
                </div>

                {/* Icons */}
                <div className="hidden lg:flex items-center space-x-4 relative">
                    <a href="#" className="text-gray-600 hover:text-primary"><FaSearch /></a>
                    <button
                        className="text-gray-600 hover:text-primary"
                        onClick={() => navigate("/cart")}>
                        <FaShoppingBag />
                    </button>

                    {/* User Dropdown */}
                    <div className="relative">
                        <button onClick={() => setUserDropdownOpen(!userDropdownOpen)} className="text-gray-600 hover:text-primary">
                            <FaUser className="text-xl" />
                        </button>

                        {userDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
                                {isLoggedIn ? (
                                    <>
                                        <button onClick={handleLogout} className="block px-4 py-2 text-red-600 hover:bg-gray-200 w-full text-left">
                                            Đăng xuất
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                setUserDropdownOpen(false); // Đóng dropdown
                                                navigate("/login"); // Chuyển hướng đến trang đăng nhập
                                            }}
                                            className="block px-4 py-2 text-gray-700 hover:bg-gray-200 w-full text-left"
                                        >
                                            Đăng nhập
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
