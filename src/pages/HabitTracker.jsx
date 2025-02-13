import React, { useState, useEffect } from "react";
import { db,auth } from "../firebaseConfig"; // Firestore config
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where 
} from "firebase/firestore";
const HabitTracker = ({ setActiveTab }) => {
  const [habitsList, setHabitsList] = useState([]);
  const [editingHabit, setEditingHabit] = useState(null);
  const [editedHabit, setEditedHabit] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  // Fetch habits from Firestore on component mount
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

  // Handle deleting a habit
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

  // Save the edited habit
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
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Habit Tracker</h2>

      {/* Habit List */}
      <ul className="space-y-4">
        {habitsList.map((habit) => (
          <li key={habit.id} className="p-4 border rounded-lg">
            {editingHabit === habit.id ? (
              // Edit Mode
              <div className="space-y-2">
                <input
                  type="text"
                  value={editedHabit}
                  onChange={(e) => setEditedHabit(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
                <textarea
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  rows="2"
                />
                <button
                  onClick={() => saveEdit(habit.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            ) : (
              // Display Mode
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{habit.habit}</h3>
                  <p className="text-gray-600">{habit.description}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(habit)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(habit.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Button to Open Add Habit Form */}
      <button
        onClick={() => setActiveTab("add-habit")}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Add Habit
      </button>
    </div>
  );
};

export default HabitTracker;
