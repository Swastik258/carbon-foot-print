import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { sendEmailVerification, onAuthStateChanged } from 'firebase/auth';

const EmailVerification = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if (user.emailVerified) {
          navigate('/dashboard');
        }
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const resendVerificationEmail = async () => {
    if (countdown > 0) return;
    
    try {
      await sendEmailVerification(auth.currentUser);
      setMessage('Verification email sent! Please check your inbox');
      setCountdown(60); // Start 60 second countdown
      setError('');
    } catch (err) {
      setError(err.message);
      setMessage('');
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  if (!user) return null;

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
              Almost There!
            </h1>
            <p className="text-emerald-100 text-base max-w-md">
              Verify your email to start your eco-friendly journey with us.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Verification Content */}
      <div className="w-full lg:w-1/2 flex flex-col bg-gradient-to-b from-green-50 to-emerald-50">
        <nav className="lg:hidden w-full bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🌱</span>
              <span className="text-base font-bold text-emerald-800">EcoTrack</span>
            </div>
          </div>
        </nav>

        {/* Content Container */}
        <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-emerald-900">Verify Your Email</h2>
              <p className="mt-2 text-sm text-emerald-600">
                We've sent a verification email to{' '}
                <span className="font-medium">{user.email}</span>
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

            <div className="bg-white rounded-lg p-6 shadow-sm border border-emerald-100">
              <h3 className="text-lg font-medium text-emerald-900 mb-2">
                Next Steps:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-emerald-700">
                <li>Check your email inbox</li>
                <li>Click the verification link in the email</li>
                <li>Return to this page and refresh</li>
              </ol>
            </div>

            <div className="space-y-4">
              <button
                onClick={resendVerificationEmail}
                disabled={countdown > 0}
                className="w-full bg-emerald-500 text-white py-2 rounded-lg shadow hover:shadow-lg transition-all hover:scale-105 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {countdown > 0 
                  ? `Resend available in ${countdown}s` 
                  : 'Resend Verification Email'}
              </button>

              <div className="text-center">
                <button
                  onClick={handleSignOut}
                  className="text-emerald-600 text-sm hover:text-emerald-700"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;