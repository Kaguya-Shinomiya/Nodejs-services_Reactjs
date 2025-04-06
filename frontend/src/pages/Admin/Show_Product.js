// Import Library
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";


// Import hooks
import useCategories from "../../components/hooks/getCategory";
import useProducts from "../../components/hooks/getProduct";
import useDeleteProduct from "../../components/hooks/deleteProduct";

// Imprort ui
import Navbar_Admin from "../../components/ui/Navbar_Admin";


const Product = () => {


    // Get Categories
    const { categories, loading: loadingCategories, error } = useCategories(); // Gọi API từ hook
    const [activeTab, setActiveTab] = useState("");
    const { deleteProduct, loading: loadingDelete } = useDeleteProduct();

    const handleDelete = async (productId) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
        if (!confirmed) return;

        try {
            await deleteProduct(productId);
            alert("Xóa sản phẩm thành công!");
            // Reload lại danh sách nếu cần (gọi lại API hoặc filter ra khỏi danh sách)
            window.location.href = "/admin/show_product";
        } catch (err) {
            console.error(err);
            alert(err.message || "Xóa thất bại!");
        }
    };

    React.useEffect(() => {
        if (categories.length > 0) {
            setActiveTab(categories[0]?.name || ""); // Chỉ lấy giá trị `name`
        }
    }, [categories]);

    // Get Product from active Tab
    const { products, loading: loadingProducts } = useProducts(activeTab);

    const navigate = useNavigate();


    if (loadingCategories) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <>
            {<Navbar_Admin />}
            {/* <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Products</h1> */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-blue-600">Products</h1>
                <button
                    onClick={() => navigate("/admin/create_product")}
                    className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition"
                >
                    + Tạo sản phẩm
                </button>
            </div>
            <div className="py-10 bg-gray-100">
                <div className="container mx-auto px-5">
                    {/* Tiêu đề */}
                    <div className="grid grid-cols-1 md:grid-cols-2 items-end gap-5">

                        {/* Danh mục sản phẩm */}
                        <div className="text-left mb-4"> {/* Đưa text về bên trái & tạo khoảng cách */}
                            <div className="inline-flex space-x-2">
                                {categories.map((category) => (
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

                    {/* Hiển thị sản phẩm theo danh mục */}
                    {loadingProducts ? (
                        <p className="text-center text-gray-500">Loading products...</p>
                    ) : (
                        <div className="tab-content">
                            <div id="tab-1" className="tab-pane fade show p-0 active">
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {products.map((product) => (
                                        <div key={product._id} className="animate-fade-up duration-300">
                                            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                                                {/* Hình ảnh sản phẩm */}
                                                <div className="relative bg-gray-100 overflow-hidden">
                                                    <img
                                                        className={`w-full h-48 object-cover transition-transform duration-300 transform hover:scale-105 ${product.isDelete ? 'grayscale' : ''}`}
                                                        src={`http://127.0.0.1:5000/${product.imageUrl}`}
                                                        alt={product.productName}
                                                    />


                                                    <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded">
                                                        New
                                                    </div>
                                                </div>

                                                <div className="p-4 text-center">
                                                    <h3 className="text-lg font-semibold text-gray-800">{product.productName}</h3>
                                                </div>
                                                {/* Nút thao tác */}
                                                <div className="flex border-t border-gray-200">
                                                    <button
                                                        className="w-1/2 py-2 text-gray-600 hover:text-green-600 flex justify-center items-center gap-2 border-r"
                                                        onClick={() => navigate(`/admin/edit_product/${product._id}`)}>
                                                        <i className="fa fa-edit text-blue-500"></i>
                                                        Edit Product
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        disabled={loadingDelete}
                                                        className="w-1/2 py-2 text-red-600 hover:text-red-800 flex justify-center items-center gap-2 border-r"
                                                    >
                                                        <i className="fa fa-trash text-red-500"></i>
                                                        {loadingDelete ? "Đang xóa..." : "Xóa sản phẩm"}
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
