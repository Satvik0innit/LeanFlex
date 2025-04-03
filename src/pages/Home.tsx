import React from 'react';
import { ArrowRight, Dumbbell, Utensils} from 'lucide-react';
import { Link } from 'react-router-dom';
import BMICalculator from './BMICalculator';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      
      <div 
        className="h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80")'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="flex items-center justify-center mb-6">
              <Dumbbell size={48} className="text-red-600 mr-3" />
              <h1 className="text-5xl font-bold text-white">
                Lean<span className="text-red-600">Flex</span>
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-4">
              Transform your body, transform your life.              
            </p>
            <p className="text-2xl text-gray-300 mb-4">
              Always REMEMBER
            </p>
            <p className="text-xl text-gray-300 mb-8">
              workout is just 30% of the whole transfomation, diet is 60% and your daily activity is the rest 10%.
            </p>
            <Link
              to="/login"
              className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300 inline-flex items-center"
            >
              Start Your Journey <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Why Choose Lean<span className='text-red-600'>Flex?</span></h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Dumbbell size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Workout suggestions</h3>
              <p className="text-gray-400">Workouts which supports your fitness level and goals</p>
            </div>

            <div className="text-center">
              <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Utensils size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Nutrition Plans</h3>
              <p className="text-gray-400">Personalised diet plan to support your fitness journey</p>
            </div>
          </div>
        </div>
      </div>

      {/* BMI Calculator Section */}
      <div className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16">Calculate Your BMI</h2>
          <BMICalculator />
        </div>
      </div>

      {/* Footer - Updated for better mobile centering */}
      <footer className="bg-black py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center mb-6">
              <Dumbbell size={32} className="text-red-600 mr-2" />
              <span className="text-2xl font-bold text-white">
                Lean<span className="text-red-600">Flex</span>
              </span>
            </div>

            <p className="text-white mb-2">
              Made by - <span className='text-xl font-bold text-primary'>Satvik Sharma <span className="text-white">and </span>Vijay Indra Tejas</span>
            </p>
            <p className="text-white">
              © 2025 LeanFlex. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
