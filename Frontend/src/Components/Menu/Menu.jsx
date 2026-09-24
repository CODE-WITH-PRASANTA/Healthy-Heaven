import React, { useState, useRef, useEffect } from 'react';
import './Menu.css';

/* ---------------------------------------------------------------- */
/* Icon set — hand-drawn line icons, one per category               */
/* ---------------------------------------------------------------- */
const Icons = {
  all: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v3.4M12 17.6V21M21 12h-3.4M6.4 12H3M18.36 5.64l-2.4 2.4M8.04 15.96l-2.4 2.4M18.36 18.36l-2.4-2.4M8.04 8.04l-2.4-2.4" />
    </svg>
  ),
  coldDrink: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 3h10l-1.1 15.2a2 2 0 0 1-2 1.8h-3.8a2 2 0 0 1-2-1.8L7 3Z" />
      <path d="M6.3 7.5h11.4" />
      <path d="M14.5 3 17 1.2M9.5 3 10.6 1.3" />
    </svg>
  ),
  pizza: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3 21.5 20.5a25 25 0 0 1-19 0L12 3Z" />
      <path d="M12 3v17.6" />
      <circle cx="11.2" cy="10.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14.6" cy="14.2" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="9.6" cy="15.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  salad: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3.2 12.5a8.8 8.8 0 0 1 17.6 0Z" />
      <path d="M3.2 12.5h17.6M12 3.5c1.6 1.6 1.6 4 0 5.6M8 5.3c1.1 1.9.8 3.9-.7 5" />
    </svg>
  ),
  sweets: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 10.5h12l-1.3 8.2a2 2 0 0 1-2 1.7H9.3a2 2 0 0 1-2-1.7L6 10.5Z" />
      <path d="M6.5 10.5a5.5 5.5 0 0 1 11 0" />
      <path d="M12 3.2c1 .6 1 1.7 0 2.3-1 .6-1 1.7 0 2.3" />
    </svg>
  ),
  spicy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4.5 9.5c-1.4 2.8-.6 6.4 2 8.4 2.8 2.1 6.6 1.5 8.6-1.5 1.6-2.4 1.4-5.6-.5-7.7" />
      <path d="M14.6 8.7C17 6.6 18.3 4 17.4 2.8c-1-1.3-3.7.1-5.6 2.4-1.1 1.3-1.7 2.7-1.7 3.8" />
    </svg>
  ),
  burger: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3.5 9.8C3.5 6 7.3 3.5 12 3.5s8.5 2.5 8.5 6.3" />
      <path d="M3 10.5h18M3 13.6h18M4 16.7h16l-.9 2.2a2 2 0 0 1-1.9 1.3H6.8a2 2 0 0 1-1.9-1.3L4 16.7Z" />
    </svg>
  ),
};

const CATEGORIES = [
  { key: 'all', label: 'All Specials', icon: Icons.all },
  { key: 'burger', label: 'Burgers', icon: Icons.burger },
  { key: 'pizza', label: 'Wood-Fired Pizza', icon: Icons.pizza },
  { key: 'salad', label: 'Garden Bowls', icon: Icons.salad },
  { key: 'cold-drink', label: 'Beverages', icon: Icons.coldDrink },
  { key: 'sweets', label: 'Artisan Sweets', icon: Icons.sweets },
  { key: 'spicy', label: 'Spicy Grill', icon: Icons.spicy },
];

