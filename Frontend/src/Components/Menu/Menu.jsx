import React, { useState, useRef, useEffect } from 'react'
import './Menu.css'

/* ---------------------------------------------------------------- */
/* Icon set — hand-drawn line icons, one per category               */
/* ---------------------------------------------------------------- */
const Icons = {
  all: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v3.4M12 17.6V21M21 12h-3.4M6.4 12H3M18.36 5.64l-2.4 2.4M8.04 15.96l-2.4 2.4M18.36 18.36l-2.4-2.4M8.04 8.04l-2.4-2.4" />
    </svg>
  ),
  coldDrink: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M7 3h10l-1.1 15.2a2 2 0 0 1-2 1.8h-3.8a2 2 0 0 1-2-1.8L7 3Z" />
      <path d="M6.3 7.5h11.4" />
      <path d="M14.5 3 17 1.2M9.5 3 10.6 1.3" />
    </svg>
  ),
  pizza: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 3 21.5 20.5a25 25 0 0 1-19 0L12 3Z" />
      <path d="M12 3v17.6" />
      <circle cx="11.2" cy="10.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14.6" cy="14.2" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="9.6" cy="15.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  ),
  salad: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3.2 12.5a8.8 8.8 0 0 1 17.6 0Z" />
      <path d="M3.2 12.5h17.6M12 3.5c1.6 1.6 1.6 4 0 5.6M8 5.3c1.1 1.9.8 3.9-.7 5" />
    </svg>
  ),
  sweets: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M6 10.5h12l-1.3 8.2a2 2 0 0 1-2 1.7H9.3a2 2 0 0 1-2-1.7L6 10.5Z" />
      <path d="M6.5 10.5a5.5 5.5 0 0 1 11 0" />
      <path d="M12 3.2c1 .6 1 1.7 0 2.3-1 .6-1 1.7 0 2.3" />
    </svg>
  ),
  spicy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M4.5 9.5c-1.4 2.8-.6 6.4 2 8.4 2.8 2.1 6.6 1.5 8.6-1.5 1.6-2.4 1.4-5.6-.5-7.7" />
      <path d="M14.6 8.7C17 6.6 18.3 4 17.4 2.8c-1-1.3-3.7.1-5.6 2.4-1.1 1.3-1.7 2.7-1.7 3.8" />
    </svg>
  ),
  burger: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3.5 9.8C3.5 6 7.3 3.5 12 3.5s8.5 2.5 8.5 6.3" />
      <path d="M3 10.5h18M3 13.6h18M4 16.7h16l-.9 2.2a2 2 0 0 1-1.9 1.3H6.8a2 2 0 0 1-1.9-1.3L4 16.7Z" />
    </svg>
  ),
}

/* ---------------------------------------------------------------- */
/* Category configuration for the switch bar                        */
/* ---------------------------------------------------------------- */
const CATEGORIES = [
  { key: 'all', label: 'All', icon: Icons.all },
  { key: 'cold-drink', label: 'Cold Drink', icon: Icons.coldDrink },
  { key: 'pizza', label: 'Pizza', icon: Icons.pizza },
  { key: 'salad', label: 'Salad', icon: Icons.salad },
  { key: 'sweets', label: 'Sweets', icon: Icons.sweets },
  { key: 'spicy', label: 'Spicy', icon: Icons.spicy },
  { key: 'burger', label: 'Burger', icon: Icons.burger },
]

