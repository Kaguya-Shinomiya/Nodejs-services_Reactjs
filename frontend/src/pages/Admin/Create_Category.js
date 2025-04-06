import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useCreateCategory from "../../components/hooks/createCategory";

const CreateCategoryForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createCategory, loading } = useCreateCategory();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await createCategory(data);
            alert("Category created successfully!");
            reset();
            navigate("/admin/show_category");
        } catch (error) {
            alert("Failed to create category!");
        }
    };

    return (
        <>
            <br />
            <h1 className="text-3xl font-bold text-center text-green-500">Trang thêm danh mục</h1>
            <br />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    {...register("name", { required: "Category name is required", maxLength: 100 })}
                    className="w-full p-2 border rounded"
                    placeholder="Category Name"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <textarea
                    {...register("description")}
                    className="w-full p-2 border rounded"
                    placeholder="Description (optional)"
                ></textarea>

                <button type="submit" className="w-full p-2 bg-green-500 text-white rounded" disabled={loading}>
                    {loading ? "Creating..." : "Create Category"}
                </button>
            </form>
        </>
    );
};

export default CreateCategoryForm;
