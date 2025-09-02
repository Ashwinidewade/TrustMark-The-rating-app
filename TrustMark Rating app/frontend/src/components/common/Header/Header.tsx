import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import './Header.css';
import logo from '../../../assets/logo.png'; // Make sure this exists

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={logo} alt="TrustMark Logo" className="logo-image" />
          <div className="logo-text-container">
            <span className="logo-text">TrustMark</span>
            <span className="logo-subtext">Store Ratings</span>
          </div>
        </Link>

        <nav className="nav">
          {user ? (
            <>
              <span className="user-info">
                Welcome, {user.name} ({user.role})
              </span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
