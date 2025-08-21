import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';
import { FaSearch } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";

const Navbar = ({ user, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggle = () => {
    document.getElementById("tog")?.classList.toggle("open");
    document.getElementById("togg")?.classList.toggle("open");
  };

  const handleSearch = () => {
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
      setSearchQuery('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <header>
      <nav>
        <div className="logo" onClick={() => navigate("/")}>
          <h1>Movie App</h1>
        </div>

        <div className="search">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch}><FaSearch /></button>
        </div>

        <div className="menu" id="tog">
          <ul>
            <li onClick={() => navigate("/trending")}>Trending</li>
            <li onClick={() => navigate("/best-2025")}>Best from 2025</li>
            <li onClick={() => navigate("/popular")}>Most Popular</li>
            <li onClick={() => navigate("/categories")}>Categories</li>
          </ul>
        </div>

        <div className="login" id="togg">
          {user ? (
            <div className="lo">
              <span className="user-email">{user.email}</span>
              <button className="sign-in" onClick={onLogout}>Logout</button>
            </div>
          ) : (
            <div className="lo">
              <button className="sign-in" onClick={() => navigate("/login")}>Sign In</button>
              <button className="sign-up" onClick={() => navigate("/signup")}>Sign Up</button>
            </div>
          )}
        </div>

        <div className="bar">
          <span onClick={toggle}><FaBarsStaggered /></span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
