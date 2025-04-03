import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../lib/store';

const Login = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    height: '',
    weight: '',
    goal: 'weight_loss',
    activity_level: 'moderate'
  });
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      const { email, password } = formData;
      
      if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
      }

      if (isSignUp) {
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        if (authData.user) {
          setMessage('Please check your email for verification link.');
          setUser(authData.user);
          navigate('/diet-plan');
        }
      } else {
        const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (signInError) throw signInError;
        if (user) {
          setUser(user);
          navigate('/diet-plan');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="pt-24 pb-16 bg-gray-900 min-h-screen">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-black rounded-lg p-8">
          <div className="flex items-center justify-center mb-6">
            <h1 className="text-3xl font-bold text-white">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-500/10 border border-green-500 text-green-500 p-3 rounded-lg mb-4">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                />
                <User className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                  required
                  minLength={6}
                />
                <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <p className="text-sm text-gray-400 mt-1">Password must be at least 6 characters long</p>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                setMessage(null);
              }}
              className="text-gray-400 hover:text-white transition duration-300"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;