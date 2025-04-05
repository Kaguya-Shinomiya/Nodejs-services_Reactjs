import React from "react";


const Navbar_Admin = () => {
  return (
      <div className={` bg-white shadow-md`}>
        <nav className="flex items-center justify-between px-6 lg:px-10 py-4">
          {/* Menu Items */}
          <div className={`lg:flex lg:items-center lg:space-x-6 absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none transition-all duration-300 block`}>
            <a href="/admin/show_product" className="block lg:inline-block px-4 py-2 text-base lg:text-lg hover:text-primary hover:scale-105 transition-transform duration-200"> Quản lý sản phẩm </a>
            <a href="/admin/categories" className="block lg:inline-block px-4 py-2 text-base lg:text-lg hover:text-primary hover:scale-105 transition-transform duration-200"> Quản lý danh mục </a>
          </div>
        </nav>
      </div>

  );
};

export default Navbar_Admin;
