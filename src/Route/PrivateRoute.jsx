import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router';
import { useLocation } from 'react-router';

const PrivetRoute = ({children}) => {
    const {user,loading}=useAuth();
    const location=useLocation();
    if(loading){
       return <p className='text-center text-primary'>loading...</p>
    }
    if(!user){
        return <Navigate to ='/login' state={location.pathname}></Navigate>
    }
    return children;
};

export default PrivetRoute;