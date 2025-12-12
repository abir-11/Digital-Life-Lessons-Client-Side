
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layout/RootLayout';
import Home from '../Page/Home/Home';
import AuthLayout from '../Layout/AuthLayout';
import Login from '../Page/Auth/Login/Login';
import Register from '../Page/Auth/Register/Register';
import Dashboard from '../Layout/Dashboard';
import AddLessons from '../Page/AddLessons/AddLessons';
import MyLessons from '../Page/MyLessons/MyLessons';
import PublicLessons from '../Page/PublicLessons/PublicLessons';
import DetailsPage from '../Page/DetailsPage/DetailsPage';
import Author from '../Page/Author/Author';

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/public-lessons',
                Component: PublicLessons
            },
            {
                path:'/details-lesson/:id',
                Component:DetailsPage
            },
            {
                path:'/author/:email',
                Component:Author
            }

        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    },
    {
        path: 'dashboard',
        Component: Dashboard,
        children: [
            {
                path: 'add-lessons',
                Component: AddLessons
            },
            {
                path: 'my-lessons',
                Component: MyLessons
            }
        ]
    }
])

export default router;