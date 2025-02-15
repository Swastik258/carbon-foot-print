import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  Settings, User, Home, Calendar, Award, Leaf, TrendingDown, Users, 
  ChevronDown, LogOut, Sun, Moon, Bell, Palette, Menu
} from "lucide-react";
import HabitTracker from "./HabitTracker";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Impact from "../impacts/Impact";
import AddHabit from "../habits/AddHabit";
import Goal from "./Goal";
import Community from "./Community";

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const themeColors = {
    light: {
      background: "bg-gray-100",
      sidebar: "bg-white",
      header: "bg-white",
      text: "text-gray-800",
      hover: "hover:bg-gray-50",
      chartLine: "#059669",
    },
    dark: {
      background: "bg-gray-900",
      sidebar: "bg-gray-800",
      header: "bg-gray-800",
      text: "text-gray-100",
      hover: "hover:bg-gray-700",
      chartLine: "#10B981",
    }
  };

  const currentTheme = isDarkMode ? themeColors.dark : themeColors.light;

  return (
    <div className={`flex h-screen ${currentTheme.background} transition-colors duration-300`}>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-emerald-500 text-white shadow-lg"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative w-64 h-full transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${currentTheme.sidebar} z-40 shadow-lg`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
          <Leaf className="text-emerald-500" />
          <span className={`text-xl font-bold ${currentTheme.text}`}>EcoTrack</span>
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
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all ${
                    activeTab === id 
                    ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300" 
                    : `${currentTheme.text} ${currentTheme.hover}`
                  }`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  <span className="text-sm md:text-base">{label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Backdrop for mobile sidebar */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto md:ml-0">
        {/* Header */}
        <header className={`shadow-sm p-4 flex justify-between items-center ${currentTheme.header}`}>
          <h1 className={`text-xl md:text-2xl font-bold capitalize ${currentTheme.text}`}>
            {activeTab}
          </h1>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg ${currentTheme.hover}`}
            >
              {isDarkMode ? (
                <Sun className="text-yellow-400" size={20} />
              ) : (
                <Moon className="text-gray-600" size={20} />
              )}
            </button>

            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg ${currentTheme.hover}`}
              >
                <User className="text-emerald-600 dark:text-emerald-400" size={20} />
                <span className={`${currentTheme.text} text-sm md:text-base`}>
                  {userName || "John Doe"}
                </span>
                <ChevronDown className={`${currentTheme.text}`} size={16} />
              </button>
              
              {showProfileMenu && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 z-10 ${currentTheme.sidebar} border border-gray-200 dark:border-gray-700`}>
                  <button className={`w-full px-4 py-2 text-left ${currentTheme.text} ${currentTheme.hover}`}>
                    <User size={16} className="mr-2 inline" /> Profile
                  </button>
                  <button className={`w-full px-4 py-2 text-left ${currentTheme.text} ${currentTheme.hover}`}>
                    <Bell size={16} className="mr-2 inline" /> Notifications
                  </button>
                  <button 
                    onClick={() => setActiveTab('settings')}
                    className={`w-full px-4 py-2 text-left ${currentTheme.text} ${currentTheme.hover}`}
                  >
                    <Palette size={16} className="mr-2 inline" /> Theme Settings
                  </button>
                  <button 
                    onClick={handleLogout}
                    className={`w-full px-4 py-2 text-left text-red-600 ${currentTheme.hover}`}
                  >
                    <LogOut size={16} className="mr-2 inline" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 md:p-6">
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
              <div className={`rounded-xl p-4 md:p-6 shadow-lg ${currentTheme.sidebar}`}>
                <h3 className={`text-base md:text-lg font-semibold mb-4 ${currentTheme.text}`}>
                  Weekly Carbon Savings
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockData.weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#4B5563" : "#E5E7EB"} />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fill: isDarkMode ? '#F3F4F6' : '#374151' }} 
                    />
                    <YAxis 
                      tick={{ fill: isDarkMode ? '#F3F4F6' : '#374151' }} 
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                        borderColor: isDarkMode ? '#374151' : '#E5E7EB',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="carbonSaved" 
                      stroke={currentTheme.chartLine} 
                      strokeWidth={2}
                      dot={{ fill: currentTheme.chartLine, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className={`rounded-xl p-4 md:p-6 shadow-lg ${currentTheme.sidebar}`}>
                <h3 className={`text-base md:text-lg font-semibold mb-4 ${currentTheme.text}`}>
                  Habits Progress
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockData.habits}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#4B5563" : "#E5E7EB"} />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: isDarkMode ? '#F3F4F6' : '#374151' }} 
                    />
                    <YAxis 
                      tick={{ fill: isDarkMode ? '#F3F4F6' : '#374151' }} 
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                        borderColor: isDarkMode ? '#374151' : '#E5E7EB',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="progress" 
                      fill={currentTheme.chartLine}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeTab === "habits" && (
            <HabitTracker
              setActiveTab={setActiveTab}
              habitsList={habitsList}
              setHabitsList={setHabitsList}
              isDarkMode={isDarkMode}
            />
          )}
          
          {activeTab === "impact" && <Impact isDarkMode={isDarkMode} />}
          
          {activeTab === "add-habit" && (
            <AddHabit
              setActiveTab={setActiveTab}
              habitsList={habitsList}
              setHabitsList={setHabitsList}
              isDarkMode={isDarkMode}
            />
          )}
          
          {activeTab === "goals" && <Goal isDarkMode={isDarkMode} />}

          {activeTab === "community" && <Community isDarkMode={isDarkMode} />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;