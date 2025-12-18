import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { MdDeleteForever } from "react-icons/md";

const ReportedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Fetch all lessons
  const { data: allLessons = [], isLoading, refetch } = useQuery({
    queryKey: ["allLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/life_lessons");
      return res.data;
    },
  });

  // Fetch all reports
  const { data: reportLessons = [] } = useQuery({
    queryKey: ["reportLessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/report_lessons");
      return res.data;
    },
  });

  // Filter only reported lessons
  const reportedLessons = useMemo(() => {
    return allLessons.filter(lesson =>
      reportLessons.some(r => r.lessonId === lesson._id)
    );
  }, [allLessons, reportLessons]);

  // Delete lesson
  const handleDelete = (lesson) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This lesson will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/life_lessons/${lesson._id}`);
        refetch();
        Swal.fire("Deleted!", "Lesson has been removed.", "success");
      }
    });
  };

  if (isLoading) {
    return (
      <p className="text-primary flex justify-center items-center mt-5">
        Loading...
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Reported Lessons</h2>

      <div className="overflow-x-auto bg-white shadow rounded-xl p-5">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Report Count</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reportedLessons.map((lesson, idx) => {
              const reports = reportLessons.filter(r => r.lessonId === lesson._id);
              return (
                <tr key={lesson._id}>
                  <th>{idx + 1}</th>
                  <td>{lesson.title}</td>
                  <td className="text-center">{reports.length}</td>
                  <td className="flex gap-2 justify-center">
                    <button
                      className="btn btn-sm bg-blue-100 text-blue-600"
                      onClick={() => setSelectedLesson(lesson)}
                    >
                      View Reports
                    </button>

                    <button
                      className="btn btn-sm bg-red-100 text-red-600"
                      onClick={() => handleDelete(lesson)}
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal for report reasons */}
      {selectedLesson && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-5 rounded-xl w-96 ">
            <h3 className="text-xl font-semibold mb-3 text-yellow-500">Reports for: {selectedLesson.title}</h3>
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {reportLessons
                .filter(r => r.lessonId === selectedLesson._id)
                .map((r, i) => (
                  <li key={i} className="border bg-red-500 p-2 rounded">
                    <p><strong>Reporter:</strong> {r.reportedUserEmail}</p>
                    <p><strong>Reason:</strong> {r.reason}</p>
                  </li>
                ))}
            </ul>
            <div className="flex justify-end gap-2 mt-3">
              <button
                className="btn btn-sm bg-primary/70 border-none text-white"
                onClick={() => setSelectedLesson(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportedLessons;
