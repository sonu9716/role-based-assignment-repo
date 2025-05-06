import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPost } from '../services/blogApi';
import { toast } from 'react-toastify';


const CreateBlogPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Development',
    author: '' // Replace dynamically with authenticated user
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.author) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {

      const response = await createPost(formData);

      if (response?.success) {
        toast.success('🎉 Blog post created successfully! Redirecting...', {
          autoClose: 2000,
          onClose: () => navigate('/blogpost')
        });
      } else {
        toast.error(response?.message || 'Failed to create post');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post. Please try again.');
      toast.error(err.response?.data?.message || 'Failed to create post.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 p-4">
      <div className="w-full max-w-md px-8 py-8 bg-white rounded-xl shadow-md">
        <h3 className="text-3xl font-bold mb-2">
          Create a <span className="text-blue-500 font-semibold">Blog Post</span>
        </h3>
        <h4 className="text-xl text-gray-600 mb-6">Share your thoughts</h4>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
          <div>
            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <textarea
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
              placeholder="Content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <select
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full px-6 py-3 mt-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-300 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Publishing...' : 'Create Post'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Want to see your posts?{' '}
          <Link to="/blog" className="text-blue-500 hover:underline font-medium">
            View Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPost;