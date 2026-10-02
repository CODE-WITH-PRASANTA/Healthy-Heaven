import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  Search,
  ShoppingCart,
} from "lucide-react";

import API, { IMG_URL } from "../../api/axios";

import "./MenuMain.css";

// =====================================================
// CATEGORY ICONS
// =====================================================

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const Icons = {
  all: (
    <svg {...svgProps}>
      <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
    </svg>
  ),

  besan: (
    <svg {...svgProps}>
      <path d="M6 8h12l2 12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2L6 8Z" />
      <path d="M8 8a4 4 0 0 1 8 0" />
      <path d="M12 13v4M10 15h4" />
    </svg>
  ),

  sattu: (
    <svg {...svgProps}>
      <path d="M4 11h16a8 8 0 0 1-16 0Z" />
      <path d="M9 11l5-7" />
      <circle cx="15" cy="4" r="1.5" />
      <path d="M8 19h8" />
    </svg>
  ),

  sabudana: (
    <svg {...svgProps}>
      <circle cx="8" cy="9" r="2.5" />
      <circle cx="16" cy="9" r="2.5" />
      <circle cx="12" cy="15" r="2.8" />
      <circle cx="7" cy="17" r="1.8" />
      <circle cx="17" cy="17" r="1.8" />
    </svg>
  ),

  wheat: (
    <svg {...svgProps}>
      <path d="M12 22V8" />
      <path d="M12 8c-2.2 0-3.5-1.5-3.5-3.5C10.7 4.5 12 6 12 8Z" />
      <path d="M12 8c2.2 0 3.5-1.5 3.5-3.5C13.3 4.5 12 6 12 8Z" />
      <path d="M12 14c-2.6 0-4-1.7-4-4 2.6 0 4 1.7 4 4Z" />
      <path d="M12 14c2.6 0 4-1.7 4-4-2.6 0-4 1.7-4 4Z" />
      <path d="M12 20c-2.6 0-4-1.7-4-4 2.6 0 4 1.7 4 4Z" />
      <path d="M12 20c2.6 0 4-1.7 4-4-2.6 0-4 1.7-4 4Z" />
    </svg>
  ),

  rice: (
    <svg {...svgProps}>
      <path d="M3 12h18a9 9 0 0 1-18 0Z" />
      <path d="M7 9.5c.5-2 2-3 3-3M12 9V5.5M16.5 9.5c-.5-2-2-3-3-3" />
    </svg>
  ),

  corn: (
    <svg {...svgProps}>
      <path d="M12 3c3 2 4 6 4 10 0 3-1.6 5.5-4 8-2.4-2.5-4-5-4-8 0-4 1-8 4-10Z" />
      <path d="M8.2 10h7.6M8 14h8M12 3v18" />
    </svg>
  ),

  pulses: (
    <svg {...svgProps}>
      <path d="M12 21V11" />
      <path d="M12 11c-4 0-7-3-7-7 4 0 7 3 7 7Z" />
      <path d="M12 15c4-1 6-4 6-8-4 0-6 4-6 8Z" />
    </svg>
  ),

  other: (
    <svg {...svgProps}>
      <circle cx="8" cy="8" r="2" />
      <circle cx="16" cy="8" r="2" />
      <circle cx="12" cy="16" r="2.5" />
    </svg>
  ),
};

// =====================================================
// PRODUCT CATEGORIES
// Labels must match the admin panel categories.
// These tabs ALWAYS show, even with 0 products.
// =====================================================

const PRODUCT_CATEGORIES = [
  {
    key: "besan",
    label: "Besan",
    icon: Icons.besan,
    blurb: "Stone-ground chana besan with a rich aroma. Perfect for pakoda, dhokla, ladoo and cheela.",
    match: /besan|gram flour|chickpea flour/,
  },
  {
    key: "sattu",
    label: "Sattu",
    icon: Icons.sattu,
    blurb: "High-protein roasted gram flour for cooling drinks, litti and nutritious parathas.",
    match: /sattu|sattoo|satu\b/,
  },
  {
    key: "sabudana",
    label: "Sabudana",
    icon: Icons.sabudana,
    blurb: "Clean, size-sorted pearls that cook soft and non-sticky for khichdi, vada and kheer.",
    match: /sabudana|saboodana|sago|tapioca/,
  },
  {
    key: "sooji-daliya",
    label: "Sooji & Daliya",
    icon: Icons.wheat,
    blurb: "Fine sooji and wholesome daliya made from selected wheat for upma, halwa and porridge.",
    match: /sooji|suji|semolina|rava|rawa|daliya|dalia|broken wheat|wheat/,
  },
  {
    key: "rice-flour",
    label: "Rice Flour",
    icon: Icons.rice,
    blurb: "Light, finely milled rice flour for idli, dosa, appam and crisp snacks.",
    match: /rice|chawal/,
  },
  {
    key: "corn-flour",
    label: "Corn Flour",
    icon: Icons.corn,
    blurb: "Smooth maize flour for rotis, thickening and crispy coatings.",
    match: /corn|maize|makka/,
  },
  {
    key: "dal-pulses",
    label: "Dal & Pulses",
    icon: Icons.pulses,
    blurb: "Clean, high-protein dals and pulses sorted for everyday cooking.",
    match: /\bdals?\b|pulse|moong|masoor|toor|tur\b|arhar|urad|lentil|rajma|chana|chickpea/,
  },
];

