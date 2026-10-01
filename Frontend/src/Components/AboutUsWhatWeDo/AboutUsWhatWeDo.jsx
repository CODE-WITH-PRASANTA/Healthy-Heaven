import React from "react";
import "./AboutUsWhatWeDo.css";

const SERVICES_DATA = [
  {
    id: 1,
    title: "Stone-Ground Besan",
    description:
      "Finely milled from selected pure chana dal using cold stone-grinding methods to lock in aroma, natural color, and essential nutrients.",
    badge: "100% Pure Gram",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Grain / Pulses Sack */}
        <path d="M12 16h24l4 24a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3l4-24z" />
        <path d="M16 16c0-4 3.5-7 8-7s8 3 8 7" />
        <path d="M12 21h24" />
        {/* Wheat grain kernel icon inside */}
        <path d="M24 26v10M21 29c2 1 3 0 3 0s1 1 3 0M21 33c2 1 3 0 3 0s1 1 3 0" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Roasted Protein Sattu",
    description:
      "Traditional sand-roasted Bengal gram pulverized to perfection. A powerhouse of natural dietary fiber and plant protein with zero additives.",
    badge: "Superfood Staple",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Mortar & Pestle / Traditional Grinding */}
        <path d="M10 24h28c0 9-6 16-14 16S10 33 10 24z" />
        <line x1="8" y1="24" x2="40" y2="24" />
        <path d="M28 8l-6 12" />
        <circle cx="29" cy="8" r="3" />
        <path d="M18 32c3 3 9 3 12 0" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Pearl Sabudana (Tapioca)",
    description:
      "Pristine, non-sticky, evenly sized tapioca pearls rigorously cleaned and sorted for fasting foods, khichdi, and delicious snacks.",
    badge: "Premium Sorting",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Clean sorted pearl beads */}
        <circle cx="16" cy="18" r="4.5" />
        <circle cx="32" cy="18" r="4.5" />
        <circle cx="24" cy="28" r="5" />
        <circle cx="15" cy="36" r="3.5" />
        <circle cx="33" cy="36" r="3.5" />
        {/* Purity sparkle */}
        <path d="M24 10v4M22 12h4" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Wholesale & Custom Packaging",
    description:
      "Reliable bulk dispatches in 5kg, 25kg, and 50kg bags for sweet makers and dealers, alongside moisture-proof consumer retail pouches.",
    badge: "B2B & Retail",
    icon: (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Distribution & Shipping Package */}
        <path d="M10 16l14-7 14 7-14 7-14-7z" />
        <path d="M10 16v16l14 8 14-8V16" />
        <line x1="24" y1="23" x2="24" y2="40" />
        <path d="M17 12.5l14 7" />
        {/* Verified Shield Badge */}
        <circle cx="35" cy="33" r="5" fill="none" />
        <path d="M33 33l1.5 1.5 3-3" />
      </svg>
    ),
  },
];

const AboutUsWhatWeDo = () => {
  return (
    <section className="AboutUsWhatWeDo">
      <div className="AboutUsWhatWeDo__container">
        {/* Section Heading */}
        <header className="AboutUsWhatWeDo__heading">
          <span className="AboutUsWhatWeDo__eyebrow">OUR CORE SPECIALTIES</span>
          <h2 className="AboutUsWhatWeDo__title">What Foodigo Does</h2>
          <div className="AboutUsWhatWeDo__decorLine" aria-hidden="true">
            <span className="AboutUsWhatWeDo__decorDot" />
          </div>
          <p className="AboutUsWhatWeDo__subtitle">
            Processed with utmost hygiene at Matigara, Siliguri, our staples bring pure taste, unadulterated goodness, and unmatched consistency to every home and enterprise.
          </p>
        </header>

        {/* Services / Capabilities Grid */}
        <div className="AboutUsWhatWeDo__grid">
          {SERVICES_DATA.map((service) => (
            <article className="AboutUsWhatWeDo__card" key={service.id}>
              {/* Subtle top indicator bar on hover */}
              <div className="AboutUsWhatWeDo__cardAccentBar" />

              {/* Icon Container */}
              <div className="AboutUsWhatWeDo__iconWrapper">
                <div className="AboutUsWhatWeDo__iconGlow" />
                <div className="AboutUsWhatWeDo__iconCircle">
                  {service.icon}
                </div>
              </div>

              {/* Tag/Badge */}
              <span className="AboutUsWhatWeDo__cardBadge">
                {service.badge}
              </span>

              {/* Card Title & Content */}
              <h3 className="AboutUsWhatWeDo__cardTitle">{service.title}</h3>
              <p className="AboutUsWhatWeDo__description">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsWhatWeDo;