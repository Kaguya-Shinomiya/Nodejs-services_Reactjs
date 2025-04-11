import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useCategories from "../../components/hooks/getCategory";
import useProducers from "../../components/hooks/getProducer";
import useUpdateProduct from "../../components/hooks/updateProduct";
import useGetProductById from "../../components/hooks/getProductByID";

const EditProductForm = () => {
    const { id } = useParams(); 
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { categories, loading: loadingCategories } = useCategories();
    const { producers, loading: loadingProducers } = useProducers();
    const { updateProduct, loading } = useUpdateProduct();
    const { product, loading: loadingProduct } = useGetProductById(id);
    const navigate = useNavigate();

    useEffect(() => {
        if (product) {
            for (const key in product) {
                if (product.hasOwnProperty(key)) {
                    if (key === "categoryId" && product[key]?._id) {
                        setValue("categoryId", product[key]._id);
                    } else if (key === "producerId" && product[key]?._id) {
                        setValue("producerId", product[key]._id);
                    } else if (key === "releaseDate" && product[key]) {
                        const dateStr = new Date(product[key]).toISOString().split("T")[0];
                        setValue(key, dateStr);
                    } else if (key === "isPreOrder" || key === "isNew") {
                        setValue(key, !!product[key]);
                    } else {
                        setValue(key, product[key]);
                    }
                }
            }
        }
    }, [product, setValue]);

    const onSubmit = async (data) => {
        try {
            await updateProduct(id, data);
            alert("Product updated successfully!");
            navigate("/admin/show_product");
        } catch (error) {
            alert("Failed to update product!");
        }
    };

    if (loadingProduct) return <p>Loading product...</p>;

    return (
        <>
            <br />
            <h1 className="text-3xl font-bold text-center text-green-500">Chỉnh sửa sản phẩm</h1>
            <br />

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
                    {loadingCategories ? <option>Loading...</option> :
                        categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                </select>
                {errors.categoryId && <p className="text-red-500">Category is required</p>}

                <select {...register("producerId", { required: true })} className="w-full p-2 border rounded">
                    {loadingProducers ? <option>Loading...</option> :
                        producers.map(producer => (
                            <option key={producer._id} value={producer._id}>{producer.name}</option>
                        ))}
                </select>
                {errors.producerId && <p className="text-red-500">Producer is required</p>}

                <input type="number" {...register("stockQuantity", { required: true, min: 0 })} className="w-full p-2 border rounded" placeholder="Stock Quantity" />
                {errors.stockQuantity && <p className="text-red-500">Stock quantity is required</p>}

                <label className="flex items-center space-x-2">
                    <input type="checkbox" {...register("isPreOrder")} />
                    <span>Pre Order</span>
                </label>

                <input type="date" {...register("releaseDate")} className="w-full p-2 border rounded" />

                <label className="flex items-center space-x-2">
                    <input type="checkbox" {...register("isNew")} />
                    <span>New Product</span>
                </label>

                <input type="number" {...register("rating", { min: 0, max: 5 })} className="w-full p-2 border rounded" placeholder="Rating (0-5)" />

                <input type="number" {...register("sold", { min: 0 })} className="w-full p-2 border rounded" placeholder="Sold" />

                <button type="submit" className="w-full p-2 bg-green-500 text-white rounded" disabled={loading}>
                    {loading ? "Updating..." : "Update Product"}
                </button>
            </form>
        </>
    );
};

export default EditProductForm;
