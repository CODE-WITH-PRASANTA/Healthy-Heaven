import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock3,
  ArrowUpRight,
} from "lucide-react";
import "./ContactMain.css";

const ContactMain = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    members: "1 Person",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Reservation Data:", formData);

    alert("Your reservation request has been submitted!");

    setFormData({
      name: "",
      email: "",
      number: "",
      members: "1 Person",
      message: "",
    });
  };

  const ContactMainCards = [
    {
      icon: MapPin,
      title: "Location",
      content: (
        <>
          <span>6952 Shelley St</span>
          <span>Melbourne</span>
        </>
      ),
    },
    {
      icon: Phone,
      title: "Phone Number",
      content: (
        <>
          <span>+(800) 800-900-100</span>
          <span>+222 33 567 8665</span>
        </>
      ),
    },
    {
      icon: Mail,
      title: "Email Address",
      content: (
        <>
          <span>Info@Webmail.com</span>
          <span>Info@Example.web.com</span>
        </>
      ),
    },
    {
      icon: Clock3,
      title: "Open & Closing",
      content: (
        <>
          <span>Mon - Fri: 09:00am</span>
          <span>to 07.00pm</span>
        </>
      ),
      active: true,
    },
  ];

  return (
    <section className="ContactMain">
      <div className="ContactMainWrapper">

        {/* ================= CONTACT INFORMATION ================= */}
        <div className="ContactMainInfo">

          {ContactMainCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <div
                className={`ContactMainCard ${
                  card.active ? "ContactMainCardActive" : ""
                }`}
                key={index}
              >
                <div className="ContactMainIconWrapper">
                  <Icon className="ContactMainIcon" strokeWidth={1.8} />
                </div>

                <div className="ContactMainCardContent">
                  <h3 className="ContactMainCardTitle">
                    {card.title}
                  </h3>

                  <div className="ContactMainCardText">
                    {card.content}
                  </div>
                </div>

                <div className="ContactMainCardArrow">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= RESERVATION ================= */}
        <div className="ContactMainReservation">

          <div className="ContactMainHeading">
            <h2 className="ContactMainTitle">
              Reservation
            </h2>

            <p className="ContactMainSubtitle">
              Reserve your table and enjoy a memorable dining experience.
            </p>
          </div>

          <form
            className="ContactMainForm"
            onSubmit={handleSubmit}
          >

            {/* NAME */}
            <div className="ContactMainField">
              <label
                className="ContactMainLabel"
                htmlFor="ContactMainName"
              >
                Your Name
              </label>

              <input
                id="ContactMainName"
                className="ContactMainInput"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* EMAIL */}
            <div className="ContactMainField">
              <label
                className="ContactMainLabel"
                htmlFor="ContactMainEmail"
              >
                Your Email
              </label>

              <input
                id="ContactMainEmail"
                className="ContactMainInput"
                type="email"
                name="email"
                placeholder="info@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* NUMBER */}
            <div className="ContactMainField">
              <label
                className="ContactMainLabel"
                htmlFor="ContactMainNumber"
              >
                Your Number
              </label>

              <input
                id="ContactMainNumber"
                className="ContactMainInput"
                type="tel"
                name="number"
                placeholder="9876543210"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>

            {/* MEMBERS */}
            <div className="ContactMainField">
              <label
                className="ContactMainLabel"
                htmlFor="ContactMainMembers"
              >
                Members
              </label>

              <select
                id="ContactMainMembers"
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
                <option value="7 Persons">7 Persons</option>
                <option value="8 Persons">8 Persons</option>
                <option value="9 Persons">9 Persons</option>
                <option value="10 Persons">10 Persons</option>
              </select>
            </div>

            {/* MESSAGE */}
            <div className="ContactMainField ContactMainMessageField">
              <label
                className="ContactMainLabel"
                htmlFor="ContactMainMessage"
              >
                Message
              </label>

              <textarea
                id="ContactMainMessage"
                className="ContactMainTextarea"
                name="message"
                placeholder="Hi, do you have a moment to talk about!"
                value={formData.message}
                onChange={handleChange}
                rows="4"
              />
            </div>

            {/* SUBMIT */}
            <div className="ContactMainSubmitWrapper">
              <button
                type="submit"
                className="ContactMainSubmitButton"
              >
                <span>Book A Table</span>

                <span className="ContactMainSubmitIcon">
                  <ArrowUpRight size={18} />
                </span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactMain;