import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FcLike, FcViewDetails } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from 'react-icons/fa';
import { BiSolidLike } from 'react-icons/bi';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const MyLessons = () => {

    const { user } = useAuth();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { data: userPost, isLoading, refetch } = useQuery({
        queryKey: ['life-lesson', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/life_lessons/email/${user?.email}`)
            return res.data
        }
    });
    const handlePrivacy = async (p, newPrivacy) => {
        const res = await axiosSecure.patch(`/update_lessons/${p._id}`, {
            privacy: newPrivacy 
        })
        if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Privacy has been changed",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    const handleAccessLevel = async (p, newAccessLevel) => {
        const res = await axiosSecure.patch(`/update_lessons/${p._id}`, {
           accessLevel : newAccessLevel 
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
    const handleDeleteLessons = (p) => {
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
                    await axiosSecure.delete(`/life_lessons/${p._id}`);
                    refetch();
                    Swal.fire(
                        'Removed!',
                        'Lesson has been removed .',
                        'success'
                    );
                } catch (error) {
                    console.error('Error removing lessons:', error);
                    Swal.fire(
                        'Error!',
                        'Failed to remove from lessons.',
                        'error'
                    );
                }
            }
        });
    }
    if (isLoading) {
        return <p className='text-primary flex  justify-center items-center-safe mt-5'>Loading...</p>
    }

    return (
        <div className='max-w-11/12 mx-auto shadow-sm p-5 rounded-xl my-10 '>
            <div className='font-bold text-3xl'>My all Lessons:({userPost.length})</div>
            <div className="overflow-x-auto">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th className="h-16">Index</th>
                            <th className="h-16">Title</th>
                            <th className="h-16">Change visibility</th>
                            <th className="h-16">Access Level</th>
                            <th className="h-16">Lesson Overview</th>
                            <th className="h-16">Action Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userPost.map((p, index) => (
                            <tr key={p._id} className="h-32 hover:bg-base-200">
                                {/* Index */}
                                <th className="align-middle h-full">
                                    <div className="flex items-center justify-center h-full">
                                        {index + 1}
                                    </div>
                                </th>

                                {/* Title */}
                                <th className="align-middle h-full">
                                    <div className="flex items-center justify-center h-full">
                                        {p.title}
                                    </div>
                                </th>

                                {/* Visibility */}
                                <td className="align-middle h-full">
                                    <div className="flex items-center  justify-center h-full">
                                        <select
                                            value={p?.privacy} 
                                            onChange={(e) => handlePrivacy(p, e.target.value)}  
                                            className="select select-bordered bg-primary/50  w-full max-w-xs"
                                        >
                                            <option value="public" className="text-white  bg-primary">Public</option>
                                            <option value="private" className="text-white bg-primary mt-2">Private</option>
                                        </select>
                                    </div>
                                </td>

                                {/* Access Level */}
                                <td className="align-middle h-full">
                                    <div className="flex items-center justify-center h-full">
                                        <select value={p?.accessLevel}
                                        onChange={(e)=>handleAccessLevel(p,e.target.value)}
                                        className="select bg-primary/80 text-white select-bordered w-full max-w-xs">
                                            <option value="public" className="text-white bg-primary mb-1">Free</option>

                                            <option value="premium" className="text-white bg-primary">Premium</option>
                                        </select>
                                    </div>
                                </td>

                                {/* Lesson Overview */}
                                <td className="align-middle h-full">
                                    <div className="flex flex-col items-center justify-center h-full min-h-[100px]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-sm font-bold">Create Date:</span>
                                            <div className="text-xs"><span className="text-gray-500">
                                                {new Date(p?.createAt).toLocaleDateString()}
                                            </span></div>
                                        </div>
                                        <div className="mb-2">
                                            <span className="text-sm font-bold">Reactions Count:</span>
                                            <span className="badge badge-primary ml-1"><BiSolidLike /> ({p?.like || 0})</span>
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold">Favorites Count:</span>
                                            <span className="badge badge-primary ml-1"><FcLike /> ({p?.
                                                totalFavorites || 0})</span>
                                        </div>
                                    </div>
                                </td>

                                {/* Action Buttons */}
                                <td className="align-middle h-full">
                                    <div className="flex items-center justify-center h-full space-x-4">
                                    

                                        {/* Details Button */}
                                        <div className="tooltip" data-tip="Lesson Details">
                                            <button onClick={() => navigate(`/details-lesson/${p?._id}`)} className="btn btn-square btn-sm bg-green-100 text-green-600 hover:bg-green-200">
                                                <FcViewDetails />
                                            </button>
                                        </div>

                                        {/* Delete Button */}
                                        <div className="tooltip" data-tip="Delete Lesson">
                                            <button onClick={() => handleDeleteLessons(p)} className="btn btn-square btn-sm bg-red-100 text-red-600 hover:bg-red-200">
                                                <MdDeleteForever />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyLessons;