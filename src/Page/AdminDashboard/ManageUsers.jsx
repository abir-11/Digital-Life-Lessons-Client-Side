import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();


    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const { data: allLessons = [] } = useQuery({
        queryKey: ["allLessons"],
        queryFn: async () => {
            const res = await axiosSecure.get("/life_lessons");
            return res.data;
        },
    });
    const handleUserRole = async (user, newRole) => {
        const res = await axiosSecure.patch(`/users/${user?.email}`, {
            role: newRole
        })
        if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "AccessLevel has been changed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    const handleDeleteUser = async (user) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/users/${user?.email}`)
                        ;
                    refetch();
                    Swal.fire(
                        'Removed!',
                        'Lesson has been removed from favorites.',
                        'success'
                    );
                } catch (error) {
                    console.error('Error removing favorite:', error);
                    Swal.fire(
                        'Error!',
                        'Failed to remove from favorites.',
                        'error'
                    );
                }
            }
        });
    }
   

    if (isLoading) {
        return (
            <p className="text-primary flex justify-center items-center mt-5">
                Loading...
            </p>

        );
    }
    console.log(users);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th className="text-center">Role</th>
                            <th>Total Lessons</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => {

                            const totalLessons = allLessons.filter(
                                lesson => lesson.email === user.email
                            ).length;
                            return (
                                <tr key={user._id}>
                                    <th>{idx + 1}</th>
                                    <td>{user?.displayName || "N/A"}</td>
                                    <td>{user.email}</td>
                                    <td className="align-middle h-full">
                                        <div className="flex items-center justify-center h-full">
                                            <select value={user?.role}
                                                onChange={(e) => handleUserRole(user, e.target.value)}
                                                className="select text-center bg-primary/80 text-white select-bordered w-full max-w-xs">
                                                <option value="user" className="text-white bg-primary mb-1">user</option>

                                                <option value="admin" className="text-white bg-primary">admin</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td className=" text-center">{totalLessons}</td>
                                    <td className="text-center">
                                        <div className="tooltip" data-tip="Delete Lesson">
                                            <button onClick={() => handleDeleteUser(user)} className="btn text-center btn-square btn-sm bg-red-100 text-red-600 hover:bg-red-200">
                                                <MdDeleteForever />
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            )
                        }


                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
