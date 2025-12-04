import React from 'react';
import { Link } from 'react-router-dom';
import ExpertChat from '../ExpertChat';
import './styles.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span>Policy</span>Management
        </Link>
        
        <div className="nav-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/policies" className="nav-link">
            Policies
          </Link>
          <Link to="/about" className="nav-link">
            About Us
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </div>
        
        <div className="nav-actions">
          <Link to="/login" className="login-button">
            Login
          </Link>
          <Link to="/register" className="register-button">
            Register
          </Link>
          
          {/* reserved for authenticated user menu — keep hidden for pre-login UI
          <div className="hidden" data-role="auth-logout" aria-hidden="true">Logout</div>
          <div className="hidden" data-role="auth-dashboard" aria-hidden="true">My Dashboard</div> */}
          
          <div className="expert-chat-desktop">
            <ExpertChat />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
