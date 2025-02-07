import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, OAuthProvider } from 'firebase/auth';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSocialSignup = async (provider) => {
    try {
      let authProvider;
      switch (provider) {
        case 'google':
          authProvider = new GoogleAuthProvider();
          break;
        case 'facebook':
          authProvider = new FacebookAuthProvider();
          break;
        case 'microsoft':
          authProvider = new OAuthProvider('microsoft.com');
          break;
        default:
          return;
      }
      await signInWithPopup(auth, authProvider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/60 to-transparent z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop')`
          }}
        />
        <div className="relative z-20 p-8 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🌱</span>
            <span className="text-xl font-bold text-white">EcoTrack</span>
          </div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              Join the Green Revolution
            </h1>
            <p className="text-emerald-100 text-base max-w-md">
              Together, we can make a difference. Track your carbon footprint and help save our planet.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-gradient-to-b from-green-50 to-emerald-50">
        <nav className="lg:hidden w-full bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌱</span>
              <span className="text-base font-bold text-emerald-800">EcoTrack</span>
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
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md space-y-4">
            <div className="hidden lg:block">
              <button 
                onClick={() => navigate('/')}
                className="text-emerald-600 hover:text-emerald-700 flex items-center gap-2 mb-4"
              >
                ← Back to home
              </button>
            </div>

            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-emerald-900">Create Account</h2>
              <p className="mt-1 text-sm text-emerald-600">Join our community of eco-warriors</p>
            </div>

            {error && <p className="text-red-500 text-xs">{error}</p>}

            {/* Social Media Signup */}
            <div className="space-y-3">
              <button
                onClick={() => handleSocialSignup('google')}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 p-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>

              {/* <button
                onClick={() => handleSocialSignup('facebook')}
                className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white p-2 rounded-lg hover:bg-[#1874E8] transition-colors text-sm font-medium"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 011-1h3v-4h-3a5 5 0 00-5 5v2.01h-2l-.396 3.98h2.396v8.01z" />
                </svg>
                Continue with Facebook
              </button> */}

              {/* <button
                onClick={() => handleSocialSignup('microsoft')}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 p-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#f25022" d="M1 1h10v10H1z"/>
                  <path fill="#00a4ef" d="M1 13h10v10H1z"/>
                  <path fill="#7fba00" d="M13 1h10v10H13z"/>
                  <path fill="#ffb900" d="M13 13h10v10H13z"/>
                </svg>
                Continue with Microsoft
              </button> */}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gradient-to-b from-green-50 to-emerald-50 text-gray-500">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-emerald-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full p-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-emerald-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full p-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-xs font-medium text-emerald-700 mb-1">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    className="w-full p-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-xs font-medium text-emerald-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    className="w-full p-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 text-white py-2 rounded-lg shadow hover:shadow-lg transition-all hover:scale-105 text-sm"
              >
                Create Account
              </button>

              <div className="text-center">
                <p className="text-emerald-600 text-sm">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-emerald-700 font-semibold hover:text-emerald-800"
                  >
                    Log in
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;