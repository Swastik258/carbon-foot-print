import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; 
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

const AddHabit = ({ setActiveTab, currentHabit, setCurrentHabit }) => {
  const [habit, setHabit] = useState("");
  const [description, setDescription] = useState("");

  // Load selected habit data for editing
  useEffect(() => {
    if (currentHabit) {
      setHabit(currentHabit.habit);
      setDescription(currentHabit.description);
    }
  }, [currentHabit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (habit.trim() && description.trim()) {
      try {
        if (currentHabit?.id) {
          // If editing, update the existing habit
          const habitRef = doc(db, "habits", currentHabit.id);
          await updateDoc(habitRef, { habit, description });
          alert("Habit updated successfully!");
          setCurrentHabit(null);
        } else {
          // If adding a new habit
          await addDoc(collection(db, "habits"), { habit, description, createdAt: new Date() });
          alert("Habit added successfully!");
        }

        setHabit("");
        setDescription("");
        setActiveTab("habits");
      } catch (error) {
        console.error("Error saving habit:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-800 mb-6">
          {currentHabit ? "Edit Habit" : "Add a Habit to Reduce Your Carbon Footprint"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-700">Habit</label>
            <input
              type="text"
              value={habit}
              onChange={(e) => setHabit(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="e.g., Use reusable bags"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              placeholder="e.g., This helps reduce plastic waste."
              rows="3"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {currentHabit ? "Update Habit" : "Add Habit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHabit;
