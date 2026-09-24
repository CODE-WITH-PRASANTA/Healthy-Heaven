import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
        <Link
          to="/"
          className="Navbar-logo"
          onClick={handleMenuClick}
          aria-label="Healthy Heaven Home"
        >
          <img
            src={mainLogo}
            alt="Healthy Heaven"
            className="Navbar-logoImage"
          />
        </Link>

        {/* =====================================================
            NAVIGATION (Dynamic active routes)
        ====================================================== */}
        <nav
          className={`Navbar-navigation ${
            menuOpen ? "Navbar-navigationActive" : ""
          }`}
        >
          <NavLink
            to="/home"
            end
            className={({ isActive }) =>
              `Navbar-link ${isActive ? "Navbar-linkActive" : ""}`
            }
            onClick={handleMenuClick}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `Navbar-link ${isActive ? "Navbar-linkActive" : ""}`
            }
            onClick={handleMenuClick}
          >
            About
          </NavLink>

          <NavLink
            to="/menu"
            className={({ isActive }) =>
              `Navbar-link ${isActive ? "Navbar-linkActive" : ""}`
            }
            onClick={handleMenuClick}
          >
            Menu
          </NavLink>

          <NavLink
            to="/faq"
            className={({ isActive }) =>
              `Navbar-link ${isActive ? "Navbar-linkActive" : ""}`
            }
            onClick={handleMenuClick}
          >
            Faq
          </NavLink>

          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `Navbar-link ${isActive ? "Navbar-linkActive" : ""}`
            }
            onClick={handleMenuClick}
          >
            Gallery
          </NavLink>
          <NavLink
            to="/testimonial"
            className={({ isActive }) =>
              `Navbar-link ${isActive ? "Navbar-linkActive" : ""}`
            }
            onClick={handleMenuClick}
          >
            Testimonial
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `Navbar-link ${isActive ? "Navbar-linkActive" : ""}`
            }
            onClick={handleMenuClick}
          >
            Contact Us
          </NavLink>
        </nav>

        {/* =====================================================
            RIGHT ACTION BUTTONS
        ====================================================== */}
        <div className="Navbar-actions">
          {/* User Profile Button */}
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
            MOBILE MENU TOGGLE
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