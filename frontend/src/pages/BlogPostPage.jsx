import { useState ,useEffect} from 'react';
import { Link, Navigate } from 'react-router-dom';
import React from 'react';
import { allPosts, logoutUser } from '../services/blogApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import RoleButton from '../components/RoleButton';


const BlogPostPage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch posts on component mount
  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await allPosts();
  
        if (response.data && typeof response.data === 'object') {
          setPosts(Object.values(response.data)); // ✅ Converts object values into an array
        } else {
          console.error("Unexpected response format:", response.data);
          setPosts([]); // ✅ Prevents errors
        }
      } catch (error) {
        toast.error("Error fetching blog posts.");
        setPosts([]); // ✅ Ensures `posts` is always an array
      }
    };
  
    getPosts();
  }, []); 

  // ✅ Logout function
  const handleLogout = async () => {
    try {
      const response = await logoutUser();
  
      if (!response || !response.data?.success) { // ✅ Prevent `undefined` errors
        console.warn("⚠️ Logout API response missing, assuming success.");
      }
  
  
      // ✅ Ensure proper token removal
      localStorage.removeItem("token");
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  
      toast.success("✅ Logged out successfully!");
      navigate("/login", { replace: true });
  
    } catch (error) {
      toast.error("❌ Failed to log out. Please try again.");
    }
  };
  
  return (
    <div className="min-h-screen p-0 bg-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Latest Blog Posts</h1>
        <div className=" w-full gap-1 flex justify-end">
            <button className="bg-sky-300 rounded-md w-20 px-3 py-2  text-sm mb-7 inline-block " onClick={handleLogout} >Logout</button>
            <RoleButton />

        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div 
              key={post._id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-blue-500">{post.category}</span>
                  <span className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString('en-US', {
                                     year: 'numeric',
                                     month: 'long',
                                     day: 'numeric'
                                     })}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2> 
                <p className="text-blue-600 font-medium mb-4">By<br />
                  {post.author}</p>
                <p className="text-gray-600 mb-6">{post.content}</p>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ); 
};

export default BlogPostPage;