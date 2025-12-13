import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router';
import { GiLifeBar } from "react-icons/gi";
import { ImManWoman } from "react-icons/im";
import useAuth from '../../Hooks/useAuth';
import { CiHeart } from "react-icons/ci";
import { LiaHeartSolid } from "react-icons/lia";
import { IoIosHeart } from "react-icons/io";
import Swal from 'sweetalert2';
import ReportLessonModal from './ReportLessonModal';
import { useForm } from 'react-hook-form';
import RelatedCard from './RelatedCard';

const DetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [showReportModal, setShowReportModal] = useState(false);
    const { handleSubmit, register, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {

        if (!user?.email) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'Please login to report this lesson',
            });
            return;
        }

        const commentData = {
            action: "comment",
            photoURL: user?.photoURL,
            userEmail: user?.email,
            comment: data?.Comment
        };


        axiosSecure.patch(`/life_lessons/${id}`, commentData)
            .then(res => {
                console.log('After comment submit', res.data);
                reset();

                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Comment Submitted",
                        timer: 1500
                    });
                }
            })
            .catch(err => {
                console.error("Comment submit error:", err);
            });
    };


    const { data: singleLesson, isLoading, refetch } = useQuery({
        queryKey: ['life_lessons', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/life_lessons/id/${id}`);
            return res.data;
        }
    });

   

    const { data: userData } = useQuery({
        queryKey: ['lessonCount', singleLesson?.email],
        enabled: !!singleLesson?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/life_lessons/count/${singleLesson?.email}`);
            return res.data;
        }
    });



    const { data: users } = useQuery({
        queryKey: ["users", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
    });


    // Check if current user has liked this lesson
    const hasUserLiked = singleLesson?.likeUsers?.includes(user?.email) || false;

    // Handle Like/Unlike
    const handleLike = async () => {
        if (!user?.email) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'Please login to like this lesson',
            });
            return;
        }

        try {
            const res = await axiosSecure.patch(`/life_lessons/${singleLesson._id}`, {
                action: 'like',
                userEmail: user.email
            });

            if (res.data.modifiedCount) {
                refetch();
                const message = hasUserLiked ? "Unliked!" : "Liked!";
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            });
        }
    };

    // Handle Favorite Toggle
    const handleFavorite = async () => {
        try {
            const res = await axiosSecure.patch(`/life_lessons/${singleLesson._id}`, {
                action: 'favorite',
                userEmail: user.email
            });

            if (res.data.modifiedCount || res.data.status) {
                refetch();

                const alreadyFav = singleLesson.favoriteUsers?.some(u => u.email === user.email);
                const message = alreadyFav ? "Removed from Favorites!" : "Added to Favorites!";

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: message,
                    showConfirmButton: false,
                    timer: 1500
                });
            }

        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            });
        }
    };




    if (isLoading) {
        return (
            <p className="text-primary flex justify-center items-center mt-5">
                Loading...
            </p>
        );
    }
    

    if (!singleLesson) {
        return <div className="text-center mt-10">Lesson not found</div>;
    }

    return (
        <div className='bg-gray-50 min-h-screen py-5'>
            <div className='max-w-11/12 mx-auto bg-white rounded-xl py-10'>
                <div className='max-w-11/12 mx-auto'>
                    {/* Lesson Information */}
                    <div>
                        <div className='pb-2 font-extrabold border-b border-b-gray-100'>
                            <h1 className='flex items-center gap-2'><GiLifeBar /> Lesson Information</h1>
                        </div>
                        <div className='max-w-11/12 mx-auto bg-white shadow-lg rounded-2xl p-6 mt-8'>
                            <div className="flex flex-col sm:flex-row sm:justify-evenly justify-center gap-6 items-center">
                                {/* Featured Image */}
                                {singleLesson.image && (
                                    <div className="sm:w-1/2 flex justify-center mb-4 sm:mb-0 sm:border-r">
                                        <img
                                            src={singleLesson.image}
                                            alt={singleLesson.title}
                                            className="rounded-lg object-cover shadow-sm"
                                        />
                                    </div>
                                )}

                                {/* Lesson Content */}
                                <div className="sm:w-1/2 flex flex-col gap-4">
                                    <h1 className="text-3xl font-extrabold mb-2">
                                        {singleLesson.title}
                                    </h1>

                                    <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                                        <h2 className="text-xl font-semibold mb-2 text-primary">Description</h2>
                                        <p className="text-gray-700 leading-relaxed">{singleLesson.description}</p>
                                    </div>

                                    <div className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium w-fit">
                                        Category: {singleLesson.category}
                                    </div>

                                    <div className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium w-fit">
                                        Emotional Tone: {singleLesson.emotionalTone}
                                    </div>

                                    <div className='flex justify-between gap-2 items-center'>
                                        <span className="text-gray-500 bg-gray-100 px-2 rounded-2xl text-sm">
                                            Created Date: {new Date(singleLesson?.createAt).toLocaleDateString()}
                                        </span>
                                        <span className="text-gray-500 bg-green-200 px-2 rounded-2xl text-sm">
                                            Last Updated: {singleLesson.lastUpdated ? new Date(singleLesson.lastUpdated).toLocaleDateString() : "N/A"}
                                        </span>
                                    </div>

                                    <div className="text-gray-500 text-center font-bold bg-pink-200 px-2 rounded-2xl text-sm">
                                        Visibility: {singleLesson.privacy}
                                    </div>
                                </div>
                            </div>

                            <div className='max-w-lg mx-auto my-5 shadow-lg rounded-sm p-5'>
                                <div>
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                        {/* Like Section */}
                                        <div className='flex items-center gap-2'>
                                            <h1 className='flex items-center font-bold gap-2'>
                                                <IoIosHeart className='text-red-500' />Like:
                                            </h1>
                                            <div className='flex items-center gap-2'>
                                                <button
                                                    onClick={handleLike}
                                                    className={`btn btn-sm ${hasUserLiked ? 'bg-red-500 text-white' : ''}`}
                                                >
                                                    {hasUserLiked ? <LiaHeartSolid /> : <CiHeart />}
                                                </button>
                                                <span className='font-bold'>{singleLesson.like || 0}</span>
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {singleLesson.likeUsers?.length || 0} people liked this
                                            </div>
                                        </div>

                                        {/* Favorite Section */}
                                        <div className='flex items-center gap-2'>
                                            <h1 className='flex items-center font-bold gap-2'>
                                                <span className='inline-block'>🔖 Favorites</span>:
                                            </h1>
                                            <div>
                                                {singleLesson.favoriteUsers?.some(u => u.email === user?.email) ? (
                                                    <button
                                                        onClick={handleFavorite}
                                                        className='text-white border-none btn btn-sm bg-red-500'
                                                    >
                                                        Unsave
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={handleFavorite}
                                                        className='btn bg-green-100 text-black border-none btn-sm'
                                                    >
                                                        Save
                                                    </button>
                                                )}
                                            </div>

                                        </div>

                                    </div>

                                    <div>

                                        <button onClick={() => setShowReportModal(true)} className="btn w-full bg-primary hover:bg-[#b58998] text-white mt-2">
                                            Report Lessons
                                        </button>


                                        {/* Report Modal */}
                                        <ReportLessonModal
                                            lesson={singleLesson}
                                            isOpen={showReportModal}
                                            onClose={() => setShowReportModal(false)}
                                            refetch={refetch}
                                        />


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* comment section */}
                    <div className='max-w-2xl mx-auto bg-white  shadow-lg rounded-2xl p-6 mt-8'>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Comment
                            </label>
                            <form onSubmit={handleSubmit(onSubmit)} >
                                <textarea
                                    {...register("Comment")}
                                    rows={4}
                                    placeholder="Please provide any additional information that might help us understand your comment..."
                                    className="textarea textarea-bordered w-full bg-gray-50 resize-none"
                                    maxLength={500}
                                />
                                <button className="btn w-full bg-primary hover:bg-[#b58998] text-white mt-2">
                                    Submit
                                </button>
                            </form>
                            <p className="text-xs text-gray-500 mt-1">
                                Maximum 500 characters
                            </p>
                        </div>
                    </div>
                    
                    



                    {/* Creator Section */}
                    {users && (
                        <div>
                            <div className='pt-7 pb-2 font-extrabold border-b border-b-gray-100'>
                                <h1 className='flex items-center gap-2'><ImManWoman /> Author</h1>
                            </div>
                            <div className='max-w-2xl mx-auto bg-white'>
                                <div className='bg-white shadow-lg rounded-2xl p-6 mt-8'>
                                    <div className='flex flex-col-reverse sm:flex-row justify-center gap-10 items-center'>
                                        <div>
                                            <h1 className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-xl font-medium w-fit">
                                                Creator Name: <span className='font-bold'>{singleLesson?.name}</span>
                                            </h1>
                                            <h1 className="my-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-xl font-medium w-fit">
                                                Total Lessons Created: {userData?.count || 0}
                                            </h1>
                                        </div>
                                        <div>
                                            <img
                                                src={singleLesson?.photoURL}
                                                alt={singleLesson?.name}
                                                className='w-24 h-24 rounded-xl object-cover'
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Link to={`/author/${singleLesson?.email}`}>
                                            <button className="btn w-full bg-primary hover:bg-[#b58998] text-white mt-2">
                                                View all lessons by author
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                   {/*  Similar and Recommended Lessons */}
                   <RelatedCard></RelatedCard>


                    {/* Comment section */}
                    <div className=' my-10'>
                        <div>
                            <h1 className='flex justify-center font-bold text-2xl bg-amber-50 rounded-2xl text-amber-300'>Lessons Comment</h1>
                        </div>
                        <div>
                            {
                                singleLesson.comments?.map((comment, index) =>
                                    <div key={index} >
                                        <div className='bg-white max-w-sm mx-auto rounded-xl shadow-2xl  p-5 my-5'>

                                            <div className='flex items-center justify-between gap-5'>
                                                <img src={comment?.photoURL} alt="" className='w-12 h-12 rounded-full' />
                                                <span className='bg-blue-50 p-2 rounded-2xl my-2 text-blue-600 text-sm'>{comment?.userEmail
                                                }</span>
                                            </div>
                                            <div>
                                                <p className='font-bold text-sm my-2 '>{comment.
                                                    comment}</p>
                                                <span className='bg-gray-50 p-1 rounded-full text-gray-500 text-sm my-2 '>{new Date(comment?.time).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>)
                            }
                        </div>

                    </div>
                </div>
            </div >
        </div >
    );
};

export default DetailsPage;