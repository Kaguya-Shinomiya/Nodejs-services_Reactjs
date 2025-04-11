import React from "react";
import { Link } from "react-router-dom";
import Navbar_Admin from "../../components/ui/Navbar_Admin";

const Admin_Dashboard = () => {
  return (
    <>
      {<Navbar_Admin />}
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Trang Admin</h1>        <div className="text-center mt-6">
          <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Quay về Trang chủ
          </Link>
        </div>
      </div>
    </>

  );
};

export default Admin_Dashboard;
