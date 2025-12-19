import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import { FcViewDetails } from 'react-icons/fc';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
 
} from 'recharts';

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

    // Generate weekly contribution data
    const weeklyContributions = useMemo(() => {
        const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        const lessonsPerWeek = [0, 0, 0, 0];
        const favoritesPerWeek = [0, 0, 0, 0];
        
        userLessons.forEach(lesson => {
            const createdDate = new Date(lesson.createAt);
            const weekOfMonth = Math.floor((createdDate.getDate() - 1) / 7);
            if (weekOfMonth >= 0 && weekOfMonth < 4) {
                lessonsPerWeek[weekOfMonth]++;
            }
        });

        favorites.forEach(favorite => {
            const createdDate = new Date(favorite.createAt);
            const weekOfMonth = Math.floor((createdDate.getDate() - 1) / 7);
            if (weekOfMonth >= 0 && weekOfMonth < 4) {
                favoritesPerWeek[weekOfMonth]++;
            }
        });

        return weeks.map((week, index) => ({
            name: week,
            lessons: lessonsPerWeek[index],
            favorites: favoritesPerWeek[index],
            total: lessonsPerWeek[index] + favoritesPerWeek[index]
        }));
    }, [userLessons, favorites]);

    // Generate monthly contribution data
    const monthlyContributions = useMemo(() => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentYear = new Date().getFullYear();
        const lessonsPerMonth = new Array(12).fill(0);
        const favoritesPerMonth = new Array(12).fill(0);

        userLessons.forEach(lesson => {
            const createdDate = new Date(lesson.createAt);
            if (createdDate.getFullYear() === currentYear) {
                const month = createdDate.getMonth();
                lessonsPerMonth[month]++;
            }
        });

        favorites.forEach(favorite => {
            const createdDate = new Date(favorite.createAt);
            if (createdDate.getFullYear() === currentYear) {
                const month = createdDate.getMonth();
                favoritesPerMonth[month]++;
            }
        });

        return months.map((month, index) => ({
            name: month,
            lessons: lessonsPerMonth[index],
            favorites: favoritesPerMonth[index],
            total: lessonsPerMonth[index] + favoritesPerMonth[index]
        }));
    }, [userLessons, favorites]);

  
    

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
        .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
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

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Contributions */}
                <div className="bg-white shadow rounded-xl p-5">
                    <h3 className="font-semibold mb-4">Weekly Contributions</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyContributions}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="lessons" fill="#8884d8" name="Lessons Added" />
                                <Bar dataKey="favorites" fill="#82ca9d" name="Favorites Added" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Monthly Trend */}
                <div className="bg-white shadow rounded-xl p-5">
                    <h3 className="font-semibold mb-4">Monthly Trend ({new Date().getFullYear()})</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyContributions}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line 
                                    type="monotone" 
                                    dataKey="lessons" 
                                    stroke="#8884d8" 
                                    strokeWidth={2}
                                    name="Lessons"
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="favorites" 
                                    stroke="#82ca9d" 
                                    strokeWidth={2}
                                    name="Favorites"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
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
                                                {lesson.category} • {lesson.emotionalTone} • 
                                                {new Date(lesson.createAt).toLocaleDateString()}
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
        </div>
    );
};

export default DashboardHome;