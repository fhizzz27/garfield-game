import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AirdropPage from "./components/AirdropPage";
import Task from "./components/Task";
import HomePage from "./components/HomePage";
import FriendPage from "./components/FriendPage";
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./LoadingScreen.css";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [points, setPoints] = useState(1900); // Pastikan ini ada di dalam komponen App

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // 4 detik

    return () => clearTimeout(timer);
  }, []);

  // Fungsi untuk menambahkan poin
  const handleAddPoints = (additionalPoints) => {
    const newPoints = points + additionalPoints;
    setPoints(newPoints);
    localStorage.setItem("points", newPoints);
  };

  return (
    <Router>
      <div className="app">
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/airdrop" element={<AirdropPage />} />
              {/* Oper fungsi handleAddPoints sebagai prop */}
              <Route path="/task" element={<Task onAddPoints={handleAddPoints} />} />
              <Route path="/friends" element={<FriendPage />} />
            </Routes>
            <Navbar />
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
