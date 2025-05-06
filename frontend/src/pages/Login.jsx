import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { loginUser } from '../services/blogApi';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
  
    setIsLoading(true);
  
    try {  
      const data = await loginUser(formData); // ✅ Directly extracting data
  
      if (data?.success) {
        // ✅ Store token in localStorage for future API calls
        localStorage.setItem("token", data.token);  
        toast.success('🎉 Login successful! Redirecting...', {
          autoClose: 2000,
          onClose: () => navigate('/blogpost', { replace: true, state: { from: 'login' } })
        });
      } else {
        toast.error(data?.message || 'Invalid credentials');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" absolute inset-0 w-full flex items-center justify-center h-screen bg-emerald-50">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-xl shadow-md">
      <div className="w-full max-w-md px-8 py-10">

<h4 className="text-2xl font-semibold text-gray-800 mb-6">Login to your <span className="text-blue-500 font-semibold">account</span></h4>

{error && (
  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
    {error}
  </div>
)}

<form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
  <div>
    <input
      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
      type="email"
      placeholder="Email address"
      name="email"
      value={formData.email}
      onChange={handleChange}
      required
    />
  </div>
  
  <div>
    <input
      className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all"
      type="password"
      placeholder="Password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
    />
  </div>
  
  <button
    type="submit"
    disabled={isLoading}
    className={`w-full py-3 px-4 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition-colors ${
      isLoading ? 'opacity-75 cursor-not-allowed' : ''
    }`}
  >
    {isLoading ? 'Logging in...' : 'Login'}
  </button>
</form>

<div className="mt-6 text-center text-sm text-gray-600">
  Don't have an account?{' '}
  <Link to="/register" className="text-blue-500 hover:underline font-medium">
    Sign up
  </Link>
</div>
</div>
      </div>
      
    </div>
  );
};

export default LoginForm;