import React from "react";
import { useNavigate } from "react-router-dom";

import useUsers from "../../components/hooks/getUser";
import useDeleteUser from "../../components/hooks/deleteUser";

import Navbar_Admin from "../../components/ui/Navbar_Admin";

const User = () => {
    const { users, loading, error } = useUsers();
    const { deleteUser, loading: loadingDelete } = useDeleteUser();
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa user này?");
        if (!confirmed) return;

        try {
            await deleteUser(id);
            alert("Xóa user thành công!");
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Xóa user thất bại!");
        }
    };

    return (
        <>
            <Navbar_Admin />
            <br />
            <div className="overflow-x-auto shadow-md rounded-2xl">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 font-semibold text-gray-700">#</th>
                            <th className="px-6 py-3 font-semibold text-gray-700">User name</th>
                            <th className="px-6 py-3 font-semibold text-gray-700">Full name</th>
                            <th className="px-6 py-3 font-semibold text-gray-700">Email</th>
                            <th className="px-6 py-3 font-semibold text-gray-700">Address</th>
                            <th className="px-6 py-3 font-semibold text-gray-700">Role</th>
                            <th className="px-6 py-3 font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-gray-600">{index + 1}</td>

                                <td className={`px-6 py-4 font-medium text-gray-900 ${!user.status ? 'line-through' : ''}`}>
                                    {user.username}
                                </td>

                                <td className={`px-6 py-4 font-medium text-gray-900 ${!user.status ? 'line-through' : ''}`}>
                                    {user.fullName}
                                </td>
                                <td className={`px-6 py-4 font-medium text-gray-900 ${!user.status ? 'line-through' : ''}`}>
                                    {user.email}
                                </td>
                                <td className={`px-6 py-4 font-medium text-gray-900 ${!user.status ? 'line-through' : ''}`}>
                                    {user.address}
                                </td>
                                <td className={`px-6 py-4 font-medium text-gray-900 ${!user.status ? 'line-through' : ''}`}>
                                    {user.role.name}
                                </td>

                                <td className="px-6 py-4 flex gap-2">
                                    <button
                                        className="px-3 py-1 text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 rounded"
                                        onClick={() => navigate(`/admin/edit_user/${user._id}`)}
                                    >
                                        Edit
                                    </button>

                                    {user.role.name !='admin' && (
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            disabled={!user.status || loadingDelete}
                                            className={`px-3 py-1 text-xs font-medium text-white rounded
                                            ${!user.status || loadingDelete
                                                    ? 'bg-red-300 cursor-not-allowed'
                                                    : 'bg-red-500 hover:bg-red-600'
                                                }`}
                                        >
                                            {loadingDelete ? "Đang xóa..." : "Delete"}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default User;
