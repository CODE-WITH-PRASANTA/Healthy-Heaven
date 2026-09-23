import React, { useEffect, useRef, useState, useCallback } from 'react';
import './HomeOrder.css';

import bananaShake from '../../assets/coffe.webp';
import chickenWrap from '../../assets/roll.webp';
import gardenSalad from '../../assets/Salada.webp';
import paneerCurry from '../../assets/curry.webp';

/**
 * HomeOrder
 * ---------------------------------------------------------------------------
 * "Today on the pass" — the homepage promo bento for the ordering app.
 * One hero dish, two counter specials, one wide chef's offer. Every card
 * tilts toward the cursor like a plate catching the light, and the whole
 * grid plates itself in, one dish at a time, as it enters the viewport.
 */

const DISHES = [
  {
    id: 'banana-shake',
    variant: 'hero',
    image: bananaShake,
    kicker: "Orchard's Best",
    title: 'Golden Banana Shake',
    note: 'Ripe banana, chilled cream, a whisper of cinnamon.',
    discount: '50%',
    discountLabel: 'OFF',
    price: '₹149',
    oldPrice: '₹299',
  },
  {
    id: 'chicken-wrap',
    variant: 'compact',
    image: chickenWrap,
    kicker: "Today's Counter Special",
    title: 'Herbed Chicken Wrap',
    note: 'Shredded chicken, dill yoghurt, charred flatbread.',
    discount: '60%',
    discountLabel: 'OFF',
    price: '₹179',
    oldPrice: '₹449',
  },
  {
    id: 'garden-salad',
    variant: 'compact',
    image: gardenSalad,
    kicker: 'Light & Fresh',
    title: 'Garden Harvest Bowl',
    note: 'Soft egg, chickpea, greens, honey-mustard drizzle.',
    discount: null,
    price: '₹159',
    oldPrice: null,
  },
  {
    id: 'paneer-curry',
    variant: 'wide',
    image: paneerCurry,
    kicker: 'For a Limited Time',
    title: 'Slow-Spiced Paneer Curry',
    note: 'Simmered with ginger, green chilli and fresh coriander — served with hot chapati.',
    discount: '35%',
    discountLabel: 'OFFER',
    price: '₹219',
    oldPrice: '₹339',
  },
];

/** Simple leaf silhouette used for the ambient background drift. */
function LeafGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 4C11 4 4 11 4 20c9 0 16-7 16-16z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M20 4C13.5 8 9 13 5.2 18.8"
        stroke="rgba(11,22,18,0.35)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Ambient, non-interactive backdrop: soft blooms + a handful of drifting leaves. */
function AmbientBackdrop() {
  return (
    <div className="home-order__bg" aria-hidden="true">
      <span className="home-order__bloom home-order__bloom--one" />
      <span className="home-order__bloom home-order__bloom--two" />
      <span className="home-order__bloom home-order__bloom--three" />
      <span className="home-order__leaf home-order__leaf--a"><LeafGlyph /></span>
      <span className="home-order__leaf home-order__leaf--b"><LeafGlyph /></span>
      <span className="home-order__leaf home-order__leaf--c"><LeafGlyph /></span>
      <span className="home-order__leaf home-order__leaf--d"><LeafGlyph /></span>
      <span className="home-order__leaf home-order__leaf--e"><LeafGlyph /></span>
    </div>
  );
}

/** A single bento card: 3D cursor-tilt + entrance reveal. */
function PromoCard({ dish, index }) {
  const frameRef = useRef(null);
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = useCallback((event) => {
    const frame = frameRef.current;
    if (!frame) return;
    const bounds = frame.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;
    const tiltX = (0.5 - py) * 10;
    const tiltY = (px - 0.5) * 12;
    frame.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`);
    frame.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`);
    frame.style.setProperty('--glow-x', `${(px * 100).toFixed(1)}%`);
    frame.style.setProperty('--glow-y', `${(py * 100).toFixed(1)}%`);
  }, []);

  const handlePointerLeave = useCallback(() => {
    const frame = frameRef.current;
    if (!frame) return;
    frame.style.setProperty('--tilt-x', '0deg');
    frame.style.setProperty('--tilt-y', '0deg');
  }, []);

  return (
    <article
      ref={cardRef}
      className={[
        'promo-card',
        `promo-card--${dish.variant}`,
        visible ? 'promo-card--visible' : '',
      ].join(' ').trim()}
      style={{ '--reveal-index': index }}
    >
      <div
        ref={frameRef}
        className="promo-card__frame"
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
      >
        <div className="promo-card__media">
          <img
            className="promo-card__image"
            src={dish.image}
            alt={dish.title}
            loading="lazy"
          />
          <span className="promo-card__scrim" aria-hidden="true" />
          {dish.variant === 'wide' && (
            <span className="promo-card__steam" aria-hidden="true">
              <i /><i /><i />
            </span>
          )}
        </div>

        {dish.discount && (
          <div className="promo-card__discount">
            <span className="promo-card__discount-value">{dish.discount}</span>
            <span className="promo-card__discount-label">{dish.discountLabel}</span>
          </div>
        )}

        <div className="promo-card__content">
          <p className="promo-card__kicker">{dish.kicker}</p>
          <h3 className="promo-card__title">{dish.title}</h3>
          <p className="promo-card__note">{dish.note}</p>

          <div className="promo-card__footer">
            <div className="promo-card__price">
              <span className="promo-card__price-current">{dish.price}</span>
              {dish.oldPrice && (
                <span className="promo-card__price-old">{dish.oldPrice}</span>
              )}
            </div>
            <button type="button" className="promo-card__cta">
              <span>Add to cart</span>
              <svg viewBox="0 0 24 24" className="promo-card__cta-icon" aria-hidden="true">
                <path d="M4 6h2l1.6 9.6a2 2 0 0 0 2 1.7h7.1a2 2 0 0 0 2-1.6L20 9H7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="20" r="1.4" fill="currentColor" />
                <circle cx="17" cy="20" r="1.4" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

const HomeOrder = () => {
  return (
    <section className="home-order" aria-labelledby="home-order-heading">
      <AmbientBackdrop />

      <div className="home-order__inner">
        <header className="home-order__intro">
          <p className="home-order__eyebrow">On the pass right now</p>
          <h2 id="home-order-heading" className="home-order__heading">
            Today's plate, priced to say yes
          </h2>
          <p className="home-order__sub">
            Four dishes off the kitchen line, discounted while the pans are still warm.
          </p>
        </header>

        <div className="home-order__grid">
          {DISHES.map((dish, index) => (
            <PromoCard key={dish.id} dish={dish} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeOrder;