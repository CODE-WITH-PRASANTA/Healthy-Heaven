import React from "react";
import "./Footer.css";

// ============================================================
// ASSETS
// ============================================================

import FooterLogo from "../../assets/main-logo.png";
import FooterAlmond from "../../assets/footeralmond.png";
import FooterTomato from "../../assets/footertamato.png";

// ============================================================
// INLINE SVG ICONS
// ============================================================

const FooterLocationIcon = ({ size = 27 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 10C20 15.5 12 21 12 21C12 21 4 15.5 4 10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />

    <circle
      cx="12"
      cy="10"
      r="2.7"
      stroke="currentColor"
      strokeWidth="1.7"
    />
  </svg>
);

const FooterPhoneIcon = ({ size = 27 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.6 3.2L9.1 2.6C9.7 2.45 10.3 2.75 10.55 3.3L11.75 6.15C11.95 6.62 11.82 7.16 11.42 7.5L9.75 8.95C10.75 11.1 12.5 12.85 14.65 13.85L16.1 12.18C16.44 11.78 16.98 11.65 17.45 11.85L20.3 13.05C20.85 13.3 21.15 13.9 21 14.5L20.4 17C20.23 17.72 19.58 18.25 18.84 18.25C10.83 18.25 5.75 13.17 5.75 5.16C5.75 4.42 6.28 3.77 7 3.6L6.6 3.2Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FooterMailIcon = ({ size = 27 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.7"
    />

    <path
      d="M4 7L12 13L20 7"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FooterChevronIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 5L16 12L9 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FooterArrowUpIcon = ({ size = 23 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 19V5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />

    <path
      d="M6 11L12 5L18 11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FooterHeartIcon = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 21C11.7 21 11.4 20.9 11.15 20.7C5.5 16.15 2 12.92 2 8.85C2 5.6 4.45 3 7.5 3C9.25 3 10.82 3.82 12 5.1C13.18 3.82 14.75 3 16.5 3C19.55 3 22 5.6 22 8.85C22 12.92 18.5 16.15 12.85 20.7C12.6 20.9 12.3 21 12 21Z" />
  </svg>
);

// ============================================================
// FOOTER
// ============================================================

const Footer = () => {

  // ==========================================================
  // SCROLL TO TOP
  // ==========================================================

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================================
  // SECTION NAVIGATION
  // ==========================================================

  const handleSectionClick = (
    event,
    sectionId
  ) => {
    const section =
      document.getElementById(sectionId);

    if (section) {
      event.preventDefault();

      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // ==========================================================
  // OUR LINKS
  // ==========================================================

  const footerLinks = [
    {
      label: "Home",
      target: "home",
      href: "/",
    },
    {
      label: "About Us",
      target: "about",
      href: "/about",
    },
    {
      label: "Services",
      target: "services",
      href: "/services",
    },
    {
      label: "Team",
      target: "team",
      href: "/team",
    },
    {
      label: "Blog",
      target: "blog",
      href: "/blog",
    },
  ];

  // ==========================================================
  // SERVICES
  // ==========================================================

  const serviceLinks = [
    {
      label: "Strategy & Research",
      target: "strategy",
      href: "/services",
    },
    {
      label: "Fast Delivery",
      target: "delivery",
      href: "/services",
    },
    {
      label: "Seat Reservation",
      target: "reservation",
      href: "/reservation",
    },
    {
      label: "Pickup In Store",
      target: "pickup",
      href: "/shop",
    },
    {
      label: "Our Menu",
      target: "menu",
      href: "/menu",
    },
  ];

  // ==========================================================
  // HELP CENTER
  // ==========================================================

  const helpLinks = [
    {
      label: "FAQ",
      target: "faq",
      href: "/faq",
    },
    {
      label: "Shop",
      target: "shop",
      href: "/shop",
    },
    {
      label: "Category Filter",
      target: "category",
      href: "/category",
    },
    {
      label: "Testimonials",
      target: "testimonials",
      href: "/testimonials",
    },
    {
      label: "Contact Us",
      target: "contact",
      href: "/contact",
    },
  ];

  // ==========================================================
  // LINK LIST COMPONENT
  // ==========================================================

  const FooterLinks = ({ links }) => (
    <ul className="FooterLinkList">
      {links.map((item) => (
        <li
          key={item.label}
          className="FooterLinkItem"
        >
          <a
            href={item.href}
            className="FooterLink"
            onClick={(event) =>
              handleSectionClick(
                event,
                item.target
              )
            }
          >
            <span className="FooterLinkArrow">
              <FooterChevronIcon size={13} />
            </span>

            <span>{item.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <footer className="FooterMain">

      {/* ======================================================
          DECORATIVE ALMOND
      ======================================================= */}

      <div
        className="FooterAlmondDecoration"
        aria-hidden="true"
      >
        <img
          src={FooterAlmond}
          alt=""
        />
      </div>

      {/* ======================================================
          DECORATIVE TOMATO
      ======================================================= */}

      <div
        className="FooterTomatoDecoration"
        aria-hidden="true"
      >
        <img
          src={FooterTomato}
          alt=""
        />
      </div>

      {/* ======================================================
          MAIN CONTAINER
      ======================================================= */}

      <div className="FooterContainer">

        <div className="FooterTop">

          {/* ==================================================
              CONTACT COLUMN
          =================================================== */}

          <div className="FooterColumn FooterContactColumn">

            <div className="FooterLogoWrapper">
              <a
                href="/"
                className="FooterLogoLink"
                aria-label="Healthy Heaven Home"
              >
                <img
                  src={FooterLogo}
                  alt="Healthy Heaven"
                  className="FooterLogo"
                />
              </a>
            </div>

            <h3 className="FooterTitle">
              CONTACT
            </h3>

            {/* ADDRESS */}

            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="FooterContactItem"
            >
              <span className="FooterContactIcon">
                <FooterLocationIcon />
              </span>

              <span className="FooterContactText">
                1247/Plot No. 39, 15th Phase,
                <br />
                Colony, Kkatpally, Hyderabad
              </span>
            </a>

            {/* PHONE */}

            <div className="FooterContactItem">

              <span className="FooterContactIcon">
                <FooterPhoneIcon />
              </span>

              <div className="FooterContactText FooterPhoneText">

                <a href="tel:+919876543210">
                  +91 987-654-3210
                </a>

                <a href="tel:+911234567890">
                  +91 123-456-7890
                </a>

              </div>

            </div>

            {/* EMAIL */}

            <div className="FooterContactItem">

              <span className="FooterContactIcon">
                <FooterMailIcon />
              </span>

              <div className="FooterContactText FooterEmailText">

                <a href="mailto:info@example.com">
                  info@example.com
                </a>

                <a href="mailto:info@example.com">
                  info@example.com
                </a>

              </div>

            </div>

          </div>

          {/* ==================================================
              OUR LINKS
          =================================================== */}

          <div className="FooterColumn">

            <h3 className="FooterTitle">
              OUR LINKS
            </h3>

            <FooterLinks links={footerLinks} />

          </div>

          {/* ==================================================
              OUR SERVICES
          =================================================== */}

          <div className="FooterColumn">

            <h3 className="FooterTitle">
              OUR SERVICES
            </h3>

            <FooterLinks links={serviceLinks} />

          </div>

          {/* ==================================================
              HELP CENTER
          =================================================== */}

          <div className="FooterColumn">

            <h3 className="FooterTitle">
              HELP CENTER
            </h3>

            <FooterLinks links={helpLinks} />

          </div>

        </div>

        {/* ====================================================
            FOOTER BOTTOM
        ===================================================== */}

        <div className="FooterBottom">

          <p className="FooterCopyright">
            Copyright{" "}
            {new Date().getFullYear()}{" "}
            All rights reserved.
          </p>

          <p className="FooterCreated">

            Crafted With

            <span className="FooterHeart">
              <FooterHeartIcon />
            </span>

            by

            <a
              href="https://prwebstock.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="FooterBrand"
            >
              PR WEBSTOCK
            </a>

          </p>

        </div>

      </div>

      {/* ======================================================
          SCROLL TOP
      ======================================================= */}

      <button
        type="button"
        className="FooterScrollTop"
        onClick={handleScrollTop}
        aria-label="Scroll to top"
      >
        <FooterArrowUpIcon />
      </button>

    </footer>
  );
};

export default Footer;