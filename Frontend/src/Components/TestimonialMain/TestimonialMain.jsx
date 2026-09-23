import React, { useState } from "react";
import "./TestimonialMain.css";

// Testimonial Images
import Testimonial1 from "../../assets/Testimonial1.jpg";
import Testimonial2 from "../../assets/Testimonial2.jpg";
import Testimonial3 from "../../assets/Testimonial3.jpg";
import Testimonial4 from "../../assets/Testimonial4.jpg";

const TestimonialMain = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      designation: "Food Expert",
      image: Testimonial1,
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
      position: "left",
    },
    {
      id: 2,
      name: "Carry Mint",
      designation: "Food Expert",
      image: Testimonial2,
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
      position: "right",
    },
    {
      id: 3,
      name: "Sarah Albert",
      designation: "Food Expert",
      image: Testimonial3,
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
      position: "left",
    },
    {
      id: 4,
      name: "Stevin Mark",
      designation: "Food Expert",
      image: Testimonial4,
      text: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
      position: "right",
    },

    // Extra testimonials for Load More
    {
      id: 5,
      name: "Olivia Martin",
      designation: "Food Expert",
      image: Testimonial1,
      text: "The food experience was absolutely wonderful. Every dish was beautifully prepared and the flavours were fresh, balanced and memorable. I would definitely recommend this place to anyone who enjoys quality food.",
      position: "left",
    },
    {
      id: 6,
      name: "Michael Stone",
      designation: "Food Expert",
      image: Testimonial2,
      text: "A beautiful dining experience with excellent service and delicious food. The atmosphere was comfortable, elegant and welcoming from the moment we arrived.",
      position: "right",
    },
    {
      id: 7,
      name: "Emma Wilson",
      designation: "Food Expert",
      image: Testimonial3,
      text: "Everything from the presentation to the taste was impressive. The attention to detail made the complete experience feel premium and special.",
      position: "left",
    },
    {
      id: 8,
      name: "Daniel Smith",
      designation: "Food Expert",
      image: Testimonial4,
      text: "One of the most enjoyable food experiences I have had. Great presentation, wonderful flavours and an atmosphere that makes you want to stay longer.",
      position: "right",
    },
  ];

  const handleLoadMore = () => {
    setVisibleCount((previousCount) =>
      Math.min(previousCount + 2, testimonials.length)
    );
  };

  const hasMoreTestimonials = visibleCount < testimonials.length;

  return (
    <section className="TestimonialMain">
      <div className="TestimonialMain__container">
        <div className="TestimonialMain__list">
          {testimonials.slice(0, visibleCount).map((testimonial) => (
            <article
              className={`TestimonialMain__item TestimonialMain__item--${testimonial.position}`}
              key={testimonial.id}
            >
              {/* Image */}
              <div className="TestimonialMain__imageWrapper">
                <img
                  className="TestimonialMain__image"
                  src={testimonial.image}
                  alt={`${testimonial.name} testimonial`}
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="TestimonialMain__content">
                <p className="TestimonialMain__text">
                  {testimonial.text}
                </p>

                <div className="TestimonialMain__bottom">
                  <div className="TestimonialMain__author">
                    <span className="TestimonialMain__authorLine"></span>

                    <div className="TestimonialMain__authorInfo">
                      <h3 className="TestimonialMain__name">
                        {testimonial.name}
                      </h3>

                      <span className="TestimonialMain__designation">
                        {testimonial.designation}
                      </span>
                    </div>
                  </div>

                  <div className="TestimonialMain__quote" aria-hidden="true">
                    <span className="TestimonialMain__quoteMark">
                      &#8220;
                    </span>
                    <span className="TestimonialMain__quoteMark">
                      &#8220;
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        {hasMoreTestimonials && (
          <div className="TestimonialMain__buttonWrapper">
            <button
              type="button"
              className="TestimonialMain__loadMore"
              onClick={handleLoadMore}
            >
              <span className="TestimonialMain__loadMoreText">
                Load More
              </span>

              <span className="TestimonialMain__loadMoreOverlay"></span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialMain;