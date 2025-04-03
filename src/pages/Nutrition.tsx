import React, { useState } from 'react';
import { Apple, Users } from 'lucide-react';

const Nutrition = () => {
  const [ageGroup, setAgeGroup] = useState<'young' | 'older'>('young');

  const nutritionAdvice = {
    young: {
      title: "Nutrition for Young Adults (18-35)",
      tips: [
        "Prioritize lean proteins for muscle growth and recovery",
        "Complex carbohydrates for sustained energy",
        "Healthy fats for hormone regulation",
        "Stay hydrated with 2-3 liters of water daily",
        "Pre and post-workout nutrition timing"
      ],
      meals: [
        "Breakfast: Oatmeal with protein powder and berries",
        "Lunch: Grilled chicken salad with quinoa",
        "Dinner: Salmon with sweet potato and vegetables",
        "Snacks: Greek yogurt, nuts, fruit"
      ]
    },
    older: {
      title: "Nutrition for Older Adults (36+)",
      tips: [
        "Focus on protein for muscle maintenance",
        "Calcium-rich foods for bone health",
        "Omega-3 fatty acids for joint health",
        "Increased fiber intake for digestion",
        "Anti-inflammatory foods and antioxidants"
      ],
      meals: [
        "Breakfast: Whole grain toast with eggs and avocado",
        "Lunch: Mediterranean bowl with chickpeas",
        "Dinner: Lean beef stir-fry with brown rice",
        "Snacks: Cottage cheese, almonds, vegetables"
      ]
    }
  };

  const selectedAdvice = ageGroup === 'young' ? nutritionAdvice.young : nutritionAdvice.older;

  return (
    <div className="pt-24 pb-16 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Nutritional Advice</h1>
        
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setAgeGroup('young')}
            className={`px-6 py-3 rounded-lg flex items-center ${
              ageGroup === 'young' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Users size={20} className="mr-2" />
            Young Adults
          </button>
          <button
            onClick={() => setAgeGroup('older')}
            className={`px-6 py-3 rounded-lg flex items-center ${
              ageGroup === 'older' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <Users size={20} className="mr-2" />
            Older Adults
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-black rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              {selectedAdvice.title}
            </h2>
            <ul className="space-y-3">
              {selectedAdvice.tips.map((tip, index) => (
                <li key={index} className="flex items-start text-gray-300">
                  <Apple size={20} className="mr-2 mt-1 flex-shrink-0 text-red-600" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-black rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Sample Meal Plan
            </h2>
            <ul className="space-y-4">
              {selectedAdvice.meals.map((meal, index) => (
                <li key={index} className="text-gray-300">
                  <span className="font-semibold text-red-600">
                    {meal.split(': ')[0]}:
                  </span>{' '}
                  {meal.split(': ')[1]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;