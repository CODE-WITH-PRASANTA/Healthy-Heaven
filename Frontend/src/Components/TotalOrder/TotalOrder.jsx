import React, { useState, useEffect, useRef } from 'react';
import './TotalOrder.css';

const menuItems = [
  {
    id: 1,
    name: 'Artisan Pizza',
    kicker: 'Wood-Fired & Fresh',
    desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    price: '$55.00',
    oldPrice: '$68.00',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    badge: 'HOT'
  },
  {
    id: 2,
    name: 'Golden Herb Rice',
    kicker: 'Organic & Wholesome',
    desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    price: '$50.00',
    oldPrice: '$60.00',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    badge: 'NEW'
  },
  {
    id: 3,
    name: 'Green Salad',
    kicker: 'Healthy Heaven Special',
    desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    price: '$45.00',
    oldPrice: '$55.00',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    badge: 'BEST'
  },
  {
    id: 4,
    name: 'Italian Pasta',
    kicker: 'Handmade Daily',
    desc: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
    price: '$35.00',
    oldPrice: '$45.00',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281298?auto=format&fit=crop&w=600&q=80',
    badge: 'CHEF'
  }
];

const TotalOrder = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % menuItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % menuItems.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + menuItems.length) % menuItems.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  return (
    <section 
      className="total-order"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="total-order__bg">
        <div className="total-order__bloom total-order__bloom--1"></div>
        <div className="total-order__bloom total-order__bloom--2"></div>
      </div>

      <div className="total-order__inner">
        <div className="total-order__header">
          <div className="total-order__brand-badge">
            <span className="total-order__dot"></span>
            <span>Healthy Heaven Selection</span>
          </div>
          <h2 className="total-order__title">On The Pass Right Now</h2>
          <p className="total-order__subtitle">Good food, good health — freshly prepared for your table.</p>
        </div>

        <div 
          className="total-order__carousel"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {menuItems.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={item.id}
                className={`total-order__card ${isActive ? 'total-order__card--active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <div className="total-order__card-inner">
                  <div className="total-order__card-curve">
                    <span className="total-order__badge">{item.badge}</span>
                  </div>

                  <div className="total-order__image-wrapper">
                    <img src={item.image} alt={item.name} className="total-order__image" />
                  </div>

                  <div className="total-order__content">
                    <span className="total-order__kicker">{item.kicker}</span>
                    <h3 className="total-order__card-title">{item.name}</h3>
                    <p className="total-order__desc">{item.desc}</p>
                    
                    <div className="total-order__footer">
                      <div className="total-order__price-box">
                        <span className="total-order__price">{item.price}</span>
                        <span className="total-order__old-price">{item.oldPrice}</span>
                      </div>
                      <button 
                        className="total-order__cta"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Added ${item.name} to cart!`);
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="total-order__nav">
          <button className="total-order__nav-btn" onClick={handlePrev} aria-label="Previous item">
            &#10094;
          </button>
          
          <div className="total-order__dots">
            {menuItems.map((_, idx) => (
              <button
                key={idx}
                className={`total-order__dot-btn ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button className="total-order__nav-btn" onClick={handleNext} aria-label="Next item">
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
};

export default TotalOrder;