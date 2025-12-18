import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch users
    const { data: users = [], isLoading: isUsersLoading, refetch: refetchUsers } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return Array.isArray(res.data) ? res.data : [];
        },
    });

    // Fetch all lessons
    const { data: allLessonsData = [] } = useQuery({
        queryKey: ["allLessons"],
        queryFn: async () => {
            const res = await axiosSecure.get("/life_lessons");
            // Ensure we extract lessons array safely
            return Array.isArray(res.data.lessons) ? res.data.lessons : [];
        },
    });

    const handleUserRole = async (userItem, newRole) => {
        try {
            const res = await axiosSecure.patch(`/users/${userItem?.email}`, {
                role: newRole,
            });

            if (res.data.modifiedCount) {
                refetchUsers();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "AccessLevel has been changed",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error("Error changing role:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to change role",
            });
        }
    };

    const handleDeleteUser = async (userItem) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/users/${userItem?.email}`);
                    refetchUsers();
                    Swal.fire("Removed!", "User has been removed.", "success");
                } catch (error) {
                    console.error("Error removing user:", error);
                    Swal.fire("Error!", "Failed to remove user.", "error");
                }
            }
        });
    };

    if (isUsersLoading) {
        return (
            <p className="text-primary flex justify-center items-center mt-5">
                Loading...
            </p>
        );
    }

    return (
        <div className="max-w-11/12 mx-auto shadow-2xl rounded-2xl p-6 mt-10">
            <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th className="text-center">Role</th>
                            <th className="text-center">Total Lessons</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((userItem, idx) => {
                            const totalLessons = allLessonsData.filter(
                                (lesson) => lesson.email === userItem.email
                            ).length;

                            return (
                                <tr key={userItem._id}>
                                    <th>{idx + 1}</th>
                                    <td>{userItem?.displayName || "N/A"}</td>
                                    <td>{userItem.email}</td>
                                    <td className="align-middle h-full">
                                        <div className="flex items-center justify-center h-full">
                                            <select
                                                value={userItem?.role}
                                                onChange={(e) => handleUserRole(userItem, e.target.value)}
                                                className="select text-center bg-primary/80 text-white select-bordered w-full max-w-xs"
                                            >
                                                <option value="user" className="text-white bg-primary mb-1">
                                                    user
                                                </option>
                                                <option value="admin" className="text-white bg-primary">
                                                    admin
                                                </option>
                                            </select>
                                        </div>
                                    </td>
                                    <td className="text-center">{totalLessons}</td>
                                    <td className="text-center">
                                        <div className="tooltip" data-tip="Delete User">
                                            <button
                                                onClick={() => handleDeleteUser(userItem)}
                                                className="btn text-center btn-square btn-sm bg-red-100 text-red-600 hover:bg-red-200"
                                            >
                                                <MdDeleteForever />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;
