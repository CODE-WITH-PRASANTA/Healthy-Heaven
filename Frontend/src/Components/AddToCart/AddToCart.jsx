import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddToCart.css';

const DEFAULT_ITEMS = [
  {
    id: 1,
    name: 'Double Burger',
    price: 249,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Cheese Burger',
    price: 189,
    image:
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    name: 'Veggie Supreme Burger',
    price: 149,
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?w=150&auto=format&fit=crop&q=80',
  },
];

const AddToCart = ({ isOpen, onClose, items = DEFAULT_ITEMS, setItems }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [internalItems, setInternalItems] = React.useState(items);
  const currentItems = setItems ? items : internalItems;
  const updateItems = setItems || setInternalItems;

  // Calculate Subtotal
  const totalPrice = currentItems.reduce((acc, curr) => acc + curr.price, 0);

  // Close when clicking outside of the dropdown container
  useEffect(() => {
    const handleOutsideClick = (e) => {
      // Avoid closing if clicking the cart trigger button itself (handled by toggle in Navbar)
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !e.target.closest('.Navbar-cartButton')
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleRemoveItem = (id, e) => {
    e.stopPropagation();
    updateItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleViewCart = () => {
    onClose();
    navigate('/cart');
  };

  const handleGoToMenu = () => {
    onClose();
    navigate('/menu');
  };

  return (
    <div
      ref={dropdownRef}
      className={`add-to-cart-dropdown ${
        isOpen ? 'add-to-cart-dropdown--open' : 'add-to-cart-dropdown--closed'
      }`}
    >
      <div className="add-to-cart-inner">
        {/* Cart Item List */}
        <div className="add-to-cart-list">
          {currentItems.length === 0 ? (
            <div className="add-to-cart-empty">
              <span className="add-to-cart-empty-icon">🛒</span>
              <p>Your cart is empty</p>
            </div>
          ) : (
            currentItems.map((item) => (
              <div key={item.id} className="add-to-cart-item">
                <div className="add-to-cart-thumb">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="add-to-cart-thumb-img"
                  />
                </div>

                <div className="add-to-cart-details">
                  <h4 className="add-to-cart-title">{item.name}</h4>
                  <span className="add-to-cart-price">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="button"
                  className="add-to-cart-remove"
                  title="Remove item"
                  onClick={(e) => handleRemoveItem(item.id, e)}
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer */}
        {currentItems.length > 0 && (
          <div className="add-to-cart-footer">
            <div className="add-to-cart-total-row">
              <span className="add-to-cart-total-label">Subtotal:</span>
              <span className="add-to-cart-total-value">
                ₹{totalPrice.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="add-to-cart-actions">
              <button
                type="button"
                className="add-to-cart-btn add-to-cart-btn--primary"
                onClick={handleViewCart}
              >
                View Cart
              </button>
              <button
                type="button"
                className="add-to-cart-btn add-to-cart-btn--secondary"
                onClick={handleGoToMenu}
              >
                Menu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddToCart;