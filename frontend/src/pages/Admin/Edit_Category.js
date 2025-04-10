import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useGetCategoryById from "../../components/hooks/getCategoryByID";
import useUpdateCategory from "../../components/hooks/updateCategory";

const EditCategoryForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { category, loading: loadingCategory } = useGetCategoryById(id);
    const { updateCategory, loading } = useUpdateCategory();
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (category) {
            setValue("name", category.name);
            setValue("description", category.description || "");
        }
    }, [category, setValue]);

    const onSubmit = async (data) => {
        setServerError("");
        try {
            await updateCategory(id, data);
            alert("Category updated successfully!");
            navigate("/admin/show_category");
        } catch (error) {
            const message = error.response?.data?.message || "Failed to update category!";
            setServerError(message);
        }
    };

    if (loadingCategory) return <p>Loading category...</p>;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4 text-green-600 text-center">Chỉnh sửa danh mục</h2>

            {serverError && (
                <p className="text-red-500 text-center font-medium mb-4">{serverError}</p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Tên danh mục</label>
                    <input
                        {...register("name", { required: true })}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Category Name"
                    />
                    {errors.name && <p className="text-red-500">Tên danh mục là bắt buộc</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Mô tả</label>
                    <textarea
                        {...register("description")}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Description"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
                    disabled={loading}
                >
                    {loading ? "Đang cập nhật..." : "Cập nhật danh mục"}
                </button>
            </form>
        </div>
    );
};

export default EditCategoryForm;
