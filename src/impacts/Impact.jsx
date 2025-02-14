// Impact.jsx
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { format, startOfWeek, addWeeks } from 'date-fns';

const Impact = () => {
  const [impactData, setImpactData] = useState([]);
  const [totalImpact, setTotalImpact] = useState({
    co2: 0,
    water: 0,
    plastic: 0
  });

  useEffect(() => {
    const fetchImpactData = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const q = query(collection(db, "habits"), where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      const habits = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
      }));

      const weeklyData = groupByWeek(habits);
      setImpactData(weeklyData);
      calculateTotals(habits);
    };

    fetchImpactData();
  }, []);

  const groupByWeek = (habits) => {
    const weeklyImpact = {};
    
    habits.forEach(habit => {
      const weekStart = startOfWeek(habit.createdAt, { weekStartsOn: 1 });
      const weekKey = format(weekStart, 'yyyy-MM-dd');

      if (!weeklyImpact[weekKey]) {
        weeklyImpact[weekKey] = {
          week: `Week ${format(weekStart, 'w')}`,
          co2: 0,
          water: 0,
          plastic: 0
        };
      }

      weeklyImpact[weekKey].co2 += habit.co2Saved || 0;
      weeklyImpact[weekKey].water += habit.waterConserved || 0;
      weeklyImpact[weekKey].plastic += habit.plasticReduced || 0;
    });

    return Object.values(weeklyImpact);
  };

  const calculateTotals = (habits) => {
    const totals = habits.reduce((acc, habit) => ({
      co2: acc.co2 + (habit.co2Saved || 0),
      water: acc.water + (habit.waterConserved || 0),
      plastic: acc.plastic + (habit.plasticReduced || 0)
    }), { co2: 0, water: 0, plastic: 0 });

    setTotalImpact(totals);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-emerald-800 mb-8">Your Environmental Impact</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-green-800 mb-2">🌱 CO₂ Reduced</h3>
          <p className="text-3xl font-bold text-green-600">{totalImpact.co2}kg</p>
          <p className="text-sm text-green-500 mt-2">
            Equivalent to {Math.round(totalImpact.co2 / 0.16)} km of car driving avoided
          </p>
        </div>
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">💧 Water Saved</h3>
          <p className="text-3xl font-bold text-blue-600">{totalImpact.water}L</p>
          <p className="text-sm text-blue-500 mt-2">
            Enough for {Math.round(totalImpact.water / 5)} average showers
          </p>
        </div>
        <div className="bg-amber-50 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-amber-800 mb-2">🛍️ Plastic Reduced</h3>
          <p className="text-3xl font-bold text-amber-600">{totalImpact.plastic}g</p>
          <p className="text-sm text-amber-500 mt-2">
            Equivalent to {Math.round(totalImpact.plastic / 5)} plastic bottles
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold text-emerald-800 mb-4">Weekly Progress</h2>
        <div className="overflow-x-auto">
          <BarChart
            width={600}
            height={300}
            data={impactData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="co2" fill="#4CAF50" name="CO₂ Saved (kg)" />
            <Bar dataKey="water" fill="#2196F3" name="Water Conserved (L)" />
            <Bar dataKey="plastic" fill="#FFC107" name="Plastic Reduced (g)" />
          </BarChart>
        </div>
      </div>

      {totalImpact.co2 === 0 && (
        <div className="mt-8 text-center text-gray-500">
          <p>No impact data yet. Start adding sustainable habits to see your impact!</p>
        </div>
      )}
    </div>
  );
};

export default Impact;