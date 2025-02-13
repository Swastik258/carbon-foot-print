import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import HabitTracker from "../pages/HabitTracker";
import Impact from "../impacts/Impact";
import AddHabit from "../habits/AddHabit";
import Goal from "../pages/Goal";
import Community from "../pages/Community";

function AppRoute() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/habit-tracker" element={<HabitTracker />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/add-habit" element={<AddHabit />} />
        <Route path="/goal" element={<Goal />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </Router>
  );
}

export default AppRoute;
