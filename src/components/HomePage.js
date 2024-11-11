import { useState, useEffect } from "react";
import Task from "./Task";
import "./HomePage.css";
import { TonConnect, WalletAlreadyConnectedError } from "@tonconnect/sdk";
import { useTonConnectUI } from "@tonconnect/ui-react"; // Pastikan ini diinstal

const HomePage = () => {
  const [points, setPoints] = useState(1900);
  const [checkedIn, setCheckedIn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const tonConnect = new TonConnect();
  const [isConnected, setIsConnected] = useState(false);
  const { openWalletConnection, wallet } = useTonConnectUI();

  useEffect(() => {
    // Load poin dan status check-in dari localStorage
    const storedPoints = localStorage.getItem("points");
    if (storedPoints) {
      setPoints(parseInt(storedPoints, 10));
    }

    const lastCheckIn = localStorage.getItem("lastCheckIn");
    if (lastCheckIn) {
      const lastDate = new Date(lastCheckIn);
      const today = new Date();

      if (lastDate.getDate() === today.getDate() && lastDate.getMonth() === today.getMonth() && lastDate.getFullYear() === today.getFullYear()) {
        setCheckedIn(true);
        const timeElapsed = today - lastDate;
        const remainingTime = 24 * 60 * 60 * 1000 - timeElapsed;
        if (remainingTime > 0) {
          setTimeLeft(remainingTime);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1000) {
            clearInterval(timer);
            setCheckedIn(false);
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleCheckIn = () => {
    if (!checkedIn) {
      const newPoints = points + 750;
      setPoints(newPoints);
      setCheckedIn(true);
      setTimeLeft(24 * 60 * 60 * 1000); // 24 jam dalam milidetik
      localStorage.setItem("points", newPoints);
      localStorage.setItem("lastCheckIn", new Date().toISOString());
    }
  };

  const formatTimeLeft = () => {
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const btnWallet = async () => {
    try {
      await openWalletConnection();
      setIsConnected(true);
      alert("Wallet connected successfully!");
    } catch (error) {
      if (error instanceof WalletAlreadyConnectedError) {
        alert("Wallet is already connected.");
      } else {
        alert("Failed to connect wallet.");
      }
    }
  };

  return (
    <div className="image-container">
      <button className="btn_wallet" onClick={btnWallet}>
        {isConnected ? "Wallet Connected" : "Connect Wallet"}
      </button>
      <div className="wrapper">
        <img src="/images/GarfieldBot.png" alt="Deskripsi Gambar" className="centered-image" />
      </div>
      <div className="Point">
        <h1>{points.toLocaleString("en-US")}</h1> {/* Format angka dengan koma */}
        <p className="paragraf">$GRF</p>
      </div>
      <button onClick={handleCheckIn} disabled={checkedIn} className="btn-check-in">
        {checkedIn ? `Check in (${formatTimeLeft()})` : "Claim Points"}
      </button>
      <div className="comunitas-box">
        <p>JOIN OUR COMMUNITY</p>
      </div>
      <div className="comunitas-box">
        <p>BOOST CHANNEL</p>
      </div>
    </div>
  );
};

export default HomePage;
