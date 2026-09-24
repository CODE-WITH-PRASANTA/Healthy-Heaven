import React, { useState, useMemo, useEffect, useCallback } from 'react';
import './GalleryMain.css';

// Reliable fallback food image
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=85';

// Food dataset accurately matched to actual dish photos
const ALL_FOOD_ITEMS = [
  {
    id: 1,
    title: 'Cheese Burger',
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 2,
    title: 'Chicken Wings',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 3,
    title: 'Pasta Alfredo',
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 4,
    title: 'Butter Chicken',
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 5,
    title: 'Margherita Pizza',
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 6,
    title: 'Grilled Chicken',
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 7,
    title: 'Chicken Biryani',
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 8,
    title: 'Choco Lava Cake',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 9,
    title: 'Greek Salad',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 10,
    title: 'Spring Rolls',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1548869206-93b036288d7e?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 11,
    title: 'Fresh Juices',
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 12,
    title: 'Ice Cream Delight',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 13,
    title: 'Crispy Garlic Bread',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1619860860774-1e2e17343432?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 14,
    title: 'Penne Arrabiata',
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 15,
    title: 'Tiramisu Cup',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 16,
    title: 'Iced Mojito',
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 17,
    title: 'Caesar Salad',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 18,
    title: 'Crispy Fish Tacos',
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 19,
    title: 'Berry Smoothie',
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 20,
    title: 'Strawberry Cheesecake',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 21,
    title: 'Chicken Tikka',
    category: 'Starters',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 22,
    title: 'BBQ Ribs Platter',
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 23,
    title: 'Iced Caramel Latte',
    category: 'Beverages',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 24,
    title: 'Belgian Waffle Delight',
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=1200&q=85',
  }
];

const CATEGORIES = ['All', 'Starters', 'Main Course', 'Desserts', 'Beverages'];

const GalleryMain = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile width to dynamically toggle between 4 items (mobile) and 12 items (desktop)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 520);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemsPerPage = isMobile ? 4 : 12;

  // Filter items based on chosen category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return ALL_FOOD_ITEMS;
    return ALL_FOOD_ITEMS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  // Category switch resets page
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Safe pagination switch with smooth scroll
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      const galleryElem = document.querySelector('.gallery-main');
      if (galleryElem) {
        galleryElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Dynamic pagination range with ellipsis (...) support
  const paginationRange = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  }, [currentPage, totalPages]);

  // Lightbox modal controls
  const handleOpenModal = (item) => {
    const idx = filteredItems.findIndex((x) => x.id === item.id);
    setActiveModalIndex(idx);
  };

  const handleCloseModal = () => {
    setActiveModalIndex(null);
  };

  const handlePrevImage = useCallback(() => {
    if (activeModalIndex !== null && activeModalIndex > 0) {
      setActiveModalIndex((prev) => prev - 1);
    }
  }, [activeModalIndex]);

  const handleNextImage = useCallback(() => {
    if (activeModalIndex !== null && activeModalIndex < filteredItems.length - 1) {
      setActiveModalIndex((prev) => prev + 1);
    }
  }, [activeModalIndex, filteredItems.length]);

  // Keyboard navigation & lock background scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeModalIndex === null) return;
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    if (activeModalIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeModalIndex, handlePrevImage, handleNextImage]);

  const activeItem = activeModalIndex !== null ? filteredItems[activeModalIndex] : null;

  return (
    <section className="gallery-main">
      {/* Header Area */}
      <header className="gallery-main__header">
        <span className="gallery-main__subtitle">OUR GALLERY</span>
        <h1 className="gallery-main__title">Our Food Gallery</h1>
        <div className="gallery-main__divider-icon" aria-hidden="true">
          🍴
        </div>
        <p className="gallery-main__description">
          A glimpse of our delicious dishes, prepared with love and fresh ingredients.
        </p>
      </header>

      {/* Filter Tabs */}
      <nav className="gallery-main__filter-nav" aria-label="Food Categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`gallery-main__filter-btn ${
              selectedCategory === cat ? 'gallery-main__filter-btn--active' : ''
            }`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* Grid: 4 per page on mobile; 12 on desktop */}
      <div className="gallery-main__grid">
        {currentItems.map((item) => (
          <article
            className="gallery-main__card"
            key={item.id}
            onClick={() => handleOpenModal(item)}
            role="button"
            tabIndex={0}
            aria-label={`View photo of ${item.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenModal(item);
              }
            }}
          >
            <div className="gallery-main__img-wrapper">
              <img
                src={item.image}
                alt={item.title}
                className="gallery-main__img"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
              />
              <div className="gallery-main__card-overlay">
                <span className="gallery-main__card-title">{item.title}</span>
                <span className="gallery-main__zoom-btn" title={`View ${item.title}`}>
                  <svg
                    className="gallery-main__zoom-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Clean Mobile & Desktop Pagination */}
      {totalPages > 1 && (
        <footer className="gallery-main__pagination" aria-label="Gallery pagination">
          <button
            type="button"
            className="gallery-main__page-btn gallery-main__page-btn--arrow"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous Page"
          >
            &#8592;
          </button>

          {paginationRange.map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className="gallery-main__page-ellipsis">
                  &hellip;
                </span>
              );
            }

            return (
              <button
                key={page}
                type="button"
                className={`gallery-main__page-btn ${
                  currentPage === page ? 'gallery-main__page-btn--active' : ''
                }`}
                onClick={() => handlePageChange(page)}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            className="gallery-main__page-btn gallery-main__page-btn--arrow"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
          >
            &#8594;
          </button>
        </footer>
      )}

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="gallery-main__modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={handleCloseModal}
        >
          <div
            className="gallery-main__modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="gallery-main__modal-close-icon-btn"
              type="button"
              onClick={handleCloseModal}
              title="Close modal (Esc)"
              aria-label="Close modal"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {activeModalIndex > 0 && (
              <button
                type="button"
                className="gallery-main__modal-nav-btn gallery-main__modal-nav-btn--prev"
                onClick={handlePrevImage}
                aria-label="Previous dish"
              >
                &#10094;
              </button>
            )}

            {activeModalIndex < filteredItems.length - 1 && (
              <button
                type="button"
                className="gallery-main__modal-nav-btn gallery-main__modal-nav-btn--next"
                onClick={handleNextImage}
                aria-label="Next dish"
              >
                &#10095;
              </button>
            )}

            <div className="gallery-main__modal-image-box">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="gallery-main__modal-img"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMAGE;
                }}
              />
            </div>

            <div className="gallery-main__modal-footer">
              <div className="gallery-main__modal-meta">
                <span className="gallery-main__modal-badge">{activeItem.category}</span>
                <h2 className="gallery-main__modal-title">{activeItem.title}</h2>
              </div>

              <div className="gallery-main__modal-actions">
                <button
                  type="button"
                  className="gallery-main__modal-cancel-btn"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryMain;