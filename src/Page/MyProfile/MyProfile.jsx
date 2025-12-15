import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';

const MyProfile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: userData, isLoading } = useQuery({
        queryKey: ['user-data', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    })
    if (isLoading) {
        return (
            <p className="text-primary flex justify-center items-center mt-5">
                Loading...
            </p>

        );
    }
    console.log(userData);
    return (
        <div>

        </div>
    );
};

export default MyProfile;