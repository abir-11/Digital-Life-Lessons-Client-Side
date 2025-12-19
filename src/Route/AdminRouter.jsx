import React from 'react';
import Loading from './../Page/Share/Loading/Loading';
import useRole from '../Hooks/useRole';
import useAuth from '../Hooks/useAuth';

const AdminRouter = ({children}) => {
    const {loading}=useAuth();
    const {userData,roleLoading}=useRole(); 
    if(loading || roleLoading){
        return <Loading></Loading>
    }
    if(userData.role !== 'admin'){
        return <div className='text-red-500 text-3xl flex justify-center items-center text-centern align-middle'>Access is forbiden</div>
    }
    return children;
};

export default AdminRouter;