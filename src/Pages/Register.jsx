import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import SocialLogin from '../components/SocialLogin';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { createUser, setUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
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

    createUser(email, password)
      .then((res) => {
        const user = res.user;
        setUser(user);
        updateUserProfile({ displayName: name, photoURL: photo }).then(() => {
          navigate('/');
        });
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className=" flex items-center justify-center ">
      <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-700">Create an Account</h1>
        <p className="text-center text-sm text-gray-500">
          Join us today! Fill in the details to create your Account.
        </p>
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              id="photo"
              name="photo"
              type="url"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter your photo URL"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
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
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-green-600 text-white font-bold hover:from-green-500 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Register
          </button>
        </form>
        <div className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/signin" className="text-blue-500 font-medium hover:underline">
            Sign In
          </a>
        </div>
        <div className="divider">OR</div>
        <SocialLogin />
      </div>
    </div>
  );
};

export default Register;
