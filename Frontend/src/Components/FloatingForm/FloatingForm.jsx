import React, { useState } from "react";
import Swal from "sweetalert2";
import "./FloatingForm.css";
import API from "../../api/axios";
import dishPlateImage from "../../assets/floatingform.png";

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

const FloatingForm = ({
  isOpen: controlledIsOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [internalOpen, setInternalOpen] = useState(true);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle");
  const [isClosing, setIsClosing] = useState(false);

  const isVisible =
    controlledIsOpen !== undefined ? controlledIsOpen : internalOpen;

  const handleClose = (force = false) => {
    if (status === "submitting" && !force) {
      return;
    }

    setIsClosing(true);

    setTimeout(() => {
      setInternalOpen(false);
      setIsClosing(false);
      setStatus("idle");

      if (typeof onClose === "function") {
        onClose();
      }
    }, 350);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status !== "idle") {
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim()
    ) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all fields",
        text: "All fields are required.",
        confirmButtonText: "Okay",
      });

      return;
    }

    try {
      setStatus("submitting");

      const response = await API.post("/cold-leads", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        message: "",
      });

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || "Unable to submit your details."
        );
      }

      const savedLead = response.data.data;

      if (typeof onSubmitSuccess === "function") {
        await onSubmitSuccess(savedLead);
      }

      setFormData(EMPTY_FORM);

      handleClose(true);

      Swal.fire({
        icon: "success",
        title: "Thank You!",
        text: "Your details have been submitted successfully.",
        timer: 1400,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    } catch (error) {
      setStatus("idle");

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text:
          error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again.",
        confirmButtonText: "Try Again",
      });
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`FloatingForm-overlay ${
        isClosing ? "FloatingForm-overlay--closing" : ""
      }`}
      onClick={() => handleClose()}
    >
      <div
        className={`FloatingForm ${
          isClosing ? "FloatingForm--closing" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="floating-form-title"
      >
        {/* Close Button */}
        <button
          type="button"
          className="FloatingForm__close-btn"
          onClick={() => handleClose()}
          disabled={status === "submitting"}
          aria-label="Close contact form"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1.5 1.5L12.5 12.5M1.5 12.5L12.5 1.5"
              stroke="#333"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Decorative Background */}
        <div className="FloatingForm__curved-bg" />

        {/* Dish Image */}
        <div className="FloatingForm__image-wrapper">
          <img
            src={dishPlateImage}
            alt="Healthy Heaven"
            className="FloatingForm__dish-img"
          />
        </div>

        {/* Decorative Elements */}
        <div className="FloatingForm__leaf FloatingForm__leaf--top">
          🍃
        </div>

        <div className="FloatingForm__leaf FloatingForm__leaf--mid">
          🌿
        </div>

        <div className="FloatingForm__leaf FloatingForm__leaf--bottom-right">
          🍃
        </div>

        <div className="FloatingForm__leaf FloatingForm__leaf--bottom-left">
          🌱
        </div>

        <div className="FloatingForm__tomato FloatingForm__tomato--mid">
          🍅
        </div>

        <div className="FloatingForm__tomato FloatingForm__tomato--bottom">
          🍅
        </div>

        {/* Header */}
        <div className="FloatingForm__header">
          <div className="FloatingForm__logo-circle">
            <span className="FloatingForm__logo-icon">🥗</span>

            <div className="FloatingForm__logo-text">
              <strong>Healthy</strong>
              <span>Heaven</span>
            </div>

            <small>Good Food Good Health</small>
          </div>

          <h2
            id="floating-form-title"
            className="FloatingForm__title"
          >
            Get In Touch
          </h2>

          <p className="FloatingForm__subtitle">
            Fill the details and we will get back to you soon.
          </p>

          <div className="FloatingForm__green-swoosh" />
        </div>

        {/* Form */}
        <form
          className="FloatingForm__form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Name */}
          <div className="FloatingForm__input-group">
            <div className="FloatingForm__input-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#606060"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              autoComplete="name"
              disabled={status === "submitting"}
              className="FloatingForm__input"
              aria-label="Your Name"
            />

            <span className="FloatingForm__required">*</span>
          </div>

          {/* Email */}
          <div className="FloatingForm__input-group">
            <div className="FloatingForm__input-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#606060"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              autoComplete="email"
              disabled={status === "submitting"}
              className="FloatingForm__input"
              aria-label="Your Email"
            />

            <span className="FloatingForm__required">*</span>
          </div>

          {/* Phone */}
          <div className="FloatingForm__input-group">
            <div className="FloatingForm__input-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#606060"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1 .45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone Number"
              autoComplete="tel"
              inputMode="tel"
              disabled={status === "submitting"}
              className="FloatingForm__input"
              aria-label="Your Phone Number"
            />

            <span className="FloatingForm__required">*</span>
          </div>

          {/* Address */}
          <div className="FloatingForm__input-group">
            <div className="FloatingForm__input-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#606060"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your Address"
              autoComplete="street-address"
              disabled={status === "submitting"}
              className="FloatingForm__input"
              aria-label="Your Address"
            />

            <span className="FloatingForm__required">*</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`FloatingForm__submit-btn ${
              status === "submitting"
                ? "FloatingForm__submit-btn--loading"
                : ""
            }`}
            disabled={status === "submitting"}
          >
            {status === "idle" && (
              <>
                <span>Submit Now</span>

                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}

            {status === "submitting" && (
              <>
                <span className="FloatingForm__spinner" />
                <span>Submitting...</span>
              </>
            )}
          </button>

          {/* Security */}
          <div className="FloatingForm__security">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="#38a169"
              stroke="#38a169"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />

              <path
                d="m9 12 2 2 4-4"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span>Your information is safe with us.</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FloatingForm;