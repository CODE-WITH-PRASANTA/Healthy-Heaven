import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  LoaderCircle,
  RefreshCw,
  Search,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import API, {
  IMG_URL,
} from "../../api/axios";

import "./Menu.css";

// =====================================================
// CART ID
// =====================================================

const CART_STORAGE_KEY =
  "healthy_heaven_cart_id";

const getCartId = () => {
  let cartId =
    localStorage.getItem(
      CART_STORAGE_KEY
    );

  if (!cartId) {
    cartId =
      `cart_${Date.now()}_${Math.random()
        .toString(36)
        .substring(2, 10)}`;

    localStorage.setItem(
      CART_STORAGE_KEY,
      cartId
    );
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
  if (!image) {
    return FALLBACK_IMAGE;
  }

  if (
    typeof image !== "string"
  ) {
    return FALLBACK_IMAGE;
  }

  const cleanValue =
    image.trim();

  if (!cleanValue) {
    return FALLBACK_IMAGE;
  }

  // Full URL
  if (
    cleanValue.startsWith(
      "http://"
    ) ||
    cleanValue.startsWith(
      "https://"
    ) ||
    cleanValue.startsWith(
      "blob:"
    ) ||
    cleanValue.startsWith(
      "data:"
    )
  ) {
    return cleanValue;
  }

  const cleanImage =
    cleanValue.replace(
      /^\/+/,
      ""
    );

  // Already contains uploads/
  if (
    cleanImage.startsWith(
      "uploads/"
    )
  ) {
    return `${IMG_URL}/${cleanImage}`;
  }

  // Backend stores menu images here
  return `${IMG_URL}/uploads/menu/${cleanImage}`;
};

// =====================================================
// CATEGORY ICONS (TAILORED FOR FOODIGO STAPLES)
// =====================================================

const Icons = {
  all: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle
        cx="12"
        cy="12"
        r="3.2"
      />
      <path
        d="
          M12 3v3.4
          M12 17.6V21
          M21 12h-3.4
          M6.4 12H3
          M18.36 5.64l-2.4 2.4
          M8.04 15.96l-2.4 2.4
          M18.36 18.36l-2.4-2.4
          M8.04 8.04l-2.4-2.4
        "
      />
    </svg>
  ),

  besan: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Sack / Flour bag */}
      <path d="M6 8h12l2 12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2L6 8Z" />
      <path d="M8 8a4 4 0 0 1 8 0" />
      <path d="M12 13v4" />
      <path d="M10 15h4" />
    </svg>
  ),

  sattu: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Mortar / Bowl of Ground Roasted Gram */}
      <path d="M4 11h16a8 8 0 0 1-16 0Z" />
      <path d="M9 11l5-7" />
      <circle cx="15" cy="4" r="1.5" />
      <path d="M8 19h8" />
    </svg>
  ),

  sabudana: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Tapioca / Sago Pearls */}
      <circle cx="8" cy="9" r="2.5" />
      <circle cx="16" cy="9" r="2.5" />
      <circle cx="12" cy="15" r="2.8" />
      <circle cx="7" cy="17" r="1.8" />
      <circle cx="17" cy="17" r="1.8" />
    </svg>
  ),

  pulses: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Grain / Dal Sprout */}
      <path d="M12 21V11" />
      <path d="M12 11c-4 0-7-3-7-7 4 0 7 3 7 7Z" />
      <path d="M12 15c4-1 6-4 6-8-4 0-6 4-6 8Z" />
    </svg>
  ),

  spices: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Spice / Purity Flame / Pepper */}
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c4 0 7-3 7-7a7 7 0 0 0-7-7c0 4-3 7-7 7a2.5 2.5 0 0 0 4.5 4.5Z" />
    </svg>
  ),

  wholesale: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Package / Bulk Box */}
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="M12 12l8-4.5" />
      <path d="M12 12v9" />
      <path d="M12 12L4 7.5" />
    </svg>
  ),

  other: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="8" cy="8" r="2" />
      <circle cx="16" cy="8" r="2" />
      <circle cx="12" cy="16" r="2.5" />
      <path d="M3 21h18" />
    </svg>
  ),
};

