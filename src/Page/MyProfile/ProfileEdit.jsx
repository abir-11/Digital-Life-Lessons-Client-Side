import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { FaUserAlt } from 'react-icons/fa';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';

const ProfileEdit = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate=useNavigate();
    const location=useLocation();
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState("");

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { data: userData = {}, isLoading, refetch } = useQuery({
        queryKey: ["user", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (userData?.email) {
            reset({
                displayName: userData.displayName || "",
                email: userData.email || ""
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

            // Upload photo only if a new file is selected
            if (photoFile) {
                const formData = new FormData();
                formData.append('image', photoFile);
                const image_API_USER_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key_user}`;
                const uploadRes = await axios.post(image_API_USER_URL, formData);
                updatedData.photoURL = uploadRes.data.data.url;
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
        <div className='max-w-11/12 mx-auto my-10 rounded-lg shadow-lg p-10'>
            <h1 className='my-5 flex justify-center font-bold text-3xl sm:text-4xl lg:text-5xl text-primary'>Edit Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* File Input */}
                <div className='relative mb-5'>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input input input-bordered w-full pl-12 bg-gray-100"
                    />
                    <FaUserAlt className="absolute left-4 top-3 text-gray-500 text-xl" />
                    {photoPreview && (
                        <img src={photoPreview} alt="preview" className="w-24 h-24 rounded-full mt-2" />
                    )}
                </div>

                {/* Name Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        {...register("displayName", { required: "Name is required" })}
                        defaultValue={userData?.displayName || ""}
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
                        value={userData?.email || ""}
                        className="w-full border border-gray-300 px-4 py-2 rounded-md bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                        Save Changes
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            reset({
                                displayName: userData?.displayName || "",
                                email: userData?.email || ""
                            });
                            setPhotoPreview(userData?.photoURL || "");
                            setPhotoFile(null);
                        }}
                        className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileEdit;
