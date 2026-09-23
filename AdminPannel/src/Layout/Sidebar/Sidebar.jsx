import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Home,
  FileText,
  Bell,
  Calendar,
  Users,
  HeartHandshake,
  Image as ImageIcon,
  Video,
  ThumbsUp,
  CheckSquare,
  Award,
  Layers,
  MessageSquare,
  Mail,
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  PenTool,
  FolderKanban,
  PlusCircle,
  Edit3,
  UserPlus,
  UserCheck,
  Settings,
  User,
  LogOut,
} from "lucide-react";

import "./Sidebar.css";

// Replace this with your actual logo path if required
import logo from "../../assets/HealthyLogo.webp";

const Sidebar = ({
  isCollapsed,
  isMobileOpen,
  onToggleCollapse = () => {},
  onProfileClick = () => {},
  onLogout = () => {},

  brandName = "Healthy Heaven",
  brandTagline = "Admin Panel",

  user = {
    name: "Admin",
    role: "Super Administrator",
    initials: "AD",
    avatarUrl: "",
  },

  version = "v1.0.0",
}) => {
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (title) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const menuItems = [
    // =========================
    // DASHBOARD
    // =========================
    {
      type: "link",
      icon: <Home size={19} />,
      text: "Dashboard",
      path: "/",
      primary: true,
    },

    // =========================
    // CONTENT MANAGEMENT
    // =========================
    {
      type: "section-heading",
      text: "Content Management",
    },

    {
      type: "dropdown",
      icon: <FileText size={19} />,
      text: "Blogs",
      subItems: [
        {
          text: "Create Blog",
          path: "/blogs/create",
          icon: <PenTool size={16} />,
        },
        {
          text: "Manage Blogs",
          path: "/blogs/manage",
          icon: <FolderKanban size={16} />,
        },
      ],
    },

    {
      type: "dropdown",
      icon: <Bell size={19} />,
      text: "Notices",
      subItems: [
        {
          text: "Add Notice",
          path: "/notices/add",
          icon: <PlusCircle size={16} />,
        },
        {
          text: "Manage Notices",
          path: "/notices/manage",
          icon: <Edit3 size={16} />,
        },
      ],
    },

    {
      type: "dropdown",
      icon: <ImageIcon size={19} />,
      text: "Gallery",
      subItems: [
        {
          text: "Event Gallery",
          path: "/gallery/events",
          icon: <ImageIcon size={16} />,
        },
        {
          text: "Home Gallery",
          path: "/gallery/home",
          icon: <ImageIcon size={16} />,
        },
      ],
    },

    {
      type: "dropdown",
      icon: <Video size={19} />,
      text: "Media Manage",
      subItems: [
        {
          text: "YouTube Videos",
          path: "/media/youtube",
          icon: <Video size={16} />,
        },
        {
          text: "Photos",
          path: "/media/photos",
          icon: <ImageIcon size={16} />,
        },
      ],
    },

    // =========================
    // USER MANAGEMENT
    // =========================
    {
      type: "section-heading",
      text: "User Management",
    },

    {
      type: "link",
      icon: <Users size={19} />,
      text: "Users",
      path: "/users",
    },

    {
      type: "link",
      icon: <HeartHandshake size={19} />,
      text: "Donations",
      path: "/donations/manage",
    },

    // =========================
    // EVENT MANAGEMENT
    // =========================
    {
      type: "section-heading",
      text: "Event Management",
    },

    {
      type: "dropdown",
      icon: <Calendar size={19} />,
      text: "Events",
      subItems: [
        {
          text: "Add Event",
          path: "/events/add",
          icon: <PlusCircle size={16} />,
        },
        {
          text: "Edit Event",
          path: "/events/edit",
          icon: <Edit3 size={16} />,
        },
        {
          text: "Manage Registered",
          path: "/events/registered",
          icon: <Users size={16} />,
        },
      ],
    },

    {
      type: "dropdown",
      icon: <Users size={19} />,
      text: "Team",
      subItems: [
        {
          text: "Add Member",
          path: "/team/add",
          icon: <UserPlus size={16} />,
        },
        {
          text: "Manage Members",
          path: "/team/manage",
          icon: <UserCheck size={16} />,
        },
      ],
    },

    // =========================
    // URU
    // =========================
    {
      type: "section-heading",
      text: "URU Management",
    },

    {
      type: "link",
      icon: <ThumbsUp size={19} />,
      text: "Manage URU",
      path: "/uru/manage",
    },

    {
      type: "link",
      icon: <CheckSquare size={19} />,
      text: "Approve URU",
      path: "/uru/approve",
    },

    {
      type: "link",
      icon: <CheckSquare size={19} />,
      text: "Final URU",
      path: "/uru/final",
    },

    // =========================
    // ACHIEVEMENTS
    // =========================
    {
      type: "section-heading",
      text: "Achievements",
    },

    {
      type: "dropdown",
      icon: <Award size={19} />,
      text: "Achievements",
      subItems: [
        {
          text: "Post Achievement",
          path: "/achievements/post",
          icon: <PlusCircle size={16} />,
        },
        {
          text: "Manage Achievements",
          path: "/achievements/manage",
          icon: <Edit3 size={16} />,
        },
      ],
    },

    // =========================
    // CATEGORIES
    // =========================
    {
      type: "section-heading",
      text: "Categories",
    },

    {
      type: "link",
      icon: <Layers size={19} />,
      text: "Manage Categories",
      path: "/categories/manage",
    },

    // =========================
    // COMMENTS
    // =========================
    {
      type: "section-heading",
      text: "Comments",
    },

    {
      type: "dropdown",
      icon: <MessageSquare size={19} />,
      text: "Comments",
      subItems: [
        {
          text: "Blog Comments",
          path: "/comments/blogs",
          icon: <MessageSquare size={16} />,
        },
        {
          text: "Achievement Comments",
          path: "/comments/achievements",
          icon: <MessageSquare size={16} />,
        },
      ],
    },

    // =========================
    // USERS
    // =========================
    {
      type: "section-heading",
      text: "Communication",
    },

    {
      type: "link",
      icon: <MessageSquare size={19} />,
      text: "User Opinions",
      path: "/users/opinions",
    },

    {
      type: "link",
      icon: <Mail size={19} />,
      text: "Subscribed Newsletter",
      path: "/users/newsletter",
    },

    // =========================
    // SETTINGS
    // =========================
    {
      type: "section-heading",
      text: "Settings",
    },

    {
      type: "link",
      icon: <User size={19} />,
      text: "Profile",
      path: "/profile",
    },

    {
      type: "link",
      icon: <Settings size={19} />,
      text: "Settings",
      path: "/settings",
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="HealthySidebar-overlay"
          onClick={onToggleCollapse}
        />
      )}

      <aside
        className={`HealthySidebar
          ${isCollapsed ? "is-collapsed" : ""}
          ${isMobileOpen ? "is-mobile-open" : ""}
        `}
      >
        {/* Decorative glow */}
        <div className="HealthySidebar-glow HealthySidebar-glow-one" />
        <div className="HealthySidebar-glow HealthySidebar-glow-two" />

        {/* ================= BRAND ================= */}
        <div className="HealthySidebar-brand">
          <div className="HealthySidebar-brand-logo">
            <img
              src={logo}
              alt="Healthy Heaven"
            />
          </div>

          {!isCollapsed && (
            <div className="HealthySidebar-brand-content">
              <h2>{brandName}</h2>
              <span>{brandTagline}</span>
            </div>
          )}

          <button
            type="button"
            className="HealthySidebar-collapse"
            onClick={onToggleCollapse}
            aria-label={
              isCollapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
          >
            <ChevronsLeft size={18} />
          </button>
        </div>

        {/* ================= PROFILE ================= */}
        <button
          type="button"
          className="HealthySidebar-profile"
          onClick={onProfileClick}
        >
          <div className="HealthySidebar-avatar">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
              />
            ) : (
              <span>{user.initials}</span>
            )}

            <span className="HealthySidebar-status" />
          </div>

          {!isCollapsed && (
            <div className="HealthySidebar-profile-info">
              <strong>{user.name}</strong>
              <span>{user.role}</span>
              <small>
                <i />
                Online
              </small>
            </div>
          )}

          {!isCollapsed && (
            <ChevronDown
              size={16}
              className="HealthySidebar-profile-arrow"
            />
          )}
        </button>

        {/* ================= NAVIGATION ================= */}
        <nav className="HealthySidebar-nav">
          {menuItems.map((item, index) => {
            // SECTION TITLE
            if (item.type === "section-heading") {
              return (
                <div
                  key={index}
                  className="HealthySidebar-section"
                >
                  {!isCollapsed && (
                    <>
                      <span />
                      <p>{item.text}</p>
                    </>
                  )}
                </div>
              );
            }

            // NORMAL LINK
            if (item.type === "link") {
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  end={item.path === "/"}
                  title={
                    isCollapsed
                      ? item.text
                      : undefined
                  }
                  className={({ isActive }) =>
                    `HealthySidebar-link ${
                      item.primary
                        ? "HealthySidebar-dashboard"
                        : ""
                    } ${
                      isActive
                        ? "HealthySidebar-active"
                        : ""
                    }`
                  }
                >
                  <span className="HealthySidebar-icon">
                    {item.icon}
                  </span>

                  {!isCollapsed && (
                    <span className="HealthySidebar-text">
                      {item.text}
                    </span>
                  )}

                  {!isCollapsed && !item.primary && (
                    <ChevronRight
                      size={15}
                      className="HealthySidebar-arrow"
                    />
                  )}
                </NavLink>
              );
            }

            // DROPDOWN
            const isDropdownOpen =
              !!openDropdowns[item.text];

            return (
              <div
                key={index}
                className={`HealthySidebar-dropdown ${
                  isDropdownOpen
                    ? "HealthySidebar-dropdown-open"
                    : ""
                }`}
              >
                <button
                  type="button"
                  title={
                    isCollapsed
                      ? item.text
                      : undefined
                  }
                  className="HealthySidebar-link HealthySidebar-dropdown-button"
                  onClick={() => {
                    if (!isCollapsed) {
                      toggleDropdown(item.text);
                    }
                  }}
                >
                  <span className="HealthySidebar-icon">
                    {item.icon}
                  </span>

                  {!isCollapsed && (
                    <>
                      <span className="HealthySidebar-text">
                        {item.text}
                      </span>

                      <ChevronDown
                        size={15}
                        className="HealthySidebar-arrow HealthySidebar-dropdown-arrow"
                      />
                    </>
                  )}
                </button>

                {!isCollapsed && (
                  <div className="HealthySidebar-submenu">
                    {item.subItems.map(
                      (subItem, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={subItem.path}
                          className={({ isActive }) =>
                            `HealthySidebar-submenu-link ${
                              isActive
                                ? "HealthySidebar-submenu-active"
                                : ""
                            }`
                          }
                        >
                          <span className="HealthySidebar-submenu-icon">
                            {subItem.icon}
                          </span>

                          <span>
                            {subItem.text}
                          </span>
                        </NavLink>
                      )
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ================= LOGOUT ================= */}
        <div className="HealthySidebar-bottom">
          <button
            type="button"
            className="HealthySidebar-logout"
            onClick={onLogout}
            title={
              isCollapsed
                ? "Logout"
                : undefined
            }
          >
            <LogOut size={19} />

            {!isCollapsed && (
              <span>Logout</span>
            )}
          </button>

          {!isCollapsed && (
            <div className="HealthySidebar-footer">
              <span>
                {version}
              </span>

              <span>
                Healthy Heaven
              </span>
            </div>
          )}
        </div>

        {/* Decorative leaves */}
        <div className="HealthySidebar-leaves">
          <span className="leaf leaf-one" />
          <span className="leaf leaf-two" />
          <span className="leaf leaf-three" />
          <span className="leaf leaf-four" />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;