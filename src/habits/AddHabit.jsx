import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

const AddHabit = ({ setActiveTab, currentHabit, setCurrentHabit }) => {
  const [habit, setHabit] = useState(currentHabit?.habit || "");
  const [description, setDescription] = useState(currentHabit?.description || "");
  const [co2Saved, setCo2Saved] = useState(currentHabit?.co2Saved || "");
  const [waterConserved, setWaterConserved] = useState(currentHabit?.waterConserved || "");
  const [plasticReduced, setPlasticReduced] = useState(currentHabit?.plasticReduced || "");
  const [selectedHabit, setSelectedHabit] = useState("custom");

  // Predefined sustainable habits with their typical impact values
  const commonHabits = [
    {
      name: "Use Reusable Water Bottle",
      description: "Replace single-use plastic bottles with a reusable water bottle",
      co2: 0.5,
      water: 7,
      plastic: 150
    },
    {
      name: "Bring Own Shopping Bags",
      description: "Use reusable bags instead of single-use plastic bags for shopping",
      co2: 0.3,
      water: 5,
      plastic: 100
    },
    {
      name: "Composting",
      description: "Convert kitchen waste into nutrient-rich soil",
      co2: 2.2,
      water: 0,
      plastic: 200
    },
    {
      name: "Public Transportation",
      description: "Use public transport instead of private vehicle",
      co2: 9.0,
      water: 0,
      plastic: 0
    },
    {
      name: "Meatless Monday",
      description: "Skip meat consumption one day per week",
      co2: 5.0,
      water: 2000,
      plastic: 50
    }
  ];

  const handleHabitSelect = (e) => {
    const selected = e.target.value;
    setSelectedHabit(selected);

    if (selected === "custom") {
      setHabit("");
      setDescription("");
      setCo2Saved("");
      setWaterConserved("");
      setPlasticReduced("");
    } else {
      const selectedHabitData = commonHabits.find(h => h.name === selected);
      if (selectedHabitData) {
        setHabit(selectedHabitData.name);
        setDescription(selectedHabitData.description);
        setCo2Saved(selectedHabitData.co2);
        setWaterConserved(selectedHabitData.water);
        setPlasticReduced(selectedHabitData.plastic);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (habit.trim() && description.trim()) {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          alert("Please login to add habits");
          return;
        }

        const habitData = {
          habit,
          description,
          co2Saved: Number(co2Saved),
          waterConserved: Number(waterConserved),
          plasticReduced: Number(plasticReduced),
          userId: currentUser.uid,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        if (currentHabit?.id) {
          await updateDoc(doc(db, "habits", currentHabit.id), habitData);
          alert("Habit updated successfully!");
          setCurrentHabit(null);
        } else {
          await addDoc(collection(db, "habits"), habitData);
          alert("Habit added successfully!");
        }

        setHabit("");
        setDescription("");
        setCo2Saved("");
        setWaterConserved("");
        setPlasticReduced("");
        setSelectedHabit("custom");
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
          {currentHabit ? "Edit Habit" : "Add Sustainable Habit"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">Select Habit Type</label>
            <select
              value={selectedHabit}
              onChange={handleHabitSelect}
              className="w-full px-3 py-2 border border-green-300 rounded-md shadow-sm mb-4"
            >
              <option value="custom">Custom Habit</option>
              {commonHabits.map((h) => (
                <option key={h.name} value={h.name}>{h.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Habit Name</label>
            <input
              type="text"
              value={habit}
              onChange={(e) => setHabit(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm"
              placeholder="e.g., Use reusable containers"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm"
              placeholder="How does this help the environment?"
              rows="3"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-green-700">
                🌱 CO₂ Reduction (kg/week)
              </label>
              <input
                type="number"
                value={co2Saved}
                onChange={(e) => setCo2Saved(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm"
                placeholder="e.g., 2.5"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700">
                💧 Water Savings (L/week)
              </label>
              <input
                type="number"
                value={waterConserved}
                onChange={(e) => setWaterConserved(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm"
                placeholder="e.g., 15"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-700">
                🛍️ Plastic Reduced (g/week)
              </label>
              <input
                type="number"
                value={plasticReduced}
                onChange={(e) => setPlasticReduced(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md shadow-sm"
                placeholder="e.g., 200"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            {currentHabit ? "Update Habit" : "Add Sustainable Habit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHabit;