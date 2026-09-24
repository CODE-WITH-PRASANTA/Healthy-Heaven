import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  ArrowUpRight,
  CalendarCheck,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  UtensilsCrossed,
  ShieldCheck,
  HeartHandshake,
  Navigation,
} from "lucide-react";
import "./ContactMain.css";

const ContactMain = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    members: "2 Persons",
    message: "",
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({ ...formData });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      number: "",
      members: "2 Persons",
      message: "",
    });
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  const contactCards = [
    {
      icon: MapPin,
      title: "Location",
      lines: ["6952 Shelley St", "Melbourne, Australia"],
    },
    {
      icon: Phone,
      title: "Phone Number",
      lines: ["+(800) 800-900-100", "+222 33 567 8665"],
    },
    {
      icon: Mail,
      title: "Email Address",
      lines: ["info@healthyheaven.com", "support@healthyheaven.com"],
    },
    {
      icon: Clock3,
      title: "Open & Closing",
      lines: ["Mon - Fri: 09:00am", "to 07:00pm"],
    },
  ];

  const diningPerks = [
    {
      icon: UtensilsCrossed,
      title: "Farm-to-Table Fresh",
      desc: "100% organic, seasonal ingredients picked from local producers daily.",
    },
    {
      icon: Sparkles,
      title: "Chef's Curated Menus",
      desc: "Customizable dietary options including keto, vegan, and gluten-free.",
    },
    {
      icon: ShieldCheck,
      title: "Instant Confirmation",
      desc: "Guaranteed priority table placement with zero waiting upon arrival.",
    },
    {
      icon: HeartHandshake,
      title: "Warm Hospitality",
      desc: "Complimentary welcome drink and personalized table arrangements.",
    },
  ];

  return (
    <section className="ContactMain">
      {/* Decorative ambient background glows */}
      <div className="ContactMainBgGlow ContactMainBgGlow1" aria-hidden="true" />
      <div className="ContactMainBgGlow ContactMainBgGlow2" aria-hidden="true" />

      <div className="ContactMainWrapper">

        {/* ================= 1. CONTACT INFO CARDS ================= */}
        <div className="ContactMainInfo">
          {contactCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                className="ContactMainCard"
                key={index}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="ContactMainIconWrapper">
                  <Icon className="ContactMainIcon" strokeWidth={1.9} />
                </div>

                <div className="ContactMainCardContent">
                  <h3 className="ContactMainCardTitle">{card.title}</h3>
                  <div className="ContactMainCardText">
                    {card.lines.map((line, idx) => (
                      <span key={idx}>{line}</span>
                    ))}
                  </div>
                </div>

                <div className="ContactMainCardArrow">
                  <ArrowUpRight size={15} />
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= 2. SPLIT RESERVATION SECTION ================= */}
        <div className="ContactMainSplitSection">
          
          {/* LEFT: Premium Dining Perks */}
          <div className="ContactMainSidePerks">
            <span className="ContactMainBadge">
              <Sparkles size={14} /> Exceptional Dining
            </span>
            <h2 className="ContactMainSideHeading">
              Reserve A Table For Special Occasions
            </h2>
            <p className="ContactMainSideDesc">
              Whether celebrating milestones, hosting family dinners, or enjoying an intimate date, our chefs prepare every meal to nourish and delight.
            </p>

            <div className="ContactMainPerksList">
              {diningPerks.map((perk, idx) => {
                const PerkIcon = perk.icon;
                return (
                  <div className="ContactMainPerkItem" key={idx}>
                    <div className="ContactMainPerkIconBox">
                      <PerkIcon size={20} strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="ContactMainPerkTitle">{perk.title}</h4>
                      <p className="ContactMainPerkDesc">{perk.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="ContactMainDirectCall">
              <Phone size={18} />
              <span>Prefer booking over phone? Call us: <strong>+(800) 800-900-100</strong></span>
            </div>
          </div>

          {/* RIGHT: Compact Reservation Form Card */}
          <div className="ContactMainReservationBox">
            <div className="ContactMainBoxHeader">
              <span className="ContactMainBoxBadge">
                <CalendarCheck size={14} /> Book Online
              </span>
              <h3 className="ContactMainBoxTitle">Table Reservation</h3>
              <p className="ContactMainBoxSubtitle">
                Fill out the details below to secure your spot.
              </p>
            </div>

            {/* In-Box Success Screen */}
            {isSubmitted && submittedData ? (
              <div className="ContactMainSuccessCard">
                <div className="ContactMainSuccessIcon">
                  <CheckCircle2 size={46} strokeWidth={2.2} />
                </div>
                <h4 className="ContactMainSuccessTitle">Reservation Confirmed!</h4>
                <p className="ContactMainSuccessText">
                  Thank you, <strong>{submittedData.name}</strong>. Your table for <strong>{submittedData.members}</strong> is reserved. A confirmation email has been dispatched to <strong>{submittedData.email}</strong>.
                </p>

                <button
                  type="button"
                  className="ContactMainResetButton"
                  onClick={handleReset}
                >
                  <RefreshCw size={15} /> Book Another Table
                </button>
              </div>
            ) : (
              /* Reservation Form */
              <form className="ContactMainForm" onSubmit={handleSubmit}>
                <div className="ContactMainFormRow">
                  {/* Name */}
                  <div className="ContactMainField">
                    <label className="ContactMainLabel" htmlFor="name">
                      Your Name
                    </label>
                    <input
                      id="name"
                      className="ContactMainInput"
                      type="text"
                      name="name"
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="ContactMainField">
                    <label className="ContactMainLabel" htmlFor="email">
                      Your Email
                    </label>
                    <input
                      id="email"
                      className="ContactMainInput"
                      type="email"
                      name="email"
                      placeholder="e.g. info@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="ContactMainFormRow">
                  {/* Phone */}
                  <div className="ContactMainField">
                    <label className="ContactMainLabel" htmlFor="number">
                      Your Phone
                    </label>
                    <input
                      id="number"
                      className="ContactMainInput"
                      type="tel"
                      name="number"
                      placeholder="e.g. +1 234 567 890"
                      value={formData.number}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Number of Guests */}
                  <div className="ContactMainField">
                    <label className="ContactMainLabel" htmlFor="members">
                      Number of Guests
                    </label>
                    <select
                      id="members"
                      className="ContactMainInput ContactMainSelect"
                      name="members"
                      value={formData.members}
                      onChange={handleChange}
                    >
                      <option value="1 Person">1 Person</option>
                      <option value="2 Persons">2 Persons</option>
                      <option value="3 Persons">3 Persons</option>
                      <option value="4 Persons">4 Persons</option>
                      <option value="5 Persons">5 Persons</option>
                      <option value="6 Persons">6 Persons</option>
                      <option value="8+ Persons">8+ Persons (VIP Party)</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="ContactMainField">
                  <label className="ContactMainLabel" htmlFor="message">
                    Special Requests or Dietary Notes
                  </label>
                  <textarea
                    id="message"
                    className="ContactMainTextarea"
                    name="message"
                    placeholder="E.g., Window seat, anniversary celebration, or allergies..."
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>

                {/* Submit */}
                <div className="ContactMainSubmitWrapper">
                  <button type="submit" className="ContactMainSubmitButton">
                    <span>Book A Table</span>
                    <span className="ContactMainSubmitIcon">
                      <ArrowUpRight size={16} />
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ================= 3. LUXURY MAP SECTION ================= */}
        <div className="ContactMainMapContainer">
          <div className="ContactMainMapHeader">
            <span className="ContactMainBadge">
              <Navigation size={14} /> Interactive Guide
            </span>
            <h3 className="ContactMainMapHeading">Visit Healthy Heaven</h3>
            <p className="ContactMainMapSub">
              Located on Shelley Street, Melbourne. Valet parking & accessible ramps available.
            </p>
          </div>

          <div className="ContactMainMapFrameWrapper">
            <iframe
              title="Healthy Heaven Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153166!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            {/* Floating Location Overlay Badge */}
            <div className="ContactMainMapOverlayBadge">
              <div className="ContactMainMapBadgePin">
                <MapPin size={20} />
              </div>
              <div>
                <strong>Healthy Heaven Restaurant</strong>
                <span>6952 Shelley St, Melbourne</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactMain;