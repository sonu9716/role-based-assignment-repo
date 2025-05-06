import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterForm from './pages/RegisterForm';
import './App.css';
import LoginForm from './pages/Login';
import BlogPostsPage from './pages/BlogPostPage';
import HomePage from './pages/Homepage';
import CreateBlogPost from './pages/CreateBlogPost';
import AdminDashboard from './pages/AdminDashboard';
import BlogPostEdit from './pages/BlogPostEdit';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div>
        <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/blogpost" element={<BlogPostsPage />} />
        <Route path="/create" element={<CreateBlogPost />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/editpost/:postId" element={<BlogPostEdit />} />





        </Routes>
        <ToastContainer  position="top-right" autoClose={5000}/>

    </div>
  );
}

export default App;