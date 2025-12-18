import React from 'react';
import { BiSolidMessageSquareAdd } from 'react-icons/bi';
import { FaUserTag } from 'react-icons/fa';
import { Link, Outlet } from 'react-router';
import { NavLink } from 'react-router';
import { MdFavorite } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const Dashboard = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-300">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            {/* Sidebar toggle icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>
                        <div className="px-4">Navbar Title</div>
                    </nav>
                    {/* Page content here */}
                    <div className='max-w-11/12 mx-auto'>
                        
                        <Outlet></Outlet>
                    </div>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-white is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">
                            {/* List item */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                    {/* Home icon */}
                                    <Link to='/'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                    </Link>
                                    <NavLink to='/'><span className="is-drawer-close:hidden">Homepage</span></NavLink>
                                </button>
                            </li>
                            {/* Dashboard Home */}
                             <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                    {/* Home icon */}
                                    <Link to='/dashboard/dashboard-Home'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                    </Link>
                                    <NavLink to='/dashboard/dashboard-Home'><span className="is-drawer-close:hidden">Dashboard Homepage</span></NavLink>
                                </button>
                            </li>
                           {/* add lessons */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Lessons">
                                    <Link to='/dashboard/add-lessons'><BiSolidMessageSquareAdd /></Link>
                                    <NavLink to='/dashboard/add-lessons'><span className="is-drawer-close:hidden">Add Lessons</span></NavLink>
                                </button>
                            </li>
                            {/* my lessons */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Lessons">
                                    <Link to='/dashboard/my-lessons'><FaUserTag /></Link>
                                    <NavLink to='/dashboard/my-lessons'><span className="is-drawer-close:hidden">My Lessons</span></NavLink>
                                </button>
                            </li>
                            {/* my Favorite-lessons */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Lessons">
                                    <Link to='/dashboard/my-favorites'><MdFavorite /></Link>
                                    <NavLink to='/dashboard/my-favorites'><span className="is-drawer-close:hidden">My Favorites</span></NavLink>
                                </button>
                            </li>
                            {/* profile */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Lessons">
                                    <Link to='/dashboard/my-profile'><CgProfile /></Link>
                                    <NavLink to='/dashboard/my-profile'><span className="is-drawer-close:hidden">My Profile</span></NavLink>
                                </button>
                            </li>
                            {/* admin */}
                            {/* admin dashbord */}
                             <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Homepage">
                                    {/* Home icon */}
                                    <Link to='/dashboard/admin-dashboard'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                    </Link>
                                    <NavLink to='/dashboard/admin-dashboard'><span className="is-drawer-close:hidden">Admin Dashboard Home</span></NavLink>
                                </button>
                            </li>

                            {/* manage user */}
                               <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Lessons">
                                    <Link to='/dashboard/admin-manage-users'><FaUserTag /></Link>
                                    <NavLink to='/dashboard/admin-manage-users'><span className="is-drawer-close:hidden">Manage Users</span></NavLink>
                                </button>
                            </li>
                            {/* List item */}
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                                    {/* Settings icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle cx="17" cy="17" r="3"></circle><circle cx="7" cy="7" r="3"></circle></svg>
                                    <span className="is-drawer-close:hidden">Settings</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;