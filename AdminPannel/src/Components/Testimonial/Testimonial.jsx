import React, { useEffect, useMemo, useState } from "react";
import "./Testimonial.css";

const Testimonial = () => {
  /* =====================================================
     INITIAL DATA
  ===================================================== */

  const defaultTestimonials = [
    {
      id: 1,
      name: "John Doe",
      designation: "Food Expert",
      email: "john@example.com",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      review:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
      status: "Published",
      date: "2026-09-23",
    },
    {
      id: 2,
      name: "Carry Mint",
      designation: "Food Expert",
      email: "carry@example.com",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      review:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
      status: "Published",
      date: "2026-09-22",
    },
    {
      id: 3,
      name: "Sarah Albert",
      designation: "Food Expert",
      email: "sarah@example.com",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      review:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
      status: "Published",
      date: "2026-09-21",
    },
    {
      id: 4,
      name: "Stevin Mark",
      designation: "Food Expert",
      email: "stevin@example.com",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      review:
        "There are many variations of passages of delicious food reviews available. The service was excellent and very professional.",
      status: "Published",
      date: "2026-09-20",
    },
    {
      id: 5,
      name: "Michael Smith",
      designation: "Restaurant Owner",
      email: "michael@example.com",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "Amazing experience and excellent food quality. I would definitely recommend this restaurant to everyone.",
      status: "Published",
      date: "2026-09-19",
    },
    {
      id: 6,
      name: "Emma Wilson",
      designation: "Nutrition Expert",
      email: "emma@example.com",
      image: "https://randomuser.me/api/portraits/women/49.jpg",
      review:
        "The quality and service were excellent. The entire experience was very smooth and enjoyable.",
      status: "Published",
      date: "2026-09-18",
    },
    {
      id: 7,
      name: "David Miller",
      designation: "Food Blogger",
      email: "david@example.com",
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      review:
        "The presentation was beautiful and the food tasted absolutely amazing. Highly recommended.",
      status: "Published",
      date: "2026-09-17",
    },
    {
      id: 8,
      name: "Sophia Brown",
      designation: "Chef",
      email: "sophia@example.com",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      review:
        "Fresh ingredients, excellent presentation and wonderful customer service.",
      status: "Pending",
      date: "2026-09-16",
    },
    {
      id: 9,
      name: "Robert Wilson",
      designation: "Restaurant Owner",
      email: "robert@example.com",
      image: "https://randomuser.me/api/portraits/men/64.jpg",
      review:
        "One of the best food experiences I have had recently. Everything was fresh.",
      status: "Published",
      date: "2026-09-15",
    },
    {
      id: 10,
      name: "Olivia Davis",
      designation: "Food Expert",
      email: "olivia@example.com",
      image: "https://randomuser.me/api/portraits/women/26.jpg",
      review:
        "Wonderful taste and professional service. I would definitely visit again.",
      status: "Published",
      date: "2026-09-14",
    },
    {
      id: 11,
      name: "James Taylor",
      designation: "Food Blogger",
      email: "james@example.com",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
      review:
        "The food was delicious and the staff were extremely friendly.",
      status: "Pending",
      date: "2026-09-13",
    },
    {
      id: 12,
      name: "Mia Anderson",
      designation: "Nutrition Expert",
      email: "mia@example.com",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
      review:
        "Very good experience with fresh food and beautiful packaging.",
      status: "Published",
      date: "2026-09-12",
    },
    {
      id: 13,
      name: "Daniel Thomas",
      designation: "Food Expert",
      email: "daniel@example.com",
      image: "https://randomuser.me/api/portraits/men/31.jpg",
      review:
        "Great taste and excellent quality. Definitely worth trying.",
      status: "Published",
      date: "2026-09-11",
    },
    {
      id: 14,
      name: "Grace Martin",
      designation: "Food Blogger",
      email: "grace@example.com",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      review:
        "Loved the entire experience. The food was fresh and delicious.",
      status: "Published",
      date: "2026-09-10",
    },
    {
      id: 15,
      name: "William Clark",
      designation: "Restaurant Owner",
      email: "william@example.com",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
      review:
        "Excellent food and very professional service.",
      status: "Published",
      date: "2026-09-09",
    },
    {
      id: 16,
      name: "Ava Lewis",
      designation: "Food Expert",
      email: "ava@example.com",
      image: "https://randomuser.me/api/portraits/women/43.jpg",
      review:
        "Very tasty food and fast service. Had a wonderful experience.",
      status: "Published",
      date: "2026-09-08",
    },
    {
      id: 17,
      name: "Henry Lee",
      designation: "Chef",
      email: "henry@example.com",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      review:
        "The ingredients were fresh and the overall quality was impressive.",
      status: "Pending",
      date: "2026-09-07",
    },
    {
      id: 18,
      name: "Ella Walker",
      designation: "Nutrition Expert",
      email: "ella@example.com",
      image: "https://randomuser.me/api/portraits/women/50.jpg",
      review:
        "Excellent experience from ordering to delivery.",
      status: "Published",
      date: "2026-09-06",
    },
    {
      id: 19,
      name: "Lucas Hall",
      designation: "Food Blogger",
      email: "lucas@example.com",
      image: "https://randomuser.me/api/portraits/men/61.jpg",
      review:
        "The taste was amazing and the food was delivered hot.",
      status: "Published",
      date: "2026-09-05",
    },
    {
      id: 20,
      name: "Amelia Allen",
      designation: "Food Expert",
      email: "amelia@example.com",
      image: "https://randomuser.me/api/portraits/women/51.jpg",
      review:
        "Really enjoyed the food and the quality was excellent.",
      status: "Published",
      date: "2026-09-04",
    },
    {
      id: 21,
      name: "Noah Young",
      designation: "Restaurant Owner",
      email: "noah@example.com",
      image: "https://randomuser.me/api/portraits/men/72.jpg",
      review:
        "Fantastic service and delicious food. Highly recommended.",
      status: "Published",
      date: "2026-09-03",
    },
    {
      id: 22,
      name: "Isabella King",
      designation: "Nutrition Expert",
      email: "isabella@example.com",
      image: "https://randomuser.me/api/portraits/women/58.jpg",
      review:
        "Fresh, healthy and tasty. Very nice overall experience.",
      status: "Published",
      date: "2026-09-02",
    },
    {
      id: 23,
      name: "Ethan Wright",
      designation: "Food Expert",
      email: "ethan@example.com",
      image: "https://randomuser.me/api/portraits/men/35.jpg",
      review:
        "The restaurant has excellent food and a beautiful atmosphere.",
      status: "Pending",
      date: "2026-09-01",
    },
    {
      id: 24,
      name: "Charlotte Scott",
      designation: "Food Blogger",
      email: "charlotte@example.com",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      review:
        "Absolutely loved the taste and presentation. Would order again.",
      status: "Published",
      date: "2026-08-31",
    },
  ];

  /* =====================================================
     STATES
  ===================================================== */

  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem(
      "TestimonialAdminData"
    );

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultTestimonials;
      }
    }

    return defaultTestimonials;
  });

  const [search, setSearch] = useState("");

  const [selectedIds, setSelectedIds] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [modalType, setModalType] = useState(null);

  const [selectedTestimonial, setSelectedTestimonial] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    designation: "",
    email: "",
    review: "",
    image: "",
    status: "Published",
  });

  const itemsPerPage = 6;

  /* =====================================================
     SAVE LOCAL DATA
  ===================================================== */

  useEffect(() => {
    localStorage.setItem(
      "TestimonialAdminData",
      JSON.stringify(testimonials)
    );
  }, [testimonials]);

  /* =====================================================
     FILTER
  ===================================================== */

  const filteredTestimonials = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return testimonials;

    return testimonials.filter((item) => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.designation.toLowerCase().includes(query) ||
        item.review.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query)
      );
    });
  }, [testimonials, search]);

  /* =====================================================
     PAGINATION
  ===================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredTestimonials.length /
        itemsPerPage
    )
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const currentData =
    filteredTestimonials.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /* =====================================================
     STATS
  ===================================================== */

  const totalCount = testimonials.length;

  const newCount = testimonials.filter(
    (item) => item.status === "Pending"
  ).length;

  const publishedCount = testimonials.filter(
    (item) => item.status === "Published"
  ).length;

  /* =====================================================
     ICON
  ===================================================== */

  const Icon = ({
    name,
    size = 20,
  }) => {
    const props = {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    };

    switch (name) {
      case "plus":
        return (
          <svg {...props}>
            <path d="M12 5v14M5 12h14" />
          </svg>
        );

      case "search":
        return (
          <svg {...props}>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
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

      case "download":
        return (
          <svg {...props}>
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M4 21h16" />
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

      case "check":
        return (
          <svg {...props}>
            <path d="m5 12 4 4L19 6" />
          </svg>
        );

      case "quote":
        return (
          <svg {...props}>
            <path d="M7 11H4a3 3 0 0 1 3-3V5C3.5 5 2 7.2 2 11v5h5v-5ZM22 11h-3a3 3 0 0 1 3-3V5c-3.5 0-5 2.2-5 6v5h5v-5Z" />
          </svg>
        );

      case "close":
        return (
          <svg {...props}>
            <path d="M18 6 6 18M6 6l12 12" />
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

      case "home":
        return (
          <svg {...props}>
            <path d="m3 10 9-7 9 7" />
            <path d="M5 9v11h14V9" />
            <path d="M9 20v-6h6v6" />
          </svg>
        );

      default:
        return null;
    }
  };

  /* =====================================================
     OPEN ADD
  ===================================================== */

  const openAdd = () => {
    setForm({
      name: "",
      designation: "",
      email: "",
      review: "",
      image: "",
      status: "Published",
    });

    setSelectedTestimonial(null);
    setModalType("add");
  };

  /* =====================================================
     OPEN VIEW
  ===================================================== */

  const openView = (item) => {
    setSelectedTestimonial(item);
    setModalType("view");
  };

  /* =====================================================
     OPEN EDIT
  ===================================================== */

  const openEdit = (item) => {
    setSelectedTestimonial(item);

    setForm({
      name: item.name,
      designation: item.designation,
      email: item.email,
      review: item.review,
      image: item.image,
      status: item.status,
    });

    setModalType("edit");
  };

  /* =====================================================
     OPEN DELETE
  ===================================================== */

  const openDelete = (item) => {
    setSelectedTestimonial(item);
    setModalType("delete");
  };

  /* =====================================================
     INPUT CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =====================================================
     IMAGE
  ===================================================== */

  const handleImage = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  /* =====================================================
     ADD
  ===================================================== */

  const handleAdd = () => {
    if (
      !form.name.trim() ||
      !form.designation.trim() ||
      !form.email.trim() ||
      !form.review.trim()
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const newItem = {
      id: Date.now(),
      name: form.name.trim(),
      designation: form.designation.trim(),
      email: form.email.trim(),
      review: form.review.trim(),
      image:
        form.image ||
        "https://randomuser.me/api/portraits/lego/1.jpg",
      status: form.status,
      date: new Date()
        .toISOString()
        .split("T")[0],
    };

    setTestimonials((prev) => [
      newItem,
      ...prev,
    ]);

    setCurrentPage(1);
    setModalType(null);
  };

  /* =====================================================
     UPDATE
  ===================================================== */

  const handleUpdate = () => {
    if (!selectedTestimonial) return;

    setTestimonials((prev) =>
      prev.map((item) =>
        item.id === selectedTestimonial.id
          ? {
              ...item,
              ...form,
            }
          : item
      )
    );

    setModalType(null);
    setSelectedTestimonial(null);
  };

  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = () => {
    if (!selectedTestimonial) return;

    setTestimonials((prev) =>
      prev.filter(
        (item) =>
          item.id !==
          selectedTestimonial.id
      )
    );

    setSelectedIds((prev) =>
      prev.filter(
        (id) =>
          id !== selectedTestimonial.id
      )
    );

    setModalType(null);
    setSelectedTestimonial(null);
  };

  /* =====================================================
     CHECKBOX
  ===================================================== */

  const currentIds = currentData.map(
    (item) => item.id
  );

  const allSelected =
    currentIds.length > 0 &&
    currentIds.every((id) =>
      selectedIds.includes(id)
    );

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds((prev) =>
        prev.filter(
          (id) =>
            !currentIds.includes(id)
        )
      );
    } else {
      setSelectedIds((prev) => [
        ...new Set([
          ...prev,
          ...currentIds,
        ]),
      ]);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter(
            (item) => item !== id
          )
        : [...prev, id]
    );
  };

  /* =====================================================
     BULK DELETE
  ===================================================== */

  const deleteSelected = () => {
    if (!selectedIds.length) return;

    const confirmed = window.confirm(
      `Delete ${selectedIds.length} selected testimonials?`
    );

    if (!confirmed) return;

    setTestimonials((prev) =>
      prev.filter(
        (item) =>
          !selectedIds.includes(item.id)
      )
    );

    setSelectedIds([]);
  };

  /* =====================================================
     REFRESH
  ===================================================== */

  const handleRefresh = () => {
    setSearch("");
    setCurrentPage(1);
    setSelectedIds([]);
  };

  /* =====================================================
     EXPORT
  ===================================================== */

  const exportCSV = () => {
    const headers = [
      "Name",
      "Designation",
      "Email",
      "Review",
      "Status",
      "Date",
    ];

    const rows = filteredTestimonials.map(
      (item) => [
        item.name,
        item.designation,
        item.email,
        item.review,
        item.status,
        item.date,
      ]
    );

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map(
            (value) =>
              `"${String(value).replace(
                /"/g,
                '""'
              )}"`
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "testimonials.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =====================================================
     PAGINATION
  ===================================================== */

  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from(
        { length: totalPages },
        (_, i) => i + 1
      );
    }

    if (currentPage <= 3) {
      return [
        1,
        2,
        3,
        4,
        "...",
        totalPages,
      ];
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

  /* =====================================================
     DATE FORMAT
  ===================================================== */

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="Testimonial">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="Testimonial__header">

        <div>
          <h1>Testimonials</h1>

          <div className="Testimonial__breadcrumb">

            <span>Dashboard</span>

            <Icon
              name="arrowRight"
              size={15}
            />

            <strong>
              Testimonials
            </strong>

          </div>
        </div>

        <button
          className="Testimonial__addButton"
          onClick={openAdd}
        >
          <Icon
            name="plus"
            size={25}
          />
          Add Testimonial
        </button>

      </div>

      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="Testimonial__stats">

        <div className="Testimonial__statCard">

          <div className="Testimonial__statIcon Testimonial__statIcon--green">
            <Icon
              name="quote"
              size={31}
            />
          </div>

          <div>
            <span>
              Total Testimonials
            </span>

            <div className="Testimonial__statNumber">
              {totalCount}
              <small>
                ↗ +12%
              </small>
            </div>

            <p>
              From last month
            </p>
          </div>

        </div>

        <div className="Testimonial__statCard">

          <div className="Testimonial__statIcon Testimonial__statIcon--lightGreen">
            <Icon
              name="check"
              size={31}
            />
          </div>

          <div>
            <span>
              New Testimonials
            </span>

            <div className="Testimonial__statNumber">
              {newCount}
              <small>
                ↗ +8%
              </small>
            </div>

            <p>
              From last month
            </p>
          </div>

        </div>

        <div className="Testimonial__statCard">

          <div className="Testimonial__statIcon Testimonial__statIcon--yellow">
            <Icon
              name="eye"
              size={31}
            />
          </div>

          <div>
            <span>
              Customer Reviews
            </span>

            <div className="Testimonial__statNumber">
              {publishedCount}
              <small className="Testimonial__negative">
                ↘ -3%
              </small>
            </div>

            <p>
              From last month
            </p>
          </div>

        </div>

        <div className="Testimonial__statCard">

          <div className="Testimonial__statIcon Testimonial__statIcon--purple">
            <span className="Testimonial__bigStar">
              ★
            </span>
          </div>

          <div>
            <span>
              Average Rating
            </span>

            <div className="Testimonial__statNumber">
              4.8
              <small>
                ↗ +0.4
              </small>
            </div>

            <p>
              From last month
            </p>
          </div>

        </div>

      </div>

      {/* =================================================
          TABLE CARD
      ================================================= */}

      <div className="Testimonial__card">

        {/* TOOLBAR */}

        <div className="Testimonial__toolbar">

          <div className="Testimonial__search">

            <Icon
              name="search"
              size={21}
            />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(
                  e.target.value
                );
                setCurrentPage(1);
              }}
              placeholder="Search by name, review or designation..."
            />

          </div>

          <div className="Testimonial__toolbarButtons">

            <button
              className="Testimonial__refresh"
              onClick={handleRefresh}
            >
              <Icon
                name="refresh"
                size={19}
              />
              Refresh
            </button>

            <button
              className="Testimonial__export"
              onClick={exportCSV}
            >
              <Icon
                name="download"
                size={19}
              />
              Export
            </button>

          </div>

        </div>

        {/* TABLE */}

        <div className="Testimonial__tableWrapper">

          <table className="Testimonial__table">

            <thead>

              <tr>

                <th className="Testimonial__checkColumn">

                  <label className="Testimonial__checkbox">

                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={
                        toggleSelectAll
                      }
                    />

                    <span></span>

                  </label>

                </th>

                <th>Image</th>

                <th>
                  Name & Designation
                </th>

                <th>
                  Review
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {currentData.length > 0 ? (
                currentData.map(
                  (item) => (
                    <tr key={item.id}>

                      <td>

                        <label className="Testimonial__checkbox">

                          <input
                            type="checkbox"
                            checked={selectedIds.includes(
                              item.id
                            )}
                            onChange={() =>
                              toggleSelect(
                                item.id
                              )
                            }
                          />

                          <span></span>

                        </label>

                      </td>

                      <td>

                        <img
                          className="Testimonial__avatar"
                          src={item.image}
                          alt={item.name}
                        />

                      </td>

                      <td>

                        <div className="Testimonial__customer">

                          <strong>
                            {item.name}
                          </strong>

                          <span>
                            {item.designation}
                          </span>

                        </div>

                      </td>

                      <td>

                        <div className="Testimonial__review">

                          {item.review}

                        </div>

                      </td>

                      <td>

                        <div className="Testimonial__actions">

                          <button
                            className="Testimonial__actionButton Testimonial__viewAction"
                            title="View"
                            onClick={() =>
                              openView(item)
                            }
                          >
                            <Icon
                              name="eye"
                              size={19}
                            />
                          </button>

                          <button
                            className="Testimonial__actionButton Testimonial__editAction"
                            title="Edit"
                            onClick={() =>
                              openEdit(item)
                            }
                          >
                            <Icon
                              name="edit"
                              size={19}
                            />
                          </button>

                          <button
                            className="Testimonial__actionButton Testimonial__deleteAction"
                            title="Delete"
                            onClick={() =>
                              openDelete(item)
                            }
                          >
                            <Icon
                              name="trash"
                              size={19}
                            />
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )
              ) : (
                <tr>

                  <td
                    colSpan="5"
                    className="Testimonial__empty"
                  >
                    No testimonials found.
                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* =================================================
            FOOTER PAGINATION
        ================================================= */}

        <div className="Testimonial__tableFooter">

          <div className="Testimonial__showing">

            Showing{" "}
            <strong>
              {filteredTestimonials.length
                ? startIndex + 1
                : 0}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(
                startIndex +
                  itemsPerPage,
                filteredTestimonials.length
              )}
            </strong>{" "}
            of{" "}
            <strong>
              {filteredTestimonials.length}
            </strong>{" "}
            testimonials

          </div>

          <div className="Testimonial__pagination">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    prev - 1
                )
              }
              className="Testimonial__pageButton"
            >
              <Icon
                name="arrowLeft"
                size={17}
              />
            </button>

            {getPages().map(
              (page, index) =>
                page === "..." ? (
                  <span
                    key={`dots-${index}`}
                    className="Testimonial__dots"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    className={`Testimonial__pageButton ${
                      currentPage === page
                        ? "Testimonial__pageActive"
                        : ""
                    }`}
                    onClick={() =>
                      setCurrentPage(
                        page
                      )
                    }
                  >
                    {page}
                  </button>
                )
            )}

            <button
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    prev + 1
                )
              }
              className="Testimonial__pageButton"
            >
              <Icon
                name="arrowRight"
                size={17}
              />
            </button>

          </div>

        </div>

      </div>

      {/* =================================================
          MODAL OVERLAY
      ================================================= */}

      {modalType && (
        <div
          className="Testimonial__overlay"
          onClick={() =>
            setModalType(null)
          }
        >

          {/* =================================================
              ADD / EDIT
          ================================================= */}

          {(modalType === "add" ||
            modalType === "edit") && (
            <div
              className="Testimonial__modal Testimonial__formModal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <button
                className="Testimonial__close"
                onClick={() =>
                  setModalType(null)
                }
              >
                <Icon
                  name="close"
                  size={19}
                />
              </button>

              <div className="Testimonial__modalHeading">

                <div className="Testimonial__modalIcon">
                  <Icon
                    name={
                      modalType === "add"
                        ? "plus"
                        : "edit"
                    }
                    size={24}
                  />
                </div>

                <div>

                  <h2>
                    {modalType === "add"
                      ? "Add Testimonial"
                      : "Edit Testimonial"}
                  </h2>

                  <p>
                    {modalType === "add"
                      ? "Add a new customer testimonial"
                      : "Update testimonial information"}
                  </p>

                </div>

              </div>

              <div className="Testimonial__form">

                {/* IMAGE */}

                <div className="Testimonial__imageUpload">

                  <div className="Testimonial__preview">

                    {form.image ? (
                      <img
                        src={form.image}
                        alt="Preview"
                      />
                    ) : (
                      <div>
                        <Icon
                          name="plus"
                          size={25}
                        />
                      </div>
                    )}

                  </div>

                  <div>

                    <label>
                      Customer Image
                    </label>

                    <p>
                      JPG, PNG or WEBP
                    </p>

                    <label className="Testimonial__uploadButton">

                      Choose Image

                      <input
                        type="file"
                        accept="image/*"
                        onChange={
                          handleImage
                        }
                      />

                    </label>

                  </div>

                </div>

                <div className="Testimonial__formGrid">

                  <div className="Testimonial__field">

                    <label>
                      Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={
                        handleChange
                      }
                      placeholder="Enter customer name"
                    />

                  </div>

                  <div className="Testimonial__field">

                    <label>
                      Designation *
                    </label>

                    <input
                      type="text"
                      name="designation"
                      value={
                        form.designation
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="e.g. Food Expert"
                    />

                  </div>

                  <div className="Testimonial__field">

                    <label>
                      Email *
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={
                        handleChange
                      }
                      placeholder="Enter email address"
                    />

                  </div>

                  <div className="Testimonial__field">

                    <label>
                      Status
                    </label>

                    <select
                      name="status"
                      value={form.status}
                      onChange={
                        handleChange
                      }
                    >
                      <option>
                        Published
                      </option>
                      <option>
                        Pending
                      </option>
                    </select>

                  </div>

                  <div className="Testimonial__field Testimonial__fieldFull">

                    <label>
                      Review *
                    </label>

                    <textarea
                      name="review"
                      rows="5"
                      value={
                        form.review
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Write customer testimonial..."
                    />

                  </div>

                </div>

              </div>

              <div className="Testimonial__modalFooter">

                <button
                  className="Testimonial__cancelButton"
                  onClick={() =>
                    setModalType(null)
                  }
                >
                  Cancel
                </button>

                <button
                  className="Testimonial__saveButton"
                  onClick={
                    modalType === "add"
                      ? handleAdd
                      : handleUpdate
                  }
                >
                  <Icon
                    name="check"
                    size={17}
                  />

                  {modalType === "add"
                    ? "Add Testimonial"
                    : "Save Changes"}
                </button>

              </div>

            </div>
          )}

          {/* =================================================
              VIEW
          ================================================= */}

          {modalType === "view" &&
            selectedTestimonial && (
              <div
                className="Testimonial__modal Testimonial__viewModal"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >

                <button
                  className="Testimonial__close"
                  onClick={() =>
                    setModalType(null)
                  }
                >
                  <Icon
                    name="close"
                    size={19}
                  />
                </button>

                <div className="Testimonial__viewTop">

                  <img
                    src={
                      selectedTestimonial.image
                    }
                    alt={
                      selectedTestimonial.name
                    }
                  />

                  <div>

                    <h2>
                      {
                        selectedTestimonial.name
                      }
                    </h2>

                    <p>
                      {
                        selectedTestimonial.designation
                      }
                    </p>

                    <span>
                      {
                        selectedTestimonial.email
                      }
                    </span>

                  </div>

                </div>

                <div className="Testimonial__viewReview">

                  <div className="Testimonial__quoteIcon">
                    <Icon
                      name="quote"
                      size={25}
                    />
                  </div>

                  <p>
                    {
                      selectedTestimonial.review
                    }
                  </p>

                </div>

                <div className="Testimonial__viewInfo">

                  <div>
                    <span>
                      Status
                    </span>

                    <strong
                      className={
                        selectedTestimonial.status ===
                        "Published"
                          ? "Testimonial__published"
                          : "Testimonial__pending"
                      }
                    >
                      {
                        selectedTestimonial.status
                      }
                    </strong>
                  </div>

                  <div>
                    <span>
                      Added On
                    </span>

                    <strong>
                      {formatDate(
                        selectedTestimonial.date
                      )}
                    </strong>
                  </div>

                </div>

                <div className="Testimonial__modalFooter">

                  <button
                    className="Testimonial__cancelButton"
                    onClick={() =>
                      setModalType(null)
                    }
                  >
                    Close
                  </button>

                  <button
                    className="Testimonial__saveButton"
                    onClick={() =>
                      openEdit(
                        selectedTestimonial
                      )
                    }
                  >
                    <Icon
                      name="edit"
                      size={16}
                    />
                    Edit
                  </button>

                </div>

              </div>
            )}

          {/* =================================================
              DELETE
          ================================================= */}

          {modalType === "delete" &&
            selectedTestimonial && (
              <div
                className="Testimonial__modal Testimonial__deleteModal"
                onClick={(e) =>
                  e.stopPropagation()
                }
              >

                <div className="Testimonial__deleteIcon">
                  <Icon
                    name="trash"
                    size={28}
                  />
                </div>

                <h2>
                  Delete Testimonial?
                </h2>

                <p>
                  Are you sure you want to
                  delete the testimonial
                  from{" "}
                  <strong>
                    {
                      selectedTestimonial.name
                    }
                  </strong>
                  ?
                </p>

                <div className="Testimonial__deleteButtons">

                  <button
                    className="Testimonial__cancelButton"
                    onClick={() =>
                      setModalType(null)
                    }
                  >
                    Cancel
                  </button>

                  <button
                    className="Testimonial__confirmDelete"
                    onClick={
                      handleDelete
                    }
                  >
                    <Icon
                      name="trash"
                      size={16}
                    />
                    Delete
                  </button>

                </div>

              </div>
            )}

        </div>
      )}

    </div>
  );
};

export default Testimonial;