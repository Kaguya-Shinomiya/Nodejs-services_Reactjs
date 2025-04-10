import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Product from "../pages/Product";
import AuthPage from "../pages/AuthPage";
import PrivateRoute from "./PrivateRoute"; 
import Cart from "../pages/Cart";
import ProductDetail from "../pages/Product_Detail";
import NotFound from "../pages/404Page";
import ForgotPassword from "../pages/forgot-password";

import ShowProductFrom from "../pages/Admin/Show_Product";
import CreateProductForm from "../pages/Admin/Create_Product";
import EditProductForm from "../pages/Admin/Edit_Product";
import ShowCategoryFrom from "../pages/Admin/Show_Category";
import CreateCategoryForm from "../pages/Admin/Create_Category";
import EditCategoryForm from "../pages/Admin/Edit_Category";
import CreateProducerForm from "../pages/Admin/Create_Producer";
import ShowProducerFrom from "../pages/Admin/Show_Producer";
import EditProducerForm from "../pages/Admin/Edit_Producer";
import ShowUserForm from "../pages/Admin/Show_User";
import EditUserForm from "../pages/Admin/Edit_User";
import Admin_Dashboard from "../pages/Admin/Admin_Dashboard";
import ShowBlogFrom from "../pages/Admin/Show_Blog";
import CreateBlogFrom from "../pages/Admin/Create_Blog";
import EditBlogFrom from "../pages/Admin/Edit_Blog";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<Product />} />
      <Route path="/blogs" element={<Blog />} /> 
      <Route path="/login" element={<AuthPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/product_detail/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />

      <Route path="/admin/admin_dashboard"
        element={<PrivateRoute element={<Admin_Dashboard />} roles={["admin"]} />} />
      <Route path="/admin/show_product"
        element={<PrivateRoute element={<ShowProductFrom />} roles={["admin"]} />} />
      <Route path="/admin/create_product"
        element={<PrivateRoute element={<CreateProductForm />} roles={["admin"]} />} />
      <Route path="/admin/edit_product/:id"
        element={<PrivateRoute element={<EditProductForm />} roles={["admin"]} />} />
      <Route path="/admin/show_category"
        element={<PrivateRoute element={<ShowCategoryFrom />} roles={["admin"]} />} />
      <Route path="/admin/create_category"
        element={<PrivateRoute element={<CreateCategoryForm />} roles={["admin"]} />} />
      <Route path="/admin/edit_category/:id"
        element={<PrivateRoute element={<EditCategoryForm />} roles={["admin"]} />} />
      <Route path="/admin/create_producer"
        element={<PrivateRoute element={<CreateProducerForm />} roles={["admin"]} />} />
      <Route path="/admin/show_producer"
        element={<PrivateRoute element={<ShowProducerFrom />} roles={["admin"]} />} />
      <Route path="/admin/edit_producer/:id"
        element={<PrivateRoute element={<EditProducerForm />} roles={["admin"]} />} />
      <Route path="/admin/show_user"
        element={<PrivateRoute element={<ShowUserForm />} roles={["admin"]} />} />
      <Route path="/admin/edit_user/:id"
        element={<PrivateRoute element={<EditUserForm />} roles={["admin"]} />} />
      <Route path="/admin/show_blog"
      element={<PrivateRoute element={<ShowBlogFrom />} roles={["admin"]} />} />
      <Route path="/admin/create_blog"
      element={<PrivateRoute element={<CreateBlogFrom />} roles={["admin"]} />} />
      <Route path="/admin/edit_blog/:id"
      element={<PrivateRoute element={<EditBlogFrom />} roles={["admin"]} />} />
    </Routes>
  );
};

export default AppRoutes;
