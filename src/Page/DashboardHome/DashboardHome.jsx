import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import { FcViewDetails } from 'react-icons/fc';


const DashboardHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: userLessons = [], isLoading } = useQuery({
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

    const { data: userData = {} } = useQuery({
        queryKey: ["user", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });
    
    const totalFavorites = useMemo(() => {
        return userLessons.reduce((total, lesson) => {
            if (lesson.favoriteUsers && Array.isArray(lesson.favoriteUsers)) {
                return total + lesson.favoriteUsers.length;
            } else if (typeof lesson.favorites === 'number') {
                return total + lesson.favorites;
            }
            return total;
        }, 0);
    }, [userLessons]);



    const recentLessons = [...userLessons]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 2);

    if (isLoading) {
        return (
            <p className="text-primary flex justify-center items-center mt-5">
                Loading...
            </p>

        );
    }



    return (
        <div className="p-6 space-y-6">
            {/* Welcome */}
            <h2 className="text-2xl font-bold">
                Welcome back, <span className="text-primary">{userData?.displayName}</span> 👋
            </h2>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <div className="bg-white shadow rounded-xl p-5">
                    <h4 className="text-gray-500">Total Lessons</h4>
                    <p className="text-3xl font-bold text-primary">
                        {userLessons.length}
                    </p>
                </div>


                <div className="bg-white shadow rounded-xl p-5">
                    <h4 className="text-gray-500">Total Favorites</h4>
                    <p className="text-3xl font-bold text-yellow-500">
                        {totalFavorites}
                    </p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white shadow rounded-xl p-5">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                    <Link to="/dashboard/add-lessons" className="btn btn-primary">
                        ➕ Add Lesson
                    </Link>
                    <Link to="/dashboard/my-lessons" className="btn btn-outline">
                        📘 My Lessons
                    </Link>
                    <Link to="/dashboard/my-favorites" className="btn btn-outline">
                        ⭐ Favorites
                    </Link>
                </div>
            </div>

            {/* Recent Lessons */}
            <div className="bg-white shadow rounded-xl p-5">
                <h3 className="font-semibold mb-4">Recently Added Lessons</h3>
                {recentLessons.length === 0 ? (
                    <p className="text-gray-500">No lessons added yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {recentLessons.map(lesson => {

                            const lessonLikes = lesson.likeUsers?.length || lesson.likes || 0;
                            const lessonComments = lesson.comments?.length || 0;
                            const lessonFavorites = lesson.favoriteUsers?.length || lesson.favorites || 0;

                            return (
                                <li
                                    key={lesson._id}
                                    className="border p-4 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-lg">{lesson.title}</h4>
                                            <p className="text-sm text-gray-600 mb-2">
                                                {lesson.category} • {lesson.emotionalTone}
                                            </p>
                                            <div className="flex gap-4 text-sm">
                                                <span className="flex items-center gap-1">
                                                    ❤️ {lessonLikes} likes
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    💬 {lessonComments} comments
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    ⭐ {lessonFavorites} favorites
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/details-lesson/${lesson._id}`)}
                                            className="btn btn-sm bg-green-100 text-green-700 hover:bg-green-200 ml-4"
                                            title="View Details"
                                        >
                                            <FcViewDetails size={20} />
                                            <span className="ml-2">Details</span>
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            {/* Analytics Chart */}

        </div>
    );
};

export default DashboardHome;