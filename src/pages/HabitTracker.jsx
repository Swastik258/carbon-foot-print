import React from "react";

const habits = [
  { name: "Use Reusable Bags", completed: 5, target: 7 },
  { name: "Turn Off Lights", completed: 6, target: 7 },
  { name: "Public Transport", completed: 3, target: 7 },
  { name: "Water Conservation", completed: 4, target: 7 },
];

const HabitTracker = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Habit Tracker</h2>
      <ul className="space-y-4">
        {habits.map((habit, index) => (
          <li key={index} className="p-4 border rounded-lg flex justify-between">
            <span>{habit.name}</span>
            <span>{habit.completed}/{habit.target} days</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitTracker;








