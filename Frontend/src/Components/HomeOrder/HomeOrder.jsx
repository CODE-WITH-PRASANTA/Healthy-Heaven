import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  LoaderCircle,
  ShoppingCart,
  Wheat,
} from "lucide-react";

import API, {
  IMG_URL,
} from "../../api/axios";

import "./HomeOrder.css";

// =====================================================
// CART ID
// =====================================================

const getCartId = () => {
  let cartId = localStorage.getItem(
    "healthy_heaven_cart_id"
  );

  if (!cartId) {
    cartId = `cart_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 10)}`;

    localStorage.setItem(
      "healthy_heaven_cart_id",
      cartId
    );
  }

  return cartId;
};

// =====================================================
// IMAGE URL
// =====================================================

const getImageUrl = (image) => {
  if (!image) {
    return "";
  }

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("blob:")
  ) {
    return image;
  }

  const cleanImage = image.replace(
    /^\/+/,
    ""
  );

  if (
    cleanImage.startsWith("uploads/")
  ) {
    return `${IMG_URL}/${cleanImage}`;
  }

  return `${IMG_URL}/uploads/menu/${cleanImage}`;
};

// =====================================================
// FALLBACK IMAGE
// =====================================================

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=1000&q=80";

// =====================================================
// CARD VARIANTS
// =====================================================

const CARD_VARIANTS = [
  "hero",
  "compact",
  "compact",
  "wide",
];

// =====================================================
// LEAF GLYPH
// =====================================================

function LeafGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 4C11 4 4 11 4 20c9 0 16-7 16-16z"
        fill="currentColor"
        opacity="0.9"
      />

      <path
        d="M20 4C13.5 8 9 13 5.2 18.8"
        stroke="rgba(11,22,18,0.4)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// =====================================================
// AMBIENT BACKDROP
// =====================================================

function AmbientBackdrop() {
  return (
    <div
      className="home-order__bg"
      aria-hidden="true"
    >
      <span
        className="
          home-order__bloom
          home-order__bloom--one
        "
      />

      <span
        className="
          home-order__bloom
          home-order__bloom--two
        "
      />

      <span
        className="
          home-order__bloom
          home-order__bloom--three
        "
      />

      <span
        className="
          home-order__leaf
          home-order__leaf--a
        "
      >
        <LeafGlyph />
      </span>

      <span
        className="
          home-order__leaf
          home-order__leaf--b
        "
      >
        <LeafGlyph />
      </span>

      <span
        className="
          home-order__leaf
          home-order__leaf--c
        "
      >
        <LeafGlyph />
      </span>

      <span
        className="
          home-order__leaf
          home-order__leaf--d
        "
      >
        <LeafGlyph />
      </span>

      <span
        className="
          home-order__leaf
          home-order__leaf--e
        "
      >
        <LeafGlyph />
      </span>
    </div>
  );
}

// =====================================================
// PROMO CARD
// =====================================================

