import React, { useRef, useState } from 'react'
import { FaAward, FaLeaf } from 'react-icons/fa'
import productImg from "../../assets/HeroBesan.png" // Replace with your pack/product image (e.g. Besan/Sattu pack)
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

  const handleScrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="homehero">
      <div className="homehero__bg-shape" />

      <div className="homehero__container">
        <div className="homehero__content">
          <span className="homehero__badge">
            <FaLeaf className="homehero__badge-star" /> 100% Pure & Traditional Farm Essentials
          </span>

          <h1 className="homehero__title">
            The Purest Choice <span className="homehero__title-highlight">For</span>
            <br />
            Healthy Everyday Nutrition
          </h1>

          <p className="homehero__desc">
            Wholesome protein-rich Sattu, premium stone-ground Besan, and pristine Tapioca Sabudana. Unadulterated, traditionally processed, and packed fresh for your family's health.
          </p>

          <div className="homehero__actions">
            <button 
              type="button" 
              className="homehero__btn homehero__btn--primary"
              onClick={() => handleScrollTo('products')}
            >
              Explore Products
            </button>
            <button 
              type="button" 
              className="homehero__btn homehero__btn--outline"
              onClick={() => handleScrollTo('contact')}
            >
              Inquire Wholesale
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
              src={productImg}
              alt="Premium Quality Besan, Sattu and Sabudana Staples"
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