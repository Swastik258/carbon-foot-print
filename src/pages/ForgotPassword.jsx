import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset link sent! Check your email');
      setTimeout(() => navigate('/login'), 5000);
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
              Recover Your Account
            </h1>
            <p className="text-emerald-100 text-base max-w-md">
              Don't worry, we'll help you get back to tracking your eco-friendly habits.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Reset Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-gradient-to-b from-green-50 to-emerald-50">
        <nav className="lg:hidden w-full bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌱</span>
              <span className="text-base font-bold text-emerald-800">EcoTrack</span>
            </div>
            <button 
              onClick={() => navigate('/login')}
              className="text-emerald-600 hover:text-emerald-700 text-sm"
            >
              ← Back to Login
            </button>
          </div>
        </nav>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md space-y-4">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-emerald-900">Reset Password</h2>
              <p className="mt-1 text-sm text-emerald-600">
                Enter your email to receive a password reset link
              </p>
            </div>

            {message && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-green-600 text-sm text-center">{message}</p>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-500 text-sm text-center">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-emerald-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full p-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 text-white py-2 rounded-lg shadow hover:shadow-lg transition-all hover:scale-105 text-sm"
              >
                Send Reset Link
              </button>

              <div className="text-center">
                <p className="text-emerald-600 text-sm">
                  Remember your password?{' '}
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

export default ForgotPassword;