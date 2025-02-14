import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./Header.css";

const Header = ({ scrollToFooter }) => {
  const [menuActive, setMenuActive] = useState(false);
  const navigate = useNavigate();

  // Check if the current page is the home page
  const isHomePage = window.location.pathname === "/";

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const goBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <header className="header">
      <a href="#link" className="logo">
        <span>Citro</span>2K25
      </a>

      <nav className={`navbar ${menuActive ? "active" : ""}`}>
        <a href="/">HOME</a>
        <a href="/Timeline">EVENTS</a>
        <a href="/">WORKSHOPS</a>
        <a href="/AboutUs">ABOUT US</a>
        <a href="/Register">Register</a>
      </nav>

      {/* Only render the back button if not on the home page */}
      {!isHomePage && (
        <div className="back-button" onClick={goBack}>
          <FaArrowLeft />
        </div>
      )}

      <div id="menu-bars" className="fas fa-bars" onClick={toggleMenu}></div>
    </header>
  );
};

export default Header;
