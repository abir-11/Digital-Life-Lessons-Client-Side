import { Link, NavLink } from "react-router";
import life from '../../../assets/HeroImg/image.png'
import useAuth from "../../../Hooks/useAuth";

const Navbar = () => {
    const { user, logOut, loading } = useAuth();
    //console.log(user);
    const handleLogOut = () => {
        logOut()
            .then(res => {

            })
            .catch(error => {
                console.log(error);
            })
    }

    const links = (
        <>
            <li>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `font-base px-3 py-1 rounded-full hover:underline ${isActive ? 'bg-[#cca3b3] text-white' : 'text-[#003028]'
                        }`
                    }
                >
                    Home
                </NavLink>
            </li>

             <li>
                <NavLink
                    to="/public-lessons"
                    className={({ isActive }) =>
                        `font-base px-3 py-1 rounded-xl hover:underline ${isActive ? 'bg-[#cca3b3] text-white' : 'text-[#003028]'
                        }`
                    }
                >
                    Public Lessons
                </NavLink>
            </li>
           {
            user && <>
            
             <li>
                <NavLink
                    to="dashboard/add-lessons"
                    className={({ isActive }) =>
                        `font-base px-3 py-1 rounded-xl hover:underline ${isActive ? 'bg-[#cca3b3] text-white' : 'text-[#003028]'
                        }`
                    }
                >
                    Add Lesson
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="dashboard/my-lessons"
                    className={({ isActive }) =>
                        `font-base px-3 py-1 rounded-xl hover:underline ${isActive ? 'bg-[#cca3b3] text-white' : 'text-[#003028]'
                        }`
                    }
                >
                    My Lessons
                </NavLink>
            </li>
           
            <li>
                <NavLink
                    to="/pricing"
                    className={({ isActive }) =>
                        `font-base px-3 py-1 rounded-xl hover:underline ${isActive ? 'bg-[#cca3b3] text-white' : 'text-[#003028]'
                        }`
                    }
                >
                    Pricing
                </NavLink>
            </li>
            </>
           }
        </>
    );

    if (loading) {
        return (
            <p className="text-sm text-white flex justify-center items-center">
                Loading...
            </p>
        );
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                {/* Mobile Dropdown */}
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 w-52 p-2 shadow bg-white rounded-xl">
                     
                         {links}
                       
                    </ul>
                </div>

                <Link to='/' className=" text-xl">
                    <img src={life} alt="" className="w-14 bg-white" />
                </Link>
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 ">
                    {links}
                </ul>
            </div>

            <div className="navbar-end">
                <div className="flex-none">

                    {!user && (
                        <div className="flex items-center gap-3">
                            <Link className="btn btn-ghost" to="/login">Login</Link>
                            <Link className="btn btn-primary" to="/register">Sign Up</Link>
                        </div>
                    )}

                    {user && (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL} alt="avatar" />
                                </div>
                            </div>

                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-white rounded-box z-50 mt-3 w-52 p-2 shadow"
                            >
                                <li className="font-base px-5 py-1 rounded-xl   hover:bg-primary hover:text-white text-[12px]">
                                    {
                                        user?.displayName
                                    }
                                </li>
                                <li className="font-base px-3 py-1 rounded-xl   hover:bg-primary hover:text-white text-xl">
                                    <Link to="/profile">Profile</Link>
                                </li>


                                <li className="font-base px-3 py-1 rounded-xl   hover:bg-primary hover:text-white text-xl">
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>


                                <li className="font-base px-3 py-1 rounded-xl   hover:bg-primary hover:text-white text-xl">
                                    <button onClick={handleLogOut}>Logout</button>
                                </li>
                            </ul>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Navbar;
