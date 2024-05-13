import React from 'react'
import { Link } from "react-router-dom"
import "./Navbar.css"

function Navbar() {
  return (
    <div className="navbar"  style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
       <h1 className="navbar-title">Real-time Sensor Data Visualization <p>By Trithanka</p></h1>
       
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/" className="nav-link">View Sensor</Link>
        </li>
        <li className="nav-item">
          <Link to="/create" className="nav-link">Create Sensor</Link>
        </li>
        <li className="nav-item">
          <Link to="/line" className="nav-link">Line Graph</Link>
        </li>
        <li className="nav-item">
          <Link to="/delete" className="nav-link">Delete Sensor</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar
