import React, { useState } from "react";
import Swal from "sweetalert2";
import "./FloatingForm.css";
import API from "../../api/axios";

import healthyFoodImage from "../../assets/floatingform.webp";

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
    controlledIsOpen !== undefined
      ? controlledIsOpen
      : internalOpen;

  /* =========================================
     CLOSE FORM
  ========================================= */
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
    }, 300);
  };

  /* =========================================
     INPUT CHANGE
  ========================================= */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================================
     SUBMIT
  ========================================= */
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

      /*
       * BACKEND CONNECTION
       * ==================
       * Same existing endpoint.
       */
      const response = await API.post("/cold-leads", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        message: "",
      });

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ||
            "Unable to submit your details."
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
        timer: 1600,
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
      className={`hf-overlay ${
        isClosing ? "hf-overlay--closing" : ""
      }`}
      onClick={() => handleClose()}
    >
      <div
        className={`hf-card ${
          isClosing ? "hf-card--closing" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="healthy-form-title"
      >
        {/* =====================================
            DECORATIVE TOP BACKGROUND
        ===================================== */}
        <div className="hf-top-shape" />

        <div className="hf-small-orb hf-small-orb-green" />
        <div className="hf-small-orb hf-small-orb-orange" />

        {/* Decorative leaves */}
        <span className="hf-leaf hf-leaf-one">
          🌿
        </span>

        <span className="hf-leaf hf-leaf-two">
          🍃
        </span>

        {/* =====================================
            CLOSE BUTTON
        ===================================== */}
        <button
          type="button"
          className="hf-close"
          onClick={() => handleClose()}
          disabled={status === "submitting"}
          aria-label="Close contact form"
        >
          <span />
          <span />
        </button>

        {/* =====================================
            FOOD IMAGE
        ===================================== */}
        <div className="hf-food-area">
          <div className="hf-food-circle">
            <img
              src={healthyFoodImage}
              alt="Healthy food"
              className="hf-food-image"
            />
          </div>

          <div className="hf-fresh-badge">
            <div className="hf-fresh-icon">
              🥗
            </div>

            <div className="hf-fresh-text">
              <strong>Fresh</strong>
              <span>& Healthy</span>
            </div>
          </div>
        </div>

        {/* =====================================
            HEADER
        ===================================== */}
        <div className="hf-header">

          {/* PREMIUM HEALTHY HEAVEN LOGO */}
          <div className="hf-brand">
            <div className="hf-brand-logo">
              <div className="hf-brand-logo-inner">
                <svg
                  viewBox="0 0 40 40"
                  width="27"
                  height="27"
                  fill="none"
                >
                  <path
                    d="M20 32V17"
                    stroke="#fff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />

                  <path
                    d="M20 22C14 21 10 17 11 12C16 12 20 15 20 22Z"
                    fill="#fff"
                  />

                  <path
                    d="M20 18C25 17 29 13 28 9C23 9 20 12 20 18Z"
                    fill="#fff"
                  />

                  <path
                    d="M15 31H26"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            <div className="hf-brand-name">
              <strong>HEALTHY</strong>
              <span>HEAVEN</span>
            </div>
          </div>

          {/* TITLE */}
          <div className="hf-title">
            <span className="hf-eyebrow">
              WE'D LOVE TO HEAR FROM YOU
            </span>

            <h2 id="healthy-form-title">
              Let's Talk<span>.</span>
            </h2>

            <p>
              Share your details and our team will
              get back to you shortly.
            </p>

            <div className="hf-title-decoration">
              <span />
              <i />
              <span />
            </div>
          </div>
        </div>

        {/* =====================================
            FORM
        ===================================== */}
        <form
          className="hf-form"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* NAME */}
          <div className="hf-field">
            <label htmlFor="hf-name">
              Your Name <em>*</em>
            </label>

            <div className="hf-input">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4 3.2-7 8-7s8 3 8 7" />
              </svg>

              <input
                id="hf-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                autoComplete="name"
                disabled={status === "submitting"}
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="hf-field">
            <label htmlFor="hf-email">
              Email Address <em>*</em>
            </label>

            <div className="hf-input">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                />

                <path d="m3 7 9 6 9-6" />
              </svg>

              <input
                id="hf-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                disabled={status === "submitting"}
              />
            </div>
          </div>

          {/* PHONE */}
          <div className="hf-field">
            <label htmlFor="hf-phone">
              Phone Number <em>*</em>
            </label>

            <div className="hf-input">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
              </svg>

              <input
                id="hf-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                autoComplete="tel"
                inputMode="tel"
                disabled={status === "submitting"}
              />
            </div>
          </div>

          {/* ADDRESS */}
          <div className="hf-field">
            <label htmlFor="hf-address">
              Address <em>*</em>
            </label>

            <div className="hf-input">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M20 10c0 5.5-8 12-8 12S4 15.5 4 10a8 8 0 1 1 16 0Z" />

                <circle
                  cx="12"
                  cy="10"
                  r="2.5"
                />
              </svg>

              <input
                id="hf-address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                autoComplete="street-address"
                disabled={status === "submitting"}
              />
            </div>
          </div>

          {/* =====================================
              SUBMIT BUTTON
          ===================================== */}
          <button
            type="submit"
            className={`hf-submit ${
              status === "submitting"
                ? "hf-submit-loading"
                : ""
            }`}
            disabled={status === "submitting"}
          >
            {status === "idle" ? (
              <>
                <span>Send My Details</span>

                <span className="hf-arrow">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m13 6 6 6-6 6" />
                  </svg>
                </span>
              </>
            ) : (
              <>
                <span className="hf-spinner" />
                <span>Submitting...</span>
              </>
            )}
          </button>

          {/* =====================================
              SECURITY
          ===================================== */}
          <div className="hf-security">
            <span className="hf-security-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </span>

            <span>
              Your information is safe & secure with us
            </span>

            <i />
          </div>
        </form>

        {/* =====================================
            BOTTOM DECORATION
        ===================================== */}
        <div className="hf-bottom-dots">
          <span />
          <b />
          <span />
        </div>
      </div>
    </div>
  );
};

export default FloatingForm;