import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiUpload, FiLock, FiGlobe, FiDollarSign, FiHelpCircle } from 'react-icons/fi';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const AddLessons = () => {
  const { user } = useAuth();
  
  const axiosSecure = useAxiosSecure();


  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors ,isSubmitting},
  } = useForm({
    defaultValues: {
      privacy: 'public',
      accessLevel: 'free'
    }
  });

  const watchAccessLevel = watch('accessLevel');


  const {data:userData,isLoading}=useQuery({
    queryKey:['users',user?.email],
    queryFn:async()=>{
       const res=await axiosSecure.get(`/users/${user?.email}`);
       return res.data;
    }
  })
  if(isLoading){
    return <p className='text-primary flex justify-center items-center-safe mt-5'>Loading...</p>
  }
  
  //console.log(userData);

  // Form submission
 const onSubmit = async (data) => {
  try {
    let uploadedImgURL = ''; 

   
    if (data.image && data.image.length > 0) {
      const formData = new FormData();
      formData.append('image', data.image[0]);

      const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_host_key}`;

      const res = await axios.post(image_API_URL, formData);
      uploadedImgURL = res.data.data.url;
      console.log('Uploaded image URL:', uploadedImgURL);
    }

    
    const finalData = {
      email: user.email,
      title: data.title,
      description: data.description,
      category: data.category,
      emotionalTone: data.emotionalTone,
      privacy: data.privacy,
      accessLevel: data.accessLevel,
      image: uploadedImgURL, 
    };

    
    Swal.fire({
      title: "Are you sure?",
      text: "You are adding this life lesson",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post('/life_lessons', finalData)
          .then(res => {
            console.log('After data post', res.data);
            reset(); 

            if (res.data.insertedId) {
              Swal.fire({
                title: "Submitted",
                text: "Your lesson has been successfully submitted.",
                icon: "success"
              });
            }
          })
          .catch(err => {
            console.error('Error posting lesson:', err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong while submitting your lesson!'
            });
          });
      }
    });

  } catch (error) {
    console.error('Error creating lesson:', error);
    toast.error('Error creating lesson. Please try again.');
  }
};

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary/5 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Share Your <span className="text-primary">Life Lesson</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Inspire others with your experiences. Every story matters.
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

            {/* Lesson Title */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Lesson Title
              </label>
              <input
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 5,
                    message: "Title must be at least 5 characters"
                  },
                  maxLength: {
                    value: 100,
                    message: "Title must be less than 100 characters"
                  }
                })}
                type="text"
                placeholder="What did you learn?"
                className="input input-bordered w-full bg-gray-50 text-lg"
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-2">{errors.title.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Your Story
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 5,
                    message: "Please share at least 50 characters"
                  },
                  maxLength: {
                    value: 5000,
                    message: "Description is too long"
                  }
                })}
                rows={8}
                placeholder="Share your experience in detail. What happened? What did you learn? How did it change you?"
                className="textarea textarea-bordered w-full bg-gray-50 text-lg resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                {errors.description ? (
                  <p className="text-red-600 text-sm">{errors.description.message}</p>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Share your authentic experience
                  </p>
                )}
                <span className="text-gray-500 text-sm">
                  {watch('description')?.length || 0}/5000 characters
                </span>
              </div>
            </div>

            {/* Category & Emotional Tone - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Category */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Category
                </label>
                <select
                  {...register("category", { required: "Please select a category" })}
                  className="select select-bordered w-full bg-gray-50"
                >
                  <option value="">Select a category</option>
                  <option value="personal-growth">Personal Growth</option>
                  <option value="career">Career & Work</option>
                  <option value="relationships">Relationships</option>
                  <option value="mindset">Mindset & Thinking</option>
                  <option value="mistakes-learned">Mistakes Learned</option>
                  <option value="health">Health & Wellness</option>
                  <option value="finance">Finance & Money</option>
                  <option value="parenting">Parenting</option>
                  <option value="spirituality">Spirituality</option>
                  <option value="other">Other</option>
                </select>
                {errors.category && (
                  <p className="text-red-600 text-sm mt-2">{errors.category.message}</p>
                )}
              </div>

              {/* Emotional Tone */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  Emotional Tone
                </label>
                <select
                  {...register("emotionalTone", { required: "Please select emotional tone" })}
                  className="select select-bordered w-full bg-gray-50"
                >
                  <option value="">How does your story feel?</option>
                  <option value="motivational">✨ Motivational</option>
                  <option value="sad">😢 Sad / Heartbreaking</option>
                  <option value="realization">💡 Realization / Aha Moment</option>
                  <option value="gratitude">🙏 Gratitude</option>
                  <option value="funny">😂 Funny / Humorous</option>
                  <option value="inspiring">🌟 Inspiring</option>
                  <option value="challenging">💪 Challenging</option>
                  <option value="hopeful">🌈 Hopeful</option>
                  <option value="reflective">🤔 Reflective</option>
                </select>
                {errors.emotionalTone && (
                  <p className="text-red-600 text-sm mt-2">{errors.emotionalTone.message}</p>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Image (Optional)
                <span className="text-sm text-gray-500 font-normal ml-2">
                  Add a photo that represents your story
                </span>
              </label>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Upload Area */}
                <div className="flex-1">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors">
                    <FiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <input
                      {...register("image")}
                      type="file"
                      accept="image/*"

                      className="file-input bg-primary text-white border-none"

                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="text-gray-600 mb-2">
                        <span className="text-primary font-medium">Click to upload</span> or drag and drop
                      </div>
                      <p className="text-sm text-gray-500">
                        PNG, JPG, GIF
                      </p>
                    </label>
                  </div>
                </div>

              </div>
            </div>

            {/* Privacy & Access Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Privacy */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  <div className="flex items-center gap-2">
                    Privacy
                    <div className="tooltip" data-tip="Who can see this lesson">
                      <FiHelpCircle className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </label>
                <div className="relative">
                  <select
                    {...register("privacy", { required: true })}
                    className="select select-bordered w-full bg-gray-50 pl-10"
                  >

                    <option value="public">Public</option>
                    <option value="private">Private</option>

                  </select>
                  <div className="absolute left-3 top-3">
                    {watch('privacy') === 'public' ? (
                      <FiGlobe className="text-gray-500" />
                    ) : (
                      <FiLock className="text-gray-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Access Level */}
              <div>
                <label className="block text-lg font-semibold text-gray-800 mb-3">
                  <div className="flex items-center gap-2">
                    Access Level
                    <div className="tooltip" data-tip={!userData.isPremium ? "Upgrade to Premium to create paid lessons" : "Set lesson pricing"}>
                      <FiHelpCircle className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </label>
                <div className="relative">
                  <select
                    {...register("accessLevel", { required: true })}
                    disabled={!userData.isPremium}
                    className={`select select-bordered w-full bg-gray-50 pl-10 ${!userData.isPremium ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    <option value="free">
                       Free - Available to all

                    </option>
                    <option value="premium">

                      $ Premium - Paid access only

                    </option>
                  </select>
                  <div className="absolute left-3 top-3">
                    {watchAccessLevel === 'free' ? (
                      <span className="text-gray-500">🎁</span>
                    ) : (
                      <FiDollarSign className="text-gray-500" />
                    )}
                  </div>

                  {/* Tooltip for non-premium users */}
                  {!userData.isPremium && (
                    <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        ⚡ <span className="font-medium">Upgrade to Premium</span> to create paid lessons and earn from your experiences.
                      </p>
                    </div>
                  )}

                  {/* Premium badge for premium users */}
                  {userData.isPremium && watchAccessLevel === 'premium' && (
                    <div className="mt-2 p-2 bg-gradient-to-r from-[#cca3b3] to-[#b58998] text-white rounded-lg text-center">
                      <p className="text-sm font-medium">
                        💎 Premium Lesson - You'll earn from each view
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="text-sm text-gray-600">
                  <p>By sharing your lesson, you agree to our <a href="#" className="text-primary hover:underline">Community Guidelines</a></p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      reset();
                     
                    }}
                    className="btn btn-outline px-8"
                    disabled={isSubmitting}
                  >
                    Clear All
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn bg-gradient-to-r from-[#cca3b3] to-[#b58998] text-white  hover:shadow-lg transition-shadow"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Publishing...
                      </>
                    ) : (
                      'Publish Lesson'
                    )}
                  </button>
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-10 bg-primary/5 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            💡 Tips for a Great Lesson
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">1</span>
              </div>
              <p className="text-gray-700">Be authentic and share from personal experience</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">2</span>
              </div>
              <p className="text-gray-700">Focus on the lesson learned, not just the story</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">3</span>
              </div>
              <p className="text-gray-700">Choose the right category and emotional tone</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">4</span>
              </div>
              <p className="text-gray-700">Consider who can benefit from your experience</p>
            </div>
          </div>
        </div>

      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};



export default AddLessons;