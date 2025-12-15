import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

import {
    FaEdit,
    FaLock,
    FaRegCalendar,
    FaBook,
    FaHeart,
    FaCrown,
    FaUpload
} from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

  

    const { data: userData = {}, isLoading, refetch } = useQuery({
        queryKey: ["user", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    const { data: userLessons = [] } = useQuery({
        queryKey: ["lessons", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/life_lessons/email/${user.email}`);
            return res.data;
        }
    });

    const { data: favorites = [] } = useQuery({
        queryKey: ["favorites", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/favorite/email/${user.email}`);
            return res.data;
        }
    });

    const publicLessons = userLessons.filter(l => l.privacy === "public");

 
    const mostPopularCategory = () => {
        if (!publicLessons.length) return "None";
        const map = {};
        publicLessons.forEach(l => {
            map[l.category] = (map[l.category] || 0) + 1;
        });
        const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
        return sorted.length ? sorted[0][0].charAt(0).toUpperCase() + sorted[0][0].slice(1) : 'None';
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="h-10 w-10 animate-spin rounded-full border-t-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="bg-white shadow-xl rounded-2xl p-6 mb-10">
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                   
                    <div className="relative">
                        <img
                            src={
                        
                                userData?.photoURL ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                  userData?.displayName || "User"
                                )}`
                            }
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                            alt="profile"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    userData?.displayName || "User"
                                )}`;
                            }}
                        />
                        
                    </div>

                    {/* INFO */}
                    <div className="flex-1">
 
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            { userData?.displayName || "User"}
                                            {userData?.isPremium && (
                                                <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
                                                    <FaCrown className="mr-1" />
                                                    Premium ⭐
                                                </span>
                                            )}
                                        </h2>
                                        <p className="text-gray-600 mt-1">{userData?.email}</p>
                                        {userData?.createdAt && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                Member since {new Date(userData.createdAt).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => navigate('/dashboard/profile-edit')}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        <FaEdit className="mr-2" />
                                        Edit Profile
                                    </button>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                                        <div className="flex items-center">
                                            <div className="p-2 bg-blue-100 rounded-lg mr-3">
                                                <FaBook className="text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-blue-600 font-medium">Lessons Created</p>
                                                <p className="text-2xl font-bold text-blue-900">{userLessons.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                                        <div className="flex items-center">
                                            <div className="p-2 bg-green-100 rounded-lg mr-3">
                                                <FaHeart className="text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-green-600 font-medium">Lessons Saved</p>
                                                <p className="text-2xl font-bold text-green-900">{favorites.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                                        <div className="flex items-center">
                                            <div className="p-2 bg-purple-100 rounded-lg mr-3">
                                                <BiSolidLike className="text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-purple-600 font-medium">Total Likes</p>
                                                <p className="text-2xl font-bold text-purple-900">
                                                    {userLessons.reduce((sum, lesson) => sum + (lesson.like || 0), 0)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
                                        <div className="flex items-center">
                                            <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                                                <FaRegCalendar className="text-yellow-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-yellow-600 font-medium">Public Lessons</p>
                                                <p className="text-2xl font-bold text-yellow-900">{publicLessons.length}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                   
                        
                    </div>
                </div>
            </div>

            {/* ================= PUBLIC LESSONS ================= */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">My Public Lessons</h2>

                {publicLessons.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
                            <FaBook className="text-gray-400 text-3xl" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No public lessons yet</h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-6">Start sharing your wisdom with others by creating public lessons.</p>
                        <Link to="/dashboard/add-lessons">
                            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark transition-colors">
                                Create Your First Lesson
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {publicLessons.map(lesson => {
                            const blocked = lesson.accessLevel === "premium" && !userData?.isPremium;

                            return (
                                <div
                                    key={lesson._id}
                                    className={`relative p-5 bg-white shadow-lg rounded-xl ${blocked ? "opacity-60 blur-[1px]" : ""}`}
                                >
                                    {blocked && (
                                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm text-white flex flex-col justify-center items-center rounded-xl p-4">
                                            <FaLock size={32} />
                                            <p className="mt-2 font-medium text-center">Premium Lesson – Upgrade to view</p>
                                            <button
                                                onClick={() => navigate("/pricing")}
                                                className="mt-3 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark"
                                            >
                                                Upgrade Now
                                            </button>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-3 mb-3">
                                        <img
                                            src={lesson?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(lesson?.name || 'User')}&background=random`}
                                            alt="creator"
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <p className="font-semibold">{lesson?.name}</p>
                                    </div>

                                    <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
                                    <p className="text-gray-600 text-sm mb-3">
                                        {lesson.description?.slice(0, 100)}...
                                    </p>

                                    <div className="flex justify-between text-sm mb-3">
                                        <span className="px-2 py-1 bg-gray-100 rounded-md capitalize">
                                            {lesson.category}
                                        </span>
                                        <span className="px-2 py-1 bg-gray-100 rounded-md capitalize">
                                            {lesson.emotionalTone}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center mb-3 text-sm">
                                        <span className={`px-2 py-1 rounded-md ${lesson.accessLevel === "premium" ? "bg-yellow-200" : "bg-green-200"}`}>
                                            {lesson.accessLevel.toUpperCase()}
                                        </span>
                                        <span className="text-gray-500">
                                            {new Date(lesson.createAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {!blocked && (
                                        <Link to={`/details-lesson/${lesson._id}`}>
                                            <button className="mt-3 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark">
                                                See Details
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ================= ADDITIONAL STATS ================= */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">Total Reach</h3>
                    <p className="text-3xl font-bold mb-1">
                        {publicLessons.reduce((sum, lesson) => sum + (lesson.like || 0) + (lesson.totalFavorites || 0), 0)}
                    </p>
                    <p className="text-sm opacity-90">Combined likes and favorites</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">Engagement Rate</h3>
                    <p className="text-3xl font-bold mb-1">
                        {publicLessons.length > 0
                            ? `${((publicLessons.reduce((sum, lesson) => sum + (lesson.comments?.length || 0), 0) / publicLessons.length) * 100).toFixed(1)}%`
                            : '0%'}
                    </p>
                    <p className="text-sm opacity-90">Average comments per lesson</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">Most Popular Category</h3>
                    <p className="text-3xl font-bold mb-1">
                        {mostPopularCategory()}
                    </p>
                    <p className="text-sm opacity-90">Based on your lessons</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;