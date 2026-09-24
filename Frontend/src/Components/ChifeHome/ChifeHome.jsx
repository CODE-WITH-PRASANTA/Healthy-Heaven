import React from 'react';
import './ChifeHome.css';

const features = [
  {
    id: 1,
    title: '24/7 Free Delivery',
    desc: 'Prompt and reliable doorstep delivery anytime you need, completely free of charge.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 18H3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1" />
        <path d="M14 9h4l3 4v4a1 1 0 0 1-1 1h-2" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
        <path d="M2 11h5" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Open Around The Clock',
    desc: 'Our gourmet restaurant kitchen stays open day and night to cater to your cravings.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15.5 14" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Best Master Chefs',
    desc: 'Crafting healthy and exquisitely plated culinary masterpieces with artisanal care.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 13.8A4 4 0 0 1 7.4 6a5.1 5.1 0 0 1 10.2 0A4 4 0 0 1 19 13.8V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-6.2z" />
        <line x1="6" y1="17" x2="19" y2="17" />
        <line x1="10" y1="9.5" x2="10" y2="13" />
        <line x1="14" y1="9.5" x2="14" y2="13" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Freshest Products',
    desc: 'Hand-picked organic produce sourced fresh daily from verified regional farmsteads.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }
];

const ChifeHome = () => {
  return (
    <section className="chife-home">
      {/* Background ambient lighting */}
      <div className="chife-home__bg-pattern" aria-hidden="true">
        <div className="chife-home__glow-sphere chife-home__glow-sphere--1"></div>
        <div className="chife-home__glow-sphere chife-home__glow-sphere--2"></div>
      </div>
      
      <div className="chife-home__inner">
        <header className="chife-home__header">
          <div className="chife-home__badge">
            <span className="chife-home__dot"></span>
            <span>Our Core Values</span>
          </div>
          <h2 className="chife-home__title">
            Why Choose <em>Us ?</em>
          </h2>
          <p className="chife-home__subtitle">
            Uncompromising culinary precision, ethical sourcing, and hospitality delivered straight to you.
          </p>
          <div className="chife-home__divider"></div>
        </header>

        <div className="chife-home__grid">
          {features.map((item) => (
            <article key={item.id} className="chife-home__card">
              <div className="chife-home__card-highlight"></div>
              
              <div className="chife-home__icon-wrapper">
                <div className="chife-home__icon-ring"></div>
                <div className="chife-home__icon">
                  {item.icon}
                </div>
              </div>

              <h3 className="chife-home__card-title">{item.title}</h3>
              <p className="chife-home__card-desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChifeHome;