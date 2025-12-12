import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FcViewDetails } from "react-icons/fc";
import useAuth from '../../Hooks/useAuth';

const Author = () => {
    const { user } = useAuth()
    const { email } = useParams(); // get author email from URL
    const axiosSecure = useAxiosSecure();

    // Fetch lessons by author's email
    const { data: lessons, isLoading } = useQuery({
        queryKey: ['lessonsByEmail', email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/life_lessons/email/${email}`);
            return res.data;
        }
    });
    const { data: users } = useQuery({
        queryKey: ["users", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
    });

    if (isLoading) {
        return (
            <p className="text-primary flex justify-center items-center mt-5">
                Loading...
            </p>
        );
    }

    return (
        <div className='max-w-11/12 mx-auto my-5 bg-white shadow-lg rounded-2xl p-6 mt-8'>
            <div>Author all Lessons: {lessons?.length || 0}</div>
            <div className="overflow-x-auto mt-4">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th className="h-16">Index</th>
                            <th className="h-16">Author name</th>
                            <th className="h-16">Title</th>

                            <th className="h-16">visibility</th>
                            <th className="h-16">Access Level</th>
                            <th className="h-16">Lesson Overview</th>
                            <th className="h-16">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons?.map((p, index) => {

                            const premium = p?.accessLevel === "premium";
                            const isPrivateLesson = p?.privacy === "private";
                            const blocked = (premium && users?.isPremium !== true)
                            if (isPrivateLesson) {
                                return null;
                            }

                            return (
                                <tr key={p._id} className="h-32 hover:bg-base-200">
                                    <th className="align-middle h-full">{index + 1}</th>
                                    <th className="align-middle h-full">{p.name}</th>
                                    <td className="align-middle h-full">{p.title}</td>

                                    <td className="align-middle h-full">
                                        <span className="text-sm font-bold">{p.privacy}</span>
                                    </td>

                                    <td className="align-middle h-full">
                                        <span className="text-sm font-bold">{p.accessLevel}</span>
                                    </td>

                                    <td className="align-middle h-full">
                                        <div className="flex flex-col items-center justify-center h-full min-h-[100px]">
                                            <div className="flex items-center gap-2 mb-2">
                                                
                                                <span className="text-xs text-gray-500">{new Date(p.createAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="align-middle h-full">
                                        <div className="flex items-center justify-center h-full space-x-4">
                                            <div className="tooltip" data-tip="Lesson Details">

                                                {!blocked && (
                                                    <Link to={`/details-lesson/${p._id}`}>
                                                        
                                                        <button className="btn btn-square btn-sm bg-green-100 text-green-600 hover:bg-green-200">
                                                            <FcViewDetails />
                                                        </button>
                                                    </Link>
                                                )}
                                            </div>
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

export default Author;