// =====================================================
// CATEGORY ICON DETECTOR
// =====================================================

const getCategoryIcon = (
  category
) => {
  const value =
    String(category || "")
      .toLowerCase()
      .trim();

  if (
    value.includes("besan") ||
    value.includes("gram flour") ||
    value.includes("flour") ||
    value.includes("atta") ||
    value.includes("maida") ||
    value.includes("suji")
  ) {
    return Icons.besan;
  }

  if (
    value.includes("sattu") ||
    value.includes("roasted") ||
    value.includes("chana sattu")
  ) {
    return Icons.sattu;
  }

  if (
    value.includes("sabudana") ||
    value.includes("sago") ||
    value.includes("tapioca")
  ) {
    return Icons.sabudana;
  }

  if (
    value.includes("dal") ||
    value.includes("pulse") ||
    value.includes("grain") ||
    value.includes("chana") ||
    value.includes("moong")
  ) {
    return Icons.pulses;
  }

  if (
    value.includes("spice") ||
    value.includes("masala") ||
    value.includes("turmeric") ||
    value.includes("chili")
  ) {
    return Icons.spices;
  }

  if (
    value.includes("bulk") ||
    value.includes("wholesale") ||
    value.includes("sack") ||
    value.includes("combo")
  ) {
    return Icons.wholesale;
  }

  return Icons.other;
};

// =====================================================
// CATEGORY FORMATTER
// =====================================================

const formatCategory = (
  category
) => {
  if (!category) {
    return "Farm Staples";
  }

  return String(category)
    .replace(
      /[-_]+/g,
      " "
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim()
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase()
    );
};

// =====================================================
// NORMALIZE MENU RESPONSE
// =====================================================

const getMenuArray = (
  responseData
) => {
  if (
    Array.isArray(
      responseData
    )
  ) {
    return responseData;
  }

  if (
    Array.isArray(
      responseData?.data
    )
  ) {
    return responseData.data;
  }

  if (
    Array.isArray(
      responseData?.items
    )
  ) {
    return responseData.items;
  }

  if (
    Array.isArray(
      responseData?.menus
    )
  ) {
    return responseData.menus;
  }

  if (
    Array.isArray(
      responseData?.results
    )
  ) {
    return responseData.results;
  }

  return [];
};

// =====================================================
// NORMALIZE PRODUCT
// =====================================================

const normalizeProduct = (
  item,
  index
) => {
  const id =
    item?._id ||
    item?.id ||
    item?.productId ||
    `menu-${index}`;

  const name =
    item?.name ||
    item?.productName ||
    item?.title ||
    "Foodigo Product";

  const description =
    item?.description ||
    item?.desc ||
    item?.details ||
    "";

  const category =
    item?.category ||
    item?.categoryName ||
    item?.foodCategory ||
    item?.type ||
    "Farm Staples";

  const price = Number(
    item?.price ??
      item?.sellingPrice ??
      item?.salePrice ??
      item?.amount ??
      0
  );

  const rating = Number(
    item?.rating ??
      item?.averageRating ??
      0
  );

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

  return {
    ...item,

    _id: id,

    name: String(name).trim(),

    description:
      String(
        description
      ).trim(),

    category:
      String(category).trim(),

    price:
      Number.isFinite(price)
        ? price
        : 0,

    rating:
      Number.isFinite(rating)
        ? rating
        : 0,

    image,

    top: featured,
  };
};

// =====================================================
// STAR
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

// =====================================================
// PLUS
// =====================================================

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
    <line
      x1="12"
      y1="5"
      x2="12"
      y2="19"
    />

    <line
      x1="5"
      y1="12"
      x2="19"
      y2="12"
    />
  </svg>
);

// =====================================================
// MENU CARD
// =====================================================

