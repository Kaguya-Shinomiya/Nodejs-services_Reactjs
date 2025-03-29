import React from "react";
import { Link } from "react-router-dom";

const Admin_Dashboard = () => {
  return (
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
  );
};

export default Admin_Dashboard;
