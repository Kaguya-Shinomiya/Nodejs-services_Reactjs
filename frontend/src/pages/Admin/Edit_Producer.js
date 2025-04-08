import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useGetProducerById from "../../components/hooks/getProducerByID";
import useUpdateProducer from "../../components/hooks/updateProducer";

const EditProducerForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { producer, loading: loadingProducer } = useGetProducerById(id);
    const { updateProducer, loading } = useUpdateProducer();
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (producer) {
            setValue("name", producer.name);
            setValue("description", producer.description || "");
            setValue("address", producer.address);
            setValue("phoneNumber", producer.phoneNumber);
            setValue("email", producer.email);
        }
    }, [producer, setValue]);

    const onSubmit = async (data) => {
        setServerError("");
        try {
            await updateProducer(id, data);
            alert("Producer updated successfully!");
            navigate("/admin/show_producer");
        } catch (error) {
            const message = error.response?.data?.message || "Failed to update producer!";
            setServerError(message);
        }
    };

    if (loadingProducer) return <p>Loading producer...</p>;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">Chỉnh sửa nhà sản xuất</h2>

            {serverError && (
                <p className="text-red-500 text-center font-medium mb-4">{serverError}</p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Tên nhà sản xuất</label>
                    <input
                        {...register("name", { required: true })}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Tên nhà sản xuất"
                    />
                    {errors.name && <p className="text-red-500">Tên là bắt buộc</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Mô tả</label>
                    <textarea
                        {...register("description")}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Mô tả"
                    ></textarea>
                </div>

                <div>
                    <label className="block mb-1 font-medium">Địa chỉ</label>
                    <input
                        {...register("address", { required: true })}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Địa chỉ"
                    />
                    {errors.address && <p className="text-red-500">Địa chỉ là bắt buộc</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Số điện thoại</label>
                    <input
                        {...register("phoneNumber", { required: true })}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Số điện thoại"
                    />
                    {errors.phoneNumber && <p className="text-red-500">Số điện thoại là bắt buộc</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        {...register("email", {
                            required: true,
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        })}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Email"
                    />
                    {errors.email?.type === "required" && (
                        <p className="text-red-500">Email là bắt buộc</p>
                    )}
                    {errors.email?.type === "pattern" && (
                        <p className="text-red-500">Email không hợp lệ</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? "Đang cập nhật..." : "Cập nhật nhà sản xuất"}
                </button>
            </form>
        </div>
    );
};

export default EditProducerForm;
