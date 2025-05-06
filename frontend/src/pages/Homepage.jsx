import { Link } from 'react-router-dom';
import React from 'react';
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-indigo-600">Postly</div>
        <div className="flex space-x-4">
          <Link 
            to="/login" 
            className="px-4 py-2 text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Find Your <span className="text-indigo-600">Peace</span> of Mind
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-10">
          Join our community to discover mindfulness techniques, connect with others, 
          and find balance in your daily life.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/register"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            I Have an Account
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Postly . All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;