import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartDetails.css';

// Initial cart items (Food/Health items matching Healthy Heaven brand)
const INITIAL_CART_ITEMS = [
  {
    id: 1,
    name: 'Anar Juice (Cold Pressed)',
    variant: '500ml • Freshly Squeezed',
    price: 60,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Nutri Oats Bowl',
    variant: 'Warm Fiber-Rich Oats • Honey & Almonds',
    price: 60,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Corn & Sprout Salad',
    variant: 'Standard Bowl • Sweet Corn & Olive Oil',
    price: 50,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 4,
    name: 'Peanut Butter Whole Wheat Toast',
    variant: '2 Slices • Crunchy Organic Spread',
    price: 40,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200&auto=format&fit=crop&q=80',
  },
];

// Recommended items for "You May Also Like"
const RECOMMENDED_ITEMS = [
  {
    id: 101,
    name: 'Fruit Basil Bliss',
    price: 60,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 102,
    name: 'Desi Boiled Egg (Pair)',
    price: 15,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 103,
    name: 'Kadha Herbal Decoction',
    price: 20,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=200&auto=format&fit=crop&q=80',
  },
  {
    id: 104,
    name: 'Desi Egg Bhurji Bowl',
    price: 40,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=200&auto=format&fit=crop&q=80',
  },
];

