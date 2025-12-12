import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Link } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import { FaEyeSlash, FaUserAlt } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import axios from 'axios';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const Register = () => {
  const [showEyes, setShowEyes] = useState(false);
  const { setUser, registerUser,updateUserProfie } = useAuth();
  const axiosSecure=useAxiosSecure();
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Registration Data:", data.photo[0]);

    const imageData = data.photo[0];

    // Handle registration logic here
    registerUser(data.email, data.password)
      .then(result => {
        console.log("After register", result.user)
        const formData = new FormData();
        formData.append('image', imageData);
        const image_API_USER_URL =`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key_user}`

        axios.post(image_API_USER_URL, formData)
          .then(res => {
            console.log("After image uplodate", res.data.data.url);
            const userInfo={
              displayName:data.displayName,
              email:data.email,
              photoURL:res.data.data.url
            }
            axiosSecure.post('/users',userInfo)
            .then(res=>{
              if(res.data.insertedId){
                console.log("data has been stored")
              }
            })

            const userProfile={
              displayName:data.displayName,
              photoURL:res.data.data.url
            }
            updateUserProfie(userProfile)
            .then(()=>{
              console.log('user profile update done')
            })
            .catch(error=>{
              console.log(error);
            })
          })
      })
  };
  const handleGoogleSubmit = () => {
    signInGoogle()
      .then(result => {
        const user = result.user;   // <-- correct
        setUser(user);
        console.log("Google User:", user);
        const userInfo={
          diplayName:user.displayName,
          email:user.email,
          photoURL:user.photoURL
        }
        axiosSecure.post('/users',userInfo)
        .then(res=>{
          if(res.data.insertedId){
            console.log('user data has been login');
          }
        })
        .catch(error=>{
          console.log(error)
        })

        navigate(location?.state || "/");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-3xl overflow-hidden flex flex-col sm:flex-row w-full max-w-4xl">

        {/* LEFT SIDE FORM */}
        <div className="w-full sm:w-1/2 p-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-3xl font-bold mb-8">Create Account</h2>

            {/* Username */}
            <div className="relative mb-5">
              <input
                {...register("username", { required: "Username is required" })}
                type="text"
                placeholder="Username"
                className="input input-bordered w-full pl-12 bg-gray-100"
              />
              <FiUser className="absolute left-4 top-3 text-gray-500 text-xl" />
            </div>
            {errors.username && <p className="text-red-600 text-sm mb-2">{errors.username.message}</p>}

            {/* Email */}
            <div className="relative mb-5">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email"
                placeholder="Email"
                className="input input-bordered w-full pl-12 bg-gray-100"
              />
              <FiMail className="absolute left-4 top-3 text-gray-500 text-xl" />
            </div>
            {errors.email && <p className="text-red-600 text-sm mb-2">{errors.email.message}</p>}
            {/* photoURL */}
            <div className='relative mb-5'>
              <input type="file"
                {
                ...register('photo', { required: 'Photo file is required' })
                }
                placeholder='Enter Your file'
                className="file-input input  input-bordered w-full pl-12 bg-gray-100"
              />
              <FaUserAlt className="absolute left-4 top-3 text-gray-500 text-xl" />
              {errors.file && <p className='text-red-500 text-sm mb-2'>Picture must be required</p>}
            </div>
            {/* Password */}
            <div className="relative mb-6">
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                type={showEyes ? 'text' : 'password'}
                placeholder="Password"
                className="input input-bordered w-full pl-12 bg-gray-100"
              />
              <FiLock className="absolute left-4 top-3 text-gray-500 text-xl" />
              <button type='button' className='absolute right-3 top-3 text-gray-600' onClick={() => setShowEyes(!showEyes)}>
                {
                  showEyes ? <FaEyeSlash /> : <IoEyeSharp />
                }
              </button>
            </div>
            {errors.password && <p className="text-red-600 text-sm mb-2">{errors.password.message}</p>}

            <button
              type="submit"
              className="btn w-full bg-primary hover:bg-[#b58998] text-white"
            >
              Sign Up
            </button>


          </form>

          <div>
            <div className='text-center  font-medium  text-xl text-base-200'>
              or
            </div>
            <div>
              <button onClick={handleGoogleSubmit} className="btn bg-white text-black border-[#e5e5e5] hover:bg-primary hover:text-white w-full ">
                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                Login with Google
              </button>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE BLUE PANEL */}
        <div className="w-full sm:w-1/2 bg-primary text-white flex items-center justify-center p-10 rounded-t-[50px] sm:rounded-t-none sm:rounded-l-[80px]">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
            <p className="mb-4">Already have an account?</p>
            <Link to="/login">
              <button className="btn bg-transparent border border-white text-white hover:bg-[#b58998] hover:text-white">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;