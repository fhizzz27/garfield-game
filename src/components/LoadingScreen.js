import React from "react";
import { ProgressBar } from "react-bootstrap";
import { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <h1>Welcome To Garfield</h1>
      <h2>Loading...</h2>
      <ProgressBar now={progress} label={`${progress}%`} style={{ width: "50%", height: "30px", margin: "0 auto" }} />
    </div>
  );
};

export default LoadingScreen;
