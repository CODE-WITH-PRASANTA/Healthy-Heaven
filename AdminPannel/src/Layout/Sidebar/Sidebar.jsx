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
  PlusCircle,
  Edit3,
  UserPlus,
  UserCheck,
  Settings,
  User,
  LogOut,
  X,
  FolderKanban,
} from "lucide-react";

import logo from "../../assets/HealthyLogo.webp";
import "./Sidebar.css";

const Sidebar = ({
  isCollapsed,
  isMobileOpen,
  onMobileClose = () => {},
  onProfileClick = () => {},
  onLogout = () => {},
  brandName = "Healthy Haven",
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

  const toggleDropdown = (menuName) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [menuName]: !prev[menuName],
    }));
  };

  const handleNavClick = () => {
    if (window.innerWidth <= 768) {
      onMobileClose();
    }
  };

  const menuSections = [
    {
      title: "MAIN",
      items: [
        {
          label: "Dashboard",
          icon: Home,
          path: "/",
        },
      ],
    },

    {
      title: "CONTENT MANAGEMENT",
      items: [
        {
          label: "Blogs",
          icon: FileText,
          dropdown: true,
          children: [
            {
              label: "Create Blog",
              icon: PlusCircle,
              path: "/blogs/create",
            },
            {
              label: "Manage Blogs",
              icon: FolderKanban,
              path: "/blogs/manage",
            },
          ],
        },

        {
          label: "Notices",
          icon: Bell,
          dropdown: true,
          children: [
            {
              label: "Add Notice",
              icon: PlusCircle,
              path: "/notices/add",
            },
            {
              label: "Manage Notices",
              icon: FolderKanban,
              path: "/notices/manage",
            },
          ],
        },

        {
          label: "Gallery",
          icon: ImageIcon,
          dropdown: true,
          children: [
            {
              label: "Event Gallery",
              icon: Calendar,
              path: "/gallery/event",
            },
            {
              label: "Home Gallery",
              icon: ImageIcon,
              path: "/gallery/home",
            },
          ],
        },

        {
          label: "Media Manage",
          icon: Video,
          dropdown: true,
          children: [
            {
              label: "YouTube",
              icon: Video,
              path: "/media/youtube",
            },
            {
              label: "Photos",
              icon: ImageIcon,
              path: "/media/photos",
            },
          ],
        },
      ],
    },

    {
      title: "USER MANAGEMENT",
      items: [
        {
          label: "Users",
          icon: Users,
          path: "/users",
        },
        {
          label: "Donations",
          icon: HeartHandshake,
          path: "/donations",
        },
      ],
    },

    {
      title: "EVENT MANAGEMENT",
      items: [
        {
          label: "Events",
          icon: Calendar,
          dropdown: true,
          children: [
            {
              label: "Add Event",
              icon: PlusCircle,
              path: "/events/add",
            },
            {
              label: "Edit Events",
              icon: Edit3,
              path: "/events/edit",
            },
            {
              label: "Registered Users",
              icon: UserCheck,
              path: "/events/registered",
            },
          ],
        },

        {
          label: "Team",
          icon: Users,
          dropdown: true,
          children: [
            {
              label: "Add Team Member",
              icon: UserPlus,
              path: "/team/add",
            },
            {
              label: "Manage Team",
              icon: FolderKanban,
              path: "/team/manage",
            },
          ],
        },
      ],
    },

    {
      title: "URU MANAGEMENT",
      items: [
        {
          label: "Manage URU",
          icon: Layers,
          path: "/uru/manage",
        },
        {
          label: "Approve URU",
          icon: CheckSquare,
          path: "/uru/approve",
        },
        {
          label: "Final URU",
          icon: ThumbsUp,
          path: "/uru/final",
        },
      ],
    },

    {
      title: "ACHIEVEMENTS",
      items: [
        {
          label: "Post Achievement",
          icon: Award,
          path: "/achievements/post",
        },
        {
          label: "Manage Achievements",
          icon: FolderKanban,
          path: "/achievements/manage",
        },
      ],
    },

    {
      title: "CATEGORIES",
      items: [
        {
          label: "Manage Categories",
          icon: Layers,
          path: "/categories",
        },
      ],
    },

    {
      title: "COMMENTS",
      items: [
        {
          label: "Blog Comments",
          icon: MessageSquare,
          path: "/comments/blog",
        },
        {
          label: "Achievement Comments",
          icon: MessageSquare,
          path: "/comments/achievement",
        },
      ],
    },

    {
      title: "COMMUNICATION",
      items: [
        {
          label: "User Opinions",
          icon: MessageSquare,
          path: "/communication/opinions",
        },
        {
          label: "Subscribed Newsletter",
          icon: Mail,
          path: "/communication/newsletter",
        },
      ],
    },

    {
      title: "SETTINGS",
      items: [
        {
          label: "Profile",
          icon: User,
          path: "/profile",
          onClick: onProfileClick,
        },
        {
          label: "Settings",
          icon: Settings,
          path: "/settings",
        },
      ],
    },
  ];

  return (
    <aside
      className={`
        HealthySidebar
        ${isCollapsed ? "is-collapsed" : ""}
        ${isMobileOpen ? "is-mobile-open" : ""}
      `}
    >
      {/* Mobile Close */}
      {isMobileOpen && (
        <button
          type="button"
          className="HealthySidebar-mobile-close"
          onClick={onMobileClose}
          aria-label="Close sidebar"
        >
          <X size={21} strokeWidth={2.4} />
        </button>
      )}

      {/* Decorative background */}
      <div className="HealthySidebar-glow HealthySidebar-glow-one" />
      <div className="HealthySidebar-glow HealthySidebar-glow-two" />

      {/* BRAND */}
      <div className="HealthySidebar-brand">
        <div className="HealthySidebar-logo-wrap">
          <img
            src={logo}
            alt="Healthy Heaven"
            className="HealthySidebar-logo"
          />
        </div>

        <div className="HealthySidebar-brand-text">
          <h2>{brandName}</h2>
          <span>{brandTagline}</span>
        </div>
      </div>

      {/* PROFILE */}
      <div
        className="HealthySidebar-profile"
        onClick={onProfileClick}
        role="button"
        tabIndex={0}
      >
        <div className="HealthySidebar-avatar">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} />
          ) : (
            <span>
              {user.initials ||
                user.name
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
            </span>
          )}
        </div>

        <div className="HealthySidebar-profile-info">
          <strong>{user.name}</strong>
          <span>{user.role}</span>
        </div>

        <div className="HealthySidebar-profile-status" />
      </div>

      {/* NAVIGATION */}
      <div className="HealthySidebar-navigation">
        {menuSections.map((section) => (
          <div
            className="HealthySidebar-section"
            key={section.title}
          >
            {!isCollapsed && (
              <div className="HealthySidebar-section-title">
                {section.title}
              </div>
            )}

            <div className="HealthySidebar-menu">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isOpen = openDropdowns[item.label];

                /* DROPDOWN MENU */
                if (item.dropdown) {
                  return (
                    <div
                      className="HealthySidebar-dropdown"
                      key={item.label}
                    >
                      <button
                        type="button"
                        className={`
                          HealthySidebar-menu-item
                          HealthySidebar-dropdown-toggle
                          ${isOpen ? "dropdown-open" : ""}
                        `}
                        onClick={() => toggleDropdown(item.label)}
                        title={isCollapsed ? item.label : undefined}
                      >
                        <span className="HealthySidebar-menu-icon">
                          <Icon
                            size={19}
                            strokeWidth={2}
                          />
                        </span>

                        <span className="HealthySidebar-menu-label">
                          {item.label}
                        </span>

                        {!isCollapsed && (
                          <span className="HealthySidebar-dropdown-arrow">
                            {isOpen ? (
                              <ChevronDown size={16} />
                            ) : (
                              <ChevronRight size={16} />
                            )}
                          </span>
                        )}
                      </button>

                      {!isCollapsed && isOpen && (
                        <div className="HealthySidebar-submenu">
                          {item.children.map((child) => {
                            const ChildIcon = child.icon;

                            return (
                              <NavLink
                                key={child.path}
                                to={child.path}
                                className={({ isActive }) =>
                                  `HealthySidebar-submenu-item ${
                                    isActive ? "active" : ""
                                  }`
                                }
                                onClick={handleNavClick}
                              >
                                <span className="HealthySidebar-submenu-line" />

                                <span className="HealthySidebar-submenu-icon">
                                  <ChildIcon
                                    size={15}
                                    strokeWidth={2}
                                  />
                                </span>

                                <span>{child.label}</span>
                              </NavLink>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                /* NORMAL MENU ITEM */
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `HealthySidebar-menu-item ${
                        isActive ? "active" : ""
                      }`
                    }
                    onClick={(event) => {
                      if (item.onClick) {
                        item.onClick(event);
                      }

                      handleNavClick();
                    }}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <span className="HealthySidebar-menu-icon">
                      <Icon
                        size={19}
                        strokeWidth={2}
                      />
                    </span>

                    <span className="HealthySidebar-menu-label">
                      {item.label}
                    </span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="HealthySidebar-footer">
        <button
          type="button"
          className="HealthySidebar-logout"
          onClick={onLogout}
          title={isCollapsed ? "Logout" : undefined}
        >
          <span className="HealthySidebar-logout-icon">
            <LogOut size={18} />
          </span>

          <span className="HealthySidebar-menu-label">
            Logout
          </span>
        </button>

        {!isCollapsed && (
          <div className="HealthySidebar-version">
            <span>Healthy Haven</span>
            <small>{version}</small>
          </div>
        )}
      </div>

      {/* Decorative leaves */}
      <div className="HealthySidebar-leaf leaf-one">
        🍃
      </div>

      <div className="HealthySidebar-leaf leaf-two">
        🌿
      </div>
    </aside>
  );
};

export default Sidebar;