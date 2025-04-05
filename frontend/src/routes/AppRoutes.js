import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Product from "../pages/Product";
import AuthPage from "../pages/AuthPage";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute
import Cart from "../pages/Cart";
import ProductDetail from "../pages/Product_Detail";

import ShowProductFrom from "../pages/Admin/Show_Product";
import CreateProductForm from "../pages/Admin/Create_Product";
import EditProductForm from "../pages/Admin/Edit_Product";
import Admin_Dashboard from "../pages/Admin/Admin_Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Clients không cần đăng nhập*/}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<Product />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/product_detail/:id" element={< ProductDetail />} />

      {/* Clients cần đăng nhập*/}
      <Route path="/cart" element={<Cart />} />

      {/* Admin - Chỉ admin mới truy cập được */}
      <Route path="/admin/admin_dashboard"
        element={<PrivateRoute element={<Admin_Dashboard />} roles={["admin"]} />} />

      {/* Product */}  
      <Route path="/admin/show_product"
        element={<PrivateRoute element={<ShowProductFrom />} roles={["admin"]} />} />
      <Route path="/admin/create_product"
        element={<PrivateRoute element={<CreateProductForm />} roles={["admin"]} />} />
      <Route path="/admin/edit_product/:id"
        element={<PrivateRoute element={<EditProductForm />} roles={["admin"]} />} />
      {/* <Route path="/admin/create_product"
        element={<PrivateRoute element={<CreateProductForm />} roles={["admin"]} />} /> */}
    </Routes>
  );
};

export default AppRoutes;
