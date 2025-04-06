// Import Library
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Import images
import carousel1 from "../assets/images/carousel-1.jpg";
import carousel2 from "../assets/images/carousel-2.jpg";

// Import hooks
import useCategories from "../components/hooks/getCategory";
import useProducts from "../components/hooks/getProduct";

// Imprort utils
import { formatCurrency } from "../components/utils/format";
import { handleAddToCart } from "../components/utils/cart";


const Product = () => {
    const slides = [
        {
            img: carousel1,
            title: "Organic Food Is Good For Health",
        },
        {
            img: carousel2,
            title: "Natural Food Is Always Healthy",
        },
    ];


    // Get Categories
    const { categories, loading, error } = useCategories();
    const [activeTab, setActiveTab] = useState("");


    React.useEffect(() => {
        if (categories.length > 0) {
            setActiveTab(categories[0]?.name || ""); 
        }
    }, [categories]);

    // Get Product from active Tab
    const { products, loading: loadingProducts } = useProducts(activeTab);

    const navigate = useNavigate();


    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <>
            {/* Carousel Start */}
            <div className="w-full mb-10">
                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation={{
                        prevEl: ".prev-button",
                        nextEl: ".next-button",
                    }}
                    autoplay={{ delay: 3000 }}
                    loop
                    className="h-[500px] md:h-[600px]"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index} className="relative">
                            <img src={slide.img} alt="Slide" className="w-full h-full object-cover" />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gray-40 bg-opacity-90 flex items-center">
                                <div className="container mx-auto px-6">
                                    <h1 className="text-black text-5xl font-bold drop-shadow-lg">{slide.title}</h1>
                                    <div className="mt-5">
                                        <a href="#" className="bg-green-500 text-white py-3 px-6 rounded-full font-semibold shadow-md hover:opacity-80">
                                            Products
                                        </a>
                                        <a href="#" className="bg-orange-500 text-white py-3 px-6 rounded-full font-semibold shadow-md hover:opacity-80 ml-3">
                                            Services
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <button className="prev-button absolute top-1/2 left-5 transform -translate-y-1/2 bg-green-500 text-white rounded-full p-3">
                    ❮
                </button>
                <button className="next-button absolute top-1/2 right-5 transform -translate-y-1/2 bg-green-500 text-white rounded-full p-3">
                    ❯
                </button>
            </div>
            {/* Carousel End */}

            <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Our Products</h1>
            <div className="py-10 bg-gray-100">
                <div className="container mx-auto px-5">
                    {/* Tiêu đề */}
                    <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-5">

                        <div className="text-left mb-4"> 
                            <div className="inline-flex space-x-2">
                                {categories
                                    .filter((category) => !category.isDelete)
                                    .map((category) => (
                                        <button
                                            key={category._id}
                                            onClick={() => setActiveTab(category.name)}
                                            className={`px-4 py-2 border-2 rounded ${activeTab === category.name
                                                ? "bg-blue-500 text-white border-blue-500"
                                                : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                                                } transition`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                            </div>
                        </div>
                    </div>


                    {loadingProducts ? (
                        <p className="text-center text-gray-500">Loading products...</p>
                    ) : (
                        <div className="tab-content">
                            <div id="tab-1" className="tab-pane fade show p-0 active">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {products
                                        .filter((product) => !product.isDelete && product.stockQuantity > 1)
                                        .map((product) => (
                                            <div key={product._id} className="animate-fade-up duration-300">
                                                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                                    {/* Hình ảnh sản phẩm */}
                                                    <div className="relative bg-gray-100 overflow-hidden">
                                                        <img
                                                            className="w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105"
                                                            src={`http://127.0.0.1:5000/${product.imageUrl}`}
                                                            alt={product.productName}
                                                        />
                                                        {product.isNewProduct && (
                                                            <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded">
                                                                New
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="p-4 text-center">
                                                        <h3 className="text-lg font-semibold text-gray-800">{product.productName}</h3>
                                                        <p className="text-green-600 font-bold text-lg">{formatCurrency(product.price)}</p>
                                                        {product.price < product.old_price ? (
                                                            <p className="text-gray-400 line-through">{formatCurrency(product.old_price)}</p>
                                                        ) : (
                                                            <br></br>
                                                        )}
                                                    </div>

                                                    <div className="flex border-t border-gray-200">
                                                        <button
                                                            className="w-1/2 py-2 text-gray-600 hover:text-green-600 flex justify-center items-center gap-2 border-r"
                                                            onClick={() => navigate(`/product_detail/${product._id}`)}>
                                                            <i className="fa fa-eye text-green-500"></i>
                                                            View detail
                                                        </button>
                                                        <button
                                                            className="w-1/2 py-2 text-gray-600 hover:text-green-600 flex justify-center items-center gap-2"
                                                            onClick={() => handleAddToCart(product, navigate)}>
                                                            <i className="fa fa-shopping-bag text-green-500"></i>
                                                            Add to cart
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </>
    );
};

export default Product;
