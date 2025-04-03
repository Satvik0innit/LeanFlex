import React, { useState } from 'react';
import { Dumbbell, Clock, Flame, ChevronDown, ChevronUp } from 'lucide-react';

const workouts = [
  {
    title: 'Beginner Full Body',
    duration: '45 mins',
    calories: '300-400',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    description: 'Perfect for those just starting their fitness journey',
    details: [
      '3 sets of 12 Push-ups',
      '3 sets of 15 Squats',
      '3 sets of 10 Dumbbell Rows',
      '3 sets of 20 Lunges',
      '3 sets of 30-second Planks'
    ]
  },
  {
    title: 'HIIT Cardio Blast',
    duration: '30 mins',
    calories: '400-500',
    image: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    description: 'High-intensity interval training for maximum fat burn',
    details: [
      '45 seconds Jump Rope',
      '45 seconds Burpees',
      '45 seconds Mountain Climbers',
      '45 seconds High Knees',
      '15 seconds Rest',
      'Repeat 6 times'
    ]
  },
  {
    title: 'Strength Training',
    duration: '60 mins',
    calories: '450-550',
    image: 'https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    description: 'Build muscle and increase strength with this comprehensive program',
    details: [
      '4 sets of 8 Deadlifts',
      '4 sets of 8 Bench Press',
      '3 sets of 12 Shoulder Press',
      '3 sets of 12 Bent-Over Rows',
      '3 sets of 15 Dumbbell Curls'
    ]
  }
];

const WorkoutPlans = () => {
  const [expandedWorkout, setExpandedWorkout] = useState<number | null>(null);

  const toggleWorkout = (index: number) => {
    setExpandedWorkout(expandedWorkout === index ? null : index);
  };

  return (
    <div className="pt-24 pb-16 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Workout Plans</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {workouts.map((workout, index) => (
            <div 
              key={index}
              className="bg-black rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img 
                src={workout.image} 
                alt={workout.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">{workout.title}</h3>
                <p className="text-gray-400 mb-4">{workout.description}</p>
                <div className="flex items-center space-x-4 text-gray-300">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{workout.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Flame size={16} className="mr-1" />
                    <span>{workout.calories} cal</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleWorkout(index)}
                  className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center"
                >
                  {expandedWorkout === index ? (
                    <>
                      Hide Details
                      <ChevronUp size={20} className="ml-2" />
                    </>
                  ) : (
                    <>
                      View Details
                      <ChevronDown size={20} className="ml-2" />
                    </>
                  )}
                </button>
                {expandedWorkout === index && (
                  <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Workout Details:</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-1">
                      {workout.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlans;