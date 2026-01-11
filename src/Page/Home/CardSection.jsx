import React from 'react';

const CardSection = () => {
    return (
        <div className="flex items-center justify-center my-10 p-4">
            <div className="max-w-6xl mx-auto">

                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-[#cca3b3] to-[#8a6b7a] bg-clip-text text-transparent">
                            Life Lessons That Matter
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover why learning through experience creates lasting impact
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Card 1 */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative bg-white p-8 rounded-2xl border border-gray-200">
                            <div className="w-14 h-14 rounded-lg bg-blue-100 flex items-center justify-center mb-6">
                                <span className="text-2xl">✨</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Practical Wisdom</h3>
                            <p className="text-gray-600">
                                Apply knowledge immediately to real situations. No gap between learning and doing.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="relative group  ">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative bg-white p-8 rounded-2xl border border-gray-200">
                            <div className="w-14 h-14 rounded-lg bg-green-100 flex items-center justify-center mb-6">
                                <span className="text-2xl">🌱</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Growth Mindset</h3>
                            <p className="text-gray-600">
                                Every experience teaches something valuable. Learn from both success and failure.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="relative group ">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative  bg-white p-8 rounded-2xl border border-gray-200">
                            <div className="w-14 h-14 rounded-lg bg-purple-100 flex items-center justify-center mb-6">
                                <span className="text-2xl">🤝</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Community Power</h3>
                            <p className="text-gray-600">
                                Share journeys, support each other, and grow together through shared experiences.
                            </p>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="relative group ">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                        <div className="relative bg-white p-8 rounded-2xl border border-gray-200">
                            <div className="w-14 h-14 rounded-lg bg-orange-100 flex items-center justify-center mb-6">
                                <span className="text-2xl">🚀</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Transformative Impact</h3>
                            <p className="text-gray-600">
                                Create meaningful change that lasts a lifetime. Your journey inspires others.
                            </p>
                        </div>
                    </div>

                </div>

               


            </div>
        </div>
    );
};

export default CardSection;