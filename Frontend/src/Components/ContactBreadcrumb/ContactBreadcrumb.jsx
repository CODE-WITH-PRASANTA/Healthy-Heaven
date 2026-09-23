import React from "react";
import "./ContactBreadcrumb.css";

// Background image
import ContactBreadcrumbImage from "../../assets/breadcrumbcontact.jpg";

const ContactBreadcrumb = () => {
  return (
    <section
      className="ContactBreadcrumb"
      style={{
        backgroundImage: `url(${ContactBreadcrumbImage})`,
      }}
    >
      {/* Dark overlay */}
      <div className="ContactBreadcrumb__overlay"></div>

      {/* Content */}
      <div className="ContactBreadcrumb__content">

        {/* Heading */}
        <h1 className="ContactBreadcrumb__title">
          Contact Us
        </h1>

        {/* Breadcrumb */}
        <div className="ContactBreadcrumb__breadcrumb">

          <span className="ContactBreadcrumb__home">
            Home
          </span>

          <span
            className="ContactBreadcrumb__arrow"
            aria-hidden="true"
          >
            ›
          </span>

          <span className="ContactBreadcrumb__current">
            Contact Us
          </span>

        </div>

      </div>
    </section>
  );
};

export default ContactBreadcrumb;