/* ---------------------------------------------------------------- */
/* Menu data                                                        */
/* ---------------------------------------------------------------- */
const MENU_ITEMS = [
  { id: 'm1', name: 'Charred Beef Burger', category: 'burger', price: 4.56, rating: 4.5, top: true,
    desc: 'Smoked patty, aged cheddar, pickled onion, house sauce.',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop' },
  { id: 'm2', name: 'Herb Chicken Burger', category: 'burger', price: 17.56, rating: 4.5, top: true,
    desc: 'Buttermilk chicken, arugula, quick-pickled tomato.',
    img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop' },
  { id: 'm3', name: 'Pineapple Ember Pizza', category: 'pizza', price: 24.5, rating: 4.5, top: true,
    desc: 'Wood-fired crust, charred pineapple, red onion, coriander.',
    img: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?q=80&w=800&auto=format&fit=crop' },
  { id: 'm4', name: 'Classic Margherita', category: 'pizza', price: 14.2, rating: 4.6,
    desc: 'San Marzano tomato, fior di latte, torn basil.',
    img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop' },
  { id: 'm5', name: 'Citrus Garden Salad', category: 'salad', price: 9.8, rating: 4.3,
    desc: 'Blood orange, shaved fennel, toasted pistachio.',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop' },
  { id: 'm6', name: 'Chilled Pineapple Broth', category: 'salad', price: 11.02, rating: 4.5, top: true,
    desc: 'Seared greens, tomato, a bright citrus reduction.',
    img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=800&auto=format&fit=crop' },
  { id: 'm7', name: 'Peach & Basil Cooler', category: 'cold-drink', price: 3.5, rating: 4.2,
    desc: 'Muddled peach, basil, soda, a squeeze of lime.',
    img: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=800&auto=format&fit=crop' },
  { id: 'm8', name: 'Cold Brew Lemonade', category: 'cold-drink', price: 4.1, rating: 4.4,
    desc: 'Slow-steeped cold brew layered over citrus.',
    img: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?q=80&w=800&auto=format&fit=crop' },
  { id: 'm9', name: 'Molten Dark Chocolate', category: 'sweets', price: 6.75, rating: 4.7,
    desc: 'Bittersweet centre, vanilla bean cream.',
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop' },
  { id: 'm10', name: 'Maple Stack Pancake', category: 'sweets', price: 12.2, rating: 4.5, top: true,
    desc: 'Banana, toasted walnut, warm maple pour.',
    img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=800&auto=format&fit=crop' },
  { id: 'm11', name: 'Szechuan Dumplings', category: 'spicy', price: 4.56, rating: 4.5, top: true,
    desc: 'Hand-folded, chili oil, black vinegar dip.',
    img: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=800&auto=format&fit=crop' },
  { id: 'm12', name: 'Firecracker Wings', category: 'spicy', price: 10.4, rating: 4.6,
    desc: 'Double-fried, ghost pepper glaze, lime crema.',
    img: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=800&auto=format&fit=crop' },
]

/* ---------------------------------------------------------------- */
/* Small presentational pieces                                      */
/* ---------------------------------------------------------------- */
const Star = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
    <path d="M12 2.5l2.9 6.1 6.6.7-4.9 4.6 1.3 6.6L12 17l-5.9 3.5 1.3-6.6-4.9-4.6 6.6-.7L12 2.5Z" />
  </svg>
)

const CartIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
    <circle cx="9.5" cy="20.5" r="1" />
    <circle cx="17.5" cy="20.5" r="1" />
    <path d="M2.5 3h2.4l2.1 11.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 7H6" />
  </svg>
)

function MenuCard({ item, onAdd }) {
  return (
    <article className="menu-card">
      <div className="menu-card__media">
        {item.top && <span className="menu-card__badge">Top Seller</span>}
        <span className="menu-card__rating"><Star />{item.rating}</span>
        <img src={item.img} alt={item.name} loading="lazy" />
      </div>
      <div className="menu-card__body">
        <h3 className="menu-card__name">{item.name}</h3>
        <p className="menu-card__desc">{item.desc}</p>
        <div className="menu-card__footer">
          <span className="menu-card__price">${item.price.toFixed(2)}</span>
          <button className="menu-card__add" onClick={() => onAdd(item)} aria-label={`Add ${item.name} to cart`}>
            <CartIcon />
          </button>
        </div>
      </div>
    </article>
  )
}

/* ---------------------------------------------------------------- */
/* Main component                                                   */
/* ---------------------------------------------------------------- */
const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(0)
  const [mobileIndex, setMobileIndex] = useState(0)
  const [cart, setCart] = useState({ count: 0, total: 0 })
  const [toast, setToast] = useState(null)

  const showcaseRef = useRef(null)
  const toastTimer = useRef(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const filteredItems =
    activeCategory === 'all' ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.category === activeCategory)

  // 8 items per page for desktop view
  const itemsPerPage = 8
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const paginatedItems = filteredItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  const handleSwitch = (key) => {
    setActiveCategory(key)
    setCurrentPage(0)
    setMobileIndex(0)
    showcaseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleAdd = (item) => {
    setCart((c) => ({ count: c.count + 1, total: c.total + item.price }))
    setToast(`Added ${item.name}`)
  }

  // Mobile swipe handlers for 1-by-1 pagination
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 40) {
      if (diff > 0 && mobileIndex < filteredItems.length - 1) {
        setMobileIndex((prev) => prev + 1)
      } else if (diff < 0 && mobileIndex > 0) {
        setMobileIndex((prev) => prev - 1)
      }
    }
  }

  useEffect(() => {
    if (!toast) return
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => setToast(null), 1800)
    return () => clearTimeout(toastTimer.current)
  }, [toast])

  return (
    <div className="menu-page">
      {/* Switch bar */}
      <nav className="menu-switchbar" aria-label="Menu categories">
        <div className="menu-switchbar__track">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              className={`menu-switchbar__item ${activeCategory === cat.key ? 'is-active' : ''}`}
              onClick={() => handleSwitch(cat.key)}
            >
              <span className="menu-switchbar__icon">{cat.icon}</span>
              <span className="menu-switchbar__label">{cat.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Showcase Grid */}
      <section className="menu-showcase" id="menu" ref={showcaseRef}>
        <header className="menu-showcase__head">
          <p className="menu-showcase__eyebrow">Handpicked & seasonal</p>
          <h2 className="menu-showcase__title">From Our Menu</h2>
          <p className="menu-showcase__sub">
            A short, changing list — built around what's good at the market this week.
          </p>
        </header>

        {/* Desktop View (8 cards per page) */}
        <div 
          className="menu-showcase__grid desktop-view" 
          key={activeCategory + '-' + currentPage}
        >
          {paginatedItems.map((item, i) => (
            <div className="menu-showcase__cell" style={{ animationDelay: `${i * 50}ms` }} key={item.id}>
              <MenuCard item={item} onAdd={handleAdd} />
            </div>
          ))}
          {filteredItems.length === 0 && (
            <p className="menu-showcase__empty">Nothing plated in this category yet — check back soon.</p>
          )}
        </div>

        {/* Mobile View (1 by 1 Swipe) */}
        <div 
          className="menu-showcase__grid mobile-view"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {filteredItems.map((item, i) => {
            if (i !== mobileIndex) return null;
            return (
              <div className="menu-showcase__cell" key={item.id}>
                <MenuCard item={item} onAdd={handleAdd} />
              </div>
            )
          })}
        </div>

        {/* Premium Desktop Pagination Dots/Pills */}
        {totalPages > 1 && (
          <div className="menu-pagination desktop-pagination">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                className={`menu-pagination__dot ${idx === currentPage ? 'is-active' : ''}`}
                onClick={() => setCurrentPage(idx)}
                aria-label={`Go to page ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Mobile Pagination Dots */}
        {filteredItems.length > 0 && (
          <div className="menu-pagination mobile-pagination">
            {filteredItems.map((_, idx) => (
              <button
                key={idx}
                className={`menu-pagination__dot ${idx === mobileIndex ? 'is-active' : ''}`}
                onClick={() => setMobileIndex(idx)}
                aria-label={`Go to item ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Floating Cart */}
      <div className={`menu-cart ${cart.count ? 'is-visible' : ''}`}>
        <CartIcon />
        <span>{cart.count} item{cart.count === 1 ? '' : 's'}</span>
        <span className="menu-cart__divider" />
        <span>${cart.total.toFixed(2)}</span>
      </div>

      {toast && <div className="menu-toast">{toast}</div>}
    </div>
  )
}

export default Menu