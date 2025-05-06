import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:3000'; // Update with your backend URL

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return response.data; 
  } catch (error) {
    throw error;
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await axios.get(`${API_URL}/users/logout`, {}, { withCredentials: true });
    
    // ✅ Remove token from localStorage
    localStorage.removeItem("token");

    // ✅ Manually clear cookie (if not automatically removed)
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    toast.success("✅ Logged out successfully!");
    
  } catch (error) {
    toast.error(`🚨 ${error.response?.data?.message || "Logout failed!"}`);
  }
};




// Get current user
export const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/me`, config);
  return response.data;
};




// Get all posts
export const allPosts = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("❌ Authentication required to fetch posts.");
  }

  try {
    const response = await axios.get(`${API_URL}/posts/allposts`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;

  } catch (error) {
    const errorMessage = error.response?.data?.message || "Error fetching posts";
    throw error;
  }
};

// Get single post
export const getPost = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create post
export const createPost = async (postData) => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    toast.error("🚨 You must be logged in to create a post!");
    throw new Error("❌ Missing authentication token");
  }

  try {
    const response = await axios.post(`${API_URL}/posts/createpost`, postData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    toast.success("✅ Post created successfully!");
    return response.data;

  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to create post";
    toast.error(`🚨 ${errorMessage}`);
    throw error;
  }
};

export const getPostById = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${postId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      withCredentials: true,
    });

    console.log("✅ Fetched Post Data:", response.data);
    return response.data;

  } catch (error) {
    const errorMessage = error.response?.data?.message || "Error fetching post";
    toast.error(`🚨 ${errorMessage}`);
    throw error;
  }
};


// Update post
export const updatePost = async (postId, postData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("🚨 You must be logged in to update a post!");
    throw new Error("❌ Missing authentication token");
  }

  try {
    const response = await axios.put(`${API_URL}/posts/${postId}`, postData, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("🚨 Update Post API Error:", error.response?.data?.message || "Failed to update post");
    throw error;
  }
};
// Delete post

export const deletePost = async (postId) => {
  const token = localStorage.getItem("token"); // ✅ Retrieve token from localStorage

  if (!token) {
    throw new Error("❌ Authentication required to delete a post.");
  }

  try {    
    const response = await axios.delete(`${API_URL}/posts/${postId}`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return response.data;

  } catch (error) {
    const errorMessage = error.response?.data?.message || "Error deleting post";
    console.error("🚨 Delete Post API Error:", errorMessage);
    throw new Error(errorMessage);
  }
};

//// to fetch user 
// export const fetchUserRoleAndPosts = async () => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     console.error("🚨 Missing authentication token!");
//     throw new Error("❌ Authentication required to fetch posts.");
//   }

//   try {
//     const response = await axios.get(`${API_URL}/posts/allposts`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       withCredentials: true,
//     });


//     // Assuming the response contains { posts: [...], role: "admin" }
//     return response.data;

//   } catch (error) {
//     const errorMessage = error.response?.data?.message || "Error fetching posts";
//     console.error("🚨 Fetch Posts API Error:", errorMessage);
//     throw error;
//   }
// };

/////get user Role 
// ✅ Fetch user details including role from the backend
export const getUserRole = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return response.data.role; 
  } catch (error) {
    return null;
  }
};