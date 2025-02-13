import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

function Goal() {
  // State for goal creation
  const [goalTitle, setGoalTitle] = useState("");
  const [goalType, setGoalType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [goals, setGoals] = useState([]);

  // Example data for progress tracking
  const progressData = [
    { week: "Week 1", progress: 20 },
    { week: "Week 2", progress: 45 },
    { week: "Week 3", progress: 70 },
    { week: "Week 4", progress: 90 },
  ];

  // Example data for goal categories
  const goalCategories = [
    { name: "🚰 Water Conservation", color: "#00C49F" },
    { name: "🌍 Carbon Footprint Reduction", color: "#0088FE" },
    { name: "🛍️ Plastic-Free Living", color: "#FFBB28" },
    { name: "🔋 Energy Efficiency", color: "#FF8042" },
  ];

  // Handle goal submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      id: Date.now(),
      title: goalTitle,
      type: goalType,
      startDate,
      endDate,
      progress: 0, // Initial progress
    };
    setGoals([...goals, newGoal]);
    setGoalTitle("");
    setGoalType("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Goal Creation & Management</h1>

      {/* Goal Creation Form */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Set Your Sustainability Goals</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Goal Title</label>
            <input
              type="text"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="e.g., Reduce plastic waste by 50% in 3 months"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Goal Type</label>
            <select
              value={goalType}
              onChange={(e) => setGoalType(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Create Goal
          </button>
        </form>
      </div>

      {/* Goal Progress Tracking */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Goal Progress</h2>
        <LineChart width={600} height={300} data={progressData}>
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="progress" stroke="#8884d8" />
        </LineChart>
      </div>

      {/* Goal Categories Visualization */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Goal Categories</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={goalCategories}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {goalCategories.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* List of Goals */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Your Goals</h2>
        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{goal.title}</h3>
              <p className="text-gray-600">{goal.type}</p>
              <p className="text-gray-600">
                {goal.startDate} to {goal.endDate}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Goal;