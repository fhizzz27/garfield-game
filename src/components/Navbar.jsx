import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-bottom">
      <div className="container-fluid justify-content-around">
        <Link to="/" className="navbar-brand">
          <i className="fas fa-home"></i>
          <p>Home</p>
        </Link>
        <Link to="/airdrop" className="navbar-brand">
          <i className="fas fa-gift"></i>
          <p>Airdrop</p>
        </Link>
        <Link to="/task" className="navbar-brand">
          <i className="fas fa-tasks"></i>
          <p>Earn</p>
        </Link>
        <Link to="/friends" className="navbar-brand">
          <i className="fas fa-users"></i>
          <p>friends</p>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
