import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  ArrowUpRight,
  Send,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  PackageCheck,
  ShieldCheck,
  HeartHandshake,
  Navigation,
  UserCheck,
} from "lucide-react";
import "./ContactMain.css";

const ContactMain = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    inquiryType: "Product Inquiry",
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
      inquiryType: "Product Inquiry",
      message: "",
    });
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  const contactCards = [
    {
      icon: MapPin,
      title: "Our Location",
      lines: [
        "Patiramjote, Matigara, Siliguri",
        "Dist: Darjeeling, West Bengal, India",
      ],
      link: "https://www.google.com/maps/search/?api=1&query=Patiramjote+Matigara+Siliguri+Darjeeling+West+Bengal+India",
    },
    {
      icon: Phone,
      title: "Direct Contact",
      lines: ["+91 90072 522221", "Sandeep Kumar (Proprietor)"],
      link: "tel:+9190072522221",
    },
    {
      icon: Mail,
      title: "Email Address",
      lines: ["gsmarketing507@gmail.com", "Quick Response Guaranteed"],
      link: "mailto:gsmarketing507@gmail.com",
    },
    {
      icon: Clock3,
      title: "Working Hours",
      lines: ["Mon - Sat: 09:00 AM", "to 07:00 PM (IST)"],
    },
  ];

  const brandPerks = [
    {
      icon: PackageCheck,
      title: "Pure & Hygienic Processing",
      desc: "100% stone-ground, adulteration-free Sattu, Besan, and pristine Sabudana.",
    },
    {
      icon: Sparkles,
      title: "Wholesale & Retail Supply",
      desc: "Custom bulk packaging and distributor-friendly supply chains across Bengal & beyond.",
    },
    {
      icon: ShieldCheck,
      title: "Certified Food Standards",
      desc: "Every batch is inspected for moisture, freshness, and authentic traditional aroma.",
    },
    {
      icon: HeartHandshake,
      title: "Direct Proprietor Support",
      desc: "Get prompt transparent pricing and personalized business deals directly from us.",
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
            const CardElement = card.link ? "a" : "div";

            return (
              <CardElement
                className="ContactMainCard"
                key={index}
                href={card.link}
                target={card.link && card.link.startsWith("http") ? "_blank" : undefined}
                rel={card.link && card.link.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{ animationDelay: `${index * 0.1}s`, textDecoration: "none" }}
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

                {card.link && (
                  <div className="ContactMainCardArrow">
                    <ArrowUpRight size={15} />
                  </div>
                )}
              </CardElement>
            );
          })}
        </div>

        {/* ================= 2. SPLIT INQUIRY SECTION ================= */}
        <div className="ContactMainSplitSection">
          
          {/* LEFT: Brand Trust & Proprietor Perks */}
          <div className="ContactMainSidePerks">
            <span className="ContactMainBadge">
              <Sparkles size={14} /> Foodigo Quality Staples
            </span>
            <h2 className="ContactMainSideHeading">
              Get in Touch with Foodigo
            </h2>
            <p className="ContactMainSideDesc">
              From fresh stone-ground Besan and roasted Sattu to premium Sabudana, Foodigo delivers the finest quality essentials directly from Siliguri to your kitchen.
            </p>

            <div className="ContactMainPerksList">
              {brandPerks.map((perk, idx) => {
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
              <span>
                Call Proprietor (Sandeep Kumar):{" "}
                <a href="tel:+9190072522221" style={{ color: "inherit", textDecoration: "underline" }}>
                  <strong>+91 90072 522221</strong>
                </a>
              </span>
            </div>
          </div>

          {/* RIGHT: Contact & Inquiry Form */}
          <div className="ContactMainReservationBox">
            <div className="ContactMainBoxHeader">
              <span className="ContactMainBoxBadge">
                <Send size={14} /> Send An Inquiry
              </span>
              <h3 className="ContactMainBoxTitle">Connect With Foodigo</h3>
              <p className="ContactMainBoxSubtitle">
                Looking for retail or wholesale orders? Leave your message below.
              </p>
            </div>

            {/* In-Box Success Screen */}
            {isSubmitted && submittedData ? (
              <div className="ContactMainSuccessCard">
                <div className="ContactMainSuccessIcon">
                  <CheckCircle2 size={46} strokeWidth={2.2} />
                </div>
                <h4 className="ContactMainSuccessTitle">Inquiry Sent Successfully!</h4>
                <p className="ContactMainSuccessText">
                  Thank you, <strong>{submittedData.name}</strong>. We have received your request regarding <strong>{submittedData.inquiryType}</strong>. Sandeep Kumar & the Foodigo team will connect with you at <strong>{submittedData.number}</strong> or <strong>{submittedData.email}</strong> shortly.
                </p>

                <button
                  type="button"
                  className="ContactMainResetButton"
                  onClick={handleReset}
                >
                  <RefreshCw size={15} /> Send Another Message
                </button>
              </div>
            ) : (
              /* Contact Form */
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
                      placeholder="e.g. Rahul Sharma"
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
                      placeholder="e.g. rahul@example.com"
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
                      Your Phone Number
                    </label>
                    <input
                      id="number"
                      className="ContactMainInput"
                      type="tel"
                      name="number"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.number}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Inquiry Type */}
                  <div className="ContactMainField">
                    <label className="ContactMainLabel" htmlFor="inquiryType">
                      Requirement Type
                    </label>
                    <select
                      id="inquiryType"
                      className="ContactMainInput ContactMainSelect"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                    >
                      <option value="Product Inquiry">Product Inquiry (Besan / Sattu / Sabudana)</option>
                      <option value="Wholesale & Bulk Supply">Wholesale & Bulk Supply</option>
                      <option value="Distributorship / Dealership">Distributorship / Dealership</option>
                      <option value="Custom Packing">Custom Retail Packaging</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="ContactMainField">
                  <label className="ContactMainLabel" htmlFor="message">
                    Your Requirements / Message
                  </label>
                  <textarea
                    id="message"
                    className="ContactMainTextarea"
                    name="message"
                    placeholder="Mention quantity, destination, or any specific questions..."
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                    required
                  />
                </div>

                {/* Submit */}
                <div className="ContactMainSubmitWrapper">
                  <button type="submit" className="ContactMainSubmitButton">
                    <span>Submit Inquiry</span>
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
              <Navigation size={14} /> Factory & Office Location
            </span>
            <h3 className="ContactMainMapHeading">Visit Foodigo in Siliguri</h3>
            <p className="ContactMainMapSub">
              Patiramjote, Matigara, Siliguri, Dist - Darjeeling, West Bengal, India.
            </p>
          </div>

          <div className="ContactMainMapFrameWrapper">
            <iframe
              title="Foodigo Location Matigara Siliguri"
              src="https://maps.google.com/maps?q=Matigara,Siliguri,Darjeeling,West+Bengal&t=&z=13&ie=UTF8&iwloc=&output=embed"
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
                <strong>Foodigo (Sandeep Kumar, Proprietor)</strong>
                <span>Patiramjote, Matigara, Siliguri, WB</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactMain;