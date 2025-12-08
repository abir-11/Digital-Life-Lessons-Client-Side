
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layout/RootLayout';
import Home from '../Page/Home/Home';
import AuthLayout from '../Layout/AuthLayout';
import Login from '../Page/Auth/Login/Login';
import Register from '../Page/Auth/Register/Register';

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
    }
])

export default router;