import React, { useState, useEffect, useRef } from 'react';
import './TotalOrder.css';

const menuItems = [
  {
    id: 1,
    name: 'Artisan Truffle Pizza',
    kicker: 'Wood-Fired & Fresh',
    desc: 'Hand-stretched sourdough crust with wild forest mushrooms, buffalo mozzarella, and aromatic truffle glaze.',
    price: '₹549',
    oldPrice: '₹699',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=85',
    badge: 'HOT SPECIAL'
  },
  {
    id: 2,
    name: 'Golden Herb Grain Bowl',
    kicker: 'Organic & Wholesome',
    desc: 'Slow-simmered saffron rice tossed with garden herbs, roasted chickpeas, avocado, and toasted seeds.',
    price: '₹399',
    oldPrice: '₹499',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=85',
    badge: 'NEW HARVEST'
  },
  {
    id: 3,
    name: 'Heritage Green Bowl',
    kicker: 'Chef Curated Salad',
    desc: 'Crisp market greens, heirloom tomatoes, soft egg, shaved parmesan, and honey-dill emulsion.',
    price: '₹349',
    oldPrice: '₹449',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=700&q=85',
    badge: 'BESTSELLER'
  },
  {
    id: 4,
    name: 'Handcrafted Rigatoni',
    kicker: 'Handmade Daily',
    desc: 'Bronze-cut pasta tossed in slow-simmered San Marzano sugo, creamy burrata, and fragrant basil oil.',
    price: '₹429',
    oldPrice: '₹529',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=700&q=85',
    badge: "CHEF'S PICK"
  }
];

const fallbackImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=85';

const TotalOrder = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % menuItems.length);
    }, 4500);
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
      <div className="total-order__bg" aria-hidden="true">
        <div className="total-order__bloom total-order__bloom--1"></div>
        <div className="total-order__bloom total-order__bloom--2"></div>
        <div className="total-order__bloom total-order__bloom--3"></div>
      </div>

      <div className="total-order__inner">
        <header className="total-order__header">
          <div className="total-order__brand-badge">
            <span className="total-order__dot"></span>
            <span>Gourmet Kitchen Pass</span>
          </div>
          <h2 className="total-order__title">
            On The Pass <em>Right Now</em>
          </h2>
          <p className="total-order__subtitle">
            Wholesome ingredients, masterful culinary craft — plated fresh for your table.
          </p>
        </header>

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
                onMouseEnter={() => setActiveIndex(index)}
              >
                {/* Smooth top-to-bottom green color drop overlay */}
                <div className="total-order__color-curtain" aria-hidden="true"></div>

                <div className="total-order__card-inner">
                  {/* Top curved banner */}
                  <div className="total-order__card-curve">
                    <span className="total-order__badge">{item.badge}</span>
                  </div>

                  {/* Prominent circular plate image */}
                  <div className="total-order__image-wrapper">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="total-order__image" 
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackImage;
                      }}
                    />
                  </div>

                  {/* Card textual content */}
                  <div className="total-order__content">
                    <span className="total-order__kicker">{item.kicker}</span>
                    <h3 className="total-order__card-title">{item.name}</h3>
                    <p className="total-order__desc">{item.desc}</p>
                    
                    <div className="total-order__footer">
                      <div className="total-order__price-box">
                        <span className="total-order__price">{item.price}</span>
                        {item.oldPrice && (
                          <span className="total-order__old-price">{item.oldPrice}</span>
                        )}
                      </div>
                      <button 
                        type="button"
                        className="total-order__cta"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Added ${item.name} to cart!`);
                        }}
                      >
                        <span>Add To Cart</span>
                        <svg viewBox="0 0 24 24" className="total-order__cta-icon" fill="none" stroke="currentColor">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel pagination and controls */}
        <div className="total-order__nav">
          <button 
            type="button" 
            className="total-order__nav-btn" 
            onClick={handlePrev} 
            aria-label="Previous item"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 18l-6-6 6-6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <div className="total-order__dots">
            {menuItems.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`total-order__dot-btn ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            type="button" 
            className="total-order__nav-btn" 
            onClick={handleNext} 
            aria-label="Next item"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 18l6-6-6-6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TotalOrder;