import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

function Goal() {
  const [goalTitle, setGoalTitle] = useState("");
  const [goalType, setGoalType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [goals, setGoals] = useState([]);

  // Goal categories configuration
  const goalCategories = [
    { name: "🚰 Water Conservation", color: "#00C49F" },
    { name: "🌍 Carbon Footprint Reduction", color: "#0088FE" },
    { name: "🛍️ Plastic-Free Living", color: "#FFBB28" },
    { name: "🔋 Energy Efficiency", color: "#FF8042" },
  ];

  // Calculate pie chart data based on actual goals
  const pieData = goalCategories.map((category) => ({
    ...category,
    value: goals.filter((goal) => goal.type === category.name).length,
  }));

  // Generate progress data for the line chart (example data)
  const progressData = goals.map((goal, index) => ({
    week: `Week ${index + 1}`,
    progress: Math.min(100, (index + 1) * 25), // Example progress
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      id: Date.now(),
      title: goalTitle,
      type: goalType,
      startDate,
      endDate,
      progress: 0,
    };
    setGoals([...goals, newGoal]);
    // Reset form
    setGoalTitle("");
    setGoalType("");
    setStartDate("");
    setEndDate("");
  };

  return (
    
    <div className="p-6 max-w-7xl mx-auto">
    <h1 className="text-3xl font-bold mb-8 text-green-600">🌱 Sustainability Goals Dashboard</h1>

    {/* Goal Creation Card - FORM ADDED HERE */}
    <div className="mb-8 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Create New Goal</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Goal Title</label>
          <input
            type="text"
            value={goalTitle}
            onChange={(e) => setGoalTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="e.g., Reduce plastic waste by 50%"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Category</label>
          <select
            value={goalType}
            onChange={(e) => setGoalType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select a category</option>
            {goalCategories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="md:col-span-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold p-3 rounded-lg transition-colors"
        >
          🎯 Create New Goal
        </button>
      </form>s
    </div>
    </div>
  );
}

export default Goal;