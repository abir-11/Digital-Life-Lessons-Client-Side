import React, { useMemo } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AdminHomePage = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [] ,isLoading} = useQuery({
        queryKey: ["Users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
    });

    const { data: lessons = [] } = useQuery({
        queryKey: ["life-lessons"],
        queryFn: async () => {
            const res = await axiosSecure.get("/life_lessons");
            return res.data;
        },
    });

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

    const todaysLessons = lessons.filter(lesson =>
        lesson.createdAt?.startsWith(today)
    ).length;

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

    if (isLoading) {
        return (
            <p className="text-primary flex justify-center items-center mt-5">
                Loading...
            </p>

        );
    }
    return (
        <div className="p-6 space-y-6">

            <h2 className="text-2xl font-bold">Admin Dashboard Overview</h2>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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



        </div>
    );
};

export default AdminHomePage;
