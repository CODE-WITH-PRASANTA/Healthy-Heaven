import React from "react";
import "./AboutUsWhatWeDo.css";

const SERVICES_DATA = [
  {
    id: 1,
    title: "Fresh Products",
    description:
      "Locally harvested daily from organic regional farms to bring pure seasonal flavors straight to your plate.",
    badge: "100% Organic",
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
        {/* Basket */}
        <path d="M8 24h32l-3 16H11L8 24z" />
        <path d="M14 24C14 16 18 10 24 10s10 6 10 14" />
        {/* Fresh Harvest Leaves */}
        <path d="M19 19c-3-3-4-8-2-12 5 0 9 3 10 7" />
        <path d="M29 19c3-3 4-8 2-12-5 0-9 3-10 7" />
        <line x1="16" y1="30" x2="32" y2="30" />
        <line x1="18" y1="35" x2="30" y2="35" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Skilled Chefs",
    description:
      "Passionate culinary artisans crafting contemporary gastronomy rooted in classic heritage techniques.",
    badge: "Master Craft",
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
        {/* Chef Hat */}
        <path d="M14 24v-4a7 7 0 0 1 10-6 6.5 6.5 0 0 1 10 6v4" />
        <path d="M12 24h24v4H12z" />
        <path d="M15 28v12h18V28" />
        <circle cx="21" cy="33" r="1" fill="currentColor" />
        <circle cx="27" cy="33" r="1" fill="currentColor" />
        <circle cx="24" cy="37" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Best Bar",
    description:
      "Bespoke mixology featuring small-batch artisanal spirits, botanical infusions, and vintage cellar wines.",
    badge: "Craft Cocktails",
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
        {/* Cocktail Glass */}
        <path d="M10 14h28L24 28v12" />
        <line x1="16" y1="40" x2="32" y2="40" />
        {/* Lime Garnish */}
        <circle cx="34" cy="11" r="5" />
        <path d="M34 6a5 5 0 0 0-5 5" />
        {/* Drink level line */}
        <line x1="14" y1="18" x2="34" y2="18" strokeDasharray="1 1" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Vegan Cuisine",
    description:
      "Nutrient-rich, delicious plant-forward creations celebrated for exquisite taste, color, and texture.",
    badge: "Plant-Based",
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
        {/* Sprout & Leaf */}
        <path d="M24 40V22" />
        <path d="M24 22c-8 0-14-6-14-14 8 0 14 6 14 14z" />
        <path d="M24 28c7-1 12-7 12-14-7 0-12 7-12 14z" />
        {/* Serving Plate Rim */}
        <path d="M10 40h28" />
        <path d="M14 40c1.5 3 4.5 4 10 4s8.5-1 10-4" />
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
          <span className="AboutUsWhatWeDo__eyebrow">OUR COMMITMENT</span>
          <h2 className="AboutUsWhatWeDo__title">What We Do</h2>
          <div className="AboutUsWhatWeDo__decorLine" aria-hidden="true">
            <span className="AboutUsWhatWeDo__decorDot" />
          </div>
          <p className="AboutUsWhatWeDo__subtitle">
            Every culinary experience we craft is rooted in sustainability,
            artisan technique, and genuine hospitality.
          </p>
        </header>

        {/* Services Grid */}
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