// =====================================================
// HELPERS
// =====================================================

const normalizeText = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const formatCategory = (category) => {
  if (!category) return "Farm Staples";

  return String(category)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

// Find which product category a food/product belongs to
const resolveCategory = (rawCategory, name) => {
  const categoryText = normalizeText(rawCategory);
  const nameText = normalizeText(name);

  let found = PRODUCT_CATEGORIES.find((c) => c.match.test(categoryText));

  if (!found) {
    found = PRODUCT_CATEGORIES.find((c) => c.match.test(nameText));
  }

  if (found) {
    return { key: found.key, label: found.label };
  }

  return {
    key: categoryText || "other",
    label: formatCategory(rawCategory),
    isCustom: true,
  };
};

const getCartId = () => {
  let cartId = localStorage.getItem("healthy_heaven_cart_id");

  if (!cartId) {
    cartId = `cart_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;

    localStorage.setItem("healthy_heaven_cart_id", cartId);
  }

  return cartId;
};

const getImageUrl = (image) => {
  if (!image || typeof image !== "string") return "";

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("blob:")
  ) {
    return image;
  }

  const cleanImage = image.replace(/^\/+/, "");

  if (cleanImage.startsWith("uploads/")) {
    return `${IMG_URL}/${cleanImage}`;
  }

  return `${IMG_URL}/uploads/menu/${cleanImage}`;
};

// =====================================================
// CATEGORY BAR (scrollable: arrows + drag + edge fade)
// =====================================================

function CategoryBar({ categories, counts, total, activeCategory, onSelect }) {
  const trackRef = useRef(null);

  const dragRef = useRef({
    down: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  const [edges, setEdges] = useState({ left: false, right: false });
  const [dragging, setDragging] = useState(false);

  const updateEdges = useCallback(() => {
    const el = trackRef.current;

    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;

    setEdges({
      left: el.scrollLeft > 4,
      right: el.scrollLeft < max - 4,
    });
  }, []);

  useEffect(() => {
    const el = trackRef.current;

    if (!el) return undefined;

    updateEdges();

    el.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);

    let observer;

    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updateEdges);
      observer.observe(el);
    }

    return () => {
      el.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);

      if (observer) observer.disconnect();
    };
  }, [updateEdges, categories.length]);

  // Mouse drag-to-scroll (touch scrolls natively)
  useEffect(() => {
    const handleMove = (event) => {
      const drag = dragRef.current;
      const el = trackRef.current;

      if (!drag.down || !el) return;

      const distance = event.pageX - drag.startX;

      if (Math.abs(distance) > 5) {
        if (!drag.moved) {
          drag.moved = true;
          setDragging(true);
        }

        el.scrollLeft = drag.scrollLeft - distance;
      }
    };

    const handleUp = () => {
      if (dragRef.current.down) {
        dragRef.current.down = false;
        setDragging(false);
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  const handleMouseDown = (event) => {
    const el = trackRef.current;

    if (event.button !== 0 || !el || el.scrollWidth <= el.clientWidth) return;

    dragRef.current = {
      down: true,
      startX: event.pageX,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
  };

  const handleClickCapture = (event) => {
    if (dragRef.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      dragRef.current.moved = false;
    }
  };

  const scrollByDirection = (direction) => {
    const el = trackRef.current;

    if (!el) return;

    el.scrollBy({
      left: direction * Math.max(el.clientWidth * 0.6, 220),
      behavior: "smooth",
    });
  };

  const handleSelect = (key, event) => {
    onSelect(key);

    event.currentTarget.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <nav className="menu-categories" aria-label="Product categories">
      <div
        className={`menu-categories__shell ${edges.left ? "has-left" : ""} ${
          edges.right ? "has-right" : ""
        }`}
      >
        <button
          type="button"
          className={`menu-categories__arrow menu-categories__arrow--left ${
            edges.left ? "is-visible" : ""
          }`}
          onClick={() => scrollByDirection(-1)}
          aria-label="Scroll categories left"
          tabIndex={edges.left ? 0 : -1}
        >
          <ChevronLeft size={18} />
        </button>

        <div
          ref={trackRef}
          className={`menu-categories__track ${dragging ? "is-dragging" : ""}`}
          onMouseDown={handleMouseDown}
          onClickCapture={handleClickCapture}
        >
          {categories.map((category) => {
            const isActive = activeCategory === category.key;
            const count = category.key === "all" ? total : counts[category.key] || 0;

            return (
              <button
                key={category.key}
                type="button"
                aria-pressed={isActive}
                className={`menu-categories__item ${isActive ? "active" : ""} ${
                  count === 0 ? "is-empty" : ""
                }`}
                onClick={(event) => handleSelect(category.key, event)}
              >
                <span className="menu-categories__icon">{category.icon}</span>
                <span className="menu-categories__label">{category.label}</span>
                <span className="menu-categories__count">{count}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={`menu-categories__arrow menu-categories__arrow--right ${
            edges.right ? "is-visible" : ""
          }`}
          onClick={() => scrollByDirection(1)}
          aria-label="Scroll categories right"
          tabIndex={edges.right ? 0 : -1}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </nav>
  );
}

// =====================================================
// COMPONENT
// =====================================================

const MenuMain = () => {
  const navigate = useNavigate();

  const [foods, setFoods] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addingProductId, setAddingProductId] = useState(null);

  const itemsPerPage = 8;

  // ===================================================
  // FETCH PRODUCTS
  // ===================================================

  const fetchMenu = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/menu", {
        params: { page: 1, limit: 1000 },
      });

      const result = response.data;

      if (result?.success && Array.isArray(result?.data)) {
        // attach resolved category to every product
        setFoods(
          result.data.map((item) => {
            const resolved = resolveCategory(item.category, item.name);

            return {
              ...item,
              categoryKey: resolved.key,
              categoryLabel: resolved.label,
              categoryIsCustom: Boolean(resolved.isCustom),
            };
          })
        );
      } else {
        setFoods([]);
      }
    } catch (err) {
      console.error("FETCH PUBLIC MENU ERROR:", err);

      setError(err?.response?.data?.message || "Failed to load products.");

      setFoods([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  // ===================================================
  // CATEGORIES + COUNTS
  // ===================================================

  const counts = useMemo(() => {
    const map = {};

    foods.forEach((food) => {
      map[food.categoryKey] = (map[food.categoryKey] || 0) + 1;
    });

    return map;
  }, [foods]);

  const categories = useMemo(() => {
    const customMap = new Map();

    foods.forEach((food) => {
      if (food.categoryIsCustom && !customMap.has(food.categoryKey)) {
        customMap.set(food.categoryKey, food.categoryLabel);
      }
    });

    const customTabs = Array.from(customMap.entries())
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map(([key, label]) => ({
        key,
        label,
        icon: Icons.other,
        blurb: "",
      }));

    return [
      {
        key: "all",
        label: "All Products",
        icon: Icons.all,
        blurb:
          "Explore the full Foodigo range: pure, stone-ground staples milled fresh and hygienically packed in Siliguri.",
      },
      ...PRODUCT_CATEGORIES.map(({ key, label, icon, blurb }) => ({
        key,
        label,
        icon,
        blurb,
      })),
      ...customTabs,
    ];
  }, [foods]);

  const activeMeta = categories.find((c) => c.key === activeCategory);

  // ===================================================
  // FILTER (category + search)
  // ===================================================

  const filteredFoods = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return foods.filter((food) => {
      if (activeCategory !== "all" && food.categoryKey !== activeCategory) {
        return false;
      }

      if (!search) return true;

      return [food.name, food.description, food.categoryLabel, food.category]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search);
    });
  }, [foods, activeCategory, searchTerm]);

  // ===================================================
  // PAGINATION
  // ===================================================

  const totalPages = Math.max(Math.ceil(filteredFoods.length / itemsPerPage), 1);

  const paginatedFoods = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return filteredFoods.slice(start, start + itemsPerPage);
  }, [filteredFoods, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  const handleCategory = (key) => {
    setActiveCategory(key);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    const section = document.getElementById("menu");

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ===================================================
  // DETAILS + CART
  // ===================================================

  const handleFoodClick = (food) => {
    navigate(`/food/${food._id}`);
  };

  const handleAddToCart = async (food) => {
    try {
      setAddingProductId(food._id);

      await API.post("/cart", {
        cartId: getCartId(),
        productId: food._id,
        name: food.name,
        price: Number(food.price || 0),
        image: food.image || "",
        description: food.description || "",
        category: food.category || "",
        quantity: 1,
      });

      navigate("/cart");
    } catch (err) {
      console.error("ADD TO CART ERROR:", err);

      alert(err?.response?.data?.message || "Failed to add product to cart");
    } finally {
      setAddingProductId(null);
    }
  };

  // ===================================================
  // HEADER (shared)
  // ===================================================

  const header = (
    <div className="menu-header">
      <span className="menu-small-title">OUR PRODUCTS</span>

      <h2>
        Pure Staples, <span>Fresh From Mill</span>
      </h2>

      <p>
        Besan, Sattu, Sabudana, Sooji, flours and dal, stone-ground and
        hygienically packed in Siliguri for authentic taste and everyday
        nutrition.
      </p>
    </div>
  );

  // ===================================================
  // LOADING (skeleton)
  // ===================================================

  if (loading) {
    return (
      <section className="menu-main" id="menu">
        {header}

        <div className="menu-grid" aria-busy="true">
          {Array.from({ length: 8 }, (_, index) => (
            <div className="food-card food-card--skeleton" key={index}>
              <div className="food-image" />
              <div className="food-content">
                <span className="sk-line sk-line--title" />
                <span className="sk-line" />
                <span className="sk-line sk-line--short" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ===================================================
  // JSX
  // ===================================================

  return (
    <section className="menu-main" id="menu">
      {header}

      {/* CATEGORY SECTION */}

      <CategoryBar
        categories={categories}
        counts={counts}
        total={foods.length}
        activeCategory={activeCategory}
        onSelect={handleCategory}
      />

      {activeMeta?.blurb && (
        <p className="menu-category-blurb" key={activeCategory}>
          <strong>{activeMeta.label}</strong>
          <span>{activeMeta.blurb}</span>
        </p>
      )}

      {/* SEARCH */}

      <div className="menu-search">
        <Search size={18} />

        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search Besan, Sattu, Sooji, Dal..."
        />

        {searchTerm && (
          <button
            type="button"
            className="menu-search__clear"
            onClick={() => setSearchTerm("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      {/* ERROR */}

      {error && (
        <div className="menu-error">
          <p>{error}</p>

          <button type="button" onClick={fetchMenu}>
            Try Again
          </button>
        </div>
      )}

      {/* EMPTY */}

      {!error && paginatedFoods.length === 0 && (
        <div className="menu-empty">
          <h3>
            {activeCategory !== "all" && !searchTerm
              ? `No ${activeMeta?.label} listed yet`
              : "No products found"}
          </h3>

          <p>
            {activeCategory !== "all" && !searchTerm
              ? "This range is being stocked. Please check back soon or explore our other products."
              : "We couldn't find anything matching your search. Try a different word or category."}
          </p>

          {(activeCategory !== "all" || searchTerm) && (
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setSearchTerm("");
              }}
            >
              Show All Products
            </button>
          )}
        </div>
      )}

      {/* PRODUCT GRID */}

      {!error && paginatedFoods.length > 0 && (
        <div
          className="menu-grid"
          key={`${activeCategory}-${currentPage}-${searchTerm}`}
        >
          {paginatedFoods.map((food, index) => (
            <article
              key={food._id}
              className="food-card"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleFoodClick(food)}
            >
              <div className="food-image">
                {getImageUrl(food.image) ? (
                  <img
                    src={getImageUrl(food.image)}
                    alt={food.name || "Foodigo product"}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : null}

                <span className="food-category">{food.categoryLabel}</span>
              </div>

              <div className="food-content">
                <h3>{food.name}</h3>

                <p>
                  {food.description ||
                    "Pure, hygienically packed Foodigo staple, milled fresh for authentic taste."}
                </p>

                <div className="food-bottom">
                  <span className="food-price">
                    ₹{Number(food.price || 0).toLocaleString("en-IN")}
                  </span>

                  <button
                    type="button"
                    className="food-cart-btn"
                    title="Add to Cart"
                    aria-label={`Add ${food.name} to cart`}
                    disabled={addingProductId === food._id}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleAddToCart(food);
                    }}
                  >
                    {addingProductId === food._id ? (
                      <>
                        <LoaderCircle size={17} className="cart-btn-loader" />
                        <span>Adding</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={17} strokeWidth={2.4} />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* PAGINATION */}

      {!error && filteredFoods.length > itemsPerPage && (
        <div className="menu-pagination">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                type="button"
                key={page}
                className={currentPage === page ? "active" : ""}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )
          )}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}

      {/* COUNT */}

      {!error && filteredFoods.length > 0 && (
        <div className="menu-count">
          Showing {paginatedFoods.length} of {filteredFoods.length} products
          {activeCategory !== "all" && activeMeta ? ` in ${activeMeta.label}` : ""}
        </div>
      )}
    </section>
  );
};

export default MenuMain;