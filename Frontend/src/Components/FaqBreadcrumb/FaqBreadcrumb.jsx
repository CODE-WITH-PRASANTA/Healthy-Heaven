import React from "react";
import "./FaqBreadcrumb.css";

// Background image
import FaqBreadcrumbImage from "../../assets/breadcrumbcontact.jpg";

const FaqBreadcrumb = () => {
  return (
    <section
      className="FaqBreadcrumb"
      style={{
        backgroundImage: `url(${FaqBreadcrumbImage})`,
      }}
    >
      {/* Dark Overlay */}
      <div className="FaqBreadcrumb__overlay"></div>

      {/* Main Content */}
      <div className="FaqBreadcrumb__content">
        {/* Page Title */}
        <h1 className="FaqBreadcrumb__title">FAQ</h1>

        {/* Breadcrumb */}
        <div className="FaqBreadcrumb__breadcrumb">
          <span className="FaqBreadcrumb__home">Home</span>

          <span
            className="FaqBreadcrumb__arrow"
            aria-hidden="true"
          >
            ›
          </span>

          <span className="FaqBreadcrumb__current">FAQ</span>
        </div>
      </div>
    </section>
  );
};

export default FaqBreadcrumb;   