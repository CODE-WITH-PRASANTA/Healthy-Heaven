import React from "react";
import "./AboutUsWhatWeDo.css";

const AboutUsWhatWeDo = () => {
  const services = [
    {
      id: 1,
      title: "Fresh Products",
      description: "Lorem Ipsum is simply dummy text of the printing and",
      icon: (
        <svg
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Vegetables */}
          <path
            d="M25 43c-5-4-8-10-6-16 7-1 13 3 15 9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          <path
            d="M35 38c-2-8 1-15 8-19 5 5 6 12 2 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          <path
            d="M45 39c1-8 6-13 14-14 2 7-2 14-9 17"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Basket */}
          <path
            d="M18 43h43l-4 18H23z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />

          <path
            d="M25 43c1-8 7-12 14-12s13 4 14 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          <path
            d="M27 49h27M25 55h30"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
          />

          {/* Small leaves */}
          <path
            d="M18 25c-5 0-8-3-8-8 6-1 10 2 11 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          <path
            d="M54 22c4-5 9-5 13-2-2 6-7 8-12 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },

    {
      id: 2,
      title: "Skilled Chefs",
      description: "Lorem Ipsum is simply dummy text of the printing and",
      icon: (
        <svg
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Chef hat */}
          <path
            d="M25 37v-8c0-6 5-10 10-8 1-6 6-10 12-8 4 1 7 5 7 9 6-1 11 3 11 9 0 3-2 6-5 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M25 36h35"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Chef coat */}
          <path
            d="M27 36v25h28V36"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />

          <path
            d="M27 43h28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
            strokeLinecap="round"
          />

          <path
            d="M40 43v18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.3"
          />

          <circle
            cx="34"
            cy="50"
            r="1.7"
            fill="currentColor"
          />

          <circle
            cx="47"
            cy="50"
            r="1.7"
            fill="currentColor"
          />
        </svg>
      ),
    },

    {
      id: 3,
      title: "Best Bar",
      description: "Lorem Ipsum is simply dummy text of the printing and",
      icon: (
        <svg
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Cocktail glass */}
          <path
            d="M20 22h40L42 39v17"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M32 56h20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Lime */}
          <path
            d="M20 22c0-7 6-12 13-12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          <path
            d="M20 22c4-1 7-4 8-9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M24 18l7 3M27 13l5 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Olive / garnish */}
          <circle
            cx="58"
            cy="18"
            r="3.2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M51 15c4-3 7-2 10 1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },

    {
      id: 4,
      title: "Vegan Cuisine",
      description: "Lorem Ipsum is simply dummy text of the printing and",
      icon: (
        <svg
          viewBox="0 0 80 80"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Hand */}
          <path
            d="M18 27c4-2 8-1 12 1l10 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          <path
            d="M18 27v-7c0-2 2-4 4-3l1 1v8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          <path
            d="M24 26v-9c0-2 2-4 4-3l1 1v11"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          <path
            d="M30 28v-8c0-2 2-3 4-2l1 1v10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          <path
            d="M35 30v-7c0-2 2-3 4-2l1 1v10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          <path
            d="M40 34l10 7c3 2 4 6 2 9l-4 7H28c-4 0-7-3-7-7v-9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Plate */}
          <path
            d="M19 59h43"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          <path
            d="M24 59c1 5 5 8 10 8h13c5 0 9-3 10-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          <path
            d="M34 52h17"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="AboutUsWhatWeDo">
      <div className="AboutUsWhatWeDo__container">

        {/* Heading */}
        <div className="AboutUsWhatWeDo__heading">
          <h2 className="AboutUsWhatWeDo__title">
            What We Do
          </h2>
        </div>

        {/* Cards */}
        <div className="AboutUsWhatWeDo__grid">
          {services.map((service) => (
            <div
              className="AboutUsWhatWeDo__card"
              key={service.id}
            >
              <div className="AboutUsWhatWeDo__iconWrapper">
                <div className="AboutUsWhatWeDo__icon">
                  {service.icon}
                </div>
              </div>

              <h3 className="AboutUsWhatWeDo__cardTitle">
                {service.title}
              </h3>

              <p className="AboutUsWhatWeDo__description">
                {service.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutUsWhatWeDo;