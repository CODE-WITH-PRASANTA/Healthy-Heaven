import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  LoaderCircle,
  RefreshCw,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import API, { IMG_URL } from "../../api/axios";

import "./Menu.css";

// =====================================================
// CART ID
// =====================================================

const CART_STORAGE_KEY = "healthy_heaven_cart_id";

const getCartId = () => {
  let cartId = localStorage.getItem(CART_STORAGE_KEY);

  if (!cartId) {
    cartId = `cart_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 10)}`;

    localStorage.setItem(CART_STORAGE_KEY, cartId);
  }

  return cartId;
};

// =====================================================
// FALLBACK IMAGE
// =====================================================

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80";

// =====================================================
// IMAGE URL
// =====================================================

const getImageUrl = (image) => {
  if (!image || typeof image !== "string") {
    return FALLBACK_IMAGE;
  }

  const cleanValue = image.trim();

  if (!cleanValue) {
    return FALLBACK_IMAGE;
  }

  if (
    cleanValue.startsWith("http://") ||
    cleanValue.startsWith("https://") ||
    cleanValue.startsWith("blob:") ||
    cleanValue.startsWith("data:")
  ) {
    return cleanValue;
  }

  const cleanImage = cleanValue.replace(/^\/+/, "");

  if (cleanImage.startsWith("uploads/")) {
    return `${IMG_URL}/${cleanImage}`;
  }

  return `${IMG_URL}/uploads/menu/${cleanImage}`;
};

// =====================================================
// CATEGORY ICONS (PRODUCT BASED)
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
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v3.4M12 17.6V21M21 12h-3.4M6.4 12H3M18.36 5.64l-2.4 2.4M8.04 15.96l-2.4 2.4M18.36 18.36l-2.4-2.4M8.04 8.04l-2.4-2.4" />
    </svg>
  ),

  // Flour sack
  besan: (
    <svg {...svgProps}>
      <path d="M6 8h12l2 12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2L6 8Z" />
      <path d="M8 8a4 4 0 0 1 8 0" />
      <path d="M12 13v4M10 15h4" />
    </svg>
  ),

  // Bowl with spoon
  sattu: (
    <svg {...svgProps}>
      <path d="M4 11h16a8 8 0 0 1-16 0Z" />
      <path d="M9 11l5-7" />
      <circle cx="15" cy="4" r="1.5" />
      <path d="M8 19h8" />
    </svg>
  ),

  // Sago pearls
  sabudana: (
    <svg {...svgProps}>
      <circle cx="8" cy="9" r="2.5" />
      <circle cx="16" cy="9" r="2.5" />
      <circle cx="12" cy="15" r="2.8" />
      <circle cx="7" cy="17" r="1.8" />
      <circle cx="17" cy="17" r="1.8" />
    </svg>
  ),

  // Wheat ear
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

  // Rice bowl
  rice: (
    <svg {...svgProps}>
      <path d="M3 12h18a9 9 0 0 1-18 0Z" />
      <path d="M7 9.5c.5-2 2-3 3-3M12 9V5.5M16.5 9.5c-.5-2-2-3-3-3" />
    </svg>
  ),

  // Corn cob
  corn: (
    <svg {...svgProps}>
      <path d="M12 3c3 2 4 6 4 10 0 3-1.6 5.5-4 8-2.4-2.5-4-5-4-8 0-4 1-8 4-10Z" />
      <path d="M8.2 10h7.6M8 14h8M12 3v18" />
      <path d="M12 21l-5 0M12 21l5 0" />
    </svg>
  ),

  // Sprout (dal / pulses)
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
      <path d="M3 21h18" />
    </svg>
  ),
};

// =====================================================
// PRODUCT CATEGORIES
// These tabs ALWAYS show, even when a category has 0
// products. Items are matched by keywords found in the
// category (or product name) coming from the backend.
// Order matters: first match wins.
// =====================================================

