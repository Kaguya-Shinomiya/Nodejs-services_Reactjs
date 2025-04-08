import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useGetUserById from "../../components/hooks/getUserByID";
import useUpdateUser from "../../components/hooks/updateUser";
import useGetAllRoles from "../../components/hooks/getRole"; // 👈 hook giả định để lấy danh sách role

const EditUserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, loading: loadingUser } = useGetUserById(id);
    const { updateUser, loading } = useUpdateUser();
    const { roles, loading: loadingRoles } = useGetAllRoles(); 

    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (user) {
            setValue("username", user.username);
            setValue("email", user.email || "");
            setValue("fullName", user.fullName || "");
            setValue("address", user.address || "");
            setValue("role", user.role?._id || ""); 
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        setServerError("");
        try {
            await updateUser(id, data);
            alert("User updated successfully!");
            navigate("/admin/show_user");
        } catch (error) {
            const message = error.response?.data?.message || "Failed to update user!";
            setServerError(message);
        }
    };

    if (loadingUser || loadingRoles) return <p>Loading...</p>;

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 text-center">Chỉnh sửa người dùng</h2>

            {serverError && (
                <p className="text-red-500 text-center font-medium mb-4">{serverError}</p>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">Username</label>
                    <input
                        {...register("username", { required: true })}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Username"
                    />
                    {errors.username && <p className="text-red-500">Username là bắt buộc</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Email"
                    />
                    {errors.email && <p className="text-red-500">Email là bắt buộc</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Full Name</label>
                    <input
                        {...register("fullName")}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Full Name"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Address</label>
                    <input
                        {...register("address", { required: true })}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Address"
                    />
                    {errors.address && <p className="text-red-500">Address là bắt buộc</p>}
                </div>

                <div>
                    <label className="block mb-1 font-medium">Role</label>
                    <select
                        {...register("role", { required: true })}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        {roles
                        .filter((role) => role.name != 'admin')
                        .map((role) => (
                            <option key={role._id} value={role._id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                    {errors.role && <p className="text-red-500">Role là bắt buộc</p>}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? "Đang cập nhật..." : "Cập nhật người dùng"}
                </button>
            </form>
        </div>
    );
};

export default EditUserForm;
