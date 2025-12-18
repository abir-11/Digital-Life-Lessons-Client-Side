import React from 'react';
import { Link } from 'react-router';

const PaymentCencelled = () => {
    return (
        <div className='min-h-screen  flex justify-center items-center'>
            <div className="text-center max-w-xl mx-auto shadow-lg px-10 py-5 rounded-xl  my-20">
                <h1 className="text-2xl font-bold text-red-600">
                    $ Payment Cancel 😢
                </h1>
                <div>
                    <Link to='/pricing' className='flex justify-center items-center'><button className=" btn bg-primary flex items-center text-center justify-center my-5 px-5 text-white py-2 rounded-lg hover:bg-primary/80">Try again</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentCencelled;