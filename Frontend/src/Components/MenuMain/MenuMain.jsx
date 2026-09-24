import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MenuMain.css";

const MenuMain = () => {
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

    "Juices & Drinks": (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M9 5h14l-2 20a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3L9 5Z" />
        <path d="M7 5h18" />
        <path d="M19 2l3 3" />
        <path d="M11 13h10" />
      </svg>
    ),

    "Salads & Bowls": (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 16c1 7 5 11 11 11s10-4 11-11H5Z" />
        <path d="M8 16c1.5-4 4.5-6 8-6s6.5 2 8 6" />
        <path d="M14 6c1 1 2 2.5 2 4" />
        <circle cx="12" cy="13" r="1.2" />
        <circle cx="16" cy="12" r="1.2" />
        <circle cx="20" cy="14" r="1.2" />
      </svg>
    ),

    "Eggs & Breakfast": (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 4C11 4 7 11 7 19a9 9 0 0 0 18 0c0-8-4-15-9-15Z" />
        <circle cx="16" cy="19" r="4" />
      </svg>
    ),

    "Healthy Rolls": (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="6" y="9" width="20" height="14" rx="7" />
        <path d="M13 9v14" />
        <path d="M19 9v14" />
        <path d="M10 16h12" />
      </svg>
    ),
  };

  /* =========================================================
      CATEGORIES
  ========================================================= */

  const categories = [
    "All",
    "Juices & Drinks",
    "Salads & Bowls",
    "Eggs & Breakfast",
    "Healthy Rolls",
  ];

  /* =========================================================
      VERIFIED FOOD DATA (19 Healthy Items)
  ========================================================= */

  const foods = [
    {
      id: 1,
      name: "Anar Juice",
      category: "Juices & Drinks",
      description: "Freshly squeezed sweet & tangy pomegranate juice",
      price: 60,
      image:
        "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Kadha",
      category: "Juices & Drinks",
      description: "Traditional herbal decoction brewed with ginger, tulsi & spices",
      price: 20,
      image:
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Corn Salad",
      category: "Salads & Bowls",
      description: "Crispy sweet corn tossed with fresh herbs, veggies & lemon",
      price: 50,
      image:
        "https://images.unsplash.com/photo-1551248429-40975aa4de74?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      name: "Peanut Butter Sandwich",
      category: "Eggs & Breakfast",
      description: "Toasted whole wheat bread layered with rich crunchy peanut butter",
      price: 40,
      image:
        "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      name: "Nutri Oats Bowl",
      category: "Salads & Bowls",
      description: "Warm fiber-rich rolled oats garnished with seeds, fruits & honey",
      price: 60,
      image:
        "https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 6,
      name: "Fruit Basil Bliss",
      category: "Juices & Drinks",
      description: "Refreshing cold blend of seasonal fresh fruits with holy basil",
      price: 60,
      image:
        "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 7,
      name: "Karela Juice",
      category: "Juices & Drinks",
      description: "Pure cold-pressed bitter gourd juice for health & detox",
      price: 40,
      image:
        "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 8,
      name: "Nim Patta Juice",
      category: "Juices & Drinks",
      description: "Therapeutic herbal green neem leaf extract juice",
      price: 40,
      image:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 9,
      name: "Healthy Curd Juice",
      category: "Juices & Drinks",
      description: "Refreshing spiced Indian buttermilk (chaas) with cumin & mint",
      price: 40,
      image:
        "https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 10,
      name: "Desi Boiled Egg",
      category: "Eggs & Breakfast",
      description: "Farm-fresh hard boiled egg seasoned with rock salt & pepper",
      price: 15,
      image:
        "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 11,
      name: "Desi Boiled Egg Omelette",
      category: "Eggs & Breakfast",
      description: "Nutritious 2-egg street style rolled omelette with herbs & onion",
      price: 40,
      image:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 12,
      name: "Desi Egg Bhurji",
      category: "Eggs & Breakfast",
      description: "Spiced Indian-style scrambled eggs prepared with 2 eggs & tomato",
      price: 40,
      image:
        "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 13,
      name: "Egg Chicken Boiled Salad",
      category: "Salads & Bowls",
      description: "Lean boiled chicken slices paired with boiled eggs & fresh greens",
      price: 100,
      image:
        "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 14,
      name: "Boiled Chicken Roll",
      category: "Healthy Rolls",
      description: "Tender shredded boiled chicken rolled in light whole wheat wrap",
      price: 80,
      image:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 15,
      name: "Boiled Paneer Roll",
      category: "Healthy Rolls",
      description: "Soft fresh paneer cubes and veggies rolled with mint dressing",
      price: 80,
      image:
        "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 16,
      name: "Boiled Egg Roll",
      category: "Healthy Rolls",
      description: "Sliced boiled eggs and sliced peppers wrapped in a soft roti roll",
      price: 60,
      image:
        "https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 17,
      name: "Boiled Egg Chicken Roll",
      category: "Healthy Rolls",
      description: "High protein power roll combining boiled chicken & farm eggs",
      price: 100,
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 18,
      name: "Paneer Tikka Roll",
      category: "Healthy Rolls",
      description: "Marinated grilled cottage cheese cubes wrapped with mint chutney",
      price: 80,
      image:
        "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 19,
      name: "Chicken Tikka Roll",
      category: "Healthy Rolls",
      description: "Clay-oven grilled smoky chicken tikka rolled with pickled onions",
      price: 90,
      image:
        "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=400&q=80",
    },
  ];

  /* Fallback in case of temporary network or cross-origin failures */
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src =
      "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=400&q=80";
  };

  /* =========================================================
      FILTER LOGIC
  ========================================================= */

  const filteredFoods = useMemo(() => {
    if (activeCategory === "All") {
      return foods;
    }
    return foods.filter((food) => food.category === activeCategory);
  }, [activeCategory]);

  /* =========================================================
      PAGINATION
  ========================================================= */

  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

  const currentFoods = filteredFoods.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changeCategory = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

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

  const openFoodDetails = (food) => {
    navigate(`/food/${food.id}`);
  };

  return (
    <section className="MenuMain">
      <div className="MenuMain__container">
        {/* TOP BAR / CATEGORIES */}
        <div className="MenuMain__topBar">
          <div className="MenuMain__categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`MenuMain__category ${
                  activeCategory === category
                    ? "MenuMain__category--active"
                    : ""
                }`}
                onClick={() => changeCategory(category)}
              >
                <span className="MenuMain__categoryIcon">
                  {categoryIcons[category]}
                </span>
                <span className="MenuMain__categoryName">
                  {category.toUpperCase()}
                </span>
              </button>
            ))}
          </div>

          {/* FILTER DROPDOWN */}
          <div className="MenuMain__filterWrapper">
            <button
              type="button"
              className={`MenuMain__filterButton ${
                filterOpen ? "MenuMain__filterButton--active" : ""
              }`}
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <span>Filter</span>
              <svg className="MenuMain__filterIcon" viewBox="0 0 24 24">
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
              <div className="MenuMain__filterDropdown">
                <div className="MenuMain__filterTitle">FILTER MENU</div>
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className="MenuMain__filterOption"
                    onClick={() => {
                      changeCategory(category);
                      setFilterOpen(false);
                    }}
                  >
                    <span>{category}</span>
                    <span className="MenuMain__filterOptionIcon">
                      {categoryIcons[category]}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FOOD CARDS GRID */}
        <div className="MenuMain__grid">
          {currentFoods.map((food) => (
            <article key={food.id} className="MenuMain__card">
              <span className="MenuMain__hoverLayer" />

              <div className="MenuMain__cardTop">
                <div className="MenuMain__imageWrapper">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="MenuMain__foodImage"
                    onError={handleImageError}
                    loading="lazy"
                  />
                </div>

                <div className="MenuMain__foodInfo">
                  <h3 className="MenuMain__foodName">{food.name}</h3>
                  <p className="MenuMain__foodDescription">
                    {food.description}
                  </p>
                </div>
              </div>

              <div className="MenuMain__cardBottom">
                <div className="MenuMain__priceBox">
                  <span className="MenuMain__priceLabel">Regular Price</span>
                  <strong className="MenuMain__price">₹{food.price}</strong>
                </div>

                <button
                  type="button"
                  className="MenuMain__addButton"
                  onClick={() => openFoodDetails(food)}
                  aria-label={`View ${food.name} details`}
                >
                  <span className="MenuMain__plusIcon">+</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="MenuMain__pagination">
            <button
              type="button"
              className="MenuMain__paginationArrow"
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

            <div className="MenuMain__pageNumbers">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    className={`MenuMain__pageNumber ${
                      currentPage === page
                        ? "MenuMain__pageNumber--active"
                        : ""
                    }`}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              className="MenuMain__paginationArrow"
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

export default MenuMain;