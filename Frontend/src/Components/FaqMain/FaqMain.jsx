import React, { useState } from "react";
import "./FaqMain.css";

// Newsletter image
import faqImage from "../../assets/faq-image.png";

const FaqMain = () => {
  const [openIndex, setOpenIndex] = useState(2);
  const [email, setEmail] = useState("");

  const faqData = [
    {
      question: "What are your hours of operation?",
      answer:
        "Our restaurant is open throughout the week. You can contact our team for the latest opening hours and special holiday timings.",
    },
    {
      question: "What is your menu like?",
      answer:
        "Our menu features a carefully selected range of fresh, flavorful dishes prepared with quality ingredients. We also offer seasonal specials.",
    },
    {
      question: "Do you have vegetarian/vegan/gluten-free options?",
      answer:
        "Yes. We offer a variety of vegetarian, vegan, and gluten-free options. Our team can also help you identify suitable dishes based on your dietary preferences.",
    },
    {
      question: "Do you offer takeout or delivery?",
      answer:
        "Yes, takeout and delivery options are available. Please contact us or use our online ordering service to check availability in your area.",
    },
    {
      question: "Can I make a reservation? How do I do that?",
      answer:
        "Absolutely. You can make a reservation by contacting our restaurant directly or using our online reservation service.",
    },
    {
      question: "Is your restaurant kid-friendly?",
      answer:
        "Yes. We welcome families and children and provide a comfortable environment for guests of all ages.",
    },
    {
      question: "What is your menu like?",
      answer:
        "Our menu includes carefully prepared dishes using fresh ingredients, with options designed for different tastes and dietary preferences.",
    },
  ];

  const handleFaqClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    console.log("Newsletter Email:", email);

    setEmail("");
  };

  return (
    <section className="FaqMain">

      {/* =========================================
          FAQ SECTION
      ========================================= */}
      <div className="FaqMain__container">

        {/* Heading */}
        <div className="FaqMain__heading">

          <span className="FaqMain__eyebrow">
            NEED HELP?
          </span>

          <h2 className="FaqMain__title">
            Frequently Asked
            <span> Questions</span>
          </h2>

          <p className="FaqMain__subtitle">
            Find answers to some of the most common questions
            about our restaurant, menu, reservations and services.
          </p>

        </div>

        {/* FAQ Accordion */}
        <div className="FaqMain__accordion">

          {faqData.map((faq, index) => {

            const isOpen = openIndex === index;

            return (
              <div
                className={`FaqMain__item ${
                  isOpen ? "FaqMain__item--active" : ""
                }`}
                key={index}
              >

                {/* Question */}
                <button
                  type="button"
                  className="FaqMain__question"
                  onClick={() => handleFaqClick(index)}
                  aria-expanded={isOpen}
                >

                  <span className="FaqMain__questionText">

                    <span className="FaqMain__number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="FaqMain__questionLabel">
                      {faq.question}
                    </span>

                  </span>

                  {/* Plus / Minus */}
                  <span
                    className={`FaqMain__icon ${
                      isOpen ? "FaqMain__icon--active" : ""
                    }`}
                  >

                    <span className="FaqMain__iconHorizontal"></span>

                    <span
                      className={`FaqMain__iconVertical ${
                        isOpen
                          ? "FaqMain__iconVertical--hidden"
                          : ""
                      }`}
                    ></span>

                  </span>

                </button>

                {/* Answer */}
                <div
                  className={`FaqMain__answerWrapper ${
                    isOpen
                      ? "FaqMain__answerWrapper--open"
                      : ""
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
          NEWSLETTER SECTION
      ========================================= */}
      <section className="FaqMain__newsletter">

        <div className="FaqMain__newsletterContainer">

          {/* Newsletter Image */}
          <div className="FaqMain__newsletterImageBox">

            <div className="FaqMain__newsletterGlow"></div>

            <img
              src={faqImage}
              alt="Newsletter illustration"
              className="FaqMain__newsletterImage"
            />

          </div>


          {/* Newsletter Content */}
          <div className="FaqMain__newsletterContent">

            <span className="FaqMain__newsletterLabel">
              STAY CONNECTED
            </span>

            <h2 className="FaqMain__newsletterTitle">
              Newsletter
            </h2>

            <p className="FaqMain__newsletterText">
              We hope this newsletter finds you well. We are excited
              to announce some new additions to our menu that we think
              you'll love. Our culinary team has been working on
              something special for you.
            </p>


            {/* Newsletter Form */}
            <form
              className="FaqMain__newsletterForm"
              onSubmit={handleSubmit}
            >

              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                className="FaqMain__newsletterInput"
                aria-label="Email address"
              />

              <button
                type="submit"
                className="FaqMain__newsletterButton"
              >
                <span>Submit</span>
              </button>

            </form>

            <p className="FaqMain__newsletterNote">
              Join our community and receive our latest updates.
            </p>

          </div>
        </div>

      </section>

    </section>
  );
};

export default FaqMain;