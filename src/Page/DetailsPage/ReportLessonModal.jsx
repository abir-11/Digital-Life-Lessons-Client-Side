import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import { FiAlertTriangle, FiX, FiSend } from 'react-icons/fi';

const ReportLessonModal = ({ lesson, isOpen, onClose, refetch }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        if (!user?.email) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'Please login to report this lesson',
            });
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You want to report this lesson?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, report it!',
            cancelButtonText: 'Cancel'
        }).then(async (result) => {
            if (result.isConfirmed) {
                setIsSubmitting(true);

                try {
                    const userRes = await axiosSecure.get(`/users/${user?.email}`);
                    const currentUser = userRes.data;

                    if (!currentUser || !currentUser._id) {
                        throw new Error('User data not found');
                    }

                    // Prepare report data
                    const reportData = {
                        lessonId: lesson._id,
                        reporterUserId: currentUser._id, 
                        reportedUserEmail: lesson.email,
                        reason: data.reason,
                    };

                    //console.log('Sending report data:', reportData);

                    // Send report
                    const result = await axiosSecure.post('/report_lessons', reportData);

                    if (result.data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Report Submitted',
                            text: 'Thank you for reporting. Our team will review this content.',
                            timer: 3000,
                            showConfirmButton: false
                        });
                        reset();
                        onClose();
                        if (refetch) refetch();
                    } else {
                        throw new Error(result.data.message || 'Report submission failed');
                    }
                } catch (error) {
                    console.error('Report submission error:', error);

                    let errorMessage = 'Failed to submit report. Please try again.';


                    Swal.fire({
                        icon: 'error',
                        title: 'Submission Failed',
                        text: errorMessage,
                    });
                } finally {
                    setIsSubmitting(false);
                }
            }
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                            <FiAlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Report Lesson</h3>
                            <p className="text-sm text-gray-600">Report: "{lesson?.title}"</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <FiX className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Reason Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Reason for Report <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register("reason", { required: "Please select a reason" })}
                                className="select select-bordered w-full bg-gray-50"
                            >
                                <option value="">Select a reason</option>
                                <option value="Inappropriate Content">Inappropriate Content</option>
                                <option value="Hate Speech or Harassment">Hate Speech or Harassment</option>
                                <option value="Misleading or False Information">Misleading or False Information</option>
                                <option value="Spam or Promotional Content">Spam or Promotional Content</option>
                                <option value="Sensitive or Disturbing Content">Sensitive or Disturbing Content</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.reason && (
                                <p className="text-red-600 text-sm mt-1">{errors.reason.message}</p>
                            )}
                        </div>



                        {/* Important Notice */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-start gap-2">
                                <FiAlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm text-yellow-800 font-medium">
                                        Please note:
                                    </p>
                                    <ul className="text-xs text-yellow-700 mt-1 space-y-1">
                                        <li>• False reports may lead to account suspension</li>
                                        <li>• Your report will remain confidential</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="btn btn-outline flex-1"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn bg-red-600 hover:bg-red-700 text-white flex-1"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <FiSend className="w-4 h-4 mr-2" />
                                        Submit Report
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReportLessonModal;