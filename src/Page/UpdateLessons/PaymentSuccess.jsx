import { useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const axiosSecure = useAxiosSecure();
    const location = useLocation();

    const email = new URLSearchParams(location.search).get('email');

    useEffect(() => {
        if (email) {
            axiosSecure.patch('/make-premium', { email })
                .then(res => {
                    console.log('Premium updated', res.data);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [email, axiosSecure]);

    return (
        <div className='min-h-screen  flex justify-center items-center'>
            <div className="text-center max-w-xl mx-auto shadow-lg px-10 py-5 rounded-xl  my-20">
                <h1 className="text-2xl font-bold text-green-600">
                    Payment Successful 🎉
                </h1>
                <p className='my-2'>You are now a Premium User</p>
                <div>
                    <Link to='/' className='flex justify-center items-center'><button className=" btn bg-primary flex items-center text-center justify-center my-5 px-5 text-white py-2 rounded-lg hover:bg-primary/80">Back</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
