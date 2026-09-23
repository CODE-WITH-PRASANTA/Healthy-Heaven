import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuDetailsMain.css";

const MenuDetailsMain = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  const itemsPerPage = 12;

  /* =========================================================
     CATEGORY ICONS
  ========================================================= */

  const categoryIcons = {
    All: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M4 7h24" />
        <path d="M7 7v16h18V7" />
        <path d="M10 11h12" />
        <path d="M10 15h12" />
        <path d="M10 19h5" />
        <path d="M4 23h24" />
      </svg>
    ),

    "Cold Drink": (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M7 5h18l-3 7H10L7 5Z" />
        <path d="M10 12l4 15" />
        <path d="M22 12l-4 15" />
        <path d="M14 27h4" />
        <path d="M21 3l4-2" />
      </svg>
    ),

    Pizza: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 5c9 1 17 7 22 17L5 27V5Z" />
        <circle cx="11" cy="11" r="1.5" />
        <circle cx="15" cy="17" r="1.5" />
        <circle cx="20" cy="20" r="1.5" />
      </svg>
    ),

    Salad: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 17c1 7 5 10 11 10s10-3 11-10H5Z" />
        <path d="M8 17c2-5 5-7 8-7s6 2 8 7" />
        <path d="M13 8c0-3 2-5 5-5" />
        <circle cx="11" cy="13" r="1" />
        <circle cx="17" cy="12" r="1" />
        <circle cx="21" cy="15" r="1" />
      </svg>
    ),

    Sweets: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M7 13h18l-2 15H9L7 13Z" />
        <path d="M7 13c0-4 4-6 9-6s9 2 9 6" />
        <path d="M11 8c0-3 2-5 5-5s5 2 5 5" />
        <path d="M11 17h10" />
        <path d="M12 21h8" />
      </svg>
    ),

    Spicy: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M25 8c-1 8-5 16-12 18-4 1-7-1-8-4-1-4 2-7 6-7 3 0 5-2 5-5" />
        <path d="M16 10c2-4 5-6 9-5" />
        <path d="M8 15c-2-2-2-5 0-7" />
      </svg>
    ),

    Burger: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 13c1-5 5-8 11-8s10 3 11 8H5Z" />
        <path d="M5 15h22v3H5z" />
        <path d="M7 20h18l-2 6H9l-2-6Z" />
        <path d="M9 22h14" />
      </svg>
    ),
  };

  /* =========================================================
     CATEGORIES
  ========================================================= */

  const categories = [
    "All",
    "Cold Drink",
    "Pizza",
    "Salad",
    "Sweets",
    "Spicy",
    "Burger",
  ];

  /* =========================================================
     FOOD DATA
  ========================================================= */

  const foods = [
    {
      id: 1,
      name: "Classic Burger",
      category: "Burger",
      description: "Delicious and Spicy",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 2,
      name: "Masala Rice",
      category: "Spicy",
      description: "Aromatic Indian style rice",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 3,
      name: "Veg Momos",
      category: "Spicy",
      description: "Steamed & delicious",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 4,
      name: "Creamy Pasta",
      category: "Spicy",
      description: "Creamy Italian delight",
      price: 220,
      image:
        "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 5,
      name: "Paneer Tikka",
      category: "Spicy",
      description: "Smoky & perfectly grilled",
      price: 240,
      image:
        "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 6,
      name: "Soya Rice",
      category: "Spicy",
      description: "Delicious and spicy",
      price: 190,
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 7,
      name: "Potato Stick",
      category: "Spicy",
      description: "Crispy & golden",
      price: 110,
      image:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 8,
      name: "Fresh Salad",
      category: "Salad",
      description: "Fresh & healthy",
      price: 95,
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 9,
      name: "Veg Soup",
      category: "Salad",
      description: "Warm & comforting",
      price: 130,
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 10,
      name: "Chilli Paneer",
      category: "Spicy",
      description: "Hot & flavorful",
      price: 210,
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 11,
      name: "Hakka Noodles",
      category: "Spicy",
      description: "Classic Chinese noodles",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 12,
      name: "Fish Fry",
      category: "Spicy",
      description: "Crispy coastal special",
      price: 280,
      image:
        "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 13,
      name: "Aloo Tikki",
      category: "Spicy",
      description: "Crispy potato delight",
      price: 90,
      image:
        "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 14,
      name: "Veg Pizza",
      category: "Pizza",
      description: "Loaded with fresh toppings",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 15,
      name: "Gulab Jamun",
      category: "Sweets",
      description: "Soft & syrupy",
      price: 100,
      image:
        "https://images.unsplash.com/photo-1666190094765-15f5a7f5e6c9?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 16,
      name: "Cold Coffee",
      category: "Cold Drink",
      description: "Creamy & refreshing",
      price: 140,
      image:
        "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 17,
      name: "Fresh Lime",
      category: "Cold Drink",
      description: "Refreshing lemon drink",
      price: 80,
      image:
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 18,
      name: "Margherita Pizza",
      category: "Pizza",
      description: "Classic cheesy goodness",
      price: 260,
      image:
        "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 19,
      name: "Butter Chicken",
      category: "Spicy",
      description: "Rich Indian classic",
      price: 320,
      image:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 20,
      name: "Garlic Naan",
      category: "Spicy",
      description: "Soft & buttery",
      price: 70,
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 21,
      name: "Rasmalai",
      category: "Sweets",
      description: "Creamy Indian dessert",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 22,
      name: "Mango Shake",
      category: "Cold Drink",
      description: "Fresh mango delight",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 23,
      name: "Farmhouse Pizza",
      category: "Pizza",
      description: "Loaded veggie pizza",
      price: 340,
      image:
        "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 24,
      name: "Chicken Burger",
      category: "Burger",
      description: "Juicy & crispy",
      price: 220,
      image:
        "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 25,
      name: "Greek Salad",
      category: "Salad",
      description: "Fresh & crunchy",
      price: 160,
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 26,
      name: "Masala Dosa",
      category: "Spicy",
      description: "Crispy South Indian dosa",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 27,
      name: "Paneer Roll",
      category: "Spicy",
      description: "Loaded paneer wrap",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 28,
      name: "Chocolate Cake",
      category: "Sweets",
      description: "Rich chocolate dessert",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 29,
      name: "Veg Sandwich",
      category: "Salad",
      description: "Fresh vegetable sandwich",
      price: 130,
      image:
        "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=90",
    },
    {
      id: 30,
      name: "French Fries",
      category: "Spicy",
      description: "Crispy golden fries",
      price: 110,
      image:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=90",
    },
  ];

  /* =========================================================
     FILTER FOOD
  ========================================================= */

  const filteredFoods = useMemo(() => {
    if (activeCategory === "All") {
      return foods;
    }

    return foods.filter(
      (food) => food.category === activeCategory
    );
  }, [activeCategory]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.ceil(
    filteredFoods.length / itemsPerPage
  );

  const currentFoods = filteredFoods.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* =========================================================
     CATEGORY CHANGE
  ========================================================= */

  const changeCategory = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  /* =========================================================
     PAGE CHANGE
  ========================================================= */

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     FOOD DETAILS NAVIGATION
     
     IMPORTANT:
     Replace only "YOUR-FOOD-DETAILS-PATH" later.
     
     Example:
     /menu-details/1
     /food-details/1
     /details/1
  ========================================================= */

  const openFoodDetails = (food) => {
    navigate(`/YOUR-FOOD-DETAILS-PATH/${food.id}`);
  };

  return (
    <section className="MenuDetailsMain">

      <div className="MenuDetailsMain__container">

        {/* =================================================
            CATEGORY BAR
        ================================================= */}

        <div className="MenuDetailsMain__topBar">

          <div className="MenuDetailsMain__categories">

            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`MenuDetailsMain__category ${
                  activeCategory === category
                    ? "MenuDetailsMain__category--active"
                    : ""
                }`}
                onClick={() => changeCategory(category)}
              >

                <span className="MenuDetailsMain__categoryIcon">
                  {categoryIcons[category]}
                </span>

                <span className="MenuDetailsMain__categoryName">
                  {category.toUpperCase()}
                </span>

              </button>
            ))}

          </div>

          {/* FILTER */}

          <div className="MenuDetailsMain__filterWrapper">

            <button
              type="button"
              className={`MenuDetailsMain__filterButton ${
                filterOpen
                  ? "MenuDetailsMain__filterButton--active"
                  : ""
              }`}
              onClick={() => setFilterOpen(!filterOpen)}
            >

              <span>Filter</span>

              <svg
                className="MenuDetailsMain__filterIcon"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4 5H20L14 12V18L10 20V12L4 5Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

            </button>

            {filterOpen && (
              <div className="MenuDetailsMain__filterDropdown">

                <div className="MenuDetailsMain__filterTitle">
                  FILTER MENU
                </div>

                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className="MenuDetailsMain__filterOption"
                    onClick={() => {
                      changeCategory(category);
                      setFilterOpen(false);
                    }}
                  >

                    <span>
                      {category}
                    </span>

                    <span className="MenuDetailsMain__filterOptionIcon">
                      {categoryIcons[category]}
                    </span>

                  </button>
                ))}

              </div>
            )}

          </div>

        </div>

        {/* =================================================
            FOOD GRID
        ================================================= */}

        <div className="MenuDetailsMain__grid">

          {currentFoods.map((food) => (
            <article
              key={food.id}
              className="MenuDetailsMain__card"
            >

              {/* HOVER BLACK GRADIENT */}

              <span className="MenuDetailsMain__hoverLayer" />

              {/* CARD TOP */}

              <div className="MenuDetailsMain__cardTop">

                <div className="MenuDetailsMain__imageWrapper">

                  <img
                    src={food.image}
                    alt={food.name}
                    className="MenuDetailsMain__foodImage"
                    loading="lazy"
                  />

                </div>

                <div className="MenuDetailsMain__foodInfo">

                  <h3 className="MenuDetailsMain__foodName">
                    {food.name}
                  </h3>

                  <p className="MenuDetailsMain__foodDescription">
                    {food.description}
                  </p>

                </div>

              </div>

              {/* CARD BOTTOM */}

              <div className="MenuDetailsMain__cardBottom">

                <div className="MenuDetailsMain__priceBox">

                  <span className="MenuDetailsMain__priceLabel">
                    Regular Price
                  </span>

                  <strong className="MenuDetailsMain__price">
                    ₹{food.price}
                  </strong>

                </div>

                {/* =================================================
                    PLUS BUTTON

                    CLICK = FOOD DETAILS PAGE
                    NOT QUANTITY
                ================================================= */}

                <button
                  type="button"
                  className="MenuDetailsMain__addButton"
                  onClick={() => openFoodDetails(food)}
                  aria-label={`View ${food.name} details`}
                >

                  <span className="MenuDetailsMain__plusIcon">
                    +
                  </span>

                </button>

              </div>

            </article>
          ))}

        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        {totalPages > 1 && (
          <div className="MenuDetailsMain__pagination">

            <button
              type="button"
              className="MenuDetailsMain__paginationArrow"
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
              aria-label="Previous page"
            >

              <svg viewBox="0 0 24 24">
                <path
                  d="M15 18L9 12L15 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

            </button>

            <div className="MenuDetailsMain__pageNumbers">

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  className={`MenuDetailsMain__pageNumber ${
                    currentPage === page
                      ? "MenuDetailsMain__pageNumber--active"
                      : ""
                  }`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </button>
              ))}

            </div>

            <button
              type="button"
              className="MenuDetailsMain__paginationArrow"
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
              aria-label="Next page"
            >

              <svg viewBox="0 0 24 24">
                <path
                  d="M9 18L15 12L9 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

            </button>

          </div>
        )}

      </div>

    </section>
  );
};

export default MenuDetailsMain;