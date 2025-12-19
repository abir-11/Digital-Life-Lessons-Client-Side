import React from 'react';
import Navbar from '../Page/Share/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Page/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
           <div className='sticky bg-white top-0 z-50'>
            <Navbar></Navbar>
            </div> 
           <div>
            <Outlet></Outlet>
           </div>
           <div>
            <Footer></Footer>
           </div>

        </div>
    );
};

export default RootLayout;