function MenuCard({
  item,
  onAdd,
  adding,
}) {
  const imageUrl =
    getImageUrl(
      item.image
    );

  return (
    <article className="menu-card">

      {/* ================================================
          IMAGE
      ================================================ */}

      <div className="menu-card__media">

        {item.top && (
          <span className="menu-card__badge">
            Premium Pure
          </span>
        )}

        {item.rating > 0 && (
          <div className="menu-card__rating">
            <Star />

            <span>
              {item.rating.toFixed(
                1
              )}
            </span>
          </div>
        )}

        <img
          src={imageUrl}
          alt={
            item.name ||
            "Foodigo Product"
          }
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror =
              null;

            event.currentTarget.src =
              FALLBACK_IMAGE;
          }}
        />

        <div className="menu-card__overlay" />
      </div>

      {/* ================================================
          BODY
      ================================================ */}

      <div className="menu-card__body">

        <div className="menu-card__category">
          {formatCategory(
            item.category
          )}
        </div>

        <h3 className="menu-card__name">
          {item.name}
        </h3>

        <p className="menu-card__desc">
          {item.description ||
            "100% natural, hygienic stone-ground agro product packed fresh for everyday nutrition."}
        </p>

        {/* ==============================================
            FOOTER
        ============================================== */}

        <div className="menu-card__footer">

          <div className="menu-card__price-wrap">

            <span className="menu-card__currency">
              ₹
            </span>

            <span className="menu-card__price">
              {Number(
                item.price || 0
              ).toLocaleString(
                "en-IN"
              )}
            </span>

          </div>

          {/* ============================================
              ADD BUTTON
          ============================================ */}

          <button
            type="button"
            className="menu-card__add"
            disabled={adding}
            onClick={() =>
              onAdd(item)
            }
            aria-label={`Add ${item.name} to cart`}
          >
            {adding ? (
              <>
                <LoaderCircle
                  size={15}
                  className="menu-card__loading"
                />

                <span>
                  Adding...
                </span>
              </>
            ) : (
              <>
                <span>
                  Add
                </span>

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
// MAIN MENU
// =====================================================

const Menu = () => {
  const navigate =
    useNavigate();

  // ===================================================
  // STATE
  // ===================================================

  const [
    menuItems,
    setMenuItems,
  ] = useState([]);

  const [
    activeCategory,
    setActiveCategory,
  ] = useState("all");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(0);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const [
    addingProductId,
    setAddingProductId,
  ] = useState(null);

  const [
    toast,
    setToast,
  ] = useState(null);

  const toastTimer =
    useRef(null);

  // ===================================================
  // FETCH MENU FROM BACKEND
  // ===================================================

  const fetchMenu =
    useCallback(
      async () => {
        try {
          setLoading(true);
          setError("");

          console.log(
            "FETCHING FOODIGO PRODUCTS..."
          );

          const response =
            await API.get(
              "/menu",
              {
                params: {
                  page: 1,
                  limit: 1000,
                },
              }
            );

          console.log(
            "MENU API RESPONSE:",
            response.data
          );

          const rawItems =
            getMenuArray(
              response.data
            );

          const normalizedItems =
            rawItems
              .map(
                normalizeProduct
              )
              .filter(
                (item) =>
                  item._id &&
                  item.name
              );

          console.log(
            "FOODIGO PRODUCTS:",
            normalizedItems
          );

          setMenuItems(
            normalizedItems
          );

        } catch (err) {
          console.error(
            "MENU FETCH ERROR:",
            err
          );

          console.error(
            "STATUS:",
            err?.response?.status
          );

          console.error(
            "BACKEND:",
            err?.response?.data
          );

          setMenuItems([]);

          setError(
            err?.response?.data
              ?.message ||
              err?.message ||
              "Failed to load products."
          );
        } finally {
          setLoading(false);
        }
      },
      []
    );

  // ===================================================
  // INITIAL FETCH
  // ===================================================

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  // ===================================================
  // DYNAMIC CATEGORIES
  // ===================================================

  const categories =
    useMemo(() => {
      const categoryMap =
        new Map();

      menuItems.forEach(
        (item) => {
          if (
            !item?.category
          ) {
            return;
          }

          const original =
            String(
              item.category
            ).trim();

          const key =
            original
              .toLowerCase()
              .replace(
                /\s+/g,
                " "
              );

          if (
            !categoryMap.has(
              key
            )
          ) {
            categoryMap.set(
              key,
              original
            );
          }
        }
      );

      return [
        {
          key: "all",
          label: "All Products",
          icon: Icons.all,
        },

        ...Array.from(
          categoryMap.entries()
        )
          .sort((a, b) =>
            a[1].localeCompare(
              b[1]
            )
          )
          .map(
            ([key, value]) => ({
              key,
              label:
                formatCategory(
                  value
                ),
              icon:
                getCategoryIcon(
                  value
                ),
            })
          ),
      ];
    }, [menuItems]);

  // ===================================================
  // FILTER PRODUCTS
  // ===================================================

  const filteredItems =
    useMemo(() => {
      const search =
        searchTerm
          .trim()
          .toLowerCase();

      return menuItems.filter(
        (item) => {
          const category =
            String(
              item.category ||
                ""
            )
              .toLowerCase()
              .replace(
                /\s+/g,
                " "
              )
              .trim();

          const categoryMatch =
            activeCategory ===
              "all" ||
            category ===
              activeCategory;

          if (
            !categoryMatch
          ) {
            return false;
          }

          if (!search) {
            return true;
          }

          const searchable =
            [
              item.name,
              item.category,
              item.description,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

          return searchable.includes(
            search
          );
        }
      );
    }, [
      menuItems,
      activeCategory,
      searchTerm,
    ]);

  // ===================================================
  // PAGINATION
  // ===================================================

  const itemsPerPage = 8;

  const totalPages =
    Math.max(
      Math.ceil(
        filteredItems.length /
          itemsPerPage
      ),
      1
    );

  const paginatedItems =
    useMemo(() => {
      const start =
        currentPage *
        itemsPerPage;

      return filteredItems.slice(
        start,
        start +
          itemsPerPage
      );
    }, [
      filteredItems,
      currentPage,
    ]);

  // ===================================================
  // RESET PAGE WHEN FILTER CHANGES
  // ===================================================

  useEffect(() => {
    setCurrentPage(0);
  }, [
    activeCategory,
    searchTerm,
  ]);

  // ===================================================
  // CATEGORY CHANGE
  // ===================================================

  const handleSwitch = (
    key
  ) => {
    setActiveCategory(key);

    setCurrentPage(0);
  };

  // ===================================================
  // SEARCH
  // ===================================================

  const handleSearch = (
    event
  ) => {
    setSearchTerm(
      event.target.value
    );
  };

  // ===================================================
  // ADD TO CART
  // ===================================================

  const handleAdd =
    useCallback(
      async (item) => {
        try {
          if (!item) {
            alert(
              "Product information is missing."
            );

            return;
          }

          if (!item._id) {
            alert(
              "Product ID is missing."
            );

            return;
          }

          if (
            addingProductId
          ) {
            return;
          }

          setAddingProductId(
            item._id
          );

          const cartId =
            getCartId();

          const productName =
            String(
              item.name ||
                "Product"
            ).trim();

          const productPrice =
            Number(
              item.price || 0
            );

          const productImage =
            item.image || "";

          const productCategory =
            item.category ||
            "";

          const productDescription =
            item.description ||
            "";

          const cartPayload = {
            cartId,

            productId:
              item._id,

            productName,

            name:
              productName,

            price:
              productPrice,

            image:
              productImage,

            category:
              productCategory,

            description:
              productDescription,

            quantity: 1,
          };

          console.log(
            "ADD TO CART PAYLOAD:",
            cartPayload
          );

          const response =
            await API.post(
              "/cart",
              cartPayload
            );

          console.log(
            "ADD TO CART RESPONSE:",
            response.data
          );

          setToast(
            `Added ${productName} to your cart`
          );

          navigate("/cart");

        } catch (err) {
          console.error(
            "ADD TO CART ERROR:",
            err
          );

          console.error(
            "STATUS:",
            err?.response?.status
          );

          console.error(
            "BACKEND MESSAGE:",
            err?.response?.data
          );

          alert(
            err?.response?.data
              ?.message ||
              "Failed to add product to cart."
          );
        } finally {
          setAddingProductId(
            null
          );
        }
      },
      [
        navigate,
        addingProductId,
      ]
    );

  // ===================================================
  // TOAST
  // ===================================================

  useEffect(() => {
    if (!toast) {
      return;
    }

    clearTimeout(
      toastTimer.current
    );

    toastTimer.current =
      setTimeout(() => {
        setToast(null);
      }, 2200);

    return () => {
      clearTimeout(
        toastTimer.current
      );
    };
  }, [toast]);

  // ===================================================
  // PAGE CHANGE
  // ===================================================

  const handlePageChange =
    (page) => {
      if (
        page < 0 ||
        page >= totalPages
      ) {
        return;
      }

      setCurrentPage(page);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div className="menu-page">

        <div
          className="menu-page__bg-glow"
          aria-hidden="true"
        />

        <div className="menu-loading">
          <LoaderCircle
            size={42}
            className="menu-loading__icon"
          />

          <h3>
            Loading Foodigo Products
          </h3>

          <p>
            Fetching our freshest batch of Besan, Sattu & Sabudana...
          </p>
        </div>

      </div>
    );
  }

  // ===================================================
  // JSX
  // ===================================================

  return (
    <div className="menu-page">

      {/* =================================================
          BACKGROUND
      ================================================ */}

      <div
        className="menu-page__bg-glow"
        aria-hidden="true"
      />

      {/* =================================================
          CATEGORY BAR
      ================================================ */}

      <nav
        className="menu-switchbar"
        aria-label="Product categories"
      >
        <div className="menu-switchbar__track">

          {categories.map(
            (category) => {
              const isActive =
                activeCategory ===
                category.key;

              const categoryCount =
                category.key ===
                "all"
                  ? menuItems.length
                  : menuItems.filter(
                      (item) => {
                        const itemCategory =
                          String(
                            item.category ||
                              ""
                          )
                            .toLowerCase()
                            .replace(
                              /\s+/g,
                              " "
                            )
                            .trim();

                        return (
                          itemCategory ===
                          category.key
                        );
                      }
                    ).length;

              return (
                <button
                  key={
                    category.key
                  }
                  type="button"
                  className={`menu-switchbar__item ${
                    isActive
                      ? "is-active"
                      : ""
                  }`}
                  onClick={() =>
                    handleSwitch(
                      category.key
                    )
                  }
                >

                  <span className="menu-switchbar__icon">
                    {
                      category.icon
                    }
                  </span>

                  <span className="menu-switchbar__label">
                    {
                      category.label
                    }
                  </span>

                  <span className="menu-switchbar__count">
                    {
                      categoryCount
                    }
                  </span>

                </button>
              );
            }
          )}

        </div>
      </nav>

      {/* =================================================
          SHOWCASE
      ================================================ */}

      <section
        className="menu-showcase"
        id="menu"
      >

        {/* =================================================
            HEADER
        ================================================ */}

        <header className="menu-showcase__head">

          <div className="menu-showcase__pill">

            <span className="menu-showcase__dot" />

            <span>
              100% Pure & Traditional
            </span>

          </div>

          <h2 className="menu-showcase__title">
            Our Pure Agro{" "}
            <em>
              Essentials & Staples
            </em>
          </h2>

          <p className="menu-showcase__sub">
            Finest stone-ground Besan, nutrient-rich roasted Sattu, pristine pearl Sabudana, and premium pulses sourced and milled with care in Siliguri.
          </p>

        </header>

        {/* =================================================
            SEARCH
        ================================================ */}

        <div className="menu-search">

          <Search
            size={18}
          />

          <input
            type="text"
            value={searchTerm}
            onChange={
              handleSearch
            }
            placeholder="Search Besan, Sattu, Sabudana, Pulses..."
          />

          {searchTerm && (
            <button
              type="button"
              className="menu-search__clear"
              onClick={() =>
                setSearchTerm("")
              }
            >
              ×
            </button>
          )}

        </div>

        {/* =================================================
            ERROR
        ================================================ */}

        {error && (
          <div className="menu-showcase__error">

            <RefreshCw
              size={24}
            />

            <div>
              <h3>
                Unable to load products
              </h3>

              <p>
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={
                fetchMenu
              }
            >
              Try Again
            </button>

          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================ */}

        {!error &&
          filteredItems.length ===
            0 && (
            <div className="menu-showcase__empty">

              <Search
                size={36}
              />

              <h3>
                No products found
              </h3>

              <p>
                There are no staples matching your selection or search query right now.
              </p>

              {(searchTerm ||
                activeCategory !==
                  "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm(
                      ""
                    );

                    setActiveCategory(
                      "all"
                    );

                    setCurrentPage(
                      0
                    );
                  }}
                >
                  Show All Products
                </button>
              )}

            </div>
          )}

        {/* =================================================
            DESKTOP GRID
        ================================================ */}

        {!error &&
          paginatedItems.length >
            0 && (
            <div
              className="menu-showcase__grid desktop-view"
              key={`${activeCategory}-${currentPage}-${searchTerm}`}
            >

              {paginatedItems.map(
                (
                  item,
                  index
                ) => (
                  <div
                    className="menu-showcase__cell"
                    style={{
                      animationDelay: `${
                        index *
                        45
                      }ms`,
                    }}
                    key={
                      item._id
                    }
                  >

                    <MenuCard
                      item={item}
                      onAdd={
                        handleAdd
                      }
                      adding={
                        addingProductId ===
                        item._id
                      }
                    />

                  </div>
                )
              )}

            </div>
          )}

        {/* =================================================
            PAGINATION
        ================================================ */}

        {!error &&
          totalPages > 1 && (
            <div className="menu-pagination">

              <button
                type="button"
                disabled={
                  currentPage ===
                  0
                }
                onClick={() =>
                  handlePageChange(
                    currentPage -
                      1
                  )
                }
                aria-label="Previous page"
              >
                <ChevronLeft
                  size={18}
                />

                <span>
                  Previous
                </span>
              </button>

              <div className="menu-pagination__pages">

                {Array.from(
                  {
                    length:
                      totalPages,
                  },
                  (
                    _,
                    index
                  ) =>
                    index
                ).map(
                  (page) => (
                    <button
                      type="button"
                      key={page}
                      className={
                        currentPage ===
                        page
                          ? "is-active"
                          : ""
                      }
                      onClick={() =>
                        handlePageChange(
                          page
                        )
                      }
                    >
                      {page + 1}
                    </button>
                  )
                )}

              </div>

              <button
                type="button"
                disabled={
                  currentPage >=
                  totalPages - 1
                }
                onClick={() =>
                  handlePageChange(
                    currentPage +
                      1
                  )
                }
                aria-label="Next page"
              >
                <span>
                  Next
                </span>

                <ChevronRight
                  size={18}
                />
              </button>

            </div>
          )}

        {/* =================================================
            COUNT
        ================================================ */}

        {!error &&
          filteredItems.length >
            0 && (
            <div className="menu-count">

              Showing{" "}

              <strong>
                {Math.min(
                  paginatedItems.length,
                  itemsPerPage
                )}
              </strong>

              {" "}of{" "}

              <strong>
                {
                  filteredItems.length
                }
              </strong>

              {" "}products

              {activeCategory !==
                "all" && (
                <>
                  {" "}in{" "}

                  <strong>
                    {
                      categories.find(
                        (
                          item
                        ) =>
                          item.key ===
                          activeCategory
                      )?.label
                    }
                  </strong>
                </>
              )}

            </div>
          )}

      </section>

      {/* =================================================
          TOAST
      ================================================ */}

      {toast && (
        <div
          className="menu-toast"
          role="status"
        >
          <span className="menu-toast__check">
            ✓
          </span>

          <span>
            {toast}
          </span>
        </div>
      )}

    </div>
  );
};

export default Menu;