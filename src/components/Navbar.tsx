import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../lib/store';
import { supabase } from '../lib/supabase';

const Navbar = () => {
  const { user, setUser } = useAuthStore();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav className="bg-black py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Dumbbell size={32} className="text-red-600" />
          <span className="text-white text-2xl font-bold">
            Lean<span className="text-red-600">Flex</span>
          </span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/workout-plans" className="text-white hover:text-red-500">Workouts</Link>
          <Link to="/nutrition" className="text-white hover:text-red-500">Nutrition</Link>
          <Link to="/contact" className="text-white hover:text-red-500">Contact</Link>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link 
                to="/diet-plan" 
                className="text-white hover:text-red-500 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Personalised Diet Plan
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-white hover:text-red-500"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="flex items-center space-x-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              <User size={20} />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;