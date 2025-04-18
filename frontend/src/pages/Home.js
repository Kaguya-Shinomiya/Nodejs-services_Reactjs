
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";


import carousel1 from "../assets/images/carousel-1.jpg";
import carousel2 from "../assets/images/carousel-2.jpg";
import aboutImg from "../assets/images/about.jpg"
import icon1 from "../assets/images/icon-1.png";
import icon2 from "../assets/images/icon-2.png";
import icon3 from "../assets/images/icon-3.png";


import useCategories from "../components/hooks/getCategory";
import useProducts from "../components/hooks/getProduct";
import useBlogs from "../components/hooks/getBlog";


import { formatCurrency } from "../components/utils/format";
import { handleAddToCart } from "../components/utils/cart";


const Home = () => {
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

    const features = [
        {
            id: 1,
            title: "Natural Process",
            description: "Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.",
            image: icon1,
            delay: "100",
        },
        {
            id: 2,
            title: "Organic Products",
            description: "Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.",
            image: icon2,
            delay: "300",
        },
        {
            id: 3,
            title: "Biologically Safe",
            description: "Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.",
            image: icon3,
            delay: "500",
        },
    ];

   
    const { categories, loading, error } = useCategories();
    const [activeTab, setActiveTab] = useState("");

    React.useEffect(() => {
        if (categories.length > 0) {
            setActiveTab(categories[0]?.name || "");
        }
    }, [categories]);

    const { products, loading: loadingProducts } = useProducts(activeTab);
    const { blogs, loading: loadingBlog } = useBlogs();


    const navigate = useNavigate();


    if (loading) return <p className="text-center">Loading...</p>;
    if (loadingBlog) return <p className="text-center py-10">Loading blog...</p>;

    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <>
            
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
                                        <a href="/products" className="bg-green-500 text-white py-3 px-6 rounded-full font-semibold shadow-md hover:opacity-80">
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

                
                <button className="prev-button absolute top-1/2 left-5 transform -translate-y-1/2 bg-green-500 text-white rounded-full p-3">
                    ❮
                </button>
                <button className="next-button absolute top-1/2 right-5 transform -translate-y-1/2 bg-green-500 text-white rounded-full p-3">
                    ❯
                </button>
            </div>
            


            
            <div className="py-10 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        
                        <div className="lg:w-1/2 relative overflow-hidden p-5">
                            <img
                                className="w-full rounded-lg shadow-lg"
                                src={aboutImg}
                                alt="About us"
                            />
                        </div>

                        
                        <div className="lg:w-1/2">
                            <h1 className="text-4xl font-bold mb-6 text-gray-800">
                                Best Organic Fruits And Vegetables
                            </h1>
                            <p className="text-gray-600 mb-4">
                                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
                            </p>
                            <ul className="space-y-2">
                                <li className="flex items-center text-gray-700">
                                    <span className="text-green-500 text-lg mr-2">✔</span>
                                    Tempor erat elitr rebum at clita
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <span className="text-green-500 text-lg mr-2">✔</span>
                                    Aliqu diam amet diam et eos
                                </li>
                                <li className="flex items-center text-gray-700">
                                    <span className="text-green-500 text-lg mr-2">✔</span>
                                    Clita duo justo magna dolore erat amet
                                </li>
                            </ul>
                            <a
                                href="#"
                                className="inline-block mt-6 bg-green-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-green-600 transition"
                            >
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            


            
            <div className="bg-gray-100 my-10 py-12">
                <div className="container mx-auto px-5">
                    
                    <div className="text-center max-w-xl mx-auto mb-8">
                        <h1 className="text-4xl font-bold mb-3 text-gray-800">Our Features</h1>
                        <p className="text-gray-600">
                            Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.
                        </p>
                    </div>

                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature) => (
                            <div
                                key={feature.id}
                                className="bg-white text-center p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                                data-aos="fade-up"
                                data-aos-delay={feature.delay}
                            >
                                <img src={feature.image} alt={feature.title} className="w-16 mx-auto mb-4" />
                                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                                <p className="text-gray-600 mb-4">{feature.description}</p>
                                <a
                                    href="#"
                                    className="inline-block border-2 border-blue-500 text-blue-500 py-2 px-4 rounded-full hover:bg-blue-500 hover:text-white transition"
                                >
                                    Read More
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
           

            
            <div className="py-10 bg-gray-100">
                <div className="container mx-auto px-5">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-5">
                        <div className="max-w-lg">
                            <h1 className="text-4xl font-bold mb-3 text-gray-800">Our Products</h1>
                            <p className="text-gray-600">
                                Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.
                            </p>
                            <br></br>
                        </div>

                       
                        <div className="text-left md:text-right">
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
                                    {products.slice(0, 8)
                                        .filter((product) => !product.isDelete && product.stockQuantity > 1)
                                        .map((product) => (
                                            <div key={product._id} className="animate-fade-up duration-300">
                                                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                                
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
                    <div className="w-full text-center mt-8 animate-fade-up duration-300">
                        <a className="bg-blue-500 text-white font-semibold rounded-full py-3 px-5 hover:bg-blue-600 transition"
                            href="/products"
                        >
                            Browse More Products
                        </a>
                    </div>


                </div>
            </div>
           

          
            <div className="bg-blue-600 bg-opacity-90 mt-5 py-12">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                        <div className="wow fadeIn" data-wow-delay="0.1s">
                            <h1 className="text-4xl font-bold text-white mb-3">Visit Our Firm</h1>
                            <p className="text-white">
                                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos.
                                Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet.
                            </p>
                        </div>

                        <div className="text-center md:text-right wow fadeIn" data-wow-delay="0.5s">
                            <a className="btn bg-gray-200 text-blue-700 font-semibold rounded-full py-3 px-6 hover:bg-gray-300 transition" href="#">
                                Visit Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
          


           
            <div className="py-12 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-bold text-green-600 mb-3">Latest Blog</h1>
                        <p className="text-gray-600 max-w-xl mx-auto">
                            Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog, index) => (
                            <div
                                key={blog._id || index}
                                className="bg-white rounded shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                            >
                                <img
                                    src={blog.imageUrl || "/default-blog.jpg"}
                                    alt={blog.title}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-4">
                                    <a href={`/blog/${blog._id}`} className="block text-xl font-semibold text-gray-800 hover:text-green-600 mb-3">
                                        {blog.title}
                                    </a>
                                    <div className="text-sm text-gray-500 border-t pt-3">
                                        <span className="mr-4">
                                            <i className="fa fa-user text-green-500 mr-1"></i>{blog.author || "Admin"}
                                        </span>
                                        <span>
                                            <i className="fa fa-calendar text-green-500 mr-1"></i>
                                            {new Date(blog.createdAt).toLocaleDateString("en-GB")}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
      
        </>
    );
};

export default Home;
