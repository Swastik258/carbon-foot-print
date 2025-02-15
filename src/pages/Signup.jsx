import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

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
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      await updateProfile(userCredential.user, {
        displayName: formData.name
      });

      await sendEmailVerification(userCredential.user);

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        createdAt: new Date(),
        habits: [],
        preferences: {
          theme: 'light',
          notifications: true
        },
      });

      navigate('/email-verification');
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
        {/* Mobile Navigation */}
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
            {/* Desktop Back Button */}
            <button 
              onClick={() => navigate('/')}
              className="hidden lg:flex items-center text-emerald-600 hover:text-emerald-700 text-sm mb-2"
            >
              ← Back to Home
            </button>

            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-emerald-900">Create Account</h2>
              <p className="mt-1 text-sm text-emerald-600">Join our community of eco-warriors</p>
            </div>

            {error && <p className="text-red-500 text-sm p-2 bg-red-50 rounded-lg">{error}</p>}

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
                className="w-full bg-emerald-500 text-white py-2 rounded-lg shadow hover:shadow-lg transition-all hover:scale-[1.02] text-sm"
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

                <div className="mt-2">
                  <button
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-emerald-700 text-sm font-medium hover:text-emerald-800 underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;