import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

const UpdateLessons = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const handlePayment = async () => {
        const paymentInfo = {
            cost: 1500,
            accessId: "premium",
            userEmail: user?.email
        };

        const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
        window.location.href = res.data.url;
    };

    return (
        <div>
            <div className='max-w-11/12 mx-auto  '>
                <div className="overflow-x-auto my-10">
                    <table className="min-w-full border border-gray-200 rounded-lg">
                        <thead className="bg-primary">
                            <tr>
                                <th className="px-4 py-3 text-left">Index</th>
                                <th className="px-4 py-3 text-left text-white font-bold">Feature</th>
                                <th className="px-4 py-3 text-center">Free</th>
                                <th className="px-4 py-3 text-center text-white font-bold">Premium</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr className="border-t bg-gray-50">
                                <th className="px-4 py-3 text-center">1</th>
                                <td className="px-4 py-3">Premium Lesson Creation</td>
                                <td className="text-center">❌ Not Available</td>
                                <td className="text-center">✅ Available</td>
                            </tr>

                            <tr className="border-t bg-white">
                                <th className="px-4 py-3 text-center">2</th>
                                <td className="px-4 py-3">Lesson Visibility</td>
                                <td className="text-center">Normal Listing</td>
                                <td className="text-center">⭐ Priority Listing</td>
                            </tr>

                            <tr className="border-t bg-gray-50">
                                <th className="px-4 py-3 text-center">3</th>
                                <td className="px-4 py-3">Customer Support</td>
                                <td className="text-center">Email Support</td>
                                <td className="text-center font-semibold">⚡ Priority Support</td>
                            </tr>
                            <tr className="border-t bg-white">
                                <th className="px-4 py-3 text-center">4</th>
                                <td className="px-4 py-3">Comment Moderation Tools</td>
                                <td className="text-center">❌ Limited</td>
                                <td className="text-center font-semibold">✅ Advanced Controls</td>
                            </tr>
                            <tr className="border-t bg-gray-50">
                                <th className="px-4 py-3 text-center">5</th>
                                <td className="px-4 py-3">Advanced Analytics</td>
                                <td className="text-center">❌ Basic only</td>
                                <td className="text-center font-semibold">✅ Full Analytics</td>
                            </tr>
                            <tr className="border-t bg-gray-50">
                                <th className="px-4 py-3 text-center">6</th>
                                <td className="px-4 py-3">Premium Lesson Acces</td>
                                <td className="text-center">❌ Not Included</td>
                                <td className="text-center font-semibold">✅ Full Access</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <div>
                <p className='flex justify-center text-center text-xl sm:text-2xl md:text-3xl items-center '> ৳1500 one-time payment (Lifetime access)
                </p>
            </div>
            <div className='flex justify-center items-center'>
                <button onClick={handlePayment} className=" btn bg-primary flex items-center  justify-center my-5 px-5 text-white py-2 rounded-lg hover:bg-primary/80">Choose Premium Plan</button>
            </div>
        </div>
    );
};

export default UpdateLessons;