import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useCreateProducer from "../../components/hooks/createProducer";

const CreateProducerForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createProducer, loading } = useCreateProducer();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await createProducer(data);
            alert("Producer created successfully!");
            reset();
            navigate("/admin/show_producer");
        } catch (error) {
            alert("Failed to create producer!");
        }
    };

    return (
        <>
            <br />
            <h1 className="text-3xl font-bold text-center text-blue-500">Trang thêm nhà sản xuất</h1>
            <br />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    {...register("name", { required: "Tên nhà sản xuất là bắt buộc", maxLength: 100 })}
                    className="w-full p-2 border rounded"
                    placeholder="Tên nhà sản xuất"
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}

                <textarea
                    {...register("description")}
                    className="w-full p-2 border rounded"
                    placeholder="Mô tả (tùy chọn)"
                ></textarea>

                <input
                    {...register("address", { required: "Địa chỉ là bắt buộc" })}
                    className="w-full p-2 border rounded"
                    placeholder="Địa chỉ"
                />
                {errors.address && <p className="text-red-500">{errors.address.message}</p>}

                <input
                    {...register("phoneNumber", { required: "Số điện thoại là bắt buộc" })}
                    className="w-full p-2 border rounded"
                    placeholder="Số điện thoại"
                />
                {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}

                <input
                    {...register("email", {
                        required: "Email là bắt buộc",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Email không hợp lệ"
                        }
                    })}
                    className="w-full p-2 border rounded"
                    placeholder="Email"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded" disabled={loading}>
                    {loading ? "Đang thêm..." : "Thêm nhà sản xuất"}
                </button>
            </form>
        </>
    );
};

export default CreateProducerForm;
