
import React, { useState, useEffect } from "react";
import "./AboutUsVideo.css";

// Replace with your restaurant image
import restaurantImage from "../../assets/AboutUsVideo.jpg";

// Replace with your YouTube video ID
const YOUTUBE_VIDEO_ID = "YOUR_VIDEO_ID";

const AboutUsVideo = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  useEffect(() => {
    if (!isVideoOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") closeVideo();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isVideoOpen]);

  return (
    <section className="AboutUsVideo">
      <div className="AboutUsVideo-container">

        {/* Section Heading */}
        <div className="AboutUsVideo-heading">
          <h2 className="AboutUsVideo-title">
            We Invite you to Visit Our Restaurant
          </h2>

          <p className="AboutUsVideo-description">
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make
            a type specimen book.
          </p>
        </div>

        {/* Restaurant Image */}
        <div className="AboutUsVideo-imageWrapper">
          <img
            src={restaurantImage}
            alt="Beautiful restaurant interior"
            className="AboutUsVideo-image"
          />

          <div className="AboutUsVideo-imageOverlay" />

          <button
            type="button"
            className="AboutUsVideo-playButton"
            onClick={openVideo}
            aria-label="Play restaurant video"
          >
            <span className="AboutUsVideo-playRipple" />

            <svg
              className="AboutUsVideo-playIcon"
              width="28"
              height="32"
              viewBox="0 0 28 32"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M26 13.4C28 14.6 28 17.4 26 18.6L5 31C2.8 32.3 0 30.7 0 28.2V3.8C0 1.3 2.8-.3 5 1L26 13.4Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* YouTube Video Popup */}
      {isVideoOpen && (
        <div
          className="AboutUsVideo-modal"
          onClick={closeVideo}
          role="presentation"
        >
          <div
            className="AboutUsVideo-modalContent"
            role="dialog"
            aria-modal="true"
            aria-label="Restaurant video"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="AboutUsVideo-closeButton"
              onClick={closeVideo}
              aria-label="Close video"
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="AboutUsVideo-videoFrame">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
                title="Restaurant YouTube Video"
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