import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { Lock } from "lucide-react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const PublicLessons = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterEmotionalTone, setFilterEmotionalTone] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [page, setPage] = useState(1); // current page
  const limit = 10;

  const axiosSecure = useAxiosSecure();

  // Fetch lessons with pagination
  const { data: lessonData = { lessons: [], total: 0 }, isLoading } = useQuery({
    queryKey: ["life-lessons", searchText, sortOption, page],
    queryFn: async () => {
      const skip = (page - 1) * limit;
      const res = await axiosSecure.get(
        `/life_lessons?searchText=${searchText}&sort=${sortOption}&limit=${limit}&skip=${skip}`
      );
      return {
        lessons: Array.isArray(res.data?.lessons) ? res.data.lessons : [],
        total: res.data?.total || 0,
      };
    },
    keepPreviousData: true, // Keep previous data while loading next page
  });

  const userPost = lessonData.lessons;

  // Fetch user data
  const { data: users } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data || {};
    },
  });

  const categories = ["all", ...new Set(Array.isArray(userPost) ? userPost.map((item) => item.category) : [])];
  const emotionalTones = ["all", ...new Set(Array.isArray(userPost) ? userPost.map((item) => item.emotionalTone) : [])];

  const filteredLessons = (Array.isArray(userPost) ? userPost : []).filter((lesson) => {
    const categoryMatch = filterCategory === "all" || lesson.category === filterCategory;
    const toneMatch = filterEmotionalTone === "all" || lesson.emotionalTone === filterEmotionalTone;
    const isPublic = lesson.privacy !== "private";
    return categoryMatch && toneMatch && isPublic;
  });

  const totalPages = Math.ceil(lessonData.total / limit);

  return (
    <div className="max-w-11/12 mx-auto min-h-screen my-10 rounded-2xl shadow-2xl">
      <div className="max-w-11/12 mx-auto py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Public Life Lessons</h2>

        {/* Top Bar: Total + Search + Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center my-5 gap-4">
          <div className="flex gap-1 items-center text-xl">
            <span className="font-bold">Total public lessons this page:</span>{" "}
            <span>({Array.isArray(userPost) ? userPost.length : 0})</span>          </div>

          <div className="flex gap-3">
            {/* Search */}
            <label className="input flex items-center border border-gray-300 rounded-md px-2">
              <svg className="h-[1em] opacity-50 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                onChange={(e) => setSearchText(e.target.value)}
                type="search"
                className="grow py-1"
                placeholder="Search"
              />
            </label>

            {/* Sort */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="newest">Sort by Newest</option>
              <option value="favorites">Sort by Most Saved</option>
            </select>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category === "all" ? "All Categories" : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Emotional Tone Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Emotional Tone</label>
            <select
              value={filterEmotionalTone}
              onChange={(e) => setFilterEmotionalTone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {emotionalTones.map((tone, index) => (
                <option key={index} value={tone}>
                  {tone === "all" ? "All Tones" : tone.charAt(0).toUpperCase() + tone.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clear Filters */}
        {(filterCategory !== "all" || filterEmotionalTone !== "all") && (
          <button
            onClick={() => {
              setFilterCategory("all");
              setFilterEmotionalTone("all");
            }}
            className="mb-6 px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Clear all filters
          </button>
        )}

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => {
            const premium = lesson?.accessLevel === "premium";
            const blocked = premium && users?.isPremium !== true;

            return (
              <div
                key={lesson._id}
                className={`relative bg-white shadow-lg p-5 rounded-xl transition ${blocked ? "opacity-60 blur-[1px]" : ""}`}
              >
                {blocked && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-xl flex flex-col justify-center items-center text-white">
                    <Lock size={32} />
                    <p className="mt-2 font-medium">Premium Lesson – Upgrade to view</p>
                    <button
                      onClick={() => {
                        if (!user?.email) {
                          Swal.fire({
                            icon: "warning",
                            title: "Login Required",
                            text: "Please login to update this lesson",
                          });
                          navigate("/login");
                          return;
                        }
                        navigate("/pricing");
                      }}
                      className="w-full bg-primary text-center my-5 px-5 text-white py-2 rounded-lg hover:bg-primary/80"
                    >
                      Update Lesson
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-3">
                  <img src={lesson?.photoURL} alt="creator" className="w-10 h-10 rounded-full" />
                  <p className="font-semibold">{lesson?.name}</p>
                </div>

                <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
                <p className="text-gray-600 mb-3">{lesson.description?.slice(0, 120)}...</p>

                <div className="flex justify-between text-sm mb-3">
                  <span className="px-2 py-1 bg-gray-100 rounded-md">{lesson.category}</span>
                  <span className="px-2 py-1 bg-gray-100 rounded-md">{lesson.emotionalTone}</span>
                </div>

                <div className="flex justify-between items-center mb-3 text-sm">
                  <span className={`px-2 py-1 rounded-md ${lesson.accessLevel === "premium" ? "bg-yellow-200" : "bg-green-200"}`}>
                    {lesson.accessLevel?.toUpperCase()}
                  </span>
                  <span className="text-gray-500">{new Date(lesson?.createAt).toLocaleDateString()}</span>
                </div>

                {!blocked && (
                  <Link to={`/details-lesson/${lesson._id}`}>
                    <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/80">See Details</button>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page <span className="bg-primary btn border-none text-white">{page}</span> of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicLessons;
