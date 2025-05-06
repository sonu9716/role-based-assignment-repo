import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import React from 'react';
import { registerUser } from '../services/blogApi';
import { toast } from 'react-toastify';



const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' // Default role
  });

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
  
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }
  
    setIsLoading(true);
  
    try {
      
      const response = await registerUser(formData);
  
      if (response?.success) {
        toast.success('🎉 Registration successful! Redirecting...', {
          autoClose: 2000,
          onClose: () => navigate('/login')
        });
      } else {
        toast.error(response?.message || 'Something went wrong');
      }
    } catch (err) {
      console.error('🚨 Registration error:', err);
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-emerald-50 p-4'>
      <div className="w-full max-w-md px-8 py-8 bg-white rounded-xl shadow-md">
        <h3 className="text-3xl font-bold mb-2">Welcome to <span className="text-blue-500 font-semibold">Registration</span></h3>
        <h4 className="text-xl text-gray-600 mb-6">Create your account</h4>
        
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          <div>
            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>

          {/* Role Selection */}
          <div className="my-5">
            <p className="text-sm font-medium text-gray-700 mb-3">Select your role</p>
            <div className="flex items-center gap-5">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="user-radio"
                  name="role"
                  value="user"
                  checked={formData.role === 'user'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="user-radio"
                  className="ml-2 block text-sm font-medium text-gray-700 cursor-pointer"
                >
                  User
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="radio"
                  id="Admin-radio"
                  name="role"
                  value="Admin"
                  checked={formData.role === 'Admin'}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 cursor-pointer"
                />
                <label
                  htmlFor="Admin-radio"
                  className="ml-2 block text-sm font-medium text-gray-700 cursor-pointer"
                >  
                  Admin
                </label>
              </div>
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full px-6 py-3 mt-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Create My Account
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;