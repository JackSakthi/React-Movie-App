import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2>🎬 Movie App</h2>
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>

        <div className="footer-right">
          <ul>
            <li><Link to="/trending">Trending</Link></li>
            <li><Link to="/categories">Categories</Link></li>
            <li><Link to="/popular">Top Rated</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
