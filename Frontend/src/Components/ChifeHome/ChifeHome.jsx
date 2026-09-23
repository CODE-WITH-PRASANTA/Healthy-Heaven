import React from 'react';
import './ChifeHome.css';

const features = [
  {
    id: 1,
    title: '24/7 Free Delivery',
    desc: 'Prompt and reliable doorstep delivery anytime you need.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 18H3c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1h9l3 4h4c.6 0 1 .4 1 1v4h-2m-9 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0zm9 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
        <path d="M15 12h5l2 3v3h-1" />
        <path d="M3 10h6m-5 4h4" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Open Around the Clock',
    desc: 'Our restaurant kitchen is always prepared to serve you.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6v6l4 2" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Best Master Chefs',
    desc: 'Crafting healthy and delicious gourmet meals with passion.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 10.18 0A4 4 0 0 1 19 13.87V21H6z" />
        <line x1="6" y1="17" x2="19" y2="17" />
        <line x1="10" y1="9" x2="10" y2="13" />
        <line x1="14" y1="9" x2="14" y2="13" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Freshest Products',
    desc: 'Sourced daily from organic farms for peak nutritional value.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
        <path d="M2 7h20v5H2z" />
        <path d="M12 22V7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    )
  }
];

const ChifeHome = () => {
  return (
    <section className="chife-home">
      <div className="chife-home__bg-pattern"></div>
      
      <div className="chife-home__inner">
        <div className="chife-home__header">
          <span className="chife-home__eyebrow">Our Core Values</span>
          <h2 className="chife-home__title">Why Choose Us ?</h2>
          <div className="chife-home__divider"></div>
        </div>

        <div className="chife-home__grid">
          {features.map((item) => (
            <div key={item.id} className="chife-home__card">
              <div className="chife-home__icon-wrapper">
                <div className="chife-home__icon-ring"></div>
                <div className="chife-home__icon">
                  {item.icon}
                </div>
              </div>
              <h3 className="chife-home__card-title">{item.title}</h3>
              <p className="chife-home__card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChifeHome;