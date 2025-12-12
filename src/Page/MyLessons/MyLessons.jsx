import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FcLike, FcViewDetails } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from 'react-icons/fa';
import { BiSolidLike } from 'react-icons/bi';
import useAuth from '../../Hooks/useAuth';

const MyLessons = () => {
    const {user}=useAuth();

    const axiosSecure = useAxiosSecure();
    const { data: userPost, isLoading } = useQuery({
        queryKey: ['life-lesson',user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/life_lessons/email/${user?.email}`)
            return res.data
        }
    })
    if (isLoading) {
        return <p className='text-primary flex justify-center items-center-safe mt-5'>Loading...</p>
    }

    return (
        <div>
            <div>My all Lessons:{userPost.length}</div>
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
                                    <div className="flex items-center justify-center h-full">
                                        <select className="select select-bordered w-full max-w-xs">
                                            <option value="public" className="text-white bg-primary mb-1">Public</option>
                                            <option value="private" className="text-white bg-primary">Private</option>
                                        </select>
                                    </div>
                                </td>

                                {/* Access Level */}
                                <td className="align-middle h-full">
                                    <div className="flex items-center justify-center h-full">
                                        <select className="select select-bordered w-full max-w-xs">
                                            <option value="public" className="text-white bg-primary mb-1">Public</option>
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
                                            <span className="badge badge-primary ml-1"><BiSolidLike /> ({p?.like})</span>
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold">Favorites Count:</span>
                                            <span className="badge badge-primary ml-1"><FcLike /> ({p?.favorites?.length})</span>
                                        </div>
                                    </div>
                                </td>

                                {/* Action Buttons */}
                                <td className="align-middle h-full">
                                    <div className="flex items-center justify-center h-full space-x-4">
                                        {/* Edit Button */}
                                        <div className="tooltip" data-tip="Edit Lesson">
                                            <button className="btn btn-square btn-sm bg-blue-100 text-blue-600 hover:bg-blue-200">
                                                <FaRegEdit />
                                            </button>
                                        </div>

                                        {/* Details Button */}
                                        <div className="tooltip" data-tip="Lesson Details">
                                            <button className="btn btn-square btn-sm bg-green-100 text-green-600 hover:bg-green-200">
                                                <FcViewDetails />
                                            </button>
                                        </div>

                                        {/* Delete Button */}
                                        <div className="tooltip" data-tip="Delete Lesson">
                                            <button className="btn btn-square btn-sm bg-red-100 text-red-600 hover:bg-red-200">
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