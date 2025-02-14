import React, { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from "firebase/firestore";
import { FaLeaf, FaEdit, FaTrashAlt, FaPlus, FaSave } from "react-icons/fa";

const HabitTracker = ({ setActiveTab }) => {
  const [habitsList, setHabitsList] = useState([]);
  const [editingHabit, setEditingHabit] = useState(null);
  const [editedHabit, setEditedHabit] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  // Fetch habits from Firestore
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const habitsRef = collection(db, "habits");
        const q = query(habitsRef, where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        
        const habits = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHabitsList(habits);
      } catch (error) {
        console.error("Error fetching habits:", error);
      }
    };
    fetchHabits();
  }, []);

  // Handle habit editing initiation
  const handleEdit = (habit) => {
    setEditingHabit(habit.id);
    setEditedHabit(habit.habit);
    setEditedDescription(habit.description);
  };

  // Handle habit deletion
  const handleDelete = async (id) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      await deleteDoc(doc(db, "habits", id));
      setHabitsList(habitsList.filter((habit) => habit.id !== id));
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
  };

  // Save edited habit
  const saveEdit = async (id) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const habitRef = doc(db, "habits", id);
      await updateDoc(habitRef, { 
        habit: editedHabit, 
        description: editedDescription,
        updatedAt: new Date()
      });
      
      setHabitsList(
        habitsList.map((habit) =>
          habit.id === id ? { ...habit, habit: editedHabit, description: editedDescription } : habit
        )
      );
      setEditingHabit(null);
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <FaLeaf className="text-3xl text-emerald-600 mr-3" />
          <h2 className="text-3xl font-bold text-emerald-800 font-serif">
            Nature's Progress Tracker
          </h2>
        </div>

        {/* Habit List */}
        <ul className="space-y-4">
          {habitsList.map((habit) => (
            <li 
              key={habit.id} 
              className="group relative transition-transform duration-200 hover:scale-[1.005]"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-emerald-50 hover:shadow-emerald-100/30 transition-all">
                {editingHabit === habit.id ? (
                  // Edit Mode
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editedHabit}
                      onChange={(e) => setEditedHabit(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-emerald-50/50"
                      placeholder="Habit name"
                    />
                    <textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-emerald-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-emerald-50/50"
                      rows="3"
                      placeholder="Describe your habit..."
                    />
                    <button
                      onClick={() => saveEdit(habit.id)}
                      className="bg-emerald-600 text-white px-6 py-2 rounded-lg flex items-center hover:bg-emerald-700 transition-colors"
                    >
                      <FaSave className="mr-2" />
                      Save Changes
                    </button>
                  </div>
                ) : (
                  // Display Mode
                  <div className="flex justify-between items-start">
                    <div className="pr-4">
                      <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                        {habit.habit}
                      </h3>
                      <p className="text-emerald-600/90 mb-3">{habit.description}</p>
                      <div className="flex gap-4 text-sm">
                        <div className="bg-green-100 px-3 py-1 rounded-full">
                          🌱 {habit.co2Saved}kg CO₂
                        </div>
                        <div className="bg-blue-100 px-3 py-1 rounded-full">
                          💧 {habit.waterConserved}L
                        </div>
                        <div className="bg-yellow-100 px-3 py-1 rounded-full">
                          🛍️ {habit.plasticReduced}g
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(habit)}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Edit habit"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(habit.id)}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete habit"
                      >
                        <FaTrashAlt className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Add Habit Button */}
        <button
          onClick={() => setActiveTab("add-habit")}
          className="mt-8 bg-emerald-600 text-white px-6 py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-emerald-700 transition-all w-full shadow-lg hover:shadow-emerald-200"
        >
          <FaPlus className="w-5 h-5" />
          <span className="font-semibold">Cultivate New Habit</span>
        </button>
      </div>
    </div>
  );
};

export default HabitTracker;