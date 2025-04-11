import React from "react";
import { useNavigate } from "react-router-dom";

import useProducer from "../../components/hooks/getProducer";
import useDeleteProducer from "../../components/hooks/deleteProducer"; 

import Navbar_Admin from "../../components/ui/Navbar_Admin";

const Producer = () => {
    const { producers, loading, error } = useProducer();
    const { deleteProducer, loading: loadingDelete } = useDeleteProducer(); 
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
        if (!confirmed) return;

        try {
            await deleteProducer(id);
            alert("Xóa nhà sản xuất thành công!");
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Xóa nhà sản xuất thất bại!");
        }
    };

    return (
        <>
            <Navbar_Admin />
            <br />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold text-blue-600">Producers</h1>
                <button
                    onClick={() => navigate("/admin/create_producer")}
                    className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition"
                >
                    + Create Producer
                </button>
            </div>
            <div className="overflow-x-auto shadow-md rounded-2xl">
                <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 font-semibold text-gray-700">#</th>
                            <th className="px-6 py-3 font-semibold text-gray-700">Producer name</th>
                            <th className="px-6 py-3 font-semibold text-gray-700">Description</th>
                            <th className="px-6 py-3 font-semibold text-gray-700">Address</th>
                            <th className="px-6 py-3 font-semibold text-gray-700">Phone number</th>
                            <th className="px-6 py-3 font-semibold text-gray-700">Email</th>
                            <th className="px-6 py-3 font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {producers.map((producer, index) => (
                            <tr key={producer._id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-gray-600">{index + 1}</td>

                                <td className={`px-6 py-4 font-medium text-gray-900 ${producer.isDelete ? 'line-through' : ''}`}>
                                    {producer.name}
                                </td>

                                <td className={`px-6 py-4 font-medium text-gray-900 ${producer.isDelete ? 'line-through' : ''}`}>
                                    {producer.description}
                                </td>

                                <td className={`px-6 py-4 font-medium text-gray-900 ${producer.isDelete ? 'line-through' : ''}`}>
                                    {producer.address}
                                </td>

                                <td className={`px-6 py-4 font-medium text-gray-900 ${producer.isDelete ? 'line-through' : ''}`}>
                                    {producer.phoneNumber}
                                </td>

                                <td className={`px-6 py-4 font-medium text-gray-900 ${producer.isDelete ? 'line-through' : ''}`}>
                                    {producer.email}
                                </td>

                                <td className="px-6 py-4 flex gap-2">
                                    <button
                                        className="px-3 py-1 text-xs font-medium text-white bg-blue-500 hover:bg-blue-600 rounded"
                                        onClick={() => navigate(`/admin/edit_producer/${producer._id}`)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(producer._id)}
                                        disabled={producer.isDelete || loadingDelete}
                                        className={`px-3 py-1 text-xs font-medium text-white rounded
                                            ${producer.isDelete || loadingDelete
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

export default Producer;
