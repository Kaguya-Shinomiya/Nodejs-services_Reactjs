import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <h1 className="text-[10rem] font-extrabold text-blue-600 leading-none drop-shadow-lg">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Oops! Trang không tồn tại</h2>
        <p className="text-gray-500 text-lg mb-8">
          Có vẻ như bạn đã nhập sai địa chỉ hoặc trang này đã bị xóa.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl shadow hover:bg-blue-700 transition"
        >
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
};

export default NotFound;
