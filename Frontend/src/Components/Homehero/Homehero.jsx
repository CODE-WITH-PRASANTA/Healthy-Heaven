import React, { useRef, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import burgerImg from "../../assets/Roll.png"
import "./Homehero.css"

const Homehero = () => {
  const visualRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    const el = visualRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -18, y: px * 22 })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <section className="homehero">
      <div className="homehero__bg-shape" />

      <div className="homehero__container">
        <div className="homehero__content">
          <span className="homehero__badge">
            <FaStar className="homehero__badge-star" /> Rated #1 Burger House
          </span>

          <h1 className="homehero__title">
            The Number <span className="homehero__title-highlight">#1</span> Choice
            <br />
            Your Hunger Solution
          </h1>

          <p className="homehero__desc">
            Handcrafted, flame-grilled burgers stacked with fresh veggies and
            melted cheese — made fresh, served fast, every single time.
          </p>

          <div className="homehero__actions">
            <button type="button" className="homehero__btn homehero__btn--primary">
              Book a Table
            </button>
            <button type="button" className="homehero__btn homehero__btn--outline">
              View More
            </button>
          </div>
        </div>

        <div
          className="homehero__visual"
          ref={visualRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="homehero__ring homehero__ring--one" />
          <div className="homehero__ring homehero__ring--two" />
          <div className="homehero__burger-glow" />

          <div className="homehero__burger-float">
            <img
              src={burgerImg}
              alt="Premium flame grilled burger"
              className="homehero__burger"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
              }}
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Homehero