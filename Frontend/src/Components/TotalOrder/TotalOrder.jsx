import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  LoaderCircle,
  ShoppingCart,
} from "lucide-react";

import API, { IMG_URL } from "../../api/axios";

import "./TotalOrder.css";

// ============================================================
// CONSTANTS
// ============================================================

const AUTO_PLAY_TIME = 4500;

const ORDER_REFRESH_TIME = 30000;

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85";


// ============================================================
// CART ID
// ============================================================

const getCartId = () => {
  let cartId = localStorage.getItem(
    "healthy_heaven_cart_id"
  );

  if (!cartId) {
    cartId =
      `cart_${Date.now()}_` +
      Math.random()
        .toString(36)
        .substring(2, 10);

    localStorage.setItem(
      "healthy_heaven_cart_id",
      cartId
    );
  }

  return cartId;
};


// ============================================================
// IMAGE URL
// ============================================================

const getImageUrl = (image) => {
  if (!image) {
    return FALLBACK_IMAGE;
  }

  if (
    typeof image === "string" &&
    (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("blob:")
    )
  ) {
    return image;
  }

  const cleanImage = String(image)
    .replace(/^\/+/, "");

  if (
    cleanImage.startsWith("uploads/")
  ) {
    return `${IMG_URL}/${cleanImage}`;
  }

  return `${IMG_URL}/uploads/menu/${cleanImage}`;
};


// ============================================================
// PRODUCT ID
// ============================================================

const getProductId = (item) => {
  if (!item) {
    return null;
  }

  if (
    typeof item === "string"
  ) {
    return item;
  }

  return (
    item._id ||
    item.id ||
    item.productId ||
    item.menuItemId ||
    item.product_id ||
    item.menu_id ||
    null
  );
};


// ============================================================
// PRODUCT NAME
// ============================================================

const getItemName = (item) => {
  if (!item) {
    return "";
  }

  return (
    item.name ||
    item.productName ||
    item.menuItemName ||
    item.title ||
    item.product?.name ||
    item.menuItem?.name ||
    ""
  );
};


// ============================================================
// PRODUCT PRICE
// ============================================================

const getItemPrice = (item) => {
  if (!item) {
    return 0;
  }

  const price =
    item.price ??
    item.productPrice ??
    item.menuItemPrice ??
    item.product?.price ??
    item.menuItem?.price ??
    0;

  const parsed =
    Number(price);

  return Number.isFinite(parsed)
    ? parsed
    : 0;
};


// ============================================================
// PRODUCT IMAGE
// ============================================================

const getItemImage = (item) => {
  if (!item) {
    return "";
  }

  return (
    item.image ||
    item.imageUrl ||
    item.photo ||
    item.thumbnail ||
    item.productImage ||
    item.menuItemImage ||
    item.product?.image ||
    item.product?.imageUrl ||
    item.menuItem?.image ||
    item.menuItem?.imageUrl ||
    ""
  );
};


// ============================================================
// PRODUCT CATEGORY
// ============================================================

const getItemCategory = (item) => {
  if (!item) {
    return "";
  }

  return (
    item.category ||
    item.categoryName ||
    item.productCategory ||
    item.menuItemCategory ||
    item.product?.category ||
    item.menuItem?.category ||
    ""
  );
};


// ============================================================
// PRODUCT DESCRIPTION
// ============================================================

const getItemDescription = (item) => {
  if (!item) {
    return "";
  }

  return (
    item.description ||
    item.productDescription ||
    item.menuItemDescription ||
    item.product?.description ||
    item.menuItem?.description ||
    ""
  );
};


// ============================================================
// QUANTITY
// ============================================================

const getItemQuantity = (item) => {
  if (!item) {
    return 1;
  }

  const quantity =
    item.quantity ??
    item.qty ??
    item.count ??
    1;

  const parsed =
    Number(quantity);

  if (
    !Number.isFinite(parsed) ||
    parsed <= 0
  ) {
    return 1;
  }

  return parsed;
};


// ============================================================
// NORMALIZE ORDERS RESPONSE
// ============================================================

const normalizeOrdersResponse = (
  responseData
) => {
  if (!responseData) {
    return [];
  }

  if (
    Array.isArray(responseData)
  ) {
    return responseData;
  }

  if (
    Array.isArray(
      responseData.data
    )
  ) {
    return responseData.data;
  }

  if (
    Array.isArray(
      responseData.orders
    )
  ) {
    return responseData.orders;
  }

  if (
    responseData.data &&
    Array.isArray(
      responseData.data.orders
    )
  ) {
    return responseData.data.orders;
  }

  if (
    Array.isArray(
      responseData.result
    )
  ) {
    return responseData.result;
  }

  if (
    responseData.result &&
    Array.isArray(
      responseData.result.orders
    )
  ) {
    return responseData.result.orders;
  }

  return [];
};


// ============================================================
// GET ORDER ITEMS
// ============================================================

const getOrderItems = (order) => {
  if (!order) {
    return [];
  }

  const arrays = [
    order.items,
    order.orderItems,
    order.products,
    order.cartItems,
    order.menuItems,
    order.orderDetails,
    order.details,
  ];

  for (
    const value of arrays
  ) {
    if (
      Array.isArray(value)
    ) {
      return value;
    }
  }

  // Single product/order item
  if (
    order.product ||
    order.menuItem ||
    order.productId ||
    order.menuItemId
  ) {
    return [order];
  }

  return [];
};


// ============================================================
// EXTRACT PRODUCT ID FROM ORDER ITEM
// ============================================================

const getOrderProductId = (
  orderItem
) => {
  if (!orderItem) {
    return null;
  }

  // Direct productId
  if (
    orderItem.productId
  ) {
    return getProductId(
      orderItem.productId
    );
  }

  // Direct menuItemId
  if (
    orderItem.menuItemId
  ) {
    return getProductId(
      orderItem.menuItemId
    );
  }

  // Nested product
  if (
    orderItem.product
  ) {
    return getProductId(
      orderItem.product
    );
  }

  // Nested menu item
  if (
    orderItem.menuItem
  ) {
    return getProductId(
      orderItem.menuItem
    );
  }

  // item object
  if (
    orderItem.item
  ) {
    return getProductId(
      orderItem.item
    );
  }

  // Finally direct _id
  return getProductId(
    orderItem
  );
};


// ============================================================
// AGGREGATE MOST SOLD PRODUCTS
// ============================================================

const aggregateMostSoldProducts = (
  orders
) => {
  if (
    !Array.isArray(orders)
  ) {
    return [];
  }

  const productMap =
    new Map();

  orders.forEach(
    (order) => {
      const items =
        getOrderItems(order);

      items.forEach(
        (orderItem) => {
          if (!orderItem) {
            return;
          }

          const productId =
            getOrderProductId(
              orderItem
            );

          if (!productId) {
            return;
          }

          const quantity =
            getItemQuantity(
              orderItem
            );

          const key =
            String(productId);

          const existing =
            productMap.get(key);

          if (existing) {
            existing.soldQuantity +=
              quantity;

            existing.orderCount +=
              1;

            return;
          }

          productMap.set(
            key,
            {
              productId:
                productId,

              soldQuantity:
                quantity,

              orderCount:
                1,
            }
          );
        }
      );
    }
  );

  return Array.from(
    productMap.values()
  )
    .sort(
      (a, b) =>
        b.soldQuantity -
        a.soldQuantity
    )
    .slice(0, 4);
};


// ============================================================
// MERGE SOLD PRODUCTS WITH MENU PRODUCTS
// ============================================================

const mergeProducts = (
  soldProducts,
  menuItems
) => {
  const menuMap =
    new Map();

  menuItems.forEach(
    (item) => {
      const id =
        getProductId(item);

      if (!id) {
        return;
      }

      menuMap.set(
        String(id),
        item
      );
    }
  );

  return soldProducts
    .map(
      (soldProduct) => {
        const id =
          String(
            soldProduct.productId
          );

        const menuProduct =
          menuMap.get(id);

        if (!menuProduct) {
          return null;
        }

        return {
          ...menuProduct,

          _id:
            getProductId(
              menuProduct
            ),

          soldQuantity:
            soldProduct.soldQuantity,

          orderCount:
            soldProduct.orderCount,

          name:
            getItemName(
              menuProduct
            ),

          price:
            getItemPrice(
              menuProduct
            ),

          image:
            getItemImage(
              menuProduct
            ),

          category:
            getItemCategory(
              menuProduct
            ),

          description:
            getItemDescription(
              menuProduct
            ),
        };
      }
    )
    .filter(Boolean);
};


// ============================================================
// COMPONENT
// ============================================================

const TotalOrder = () => {
  const navigate =
    useNavigate();

  // ==========================================================
  // STATE
  // ==========================================================

  const [
    products,
    setProducts,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [
    isPaused,
    setIsPaused,
  ] = useState(false);

  const [
    addingCartId,
    setAddingCartId,
  ] = useState(null);


  // ==========================================================
  // REFS
  // ==========================================================

  const touchStartX =
    useRef(null);

  const touchEndX =
    useRef(null);

  const mountedRef =
    useRef(true);


  // ==========================================================
  // FETCH EVERYTHING
  // ==========================================================

  const fetchMostSoldProducts =
    useCallback(
      async () => {
        try {
          setError("");

          // ==================================================
          // FETCH ORDERS + MENU
          // ==================================================

          const [
            ordersResponse,
            menuResponse,
          ] = await Promise.all([
            API.get("/orders"),

            API.get("/menu", {
              params: {
                page: 1,
                limit: 1000,
              },
            }),
          ]);


          // ==================================================
          // DEBUG ORDERS
          // ==================================================

          console.log(
            "================================"
          );

          console.log(
            "TOTAL ORDER - ORDERS RESPONSE:",
            ordersResponse.data
          );

          console.log(
            "================================"
          );


          // ==================================================
          // DEBUG MENU
          // ==================================================

          console.log(
            "TOTAL ORDER - MENU RESPONSE:",
            menuResponse.data
          );


          // ==================================================
          // NORMALIZE ORDERS
          // ==================================================

          const orders =
            normalizeOrdersResponse(
              ordersResponse.data
            );


          // ==================================================
          // NORMALIZE MENU
          // ==================================================

          let menuItems = [];

          if (
            Array.isArray(
              menuResponse.data
            )
          ) {
            menuItems =
              menuResponse.data;
          } else if (
            Array.isArray(
              menuResponse.data?.data
            )
          ) {
            menuItems =
              menuResponse.data.data;
          } else if (
            Array.isArray(
              menuResponse.data?.menu
            )
          ) {
            menuItems =
              menuResponse.data.menu;
          } else if (
            Array.isArray(
              menuResponse.data?.items
            )
          ) {
            menuItems =
              menuResponse.data.items;
          }


          console.log(
            "TOTAL ORDER - TOTAL ORDERS:",
            orders.length
          );

          console.log(
            "TOTAL ORDER - TOTAL MENU ITEMS:",
            menuItems.length
          );


          // ==================================================
          // CALCULATE MOST SOLD
          // ==================================================

          const soldProducts =
            aggregateMostSoldProducts(
              orders
            );


          console.log(
            "TOTAL ORDER - SOLD PRODUCT IDS:",
            soldProducts
          );


          // ==================================================
          // MERGE WITH ACTUAL MENU
          // ==================================================

          const mostSoldProducts =
            mergeProducts(
              soldProducts,
              menuItems
            );


          console.log(
            "================================"
          );

          console.log(
            "TOTAL ORDER - MOST SOLD PRODUCTS:",
            mostSoldProducts
          );

          console.log(
            "================================"
          );


          // ==================================================
          // SET PRODUCTS
          // ==================================================

          if (
            mountedRef.current
          ) {
            setProducts(
              mostSoldProducts
            );

            setCurrentIndex(
              (previous) => {
                if (
                  mostSoldProducts.length ===
                  0
                ) {
                  return 0;
                }

                return Math.min(
                  previous,
                  mostSoldProducts.length -
                    1
                );
              }
            );
          }

        } catch (err) {
          console.error(
            "================================"
          );

          console.error(
            "TOTAL ORDER - FETCH ERROR"
          );

          console.error(
            "================================"
          );

          console.error(
            err
          );

          console.error(
            "STATUS:",
            err?.response?.status
          );

          console.error(
            "BACKEND RESPONSE:",
            err?.response?.data
          );

          if (
            mountedRef.current
          ) {
            setError(
              err?.response?.data
                ?.message ||
              "Unable to fetch products."
            );
          }
        } finally {
          if (
            mountedRef.current
          ) {
            setLoading(false);
          }
        }
      },
      []
    );


  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    mountedRef.current =
      true;

    fetchMostSoldProducts();

    return () => {
      mountedRef.current =
        false;
    };
  }, [
    fetchMostSoldProducts,
  ]);


  // ==========================================================
  // AUTO REFRESH
  // ==========================================================

  useEffect(() => {
    const interval =
      setInterval(
        () => {
          fetchMostSoldProducts();
        },
        ORDER_REFRESH_TIME
      );

    return () => {
      clearInterval(
        interval
      );
    };
  }, [
    fetchMostSoldProducts,
  ]);


  // ==========================================================
  // AUTO PLAY
  // ==========================================================

  useEffect(() => {
    if (
      isPaused ||
      products.length <= 1
    ) {
      return;
    }

    const interval =
      setInterval(
        () => {
          setCurrentIndex(
            (previous) =>
              (previous + 1) %
              products.length
          );
        },
        AUTO_PLAY_TIME
      );

    return () => {
      clearInterval(
        interval
      );
    };
  }, [
    isPaused,
    products.length,
  ]);


  // ==========================================================
  // PREVIOUS
  // ==========================================================

  const handlePrevious =
    () => {
      if (
        !products.length
      ) {
        return;
      }

      setCurrentIndex(
        (previous) =>
          previous === 0
            ? products.length -
              1
            : previous - 1
      );
    };


  // ==========================================================
  // NEXT
  // ==========================================================

  const handleNext =
    () => {
      if (
        !products.length
      ) {
        return;
      }

      setCurrentIndex(
        (previous) =>
          (previous + 1) %
          products.length
      );
    };


  // ==========================================================
  // DOT
  // ==========================================================

  const handleDotClick =
    (index) => {
      setCurrentIndex(
        index
      );
    };


  // ==========================================================
  // TOUCH
  // ==========================================================

  const handleTouchStart =
    (event) => {
      touchStartX.current =
        event.touches[0]
          .clientX;

      touchEndX.current =
        null;

      setIsPaused(true);
    };


  const handleTouchMove =
    (event) => {
      touchEndX.current =
        event.touches[0]
          .clientX;
    };


  const handleTouchEnd =
    () => {
      if (
        touchStartX.current ===
          null ||
        touchEndX.current ===
          null
      ) {
        setIsPaused(false);
        return;
      }

      const distance =
        touchStartX.current -
        touchEndX.current;

      if (
        Math.abs(distance) >=
        50
      ) {
        if (
          distance > 0
        ) {
          handleNext();
        } else {
          handlePrevious();
        }
      }

      touchStartX.current =
        null;

      touchEndX.current =
        null;

      setIsPaused(false);
    };


  // ==========================================================
  // ADD TO CART
  // ==========================================================

  const handleAddToCart =
    async (product) => {
      try {
        if (!product) {
          alert(
            "Product information is missing."
          );

          return;
        }

        // ====================================================
        // IMPORTANT:
        // This MUST be the actual menu MongoDB _id
        // ====================================================

        const productId =
          product._id ||
          product.productId;

        if (!productId) {
          console.error(
            "PRODUCT ID MISSING:",
            product
          );

          alert(
            "Product ID is missing."
          );

          return;
        }

        setAddingCartId(
          String(productId)
        );


        // ====================================================
        // CART ID
        // ====================================================

        const cartId =
          getCartId();


        // ====================================================
        // PRODUCT DATA
        // ====================================================

        const productName =
          getItemName(
            product
          );

        const productPrice =
          getItemPrice(
            product
          );

        const productImage =
          getItemImage(
            product
          );

        const productCategory =
          getItemCategory(
            product
          );

        const productDescription =
          getItemDescription(
            product
          );


        // ====================================================
        // IMPORTANT CART PAYLOAD
        //
        // Your backend error says:
        //
        // "productId is required"
        //
        // Therefore use productId.
        // ====================================================

        const cartPayload = {
          cartId:

            cartId,

          productId:

            productId,

          productName:

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

          quantity:

            1,
        };


        // ====================================================
        // DEBUG
        // ====================================================

        console.log(
          "================================="
        );

        console.log(
          "TOTAL ORDER - ADD TO CART"
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
          productId
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

        console.log(
          "================================="
        );


        // ====================================================
        // POST CART
        // ====================================================

        const response =
          await API.post(
            "/cart",
            cartPayload
          );


        // ====================================================
        // SUCCESS
        // ====================================================

        console.log(
          "================================="
        );

        console.log(
          "TOTAL ORDER - CART SUCCESS"
        );

        console.log(
          "================================="
        );

        console.log(
          "CART RESPONSE:",
          response.data
        );


        // ====================================================
        // NAVIGATE
        // ====================================================

        navigate(
          "/cart"
        );

      } catch (err) {
        console.error(
          "================================="
        );

        console.error(
          "TOTAL ORDER - ADD TO CART ERROR"
        );

        console.error(
          "================================="
        );

        console.error(
          "ERROR:",
          err
        );

        console.error(
          "STATUS:",
          err?.response?.status
        );

        console.error(
          "BACKEND RESPONSE:",
          err?.response?.data
        );

        console.error(
          "BACKEND MESSAGE:",
          err?.response?.data
            ?.message
        );

        console.error(
          "BACKEND ERROR:",
          err?.response?.data
            ?.error
        );

        const message =
          err?.response?.data
            ?.message ||
          err?.response?.data
            ?.error ||
          "Failed to add product to cart.";

        alert(message);

      } finally {
        setAddingCartId(
          null
        );
      }
    };


  // ==========================================================
  // DISPLAY PRODUCTS
  // ==========================================================

  const displayProducts =
    useMemo(
      () => products,
      [products]
    );


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <section
        className="total-order"
        aria-label="Popular products"
      >
        <div className="total-order__ambient">
          <span className="total-order__ambient-bloom total-order__ambient-bloom--one" />

          <span className="total-order__ambient-bloom total-order__ambient-bloom--two" />

          <span className="total-order__ambient-bloom total-order__ambient-bloom--three" />
        </div>

        <div className="total-order__inner">

          <div className="total-order__intro">

            <div className="total-order__eyebrow">
              <span className="total-order__eyebrow-dot" />

              Gourmet Kitchen Pass
            </div>

            <h2 className="total-order__heading">
              On The Pass{" "}
              <em>
                Right Now
              </em>
            </h2>

            <p className="total-order__sub">
              Wholesome ingredients,
              masterful culinary
              craft — plated fresh
              for your table.
            </p>

          </div>

          <div className="total-order__state">

            <LoaderCircle
              size={36}
              className="total-order__state-spinner"
            />

            <span>
              Finding today's
              favourites...
            </span>

          </div>

        </div>
      </section>
    );
  }


  // ==========================================================
  // ERROR
  // ==========================================================

  if (
    error &&
    displayProducts.length ===
      0
  ) {
    return (
      <section
        className="total-order"
        aria-label="Popular products"
      >

        <div className="total-order__ambient">
          <span className="total-order__ambient-bloom total-order__ambient-bloom--one" />
          <span className="total-order__ambient-bloom total-order__ambient-bloom--two" />
          <span className="total-order__ambient-bloom total-order__ambient-bloom--three" />
        </div>

        <div className="total-order__inner">

          <div className="total-order__intro">

            <div className="total-order__eyebrow">
              <span className="total-order__eyebrow-dot" />

              Gourmet Kitchen Pass
            </div>

            <h2 className="total-order__heading">
              On The Pass{" "}
              <em>
                Right Now
              </em>
            </h2>

            <p className="total-order__sub">
              Wholesome ingredients,
              masterful culinary
              craft — plated fresh
              for your table.
            </p>

          </div>

          <div className="total-order__state total-order__state--error">

            <div className="total-order__state-icon">
              !
            </div>

            <h3>
              Products unavailable
            </h3>

            <p>
              {error}
            </p>

            <button
              type="button"
              className="total-order__retry"
              onClick={() => {
                setLoading(true);

                fetchMostSoldProducts();
              }}
            >
              Try Again
            </button>

          </div>

        </div>
      </section>
    );
  }


  // ==========================================================
  // EMPTY
  // ==========================================================

  if (
    displayProducts.length ===
    0
  ) {
    return (
      <section
        className="total-order"
        aria-label="Popular products"
      >

        <div className="total-order__ambient">
          <span className="total-order__ambient-bloom total-order__ambient-bloom--one" />
          <span className="total-order__ambient-bloom total-order__ambient-bloom--two" />
          <span className="total-order__ambient-bloom total-order__ambient-bloom--three" />
        </div>

        <div className="total-order__inner">

          <div className="total-order__intro">

            <div className="total-order__eyebrow">
              <span className="total-order__eyebrow-dot" />

              Gourmet Kitchen Pass
            </div>

            <h2 className="total-order__heading">
              On The Pass{" "}
              <em>
                Right Now
              </em>
            </h2>

            <p className="total-order__sub">
              Wholesome ingredients,
              masterful culinary
              craft — plated fresh
              for your table.
            </p>

          </div>

          <div className="total-order__state">

            <div className="total-order__state-icon">
              🍽️
            </div>

            <h3>
              No popular products yet
            </h3>

            <p>
              Once customers start
              ordering, the most
              popular products will
              appear here.
            </p>

          </div>

        </div>
      </section>
    );
  }


  // ==========================================================
  // MAIN
  // ==========================================================

  return (
    <section
      className="total-order"
      aria-label="Most ordered products"
      onMouseEnter={() =>
        setIsPaused(true)
      }
      onMouseLeave={() =>
        setIsPaused(false)
      }
    >

      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div className="total-order__ambient">

        <span className="total-order__ambient-bloom total-order__ambient-bloom--one" />

        <span className="total-order__ambient-bloom total-order__ambient-bloom--two" />

        <span className="total-order__ambient-bloom total-order__ambient-bloom--three" />

      </div>


      {/* ======================================================
          INNER
      ====================================================== */}

      <div className="total-order__inner">

        {/* ====================================================
            HEADER
        ==================================================== */}

        <div className="total-order__intro">

          <div className="total-order__eyebrow">

            <span className="total-order__eyebrow-dot" />

            Gourmet Kitchen Pass

          </div>

          <h2 className="total-order__heading">

            On The Pass{" "}

            <em>
              Right Now
            </em>

          </h2>

          <p className="total-order__sub">

            Wholesome ingredients,
            masterful culinary
            craft — plated fresh
            for your table.

          </p>

        </div>


        {/* ====================================================
            CAROUSEL
        ==================================================== */}

        <div
          className="total-order__viewport"
          onTouchStart={
            handleTouchStart
          }
          onTouchMove={
            handleTouchMove
          }
          onTouchEnd={
            handleTouchEnd
          }
        >

          <div
            className="total-order__track"
            style={{
              transform:
                `translateX(-${
                  currentIndex * 100
                }%)`,
            }}
          >

            {displayProducts.map(
              (
                product,
                index
              ) => {

                const productId =
                  product._id;

                const productName =
                  getItemName(
                    product
                  );

                const productPrice =
                  getItemPrice(
                    product
                  );

                const productImage =
                  getImageUrl(
                    getItemImage(
                      product
                    )
                  );

                const productCategory =
                  getItemCategory(
                    product
                  );

                const productDescription =
                  getItemDescription(
                    product
                  );

                const soldQuantity =
                  Number(
                    product.soldQuantity
                  ) || 0;

                const orderCount =
                  Number(
                    product.orderCount
                  ) || 0;

                const isAdding =
                  addingCartId ===
                  String(
                    productId
                  );

                return (
                  <article
                    key={
                      String(
                        productId ||
                        index
                      )
                    }
                    className="total-order__slide"
                  >

                    <div className="total-order__card">

                      <div className="total-order__color-curtain" />

                      <div className="total-order__card-inner">

                        {/* IMAGE */}

                        <div className="total-order__image-wrap">

                          <img
                            className="total-order__image"
                            src={
                              productImage
                            }
                            alt={
                              productName ||
                              "Product"
                            }
                            loading={
                              index ===
                              0
                                ? "eager"
                                : "lazy"
                            }
                            onError={(
                              event
                            ) => {

                              if (
                                event
                                  .currentTarget
                                  .src !==
                                FALLBACK_IMAGE
                              ) {
                                event
                                  .currentTarget
                                  .src =
                                  FALLBACK_IMAGE;
                              }

                            }}
                          />

                          {index ===
                            0 && (
                            <span className="total-order__badge">
                              MOST ORDERED
                            </span>
                          )}

                          {soldQuantity >
                            0 && (
                            <span className="total-order__sold">
                              {soldQuantity} sold
                            </span>
                          )}

                        </div>


                        {/* CONTENT */}

                        <div className="total-order__content">

                          <div className="total-order__category">
                            {productCategory ||
                              "Healthy Heaven Special"}
                          </div>

                          <h3 className="total-order__title">
                            {productName ||
                              "Popular Product"}
                          </h3>

                          <p className="total-order__description">
                            {productDescription ||
                              "Freshly prepared with quality ingredients."}
                          </p>


                          {/* META */}

                          <div className="total-order__meta">

                            <div className="total-order__price">
                              ₹
                              {productPrice.toLocaleString(
                                "en-IN"
                              )}
                            </div>

                            {orderCount >
                              0 && (
                              <div className="total-order__orders">
                                Ordered by{" "}
                                {orderCount}{" "}
                                customer
                                {orderCount !==
                                1
                                  ? "s"
                                  : ""}
                              </div>
                            )}

                          </div>


                          {/* ADD TO CART */}

                          <button
                            type="button"
                            className="total-order__cart-btn"
                            disabled={
                              isAdding
                            }
                            onClick={() =>
                              handleAddToCart(
                                product
                              )
                            }
                            aria-label={
                              `Add ${
                                productName ||
                                "product"
                              } to cart`
                            }
                          >

                            {isAdding ? (
                              <>
                                <LoaderCircle
                                  size={
                                    18
                                  }
                                  className="total-order__cart-spinner"
                                />

                                Adding...
                              </>
                            ) : (
                              <>
                                <ShoppingCart
                                  size={
                                    18
                                  }
                                />

                                Add To Cart
                              </>
                            )}

                          </button>

                        </div>

                      </div>

                    </div>

                  </article>
                );
              }
            )}

          </div>

        </div>


        {/* ====================================================
            CONTROLS
        ==================================================== */}

        {displayProducts.length >
          1 && (
          <div className="total-order__controls">

            <button
              type="button"
              className="total-order__nav total-order__nav--prev"
              onClick={
                handlePrevious
              }
              aria-label="Previous product"
            >
              <ArrowLeft
                size={19}
              />
            </button>


            <div className="total-order__dots">

              {displayProducts.map(
                (
                  product,
                  index
                ) => (
                  <button
                    key={
                      String(
                        product._id ||
                        index
                      )
                    }
                    type="button"
                    className={
                      `total-order__dot ${
                        currentIndex ===
                        index
                          ? "total-order__dot--active"
                          : ""
                      }`
                    }
                    onClick={() =>
                      handleDotClick(
                        index
                      )
                    }
                    aria-label={
                      `Go to product ${
                        index + 1
                      }`
                    }
                  />
                )
              )}

            </div>


            <button
              type="button"
              className="total-order__nav total-order__nav--next"
              onClick={
                handleNext
              }
              aria-label="Next product"
            >
              <ArrowRight
                size={19}
              />
            </button>

          </div>
        )}


        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div className="total-order__footer">

          <div className="total-order__footer-status">

            <span className="total-order__live-dot" />

            <span>
              Live from customer orders
            </span>

          </div>

          <div className="total-order__footer-count">

            Showing{" "}
            {displayProducts.length}{" "}
            most ordered{" "}
            {displayProducts.length ===
            1
              ? "dish"
              : "dishes"}

          </div>

        </div>

      </div>

    </section>
  );
};


export default TotalOrder;