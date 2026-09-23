import React from "react";
import "./MenuDetailsBreadcrumb.css";

// Background image
import MenuDetailsBreadcrumbImage from "../../assets/breadcrumbcontact.jpg";

const MenuDetailsBreadcrumb = () => {
  return (
    <section
      className="MenuDetailsBreadcrumb"
      style={{
        backgroundImage: `url(${MenuDetailsBreadcrumbImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="MenuDetailsBreadcrumb__overlay"></div>

      {/* Main Content */}
      <div className="MenuDetailsBreadcrumb__content">

        {/* Page Title */}
        <h1 className="MenuDetailsBreadcrumb__title">
          Menu Details
        </h1>

        {/* Breadcrumb */}
        <div className="MenuDetailsBreadcrumb__breadcrumb">

          {/* Home */}
          <span className="MenuDetailsBreadcrumb__home">
            Home
          </span>

          {/* Arrow */}
          <span
            className="MenuDetailsBreadcrumb__arrow"
            aria-hidden="true"
          >
            ›
          </span>

          {/* Current Page */}
          <span className="MenuDetailsBreadcrumb__current">
            Menu Details
          </span>

        </div>
      </div>
    </section>
  );
};

export default MenuDetailsBreadcrumb;