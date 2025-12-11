import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../api';

export default function Navbar({ setAuth }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setAuth(false);
    navigate('/login');
  };

  return (
    <header className="topbar">
      <div className="navbar">
        <div className="logo">
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Savenow
          </Link>
        </div>

        <nav className="nav-links">
          <Link to="/products">Products</Link>
          <Link to="/upload">Upload Bill</Link>
          <button className="btn" onClick={logout}>Logout</button>
        </nav>
      </div>
    </header>
  );
}
