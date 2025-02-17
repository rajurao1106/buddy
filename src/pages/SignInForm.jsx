import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function SignInForm() {
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [isSignedIn, setIsSignedIn] = useState(false); // State for tracking login status
  const navigate = useNavigate(); // Initialize the navigation hook

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/taskmanager/signin', { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Logged in successfully');
      setIsSignedIn(true); 
      navigate('/buddy/Chat'); 
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  // JSX for the SignInForm
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white shadow-md rounded-lg px-8 py-6"
      >
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
          Sign in Form
        </h2>

        {/* Email Input Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Password Input Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          Sign In
        </button>

        {/* Redirect to Signup */}
        <p className="mt-4 text-center">
          If you have not account then <Link to="/buddy/SignupForm" className="text-blue-700">Signup</Link>
        </p>
      </form>
    </div>
  );
}
