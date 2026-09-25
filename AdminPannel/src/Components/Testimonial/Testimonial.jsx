import React, { useEffect, useMemo, useState } from "react";
import "./Testimonial.css";

const Testimonial = () => {
  /* =========================================================
      DEMO DATA
  ========================================================= */

  const initialTestimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya@gmail.com",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      message:
        "Amazing food! Fresh ingredients and great taste. Super fast delivery. This is now my go-to food place. Highly recommended!",
      date: "2026-09-23",
      time: "10:45 AM",
      status: "Approved",
    },
    {
      id: 2,
      name: "Rahul Verma",
      email: "rahul@gmail.com",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4,
      message:
        "Great taste and fast delivery. Highly recommended for everyone.",
      date: "2026-09-22",
      time: "08:20 PM",
      status: "Approved",
    },
    {
      id: 3,
      name: "Sneha Patra",
      email: "sneha@gmail.com",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      rating: 5,
      message:
        "Loved the varieties and quick service. Will definitely order again.",
      date: "2026-09-21",
      time: "06:15 PM",
      status: "Pending",
    },
    {
      id: 4,
      name: "Amit Kumar",
      email: "amit@gmail.com",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      rating: 4,
      message:
        "Good food and hygienic packaging. Only improvement needed in delivery timing.",
      date: "2026-09-20",
      time: "11:30 AM",
      status: "Approved",
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram@gmail.com",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
      rating: 5,
      message:
        "Best biryani in town! Keep it up! The quality was excellent.",
      date: "2026-09-19",
      time: "09:25 PM",
      status: "Rejected",
    },
    {
      id: 6,
      name: "Neha Reddy",
      email: "neha@gmail.com",
      image: "https://randomuser.me/api/portraits/women/49.jpg",
      rating: 4,
      message:
        "Food was good, but delivery was a bit late. Overall nice experience.",
      date: "2026-09-18",
      time: "04:10 PM",
      status: "Approved",
    },
    {
      id: 7,
      name: "Arjun Das",
      email: "arjun@gmail.com",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      rating: 5,
      message:
        "Excellent food quality and wonderful customer service.",
      date: "2026-09-17",
      time: "02:20 PM",
      status: "Approved",
    },
    {
      id: 8,
      name: "Riya Mohanty",
      email: "riya@gmail.com",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      rating: 3,
      message:
        "The food was tasty and nicely packed. Delivery could be faster.",
      date: "2026-09-16",
      time: "01:10 PM",
      status: "Pending",
    },
    {
      id: 9,
      name: "Sourav Nayak",
      email: "sourav@gmail.com",
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      rating: 5,
      message:
        "Absolutely loved the food. Everything was fresh and delicious.",
      date: "2026-09-15",
      time: "07:30 PM",
      status: "Approved",
    },
    {
      id: 10,
      name: "Puja Rout",
      email: "puja@gmail.com",
      image: "https://randomuser.me/api/portraits/women/52.jpg",
      rating: 4,
      message:
        "Very good experience. The food arrived hot and fresh.",
      date: "2026-09-14",
      time: "08:45 PM",
      status: "Approved",
    },
    {
      id: 11,
      name: "Manas Behera",
      email: "manas@gmail.com",
      image: "https://randomuser.me/api/portraits/men/64.jpg",
      rating: 5,
      message:
        "Wonderful taste and excellent packaging. Highly recommended.",
      date: "2026-09-13",
      time: "01:10 PM",
      status: "Approved",
    },
    {
      id: 12,
      name: "Sweta Jena",
      email: "sweta@gmail.com",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 2,
      message:
        "Food was average and delivery took longer than expected.",
      date: "2026-09-12",
      time: "09:15 AM",
      status: "Rejected",
    },
    {
      id: 13,
      name: "Rakesh Das",
      email: "rakesh@gmail.com",
      image: "https://randomuser.me/api/portraits/men/72.jpg",
      rating: 5,
      message:
        "Amazing experience. The taste was exactly what I expected.",
      date: "2026-09-11",
      time: "06:20 PM",
      status: "Approved",
    },
    {
      id: 14,
      name: "Anjali Mehta",
      email: "anjali@gmail.com",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
      rating: 4,
      message:
        "Fresh food, great presentation and quick delivery.",
      date: "2026-09-10",
      time: "05:10 PM",
      status: "Pending",
    },
    {
      id: 15,
      name: "Karan Patel",
      email: "karan@gmail.com",
      image: "https://randomuser.me/api/portraits/men/31.jpg",
      rating: 5,
      message:
        "One of the best food experiences I have had recently.",
      date: "2026-09-09",
      time: "08:15 PM",
      status: "Approved",
    },
    {
      id: 16,
      name: "Megha Sahu",
      email: "megha@gmail.com",
      image: "https://randomuser.me/api/portraits/women/18.jpg",
      rating: 4,
      message:
        "Very tasty and well packed. Would order again.",
      date: "2026-09-08",
      time: "12:15 PM",
      status: "Approved",
    },
    {
      id: 17,
      name: "Deepak Roy",
      email: "deepak@gmail.com",
      image: "https://randomuser.me/api/portraits/men/38.jpg",
      rating: 3,
      message:
        "Good overall experience, but there is room for improvement.",
      date: "2026-09-07",
      time: "04:45 PM",
      status: "Pending",
    },
    {
      id: 18,
      name: "Nisha Gupta",
      email: "nisha@gmail.com",
      image: "https://randomuser.me/api/portraits/women/29.jpg",
      rating: 5,
      message:
        "Everything was perfect from ordering to delivery.",
      date: "2026-09-06",
      time: "10:30 AM",
      status: "Approved",
    },
  ];

  /* =========================================================
      STATES
  ========================================================= */

  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem("TestimonialData");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialTestimonials;
      }
    }

    return initialTestimonials;
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [ratingFilter, setRatingFilter] = useState("All Ratings");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [calendarType, setCalendarType] = useState(null);
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear());

  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [viewTestimonial, setViewTestimonial] = useState(null);
  const [editTestimonial, setEditTestimonial] = useState(null);
  const [deleteTestimonial, setDeleteTestimonial] = useState(null);
  const [showBulkDelete, setShowBulkDelete] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
    status: "Approved",
  });

  const ITEMS_PER_PAGE = 6;

  /* =========================================================
      SAVE DATA
  ========================================================= */

  useEffect(() => {
    localStorage.setItem("TestimonialData", JSON.stringify(testimonials));
  }, [testimonials]);

  /* =========================================================
      FORMAT DATE
  ========================================================= */

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* =========================================================
      FILTER DATA
  ========================================================= */

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((item) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.message.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All Status" || item.status === statusFilter;

      const matchesRating =
        ratingFilter === "All Ratings" || item.rating === Number(ratingFilter);

      const matchesFrom = !fromDate || item.date >= fromDate;
      const matchesTo = !toDate || item.date <= toDate;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesRating &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [testimonials, search, statusFilter, ratingFilter, fromDate, toDate]);

  /* =========================================================
      PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTestimonials.length / ITEMS_PER_PAGE)
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentTestimonials = filteredTestimonials.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /* =========================================================
      SELECT ALL
  ========================================================= */

  const currentIds = currentTestimonials.map((item) => item.id);

  const allSelected =
    currentIds.length > 0 &&
    currentIds.every((id) => selectedIds.includes(id));

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !currentIds.includes(id))
      );
    } else {
      setSelectedIds((prev) => [
        ...new Set([...prev, ...currentIds]),
      ]);
    }
  };

  /* =========================================================
      SINGLE SELECT
  ========================================================= */

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  /* =========================================================
      RESET
  ========================================================= */

  const handleReset = () => {
    setSearch("");
    setStatusFilter("All Status");
    setRatingFilter("All Ratings");
    setFromDate("");
    setToDate("");
    setCalendarType(null);
    setCurrentPage(1);
  };

  /* =========================================================
      REFRESH
  ========================================================= */

  const handleRefresh = () => {
    setSelectedIds([]);
    setCurrentPage(1);
    setCalendarType(null);
  };

  /* =========================================================
      EDIT
  ========================================================= */

  const openEdit = (item) => {
    setEditTestimonial(item);

    setEditForm({
      name: item.name,
      email: item.email,
      message: item.message,
      rating: item.rating,
      status: item.status,
    });
  };

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveEdit = () => {
    if (!editTestimonial) return;

    setTestimonials((prev) =>
      prev.map((item) =>
        item.id === editTestimonial.id
          ? {
              ...item,
              name: editForm.name,
              email: editForm.email,
              message: editForm.message,
              rating: Number(editForm.rating),
              status: editForm.status,
            }
          : item
      )
    );

    setEditTestimonial(null);
  };

  /* =========================================================
      DELETE SINGLE
  ========================================================= */

  const confirmDelete = () => {
    if (!deleteTestimonial) return;

    setTestimonials((prev) =>
      prev.filter((item) => item.id !== deleteTestimonial.id)
    );

    setSelectedIds((prev) =>
      prev.filter((id) => id !== deleteTestimonial.id)
    );

    setDeleteTestimonial(null);
  };

  /* =========================================================
      DELETE SELECTED
  ========================================================= */

  const confirmBulkDelete = () => {
    setTestimonials((prev) =>
      prev.filter((item) => !selectedIds.includes(item.id))
    );

    setSelectedIds([]);
    setShowBulkDelete(false);
  };

  /* =========================================================
      PAGINATION BUTTONS
  ========================================================= */

  const getPages = () => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  /* =========================================================
      CALENDAR
  ========================================================= */

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getCalendarDays = () => {
    const firstDay = new Date(calendarYear, calendarMonth, 1).getDay();
    const daysInMonth = new Date(
      calendarYear,
      calendarMonth + 1,
      0
    ).getDate();
    const previousMonthDays = new Date(
      calendarYear,
      calendarMonth,
      0
    ).getDate();

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: previousMonthDays - i,
        outside: true,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        outside: false,
      });
    }

    while (days.length < 42) {
      days.push({
        day: days.length - daysInMonth - firstDay + 1,
        outside: true,
      });
    }

    return days;
  };

  const changeMonth = (direction) => {
    if (direction === "prev") {
      if (calendarMonth === 0) {
        setCalendarMonth(11);
        setCalendarYear((prev) => prev - 1);
      } else {
        setCalendarMonth((prev) => prev - 1);
      }
    } else {
      if (calendarMonth === 11) {
        setCalendarMonth(0);
        setCalendarYear((prev) => prev + 1);
      } else {
        setCalendarMonth((prev) => prev + 1);
      }
    }
  };

  const openCalendar = (type) => {
    setCalendarType(calendarType === type ? null : type);

    const selected = type === "from" ? fromDate : toDate;

    if (selected) {
      const date = new Date(`${selected}T00:00:00`);
      setCalendarMonth(date.getMonth());
      setCalendarYear(date.getFullYear());
    }
  };

  const selectDate = (day, outside) => {
    if (outside) return;

    const month = String(calendarMonth + 1).padStart(2, "0");
    const selectedDay = String(day).padStart(2, "0");
    const selectedDate = `${calendarYear}-${month}-${selectedDay}`;

    if (calendarType === "from") {
      setFromDate(selectedDate);
    }

    if (calendarType === "to") {
      setToDate(selectedDate);
    }

    setCalendarType(null);
    setCurrentPage(1);
  };

  const isSelectedDate = (day) => {
    const month = String(calendarMonth + 1).padStart(2, "0");
    const selectedDay = String(day).padStart(2, "0");
    const value = `${calendarYear}-${month}-${selectedDay}`;

    return value === fromDate || value === toDate;
  };

  /* =========================================================
      ICON SYSTEM
  ========================================================= */

  const Icon = ({ name, size = 20 }) => {
    const props = {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    };

    switch (name) {
      case "star":
        return (
          <svg {...props}>
            <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
          </svg>
        );

      case "message":
        return (
          <svg {...props}>
            <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.4 8.4 0 0 1-3.1-.6L4 20l1.4-3.5A7.1 7.1 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" />
            <path d="M8 12h.01M12 12h.01M16 12h.01" />
          </svg>
        );

      case "clock":
        return (
          <svg {...props}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        );

      case "closeCircle":
        return (
          <svg {...props}>
            <circle cx="12" cy="12" r="9" />
            <path d="m9 9 6 6M15 9l-6 6" />
          </svg>
        );

      case "search":
        return (
          <svg {...props}>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
        );

      case "calendar":
        return (
          <svg {...props}>
            <rect x="3" y="4" width="18" height="17" rx="2" />
            <path d="M8 2v4M16 2v4M3 9h18" />
          </svg>
        );

      case "filter":
        return (
          <svg {...props}>
            <path d="M4 5h16l-6 7v6l-4 2v-8z" />
          </svg>
        );

      case "refresh":
        return (
          <svg {...props}>
            <path d="M20 11a8 8 0 0 0-14.7-4L3 10" />
            <path d="M3 5v5h5" />
            <path d="M4 13a8 8 0 0 0 14.7 4L21 14" />
            <path d="M21 19v-5h-5" />
          </svg>
        );

      case "eye":
        return (
          <svg {...props}>
            <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
            <circle cx="12" cy="12" r="2.5" />
          </svg>
        );

      case "edit":
        return (
          <svg {...props}>
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
          </svg>
        );

      case "trash":
        return (
          <svg {...props}>
            <path d="M4 7h16" />
            <path d="M10 11v6M14 11v6" />
            <path d="M6 7l1 14h10l1-14" />
            <path d="M9 7V4h6v3" />
          </svg>
        );

      case "home":
        return (
          <svg {...props}>
            <path d="m3 10 9-7 9 7" />
            <path d="M5 9v11h14V9" />
            <path d="M9 20v-6h6v6" />
          </svg>
        );

      case "arrowLeft":
        return (
          <svg {...props}>
            <path d="m15 18-6-6 6-6" />
          </svg>
        );

      case "arrowRight":
        return (
          <svg {...props}>
            <path d="m9 18 6-6-6-6" />
          </svg>
        );

      case "close":
        return (
          <svg {...props}>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        );

      default:
        return null;
    }
  };

  /* =========================================================
      STAR COMPONENT
  ========================================================= */

  const RatingStars = ({ rating, interactive = false, onChange }) => {
    return (
      <div
        className={`Testimonial__stars ${
          interactive ? "Testimonial__stars--interactive" : ""
        }`}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange && onChange(star)}
            className={
              star <= rating
                ? "Testimonial__star Testimonial__star--active"
                : "Testimonial__star"
            }
          >
            <Icon name="star" size={interactive ? 22 : 17} />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="Testimonial">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="Testimonial__header">
        <div className="Testimonial__headerLeft">
          <div className="Testimonial__headerIcon">
            <Icon name="star" size={30} />
          </div>

          <div>
            <h1>Testimonials</h1>
            <p>Manage and view all customer testimonials</p>
          </div>
        </div>

        <div className="Testimonial__breadcrumb">
          <span>
            <Icon name="home" size={15} />
            Dashboard
          </span>

          <Icon name="arrowRight" size={14} />

          <strong>Testimonials</strong>
        </div>
      </div>

      {/* =====================================================
          FILTER SECTION
      ===================================================== */}

      <div className="Testimonial__filterCard">
        <div className="Testimonial__filterField Testimonial__searchField">
          <label>Search</label>

          <div className="Testimonial__inputBox">
            <Icon name="search" size={17} />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, email or message..."
            />
          </div>
        </div>

        <div className="Testimonial__filterField">
          <label>Status</label>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option>All Status</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="Testimonial__filterField">
          <label>Rating</label>

          <select
            value={ratingFilter}
            onChange={(e) => {
              setRatingFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option>All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        {/* FROM DATE */}

        <div className="Testimonial__filterField Testimonial__calendarField">
          <label>From Date</label>

          <button
            type="button"
            className="Testimonial__dateButton"
            onClick={() => openCalendar("from")}
          >
            <span>{fromDate ? formatDate(fromDate) : "dd-mm-yyyy"}</span>

            <Icon name="calendar" size={16} />
          </button>

          {calendarType === "from" && (
            <div className="Testimonial__calendar">
              <div className="Testimonial__calendarHeader">
                <button
                  type="button"
                  onClick={() => changeMonth("prev")}
                >
                  <Icon name="arrowLeft" size={15} />
                </button>

                <strong>
                  {monthNames[calendarMonth]} {calendarYear}
                </strong>

                <button
                  type="button"
                  onClick={() => changeMonth("next")}
                >
                  <Icon name="arrowRight" size={15} />
                </button>
              </div>

              <div className="Testimonial__calendarWeek">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                  (day) => (
                    <span key={day}>{day}</span>
                  )
                )}
              </div>

              <div className="Testimonial__calendarDays">
                {getCalendarDays().map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    disabled={item.outside}
                    className={
                      isSelectedDate(item.day)
                        ? "Testimonial__calendarSelected"
                        : ""
                    }
                    onClick={() =>
                      selectDate(item.day, item.outside)
                    }
                  >
                    {item.day}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* TO DATE */}

        <div className="Testimonial__filterField Testimonial__calendarField">
          <label>To Date</label>

          <button
            type="button"
            className="Testimonial__dateButton"
            onClick={() => openCalendar("to")}
          >
            <span>{toDate ? formatDate(toDate) : "dd-mm-yyyy"}</span>

            <Icon name="calendar" size={16} />
          </button>

          {calendarType === "to" && (
            <div className="Testimonial__calendar">
              <div className="Testimonial__calendarHeader">
                <button
                  type="button"
                  onClick={() => changeMonth("prev")}
                >
                  <Icon name="arrowLeft" size={15} />
                </button>

                <strong>
                  {monthNames[calendarMonth]} {calendarYear}
                </strong>

                <button
                  type="button"
                  onClick={() => changeMonth("next")}
                >
                  <Icon name="arrowRight" size={15} />
                </button>
              </div>

              <div className="Testimonial__calendarWeek">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                  (day) => (
                    <span key={day}>{day}</span>
                  )
                )}
              </div>

              <div className="Testimonial__calendarDays">
                {getCalendarDays().map((item, index) => (
                  <button
                    key={index}
                    type="button"
                    disabled={item.outside}
                    className={
                      isSelectedDate(item.day)
                        ? "Testimonial__calendarSelected"
                        : ""
                    }
                    onClick={() =>
                      selectDate(item.day, item.outside)
                    }
                  >
                    {item.day}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="Testimonial__filterButtons">
          <button
            type="button"
            className="Testimonial__filterButton"
            onClick={() => setCurrentPage(1)}
          >
            <Icon name="filter" size={17} />
            Filter
          </button>

          <button
            type="button"
            className="Testimonial__resetButton"
            onClick={handleReset}
          >
            <Icon name="refresh" size={16} />
            Reset
          </button>
        </div>
      </div>

      {/* =====================================================
          LIST
      ===================================================== */}

      <div className="Testimonial__listCard">
        <div className="Testimonial__listHeader">
          <div className="Testimonial__listTitle">
            <div className="Testimonial__listIcon">
              <Icon name="message" size={22} />
            </div>

            <h2>Testimonials List</h2>
          </div>

          <div className="Testimonial__listActions">
            <button
              type="button"
              className="Testimonial__deleteSelected"
              disabled={selectedIds.length === 0}
              onClick={() => setShowBulkDelete(true)}
            >
              <Icon name="trash" size={16} />
              Delete Selected
            </button>

            <button
              type="button"
              className="Testimonial__refreshButton"
              onClick={handleRefresh}
              title="Refresh"
            >
              <Icon name="refresh" size={17} />
            </button>
          </div>
        </div>

        {/* =====================================================
            TABLE
        ===================================================== */}

        <div className="Testimonial__tableWrapper">
          <table className="Testimonial__table">
            <thead>
              <tr>
                <th className="Testimonial__checkColumn">
                  <label className="Testimonial__checkbox">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleSelectAll}
                    />
                    <span></span>
                  </label>
                </th>

                <th>#</th>
                <th>Customer</th>
                <th>Rating</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentTestimonials.length > 0 ? (
                currentTestimonials.map((item, index) => (
                  <tr key={item.id}>
                    <td>
                      <label className="Testimonial__checkbox">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.id)}
                          onChange={() => handleSelect(item.id)}
                        />
                        <span></span>
                      </label>
                    </td>

                    <td>{startIndex + index + 1}</td>

                    <td>
                      <div className="Testimonial__customer">
                        <img src={item.image} alt={item.name} />

                        <div>
                          <strong>{item.name}</strong>
                          <span>{item.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <RatingStars rating={item.rating} />
                    </td>

                    <td>
                      <div className="Testimonial__message">
                        {item.message}
                      </div>
                    </td>

                    <td>
                      <div className="Testimonial__date">
                        <span>{formatDate(item.date)}</span>
                        <small>{item.time}</small>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`Testimonial__status Testimonial__status--${item.status.toLowerCase()}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="Testimonial__rowActions">
                        <button
                          type="button"
                          className="Testimonial__rowButton Testimonial__viewButton"
                          onClick={() => setViewTestimonial(item)}
                          title="View"
                        >
                          <Icon name="eye" size={16} />
                        </button>

                        <button
                          type="button"
                          className="Testimonial__rowButton Testimonial__editButton"
                          onClick={() => openEdit(item)}
                          title="Edit"
                        >
                          <Icon name="edit" size={16} />
                        </button>

                        <button
                          type="button"
                          className="Testimonial__rowButton Testimonial__deleteButton"
                          onClick={() => setDeleteTestimonial(item)}
                          title="Delete"
                        >
                          <Icon name="trash" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="Testimonial__empty">
                    No testimonials found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =====================================================
            PAGINATION
        ===================================================== */}

        <div className="Testimonial__paginationWrapper">
          <div className="Testimonial__paginationInfo">
            Showing{" "}
            <strong>
              {filteredTestimonials.length ? startIndex + 1 : 0}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(
                startIndex + ITEMS_PER_PAGE,
                filteredTestimonials.length
              )}
            </strong>{" "}
            of <strong>{filteredTestimonials.length}</strong> entries
          </div>

          {totalPages > 1 && (
            <div className="Testimonial__pagination">
              <button
                type="button"
                className="Testimonial__pageButton"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => page - 1)}
              >
                <Icon name="arrowLeft" size={16} />
              </button>

              {getPages().map((page, index) =>
                page === "..." ? (
                  <span
                    key={`dots-${index}`}
                    className="Testimonial__dots"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    type="button"
                    key={page}
                    className={`Testimonial__pageButton ${
                      currentPage === page
                        ? "Testimonial__pageActive"
                        : ""
                    }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                type="button"
                className="Testimonial__pageButton"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((page) => page + 1)}
              >
                <Icon name="arrowRight" size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      {viewTestimonial && (
        <div
          className="Testimonial__modalOverlay"
          onClick={() => setViewTestimonial(null)}
        >
          <div
            className="Testimonial__viewModal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="Testimonial__modalClose"
              onClick={() => setViewTestimonial(null)}
            >
              <Icon name="close" size={17} />
            </button>

            <div className="Testimonial__modalHeader">
              <div className="Testimonial__modalIcon Testimonial__modalIcon--blue">
                <Icon name="eye" size={22} />
              </div>

              <div>
                <h3>Testimonial Details</h3>
                <p>Customer feedback</p>
              </div>
            </div>

            <div className="Testimonial__profileBox">
              <img
                src={viewTestimonial.image}
                alt={viewTestimonial.name}
              />

              <div>
                <strong>{viewTestimonial.name}</strong>
                <span>{viewTestimonial.email}</span>
                <RatingStars rating={viewTestimonial.rating} />
              </div>
            </div>

            <div className="Testimonial__viewGrid">
              <div className="Testimonial__viewItem">
                <span>Date</span>
                <strong>{formatDate(viewTestimonial.date)}</strong>
                <small>{viewTestimonial.time}</small>
              </div>

              <div className="Testimonial__viewItem">
                <span>Status</span>
                <span
                  className={`Testimonial__status Testimonial__status--${viewTestimonial.status.toLowerCase()}`}
                >
                  {viewTestimonial.status}
                </span>
              </div>

              <div className="Testimonial__viewItem">
                <span>Rating</span>
                <strong>{viewTestimonial.rating} out of 5</strong>
              </div>
            </div>

            <div className="Testimonial__quoteBox">
              <div className="Testimonial__quoteMark">“</div>
              <p>{viewTestimonial.message}</p>
            </div>

            <div className="Testimonial__modalFooter">
              <button
                type="button"
                className="Testimonial__cancelButton"
                onClick={() => setViewTestimonial(null)}
              >
                Close
              </button>

              <button
                type="button"
                className="Testimonial__saveButton"
                onClick={() => {
                  setViewTestimonial(null);
                  openEdit(viewTestimonial);
                }}
              >
                <Icon name="edit" size={15} />
                Edit Testimonial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      {editTestimonial && (
        <div
          className="Testimonial__modalOverlay"
          onClick={() => setEditTestimonial(null)}
        >
          <div
            className="Testimonial__editModal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="Testimonial__modalClose"
              onClick={() => setEditTestimonial(null)}
            >
              <Icon name="close" size={17} />
            </button>

            <div className="Testimonial__modalHeader">
              <div className="Testimonial__modalIcon Testimonial__modalIcon--green">
                <Icon name="edit" size={22} />
              </div>

              <div>
                <h3>Edit Testimonial</h3>
                <p>Update customer testimonial</p>
              </div>
            </div>

            <div className="Testimonial__editGrid">
              <div className="Testimonial__editField">
                <label>Customer Name *</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    handleEditChange("name", e.target.value)
                  }
                />
              </div>

              <div className="Testimonial__editField">
                <label>Email *</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    handleEditChange("email", e.target.value)
                  }
                />
              </div>

              <div className="Testimonial__editField Testimonial__editField--rating">
                <label>Rating *</label>
                <RatingStars
                  rating={editForm.rating}
                  interactive
                  onChange={(value) =>
                    handleEditChange("rating", value)
                  }
                />
              </div>

              <div className="Testimonial__editField">
                <label>Status *</label>
                <select
                  value={editForm.status}
                  onChange={(e) =>
                    handleEditChange("status", e.target.value)
                  }
                >
                  <option>Approved</option>
                  <option>Pending</option>
                  <option>Rejected</option>
                </select>
              </div>

              <div className="Testimonial__editField Testimonial__editField--full">
                <label>Message *</label>
                <textarea
                  rows="5"
                  value={editForm.message}
                  onChange={(e) =>
                    handleEditChange("message", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="Testimonial__modalFooter">
              <button
                type="button"
                className="Testimonial__cancelButton"
                onClick={() => setEditTestimonial(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="Testimonial__saveButton"
                onClick={saveEdit}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {deleteTestimonial && (
        <div
          className="Testimonial__modalOverlay"
          onClick={() => setDeleteTestimonial(null)}
        >
          <div
            className="Testimonial__deleteModal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="Testimonial__modalClose"
              onClick={() => setDeleteTestimonial(null)}
            >
              <Icon name="close" size={17} />
            </button>

            <div className="Testimonial__deleteIcon">
              <Icon name="trash" size={29} />
            </div>

            <h3>Delete Testimonial?</h3>

            <p>
              Are you sure you want to permanently delete the testimonial
              from <strong>{deleteTestimonial.name}</strong>?
            </p>

            <div className="Testimonial__deleteActions">
              <button
                type="button"
                className="Testimonial__cancelDelete"
                onClick={() => setDeleteTestimonial(null)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="Testimonial__confirmDelete"
                onClick={confirmDelete}
              >
                <Icon name="trash" size={16} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          BULK DELETE MODAL
      ===================================================== */}

      {showBulkDelete && (
        <div
          className="Testimonial__modalOverlay"
          onClick={() => setShowBulkDelete(false)}
        >
          <div
            className="Testimonial__deleteModal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="Testimonial__modalClose"
              onClick={() => setShowBulkDelete(false)}
            >
              <Icon name="close" size={17} />
            </button>

            <div className="Testimonial__deleteIcon">
              <Icon name="trash" size={29} />
            </div>

            <h3>Delete Selected?</h3>

            <p>
              You have selected{" "}
              <strong>{selectedIds.length}</strong> testimonials. Are you
              sure you want to delete them?
            </p>

            <div className="Testimonial__deleteActions">
              <button
                type="button"
                className="Testimonial__cancelDelete"
                onClick={() => setShowBulkDelete(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="Testimonial__confirmDelete"
                onClick={confirmBulkDelete}
              >
                <Icon name="trash" size={16} />
                Delete Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonial;