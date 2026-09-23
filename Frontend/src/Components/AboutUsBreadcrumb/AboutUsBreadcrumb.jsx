import React from "react";
import "./AboutUsBreadcrumb.css";

// Background image
import AboutUsBreadcrumbImage from "../../assets/breadcrumbcontact.jpg";

const AboutUsBreadcrumb = () => {
  return (
    <section
      className="AboutUsBreadcrumb"
      style={{
        backgroundImage: `url(${AboutUsBreadcrumbImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="AboutUsBreadcrumb__overlay"></div>

      {/* Main Content */}
      <div className="AboutUsBreadcrumb__content">

        {/* Page Title */}
        <h1 className="AboutUsBreadcrumb__title">
          About Us
        </h1>

        {/* Breadcrumb */}
        <div className="AboutUsBreadcrumb__breadcrumb">

          {/* Home */}
          <span className="AboutUsBreadcrumb__home">
            Home
          </span>

          {/* Arrow */}
          <span
            className="AboutUsBreadcrumb__arrow"
            aria-hidden="true"
          >
            ›
          </span>

          {/* Current Page */}
          <span className="AboutUsBreadcrumb__current">
            About Us
          </span>

        </div>
      </div>
    </section>
  );
};

export default AboutUsBreadcrumb;