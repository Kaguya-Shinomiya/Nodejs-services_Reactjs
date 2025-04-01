import React from "react";
import { Link } from "react-router-dom";

const Admin_Dashboard = () => {
  return (
    <>
      <div className={` bg-white shadow-md`}>
        <nav className="flex items-center justify-between px-6 lg:px-10 py-4">
          {/* Menu Items */}
          <div className={`lg:flex lg:items-center lg:space-x-6 absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none transition-all duration-300 block`}>
            <a href="/admin/products" className="block lg:inline-block px-4 py-2 text-base lg:text-lg hover:text-primary hover:scale-105 transition-transform duration-200"> Quản lý sản phẩm </a>
            <a href="/admin/categories" className="block lg:inline-block px-4 py-2 text-base lg:text-lg hover:text-primary hover:scale-105 transition-transform duration-200"> Quản lý danh mục </a>
          </div>
        </nav>
      </div>



      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Trang Admin</h1>
        <p className="text-lg text-gray-700 text-center max-w-2xl mx-auto">
          Đang thiết kế
        </p>
        <div className="text-center mt-6">
          <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Quay về Trang chủ
          </Link>
        </div>
      </div>
    </>

  );
};

export default Admin_Dashboard;