const CartDetails = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(20);
  const [wishlist, setWishlist] = useState({});

  // Quantity controllers
  const handleIncreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Add recommended item to cart
  const handleAddRecommended = (item) => {
    const exists = cartItems.find((ci) => ci.id === item.id);
    if (exists) {
      handleIncreaseQty(item.id);
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          id: item.id,
          name: item.name,
          variant: 'Healthy Heaven Special',
          price: item.price,
          quantity: 1,
          image: item.image,
        },
      ]);
    }
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Apply Coupon Logic
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'HEALTHY20') {
      setCouponApplied(true);
      setDiscountAmount(30);
    } else if (couponCode.trim()) {
      alert('Use coupon "HEALTHY20" for ₹30 discount!');
    }
  };

  // Calculations
  const totalItemCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = cartItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const discount = cartItems.length > 0 ? (couponApplied ? discountAmount : 0) : 0;
  const shippingFee = subtotal > 150 || cartItems.length === 0 ? 0 : 25;
  const finalTotal = Math.max(0, subtotal - discount + shippingFee);

  return (
    <div className="CartDetails-wrapper">
      <div className="CartDetails-container">
        
        {/* Top Header & Navigation */}
        <div className="CartDetails-top-bar">
          <h1 className="CartDetails-title">
            Shopping Cart <span className="CartDetails-count">({totalItemCount} items)</span>
          </h1>
          <button
            type="button"
            className="CartDetails-continue-link"
            onClick={() => navigate('/menu')}
          >
            ← Continue Shopping
          </button>
        </div>

        {/* Main 2-Column Grid */}
        <div className="CartDetails-main-grid">
          
          {/* Left Column: Cart Table */}
          <div className="CartDetails-left-col">
            <div className="CartDetails-table-card">
              {cartItems.length === 0 ? (
                <div className="CartDetails-empty-state">
                  <div className="CartDetails-empty-icon">🛒</div>
                  <h3>Your shopping bag is empty</h3>
                  <p>Check out our fresh items and delicious meals.</p>
                  <button
                    className="CartDetails-btn-primary"
                    onClick={() => navigate('/menu')}
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                <>
                  {/* Table Header */}
                  <div className="CartDetails-table-header">
                    <span className="CartDetails-th CartDetails-th-product">Product</span>
                    <span className="CartDetails-th CartDetails-th-price">Price</span>
                    <span className="CartDetails-th CartDetails-th-qty">Quantity</span>
                    <span className="CartDetails-th CartDetails-th-subtotal">Subtotal</span>
                    <span className="CartDetails-th CartDetails-th-action"></span>
                  </div>

                  {/* Item Rows */}
                  <div className="CartDetails-table-body">
                    {cartItems.map((item) => (
                      <div key={item.id} className="CartDetails-row">
                        {/* Product Info */}
                        <div className="CartDetails-col-product">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="CartDetails-product-img"
                          />
                          <div className="CartDetails-product-meta">
                            <h4 className="CartDetails-product-name">{item.name}</h4>
                            <span className="CartDetails-product-variant">{item.variant}</span>
                            <span className="CartDetails-mobile-price">₹{item.price}</span>
                          </div>
                        </div>

                        {/* Unit Price */}
                        <div className="CartDetails-col-price">
                          ₹{item.price.toLocaleString('en-IN')}
                        </div>

                        {/* Quantity Controller */}
                        <div className="CartDetails-col-qty">
                          <div className="CartDetails-qty-control">
                            <button
                              type="button"
                              className="CartDetails-qty-btn"
                              onClick={() => handleDecreaseQty(item.id)}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="CartDetails-qty-val">{item.quantity}</span>
                            <button
                              type="button"
                              className="CartDetails-qty-btn"
                              onClick={() => handleIncreaseQty(item.id)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="CartDetails-col-subtotal">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>

                        {/* Remove Action */}
                        <div className="CartDetails-col-action">
                          <button
                            type="button"
                            className="CartDetails-delete-btn"
                            onClick={() => handleRemoveItem(item.id)}
                            title="Remove item"
                          >
                            🗑
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Promo */}
          <div className="CartDetails-right-col">
            <div className="CartDetails-summary-card">
              <h2 className="CartDetails-summary-heading">Order Summary</h2>

              <div className="CartDetails-summary-row">
                <span>Subtotal ({totalItemCount} items)</span>
                <span className="CartDetails-val">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>

              <div className="CartDetails-summary-row">
                <span>Discount</span>
                <span className="CartDetails-val-discount">
                  {discount > 0 ? `- ₹${discount}` : '₹0'}
                </span>
              </div>

              <div className="CartDetails-summary-row">
                <span>Shipping</span>
                <span className="CartDetails-val-shipping">
                  {shippingFee === 0 ? 'Free' : `₹${shippingFee}`}
                </span>
              </div>

              <div className="CartDetails-summary-divider"></div>

              <div className="CartDetails-summary-total-row">
                <span>Total</span>
                <span className="CartDetails-total-amount">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="button"
                className="CartDetails-checkout-btn"
                disabled={cartItems.length === 0}
                onClick={() => alert('Proceeding to Checkout...')}
              >
                Proceed to Checkout →
              </button>

              <button
                type="button"
                className="CartDetails-secondary-btn"
                onClick={() => navigate('/menu')}
              >
                Continue Shopping
              </button>

              {/* Coupon Section */}
              <div className="CartDetails-coupon-block">
                <label htmlFor="coupon" className="CartDetails-coupon-label">
                  Apply Coupon Code
                </label>
                <form className="CartDetails-coupon-form" onSubmit={handleApplyCoupon}>
                  <input
                    id="coupon"
                    type="text"
                    placeholder="Enter coupon code (try: HEALTHY20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="CartDetails-coupon-input"
                  />
                  <button type="submit" className="CartDetails-coupon-submit">
                    Apply
                  </button>
                </form>
                {couponApplied && (
                  <p className="CartDetails-coupon-success">
                    ✓ Coupon <strong>HEALTHY20</strong> applied successfully!
                  </p>
                )}
              </div>

              {/* Trust Badges */}
              <div className="CartDetails-badges-list">
                <div className="CartDetails-badge-item">
                  <div className="CartDetails-badge-icon">🚚</div>
                  <div className="CartDetails-badge-text">
                    <strong>Free Shipping</strong>
                    <p>On orders above ₹150</p>
                  </div>
                </div>

                <div className="CartDetails-badge-item">
                  <div className="CartDetails-badge-icon">🛡️</div>
                  <div className="CartDetails-badge-text">
                    <strong>100% Fresh &amp; Hygienic</strong>
                    <p>Prepared daily with high quality ingredients</p>
                  </div>
                </div>

                <div className="CartDetails-badge-item">
                  <div className="CartDetails-badge-icon">⚡</div>
                  <div className="CartDetails-badge-text">
                    <strong>Superfast Delivery</strong>
                    <p>Freshly delivered right to your door</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: "You May Also Like" */}
        <section className="CartDetails-recommend-section">
          <div className="CartDetails-recommend-header">
            <h2 className="CartDetails-recommend-title">You May Also Like</h2>
            <button
              type="button"
              className="CartDetails-viewall-link"
              onClick={() => navigate('/menu')}
            >
              View All →
            </button>
          </div>

          <div className="CartDetails-recommend-grid">
            {RECOMMENDED_ITEMS.map((item) => (
              <div key={item.id} className="CartDetails-card">
                <button
                  type="button"
                  className={`CartDetails-heart-btn ${
                    wishlist[item.id] ? 'CartDetails-heart-btn--active' : ''
                  }`}
                  onClick={() => toggleWishlist(item.id)}
                  title="Add to wishlist"
                >
                  {wishlist[item.id] ? '❤️' : '🤍'}
                </button>

                <div className="CartDetails-card-img-wrap">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="CartDetails-card-img"
                  />
                </div>

                <div className="CartDetails-card-content">
                  <h4 className="CartDetails-card-name">{item.name}</h4>
                  <div className="CartDetails-card-price">
                    ₹{item.price.toLocaleString('en-IN')}
                  </div>
                  <button
                    type="button"
                    className="CartDetails-add-btn"
                    onClick={() => handleAddRecommended(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default CartDetails;