function PromoCard({
  dish,
  index,
  onAddToCart,
  addingToCart,
}) {
  const frameRef =
    useRef(null);

  const cardRef =
    useRef(null);

  const [visible, setVisible] =
    useState(false);

  // ===================================================
  // INTERSECTION OBSERVER
  // ===================================================

  useEffect(() => {
    const node =
      cardRef.current;

    if (!node) {
      return undefined;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                setVisible(true);

                observer.unobserve(
                  entry.target
                );
              }
            }
          );
        },
        {
          threshold: 0.15,
        }
      );

    observer.observe(node);

    return () =>
      observer.disconnect();
  }, []);

  // ===================================================
  // POINTER MOVE
  // ===================================================

  const handlePointerMove =
    useCallback(
      (event) => {
        const frame =
          frameRef.current;

        if (!frame) {
          return;
        }

        const bounds =
          frame.getBoundingClientRect();

        const px =
          (event.clientX -
            bounds.left) /
          bounds.width;

        const py =
          (event.clientY -
            bounds.top) /
          bounds.height;

        const tiltX =
          (0.5 - py) * 9;

        const tiltY =
          (px - 0.5) * 11;

        frame.style.setProperty(
          "--tilt-x",
          `${tiltX.toFixed(2)}deg`
        );

        frame.style.setProperty(
          "--tilt-y",
          `${tiltY.toFixed(2)}deg`
        );

        frame.style.setProperty(
          "--glow-x",
          `${(
            px * 100
          ).toFixed(1)}%`
        );

        frame.style.setProperty(
          "--glow-y",
          `${(
            py * 100
          ).toFixed(1)}%`
        );
      },
      []
    );

  // ===================================================
  // POINTER LEAVE
  // ===================================================

  const handlePointerLeave =
    useCallback(() => {
      const frame =
        frameRef.current;

      if (!frame) {
        return;
      }

      frame.style.setProperty(
        "--tilt-x",
        "0deg"
      );

      frame.style.setProperty(
        "--tilt-y",
        "0deg"
      );
    }, []);

  // ===================================================
  // IMAGE
  // ===================================================

  const imageUrl =
    getImageUrl(
      dish.image
    ) ||
    FALLBACK_IMAGE;

  // ===================================================
  // ADD TO CART
  // ===================================================

  const handleAddToCart =
    async (event) => {
      event.stopPropagation();

      if (
        addingToCart ===
        dish._id
      ) {
        return;
      }

      await onAddToCart(dish);
    };

  // ===================================================
  // PRICE
  // ===================================================

  const formattedPrice =
    Number(
      dish.price || 0
    ).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }
    );

  // ===================================================
  // JSX
  // ===================================================

  return (
    <article
      ref={cardRef}
      className={[
        "promo-card",
        `promo-card--${dish.variant}`,
        visible
          ? "promo-card--visible"
          : "",
      ]
        .join(" ")
        .trim()}
      style={{
        "--reveal-index":
          index,
      }}
    >
      <div
        ref={frameRef}
        className="promo-card__frame"
        onMouseMove={
          handlePointerMove
        }
        onMouseLeave={
          handlePointerLeave
        }
      >
        {/* =========================================
            IMAGE
        ========================================= */}

        <div className="promo-card__media">
          <img
            className="promo-card__image"
            src={imageUrl}
            alt={
              dish.name ||
              "Foodigo Pure Product"
            }
            loading="lazy"
            onError={(event) => {
              if (
                event.currentTarget
                  .src !==
                FALLBACK_IMAGE
              ) {
                event.currentTarget.src =
                  FALLBACK_IMAGE;
              }
            }}
          />

          <span
            className="promo-card__scrim"
            aria-hidden="true"
          />

          {dish.variant ===
            "wide" && (
            <span
              className="promo-card__steam"
              aria-hidden="true"
            >
              <i />
              <i />
              <i />
            </span>
          )}
        </div>

        {/* =========================================
            CATEGORY
        ========================================= */}

        {dish.category && (
          <div className="promo-card__category">
            <Wheat
              size={13}
            />

            <span>
              {dish.category}
            </span>
          </div>
        )}

        {/* =========================================
            CONTENT
        ========================================= */}

        <div className="promo-card__content">
          <div className="promo-card__text-group">
            <span className="promo-card__kicker">
              {dish.category ||
                "100% Pure Agro Staple"}
            </span>

            <h3 className="promo-card__title">
              {dish.name}
            </h3>

            <p className="promo-card__note">
              {dish.description ||
                "Traditional stone-ground, hygienically packed essential for authentic wholesome taste."}
            </p>
          </div>

          {/* =======================================
              FOOTER
          ======================================= */}

          <div className="promo-card__footer">
            <div className="promo-card__price">
              <span className="promo-card__price-current">
                ₹{formattedPrice}
              </span>
            </div>

            <button
              type="button"
              className="promo-card__cta"
              onClick={
                handleAddToCart
              }
              disabled={
                addingToCart ===
                dish._id
              }
              aria-label={`Add ${dish.name} to cart`}
            >
              {addingToCart ===
              dish._id ? (
                <>
                  <LoaderCircle
                    size={18}
                    className="promo-card__loading"
                  />

                  <span>
                    Adding...
                  </span>
                </>
              ) : (
                <>
                  <span>
                    Add to cart
                  </span>

                  <ShoppingCart
                    size={18}
                    className="promo-card__cta-icon"
                  />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

// =====================================================
// HOME ORDER
// =====================================================

const HomeOrder = () => {
  const navigate =
    useNavigate();

  // ===================================================
  // MENU STATES
  // ===================================================

  const [
    menuItems,
    setMenuItems,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  // ===================================================
  // CART STATES
  // ===================================================

  const [
    addingToCart,
    setAddingToCart,
  ] = useState(null);

  // ===================================================
  // FETCH LATEST MENU
  // ===================================================

  const fetchLatestMenu =
    useCallback(
      async () => {
        try {
          setLoading(true);

          setError("");

          const response =
            await API.get(
              "/menu",
              {
                params: {
                  page: 1,
                  limit: 4,
                },
              }
            );

          const result =
            response.data;

          const items =
            Array.isArray(
              result?.data
            )
              ? result.data
              : [];

          // ALWAYS KEEP ONLY FOUR
          const latestFour =
            items.slice(0, 4);

          setMenuItems(
            latestFour
          );
        } catch (err) {
          console.error(
            "HOME MENU FETCH ERROR:",
            err
          );

          setMenuItems([]);

          setError(
            err?.response?.data
              ?.message ||
              "Unable to load products."
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
    fetchLatestMenu();
  }, [
    fetchLatestMenu,
  ]);

  // ===================================================
  // ADD PRODUCT TO CART
  // ===================================================

  const handleAddToCart =
    useCallback(
      async (item) => {
        try {
          // =========================================
          // VALIDATE MENU ITEM
          // =========================================

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
            !item.name ||
            !String(
              item.name
            ).trim()
          ) {
            alert(
              "Product name is missing."
            );

            return;
          }

          // =========================================
          // START LOADING
          // =========================================

          setAddingToCart(
            item._id
          );

          // =========================================
          // CART ID
          // =========================================

          const cartId =
            getCartId();

          // =========================================
          // PREPARE PRODUCT
          // =========================================

          const productName =
            String(
              item.name
            ).trim();

          const productPrice =
            Number(
              item.price || 0
            );

          const productImage =
            item.image || "";

          const productCategory =
            item.category ||
            "Foodigo Pure Staple";

          const productDescription =
            item.description ||
            "";

          // =========================================
          // CART PAYLOAD
          // =========================================

          const cartPayload = {
            // CART
            cartId:

              cartId,

            // PRODUCT IDENTIFICATION
            productId:

              item._id,

            // PRODUCT NAME
            productName:

              productName,

            // ALSO SEND name
            // for cart display
            name:

              productName,

            // PRODUCT PRICE
            price:

              productPrice,

            // PRODUCT IMAGE
            image:

              productImage,

            // CATEGORY
            category:

              productCategory,

            // DESCRIPTION
            description:

              productDescription,

            // QUANTITY
            quantity:

              1,
          };

          // =========================================
          // DEBUG
          // =========================================

          console.log(
            "================================="
          );

          console.log(
            "ADDING PRODUCT TO CART"
          );

          console.log(
            "================================="
          );

          console.log(
            "CART ID:",
            cartId
          );

          console.log(
            "PRODUCT ID:",
            item._id
          );

          console.log(
            "PRODUCT NAME:",
            productName
          );

          console.log(
            "PRODUCT PRICE:",
            productPrice
          );

          console.log(
            "PRODUCT IMAGE:",
            productImage
          );

          console.log(
            "PRODUCT CATEGORY:",
            productCategory
          );

          console.log(
            "FULL CART PAYLOAD:",
            cartPayload
          );

          // =========================================
          // POST CART
          // =========================================

          const response =
            await API.post(
              "/cart",
              cartPayload
            );

          // =========================================
          // DEBUG RESPONSE
          // =========================================

          console.log(
            "================================="
          );

          console.log(
            "CART RESPONSE"
          );

          console.log(
            "================================="
          );

          console.log(
            response.data
          );

          // =========================================
          // CHECK RESPONSE
          // =========================================

          if (
            response.data?.success ===
            false
          ) {
            throw new Error(
              response.data?.message ||
                "Failed to add product to cart."
            );
          }

          // =========================================
          // GO TO CART
          // =========================================

          navigate("/cart");
        } catch (error) {
          console.error(
            "================================="
          );

          console.error(
            "ADD TO CART ERROR"
          );

          console.error(
            "================================="
          );

          console.error(
            error
          );

          console.error(
            "STATUS:",
            error?.response
              ?.status
          );

          console.error(
            "BACKEND RESPONSE:",
            error?.response
              ?.data
          );

          const backendMessage =
            error?.response?.data
              ?.message ||
            error?.response?.data
              ?.error ||
            error?.message ||
            "Failed to add product to cart.";

          alert(
            backendMessage
          );
        } finally {
          setAddingToCart(
            null
          );
        }
      },
      [navigate]
    );

  // ===================================================
  // EXACTLY 4 CARDS
  // ===================================================

  const dishes =
    menuItems
      .slice(0, 4)
      .map(
        (item, index) => ({
          ...item,

          variant:
            CARD_VARIANTS[
              index
            ],
        })
      );

  // ===================================================
  // LOADING STATE
  // ===================================================

  if (loading) {
    return (
      <section
        className="home-order"
        aria-labelledby="home-order-heading"
      >
        <AmbientBackdrop />

        <div className="home-order__inner">
          <header className="home-order__intro">
            <div className="home-order__badge">
              <span className="home-order__badge-dot" />

              Direct From Mill
            </div>

            <h2 className="home-order__heading">
              Fresh Daily Staples,{" "}
              <em>
                Purity Guaranteed
              </em>
            </h2>

            <p className="home-order__sub">
              Our signature stone-ground Besan, high-protein Sattu, and sorted Sabudana fresh from our Matigara facility.
            </p>
          </header>

          <div className="home-order__state">
            <LoaderCircle
              size={36}
              className="home-order__loader"
            />

            <p>
              Loading fresh stock...
            </p>
          </div>
        </div>
      </section>
    );
  }

  // ===================================================
  // MAIN JSX
  // ===================================================

  return (
    <section
      className="home-order"
      aria-labelledby="home-order-heading"
    >
      <AmbientBackdrop />

      <div className="home-order__inner">
        {/* ===========================================
            HEADER
        =========================================== */}

        <header className="home-order__intro">
          <div className="home-order__badge">
            <span className="home-order__badge-dot" />

            Direct From Mill
          </div>

          <h2
            id="home-order-heading"
            className="home-order__heading"
          >
            Fresh Daily Staples,{" "}
            <em>
              Purity Guaranteed
            </em>
          </h2>

          <p className="home-order__sub">
            Our signature stone-ground Besan, high-protein Sattu, and pristine Sabudana freshly milled and packed in Siliguri.
          </p>
        </header>

        {/* ===========================================
            ERROR
        =========================================== */}

        {error && (
          <div
            className="
              home-order__state
              home-order__state--error
            "
          >
            <div>
              <h3>
                Unable to load products
              </h3>

              <p>
                {error}
              </p>

              <button
                type="button"
                onClick={
                  fetchLatestMenu
                }
                className="home-order__retry"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* ===========================================
            EMPTY
        =========================================== */}

        {!error &&
          dishes.length === 0 && (
            <div className="home-order__state">
              <Wheat
                size={40}
              />

              <h3>
                No staples in stock
              </h3>

              <p>
                Add products from your admin panel and they will appear here.
              </p>
            </div>
          )}

        {/* ===========================================
            EXACTLY FOUR LATEST ITEMS
        =========================================== */}

        {!error &&
          dishes.length > 0 && (
            <div className="home-order__grid">
              {dishes.map(
                (
                  dish,
                  index
                ) => (
                  <PromoCard
                    key={
                      dish._id ||
                      `menu-${index}`
                    }
                    dish={dish}
                    index={index}
                    onAddToCart={
                      handleAddToCart
                    }
                    addingToCart={
                      addingToCart
                    }
                  />
                )
              )}
            </div>
          )}
      </div>
    </section>
  );
};

export default HomeOrder;