const MENU_ITEMS = [
  { id: 'm1', name: 'Charred Truffle Burger', category: 'burger', price: 299, rating: 4.8, top: true,
    desc: 'Smoked organic patty, aged sharp cheddar, pickled shallots, house truffle emulsion.',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop' },
  { id: 'm2', name: 'Herb Buttermilk Burger', category: 'burger', price: 259, rating: 4.6, top: false,
    desc: 'Crispy herb chicken breast, dressed baby arugula, quick-pickled heirloom tomato.',
    img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop' },
  { id: 'm3', name: 'Pineapple Ember Pizza', category: 'pizza', price: 449, rating: 4.7, top: true,
    desc: 'Wood-fired sourdough crust, charred sweet pineapple, red onion, and fresh coriander.',
    img: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?q=80&w=800&auto=format&fit=crop' },
  { id: 'm4', name: 'Classic Margherita Rustica', category: 'pizza', price: 379, rating: 4.9, top: false,
    desc: 'San Marzano tomato base, pulled buffalo mozzarella, fragrant torn basil leaves.',
    img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop' },
  { id: 'm5', name: 'Citrus Harvest Salad', category: 'salad', price: 249, rating: 4.5, top: false,
    desc: 'Blood orange fillets, shaved fennel, toasted Iranian pistachios, honey vinaigrette.',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop' },
  { id: 'm6', name: 'Chilled Ginger Greens Bowl', category: 'salad', price: 279, rating: 4.6, top: true,
    desc: 'Seared Asian greens, heritage tomatoes, toasted sesame, bright citrus drizzle.',
    img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop' },
  { id: 'm7', name: 'Peach & Basil Cooler', category: 'cold-drink', price: 179, rating: 4.4, top: false,
    desc: 'Hand-muddled stone peach, bruised holy basil, mineral soda, and fresh kaffir lime.',
    img: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=800&auto=format&fit=crop' },
  { id: 'm8', name: 'Cold Brew Citrus Fizz', category: 'cold-drink', price: 199, rating: 4.7, top: true,
    desc: '18-hour slow-steeped Arabica cold brew layered over fresh Meyer lemonade.',
    img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=800&auto=format&fit=crop' },
  { id: 'm9', name: 'Molten Belgian Chocolate', category: 'sweets', price: 229, rating: 4.9, top: true,
    desc: 'Warm bittersweet lava centre served with Madagascar vanilla bean gelato.',
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop' },
  { id: 'm10', name: 'Golden Maple Pancake Stack', category: 'sweets', price: 269, rating: 4.6, top: false,
    desc: 'Caramelized banana, roasted walnuts, pure grade-A maple syrup pour.',
    img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=800&auto=format&fit=crop' },
  { id: 'm11', name: 'Szechuan Chili Wontons', category: 'spicy', price: 289, rating: 4.8, top: true,
    desc: 'Hand-folded parcels bathed in artisanal chili crisp oil and vintage black vinegar.',
    img: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=800&auto=format&fit=crop' },
  { id: 'm12', name: 'Smoky Firecracker Wings', category: 'spicy', price: 329, rating: 4.7, top: false,
    desc: 'Double-crisped wings tossed in Naga ghost pepper honey glaze, served with lime crema.',
    img: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=800&auto=format&fit=crop' },
];

const fallbackImg = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';

const Star = () => (
  <svg viewBox="0 0 24 24" className="menu-card__star-icon" fill="currentColor">
    <path d="M12 2.5l2.9 6.1 6.6.7-4.9 4.6 1.3 6.6L12 17l-5.9 3.5 1.3-6.6-4.9-4.6 6.6-.7L12 2.5Z" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CartIcon = () => (
  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="17" cy="20" r="1.5" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

function MenuCard({ item, onAdd }) {
  return (
    <article className="menu-card">
      <div className="menu-card__media">
        {item.top && <span className="menu-card__badge">Chef's Choice</span>}
        <div className="menu-card__rating">
          <Star />
          <span>{item.rating}</span>
        </div>
        <img 
          src={item.img} 
          alt={item.name} 
          loading="lazy" 
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImg;
          }}
        />
        <div className="menu-card__overlay" />
      </div>

      <div className="menu-card__body">
        <h3 className="menu-card__name">{item.name}</h3>
        <p className="menu-card__desc">{item.desc}</p>
        
        <div className="menu-card__footer">
          <div className="menu-card__price-wrap">
            <span className="menu-card__currency">₹</span>
            <span className="menu-card__price">{item.price}</span>
          </div>

          <button 
            type="button" 
            className="menu-card__add" 
            onClick={() => onAdd(item)} 
            aria-label={`Add ${item.name} to order`}
          >
            <span>Add</span>
            <PlusIcon />
          </button>
        </div>
      </div>
    </article>
  );
}

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);
  const [cart, setCart] = useState({ count: 0, total: 0 });
  const [toast, setToast] = useState(null);

  const showcaseRef = useRef(null);
  const toastTimer = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const filteredItems =
    activeCategory === 'all' ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.category === activeCategory);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handleSwitch = (key) => {
    setActiveCategory(key);
    setCurrentPage(0);
    setMobileIndex(0);
  };

  const handleAdd = (item) => {
    setCart((c) => ({ count: c.count + 1, total: c.total + item.price }));
    setToast(`Added ${item.name} to order`);
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
      if (diff > 0 && mobileIndex < filteredItems.length - 1) {
        setMobileIndex((prev) => prev + 1);
      } else if (diff < 0 && mobileIndex > 0) {
        setMobileIndex((prev) => prev - 1);
      }
    }
  };

  useEffect(() => {
    if (!toast) return;
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2000);
    return () => clearTimeout(toastTimer.current);
  }, [toast]);

  return (
    <div className="menu-page">
      {/* Ambient background bloom */}
      <div className="menu-page__bg-glow" aria-hidden="true"></div>

      {/* Modern Switch Bar */}
      <nav className="menu-switchbar" aria-label="Menu categories">
        <div className="menu-switchbar__track">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              className={`menu-switchbar__item ${activeCategory === cat.key ? 'is-active' : ''}`}
              onClick={() => handleSwitch(cat.key)}
            >
              <span className="menu-switchbar__icon">{cat.icon}</span>
              <span className="menu-switchbar__label">{cat.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Menu Showcase */}
      <section className="menu-showcase" id="menu" ref={showcaseRef}>
        <header className="menu-showcase__head">
          <div className="menu-showcase__pill">
            <span className="menu-showcase__dot" />
            <span>Handpicked & Seasonal</span>
          </div>
          <h2 className="menu-showcase__title">
            From Our <em>Artisanal Menu</em>
          </h2>
          <p className="menu-showcase__sub">
            Thoughtfully crafted dishes using organic ingredients sourced directly from local farmsteads.
          </p>
        </header>

        {/* Desktop & Tablet Grid View */}
        <div 
          className="menu-showcase__grid desktop-view" 
          key={activeCategory + '-' + currentPage}
        >
          {paginatedItems.map((item, i) => (
            <div className="menu-showcase__cell" style={{ animationDelay: `${i * 45}ms` }} key={item.id}>
              <MenuCard item={item} onAdd={handleAdd} />
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="menu-showcase__empty">
              <p>Nothing plated in this section today. Check back tomorrow!</p>
            </div>
          )}
        </div>

        {/* Mobile Swipe View (1 by 1) */}
        <div 
          className="menu-showcase__grid mobile-view"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {filteredItems.map((item, i) => {
            if (i !== mobileIndex) return null;
            return (
              <div className="menu-showcase__cell mobile-card-wrapper" key={item.id}>
                <MenuCard item={item} onAdd={handleAdd} />
              </div>
            );
          })}
        </div>

        {/* Desktop Pagination */}
        {totalPages > 1 && (
          <div className="menu-pagination desktop-pagination">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`menu-pagination__dot ${idx === currentPage ? 'is-active' : ''}`}
                onClick={() => setCurrentPage(idx)}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Mobile Pagination */}
        {filteredItems.length > 1 && (
          <div className="menu-pagination mobile-pagination">
            {filteredItems.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`menu-pagination__dot ${idx === mobileIndex ? 'is-active' : ''}`}
                onClick={() => setMobileIndex(idx)}
                aria-label={`Go to item ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      
      {/* Status Toast */}
      {toast && (
        <div className="menu-toast" role="status">
          <span className="menu-toast__check">✓</span>
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};

export default Menu;