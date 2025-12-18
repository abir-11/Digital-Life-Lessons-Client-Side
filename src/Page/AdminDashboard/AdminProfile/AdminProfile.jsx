import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const AdminProfile = () => {
    const { user } = useAuth(); 
    
    const axiosSecure = useAxiosSecure();
    const navigate=useNavigate();

    // Fetch admin user details
    const { data: adminData, isLoading } = useQuery({
        queryKey: ['adminUser', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email, 
    });

    if (isLoading) {
        return (
            <p className="text-primary flex justify-center items-center mt-5">
                Loading...
            </p>
        );
    }

    return (
        <div className="max-w-md mx-auto flex items-center justify-between bg-white shadow-lg rounded-xl p-6 mt-10">
            <div className="flex flex-col items-center">
                {/* Profile Photo */}
                <img
                    src={adminData?.photoURL || "https://via.placeholder.com/150"}
                    alt={adminData?.name || "Admin"}
                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                />

                {/* Role Badge */}
                <span className="mt-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
                    {adminData?.role.toUpperCase() || "Admin"}
                </span>

                {/* Name */}
                <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                    {adminData?.displayName || "Admin Name"}
                </h2>

                {/* Email */}
                <p className="mt-2 bg-yellow-200 px-2 rounded-2xl text-gray-600">{adminData?.email || "admin@example.com"}</p>

            </div>

            <div>
                <button
                    onClick={() => navigate('/dashboard/admin/profile-edit')}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                    <FaEdit className="mr-2" />
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default AdminProfile;
