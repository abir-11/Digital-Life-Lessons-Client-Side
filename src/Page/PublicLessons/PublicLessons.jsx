import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Lock } from "lucide-react";
import useAuth from "../../Hooks/useAuth";




const PublicLessons = () => {

  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data: userPost = [], isLoading } = useQuery({
    queryKey: ["life-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/life_lessons");
      return res.data;
    },
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
  console.log(users);
  //console.log(users.isPremium);




  return (
    <div className="bg-gray-50">
      <div className="max-w-11/12 mx-auto  py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Public Life Lessons</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPost.map((lesson) => {
            const premium = lesson?.accessLevel === "premium";
            const isPrivateLesson = lesson?.privacy === "private";
            const blocked = (premium && users?.isPremium !== true)
            if (isPrivateLesson) {
              return null;
            }
            return (
              <div
                key={lesson._id}
                className={`relative  bg-white shadow-lg p-5 rounded-xl transition ${blocked ? "opacity-60 blur-[1px]" : ""
                  }`}
              >
                {/* Lock Overlay for Premium Blocked */}
                {blocked && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-xl flex flex-col justify-center items-center text-white">
                    <Lock size={32} />
                    <p className="mt-2 font-medium">Premium Lesson – Upgrade to view</p>
                  </div>
                )}

                {/* Creator Info */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={users?.photoURL}
                    alt="creator"
                    className="w-10 h-10 rounded-full"
                  />
                  <p className="font-semibold">{users?.displayName}</p>
                </div>

                {/* Lesson Title */}
                <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>


                <p className="text-gray-600 mb-3">
                  {lesson.description?.slice(0, 120)}...
                </p>

                {/* Category + Tone */}
                <div className="flex justify-between text-sm mb-3">
                  <span className="px-2 py-1 bg-gray-100 rounded-md">
                    {lesson.category}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 rounded-md">
                    {lesson.emotionalTone}
                  </span>
                </div>

                {/* Access Level + Date */}
                <div className="flex justify-between items-center mb-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-md ${lesson.accessLevel === "premium"
                      ? "bg-yellow-200"
                      : "bg-green-200"
                      }`}
                  >
                    {lesson.accessLevel.toUpperCase()}
                  </span>

                  <span className="text-gray-500">
                    {new Date(lesson?.createAt).toLocaleDateString()}
                  </span>
                </div>

                {/* See Details Button */}
                {!blocked && (
                  <Link to={`/details-lesson/${lesson._id}`}>
                    <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/80">
                      See Details
                    </button>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PublicLessons;
