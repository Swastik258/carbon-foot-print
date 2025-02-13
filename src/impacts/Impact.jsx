import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, LineChart, Line } from 'recharts';

function Impact() {
  // Example data for sustainability metrics
  const sustainabilityData = [
    { week: 'Week 1', CO2Saved: 100, waterConserved: 200, plasticReduced: 50, energySaved: 150 },
    { week: 'Week 2', CO2Saved: 150, waterConserved: 250, plasticReduced: 70, energySaved: 180 },
    { week: 'Week 3', CO2Saved: 200, waterConserved: 300, plasticReduced: 90, energySaved: 200 },
  ];

  // Example data for community impact
  const communityImpactData = [
    { name: 'User A', impact: 400 },
    { name: 'User B', impact: 300 },
    { name: 'User C', impact: 200 },
    { name: 'You', impact: 500 },
  ];

  // Example data for pie chart
  const pieData = [
    { name: 'CO₂ Saved', value: 400 },
    { name: 'Water Conserved', value: 300 },
    { name: 'Plastic Reduced', value: 150 },
    { name: 'Energy Saved', value: 200 },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Sustainability Impact</h1>

      {/* Weekly & Monthly Reports */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Weekly Impact</h2>
        <BarChart width={600} height={300} data={sustainabilityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="CO2Saved" fill="#8884d8" />
          <Bar dataKey="waterConserved" fill="#82ca9d" />
          <Bar dataKey="plasticReduced" fill="#ffc658" />
          <Bar dataKey="energySaved" fill="#ff8042" />
        </BarChart>
      </div>

      {/* Carbon Footprint Reduction Score */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Carbon Footprint Reduction Score</h2>
        <p className="text-3xl font-bold">450 kg CO₂ saved</p>
      </div>

      {/* Gamification Elements */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Achievements</h2>
        <div className="flex space-x-4">
          <div className="bg-green-200 p-4 rounded-lg">
            <p className="text-lg font-bold">🌱 Eco-Starter</p>
            <p>Saved 100 kg CO₂</p>
          </div>
          <div className="bg-blue-200 p-4 rounded-lg">
            <p className="text-lg font-bold">💧 Water Saver</p>
            <p>Conserved 200 liters</p>
          </div>
        </div>
      </div>

      {/* Community & Global Impact */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Community Impact</h2>
        <PieChart width={400} height={400}>
          <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label />
          <Tooltip />
        </PieChart>
      </div>

      {/* Leaderboard & Community Comparison */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
        <LineChart width={600} height={300} data={communityImpactData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="impact" stroke="#8884d8" />
        </LineChart>
      </div>

      {/* Encouragement Messages */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Keep Going!</h2>
        <p className="text-lg">"Every small step counts towards a greener future. 🌍"</p>
      </div>
    </div>
  );
}

export default Impact;