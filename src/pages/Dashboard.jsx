import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  Settings, User, Home, Calendar, Award, Leaf, TrendingDown, Users, ChevronDown, LogOut, Menu
} from "lucide-react";
import HabitTracker from "./HabitTracker";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Impact from "./Impact";
import AddHabit from "../habits/AddHabit";
import Goal from "./Goal";

const mockData = {
  weeklyProgress: [
    { day: "Mon", carbonSaved: 2.4 },
    { day: "Tue", carbonSaved: 3.1 },
    { day: "Wed", carbonSaved: 2.8 },
    { day: "Thu", carbonSaved: 4.2 },
    { day: "Fri", carbonSaved: 3.5 },
    { day: "Sat", carbonSaved: 2.9 },
    { day: "Sun", carbonSaved: 3.8 },
  ],
  habits: [
    { name: "Public Transport", progress: 80 },
    { name: "Recycling", progress: 65 },
    { name: "Energy Saving", progress: 90 },
    { name: "Water Conservation", progress: 70 },
  ],
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState("");
  const [habitsList, setHabitsList] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserName(userSnap.data().name);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`w-64 bg-white shadow-lg fixed lg:relative transform transition-transform duration-200 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 z-30`}>
        <div className="p-4 border-b flex items-center gap-2">
          <Leaf className="text-emerald-500" />
          <span className="text-xl font-bold text-emerald-800">EcoTrack</span>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {[
              { icon: Home, label: "Dashboard", id: "dashboard" },
              { icon: Calendar, label: "Habits", id: "habits" },
              { icon: TrendingDown, label: "Impact", id: "impact" },
              { icon: Award, label: "Goals", id: "goals" },
              { icon: Users, label: "Community", id: "community" },
              { icon: Settings, label: "Settings", id: "settings" },
            ].map(({ icon: Icon, label, id }) => (
              <li key={id}>
                <button
                  onClick={() => {
                    setActiveTab(id);
                    setIsSidebarOpen(false); // Close sidebar on mobile after clicking a link
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === id ? "bg-emerald-50 text-emerald-700" : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-50"
          >
            <Menu size={24} className="text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 capitalize">{activeTab}</h1>
          {/* Profile Section */}
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <User className="text-emerald-600" size={20} />
              <span className="text-gray-700">{userName || "John Doe"}</span>
              <ChevronDown className="text-gray-500" size={16} />
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                <button className="w-full px-4 py-2 text-left text-black-600 hover:bg-gray-50">
                  Profile
                </button>
                <button className="w-full px-4 py-2 text-left text-black-600 hover:bg-gray-50">
                  Notification
                </button>
                <button onClick={handleLogout} className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-50">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === "dashboard" && (
            <>
              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                {/* Weekly Progress Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Carbon Savings</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={mockData.weeklyProgress}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="carbonSaved" stroke="#059669" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Habits Progress */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Habits Progress</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={mockData.habits}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="progress" fill="#059669" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}

          {activeTab === "dashboard" && <h2>Welcome to your dashboard!</h2>}
          {activeTab === "habits" && (
            <HabitTracker
              setActiveTab={setActiveTab}
              habitsList={habitsList}
              setHabitsList={setHabitsList}
            />
          )}
          {activeTab === "impact" && <Impact />}
          {activeTab === "add-habit" && (
            <AddHabit
              setActiveTab={setActiveTab}
              habitsList={habitsList}
              setHabitsList={setHabitsList}
            />
          )}
          {activeTab === "goals" && <Goal />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;