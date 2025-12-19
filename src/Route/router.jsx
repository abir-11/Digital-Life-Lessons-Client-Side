
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
import UpdateLessons from '../Page/UpdateLessons/UpdateLessons';
import MyFavorites from '../Page/MyFavorites/MyFavorites';
import MyProfile from '../Page/MyProfile/MyProfile';
import ProfileEdit from '../Page/MyProfile/ProfileEdit';
import PaymentSuccess from '../Page/UpdateLessons/PaymentSuccess';
import PaymentCencelled from '../Page/UpdateLessons/PaymentCencelled';
import DashboardHome from '../Page/DashboardHome/DashboardHome';
import AdminHomePage from '../Page/AdminDashboard/AdminHomePage';
import ManageUsers from '../Page/AdminDashboard/ManageUsers';
import ManageLessons from '../Page/AdminDashboard/ManageLessons';
import Admin from '../Page/AdminDashboard/Admin';
import ReportedLessons from '../Page/AdminDashboard/ReportedLessons';
import AdminProfile from '../Page/AdminDashboard/AdminProfile/AdminProfile';
import ProfileEdits from '../Page/AdminDashboard/AdminProfile/ProfileEdits';
import PrivetRoute from './PrivateRoute';
import AdminRouter from './AdminRouter';

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
                path: '/details-lesson/:id',
                Component: DetailsPage
            },
            {
                path: '/author/:email',
                element:<PrivetRoute>
                    <Author></Author>
                </PrivetRoute>
            },
            {
                path: '/pricing',
                element:<PrivetRoute>
                    <UpdateLessons></UpdateLessons>
                </PrivetRoute>
            },
            {
                path: '/payment-success',
                element:<PrivetRoute>
                    <PaymentSuccess></PaymentSuccess>
                </PrivetRoute>
            },
            {
                path: '/payment-cancel',
               element:<PrivetRoute>
                <PaymentCencelled></PaymentCencelled>
               </PrivetRoute>
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
        element:<PrivetRoute>
            <Dashboard></Dashboard>
        </PrivetRoute>,
        children: [
             {
                path: 'dashboard-Home',
                Component: DashboardHome
            },

            {
                path: 'add-lessons',
                Component: AddLessons
            },
           
            {
                path: 'my-lessons',
                Component: MyLessons
            },
            {
                path: 'my-favorites',
                Component: MyFavorites
            },
            {
                path: 'my-profile',
                Component: MyProfile,
            },
            {
                path: 'profile-edit',
                Component: ProfileEdit
            },
            {
                path: 'admin',
                element:<AdminRouter><Admin></Admin></AdminRouter>,
                children: [
                   {
                    index:true,
                    Component:AdminHomePage

                   },
                    {
                        path: 'manage-users',
                        Component: ManageUsers
                    },
                    {
                        path:'manage-lesson',
                        Component:ManageLessons
                    },
                    {
                        path:'reported-lessons',
                        Component:ReportedLessons
                    },
                    {
                        path:'profile',
                        Component:AdminProfile
                    },
                    {
                        path:'profile-edit',
                        Component:ProfileEdits
                    }
                ]
            },

        ]
    }
])

export default router;