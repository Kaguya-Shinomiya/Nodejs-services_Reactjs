import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Product from "../pages/Product";
import CreateProductForm from "../pages/Admin/Create_Product";
import AuthPage from "../pages/AuthPage";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute

const AppRoutes = () => {
  return (
    <Routes>
      {/* Clients không cần đăng nhập*/}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<Product />} />
      <Route path="/login" element={<AuthPage />} />

      {/* Clients cần đăng nhập*/}
      <Route path="/card" element={<PrivateRoute element={<CreateProductForm />} roles={["admin"]} flag={[false]}/>} />

      {/* Admin - Chỉ admin mới truy cập được */}
      <Route path="/admin/create_product" 
             element={<PrivateRoute element={<CreateProductForm />} roles={["admin"]} flag={[true]}/>} />
    </Routes>
  );
};

export default AppRoutes;
