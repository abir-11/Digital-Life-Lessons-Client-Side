import React from 'react';
import Navbar from '../Page/Share/Navbar/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <div>
           <div>
            <Navbar></Navbar>
            </div> 
           <div>
            <Outlet></Outlet>
           </div>

        </div>
    );
};

export default RootLayout;