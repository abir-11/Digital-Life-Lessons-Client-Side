
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layout/RootLayout';
import Home from '../Page/Home/Home';
import AuthLayout from '../Layout/AuthLayout';
import Login from '../Page/Auth/Login/Login';
import Register from '../Page/Auth/Register/Register';
import Dashboard from '../Layout/Dashboard';
import AddLessons from '../Page/AddLessons/AddLessons';

const router=createBrowserRouter([
    {
        path:'/',
        Component:RootLayout,
        children:[
            {
             index:true,
             Component:Home
            },

        ]
    },
    {
        path:'/',
        Component:AuthLayout,
        children:[
            {
                path:'/login',
                Component:Login
            },
            {
                path:'/register',
                Component:Register
            }
        ]
    },
    {
        path:'dashboard',
        Component:Dashboard,
        children:[
            {
                path:'add-lessons',
                Component:AddLessons
            }
        ]
    }
])

export default router;