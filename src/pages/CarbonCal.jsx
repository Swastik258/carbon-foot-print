



import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { 
  SparklesIcon, 
  LightBulbIcon, 
  ChartBarIcon, 
  UserIcon, 
  PlusCircleIcon,
  TrashIcon,
  GlobeAltIcon,
  HomeIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const EMISSION_FACTORS = {
  transportation: {
    car: 0.404,
    motorcycle: 0.208,
    bus: 0.104,
    flight: 90,
    train: 0.041,
    bicycle: 0.0
  },
  energy: {
    electricity: 0.475,
    natural_gas: 0.185,
    solar: 0.05,
    heating_oil: 0.263,
    propane: 0.214
  },
  lifestyle: {
    meat: 1.25,
    dairy: 0.6,
    fast_fashion: 5.0,
    electronics: 0.8,
    recycling: -0.3
  }
};

const COUNTRY_AVERAGES = {
  world: 4.8,
  india: 1.9,
  usa: 16,
  china: 7.4,
  eu: 6.4,
  global_goal: 2.0
};

function CarbonCal() {
  const [footprint, setFootprint] = useState(null);
  const [aiTips, setAiTips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customHabits, setCustomHabits] = useState([{
    id: Date.now(),
    category: 'transportation',
    type: 'car',
    value: 0,
    frequency: 'weekly'
  }]);
  
  const [userInfo, setUserInfo] = useState({
    name: '',
    country: 'india',
    householdSize: 1,
    homeType: 'apartment',
    energySource: 'electricity'
  });

  // Habit Management
  const addNewHabit = () => {
    setCustomHabits([...customHabits, {
      id: Date.now(),
      category: 'transportation',
      type: 'car',
      value: 0,
      frequency: 'weekly'
    }]);
  };

  const removeHabit = (id) => {
    setCustomHabits(customHabits.filter(habit => habit.id !== id));
  };

  const updateHabit = (id, field, value) => {
    setCustomHabits(customHabits.map(habit => 
      habit.id === id ? { ...habit, [field]: value } : habit
    ));
  };

  // User Info Handling
  const handleUserInfoChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // Calculation Logic
  const calculateFootprint = async (e) => {
    e.preventDefault();
    setLoading(true);

    let total = customHabits.reduce((acc, habit) => {
      const factor = EMISSION_FACTORS[habit.category]?.[habit.type] || 0;
      const multipliers = { daily: 365, weekly: 52, monthly: 12, yearly: 1 };
      return acc + (habit.value * factor * multipliers[habit.frequency]);
    }, 0);

    const perCapitaTotal = (total / 1000) / userInfo.householdSize;
    const formattedTotal = perCapitaTotal.toFixed(1);

    // Generate AI Tips
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
      const prompt = `As a sustainability expert, provide 5 specific, numbered recommendations for:
        ${userInfo.name ? `Name: ${userInfo.name}, ` : ''}
        Location: ${userInfo.country}, 
        Home: ${userInfo.homeType},
        Energy: ${userInfo.energySource},
        Habits: ${customHabits.map(h => 
          `${h.type} (${h.value} ${h.frequency})`
        ).join(', ')}.
        Focus on ${userInfo.country}-specific solutions. Use metric units.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const tips = response.text()
        .split('\n')
        .filter(tip => tip.trim())
        .map(tip => tip.replace(/^\d+\.\s*/, '').trim())
        .slice(0, 5);

      setAiTips(tips);
    } catch (error) {
      console.error('AI Error:', error);
      setAiTips(['Failed to load suggestions. Please try again later.']);
    }

    setFootprint(formattedTotal);
    setLoading(false);
  };

  
// Add this function to get the appropriate label
const getQuantityLabel = (category, type) => {
  const labels = {
    transportation: {
      car: "Distance (km)",
      motorcycle: "Distance (km)",
      bus: "Distance (km)",
      flight: "Flight hours",
      train: "Distance (km)",
      bicycle: "Distance (km)"
    },
    energy: {
      electricity: "Energy used (kWh)",
      natural_gas: "Volume used (m³)",
      solar: "Energy used (kWh)",
      heating_oil: "Volume used (L)",
      propane: "Volume used (L)"
    },
    lifestyle: {
      meat: "Amount consumed (kg)",
      dairy: "Amount consumed (kg)",
      fast_fashion: "Items purchased",
      electronics: "Items purchased",
      recycling: "Amount recycled (kg)"
    }
  };

 
  
  return labels[category]?.[type] || "Quantity";
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <GlobeAltIcon className="h-8 w-8 text-green-600" />
            Carbon Footprint Analyzer
          </h1>
          <p className="text-lg text-gray-600">Calculate and reduce your environmental impact with AI-powered insights</p>
        </div>

        {!footprint ? (
          <form onSubmit={calculateFootprint} className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="border-b pb-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-blue-600">
                  <UserIcon className="h-6 w-6" />
                  Personal Profile
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name (optional)</label>
                    <input
                      type="text"
                      name="name"
                      value={userInfo.name}
                      onChange={handleUserInfoChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <select
                      name="country"
                      value={userInfo.country}
                      onChange={handleUserInfoChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="india">India</option>
                      <option value="usa">United States</option>
                      <option value="china">China</option>
                      <option value="eu">European Union</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Household Members</label>
                    <input
                      type="number"
                      name="householdSize"
                      value={userInfo.householdSize}
                      onChange={handleUserInfoChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                      min="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Energy Source</label>
                    <select
                      name="energySource"
                      value={userInfo.energySource}
                      onChange={handleUserInfoChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="electricity">Electricity</option>
                      <option value="solar">Solar</option>
                      <option value="natural_gas">Natural Gas</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Habit Management */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-green-600">
                  <ChartBarIcon className="h-6 w-6" />
                  Your Carbon Sources
                </h2>
                
                {customHabits.map((habit, index) => (
                  <div key={habit.id} className="border rounded-lg p-6 bg-gray-50 relative group">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium">Source #{index + 1}</h3>
                      {customHabits.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeHabit(habit.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Category</label>
                        <select
                          value={habit.category}
                          onChange={(e) => updateHabit(habit.id, 'category', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
                        >
                          <option value="transportation">Transport</option>
                          <option value="energy">Energy</option>
                          <option value="lifestyle">Lifestyle</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Type</label>
                        <select
                          value={habit.type}
                          onChange={(e) => updateHabit(habit.id, 'type', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
                        >
                          {Object.keys(EMISSION_FACTORS[habit.category]).map(option => (
                            <option key={option} value={option}>
                              {option.replace(/_/g, ' ').toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-700 mb-2">Frequency</label>
                        <select
                          value={habit.frequency}
                          onChange={(e) => updateHabit(habit.id, 'frequency', e.target.value)}
                          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly</option>
                        </select>
                      </div>

                      <div>
  <label className="block text-sm text-gray-700 mb-2">
    {getQuantityLabel(habit.category, habit.type)}
  </label>
  <input
    type="number"
    value={habit.value}
    onChange={(e) => updateHabit(habit.id, 'value', e.target.value)}
    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500"
    placeholder="Enter number"
  />
</div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addNewHabit}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg flex items-center justify-center gap-2"
                >
                  <PlusCircleIcon className="h-5 w-5" />
                  Add Another Carbon Source
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-xl font-semibold 
                hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <>
                  <SparklesIcon className="h-6 w-6" />
                  Calculate My Footprint
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            {/* Results Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your Environmental Impact
              </h2>
              <div className="inline-block bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-2xl">
                <span className="text-5xl font-bold">{footprint}</span>
                <span className="text-2xl"> tons CO₂/year</span>
              </div>
            </div>

            {/* Global Comparison */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <GlobeAltIcon className="h-6 w-6" />
                Global Comparison
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Your Footprint</span>
                  <span className="font-bold">{footprint} tons</span>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                  <span>🇮🇳 India Average</span>
                  <span>{COUNTRY_AVERAGES.india} tons</span>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                  <span>🌍 World Average</span>
                  <span>{COUNTRY_AVERAGES.world} tons</span>
                </div>
                <div className="flex justify-between items-center text-gray-500">
                  <span>🇺🇸 US Average</span>
                  <span>{COUNTRY_AVERAGES.usa} tons</span>
                </div>
                <div className="flex justify-between items-center text-green-600 font-semibold">
                  <span>🎯 Climate Goal</span>
                  <span>{COUNTRY_AVERAGES.global_goal} tons</span>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <LightBulbIcon className="h-6 w-6" />
                AI-Powered Recommendations
              </h3>
              <ul className="space-y-3">
                {aiTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600">▹</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recalculate Button */}
            <button
              onClick={() => setFootprint(null)}
              className="w-full bg-gray-100 text-gray-700 py-4 rounded-xl font-semibold
                hover:bg-gray-200 transition-colors"
            >
              Start New Calculation
            </button>

            <button  className="w-full bg-blue-500text-gray-700 py-4 rounded-xl font-semibold
                hover:bg-gray-200 transition-colors">
              Download Reports
            </button>
        <div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CarbonCal;