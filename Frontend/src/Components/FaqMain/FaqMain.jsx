import React, { useState } from "react";
import "./FaqMain.css";

// Newsletter image import (fallback included if local asset is missing)
import faqImageDefault from "../../assets/faq-image.png";

const DEFAULT_FAQ_DATA = [
  {
    id: "faq-1",
    question: "What are your hours of operation?",
    answer:
      "Our restaurant is open Monday through Sunday from 11:00 AM to 11:00 PM. For special holidays, private events, or seasonal festival hours, please check our live announcements or call our front desk directly.",
  },
  {
    id: "faq-2",
    question: "Do you offer takeout or home delivery?",
    answer:
      "Yes! You can order directly via our online ordering platform or through major delivery partners. We ensure tamper-proof insulated packaging so your meal arrives fresh, hot, and delicious.",
  },
  {
    id: "faq-3",
    question: "Do you have vegetarian, vegan, or gluten-free options?",
    answer:
      "Absolutely. A significant part of our kitchen is dedicated to plant-based and allergen-conscious cooking. Clearly marked symbols indicate Vegan, Vegetarian, and Gluten-free options on our menu.",
  },
  {
    id: "faq-4",
    question: "Can I make a reservation in advance? How do I book?",
    answer:
      "Yes, table reservations are strongly recommended on weekends and evenings. You can easily book online through our Reservation page or call us directly. Parties larger than 8 guests are requested to call at least 24 hours ahead.",
  },
  {
    id: "faq-5",
    question: "Is your restaurant kid-friendly and family-oriented?",
    answer:
      "Very much so! We offer customized kid-friendly portions, comfortable high-chairs, and coloring sets to ensure little diners have a wonderful time alongside parents.",
  },
  {
    id: "faq-6",
    question: "Do you host private events, birthdays, or catering?",
    answer:
      "Yes, we have dedicated private dining rooms suitable for corporate lunches, intimate weddings, and birthday parties. We also cater external events with customizable gourmet food packages.",
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

    console.log("Newsletter Subscribed Email:", email);
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
          <span className="FaqMain__eyebrow">NEED ASSISTANCE?</span>
          <h2 className="FaqMain__title">
            Frequently Asked <span>Questions</span>
          </h2>
          <p className="FaqMain__subtitle">
            Find answers to some of the most common questions about our dishes,
            seating, dietary options, and catering services.
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
          NEWSLETTER BANNER SECTION
      ========================================= */}
      <section className="FaqMain__newsletter" aria-label="Newsletter Subscription">
        <div className="FaqMain__newsletterContainer">
          {/* Visual Floating Image Box */}
          <div className="FaqMain__newsletterImageBox">
            <div className="FaqMain__newsletterGlow"></div>
            <img
              src={faqImageDefault}
              onError={(e) => {
                // Fallback image if local asset is not available
                e.target.onerror = null;
                e.target.src =
                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80";
              }}
              alt="Delicious seasonal meal bowl"
              className="FaqMain__newsletterImage"
              loading="lazy"
            />
          </div>

          {/* Newsletter Content & Form */}
          <div className="FaqMain__newsletterContent">
            <span className="FaqMain__newsletterLabel">STAY CONNECTED</span>
            <h2 className="FaqMain__newsletterTitle">Join Our Food Club</h2>
            <p className="FaqMain__newsletterText">
              Subscribe to get secret chef recipes, 15% discount on your first table booking,
              and exclusive priority passes to our weekend specials.
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
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="FaqMain__newsletterInput"
                  aria-label="Email address for newsletter"
                  required
                />
              </div>

              <button type="submit" className="FaqMain__newsletterButton">
                <span>Subscribe</span>
              </button>
            </form>

            {/* Success Feedback Alert */}
            {isSubscribed && (
              <div className="FaqMain__newsletterSuccessMsg" role="status">
                🎉 Thank you! Check your inbox for your 15% voucher.
              </div>
            )}

            <p className="FaqMain__newsletterNote">
              🔒 We respect your privacy. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </section>
  );
};

export default FaqMain;