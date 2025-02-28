import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { format, startOfWeek } from 'date-fns';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Impact = () => {
  const [impactData, setImpactData] = useState([]);
  const [totalImpact, setTotalImpact] = useState({
    co2: 0,
    water: 0,
    plastic: 0
  });
  const [generatingReport, setGeneratingReport] = useState(false);

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

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

  const generateImpactReport = async () => {
    try {
      setGeneratingReport(true);
      const prompt = `Generate a comprehensive environmental impact report in markdown format with these sections:

      **User Impact Summary**
      - CO₂ Reduced: ${totalImpact.co2}kg (Equivalent to ${Math.round(totalImpact.co2 / 0.16)}km car travel avoided)
      - Water Saved: ${totalImpact.water}L (${Math.round(totalImpact.water / 5)} showers)
      - Plastic Reduced: ${totalImpact.plastic}g (${Math.round(totalImpact.plastic / 5)} bottles)

      **Weekly Progress Highlights**
      ${impactData.map(week => `
      - Week ${week.week}: 
        - CO₂: ${week.co2}kg 
        - Water: ${week.water}L
        - Plastic: ${week.plastic}g`).join('\n')}

      **Achievements**
      - List 3 notable milestones with relevant emojis
      
      **Recommendations**
      - Provide 3 personalized sustainability improvements
      
      **Inspiration**
      - Add an environmental quote with author
      
      Use proper markdown formatting with headers (##), bullet points, and eco-themed emojis.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Create downloadable report
      const blob = new Blob([text], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Eco_Report_${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Report generation failed:', error);
      alert('Failed to generate report. Please try again.');
    } finally {
      setGeneratingReport(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-emerald-800">Your Environmental Impact</h1>
        <button 
          onClick={generateImpactReport}
          disabled={generatingReport || totalImpact.co2 === 0}
          className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {generatingReport ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Report...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Impact Report
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            CO₂ Reduced
          </h3>
          <p className="text-3xl font-bold text-green-600">{totalImpact.co2}kg</p>
          <p className="text-sm text-green-500 mt-2">
            Equivalent to {Math.round(totalImpact.co2 / 0.16)} km of car driving avoided
          </p>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <span className="text-2xl">💧</span>
            Water Saved
          </h3>
          <p className="text-3xl font-bold text-blue-600">{totalImpact.water}L</p>
          <p className="text-sm text-blue-500 mt-2">
            Enough for {Math.round(totalImpact.water / 5)} average showers
          </p>
        </div>
        
        <div className="bg-amber-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-amber-800 mb-2 flex items-center gap-2">
            <span className="text-2xl">🛍️</span>
            Plastic Reduced
          </h3>
          <p className="text-3xl font-bold text-amber-600">{totalImpact.plastic}g</p>
          <p className="text-sm text-amber-500 mt-2">
            Equivalent to {Math.round(totalImpact.plastic / 5)} plastic bottles
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow mb-8">
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
            <Tooltip 
              contentStyle={{
                backgroundColor: '#f0fdf4',
                border: '1px solid #059669',
                borderRadius: '8px'
              }}
            />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
            />
            <Bar 
              dataKey="co2" 
              fill="#4CAF50" 
              name="CO₂ Saved (kg)"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="water" 
              fill="#2196F3" 
              name="Water Conserved (L)"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="plastic" 
              fill="#FFC107" 
              name="Plastic Reduced (g)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </div>
      </div>

      {totalImpact.co2 === 0 ? (
        <div className="mt-8 text-center text-gray-500">
          <p>No impact data yet. Start adding sustainable habits to see your impact!</p>
        </div>
      ) : (
        <div className="text-center text-sm text-emerald-600 mb-8">
          <p>🌟 Great work! Your efforts are making a real difference 🌟</p>
        </div>
      )}
    </div>
  );
};

export default Impact;