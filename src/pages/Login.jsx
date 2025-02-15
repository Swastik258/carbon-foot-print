import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase Auth function
import { auth } from '../firebaseConfig'; // Import Firebase Auth instance

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/dashboard'); // Redirect on success
    } catch (err) {
      setError("Invalid email or password"); // Display error message
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex">
  {/* Left Side - Image Section */}
  <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/60 to-transparent z-10" />
        
        {/* Background Image - Using a different Unsplash nature image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2560&auto=format&fit=crop')`
          }}
        />
        
        {/* Content overlay */}
        <div className="relative z-20 p-12 flex flex-col justify-between w-full">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🌱</span>
            <span className="text-2xl font-bold text-white">EcoTrack</span>
          </div>
          
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome Back!
            </h1>
            <p className="text-emerald-100 text-lg max-w-md">
              Continue your journey towards a sustainable future. Every small action counts.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-gradient-to-b from-green-50 to-emerald-50">
        {/* Mobile Nav (visible on small screens) */}
        <nav className="lg:hidden w-full bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌱</span>
              <span className="text-lg font-bold text-emerald-800">EcoTrack</span>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="text-emerald-600 hover:text-emerald-700 text-sm"
            >
              ← Back
            </button>
          </div>
        </nav>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            {/* Desktop Back Button */}
            <div className="hidden lg:block">
              <button 
                onClick={() => navigate('/')}
                className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2 mb-8"
              >
                ← Back to home
              </button>
            </div>

            {/* Form Header */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-emerald-900">Welcome Back</h2>
              <p className="mt-3 text-emerald-600">Login to continue your eco journey</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-emerald-700 mb-1 ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">📧</span>
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/70 backdrop-blur-md border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-emerald-700 mb-1 ml-1">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">🔒</span>
                    <input
                      id="password"
                      type="password"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/70 backdrop-blur-md border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-emerald-500 focus:ring-emerald-500 border-emerald-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-emerald-700">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-sm text-emerald-700 hover:text-emerald-800"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group font-medium"
              >
                Sign In
                <span className="group-hover:rotate-12 transition-transform">🌿</span>
              </button>

              <div className="text-center">
                <p className="text-emerald-600">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/signup')}
                    className="text-emerald-700 font-semibold hover:text-emerald-800 transition-colors"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>} {/* Error message */}
    </div>
  );
};

export default Login;
