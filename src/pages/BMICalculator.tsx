import React, { useState } from 'react';
import { Scale, ArrowRight } from 'lucide-react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState<number | null>(null);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);
    setBMI(parseFloat(calculatedBMI.toFixed(1)));
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500' };
    if (bmi < 25) return { category: 'Normal weight', color: 'text-green-500' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-500' };
    return { category: 'Obese', color: 'text-red-500' };
  };

  return (
    <div className="pt-24 pb-16 bg-gray-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-black rounded-lg p-8">
          <div className="flex items-center mb-6">
            <Scale size={32} className="text-red-600 mr-3" />
            <h1 className="text-3xl font-bold text-white">BMI Calculator</h1>
          </div>

          <form onSubmit={calculateBMI} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center"
            >
              Calculate BMI
              <ArrowRight size={20} className="ml-2" />
            </button>
          </form>

          {bmi !== null && (
            <div className="mt-8 p-6 bg-gray-800 rounded-lg">
              <h2 className="text-2xl font-bold text-white mb-4">Your Results</h2>
              <div className="space-y-2">
                <p className="text-gray-300">
                  Your BMI is: <span className="text-white font-bold">{bmi}</span>
                </p>
                <p className="text-gray-300">
                  Category:{' '}
                  <span className={`font-bold ${getBMICategory(bmi).color}`}>
                    {getBMICategory(bmi).category}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;