import React, { useContext, useRef } from 'react';
import { AuthContext } from '../context/AuthProvider';
import {  useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SocialLogin from '../components/SocialLogin';

const SignIn = () => {
  const { signInUser, resetPassword, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const emailRef = useRef();


  const location = useLocation();
  const from = location.state || '/';

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
      return passwordRegex.test(password);
    };

    if (!validatePassword(password)) {
      toast.error('Password must have an uppercase, a lowercase, and at least 6 characters.');
      return;
    }
    

    signInUser(email, password)
      .then((res) => {
        const user = res.user;
        setUser(user);
        
        navigate(from);
        toast.success('Login successfully');
      })
      .catch((err) => {
        console.error(err.message);
        toast.error('Login failed. Please check your credentials.');
      });
  };

  const forgetPassword = () => {
    const email = emailRef.current?.value;
    if (!email) {
      toast.error('Provide a valid email');
    } else {
      resetPassword(email)
        .then(() => {
          toast.success('Please check your email');
        })
        .catch((error) => {
          console.error(error.message);
          toast.error('Failed to send reset email');
        });
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gradient-to-r">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-700">Welcome Back</h1>
        <p className="text-center text-sm text-gray-500">
          Please sign in to your account to continue.
        </p>
        <form onSubmit={handleSignIn} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              ref={emailRef}
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your password"
            />
            <div className="text-right">
              <button
                type="button"
                onClick={forgetPassword}
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold hover:from-blue-500 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
        <div className="text-center text-sm text-gray-500">
          Don't have an account?
          <a href="/register" className="text-blue-500 font-medium hover:underline">
            Register
          </a>
        </div>
        <div className="divider">OR</div>
        <SocialLogin />
      </div>
    </div>
  );
};

export default SignIn;
