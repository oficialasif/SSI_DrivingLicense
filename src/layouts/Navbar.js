// src/layouts/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Custom CSS for styling

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeMenuOnClick = () => {
    setIsOpen(false); // Close menu when an item is clicked
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <button
          className={`hamburger ${isOpen ? 'open' : ''}`}
          onClick={toggleNavbar}
          aria-label="Toggle navigation"
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>

        <Link className="navbar-brand" to="/">
          SSI License
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <ul>
            <li><Link to="/" onClick={closeMenuOnClick}>Home</Link></li>
            <li><Link to="/about" onClick={closeMenuOnClick}>About Us</Link></li>
            <li><Link to="/future-works" onClick={closeMenuOnClick}>Future Works</Link></li>
            {user ? (
              <>
                <li><Link to={`/${user.role}-dashboard`} onClick={closeMenuOnClick}>Dashboard</Link></li>
                <li>
                  <button className="logout-btn" onClick={() => { handleLogout(); closeMenuOnClick(); }}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/login" onClick={closeMenuOnClick}>Login</Link></li>
                <li><Link to="/register" onClick={closeMenuOnClick}>Signup</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
