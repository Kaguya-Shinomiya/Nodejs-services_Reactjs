import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate
import useCategories from "../../components/hooks/getCategory";
import useProducers from "../../components/hooks/getProducer";
import axios from "axios";

const CreateProductForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { categories, loading: loadingCategories } = useCategories();
    const { producers, loading: loadingProducers } = useProducers();
    const navigate = useNavigate();  // Khai báo navigate

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("productName", data.productName);
            formData.append("price", data.price);
            formData.append("old_price", data.old_price);
            formData.append("description", data.description || "");
            formData.append("categoryId", data.categoryId);
            formData.append("producerId", data.producerId);
            formData.append("stockQuantity", data.stockQuantity);
            formData.append("isPreOrder", data.isPreOrder);
            formData.append("releaseDate", data.releaseDate || "");
            formData.append("isNew", data.isNew);
            formData.append("rating", data.rating);
            formData.append("sold", data.sold);

            if (data.imageUrl.length > 0) {
                for (let i = 0; i < data.imageUrl.length; i++) {
                    formData.append("images", data.imageUrl[i]);
                }
            }

            const response = await axios.post("http://127.0.0.1:5000/products", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Product created:", response.data);
            alert("Product created successfully!");

            reset();  // Reset form sau khi gửi thành công
            
            navigate("/");  // Chuyển hướng về trang chủ
        } catch (error) {
            console.error("Error creating product:", error);
            alert("Failed to create product!");
        }
    };

    return (
        <>
            <br></br>
            <h1 className="text-3xl font-bold text-center text-blue-500">Trang thêm sản phẩm</h1>
            <br></br>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input {...register("productName", { required: true, maxLength: 100 })} className="w-full p-2 border rounded" placeholder="Product Name" />
                {errors.productName && <p className="text-red-500">Product name is required</p>}

                <input type="number" {...register("price", { required: true, min: 0 })} className="w-full p-2 border rounded" placeholder="Price" />
                {errors.price && <p className="text-red-500">Valid price is required</p>}

                <input type="number" {...register("old_price", { required: true, min: 0 })} className="w-full p-2 border rounded" placeholder="Old Price" />
                {errors.old_price && <p className="text-red-500">Valid old price is required</p>}

                <textarea {...register("description")} className="w-full p-2 border rounded" placeholder="Description"></textarea>

                <input type="file" {...register("imageUrl")} multiple className="w-full p-2 border rounded" />

                <select {...register("categoryId", { required: true })} className="w-full p-2 border rounded">
                    <option value="">Select Category</option>
                    {loadingCategories ? <option>Loading...</option> :
                        categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                </select>
                {errors.categoryId && <p className="text-red-500">Category is required</p>}

                <select {...register("producerId", { required: true })} className="w-full p-2 border rounded">
                    <option value="">Select Producer</option>
                    {loadingProducers ? <option>Loading...</option> :
                        producers.map(producer => (
                            <option key={producer._id} value={producer._id}>{producer.name}</option>
                        ))}
                </select>
                {errors.producerId && <p className="text-red-500">Producer is required</p>}

                <input type="number" {...register("stockQuantity", { required: true, min: 0 })} className="w-full p-2 border rounded" placeholder="Stock Quantity" />
                {errors.stockQuantity && <p className="text-red-500">Stock quantity is required</p>}

                <label className="flex items-center space-x-2">
                    <input type="checkbox" {...register("isPreOrder", { required: true })} />
                    <span>Pre Order</span>
                </label>
                {errors.isPreOrder && <p className="text-red-500">Pre order selection is required</p>}

                <input type="date" {...register("releaseDate")} className="w-full p-2 border rounded" />

                <label className="flex items-center space-x-2">
                    <input type="checkbox" {...register("isNew")} />
                    <span>New Product</span>
                </label>

                <input type="number" {...register("rating", { min: 0, max: 5 })} className="w-full p-2 border rounded" placeholder="Rating (0-5)" />

                <input type="number" {...register("sold", { min: 0 })} className="w-full p-2 border rounded" placeholder="Sold" />

                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Create Product</button>
            </form>
        </>
    );
};

export default CreateProductForm;
