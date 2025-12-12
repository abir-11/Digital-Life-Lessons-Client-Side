import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import { GiLifeBar } from "react-icons/gi";
import { ImManWoman } from "react-icons/im";
import useAuth from '../../Hooks/useAuth';
import { CiHeart } from "react-icons/ci";
import { LiaHeartSolid } from "react-icons/lia";
import { IoIosHeart } from "react-icons/io";
import Swal from 'sweetalert2';
const DetailsPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: singleLessons, isLoading, refetch } = useQuery({
        queryKey: ['life_lessons', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/life_lessons/${id}`)
            return res.data;

        }
    })
    const { data: users } = useQuery({
        queryKey: ["users", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
    });
    // Update lesson function
    const updateLesson = (lesson, type) => {
       
        const updateInfo = {
            like: type === 'like' ? (lesson.like || 0) + 1 : lesson.like || 0,
            favorites: type === 'favorite' ? (lesson.favorites || 0) + 1 : (lesson.favorites || 0)
        };

        axiosSecure.patch(`/life_lessons/${lesson._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch(); 
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: type === 'like' ? "Liked!" : `save to Favorites!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
            });
    };

    const updateLessons = (lessons, type) => {
       
        const updateInfos = {
            like: type === 'like' ? (lessons.like || 0) + 1 : lessons.like || 0,
            favorites: type === 'favorite' ? (lessons.favorites || 0) - 1 : (lessons.favorites || 0)
        };

        axiosSecure.patch(`/life_lessons/${lessons._id}`, updateInfos)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch(); // Refresh the lessons
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: type === 'favorite' && `remove to Favorites!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                console.error(err);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
            });
    };




    if (isLoading) {
        return (
            <p className="text-primary flex justify-center items-center mt-5">
                Loading...
            </p>

        );
    }
    // Handlers
    const handleLike = (lesson) => {
        updateLesson(lesson, 'like');
    };

    const handleFavorite = (lesson) => {
        updateLesson(lesson, 'favorite');
    };
     const handleFavoriteRemove = (lessons) => {
        updateLessons(lessons, 'favorite');
    };
    console.log(singleLessons)
    return (
        <div className='bg-gray-50 min-h-screen py-5'>
            <div className='max-w-11/12 mx-auto bg-white rounded-xl py-10'>
                <div className='max-w-11/12 mx-auto'>

                    {/*  Lesson Information */}
                    <div>
                        <div className=' pb-2 font-extrabold border-b border-b-gray-100'>
                            <h1 className='flex items-center gap-2'><GiLifeBar /> Lesson Information</h1>
                        </div>
                        <div className='max-w-11/12 mx-auto bg-white shadow-lg rounded-2xl p-6 mt-8'>

                            <div className="flex flex-col sm:flex-row sm:justify-evenly justify-center gap-6 items-center ">

                                {/* Featured Image */}
                                {singleLessons.image && (
                                    <div className="sm:w-1/2  flex justify-center mb-4 sm:mb-0 sm:border-r ">
                                        <img
                                            src={singleLessons.image}
                                            alt={singleLessons.title}
                                            className="  rounded-lg object-cover shadow-sm"
                                        />
                                    </div>
                                )}

                                {/* Lesson Content */}
                                <div className="sm:w-1/2 flex flex-col gap-4">

                                    {/* Lesson Title */}
                                    <h1 className="text-3xl font-extrabold mb-2 text-gradient-to-r from-purple-600 via-pink-500 to-red-500">
                                        {singleLessons.title}
                                    </h1>

                                    {/* Full Description */}
                                    <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                                        <h2 className="text-xl font-semibold mb-2 text-primary">Description</h2>
                                        <p className="text-gray-700 leading-relaxed">{singleLessons.description}</p>
                                    </div>

                                    {/* Category */}
                                    <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium w-fit">
                                        Category: {singleLessons.category}
                                    </div>

                                    {/* Emotional Tone */}
                                    <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium w-fit">
                                        Emotional Tone: {singleLessons.emotionalTone}
                                    </div>
                                    {/*  Lesson Metadata */}
                                    <div className='flex justify-between gap-2 items-center '>
                                        <span className="text-gray-500 bg-gray-100 px-2 rounded-2xl text-sm">
                                            Created Date:{new Date(singleLessons?.createAt).toLocaleDateString()}
                                        </span>
                                        <span className="text-gray-500 bg-green-200 px-2 rounded-2xl text-sm">Last Updated Date:12/3/2026</span>
                                    </div>
                                    <div className="text-gray-500 text-center font-bold bg-pink-200 px-2 rounded-2xl text-sm">
                                        Visibility: {singleLessons.privacy}
                                    </div>
                                </div>
                            </div>
                            <div className='max-w-sm mx-auto my-5 shadow-lg rounded-sm p-5'>
                                <div>
                                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                                        <h1 className='flex items-center font-bold gap-2'>
                                            <IoIosHeart className='text-red-500' />Like:
                                            <span className=''>
                                                {singleLessons.like
                                                    ? <button className='text-white border-none btn btn-sm bg-red-500'><LiaHeartSolid /></button>
                                                    : <button onClick={() => { handleLike(singleLessons) }} className='btn btn-sm'><CiHeart /></button>}
                                            </span>
                                        </h1>

                                        <h1 className='flex items-center font-bold gap-2'>
                                            <span className='inline-block'>🔖Favorites</span>:
                                            <span className=''>
                                                {singleLessons.favorites ? <button onClick={() => { handleFavoriteRemove(singleLessons) }} className='text-white border-none btn btn-sm bg-red-500'>remove</button>
                                                    : <button onClick={() => { handleFavorite(singleLessons) }} className='btn bg-green-100 text-black border-none btn-sm'>save</button>}
                                            </span>
                                        </h1>


                                    </div>


                                    <div>
                                        <Link><button className="btn w-full bg-primary hover:bg-[#b58998] text-white mt-2">Report Lessons</button></Link>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                    {/*  Creator Section */}
                    <div>
                        <div className=' pt-7 pb-2 font-extrabold border-b border-b-gray-100'>
                            <h1 className='flex items-center gap-2'><ImManWoman /> Author</h1>
                        </div>
                        <div className='max-w-2xl mx-auto bg-white'>
                            <div className='bg-white shadow-lg rounded-2xl p-6 mt-8'>
                                <div className='flex flex-col-reverse sm:flex-row  justify-center gap-10 items-center'>
                                    <div className=' '>
                                        <h1 className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-xl font-medium w-fit">Creator Name: <span className='font-bold'>{users?.displayName}</span></h1>
                                        <h1 className="my-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-xl font-medium w-fit">Total Lessons Created: </h1>
                                    </div>
                                    <div>
                                        <img src={users?.photoURL} alt="" className='rounded-xl' />
                                    </div>
                                </div>
                                <div>
                                    <Link><button className="btn w-full bg-primary hover:bg-[#b58998] text-white mt-2">View all lessons by author</button></Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;