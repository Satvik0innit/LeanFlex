import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { useAuthStore } from './lib/store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WorkoutPlans from './pages/WorkoutPlans';
import Nutrition from './pages/Nutrition';
import Contact from './pages/Contact';
import Login from './pages/Login';
import DietPlan from './pages/DietPlan';

function App() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout-plans" element={<WorkoutPlans />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/diet-plan" element={<DietPlan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;