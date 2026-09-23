import React, { useState } from "react";
import "./Navbar.css";

// Logo
import mainLogo from "../../assets/main-logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="Navbar">
      <div className="Navbar-container">

        {/* =====================================================
            LOGO
        ====================================================== */}
        <a
          href="#home"
          className="Navbar-logo"
          onClick={handleMenuClick}
          aria-label="Healthy Heaven Home"
        >
          <img
            src={mainLogo}
            alt="Healthy Heaven"
            className="Navbar-logoImage"
          />
        </a>

        {/* =====================================================
            NAVIGATION
        ====================================================== */}
        <nav
          className={`Navbar-navigation ${
            menuOpen ? "Navbar-navigationActive" : ""
          }`}
        >
          <a
            href="/home"
            className="Navbar-link Navbar-linkActive"
            onClick={handleMenuClick}
          >
            Home
          </a>

          <a
            href="/about"
            className="Navbar-link"
            onClick={handleMenuClick}
          >
            About
          </a>

          <a
            href="/services"
            className="Navbar-link"
            onClick={handleMenuClick}
          >
            Services
          </a>

          <a
            href="/menu"
            className="Navbar-link"
            onClick={handleMenuClick}
          >
            Menu
          </a>
          <a
            href="/faq"
            className="Navbar-link"
            onClick={handleMenuClick}
          >
            Faq
          </a>

          <a
            href="/gallery"
            className="Navbar-link"
            onClick={handleMenuClick}
          >
            Gallery
          </a>

          <a
            href="/contact"
            className="Navbar-link"
            onClick={handleMenuClick}
          >
            Contact Us
          </a>
        </nav>

        {/* =====================================================
            RIGHT ACTION BUTTONS
        ====================================================== */}
        <div className="Navbar-actions">

          {/* User Button */}
          <button
            type="button"
            className="Navbar-actionButton"
            aria-label="User Account"
          >
            <svg
              className="Navbar-actionIcon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 21C20 17.6863 17.3137 15 14 15H10C6.68629 15 4 17.6863 4 21"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />

              <circle
                cx="12"
                cy="7"
                r="4"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>
          </button>

          {/* Cart Button */}
          <button
            type="button"
            className="Navbar-actionButton Navbar-cartButton"
            aria-label="Shopping Cart"
          >
            <svg
              className="Navbar-actionIcon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 8H18L19.2 20H4.8L6 8Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />

              <path
                d="M9 8V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>

            <span className="Navbar-cartBadge">6</span>
          </button>

        </div>

        {/* =====================================================
            MOBILE MENU BUTTON
        ====================================================== */}
        <button
          type="button"
          className={`Navbar-menuButton ${
            menuOpen ? "Navbar-menuButtonActive" : ""
          }`}
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span className="Navbar-menuLine"></span>
          <span className="Navbar-menuLine"></span>
          <span className="Navbar-menuLine"></span>
        </button>

      </div>
    </header>
  );
};

export default Navbar;