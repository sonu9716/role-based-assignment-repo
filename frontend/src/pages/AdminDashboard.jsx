import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { allPosts, deletePost } from '../services/blogApi';
import LogoutButton from '../components/LogoutButton';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Fetch all posts when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await allPosts();

        if (response?.data && typeof response.data === 'object') {
          setPosts(Object.values(response.data)); // ✅ Convert object values into an array
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        toast.error("Failed to fetch blog posts.");
        setPosts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // ✅ Handle post deletion
  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      toast.success("Post deleted successfully!");
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      toast.error("Failed to delete post.");
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Latest Blog Posts</h1>
        <LogoutButton/>
        {isLoading && <p className="text-center text-gray-600">Fetching blog posts...</p>}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length === 0 && !isLoading && (
            <p className="text-center text-gray-600">No blog posts available.</p>
          )}

          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-blue-500">{post.category}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
                <p className="text-blue-600 font-medium mb-4">By {post.author}</p>
                <p className="text-gray-600 mb-6">{post.content}</p>

                {/* Edit/Delete Buttons */}
                <div className="flex space-x-3">
                  <Link
                    to={`/editpost/${post._id}`}
                    className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/create"
            className="inline-block px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Create New Post
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;