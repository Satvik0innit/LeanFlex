import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Utensils, Activity, Scale, Target, Dumbbell, ChevronDown, ChevronUp, Clock, Users, User } from 'lucide-react';
import { useAuthStore } from '../lib/store';

interface Meal {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  options: {
    veg: Array<{
      name: string;
      ingredients: Array<{
        item: string;
        amount: string;
      }>;
      recipe?: {
        instructions: string[];
        cookingTime: string;
        servings: number;
      };
      macros: {
        protein: number;
        carbs: number;
        fats: number;
      };
    }>;
    nonVeg?: Array<{
      name: string;
      ingredients: Array<{
        item: string;
        amount: string;
      }>;
      recipe?: {
        instructions: string[];
        cookingTime: string;
        servings: number;
      };
      macros: {
        protein: number;
        carbs: number;
        fats: number;
      };
    }>;
  };
}

const DietPlan = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [height, setHeight] = useState<number>(170);
  const [weight, setWeight] = useState<number>(70);
  const [age, setAge] = useState<number>(25);
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'moderate' | 'active'>('moderate');
  const [goal, setGoal] = useState<'weight_loss' | 'muscle_gain' | 'maintenance'>('weight_loss');
  const [dietType, setDietType] = useState<'veg' | 'non-veg'>('veg');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);

  if (!user) {
    navigate('/login');
    return null;
  }

  const days = [
    'Day 1',
    'Day 2',
    'Day 3',
    'Day 4',
    'Day 5',
    'Day 6',
    'Day 7'
  ];

  // Calculate BMR using Mifflin-St Jeor Equation
  const calculateBMR = () => {
    return (10 * weight) + (6.25 * height) - (5 * age) + 5; // For men
  };

  // Calculate TDEE (Total Daily Energy Expenditure)
  const calculateTDEE = () => {
    const bmr = calculateBMR();
    const activityMultipliers = {
      sedentary: 1.2,
      moderate: 1.55,
      active: 1.725
    };
    return Math.round(bmr * activityMultipliers[activityLevel]);
  };

  // Calculate target calories based on goal
  const calculateTargetCalories = () => {
    const tdee = calculateTDEE();
    switch (goal) {
      case 'weight_loss':
        return Math.round(tdee * 0.8); // 20% deficit
      case 'muscle_gain':
        return Math.round(tdee * 1.1); // 10% surplus
      default:
        return tdee;
    }
  };

  // Weekly meal plans
  const weeklyMeals = [
    // Day 1 - Indian
    {
      breakfast: {
        veg: { name: 'Masala Dosa with Sambar', protein: 12, carbs: 45, fats: 15 },
        nonVeg: { name: 'Egg Bhurji with Paratha', protein: 20, carbs: 40, fats: 18 }
      },
      lunch: {
        veg: { name: 'Dal Makhani with Jeera Rice', protein: 18, carbs: 60, fats: 15 },
        nonVeg: { name: 'Butter Chicken with Naan', protein: 35, carbs: 45, fats: 22 }
      },
      snacks: {
        veg: { name: 'Samosa with Mint Chutney', protein: 6, carbs: 30, fats: 12 },
        nonVeg: { name: 'Chicken Tikka', protein: 25, carbs: 5, fats: 8 }
      },
      dinner: {
        veg: { name: 'Palak Paneer with Roti', protein: 20, carbs: 40, fats: 15 },
        nonVeg: { name: 'Fish Curry with Rice', protein: 30, carbs: 45, fats: 12 }
      }
    },
    
    {
      breakfast: {
        veg: { name: 'Poha with Curd', protein: 10, carbs: 40, fats: 8 },
        nonVeg: { name: 'Omelette with Whole Wheat Toast', protein: 22, carbs: 35, fats: 14 }
      },
      lunch: {
        veg: { name: 'Rajma with Brown Rice', protein: 20, carbs: 55, fats: 12 },
        nonVeg: { name: 'Grilled Chicken with Quinoa', protein: 40, carbs: 50, fats: 10 }
      },
      snacks: {
        veg: { name: 'Sprouts Chaat', protein: 12, carbs: 25, fats: 5 },
        nonVeg: { name: 'Turkey Sandwich', protein: 30, carbs: 35, fats: 8 }
      },
      dinner: {
        veg: { name: 'Baingan Bharta with Roti', protein: 15, carbs: 40, fats: 10 },
        nonVeg: { name: 'Grilled Salmon with Mashed Potatoes', protein: 35, carbs: 45, fats: 12 }
      }
    },
    {
      breakfast: {
        veg: { name: 'Idli with Coconut Chutney', protein: 8, carbs: 50, fats: 10 },
        nonVeg: { name: 'Scrambled Eggs with Avocado Toast', protein: 25, carbs: 40, fats: 18 }
      },
      lunch: {
        veg: { name: 'Chickpea Salad with Hummus', protein: 18, carbs: 45, fats: 15 },
        nonVeg: { name: 'Beef Steak with Sautéed Vegetables', protein: 45, carbs: 20, fats: 20 }
      },
      snacks: {
        veg: { name: 'Peanut Butter with Banana', protein: 10, carbs: 35, fats: 12 },
        nonVeg: { name: 'Chicken Wings', protein: 28, carbs: 5, fats: 18 }
      },
      dinner: {
        veg: { name: 'Paneer Bhurji with Paratha', protein: 22, carbs: 50, fats: 15 },
        nonVeg: { name: 'Shrimp Stir Fry with Brown Rice', protein: 38, carbs: 48, fats: 10 }
      }
    },
    {
      breakfast: {
        veg: { name: 'Upma with Vegetables', protein: 12, carbs: 45, fats: 10 },
        nonVeg: { name: 'Protein Pancakes with Honey', protein: 30, carbs: 50, fats: 12 }
      },
      lunch: {
        veg: { name: 'Dal Tadka with Roti', protein: 20, carbs: 55, fats: 10 },
        nonVeg: { name: 'Grilled Fish with Couscous', protein: 38, carbs: 50, fats: 12 }
      },
      snacks: {
        veg: { name: 'Roasted Chana with Jaggery', protein: 12, carbs: 30, fats: 5 },
        nonVeg: { name: 'Egg Salad Sandwich', protein: 28, carbs: 35, fats: 10 }
      },
      dinner: {
        veg: { name: 'Vegetable Biryani with Raita', protein: 18, carbs: 55, fats: 12 },
        nonVeg: { name: 'Lamb Curry with Naan', protein: 40, carbs: 50, fats: 18 }
      }
    },
    {
      breakfast: {
        veg: { name: 'Dhokla with Green Chutney', protein: 10, carbs: 40, fats: 8 },
        nonVeg: { name: 'Bacon with Scrambled Eggs', protein: 35, carbs: 10, fats: 25 }
      },
      lunch: {
        veg: { name: 'Bhindi Masala with Roti', protein: 15, carbs: 50, fats: 12 },
        nonVeg: { name: 'BBQ Chicken with Baked Sweet Potato', protein: 40, carbs: 45, fats: 15 }
      },
      snacks: {
        veg: { name: 'Fox Nuts (Makhana) with Nuts', protein: 10, carbs: 25, fats: 8 },
        nonVeg: { name: 'Tuna Salad', protein: 30, carbs: 10, fats: 15 }
      },
      dinner: {
        veg: { name: 'Stuffed Capsicum with Gravy', protein: 20, carbs: 45, fats: 10 },
        nonVeg: { name: 'Roast Turkey with Mashed Potatoes', protein: 38, carbs: 50, fats: 15 }
      }
    },
    {
      breakfast: {
        veg: { name: 'Paratha with Curd', protein: 12, carbs: 50, fats: 15 },
        nonVeg: { name: 'Sausage and Eggs with Toast', protein: 35, carbs: 40, fats: 18 }
      },
      lunch: {
        veg: { name: 'Aloo Gobi with Roti', protein: 12, carbs: 50, fats: 10 },
        nonVeg: { name: 'Grilled Duck with Brown Rice', protein: 42, carbs: 50, fats: 15 }
      },
      snacks: {
        veg: { name: 'Chia Pudding with Almonds', protein: 12, carbs: 30, fats: 10 },
        nonVeg: { name: 'Ham and Cheese Sandwich', protein: 35, carbs: 40, fats: 12 }
      },
      dinner: {
        veg: { name: 'Matar Paneer with Jeera Rice', protein: 22, carbs: 50, fats: 12 },
        nonVeg: { name: 'Prawn Curry with Rice', protein: 38, carbs: 55, fats: 12 }
      }
    },
    {
      breakfast: {
        veg: { name: 'Besan Chilla with Green Chutney', protein: 15, carbs: 40, fats: 10 },
        nonVeg: { name: 'Chicken Sausage with Scrambled Eggs', protein: 40, carbs: 30, fats: 18 }
      },
      lunch: {
        veg: { name: 'Chole Bhature', protein: 18, carbs: 60, fats: 20 },
        nonVeg: { name: 'Beef Stir Fry with Rice', protein: 45, carbs: 55, fats: 12 }
      },
      snacks: {
        veg: { name: 'Greek Yogurt with Fruits', protein: 15, carbs: 30, fats: 5 },
        nonVeg: { name: 'Chicken Skewers', protein: 35, carbs: 10, fats: 8 }
      },
      dinner: {
        veg: { name: 'Mushroom Tikka with Roti', protein: 20, carbs: 45, fats: 10 },
        nonVeg: { name: 'Grilled Lobster with Garlic Butter', protein: 40, carbs: 30, fats: 15 }
      }
    }
  ];
  const mealPlans = {
    weight_loss: weeklyMeals, 
  
    muscle_gain: [
      // Day 1 - High Protein
      {
        breakfast: {
          veg: { name: 'Paneer Bhurji with Whole Wheat Paratha', protein: 30, carbs: 50, fats: 20 },
          nonVeg: { name: '6 Egg Whites Omelette with Cheese and Multigrain Toast', protein: 40, carbs: 45, fats: 25 }
        },
        lunch: {
          veg: { name: 'Soya Chunk Curry with Brown Rice', protein: 35, carbs: 60, fats: 15 },
          nonVeg: { name: 'Grilled Chicken Breast with Sweet Potato Mash', protein: 50, carbs: 55, fats: 20 }
        },
        snacks: {
          veg: { name: 'Peanut Butter and Banana Smoothie with Whey', protein: 30, carbs: 50, fats: 15 },
          nonVeg: { name: 'Tuna Salad with Avocado', protein: 35, carbs: 20, fats: 18 }
        },
        dinner: {
          veg: { name: 'Dal Tadka with Quinoa and Ghee', protein: 25, carbs: 55, fats: 15 },
          nonVeg: { name: 'Grilled Salmon with Jasmine Rice', protein: 45, carbs: 60, fats: 22 }
        }
      },
      // Day 2
      {
        breakfast: {
          veg: { name: 'Besan Chilla with Peanut Butter Toast', protein: 35, carbs: 50, fats: 20 },
          nonVeg: { name: 'Steak and Eggs with Hash Browns', protein: 45, carbs: 40, fats: 30 }
        },
        lunch: {
          veg: { name: 'Rajma with Brown Rice and Curd', protein: 30, carbs: 65, fats: 15 },
          nonVeg: { name: 'BBQ Chicken with Baked Potato', protein: 55, carbs: 60, fats: 18 }
        },
        snacks: {
          veg: { name: 'Cottage Cheese with Nuts and Honey', protein: 25, carbs: 30, fats: 15 },
          nonVeg: { name: 'Boiled Eggs with Whole Grain Crackers', protein: 30, carbs: 35, fats: 18 }
        },
        dinner: {
          veg: { name: 'Palak Paneer with Roti and Ghee', protein: 30, carbs: 50, fats: 20 },
          nonVeg: { name: 'Lamb Chops with Mashed Potatoes', protein: 50, carbs: 55, fats: 25 }
        }
      },
      // Day 3
      {
        breakfast: {
          veg: { name: 'Oats with Whey Protein and Almonds', protein: 40, carbs: 60, fats: 15 },
          nonVeg: { name: 'Chicken Sausage Scramble with Whole Wheat Toast', protein: 45, carbs: 50, fats: 25 }
        },
        lunch: {
          veg: { name: 'Chana Masala with Jeera Rice', protein: 35, carbs: 70, fats: 15 },
          nonVeg: { name: 'Grilled Turkey with Quinoa Salad', protein: 50, carbs: 55, fats: 20 }
        },
        snacks: {
          veg: { name: 'Greek Yogurt with Granola and Berries', protein: 25, carbs: 40, fats: 10 },
          nonVeg: { name: 'Chicken Wrap with Hummus', protein: 35, carbs: 45, fats: 15 }
        },
        dinner: {
          veg: { name: 'Mushroom and Peas Curry with Roti', protein: 30, carbs: 55, fats: 18 },
          nonVeg: { name: 'Grilled Prawns with Garlic Butter Rice', protein: 45, carbs: 65, fats: 22 }
        }
      },
      // Day 4
      {
        breakfast: {
          veg: { name: 'Moong Dal Chilla with Avocado', protein: 35, carbs: 45, fats: 20 },
          nonVeg: { name: 'Egg White Bhurji with Multigrain Paratha', protein: 40, carbs: 50, fats: 22 }
        },
        lunch: {
          veg: { name: 'Dal Makhani with Jeera Rice and Ghee', protein: 30, carbs: 70, fats: 18 },
          nonVeg: { name: 'Beef Steak with Roasted Vegetables', protein: 55, carbs: 40, fats: 25 }
        },
        snacks: {
          veg: { name: 'Protein Shake with Banana', protein: 30, carbs: 45, fats: 5 },
          nonVeg: { name: 'Grilled Chicken Skewers with Tzatziki', protein: 40, carbs: 20, fats: 15 }
        },
        dinner: {
          veg: { name: 'Soya Biryani with Raita', protein: 35, carbs: 65, fats: 15 },
          nonVeg: { name: 'Fish Curry with Brown Rice', protein: 45, carbs: 60, fats: 20 }
        }
      },
      // Day 5
      {
        breakfast: {
          veg: { name: 'Uthappam with Sambar and Coconut Chutney', protein: 30, carbs: 65, fats: 15 },
          nonVeg: { name: 'Omelette with Cheese and Whole Wheat Toast', protein: 45, carbs: 50, fats: 30 }
        },
        lunch: {
          veg: { name: 'Mixed Dal with Roti and Salad', protein: 35, carbs: 60, fats: 15 },
          nonVeg: { name: 'Grilled Chicken with Pasta in White Sauce', protein: 50, carbs: 70, fats: 25 }
        },
        snacks: {
          veg: { name: 'Sprouts Salad with Flax Seeds', protein: 25, carbs: 35, fats: 10 },
          nonVeg: { name: 'Tuna Sandwich with Mayonnaise', protein: 35, carbs: 45, fats: 20 }
        },
        dinner: {
          veg: { name: 'Vegetable Khichdi with Curd', protein: 30, carbs: 65, fats: 12 },
          nonVeg: { name: 'Mutton Curry with Naan', protein: 50, carbs: 60, fats: 25 }
        }
      },
      // Day 6
      {
        breakfast: {
          veg: { name: 'Quinoa Upma with Vegetables', protein: 35, carbs: 55, fats: 15 },
          nonVeg: { name: 'Scrambled Eggs with Smoked Salmon', protein: 40, carbs: 30, fats: 30 }
        },
        lunch: {
          veg: { name: 'Paneer Tikka Masala with Roti', protein: 40, carbs: 60, fats: 20 },
          nonVeg: { name: 'Grilled Duck with Wild Rice', protein: 55, carbs: 65, fats: 22 }
        },
        snacks: {
          veg: { name: 'Protein Bar with Almond Milk', protein: 25, carbs: 40, fats: 10 },
          nonVeg: { name: 'Chicken Quesadilla with Guacamole', protein: 45, carbs: 50, fats: 25 }
        },
        dinner: {
          veg: { name: 'Dal Fry with Jeera Rice', protein: 30, carbs: 70, fats: 15 },
          nonVeg: { name: 'Grilled Lobster with Garlic Butter Potatoes', protein: 50, carbs: 55, fats: 30 }
        }
      },
      // Day 7
      {
        breakfast: {
          veg: { name: 'Dosa with Peanut Chutney and Sambar', protein: 30, carbs: 65, fats: 18 },
          nonVeg: { name: 'Bacon and Eggs with Hash Browns', protein: 45, carbs: 50, fats: 35 }
        },
        lunch: {
          veg: { name: 'Chole with Bhature and Salad', protein: 35, carbs: 75, fats: 20 },
          nonVeg: { name: 'Beef Burger with Sweet Potato Fries', protein: 55, carbs: 70, fats: 30 }
        },
        snacks: {
          veg: { name: 'Cottage Cheese with Fruits', protein: 25, carbs: 40, fats: 5 },
          nonVeg: { name: 'Hard Boiled Eggs with Whole Wheat Bread', protein: 35, carbs: 45, fats: 15 }
        },
        dinner: {
          veg: { name: 'Malai Kofta with Naan', protein: 30, carbs: 65, fats: 25 },
          nonVeg: { name: 'Grilled Chicken with Mushroom Risotto', protein: 50, carbs: 70, fats: 25 }
        }
      }
    ],
  
    maintenance: [
      // Day 1 - Balanced
      {
        breakfast: {
          veg: { name: 'Masala Oats with Nuts', protein: 20, carbs: 50, fats: 15 },
          nonVeg: { name: 'Scrambled Eggs with Whole Wheat Toast', protein: 25, carbs: 40, fats: 18 }
        },
        lunch: {
          veg: { name: 'Dal Tadka with Roti and Salad', protein: 25, carbs: 55, fats: 12 },
          nonVeg: { name: 'Grilled Chicken with Brown Rice', protein: 35, carbs: 50, fats: 15 }
        },
        snacks: {
          veg: { name: 'Fruit Salad with Yogurt', protein: 10, carbs: 30, fats: 5 },
          nonVeg: { name: 'Boiled Eggs with Whole Grain Crackers', protein: 20, carbs: 25, fats: 10 }
        },
        dinner: {
          veg: { name: 'Vegetable Pulao with Raita', protein: 20, carbs: 55, fats: 12 },
          nonVeg: { name: 'Fish Curry with Rice', protein: 30, carbs: 50, fats: 15 }
        }
      },
      // Day 2
      {
        breakfast: {
          veg: { name: 'Poha with Peanuts and Curd', protein: 15, carbs: 50, fats: 10 },
          nonVeg: { name: 'Omelette with Multigrain Toast', protein: 25, carbs: 40, fats: 15 }
        },
        lunch: {
          veg: { name: 'Rajma Chawal with Salad', protein: 25, carbs: 60, fats: 12 },
          nonVeg: { name: 'Chicken Wrap with Hummus', protein: 30, carbs: 45, fats: 15 }
        },
        snacks: {
          veg: { name: 'Roasted Makhana with Tea', protein: 10, carbs: 25, fats: 5 },
          nonVeg: { name: 'Turkey Sandwich', protein: 25, carbs: 35, fats: 10 }
        },
        dinner: {
          veg: { name: 'Palak Paneer with Roti', protein: 25, carbs: 50, fats: 15 },
          nonVeg: { name: 'Grilled Salmon with Mashed Potatoes', protein: 35, carbs: 45, fats: 18 }
        }
      },
      // Day 3
      {
        breakfast: {
          veg: { name: 'Idli Sambar with Coconut Chutney', protein: 15, carbs: 55, fats: 10 },
          nonVeg: { name: 'Boiled Eggs with Avocado Toast', protein: 25, carbs: 45, fats: 20 }
        },
        lunch: {
          veg: { name: 'Chana Masala with Roti', protein: 25, carbs: 55, fats: 12 },
          nonVeg: { name: 'Beef Stir Fry with Rice', protein: 35, carbs: 50, fats: 15 }
        },
        snacks: {
          veg: { name: 'Smoothie with Banana and Almonds', protein: 10, carbs: 40, fats: 10 },
          nonVeg: { name: 'Chicken Tikka', protein: 25, carbs: 10, fats: 10 }
        },
        dinner: {
          veg: { name: 'Vegetable Khichdi with Curd', protein: 20, carbs: 55, fats: 10 },
          nonVeg: { name: 'Grilled Prawns with Garlic Rice', protein: 30, carbs: 50, fats: 15 }
        }
      },
      // Day 4
      {
        breakfast: {
          veg: { name: 'Upma with Vegetables and Chutney', protein: 15, carbs: 50, fats: 10 },
          nonVeg: { name: 'Scrambled Eggs with Sausage', protein: 30, carbs: 30, fats: 20 }
        },
        lunch: {
          veg: { name: 'Dal Makhani with Jeera Rice', protein: 25, carbs: 60, fats: 15 },
          nonVeg: { name: 'Grilled Chicken with Quinoa', protein: 35, carbs: 50, fats: 15 }
        },
        snacks: {
          veg: { name: 'Sprouts Chaat', protein: 15, carbs: 30, fats: 5 },
          nonVeg: { name: 'Egg Salad Sandwich', protein: 25, carbs: 35, fats: 12 }
        },
        dinner: {
          veg: { name: 'Baingan Bharta with Roti', protein: 20, carbs: 50, fats: 12 },
          nonVeg: { name: 'Lamb Curry with Naan', protein: 35, carbs: 55, fats: 20 }
        }
      },
      // Day 5
      {
        breakfast: {
          veg: { name: 'Dosa with Sambar and Chutney', protein: 15, carbs: 60, fats: 12 },
          nonVeg: { name: 'Poached Eggs with Whole Wheat Toast', protein: 25, carbs: 40, fats: 15 }
        },
        lunch: {
          veg: { name: 'Mixed Vegetable Curry with Roti', protein: 20, carbs: 55, fats: 12 },
          nonVeg: { name: 'Grilled Fish with Couscous', protein: 35, carbs: 50, fats: 15 }
        },
        snacks: {
          veg: { name: 'Yogurt with Fruits and Nuts', protein: 10, carbs: 35, fats: 10 },
          nonVeg: { name: 'Chicken Wings (Grilled)', protein: 25, carbs: 10, fats: 12 }
        },
        dinner: {
          veg: { name: 'Matar Paneer with Roti', protein: 25, carbs: 50, fats: 15 },
          nonVeg: { name: 'Roast Chicken with Mashed Potatoes', protein: 35, carbs: 45, fats: 18 }
        }
      },
      // Day 6
      {
        breakfast: {
          veg: { name: 'Besan Chilla with Green Chutney', protein: 20, carbs: 45, fats: 12 },
          nonVeg: { name: 'Bacon and Eggs with Toast', protein: 30, carbs: 35, fats: 25 }
        },
        lunch: {
          veg: { name: 'Aloo Gobi with Roti', protein: 15, carbs: 55, fats: 12 },
          nonVeg: { name: 'Grilled Duck with Wild Rice', protein: 40, carbs: 55, fats: 18 }
        },
        snacks: {
          veg: { name: 'Chia Pudding with Almonds', protein: 15, carbs: 35, fats: 10 },
          nonVeg: { name: 'Tuna Salad Wrap', protein: 30, carbs: 40, fats: 15 }
        },
        dinner: {
          veg: { name: 'Vegetable Biryani with Raita', protein: 20, carbs: 60, fats: 15 },
          nonVeg: { name: 'Prawn Curry with Rice', protein: 35, carbs: 55, fats: 15 }
        }
      },
      // Day 7
      {
        breakfast: {
          veg: { name: 'Paratha with Curd and Pickle', protein: 15, carbs: 55, fats: 15 },
          nonVeg: { name: 'Sausage and Eggs with Hash Browns', protein: 30, carbs: 45, fats: 25 }
        },
        lunch: {
          veg: { name: 'Chole Bhature with Salad', protein: 20, carbs: 65, fats: 18 },
          nonVeg: { name: 'Beef Burger with Sweet Potato Fries', protein: 40, carbs: 60, fats: 25 }
        },
        snacks: {
          veg: { name: 'Roasted Chana with Tea', protein: 15, carbs: 30, fats: 5 },
          nonVeg: { name: 'Ham and Cheese Sandwich', protein: 30, carbs: 40, fats: 15 }
        },
        dinner: {
          veg: { name: 'Mushroom Masala with Roti', protein: 20, carbs: 50, fats: 12 },
          nonVeg: { name: 'Grilled Lobster with Garlic Butter Rice', protein: 35, carbs: 50, fats: 20 }
        }
      }
    ]
  };

  // Calculate daily targets based on total calories
  const targetCalories = calculateTargetCalories();
  const targetProtein = Math.round((targetCalories * 0.3) / 4); // 30% of calories from protein
  const targetCarbs = Math.round((targetCalories * 0.45) / 4); // 45% of calories from carbs
  const targetFats = Math.round((targetCalories * 0.25) / 9); // 25% of calories from fats


  // Calculate daily totals for selected day
  const dailyTotals = {
    calories: targetCalories,
    protein: targetProtein,
    carbs: targetCarbs,
    fats: targetFats
  };
  const selectedMealPlan = mealPlans[goal][selectedDay - 1];
  return (
    <div className="pt-24 pb-16 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Your <span className="text-4xl font-bold text-primary mb-8">Personalized Plan</span></h1>

        {/* Profile Section */}
        <div className="bg-black rounded-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <User size={24} className="text-red-600 mr-2" />
            <h2 className="text-2xl font-bold text-white">Your Profile</h2>
          </div>
          <div className="mb-4">
            <p className="text-gray-300">Welcome, <span className="text-white font-semibold">{user.email}</span></p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Activity Level</label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value as typeof activityLevel)}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2"
              >
                <option value="sedentary">Sedentary</option>
                <option value="moderate">Moderate</option>
                <option value="active">Active</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as typeof goal)}
                className="w-full bg-gray-800 text-white rounded-lg px-4 py-2"
              >
                <option value="weight_loss">Weight Loss</option>
                <option value="muscle_gain">Muscle Gain</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Daily Totals */}
        <div className="bg-black rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-red-600 mb-6">Daily Targets</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <p className="text-2xl font-bold text-red-500">{dailyTotals.calories}</p>
              <p className="text-gray-400">Calories</p>
            </div>
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <p className="text-2xl font-bold text-yellow-500">{dailyTotals.protein}g</p>
              <p className="text-gray-400">Protein</p>
            </div>
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <p className="text-2xl font-bold text-blue-500">{dailyTotals.carbs}g</p>
              <p className="text-gray-400">Carbohydrates</p>
            </div>
            <div className="text-center p-4 bg-gray-800 rounded-lg">
              <p className="text-2xl font-bold text-green-500">{dailyTotals.fats}g</p>
              <p className="text-gray-400">Fats</p>
            </div>
          </div>
        </div>

        {/* Day Selection */}
        <div className="bg-black rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Select <span className="text-2xl font-bold text-primary mb-6">Day</span></h2>
          <div className="grid grid-cols-7 gap-4">
            {days.map((day, index) => (
              <button
                key={day}
                onClick={() => setSelectedDay(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  selectedDay === index + 1
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Meal Plan */}
        <div className="bg-black rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-6">Daily Meal Plan - <span className="text-2xl font-semibold text-primary mb-6">{days[selectedDay - 1]}</span></h2>
          <div className="grid md:grid-cols-2 gap-6">
            {goal === "weight_loss" && selectedMealPlan ? (
              Object.entries(selectedMealPlan).map(([mealType, meal]) => (
                <div key={mealType} className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 capitalize">
                    {mealType}
                  </h3>
                  {/* Vegetarian Meal */}
                  <div className="bg-green-500 rounded-lg p-4 mb-4">
                    <h4 className="text-black font-semibold">
                      {meal.veg.name} (Veg)
                    </h4>
                    <div className="flex space-x-4 text-sm mt-2">
                      <span className="text-pink-700">
                        P: {meal.veg.protein}g
                      </span>
                      <span className="text-blue-700">
                        C: {meal.veg.carbs}g
                      </span>
                      <span className="text-yellow-700">
                        F: {meal.veg.fats}g
                      </span>
                    </div>
                  </div>
                  {/* Non-Vegetarian Meal */}
                  <div className="bg-red-600 rounded-lg p-4">
                    <h4 className="text-white font-semibold">
                      {meal.nonVeg.name} (Non-Veg)
                    </h4>
                    <div className="flex space-x-4 text-sm mt-2">
                      <span className="text-pink-400">
                        P: {meal.nonVeg.protein}g
                      </span>
                      <span className="text-blue-400">
                        C: {meal.nonVeg.carbs}g
                      </span>
                      <span className="text-green-400">
                        F: {meal.nonVeg.fats}g
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : goal === 'muscle_gain' && selectedMealPlan ? (
              Object.entries(selectedMealPlan).map(([mealType, meal]) => (
                <div key={mealType} className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 capitalize">
                    {mealType}
                  </h3>
                  {/* Vegetarian Meal */}
                  <div className="bg-green-500 rounded-lg p-4 mb-4">
                    <h4 className="text-black font-semibold">
                      {meal.veg.name} (Veg)
                    </h4>
                    <div className="flex space-x-4 text-sm mt-2">
                      <span className="text-pink-700">
                        P: {meal.veg.protein}g
                      </span>
                      <span className="text-blue-700">
                        C: {meal.veg.carbs}g
                      </span>
                      <span className="text-yellow-800">
                        F: {meal.veg.fats}g
                      </span>
                    </div>
                  </div>
                  {/* Non-Vegetarian Meal */}
                  <div className="bg-red-600 rounded-lg p-4">
                    <h4 className="text-white font-semibold">
                      {meal.nonVeg.name} (Non-Veg)
                    </h4>
                    <div className="flex space-x-4 text-sm mt-2">
                      <span className="text-pink-200">
                        P: {meal.nonVeg.protein}g
                      </span>
                      <span className="text-blue-400">
                        C: {meal.nonVeg.carbs}g
                      </span>
                      <span className="text-green-400">
                        F: {meal.nonVeg.fats}g
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
                Object.entries(selectedMealPlan).map(([mealType, meal]) => (
                <div key={mealType} className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 capitalize">
                    {mealType}
                  </h3>
                  {/* Vegetarian Meal */}
                  <div className="bg-green-500 rounded-lg p-4 mb-4">
                    <h4 className="text-black font-semibold">
                      {meal.veg.name} (Veg)
                    </h4>
                    <div className="flex space-x-4 text-sm mt-2">
                      <span className="text-pink-700">
                        P: {meal.veg.protein}g
                      </span>
                      <span className="text-blue-700">
                        C: {meal.veg.carbs}g
                      </span>
                      <span className="text-yellow-700">
                        F: {meal.veg.fats}g
                      </span>
                    </div>
                  </div>
                  {/* Non-Vegetarian Meal */}
                  <div className="bg-red-600 rounded-lg p-4">
                    <h4 className="text-white font-semibold">
                      {meal.nonVeg.name} (Non-Veg)
                    </h4>
                    <div className="flex space-x-4 text-sm mt-2">
                      <span className="text-pink-200">
                        P: {meal.nonVeg.protein}g
                      </span>
                      <span className="text-blue-400">
                        C: {meal.nonVeg.carbs}g
                      </span>
                      <span className="text-green-400">
                        F: {meal.nonVeg.fats}g
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-black rounded-lg p-6">
          <h2 className="text-3xl font-bold text-primary mb-6">Sample Recipe instructions:</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            
            
            <div className="bg-black rounded-lg p-6">
  <div className="grid md:grid-cols-2 gap-6">
    {/* Recipe 1 - Palak Paneer */}
    <div className="bg-green-500 rounded-lg p-6">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setExpandedRecipe(expandedRecipe === 'palakPaneer' ? null : 'palakPaneer')}
      >
        <h3 className="text-xl font-semibold text-black">Palak Paneer</h3>
        {expandedRecipe === 'palakPaneer' ? (
          <ChevronUp className="text-white" />
        ) : (
          <ChevronDown className="text-white" />
        )}
      </div>

      {expandedRecipe === 'palakPaneer' && (
        <div className="mt-4">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-black mb-2">Ingredients:</h4>
            <ul className="list-disc list-inside text-black space-y-1">
              <li>500g spinach, cleaned and chopped</li>
              <li>200g paneer, cubed</li>
              <li>2 onions, finely chopped</li>
              <li>2 tomatoes, pureed</li>
              <li>2 tbsp ginger-garlic paste</li>
              <li>2 green chilies</li>
              <li>1 tsp cumin seeds</li>
              <li>1 tsp garam masala</li>
              <li>Salt to taste</li>
              <li>2 tbsp oil</li>
              <li>2 tbsp cream</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-black mb-2">Instructions:</h4>
            <ol className="list-decimal list-inside text-black space-y-2">
              <li>Blanch spinach in hot water for 3 minutes, then blend into a smooth puree</li>
              <li>Heat oil in a pan, add cumin seeds and let them crackle</li>
              <li>Add onions and sauté until golden brown</li>
              <li>Add ginger-garlic paste and green chilies, sauté for 2 minutes</li>
              <li>Add tomato puree and cook until oil separates</li>
              <li>Add spinach puree and cook for 5 minutes</li>
              <li>Add paneer cubes and garam masala</li>
              <li>Simmer for 5 minutes</li>
              <li>Finish with cream and serve hot with roti or rice</li>
            </ol>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-black mb-2">Nutrition (per serving):</h4>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-3 bg-black rounded-lg">
                <p className="text-lg font-bold text-red-500">600</p>
                <p className="text-sm text-white">Calories</p>
              </div>
              <div className="text-center p-3 bg-black rounded-lg">
                <p className="text-lg font-bold text-pink-500">36g</p>
                <p className="text-sm text-white">Protein</p>
              </div>
              <div className="text-center p-3 bg-black rounded-lg">
                <p className="text-lg font-bold text-blue-500">24g</p>
                <p className="text-sm text-white">Carbs</p>
              </div>
              <div className="text-center p-3 bg-black rounded-lg">
                <p className="text-lg font-bold text-green-500">22g</p>
                <p className="text-sm text-white">Fats</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

    {/* Recipe 2 - Butter Chicken */}
    <div className="bg-red-600 rounded-lg p-6">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setExpandedRecipe(expandedRecipe === 'butterChicken' ? null : 'butterChicken')}
      >
        <h3 className="text-xl font-semibold text-white">Butter Chicken</h3>
        {expandedRecipe === 'butterChicken' ? (
          <ChevronUp className="text-white" />
        ) : (
          <ChevronDown className="text-white" />
        )}
      </div>

      {expandedRecipe === 'butterChicken' && (
        <div className="mt-4">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-2">Ingredients:</h4>
            <ul className="list-disc list-inside text-white space-y-1">
              <li>500g chicken, cubed</li>
              <li>1 cup yogurt</li>
              <li>2 tbsp lemon juice</li>
              <li>2 tsp garam masala</li>
              <li>1 tsp turmeric</li>
              <li>2 tbsp butter</li>
              <li>1 onion, chopped</li>
              <li>3 garlic cloves, minced</li>
              <li>1 tbsp ginger, grated</li>
              <li>1 can tomato sauce</li>
              <li>1 cup heavy cream</li>
              <li>Fresh cilantro for garnish</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-white mb-2">Instructions:</h4>
            <ol className="list-decimal list-inside text-white space-y-2">
              <li>Marinate chicken in yogurt, lemon juice, and spices for at least 1 hour</li>
              <li>Grill or bake chicken until cooked through</li>
              <li>In a pan, melt butter and sauté onions until translucent</li>
              <li>Add garlic and ginger, cook for 1 minute</li>
              <li>Add tomato sauce and simmer for 10 minutes</li>
              <li>Add cream and cooked chicken, simmer for 5 minutes</li>
              <li>Garnish with cilantro and serve with naan</li>
            </ol>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Nutrition (per serving):</h4>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-3 bg-black rounded-lg">
                <p className="text-lg font-bold text-red-500">750</p>
                <p className="text-sm text-white">Calories</p>
              </div>
              <div className="text-center p-3 bg-black rounded-lg">
                <p className="text-lg font-bold text-pink-500">45g</p>
                <p className="text-sm text-white">Protein</p>
              </div>
              <div className="text-center p-3 bg-black rounded-lg">
                <p className="text-lg font-bold text-blue-500">30g</p>
                <p className="text-sm text-white">Carbs</p>
              </div>
              <div className="text-center p-3 bg-black rounded-lg">
                <p className="text-lg font-bold text-green-500">35g</p>
                <p className="text-sm text-white">Fats</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPlan;