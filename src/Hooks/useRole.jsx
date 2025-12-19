import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useRole = () => {
    const {user}=useAuth();
    const axiosSecure=useAxiosSecure();
    const { data: userData = {},isLoading:roleLoading } = useQuery({
        queryKey: ["user", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    });
    return {userData,roleLoading}
};

export default useRole;