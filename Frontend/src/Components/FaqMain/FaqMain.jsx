import React, { useState } from "react";
import "./FaqMain.css";

// Newsletter image import (fallback included if local asset is missing)
import faqImageDefault from "../../assets/faq-image.png";

const DEFAULT_FAQ_DATA = [
  {
    id: "faq-1",
    question: "What food staples and grain products does Foodigo manufacture?",
    answer:
      "Foodigo specializes in pure, traditionally processed kitchen staples including roasted chana Sattu (high protein), stone-ground premium Besan (gram flour), authentic tapioca Sabudana (sago pearls), and a select variety of pulses and flours packed fresh under strict hygienic supervision.",
  },
  {
    id: "faq-2",
    question: "Are your products 100% natural and free of chemical adulteration?",
    answer:
      "Yes, absolutely. We source high-grade grains directly from vetted farming hubs. Our Besan and Sattu are free from artificial food colors, starch fillers, or chemical preservatives, ensuring authentic taste, natural aroma, and superior nutrition.",
  },
  {
    id: "faq-3",
    question: "Do you supply wholesale, bulk orders, and commercial businesses?",
    answer:
      "Yes, we supply bulk quantities to wholesalers, sweet manufacturers (halwais), supermarkets, and restaurants across North Bengal, Sikkim, Bihar, and Northeastern regions. Bulk gunny bags and customized packaging formats (5 kg, 25 kg, 50 kg) are available upon request.",
  },
  {
    id: "faq-4",
    question: "What retail consumer packaging sizes are available?",
    answer:
      "Our standard consumer packs for household consumption come in tamper-proof, moisture-barrier pouches of 200g, 500g, and 1kg sizes to retain freshness and natural aroma over extended shelf lives.",
  },
  {
    id: "faq-5",
    question: "How can I apply for distributorship or dealership in my area?",
    answer:
      "We are actively expanding our distributor network. Interested dealers and stockists can reach out to our proprietor, Sandeep Kumar, at +91 90072 52221 or email gsmarketing507@gmail.com with their location and business profile for distributorship terms.",
  },
  {
    id: "faq-6",
    question: "Where is Foodigo located, and do you arrange dispatch logistics?",
    answer:
      "Our factory and marketing office is based at Patiramjote, Matigara, Siliguri (Darjeeling district, West Bengal). We coordinate with reliable freight and transport partners for prompt and safe dispatches to your destination.",
  },
];

const FaqMain = () => {
  const [openIndex, setOpenIndex] = useState(0); // Open first item by default
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleFaqClick = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      return;
    }

    console.log("Wholesale Catalog Subscribed Email:", email);
    setIsSubscribed(true);
    setEmail("");

    setTimeout(() => {
      setIsSubscribed(false);
    }, 4000);
  };

  return (
    <section className="FaqMain">
      {/* =========================================
          FAQ ACCORDION SECTION
      ========================================= */}
      <div className="FaqMain__container">
        {/* Section Header */}
        <header className="FaqMain__heading">
          <span className="FaqMain__eyebrow">FOODIGO HELPDESK</span>
          <h2 className="FaqMain__title">
            Frequently Asked <span>Questions</span>
          </h2>
          <p className="FaqMain__subtitle">
            Everything you need to know about our Besan, Sattu, Sabudana, retail packaging, and bulk dealership policies.
          </p>
        </header>

        {/* Accordion List */}
        <div className="FaqMain__accordion" role="region" aria-label="FAQ Accordion">
          {DEFAULT_FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            const contentId = `faq-panel-${faq.id}`;
            const headerId = `faq-btn-${faq.id}`;

            return (
              <div
                className={`FaqMain__item ${isOpen ? "FaqMain__item--active" : ""}`}
                key={faq.id}
              >
                {/* Accordion Question Trigger */}
                <button
                  type="button"
                  id={headerId}
                  className="FaqMain__question"
                  onClick={() => handleFaqClick(index)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                >
                  <div className="FaqMain__questionLeft">
                    <span className="FaqMain__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="FaqMain__questionLabel">
                      {faq.question}
                    </span>
                  </div>

                  {/* Plus / Minus Indicator */}
                  <span
                    className={`FaqMain__icon ${isOpen ? "FaqMain__icon--active" : ""}`}
                    aria-hidden="true"
                  >
                    <span className="FaqMain__iconHorizontal"></span>
                    <span
                      className={`FaqMain__iconVertical ${
                        isOpen ? "FaqMain__iconVertical--hidden" : ""
                      }`}
                    ></span>
                  </span>
                </button>

                {/* Accordion Expandable Answer */}
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={headerId}
                  className={`FaqMain__answerWrapper ${
                    isOpen ? "FaqMain__answerWrapper--open" : ""
                  }`}
                >
                  <div className="FaqMain__answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================
          NEWSLETTER / CATALOG BANNER SECTION
      ========================================= */}
      <section className="FaqMain__newsletter" aria-label="Product Catalog Subscription">
        <div className="FaqMain__newsletterContainer">
          {/* Visual Floating Image Box */}
          <div className="FaqMain__newsletterImageBox">
            <div className="FaqMain__newsletterGlow"></div>
            <img
              src={faqImageDefault}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80";
              }}
              alt="Foodigo Pure Staples and Flours"
              className="FaqMain__newsletterImage"
              loading="lazy"
            />
          </div>

          {/* Newsletter Content & Form */}
          <div className="FaqMain__newsletterContent">
            <span className="FaqMain__newsletterLabel">STAY UPDATED</span>
            <h2 className="FaqMain__newsletterTitle">Receive Bulk Price Lists & Offers</h2>
            <p className="FaqMain__newsletterText">
              Subscribe with your email to receive our monthly mandi-rate updates, wholesale discount circulars, and new batch launch alerts directly from Foodigo.
            </p>

            {/* Newsletter Form */}
            <form className="FaqMain__newsletterForm" onSubmit={handleSubmit}>
              <div className="FaqMain__newsletterInputWrapper">
                <svg
                  className="FaqMain__emailIcon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  type="email"
                  placeholder="Enter your business email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="FaqMain__newsletterInput"
                  aria-label="Email address for price updates"
                  required
                />
              </div>

              <button type="submit" className="FaqMain__newsletterButton">
                <span>Get Updates</span>
              </button>
            </form>

            {/* Success Feedback Alert */}
            {isSubscribed && (
              <div className="FaqMain__newsletterSuccessMsg" role="status">
                ✓ Thank you! The latest product catalog & rate card will be sent to your email.
              </div>
            )}

            <p className="FaqMain__newsletterNote">
              🔒 We value your business privacy. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default FaqMain;