import React from "react";
import { useNavigate } from "react-router-dom";

import useCategories from "../../components/hooks/getCategory";
import useDeleteCategory from "../../components/hooks/deleteCategory"; 

import Navbar_Admin from "../../components/ui/Navbar_Admin";

const Category = () => {
    const { categories, loading, error } = useCategories();
    const { deleteCategory, loading: loadingDelete } = useDeleteCategory(); 
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
        if (!confirmed) return;

        try {
            await deleteCategory(id);
            alert("Xóa danh mục thành công!");
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Xóa danh mục thất bại!");
        }
    };

    return (
        <>
            <Navbar_Admin />
            <br />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-blue-600">Categories</h1>
                <button
                    onClick={() => navigate("/admin/create_category")}
                    className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition"
                >
                    + Create Category
                </button>
            </div>
            <div className="overflow-x-auto shadow-md rounded-2xl">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 font-semibold text-gray-700">#</th>
                            <th className="px-6 py-3 font-semibold text-gray-700">Category name</th>
                            <th className="px-6 py-3 font-semibold text-gray-700">Description</th>
                            <th className="px-6 py-3 font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {categories.map((category, index) => (
                            <tr key={category._id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-gray-600">{index + 1}</td>

                                <td className={`px-6 py-4 font-medium text-gray-900 ${category.isDelete ? 'line-through' : ''}`}>
                                    {category.name}
                                </td>

                                <td className={`px-6 py-4 font-medium text-gray-900 ${category.isDelete ? 'line-through' : ''}`}>
                                    {category.description}
                                </td>

                                <td className="px-6 py-4 flex gap-2">
                                    <button
                                        className="px-3 py-1 text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 rounded"
                                        onClick={() => navigate(`/admin/edit_category/${category._id}`)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(category._id)}
                                        disabled={category.isDelete || loadingDelete}
                                        className={`px-3 py-1 text-xs font-medium text-white rounded
                                            ${category.isDelete || loadingDelete
                                                ? 'bg-red-300 cursor-not-allowed'
                                                : 'bg-red-500 hover:bg-red-600'
                                            }`}
                                    >
                                        {loadingDelete ? "Đang xóa..." : "Delete"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Category;
