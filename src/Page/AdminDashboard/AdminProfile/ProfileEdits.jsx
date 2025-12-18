import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaUserAlt, FaKey } from 'react-icons/fa';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';

const AdminProfileEdit = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();

    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState("");

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Fetch user data
    const { data: userData = {}, isLoading, refetch } = useQuery({
        queryKey: ["user", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    // Initialize form
    useEffect(() => {
        if (userData?.email) {
            reset({
                displayName: userData.displayName || "",
                email: userData.email || "",
                password: ""
            });
            setPhotoPreview(userData.photoURL || "");
        }
    }, [userData, reset]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setPhotoFile(file);
        setPhotoPreview(URL.createObjectURL(file));
    };

    const onSubmit = async (data) => {
        try {
            let updatedData = { displayName: data.displayName };

            // Image upload
            if (photoFile) {
                const formData = new FormData();
                formData.append('image', photoFile);
                const uploadRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key_user}`,
                    formData
                );
                updatedData.photoURL = uploadRes.data.data.url;
            }

            // Password update (optional)
            if (data.password) {
                updatedData.password = data.password;
            }

            const res = await axiosSecure.patch(`/users/${userData.email}`, updatedData);

            if (res.data.modifiedCount) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Profile Updated",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state?.from || -1);
            }

        } catch (err) {
            console.error(err);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Profile update failed',
            });
        }
    };

    if (isLoading) {
        return (
            <p className="text-primary flex justify-center items-center mt-5">
                Loading...
            </p>
        );
    }

    return (
        <div className='max-w-3xl mx-auto my-10 p-8 bg-white rounded-lg shadow-lg'>
            <h1 className='text-3xl font-bold text-center text-primary mb-8'>Edit Profile</h1>

            {/* Role Badge */}
            <div className='flex justify-center mb-6'>
                <span className={`px-4 py-2 rounded-full font-medium text-white ${userData.role === 'admin' ? 'bg-red-500' : 'bg-blue-500'}`}>
                    {userData.role?.toUpperCase() || "USER"}
                </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>

                {/* Photo Input */}
                <div className='flex flex-col items-center'>
                    <div className='relative'>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="file-input input input-bordered w-full pl-12 bg-gray-100"
                        />
                        <FaUserAlt className="absolute left-4 top-3 text-gray-500 text-xl" />
                    </div>
                    {photoPreview && (
                        <img src={photoPreview} alt="preview" className="w-24 h-24 rounded-full mt-3 border border-gray-300" />
                    )}
                </div>

                {/* Name Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        {...register("displayName", { required: "Name is required" })}
                        defaultValue={userData.displayName || ""}
                        className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your Name"
                    />
                    {errors.displayName && (
                        <p className="text-red-500 text-sm mt-1">{errors.displayName.message}</p>
                    )}
                </div>

                {/* Email Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        {...register("email")}
                        disabled
                        value={userData.email || ""}
                        className="w-full border px-4 py-2 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

               

                {/* Buttons */}
                <div className="flex gap-4 justify-end">
                    <button
                        type="submit"
                        className="bg-primary text-white px-5 py-2 rounded-md hover:bg-primary-dark transition-colors"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            reset({
                                displayName: userData?.displayName || "",
                                email: userData?.email || "",
                                password: ""
                            });
                            setPhotoPreview(userData?.photoURL || "");
                            setPhotoFile(null);
                        }}
                        className="border border-gray-300 px-5 py-2 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AdminProfileEdit;
