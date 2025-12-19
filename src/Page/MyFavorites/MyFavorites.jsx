import React, { useState } from 'react';
import useAxiosSecure from './../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../Hooks/useAuth';
import { FaRegHeart, FaHeart, FaEye, FaTrashAlt, FaFilter } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyFavorites = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterEmotionalTone, setFilterEmotionalTone] = useState('all');

    const {
        data: favorites = [],
        isLoading,
        refetch
    } = useQuery({
        queryKey: ['favorites-lessons', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/favorite/email/${user.email}`
            );
            return res.data;
        }
    });

    // Handle remove from favorites
    const handleRemoveFavorite = async (lessonId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.delete(`/favorite/remove/${lessonId}`, {
                        data: { email: user.email } 
                    });
                    refetch(); 
                    Swal.fire(
                        'Removed!',
                        'Lesson has been removed from favorites.',
                        'success'
                    );
                } catch (error) {
                    console.error('Error removing favorite:', error);
                    Swal.fire(
                        'Error!',
                        'Failed to remove from favorites.',
                        'error'
                    );
                }
            }
        });
    };

    // Get unique categories and emotional tones for filters
    const categories = ['all', ...new Set(favorites.map(item => item.category))];
    const emotionalTones = ['all', ...new Set(favorites.map(item => item.emotionalTone))];

    // Filter favorites based on selected filters
    const filteredFavorites = favorites.filter(favorite => {
        const categoryMatch = filterCategory === 'all' || favorite.category === filterCategory;
        const toneMatch = filterEmotionalTone === 'all' || favorite.emotionalTone === filterEmotionalTone;
        return categoryMatch && toneMatch;
    });

    if (isLoading) {
        return (
            <p className="text-primary flex justify-center items-center mt-5">
                Loading...
            </p>

        );
    }

    return (
        <div className="max-w-11/12 mx-auto px-10 py-8 bg-primary rounded-lg shadow-md  my-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">My Favorites</h1>
                <p className="text-gray-600">
                    Your saved lessons ({filteredFavorites.length} of {favorites.length})
                </p>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <FaFilter className="text-primary" />
                    <h2 className="text-lg font-semibold">Filter Favorites</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Category Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Filter by Category
                        </label>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {categories.map((category, index) => (
                                <option key={index} value={category}>
                                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Emotional Tone Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Filter by Emotional Tone
                        </label>
                        <select
                            value={filterEmotionalTone}
                            onChange={(e) => setFilterEmotionalTone(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            {emotionalTones.map((tone, index) => (
                                <option key={index} value={tone}>
                                    {tone === 'all' ? 'All Tones' : tone.charAt(0).toUpperCase() + tone.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Clear Filters */}
                {(filterCategory !== 'all' || filterEmotionalTone !== 'all') && (
                    <button
                        onClick={() => {
                            setFilterCategory('all');
                            setFilterEmotionalTone('all');
                        }}
                        className="mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
                    >
                        Clear all filters
                    </button>
                )}
            </div>

            {/* Favorites Table */}
            {filteredFavorites.length > 0 ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Lesson Details
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Emotional Tone
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Access Level
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredFavorites.map((lesson) => (
                                    <tr key={lesson._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-start">
                                                {lesson.image ? (
                                                    <img
                                                        src={lesson?.image}
                                                        alt={lesson.title}
                                                        className="h-16 w-16 object-cover rounded-md mr-4"
                                                    />
                                                ) : (
                                                    <div className="  mr-4 flex items-center justify-center">
                                                        <FaHeart className="text-red-400 text-xl" />
                                                    </div>
                                                )}
                                                <div>
                                                    <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                                        {lesson.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 line-clamp-2">
                                                        {lesson?.description}
                                                    </p>
                                                    <div className="flex items-center mt-1">
                                                        {lesson?.photoURL && (
                                                            <img
                                                                src={lesson?.photoURL}
                                                                alt={lesson.name}
                                                                className="h-5 w-5 rounded-full mr-2"
                                                            />
                                                        )}
                                                        <span className="text-xs text-gray-400">
                                                            By {lesson?.name}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {lesson.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                {lesson.emotionalTone}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${lesson.accessLevel === 'free' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {lesson.accessLevel}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                {/* View Details Button */}
                                                <Link
                                                    to={`/details-lesson/${lesson._id}`}
                                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                                                >
                                                    <FaEye className="mr-2" />
                                                    View
                                                </Link>

                                                {/* Remove from Favorites Button */}
                                                <button
                                                    onClick={() => handleRemoveFavorite(lesson._id)}
                                                    className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-red-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                                >
                                                    <FaTrashAlt className="mr-2" />
                                                    Remove
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="mx-auto w-24 h-24 bg-gradient-to-br from-red-50 to-pink-50 rounded-full flex items-center justify-center mb-4">
                        <FaRegHeart className="text-red-400 text-3xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No favorites found
                    </h3>
                    <p className="text-gray-500 max-w-md mx-auto mb-6">
                        {filterCategory !== 'all' || filterEmotionalTone !== 'all'
                            ? 'Try changing your filters or clear them to see all favorites.'
                            : 'You haven\'t added any lessons to your favorites yet.'}
                    </p>
                    {favorites.length === 0 && (
                        <Link
                            to="/public-lessons"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                        >
                            Browse Lessons
                        </Link>
                    )}
                </div>
            )}

            {/* Stats Summary */}
            {filteredFavorites.length > 0 && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-blue-600 mb-1">Total Favorites</p>
                        <p className="text-2xl font-bold text-blue-900">{favorites.length}</p>
                    </div>

                </div>
            )}
        </div>
    );
};

export default MyFavorites;