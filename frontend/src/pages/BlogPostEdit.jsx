import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost } from '../services/blogApi';
import { toast } from 'react-toastify';

const BlogPostEdit = () => {
  const { postId } = useParams(); // ✅ Get post ID from URL params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    author: ''
  });
  const [userRole, setUserRole] = useState(""); 
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Fetch existing post data when component mounts
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await updatePost(postId,formData); // ✅ Get specific post

        if (response.data) {
          setFormData(response.data); // ✅ Populate form with existing data
        } else {
          toast.error("Post not found!");
          navigate("/blog");
        }
      } catch (error) {
        setError("Failed to load post data.");
        toast.error("Failed to load post.");
      }
    };

    fetchPost();
  }, [postId, navigate]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Handle form submission (update post)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.author) {
      toast.error('All fields are required!');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      
      const response = await updatePost(postId, formData); // ✅ Update API request

      if (response?.success) {
        toast.success("Post updated successfully!");
        navigate("/blogpost");
      } else {
        throw new Error(response?.message || "Failed to update post");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update post. Please try again.");
      toast.error("Failed to update post.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 p-4">
      <div className="w-full max-w-md px-8 py-8 bg-white rounded-xl shadow-md">
        <h3 className="text-3xl font-bold mb-2">
          Edit <span className="text-blue-500 font-semibold">Blog Post</span>
        </h3>
        <h4 className="text-xl text-gray-600 mb-6">Modify your post details</h4>

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
            {isLoading ? 'Updating...' : 'Update Post'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Want to go back?{' '}
          <Link to="/blogpost" className="text-blue-500 hover:underline font-medium">
            View Posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostEdit;