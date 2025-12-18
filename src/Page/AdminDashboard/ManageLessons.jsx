import React, { useMemo, useState } from "react"; 
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { MdDeleteForever, MdVerified } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const ManageLessons = () => {
    const axiosSecure = useAxiosSecure();

    const { data: lessons = [], isLoading, refetch } = useQuery({
        queryKey: ["all-lessons"],
        queryFn: async () => {
            const res = await axiosSecure.get("/life_lessons");
            return res.data;
        }
    });

    


    //  Filter states
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [visibilityFilter, setVisibilityFilter] = useState("all");
    const [reportedFilter, setReportedFilter] = useState("all");

    //  Stats
    const stats = useMemo(() => ({
        publicLessons: lessons.filter(l => l.privacy === "public").length,
        privateLessons: lessons.filter(l => l.privacy === "private").length,
        reportedLessons: lessons.filter(l => l.reported===true).length
    }), [lessons]);

    //  Filtered lessons
    const filteredLessons = useMemo(() => {
        return lessons.filter(l => {
            let passCategory = categoryFilter === "all" || l.category === categoryFilter;
            let passVisibility = visibilityFilter === "all" || l.privacy === visibilityFilter;
            let passReported = reportedFilter === "all" || l.reported===true;
               
                
            return passCategory && passVisibility && passReported;
        });
    }, [lessons, categoryFilter, visibilityFilter, reportedFilter]);

    const handleDelete = (lesson) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This lesson will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/life_lessons/${lesson._id}`);
                refetch();
                Swal.fire("Deleted!", "Lesson has been removed.", "success");
            }
        });
    };

    const handleFeatured = async (lesson) => {
        await axiosSecure.patch(`/life_lessons/${lesson._id}`, {
            action: "featured",
            featured: !lesson.featured
        });
        refetch();
    };

    const handleReviewed = async (lesson) => {
        await axiosSecure.patch(`/life_lessons/${lesson._id}`, {
            action: "reviewed"
        });
        refetch();
    };

    if (isLoading) {
        return <p className="text-center text-primary">Loading lessons...</p>;
    }

    return (
        <div className="space-y-6">

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-white shadow rounded-xl p-5">
                    <h4 className="text-gray-500">Public Lessons</h4>
                    <p className="text-3xl font-bold text-green-600">{stats.publicLessons}</p>
                </div>
                <div className="bg-white shadow rounded-xl p-5">
                    <h4 className="text-gray-500">Private Lessons</h4>
                    <p className="text-3xl font-bold text-blue-600">{stats.privateLessons}</p>
                </div>
                <div className="bg-white shadow rounded-xl p-5">
                    <h4 className="text-gray-500">Reported Lessons</h4>
                    <p className="text-3xl font-bold text-red-600">{stats.reportedLessons}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-4">
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="select  bg-primary/60 select-bordered"
                >
                    <option className="text-white bg-primary" value="all">All Categories</option>
                    {/* Dynamically list categories */}
                    {[...new Set(lessons.map(l => l.category))].map(cat => (
                        <option className="text-white bg-primary mt-2" key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <select
                    value={visibilityFilter}
                    onChange={(e) => setVisibilityFilter(e.target.value)}
                    className="select select-bordered  bg-primary/60"
                >
                    <option className="text-white bg-primary" value="all">All Visibility</option>
                    <option className="text-white bg-primary my-2" value="public">Public</option>
                    <option className="text-white bg-primary" value="private">Private</option>
                </select>

                <select
                    value={reportedFilter}
                    onChange={(e) => setReportedFilter(e.target.value)}
                    className="select select-bordered  bg-primary/60"
                >
                    <option className="text-white bg-primary" value="all">All Lessons</option>
                    <option className="text-white bg-primary mt-2" value="reported">Reported</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white shadow rounded-xl p-5">
                <h3 className="font-semibold mb-4">All Lessons</h3>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th className="h-16">#</th>
                                <th className="h-16">Title</th>
                                <th className="text-center h-16">Author</th>
                                <th className="h-16">Category</th>
                                <th className="h-16">Visibility</th>
                                <th className="h-16 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLessons.map((lesson, idx) => (
                                <tr key={lesson._id}>
                                    <td className="align-middle">{idx + 1}</td>
                                    <td className="font-medium align-middle">{lesson.title}</td>
                                    <td className="text-center align-middle">{lesson.email}</td>
                                    <td className="align-middle">{lesson.category}</td>
                                    <td className="align-middle">
                                        <span className={`badge ${lesson.privacy === "public" ? "badge-success" : "badge-info"}`}>
                                            {lesson.privacy}
                                        </span>
                                    </td>
                                    <td className="align-middle">
                                        <div className="flex gap-2 justify-center">
                                            {!lesson.reviewed && (
                                                <button onClick={() => handleReviewed(lesson)} className="btn btn-sm bg-green-100 text-green-600">
                                                    <MdVerified />
                                                </button>
                                            )}
                                            <button onClick={() => handleFeatured(lesson)} className={`btn btn-sm ${lesson.featured ? "bg-yellow-200 text-yellow-700" : "bg-gray-100 text-gray-600"}`}>
                                                <FaStar />
                                            </button>
                                            <button onClick={() => handleDelete(lesson)} className="btn btn-sm bg-red-100 text-red-600">
                                                <MdDeleteForever />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageLessons;
