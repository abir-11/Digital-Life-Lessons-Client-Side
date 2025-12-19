import React from 'react';
import { BiSolidMessageSquareAdd } from 'react-icons/bi';
import { FaUserTag } from 'react-icons/fa';
import { Link, Outlet } from 'react-router';
import { NavLink } from 'react-router';
import { MdFavorite, MdManageAccounts, MdReport } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: userData, isLoading } = useQuery({
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
        <div>
            <div className="drawer  min-h-screen  lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content ">
                    {/* Navbar */}
                    <nav className="navbar bg-primary/40 w-full ">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            {/* Sidebar toggle icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>
                        <div className="px-4">Navbar Title</div>
                    </nav>
                    {/* Page content here */}
                    <div className='max-w-11/12 mx-auto '>

                        <Outlet></Outlet>
                    </div>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full pt-2  flex-col items-start bg-primary text-white is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu gap-2 w-full grow">
                            {userData?.role === 'admin' ? (
                                <>
                                    <li className='border-b'>
                                        <NavLink to="/" className={({ isActive }) =>
                                            `font-base px-3 py-1 rounded-xl hover:underline ${isActive ? 'bg-white text-primary' : 'text-white mb-5'
                                            }`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor" className="size-4">
                                                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                                                <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                            </svg>
                                            <span className="is-drawer-close:hidden">Home</span>
                                        </NavLink>
                                    </li>
                                    {/* Admin Dashboard Home */}
                                    <li>
                                        <NavLink to="/dashboard/admin" end className={({ isActive }) =>
                                            `font-base px-3 py-1 rounded-xl hover:underline ${isActive ? 'bg-white text-primary my-1' : 'text-white'
                                            }`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor" className="size-4">
                                                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                                                <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                            </svg>
                                            <span className="is-drawer-close:hidden">Admin Dashboard</span>
                                        </NavLink>
                                    </li>

                                    {/* Manage Users */}
                                    <li>
                                        <NavLink to="/dashboard/admin/manage-users" className={({ isActive }) =>
                                            `font-base px-3 py-1 rounded-xl hover:underline ${isActive ? 'bg-white text-primary my-1' : 'text-white'
                                            }`}>
                                            <MdManageAccounts />
                                            <span className="is-drawer-close:hidden">Manage Users</span>
                                        </NavLink>
                                    </li>

                                    {/* Manage Lessons */}
                                    <li>
                                        <NavLink to="/dashboard/admin/manage-lesson" className={({ isActive }) =>
                                            `font-base px-3 py-1 rounded-xl hover:underline ${isActive ? 'bg-white text-primary my-1' : 'text-white'
                                            }`}>
                                            <FaUserTag />
                                            <span className="is-drawer-close:hidden">Manage Lessons</span>
                                        </NavLink>
                                    </li>

                                    {/* Reported Lessons */}
                                    <li>
                                        <NavLink to="/dashboard/admin/reported-lessons" className={({ isActive }) =>
                                            `font-base px-3 py-1 rounded-xl hover:underline ${isActive ? 'bg-white text-primary my-1' : 'text-white'
                                            }`}>
                                            <MdReport />
                                            <span className="is-drawer-close:hidden">Reported Lessons</span>
                                        </NavLink>
                                    </li>

                                    {/* Admin Profile */}
                                    <li>
                                        <NavLink to="/dashboard/admin/profile" className={({ isActive }) =>
                                            `font-base px-3 py-1 rounded-xl hover:underline ${isActive ? 'bg-white text-primary my-1' : 'text-white'
                                            }`}>
                                            <CgProfile />
                                            <span className="is-drawer-close:hidden">Admin Profile</span>
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    {/* Homepage */}
                                    <li>
                                        <NavLink to="/" className="flex gap-2 items-center border-b mt-5">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor" className="size-4">
                                                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                                                <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                            </svg>
                                            <span className="is-drawer-close:hidden">Home</span>
                                        </NavLink>
                                    </li>

                                    {/* Dashboard Home */}
                                    <li>
                                        <NavLink to="/dashboard/dashboard-Home" className={({ isActive }) =>
                                            `font-base px-3 py-1 rounded-xl hover:underline ${isActive ? 'bg-white text-primary my-1' : 'text-white'
                                            }`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" fill="none" stroke="currentColor" className="size-4">
                                                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                                                <path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                            </svg>
                                            <span className="is-drawer-close:hidden">Dashboard</span>
                                        </NavLink>
                                    </li>

                                    {/* Add Lessons */}
                                    <li>
                                        <NavLink to="/dashboard/add-lessons" className={({ isActive }) =>
                                            `font-base px-3 py-1 rounded-xl hover:underline ${isActive ? 'bg-white text-primary my-1' : 'text-white'
                                            }`}>
                                            <BiSolidMessageSquareAdd />
                                            <span className="is-drawer-close:hidden">Add Lessons</span>
                                        </NavLink>
                                    </li>

                                    {/* My Lessons */}
                                    <li>
                                        <NavLink to="/dashboard/my-lessons" className={({ isActive }) =>
                                            `font-base px-3 py-1 rounded-xl hover:underline ${isActive ? 'bg-white text-primary my-1' : 'text-white'
                                            }`}>
                                            <FaUserTag />
                                            <span className="is-drawer-close:hidden">My Lessons</span>
                                        </NavLink>
                                    </li>

                                    {/* My Favorites */}
                                    <li>
                                        <NavLink to="/dashboard/my-favorites" className={({ isActive }) =>
                                            `font-base px-3 py-1 rounded-xl hover:underline ${isActive ? 'bg-white text-primary my-1' : 'text-white'
                                            }`}>
                                            <MdFavorite />
                                            <span className="is-drawer-close:hidden">My Favorites</span>
                                        </NavLink>
                                    </li>

                                    {/* Profile */}
                                    <li>
                                        <NavLink to="/dashboard/my-profile" className={({ isActive }) =>
                                            `font-base px-3 py-1 rounded-xl hover:underline ${isActive ? 'bg-white text-primary my-1' : 'text-white'
                                            }`}>
                                            <CgProfile />
                                            <span className="is-drawer-close:hidden">My Profile</span>
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;