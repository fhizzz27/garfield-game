import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Task.css";

const Task = ({ onAddPoints }) => {
  const getTaskStatusFromLocalStorage = () => {
    const savedStatus = localStorage.getItem("taskStatus");
    return savedStatus
      ? JSON.parse(savedStatus)
      : {
          "Login Bonus": false,
          "Invite 3 friends": false,
          "Make A Transaction TON": false,
          "Subscribe Garfield Updates": false,
          "Subscribe Youtube Garfield Airdrop": false,
          "Follow OUR X": false,
          "Subscribe TON channels": false,
        };
  };

  const [taskStatus, setTaskStatus] = useState(getTaskStatusFromLocalStorage);
  const [lastLoginBonusTime, setLastLoginBonusTime] = useState(localStorage.getItem("lastLoginBonusTime") || 0);

  const tasks = [
    { name: "Login Bonus", points: 200 },
    { name: "Invite 3 friends", points: 1500 },
    { name: "Make A Transaction TON", points: 5000 },
    { name: "Subscribe Garfield Updates", points: 999 },
    { name: "Subscribe Youtube Garfield Airdrop", points: 999 },
    { name: "Follow OUR X", points: 999 },
    { name: "Subscribe TON channels", points: 300 },
  ];

  useEffect(() => {
    localStorage.setItem("taskStatus", JSON.stringify(taskStatus));
  }, [taskStatus]);

  useEffect(() => {
    const currentTime = new Date().getTime();
    if (currentTime - lastLoginBonusTime >= 86400000) {
      setTaskStatus((prevState) => ({
        ...prevState,
        "Login Bonus": false,
      }));
    }
  }, [lastLoginBonusTime]);

  const handleButtonClick = (taskName, points) => {
    if (taskStatus[taskName]) {
      toast.error("Tugas ini sudah selesai dan tidak bisa diklik lagi.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const currentTime = new Date().getTime();

    if (taskName === "Login Bonus") {
      if (currentTime - lastLoginBonusTime < 86400000) {
        toast.error("Login Bonus hanya bisa diklaim setiap 24 jam.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
      localStorage.setItem("lastLoginBonusTime", currentTime);
      setLastLoginBonusTime(currentTime);
    }

    onAddPoints(points);
    setTaskStatus((prevState) => ({
      ...prevState,
      [taskName]: true,
    }));
    toast.success("Tugas berhasil diselesaikan!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="task-container">
      <h2 className="task-title">Task List</h2>
      {tasks.map((task) => {
        const currentTime = new Date().getTime();
        const isLoginBonusExpired = currentTime - lastLoginBonusTime >= 86400000;

        return (
          <div key={task.name} className="task-card">
            <div className="task-info">
              <p>{task.name}</p>
              <p className="task-points">
                <img src="/images/GarfieldBOT.png" alt="Gem icon" className="gem-image" /> + {task.points}
              </p>
            </div>
            <button onClick={() => handleButtonClick(task.name, task.points)} className={`task-button ${taskStatus[task.name] ? "task-button-done" : ""}`} disabled={taskStatus[task.name]}>
              {task.name === "Login Bonus" && !isLoginBonusExpired ? "Mining" : taskStatus[task.name] ? "Claimed" : "Start"}
            </button>
          </div>
        );
      })}
      <ToastContainer />
    </div>
  );
};

export default Task;
