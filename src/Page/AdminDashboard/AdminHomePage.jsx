import React, { useMemo } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const AdminHomePage = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch Users
    const { data: users = [], isLoading: usersLoading } = useQuery({
        queryKey: ["Users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    // Fetch Lessons
    const { data: lessonsData = {} } = useQuery({
        queryKey: ["life-lessons"],
        queryFn: async () => {
            const res = await axiosSecure.get("/life_lessons");
            return res.data;
        },
    });

    // Extract lessons array safely
    const lessons = Array.isArray(lessonsData.lessons) ? lessonsData.lessons : [];

    // Fetch Reported Lessons
    const { data: reportLessons = [] } = useQuery({
        queryKey: ["report_lessons"],
        queryFn: async () => {
            const res = await axiosSecure.get("/report_lessons");
            return res.data;
        },
    });

    const today = new Date().toISOString().split('T')[0];

    const totalUsers = users.length;
    const totalLessons = lessons.length;
    const totalReported = reportLessons.length;

    const todaysLessons = lessons.filter(lesson => {
        if (!lesson.createAt) return false;
        const lessonDate = new Date(lesson.createAt);
        const lessonDay = lessonDate.toISOString().split('T')[0];
        return lessonDay === today;
    }).length;

    // Most Active Contributors (top 3 users by number of lessons)
    const activeContributors = useMemo(() => {
        const map = {};
        lessons.forEach(l => {
            const email = l.email || "Unknown";
            if (!map[email]) map[email] = 0;
            map[email]++;
        });
        return Object.entries(map)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([email, count]) => ({ email, count }));
    }, [lessons]);

    // Lesson Growth Data (Monthly)
    const lessonGrowthData = useMemo(() => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentYear = new Date().getFullYear();
        const monthCounts = new Array(12).fill(0);
        const cumulativeCounts = [];

        // Count lessons per month for current year
        lessons.forEach(lesson => {
            if (lesson.createAt) {
                const date = new Date(lesson.createAt);
                if (date.getFullYear() === currentYear) {
                    const month = date.getMonth();
                    monthCounts[month]++;
                }
            }
        });

        // Create cumulative data
        let total = 0;
        return monthNames.map((month, index) => {
            total += monthCounts[index];
            return {
                month,
                count: monthCounts[index],
                cumulative: total
            };
        });
    }, [lessons]);

    // User Growth Data (Monthly)
    const userGrowthData = useMemo(() => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentYear = new Date().getFullYear();
        const monthCounts = new Array(12).fill(0);
        const cumulativeCounts = [];

        // Count users per month for current year
        users.forEach(user => {
            if (user.createAt) {
                const date = new Date(user.createAt);
                if (date.getFullYear() === currentYear) {
                    const month = date.getMonth();
                    monthCounts[month]++;
                }
            }
        });

        // Create cumulative data
        let total = 0;
        return monthNames.map((month, index) => {
            total += monthCounts[index];
            return {
                month,
                count: monthCounts[index],
                cumulative: total
            };
        });
    }, [users]);


   
   

    if (usersLoading) {
        return (
            <p className="text-primary flex justify-center items-center mt-5">
                Loading...
            </p>
        );
    }

    return (
        <div className="max-w-11/12 mx-auto space-y-10 mb-10 p-4">
            <h2 className="text-2xl font-bold">Admin Dashboard Overview</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                <div className="bg-white shadow rounded-xl p-5">
                    <h4 className="text-gray-500">Total Users</h4>
                    <p className="text-3xl font-bold text-primary">{totalUsers}</p>
                </div>
                <div className="bg-white shadow rounded-xl p-5">
                    <h4 className="text-gray-500">Total Lessons</h4>
                    <p className="text-3xl font-bold text-green-500">{totalLessons}</p>
                </div>
                <div className="bg-white shadow rounded-xl p-5">
                    <h4 className="text-gray-500">Reported Lessons</h4>
                    <p className="text-3xl font-bold text-red-500">{totalReported}</p>
                </div>
                <div className="bg-white shadow rounded-xl p-5">
                    <h4 className="text-gray-500">Today's New Lessons</h4>
                    <p className="text-3xl font-bold text-yellow-500">{todaysLessons}</p>
                </div>
            </div>

            {/* Most Active Contributors */}
            <div className="bg-white shadow rounded-xl p-5">
                <h3 className="font-semibold mb-4">Top Contributors</h3>
                {activeContributors.length === 0 ? (
                    <p className="text-gray-500">No contributors yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {activeContributors.map((user, idx) => (
                            <li key={idx} className="flex justify-between items-center flex-col-reverse sm:flex-row border p-2 rounded-lg">
                                <span>{user.email}</span>
                                <span className="font-semibold">{user.count} lessons</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Growth Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Lesson Growth Chart */}
                <div className="bg-white shadow rounded-xl p-5">
                    <h3 className="font-semibold mb-4">Lesson Growth (Monthly)</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={lessonGrowthData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                    fillOpacity={0.3}
                                    name="New Lessons"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="cumulative"
                                    stroke="#82ca9d"
                                    strokeWidth={2}
                                    name="Total Lessons"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* User Growth Chart */}
                <div className="bg-white shadow rounded-xl p-5">
                    <h3 className="font-semibold mb-4">User Growth (Monthly)</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={userGrowthData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#ff7300"
                                    fill="#ff7300"
                                    fillOpacity={0.3}
                                    name="New Users"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="cumulative"
                                    stroke="#387908"
                                    strokeWidth={2}
                                    name="Total Users"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

               

                
            </div>





        </div>
    );
};

export default AdminHomePage;