const PRODUCT_CATEGORIES = [
  {
    key: "besan",
    label: "Besan",
    icon: Icons.besan,
    match: /besan|gram flour|chickpea flour/,
  },
  {
    key: "sattu",
    label: "Sattu",
    icon: Icons.sattu,
    match: /sattu|sattoo|satu\b/,
  },
  {
    key: "sabudana",
    label: "Sabudana",
    icon: Icons.sabudana,
    match: /sabudana|saboodana|sago|tapioca/,
  },
  {
    key: "sooji-daliya",
    label: "Sooji & Daliya",
    icon: Icons.wheat,
    match: /sooji|suji|semolina|rava|rawa|daliya|dalia|broken wheat|wheat/,
  },
  {
    key: "rice-flour",
    label: "Rice Flour",
    icon: Icons.rice,
    match: /rice|chawal/,
  },
  {
    key: "corn-flour",
    label: "Corn Flour",
    icon: Icons.corn,
    match: /corn|maize|makka/,
  },
  {
    key: "dal-pulses",
    label: "Dal & Pulses",
    icon: Icons.pulses,
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
  if (!category) {
    return "Farm Staples";
  }

  return String(category)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

// Find which product category an item belongs to
const resolveCategory = (rawCategory, name) => {
  const categoryText = normalizeText(rawCategory);
  const nameText = normalizeText(name);

  // 1) match by category text
  let found = PRODUCT_CATEGORIES.find((c) => c.match.test(categoryText));

  // 2) fallback: match by product name
  if (!found) {
    found = PRODUCT_CATEGORIES.find((c) => c.match.test(nameText));
  }

  if (found) {
    return { key: found.key, label: found.label };
  }

  // 3) unknown category: keep it as its own tab
  return {
    key: categoryText || "other",
    label: formatCategory(rawCategory),
    isCustom: true,
  };
};

// =====================================================
// NORMALIZE MENU RESPONSE
// =====================================================

const getMenuArray = (responseData) => {
  if (Array.isArray(responseData)) return responseData;
  if (Array.isArray(responseData?.data)) return responseData.data;
  if (Array.isArray(responseData?.items)) return responseData.items;
  if (Array.isArray(responseData?.menus)) return responseData.menus;
  if (Array.isArray(responseData?.results)) return responseData.results;

  return [];
};

// =====================================================
// NORMALIZE PRODUCT
// =====================================================

const normalizeProduct = (item, index) => {
  const id = item?._id || item?.id || item?.productId || `menu-${index}`;

  const name =
    item?.name || item?.productName || item?.title || "Foodigo Product";

  const description = item?.description || item?.desc || item?.details || "";

  const category =
    item?.category ||
    item?.categoryName ||
    item?.foodCategory ||
    item?.type ||
    "Farm Staples";

  const price = Number(
    item?.price ?? item?.sellingPrice ?? item?.salePrice ?? item?.amount ?? 0
  );

  const rating = Number(item?.rating ?? item?.averageRating ?? 0);

  const image =
    item?.image ||
    item?.imageUrl ||
    item?.photo ||
    item?.thumbnail ||
    item?.menuImage ||
    "";

  const featured = Boolean(
    item?.top ||
      item?.featured ||
      item?.isFeatured ||
      item?.popular ||
      item?.isPopular
  );

  const resolved = resolveCategory(category, name);

  return {
    ...item,

    _id: id,
    name: String(name).trim(),
    description: String(description).trim(),
    category: String(category).trim(),

    // used for tabs + card label
    categoryKey: resolved.key,
    categoryLabel: resolved.label,
    categoryIsCustom: Boolean(resolved.isCustom),

    price: Number.isFinite(price) ? price : 0,
    rating: Number.isFinite(rating) ? rating : 0,
    image,
    top: featured,
  };
};

// =====================================================
// ICONS: STAR + PLUS
// =====================================================

const Star = () => (
  <svg
    viewBox="0 0 24 24"
    className="menu-card__star-icon"
    fill="currentColor"
  >
    <path d="M12 2.5l2.9 6.1 6.6.7-4.9 4.6 1.3 6.6L12 17l-5.9 3.5 1.3-6.6-4.9-4.6 6.6-.7L12 2.5Z" />
  </svg>
);

const PlusIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="15"
    height="15"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// =====================================================
// MENU CARD
// =====================================================

function MenuCard({ item, onAdd, adding }) {
  const imageUrl = getImageUrl(item.image);

  return (
    <article className="menu-card">
      {/* IMAGE */}
      <div className="menu-card__media">
        {item.top && <span className="menu-card__badge">Premium Pure</span>}

        {item.rating > 0 && (
          <div className="menu-card__rating">
            <Star />
            <span>{item.rating.toFixed(1)}</span>
          </div>
        )}

        <img
          src={imageUrl}
          alt={item.name || "Foodigo Product"}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />

        <div className="menu-card__overlay" />
      </div>

      {/* BODY */}
      <div className="menu-card__body">
        <div className="menu-card__category">{item.categoryLabel}</div>

        <h3 className="menu-card__name">{item.name}</h3>

        <p className="menu-card__desc">
          {item.description ||
            "100% natural, hygienic stone-ground agro product packed fresh for everyday nutrition."}
        </p>

        {/* FOOTER */}
        <div className="menu-card__footer">
          <div className="menu-card__price-wrap">
            <span className="menu-card__currency">₹</span>

            <span className="menu-card__price">
              {Number(item.price || 0).toLocaleString("en-IN")}
            </span>
          </div>

          <button
            type="button"
            className="menu-card__add"
            disabled={adding}
            onClick={() => onAdd(item)}
            aria-label={`Add ${item.name} to cart`}
          >
            {adding ? (
              <>
                <LoaderCircle size={15} className="menu-card__loading" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <span>Add</span>
                <PlusIcon />
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

// =====================================================
// CATEGORY BAR (scrollable: arrows + drag + edge fade)
// =====================================================

function CategoryBar({
  categories,
  counts,
  total,
  activeCategory,
  onSelect,
}) {
  const trackRef = useRef(null);

  const dragRef = useRef({
    down: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  const [edges, setEdges] = useState({ left: false, right: false });
  const [dragging, setDragging] = useState(false);

  // Show/hide arrows + edge fades depending on scroll position
  const updateEdges = useCallback(() => {
    const el = trackRef.current;

    if (!el) {
      return;
    }

    const max = el.scrollWidth - el.clientWidth;

    setEdges({
      left: el.scrollLeft > 4,
      right: el.scrollLeft < max - 4,
    });
  }, []);

  useEffect(() => {
    const el = trackRef.current;

    if (!el) {
      return undefined;
    }

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

      if (observer) {
        observer.disconnect();
      }
    };
  }, [updateEdges, categories.length]);

  // Mouse drag-to-scroll (touch devices scroll natively)
  useEffect(() => {
    const handleMove = (event) => {
      const drag = dragRef.current;
      const el = trackRef.current;

      if (!drag.down || !el) {
        return;
      }

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

    if (event.button !== 0 || !el || el.scrollWidth <= el.clientWidth) {
      return;
    }

    dragRef.current = {
      down: true,
      startX: event.pageX,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
  };

  // Stop the click that follows a drag from switching category
  const handleClickCapture = (event) => {
    if (dragRef.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      dragRef.current.moved = false;
    }
  };

  const scrollByDirection = (direction) => {
    const el = trackRef.current;

    if (!el) {
      return;
    }

    el.scrollBy({
      left: direction * Math.max(el.clientWidth * 0.6, 220),
      behavior: "smooth",
    });
  };

  const handleSelect = (key, event) => {
    onSelect(key);

    // Bring the chosen tab into view (horizontal only)
    event.currentTarget.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <nav className="menu-switchbar" aria-label="Product categories">
      <div
        className={`menu-switchbar__shell ${
          edges.left ? "has-left" : ""
        } ${edges.right ? "has-right" : ""}`}
      >
        <button
          type="button"
          className={`menu-switchbar__arrow menu-switchbar__arrow--left ${
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
          className={`menu-switchbar__track ${dragging ? "is-dragging" : ""}`}
          onMouseDown={handleMouseDown}
          onClickCapture={handleClickCapture}
        >
          {categories.map((category) => {
            const isActive = activeCategory === category.key;

            const categoryCount =
              category.key === "all" ? total : counts[category.key] || 0;

            return (
              <button
                key={category.key}
                type="button"
                className={`menu-switchbar__item ${
                  isActive ? "is-active" : ""
                } ${categoryCount === 0 ? "is-empty" : ""}`}
                aria-pressed={isActive}
                onClick={(event) => handleSelect(category.key, event)}
              >
                <span className="menu-switchbar__icon">{category.icon}</span>

                <span className="menu-switchbar__label">{category.label}</span>

                <span className="menu-switchbar__count">{categoryCount}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className={`menu-switchbar__arrow menu-switchbar__arrow--right ${
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
// MAIN MENU
// =====================================================

const Menu = () => {
  const navigate = useNavigate();

  // STATE
  const [menuItems, setMenuItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [addingProductId, setAddingProductId] = useState(null);
  const [toast, setToast] = useState(null);

  const toastTimer = useRef(null);

  // ===================================================
  // FETCH MENU FROM BACKEND
  // ===================================================

  const fetchMenu = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/menu", {
        params: { page: 1, limit: 1000 },
      });

      const rawItems = getMenuArray(response.data);

      const normalizedItems = rawItems
        .map(normalizeProduct)
        .filter((item) => item._id && item.name);

      setMenuItems(normalizedItems);
    } catch (err) {
      console.error("MENU FETCH ERROR:", err);
      console.error("STATUS:", err?.response?.status);
      console.error("BACKEND:", err?.response?.data);

      setMenuItems([]);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load products."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  // ===================================================
  // CATEGORY COUNTS
  // ===================================================

  const categoryCounts = useMemo(() => {
    const counts = {};

    menuItems.forEach((item) => {
      counts[item.categoryKey] = (counts[item.categoryKey] || 0) + 1;
    });

    return counts;
  }, [menuItems]);

  // ===================================================
  // CATEGORY TABS
  // Fixed product categories first, then any extra
  // custom categories that exist in the backend.
  // ===================================================

  const categories = useMemo(() => {
    const customMap = new Map();

    menuItems.forEach((item) => {
      if (item.categoryIsCustom && !customMap.has(item.categoryKey)) {
        customMap.set(item.categoryKey, item.categoryLabel);
      }
    });

    const customTabs = Array.from(customMap.entries())
      .sort((a, b) => a[1].localeCompare(b[1]))
      .map(([key, label]) => ({
        key,
        label,
        icon: Icons.other,
      }));

    return [
      { key: "all", label: "All Products", icon: Icons.all },

      ...PRODUCT_CATEGORIES.map(({ key, label, icon }) => ({
        key,
        label,
        icon,
      })),

      ...customTabs,
    ];
  }, [menuItems]);

  // ===================================================
  // FILTER PRODUCTS
  // ===================================================

  const filteredItems = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return menuItems.filter((item) => {
      const categoryMatch =
        activeCategory === "all" || item.categoryKey === activeCategory;

      if (!categoryMatch) {
        return false;
      }

      if (!search) {
        return true;
      }

      const searchable = [
        item.name,
        item.category,
        item.categoryLabel,
        item.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(search);
    });
  }, [menuItems, activeCategory, searchTerm]);

  // ===================================================
  // PAGINATION
  // ===================================================

  const itemsPerPage = 8;

  const totalPages = Math.max(
    Math.ceil(filteredItems.length / itemsPerPage),
    1
  );

  const paginatedItems = useMemo(() => {
    const start = currentPage * itemsPerPage;

    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage]);

  useEffect(() => {
    setCurrentPage(0);
  }, [activeCategory, searchTerm]);

  const handleSwitch = (key) => {
    setActiveCategory(key);
    setCurrentPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // ===================================================
  // ADD TO CART
  // ===================================================

  const handleAdd = useCallback(
    async (item) => {
      try {
        if (!item) {
          alert("Product information is missing.");
          return;
        }

        if (!item._id) {
          alert("Product ID is missing.");
          return;
        }

        if (addingProductId) {
          return;
        }

        setAddingProductId(item._id);

        const cartId = getCartId();

        const productName = String(item.name || "Product").trim();

        const cartPayload = {
          cartId,
          productId: item._id,
          productName,
          name: productName,
          price: Number(item.price || 0),
          image: item.image || "",
          category: item.category || "",
          description: item.description || "",
          quantity: 1,
        };

        await API.post("/cart", cartPayload);

        setToast(`Added ${productName} to your cart`);

        navigate("/cart");
      } catch (err) {
        console.error("ADD TO CART ERROR:", err);
        console.error("STATUS:", err?.response?.status);
        console.error("BACKEND MESSAGE:", err?.response?.data);

        alert(err?.response?.data?.message || "Failed to add product to cart.");
      } finally {
        setAddingProductId(null);
      }
    },
    [navigate, addingProductId]
  );

  // ===================================================
  // TOAST
  // ===================================================

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    clearTimeout(toastTimer.current);

    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 2200);

    return () => {
      clearTimeout(toastTimer.current);
    };
  }, [toast]);

  // ===================================================
  // PAGE CHANGE
  // ===================================================

  const handlePageChange = (page) => {
    if (page < 0 || page >= totalPages) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeCategoryLabel = categories.find(
    (item) => item.key === activeCategory
  )?.label;

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div className="menu-page">
        <div className="menu-page__bg-glow" aria-hidden="true" />

        <div className="menu-loading">
          <LoaderCircle size={42} className="menu-loading__icon" />

          <h3>Loading Foodigo Products</h3>

          <p>Fetching our freshest batch of Besan, Sattu &amp; Sabudana...</p>
        </div>
      </div>
    );
  }

  // ===================================================
  // JSX
  // ===================================================

  return (
    <div className="menu-page">
      <div className="menu-page__bg-glow" aria-hidden="true" />

      {/* CATEGORY BAR */}
      <CategoryBar
        categories={categories}
        counts={categoryCounts}
        total={menuItems.length}
        activeCategory={activeCategory}
        onSelect={handleSwitch}
      />

      {/* SHOWCASE */}
      <section className="menu-showcase" id="menu">
        <header className="menu-showcase__head">
          <div className="menu-showcase__pill">
            <span className="menu-showcase__dot" />
            <span>100% Pure &amp; Traditional</span>
          </div>

          <h2 className="menu-showcase__title">
            Our Pure Agro <em>Essentials &amp; Staples</em>
          </h2>

          <p className="menu-showcase__sub">
            Finest stone-ground Besan, nutrient-rich roasted Sattu, pristine
            pearl Sabudana, Sooji, Daliya, flours and premium dal, sourced and
            milled with care in Siliguri.
          </p>
        </header>

        {/* SEARCH */}
        <div className="menu-search">
          <Search size={18} />

          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search Besan, Sattu, Sabudana, Sooji, Dal..."
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
          <div className="menu-showcase__error">
            <RefreshCw size={24} />

            <div>
              <h3>Unable to load products</h3>
              <p>{error}</p>
            </div>

            <button type="button" onClick={fetchMenu}>
              Try Again
            </button>
          </div>
        )}

        {/* EMPTY */}
        {!error && filteredItems.length === 0 && (
          <div className="menu-showcase__empty">
            <Search size={36} />

            <h3>
              {activeCategory !== "all" && !searchTerm
                ? `No ${activeCategoryLabel} listed yet`
                : "No products found"}
            </h3>

            <p>
              {activeCategory !== "all" && !searchTerm
                ? "This range is being stocked. Please check back soon or browse our other products."
                : "There are no staples matching your selection or search query right now."}
            </p>

            {(searchTerm || activeCategory !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setActiveCategory("all");
                  setCurrentPage(0);
                }}
              >
                Show All Products
              </button>
            )}
          </div>
        )}

        {/* GRID */}
        {!error && paginatedItems.length > 0 && (
          <div
            className="menu-showcase__grid desktop-view"
            key={`${activeCategory}-${currentPage}-${searchTerm}`}
          >
            {paginatedItems.map((item, index) => (
              <div
                className="menu-showcase__cell"
                style={{ animationDelay: `${index * 45}ms` }}
                key={item._id}
              >
                <MenuCard
                  item={item}
                  onAdd={handleAdd}
                  adding={addingProductId === item._id}
                />
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {!error && totalPages > 1 && (
          <div className="menu-pagination">
            <button
              type="button"
              disabled={currentPage === 0}
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>

            <div className="menu-pagination__pages">
              {Array.from({ length: totalPages }, (_, index) => index).map(
                (page) => (
                  <button
                    type="button"
                    key={page}
                    className={currentPage === page ? "is-active" : ""}
                    onClick={() => handlePageChange(page)}
                  >
                    {page + 1}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              disabled={currentPage >= totalPages - 1}
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Next page"
            >
              <span>Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* COUNT */}
        {!error && filteredItems.length > 0 && (
          <div className="menu-count">
            Showing <strong>{paginatedItems.length}</strong> of{" "}
            <strong>{filteredItems.length}</strong> products
            {activeCategory !== "all" && (
              <>
                {" "}
                in <strong>{activeCategoryLabel}</strong>
              </>
            )}
          </div>
        )}
      </section>

      {/* TOAST */}
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