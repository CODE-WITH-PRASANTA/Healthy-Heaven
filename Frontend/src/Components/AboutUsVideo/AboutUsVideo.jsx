import React, { useState, useEffect } from "react";
import "./AboutUsVideo.css";

// Your restaurant image (includes graceful fallback)
import restaurantImageDefault from "../../assets/AboutUsVideo.jpg";

// YouTube Video ID
const YOUTUBE_VIDEO_ID = "Lfl_YqWv_3o";

const AboutUsVideo = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  // Close with Escape key & disable background scroll
  useEffect(() => {
    if (!isVideoOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") closeVideo();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isVideoOpen]);

  return (
    <section className="AboutUsVideo">
      <div className="AboutUsVideo__container">
        {/* Section Heading */}
        <header className="AboutUsVideo__heading">
          <span className="AboutUsVideo__eyebrow">EXPERIENCE OUR ATMOSPHERE</span>
          <h2 className="AboutUsVideo__title">
            We Invite You to Visit <span>Our Restaurant</span>
          </h2>
          <p className="AboutUsVideo__description">
            Step into a world where culinary passion meets warm hospitality. From
            our wood-fired aromas to carefully crafted candlelight seating, immerse
            yourself in a dining journey designed to linger in memory.
          </p>
        </header>

        {/* Compact & Cinematic Video Banner */}
        <div
          className="AboutUsVideo__banner"
          onClick={openVideo}
          role="button"
          tabIndex={0}
          aria-label="Click to watch restaurant video"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openVideo();
            }
          }}
        >
          <img
            src={restaurantImageDefault}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85";
            }}
            alt="Warm and elegant restaurant interior"
            className="AboutUsVideo__bannerImg"
            loading="lazy"
          />

          {/* Vignette Overlay */}
          <div className="AboutUsVideo__overlay" />

          {/* Premium Floating Play Trigger */}
          <div className="AboutUsVideo__playCenter">
            <button
              type="button"
              className="AboutUsVideo__playBtn"
              onClick={(e) => {
                e.stopPropagation();
                openVideo();
              }}
              aria-label="Play video"
            >
              <span className="AboutUsVideo__ripple AboutUsVideo__ripple--outer" />
              <span className="AboutUsVideo__ripple AboutUsVideo__ripple--inner" />

              <span className="AboutUsVideo__playCircle">
                <svg
                  className="AboutUsVideo__playIcon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8.5 6.2v11.6a1 1 0 0 0 1.54.84l9.2-5.8a1 1 0 0 0 0-1.68l-9.2-5.8A1 1 0 0 0 8.5 6.2z" />
                </svg>
              </span>
            </button>
            <span className="AboutUsVideo__watchText">Watch Story</span>
          </div>
        </div>
      </div>

      {/* Luxury Video Modal Lightbox */}
      {isVideoOpen && (
        <div
          className="AboutUsVideo__modal"
          onClick={closeVideo}
          role="dialog"
          aria-modal="true"
          aria-label="Restaurant Tour Video"
        >
          <div
            className="AboutUsVideo__modalContent"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="AboutUsVideo__modalClose"
              onClick={closeVideo}
              aria-label="Close video (Esc)"
              title="Close"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="AboutUsVideo__videoFrame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Restaurant Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutUsVideo;