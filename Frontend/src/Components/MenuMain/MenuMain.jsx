
import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import API, { IMG_URL } from "../../api/axios";

import "./MenuMain.css";

// =====================================================
// CATEGORIES
// =====================================================

const categories = [
  "All",
  "Juices & Drinks",
  "Salads & Bowls",
  "Eggs & Breakfast",
  "Healthy Rolls",
];

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

  const cleanImage = image.replace(/^\/+/, "");

  if (cleanImage.startsWith("uploads/")) {
    return `${IMG_URL}/${cleanImage}`;
  }

  return `${IMG_URL}/uploads/menu/${cleanImage}`;
};

// =====================================================
// COMPONENT
// =====================================================

const MenuMain = () => {
  const navigate = useNavigate();

  // ===================================================
  // STATES
  // ===================================================

  const [foods, setFoods] = useState([]);

  const [activeCategory, setActiveCategory] =
    useState("All");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const itemsPerPage = 8;

  // ===================================================
  // FETCH MENU
  // ===================================================

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/menu", {
        params: {
          page: 1,
          limit: 1000,
        },
      });

      const result = response.data;

      if (
        result?.success &&
        Array.isArray(result?.data)
      ) {
        setFoods(result.data);
      } else {
        setFoods([]);
      }
    } catch (error) {
      console.error(
        "FETCH PUBLIC MENU ERROR:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Failed to load menu."
      );

      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  // ===================================================
  // INITIAL FETCH
  // ===================================================

  useEffect(() => {
    fetchMenu();
  }, []);

  // ===================================================
  // FILTER FOOD
  // ===================================================

  const filteredFoods = useMemo(() => {
    if (activeCategory === "All") {
      return foods;
    }

    return foods.filter(
      (food) =>
        food.category === activeCategory
    );
  }, [
    foods,
    activeCategory,
  ]);

  // ===================================================
  // TOTAL PAGES
  // ===================================================

  const totalPages = Math.max(
    Math.ceil(
      filteredFoods.length /
        itemsPerPage
    ),
    1
  );

  // ===================================================
  // PAGINATED FOOD
  // ===================================================

  const paginatedFoods = useMemo(() => {
    const start =
      (currentPage - 1) *
      itemsPerPage;

    return filteredFoods.slice(
      start,
      start + itemsPerPage
    );
  }, [
    filteredFoods,
    currentPage,
  ]);

  // ===================================================
  // CATEGORY CHANGE
  // ===================================================

  const handleCategory = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  // ===================================================
  // PAGE CHANGE
  // ===================================================

  const handlePageChange = (page) => {
    if (
      page < 1 ||
      page > totalPages
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
  // FOOD DETAILS
  // ===================================================

  const handleFoodClick = (food) => {
    navigate(`/food/${food._id}`);
  };

  // ===================================================
  // ADD TO CART
  // ===================================================

  const handleAddToCart = (food) => {
    try {
      const existingCart =
        JSON.parse(
          localStorage.getItem("cart")
        ) || [];

      const existingItem =
        existingCart.find(
          (item) =>
            item._id === food._id
        );

      let updatedCart;

      // -----------------------------------------------
      // ITEM ALREADY EXISTS
      // -----------------------------------------------

      if (existingItem) {
        updatedCart =
          existingCart.map(
            (item) =>
              item._id === food._id
                ? {
                    ...item,
                    quantity:
                      (item.quantity ||
                        1) + 1,
                  }
                : item
          );
      }

      // -----------------------------------------------
      // NEW ITEM
      // -----------------------------------------------

      else {
        updatedCart = [
          ...existingCart,
          {
            ...food,
            quantity: 1,
          },
        ];
      }

      // -----------------------------------------------
      // SAVE CART
      // -----------------------------------------------

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      // -----------------------------------------------
      // GO TO CART
      // -----------------------------------------------

      navigate("/cart");
    } catch (error) {
      console.error(
        "ADD TO CART ERROR:",
        error
      );
    }
  };

  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <section className="menu-main">
        <div className="menu-loading">
          <div className="menu-loader"></div>

          <p>
            Loading menu...
          </p>
        </div>
      </section>
    );
  }

  // ===================================================
  // MAIN JSX
  // ===================================================

  return (
    <section
      className="menu-main"
      id="menu"
    >
      {/* =================================================
          HEADER
      ================================================= */}

      <div className="menu-header">
        <span className="menu-small-title">
          OUR MENU
        </span>

        <h2>
          Fresh Food,{" "}
          <span>
            Healthy Choices
          </span>
        </h2>

        <p>
          Discover delicious,
          fresh and healthy meals
          prepared with quality
          ingredients.
        </p>
      </div>

      {/* =================================================
          CATEGORIES
      ================================================= */}

      <div className="menu-categories">
        {categories.map(
          (category) => (
            <button
              key={category}
              type="button"
              className={
                activeCategory ===
                category
                  ? "active"
                  : ""
              }
              onClick={() =>
                handleCategory(
                  category
                )
              }
            >
              {category}
            </button>
          )
        )}
      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="menu-error">
          <p>
            {error}
          </p>

          <button
            type="button"
            onClick={fetchMenu}
          >
            Try Again
          </button>
        </div>
      )}

      {/* =================================================
          EMPTY
      ================================================= */}

      {!error &&
        paginatedFoods.length ===
          0 && (
          <div className="menu-empty">
            <h3>
              No menu items found
            </h3>

            <p>
              There are currently
              no items in this
              category.
            </p>
          </div>
        )}

      {/* =================================================
          FOOD GRID
      ================================================= */}

      {!error &&
        paginatedFoods.length >
          0 && (
          <div className="menu-grid">
            {paginatedFoods.map(
              (food) => (
                <article
                  key={food._id}
                  className="food-card"
                  onClick={() =>
                    handleFoodClick(
                      food
                    )
                  }
                >
                  {/* =======================================
                      FOOD IMAGE
                  ======================================= */}

                  <div className="food-image">
                    <img
                      src={getImageUrl(
                        food.image
                      )}
                      alt={
                        food.name ||
                        "Food"
                      }
                      loading="lazy"
                    />

                    {food.category && (
                      <span className="food-category">
                        {
                          food.category
                        }
                      </span>
                    )}
                  </div>

                  {/* =======================================
                      FOOD CONTENT
                  ======================================= */}

                  <div className="food-content">
                    <h3>
                      {food.name}
                    </h3>

                    <p>
                      {
                        food.description
                      }
                    </p>

                    {/* =====================================
                        PRICE + CART
                    ===================================== */}

                    <div className="food-bottom">
                      <span className="food-price">
                        ₹
                        {Number(
                          food.price ||
                            0
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </span>

                      {/* =================================
                          ADD TO CART BUTTON
                      ================================= */}

                      <button
                        type="button"
                        className="food-cart-btn"
                        title="Add to Cart"
                        aria-label={`Add ${
                          food.name
                        } to cart`}
                        onClick={(e) => {
                          e.stopPropagation();

                          handleAddToCart(
                            food
                          );
                        }}
                      >
                        <ShoppingCart
                          size={19}
                          strokeWidth={2.5}
                        />
                      </button>
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        )}

      {/* =================================================
          PAGINATION
      ================================================= */}

      {!error &&
        filteredFoods.length >
          itemsPerPage && (
          <div className="menu-pagination">
            {/* PREVIOUS */}

            <button
              type="button"
              disabled={
                currentPage === 1
              }
              onClick={() =>
                handlePageChange(
                  currentPage - 1
                )
              }
            >
              Prev
            </button>

            {/* PAGE NUMBERS */}

            {Array.from(
              {
                length: totalPages,
              },
              (_, index) =>
                index + 1
            ).map(
              (page) => (
                <button
                  type="button"
                  key={page}
                  className={
                    currentPage ===
                    page
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    handlePageChange(
                      page
                    )
                  }
                >
                  {page}
                </button>
              )
            )}

            {/* NEXT */}

            <button
              type="button"
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                handlePageChange(
                  currentPage + 1
                )
              }
            >
              Next
            </button>
          </div>
        )}

      {/* =================================================
          ITEM COUNT
      ================================================= */}

      {!error &&
        filteredFoods.length >
          0 && (
          <div className="menu-count">
            Showing{" "}
            {
              paginatedFoods.length
            }{" "}
            of{" "}
            {
              filteredFoods.length
            }{" "}
            menu items
          </div>
        )}
    </section>
  );
};

export default MenuMain;


