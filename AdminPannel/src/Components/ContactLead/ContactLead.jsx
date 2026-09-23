import React, { useEffect, useMemo, useState } from "react";
import "./ContactLead.css";

const ContactLead = () => {
  /* =====================================================
     DEMO DATA
  ===================================================== */

  const initialLeads = [
    {
      id: 1,
      name: "Rajesh Kumar",
      surname: "",
      email: "rajesh@gmail.com",
      phone: "+91 98765 43210",
      city: "Bhubaneswar",
      message:
        "I would like to know more about your school admission process.",
      date: "2026-09-23",
      status: "New",
    },
    {
      id: 2,
      name: "Priya Sharma",
      surname: "",
      email: "priya@gmail.com",
      phone: "+91 87654 32109",
      city: "Cuttack",
      message:
        "Please share the admission details and available courses.",
      date: "2026-09-22",
      status: "Replied",
    },
    {
      id: 3,
      name: "Amit Patra",
      surname: "",
      email: "amit@gmail.com",
      phone: "+91 76543 21098",
      city: "Kendrapara",
      message:
        "I am interested in your school and would like more information.",
      date: "2026-09-21",
      status: "Pending",
    },
    {
      id: 4,
      name: "Sneha Das",
      surname: "",
      email: "sneha@gmail.com",
      phone: "+91 98760 11122",
      city: "Bhubaneswar",
      message: "Can you provide the complete fee structure?",
      date: "2026-09-20",
      status: "Replied",
    },
    {
      id: 5,
      name: "Vikash Singh",
      surname: "",
      email: "vikash@gmail.com",
      phone: "+91 91234 56789",
      city: "Puri",
      message:
        "I want to schedule a campus visit for my child.",
      date: "2026-09-19",
      status: "New",
    },
    {
      id: 6,
      name: "Anjali Mehta",
      surname: "",
      email: "anjali@gmail.com",
      phone: "+91 99887 66554",
      city: "Cuttack",
      message:
        "Do you have transport facility for students?",
      date: "2026-09-18",
      status: "Pending",
    },
    {
      id: 7,
      name: "Rahul Mishra",
      surname: "",
      email: "rahul@gmail.com",
      phone: "+91 98761 12345",
      city: "Puri",
      message:
        "I want information about the upcoming admission session.",
      date: "2026-09-17",
      status: "New",
    },
    {
      id: 8,
      name: "Neha Sahu",
      surname: "",
      email: "neha@gmail.com",
      phone: "+91 87651 34567",
      city: "Bhubaneswar",
      message:
        "Please let me know about hostel and accommodation facilities.",
      date: "2026-09-16",
      status: "Replied",
    },
    {
      id: 9,
      name: "Sourav Nayak",
      surname: "",
      email: "sourav@gmail.com",
      phone: "+91 76541 22233",
      city: "Aul",
      message:
        "Can you send me the complete school brochure?",
      date: "2026-09-15",
      status: "Pending",
    },
    {
      id: 10,
      name: "Riya Mohanty",
      surname: "",
      email: "riya@gmail.com",
      phone: "+91 98765 77788",
      city: "Cuttack",
      message:
        "I would like to discuss admission with your team.",
      date: "2026-09-14",
      status: "Replied",
    },
    {
      id: 11,
      name: "Manas Behera",
      surname: "",
      email: "manas@gmail.com",
      phone: "+91 91234 88990",
      city: "Kendrapara",
      message:
        "What documents are required during admission?",
      date: "2026-09-13",
      status: "New",
    },
    {
      id: 12,
      name: "Puja Rout",
      surname: "",
      email: "puja@gmail.com",
      phone: "+91 99887 22334",
      city: "Bhubaneswar",
      message:
        "Please tell me the application submission procedure.",
      date: "2026-09-12",
      status: "Pending",
    },
    {
      id: 13,
      name: "Arun Das",
      surname: "",
      email: "arun@gmail.com",
      phone: "+91 98765 99887",
      city: "Puri",
      message:
        "I need information about the school timings.",
      date: "2026-09-11",
      status: "New",
    },
    {
      id: 14,
      name: "Sweta Jena",
      surname: "",
      email: "sweta@gmail.com",
      phone: "+91 87654 11223",
      city: "Cuttack",
      message:
        "Is there any scholarship available for students?",
      date: "2026-09-10",
      status: "Replied",
    },
  ];

  /* =====================================================
     STATES
  ===================================================== */

  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem("contactLeadData");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialLeads;
      }
    }

    return initialLeads;
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [calendarType, setCalendarType] = useState(null);

  const [selectedIds, setSelectedIds] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [viewLead, setViewLead] = useState(null);
  const [editLead, setEditLead] = useState(null);
  const [deleteLead, setDeleteLead] = useState(null);

  const [showBulkDelete, setShowBulkDelete] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    message: "",
    status: "New",
  });

  const ITEMS_PER_PAGE = 6;

  /* =====================================================
     SAVE LOCAL DATA
  ===================================================== */

  useEffect(() => {
    localStorage.setItem(
      "contactLeadData",
      JSON.stringify(leads)
    );
  }, [leads]);

  /* =====================================================
     STATISTICS
  ===================================================== */

  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const repliedLeads = leads.filter(
    (lead) => lead.status === "Replied"
  ).length;

  const pendingLeads = leads.filter(
    (lead) => lead.status === "Pending"
  ).length;

  /* =====================================================
     FORMAT DATE
  ===================================================== */

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  /* =====================================================
     FILTER DATA
  ===================================================== */

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        lead.name.toLowerCase().includes(searchText) ||
        lead.email.toLowerCase().includes(searchText) ||
        lead.message.toLowerCase().includes(searchText) ||
        lead.phone.toLowerCase().includes(searchText) ||
        lead.city.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All Status" ||
        lead.status === statusFilter;

      const matchesFrom =
        !fromDate || lead.date >= fromDate;

      const matchesTo =
        !toDate || lead.date <= toDate;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [
    leads,
    search,
    statusFilter,
    fromDate,
    toDate,
  ]);

  /* =====================================================
     PAGINATION
  ===================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredLeads.length / ITEMS_PER_PAGE
    )
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const currentLeads = filteredLeads.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  /* =====================================================
     SELECT ALL
  ===================================================== */

  const currentIds = currentLeads.map(
    (lead) => lead.id
  );

  const allCurrentSelected =
    currentIds.length > 0 &&
    currentIds.every((id) =>
      selectedIds.includes(id)
    );

  const handleSelectAll = () => {
    if (allCurrentSelected) {
      setSelectedIds((prev) =>
        prev.filter(
          (id) => !currentIds.includes(id)
        )
      );
    } else {
      setSelectedIds((prev) => [
        ...new Set([...prev, ...currentIds]),
      ]);
    }
  };

  /* =====================================================
     SELECT SINGLE
  ===================================================== */

  const handleSelectSingle = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  /* =====================================================
     SEARCH
  ===================================================== */

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  /* =====================================================
     FILTER
  ===================================================== */

  const handleFilter = () => {
    setCurrentPage(1);
    setCalendarType(null);
  };

  /* =====================================================
     RESET
  ===================================================== */

  const handleReset = () => {
    setSearch("");
    setStatusFilter("All Status");
    setFromDate("");
    setToDate("");
    setCurrentPage(1);
    setCalendarType(null);
  };

  /* =====================================================
     REFRESH
  ===================================================== */

  const handleRefresh = () => {
    setSearch("");
    setStatusFilter("All Status");
    setFromDate("");
    setToDate("");
    setSelectedIds([]);
    setCurrentPage(1);
  };

  /* =====================================================
     DELETE
  ===================================================== */

  const confirmDelete = () => {
    if (!deleteLead) return;

    setLeads((prev) =>
      prev.filter(
        (lead) => lead.id !== deleteLead.id
      )
    );

    setSelectedIds((prev) =>
      prev.filter(
        (id) => id !== deleteLead.id
      )
    );

    setDeleteLead(null);
  };

  /* =====================================================
     BULK DELETE
  ===================================================== */

  const confirmBulkDelete = () => {
    setLeads((prev) =>
      prev.filter(
        (lead) => !selectedIds.includes(lead.id)
      )
    );

    setSelectedIds([]);
    setShowBulkDelete(false);
  };

  /* =====================================================
     OPEN EDIT
  ===================================================== */

  const openEdit = (lead) => {
    setEditLead(lead);

    setEditForm({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      city: lead.city,
      message: lead.message,
      status: lead.status,
    });
  };

  /* =====================================================
     EDIT CHANGE
  ===================================================== */

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* =====================================================
     SAVE EDIT
  ===================================================== */

  const handleSaveEdit = () => {
    if (!editLead) return;

    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === editLead.id
          ? {
              ...lead,
              ...editForm,
            }
          : lead
      )
    );

    setEditLead(null);
  };

  /* =====================================================
     EXPORT CSV
  ===================================================== */

  const handleExportCSV = () => {
    if (filteredLeads.length === 0) {
      alert("No data available to export.");
      return;
    }

    const headers = [
      "Name",
      "Email",
      "Phone",
      "City",
      "Message",
      "Date",
      "Status",
    ];

    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.email,
      lead.phone,
      lead.city,
      `"${lead.message.replace(/"/g, '""')}"`,
      formatDate(lead.date),
      lead.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "contact-leads.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =====================================================
     PAGINATION NUMBERS
  ===================================================== */

  const getPageNumbers = () => {
    if (totalPages <= 6) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1
      );
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

  /* =====================================================
     CALENDAR
  ===================================================== */

  const today = new Date();

  const [calendarMonth, setCalendarMonth] = useState(
    today.getMonth()
  );

  const [calendarYear, setCalendarYear] = useState(
    today.getFullYear()
  );

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
    const firstDay = new Date(
      calendarYear,
      calendarMonth,
      1
    ).getDay();

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

  const changeCalendarMonth = (direction) => {
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

  const selectCalendarDate = (day, outside) => {
    if (outside) return;

    const month = String(calendarMonth + 1).padStart(
      2,
      "0"
    );

    const date = String(day).padStart(2, "0");

    const selectedDate = `${calendarYear}-${month}-${date}`;

    if (calendarType === "from") {
      setFromDate(selectedDate);
    } else {
      setToDate(selectedDate);
    }

    setCalendarType(null);
    setCurrentPage(1);
  };

  const openCalendar = (type) => {
    setCalendarType(
      calendarType === type ? null : type
    );

    const selected =
      type === "from" ? fromDate : toDate;

    if (selected) {
      const date = new Date(
        `${selected}T00:00:00`
      );

      setCalendarMonth(date.getMonth());
      setCalendarYear(date.getFullYear());
    } else {
      const now = new Date();

      setCalendarMonth(now.getMonth());
      setCalendarYear(now.getFullYear());
    }
  };

  /* =====================================================
     CALENDAR SELECTED CHECK
  ===================================================== */

  const isSelectedCalendarDate = (day) => {
    const month = String(calendarMonth + 1).padStart(
      2,
      "0"
    );

    const date = String(day).padStart(2, "0");

    const value = `${calendarYear}-${month}-${date}`;

    return (
      value === fromDate ||
      value === toDate
    );
  };

  /* =====================================================
     ICONS
  ===================================================== */

  const Icon = ({ type, size = 20 }) => {
    const common = {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    };

    if (type === "mail") {
      return (
        <svg {...common}>
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
          />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    }

    if (type === "users") {
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    }

    if (type === "check") {
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 2.5 2.5L16 9" />
        </svg>
      );
    }

    if (type === "clock") {
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    }

    if (type === "search") {
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      );
    }

    if (type === "calendar") {
      return (
        <svg {...common}>
          <rect
            x="3"
            y="4"
            width="18"
            height="17"
            rx="2"
          />
          <path d="M16 2v4M8 2v4M3 9h18" />
        </svg>
      );
    }

    if (type === "filter") {
      return (
        <svg {...common}>
          <path d="M4 5h16l-6 7v6l-4 2v-8z" />
        </svg>
      );
    }

    if (type === "refresh") {
      return (
        <svg {...common}>
          <path d="M20 11a8 8 0 0 0-14.7-4L3 10" />
          <path d="M3 5v5h5" />
          <path d="M4 13a8 8 0 0 0 14.7 4L21 14" />
          <path d="M21 19v-5h-5" />
        </svg>
      );
    }

    if (type === "download") {
      return (
        <svg {...common}>
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M4 21h16" />
        </svg>
      );
    }

    if (type === "eye") {
      return (
        <svg {...common}>
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    }

    if (type === "edit") {
      return (
        <svg {...common}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
        </svg>
      );
    }

    if (type === "delete") {
      return (
        <svg {...common}>
          <path d="M4 7h16" />
          <path d="M10 11v6M14 11v6" />
          <path d="M6 7l1 14h10l1-14" />
          <path d="M9 7V4h6v3" />
        </svg>
      );
    }

    if (type === "arrowLeft") {
      return (
        <svg {...common}>
          <path d="m15 18-6-6 6-6" />
        </svg>
      );
    }

    if (type === "arrowRight") {
      return (
        <svg {...common}>
          <path d="m9 18 6-6-6-6" />
        </svg>
      );
    }

    if (type === "close") {
      return (
        <svg {...common}>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      );
    }

    if (type === "home") {
      return (
        <svg {...common}>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v11h14V9" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );
    }

    return null;
  };

  return (
    <div className="ContactLead">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="ContactLead__header">

        <div className="ContactLead__header-left">

          <div className="ContactLead__header-icon">
            <Icon type="mail" size={31} />
          </div>

          <div>
            <h1>Contact Leads</h1>
            <p>
              Manage and view all contact form inquiries
            </p>
          </div>

        </div>

        <div className="ContactLead__breadcrumb">

          <span>
            <Icon type="home" size={17} />
            Dashboard
          </span>

          <Icon type="arrowRight" size={16} />

          <strong>Contact Leads</strong>

        </div>

      </div>

      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="ContactLead__stats">

        <div className="ContactLead__stat-card">

          <div className="ContactLead__stat-icon ContactLead__stat-icon--blue">
            <Icon type="users" size={28} />
          </div>

          <div className="ContactLead__stat-content">
            <span>Total Leads</span>

            <div className="ContactLead__stat-value-row">
              <strong>{totalLeads}</strong>
              <small className="ContactLead__growth ContactLead__growth--green">
                ↗ +12%
              </small>
            </div>

            <p>All time inquiries</p>
          </div>

        </div>

        <div className="ContactLead__stat-card">

          <div className="ContactLead__stat-icon ContactLead__stat-icon--green">
            <Icon type="mail" size={28} />
          </div>

          <div className="ContactLead__stat-content">
            <span>New Leads</span>

            <div className="ContactLead__stat-value-row">
              <strong>{newLeads}</strong>
              <small className="ContactLead__growth ContactLead__growth--green">
                ↗ +8%
              </small>
            </div>

            <p>This month</p>
          </div>

        </div>

        <div className="ContactLead__stat-card">

          <div className="ContactLead__stat-icon ContactLead__stat-icon--orange">
            <Icon type="check" size={28} />
          </div>

          <div className="ContactLead__stat-content">
            <span>Replied</span>

            <div className="ContactLead__stat-value-row">
              <strong>{repliedLeads}</strong>
              <small className="ContactLead__growth ContactLead__growth--green">
                ↗ +18%
              </small>
            </div>

            <p>Total responded</p>
          </div>

        </div>

        <div className="ContactLead__stat-card">

          <div className="ContactLead__stat-icon ContactLead__stat-icon--red">
            <Icon type="clock" size={28} />
          </div>

          <div className="ContactLead__stat-content">
            <span>Pending</span>

            <div className="ContactLead__stat-value-row">
              <strong>{pendingLeads}</strong>
              <small className="ContactLead__growth ContactLead__growth--red">
                ↘ -5%
              </small>
            </div>

            <p>Awaiting response</p>
          </div>

        </div>

      </div>

      {/* =================================================
          FILTER AREA
      ================================================= */}

      <div className="ContactLead__filter-card">

        <div className="ContactLead__filter-field ContactLead__search-field">

          <label>Search</label>

          <div className="ContactLead__input-wrapper">

            <Icon type="search" size={19} />

            <input
              type="text"
              placeholder="Search by name, email or message..."
              value={search}
              onChange={(e) =>
                handleSearch(e.target.value)
              }
            />

          </div>

        </div>

        <div className="ContactLead__filter-field">

          <label>Status</label>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option>All Status</option>
            <option>New</option>
            <option>Replied</option>
            <option>Pending</option>
          </select>

        </div>

        {/* FROM DATE */}

        <div className="ContactLead__filter-field ContactLead__calendar-field">

          <label>From Date</label>

          <button
            type="button"
            className="ContactLead__date-input"
            onClick={() => openCalendar("from")}
          >
            <span>
              {fromDate
                ? formatDate(fromDate)
                : "dd-mm-yyyy"}
            </span>

            <Icon type="calendar" size={18} />
          </button>

          {calendarType === "from" && (
            <div className="ContactLead__calendar">

              <div className="ContactLead__calendar-header">

                <button
                  type="button"
                  onClick={() =>
                    changeCalendarMonth("prev")
                  }
                >
                  <Icon type="arrowLeft" size={17} />
                </button>

                <strong>
                  {monthNames[calendarMonth]}{" "}
                  {calendarYear}
                </strong>

                <button
                  type="button"
                  onClick={() =>
                    changeCalendarMonth("next")
                  }
                >
                  <Icon type="arrowRight" size={17} />
                </button>

              </div>

              <div className="ContactLead__calendar-weekdays">
                {[
                  "Su",
                  "Mo",
                  "Tu",
                  "We",
                  "Th",
                  "Fr",
                  "Sa",
                ].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>

              <div className="ContactLead__calendar-days">
                {getCalendarDays().map(
                  (item, index) => (
                    <button
                      type="button"
                      key={index}
                      disabled={item.outside}
                      className={
                        isSelectedCalendarDate(
                          item.day
                        )
                          ? "ContactLead__calendar-day--selected"
                          : ""
                      }
                      onClick={() =>
                        selectCalendarDate(
                          item.day,
                          item.outside
                        )
                      }
                    >
                      {item.day}
                    </button>
                  )
                )}
              </div>

            </div>
          )}

        </div>

        {/* TO DATE */}

        <div className="ContactLead__filter-field ContactLead__calendar-field">

          <label>To Date</label>

          <button
            type="button"
            className="ContactLead__date-input"
            onClick={() => openCalendar("to")}
          >
            <span>
              {toDate
                ? formatDate(toDate)
                : "dd-mm-yyyy"}
            </span>

            <Icon type="calendar" size={18} />
          </button>

          {calendarType === "to" && (
            <div className="ContactLead__calendar">

              <div className="ContactLead__calendar-header">

                <button
                  type="button"
                  onClick={() =>
                    changeCalendarMonth("prev")
                  }
                >
                  <Icon type="arrowLeft" size={17} />
                </button>

                <strong>
                  {monthNames[calendarMonth]}{" "}
                  {calendarYear}
                </strong>

                <button
                  type="button"
                  onClick={() =>
                    changeCalendarMonth("next")
                  }
                >
                  <Icon type="arrowRight" size={17} />
                </button>

              </div>

              <div className="ContactLead__calendar-weekdays">
                {[
                  "Su",
                  "Mo",
                  "Tu",
                  "We",
                  "Th",
                  "Fr",
                  "Sa",
                ].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>

              <div className="ContactLead__calendar-days">
                {getCalendarDays().map(
                  (item, index) => (
                    <button
                      type="button"
                      key={index}
                      disabled={item.outside}
                      className={
                        isSelectedCalendarDate(
                          item.day
                        )
                          ? "ContactLead__calendar-day--selected"
                          : ""
                      }
                      onClick={() =>
                        selectCalendarDate(
                          item.day,
                          item.outside
                        )
                      }
                    >
                      {item.day}
                    </button>
                  )
                )}
              </div>

            </div>
          )}

        </div>

        <div className="ContactLead__filter-buttons">

          <button
            type="button"
            className="ContactLead__filter-button"
            onClick={handleFilter}
          >
            <Icon type="filter" size={18} />
            Filter
          </button>

          <button
            type="button"
            className="ContactLead__reset-button"
            onClick={handleReset}
          >
            <Icon type="refresh" size={17} />
            Reset
          </button>

        </div>

      </div>

      {/* =================================================
          LEADS LIST
      ================================================= */}

      <div className="ContactLead__list-card">

        <div className="ContactLead__list-header">

          <div className="ContactLead__list-title">

            <div className="ContactLead__list-title-icon">
              <Icon type="users" size={25} />
            </div>

            <h2>Contact Leads List</h2>

          </div>

          <div className="ContactLead__list-actions">

            <button
              type="button"
              className="ContactLead__export-button"
              onClick={handleExportCSV}
            >
              <Icon type="download" size={18} />
              Export CSV
            </button>

            <button
              type="button"
              className="ContactLead__delete-selected-button"
              disabled={selectedIds.length === 0}
              onClick={() =>
                setShowBulkDelete(true)
              }
            >
              <Icon type="delete" size={18} />
              Delete Selected
            </button>

            <button
              type="button"
              className="ContactLead__refresh-button"
              onClick={handleRefresh}
              title="Refresh"
            >
              <Icon type="refresh" size={19} />
            </button>

          </div>

        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="ContactLead__table-wrapper">

          <table className="ContactLead__table">

            <thead>

              <tr>

                <th className="ContactLead__checkbox-column">

                  <label className="ContactLead__checkbox">

                    <input
                      type="checkbox"
                      checked={allCurrentSelected}
                      onChange={handleSelectAll}
                    />

                    <span></span>

                  </label>

                </th>

                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {currentLeads.length > 0 ? (
                currentLeads.map(
                  (lead, index) => (
                    <tr key={lead.id}>

                      <td>

                        <label className="ContactLead__checkbox">

                          <input
                            type="checkbox"
                            checked={selectedIds.includes(
                              lead.id
                            )}
                            onChange={() =>
                              handleSelectSingle(
                                lead.id
                              )
                            }
                          />

                          <span></span>

                        </label>

                      </td>

                      <td>
                        {startIndex + index + 1}
                      </td>

                      <td>
                        <div className="ContactLead__name">
                          {lead.name}
                        </div>
                      </td>

                      <td>
                        <span className="ContactLead__email">
                          {lead.email}
                        </span>
                      </td>

                      <td>
                        <span className="ContactLead__phone">
                          {lead.phone}
                        </span>
                      </td>

                      <td>
                        <span className="ContactLead__city">
                          {lead.city}
                        </span>
                      </td>

                      <td>

                        <div
                          className="ContactLead__message"
                          title={lead.message}
                        >
                          {lead.message}
                        </div>

                      </td>

                      <td>
                        <span className="ContactLead__date">
                          {formatDate(lead.date)}
                        </span>
                      </td>

                      <td>

                        <span
                          className={`ContactLead__status ContactLead__status--${lead.status.toLowerCase()}`}
                        >
                          {lead.status}
                        </span>

                      </td>

                      <td>

                        <div className="ContactLead__row-actions">

                          {/* VIEW */}

                          <button
                            type="button"
                            className="ContactLead__row-action ContactLead__row-action--view"
                            title="View"
                            onClick={() =>
                              setViewLead(lead)
                            }
                          >
                            <Icon
                              type="eye"
                              size={17}
                            />
                          </button>

                          {/* EDIT */}

                          <button
                            type="button"
                            className="ContactLead__row-action ContactLead__row-action--edit"
                            title="Edit"
                            onClick={() =>
                              openEdit(lead)
                            }
                          >
                            <Icon
                              type="edit"
                              size={17}
                            />
                          </button>

                          {/* DELETE */}

                          <button
                            type="button"
                            className="ContactLead__row-action ContactLead__row-action--delete"
                            title="Delete"
                            onClick={() =>
                              setDeleteLead(lead)
                            }
                          >
                            <Icon
                              type="delete"
                              size={17}
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
                    colSpan="10"
                    className="ContactLead__empty"
                  >
                    <div className="ContactLead__empty-content">

                      <div className="ContactLead__empty-icon">
                        <Icon
                          type="mail"
                          size={30}
                        />
                      </div>

                      <h3>
                        No contact leads found
                      </h3>

                      <p>
                        Try changing your search or
                        filter options.
                      </p>

                    </div>
                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* =================================================
            PAGINATION
        ================================================= */}

        <div className="ContactLead__pagination-wrapper">

          <div className="ContactLead__pagination-info">

            Showing{" "}
            <strong>
              {filteredLeads.length === 0
                ? 0
                : startIndex + 1}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(
                startIndex + ITEMS_PER_PAGE,
                filteredLeads.length
              )}
            </strong>{" "}
            of{" "}
            <strong>{filteredLeads.length}</strong>{" "}
            entries

          </div>

          {totalPages > 1 && (
            <div className="ContactLead__pagination">

              <button
                type="button"
                disabled={currentPage === 1}
                className="ContactLead__page-button ContactLead__page-button--arrow"
                onClick={() =>
                  setCurrentPage(
                    (prev) => prev - 1
                  )
                }
              >
                <Icon
                  type="arrowLeft"
                  size={17}
                />
              </button>

              {getPageNumbers().map(
                (page, index) => {
                  if (page === "...") {
                    return (
                      <span
                        key={`dots-${index}`}
                        className="ContactLead__pagination-dots"
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      type="button"
                      key={page}
                      className={`ContactLead__page-button ${
                        currentPage === page
                          ? "ContactLead__page-button--active"
                          : ""
                      }`}
                      onClick={() =>
                        setCurrentPage(page)
                      }
                    >
                      {page}
                    </button>
                  );
                }
              )}

              <button
                type="button"
                disabled={
                  currentPage === totalPages
                }
                className="ContactLead__page-button ContactLead__page-button--arrow"
                onClick={() =>
                  setCurrentPage(
                    (prev) => prev + 1
                  )
                }
              >
                <Icon
                  type="arrowRight"
                  size={17}
                />
              </button>

            </div>
          )}

        </div>

      </div>

      {/* =================================================
          VIEW MODAL
      ================================================= */}

      {viewLead && (
        <div
          className="ContactLead__modal-overlay"
          onClick={() => setViewLead(null)}
        >

          <div
            className="ContactLead__view-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="ContactLead__modal-close"
              onClick={() =>
                setViewLead(null)
              }
            >
              <Icon type="close" size={18} />
            </button>

            <div className="ContactLead__modal-heading">

              <div className="ContactLead__modal-icon ContactLead__modal-icon--blue">
                <Icon type="eye" size={25} />
              </div>

              <div>
                <h3>Lead Details</h3>
                <p>
                  Complete contact inquiry information
                </p>
              </div>

            </div>

            <div className="ContactLead__view-grid">

              <div className="ContactLead__view-item">
                <span>Name</span>
                <strong>{viewLead.name}</strong>
              </div>

              <div className="ContactLead__view-item">
                <span>Email</span>
                <strong>{viewLead.email}</strong>
              </div>

              <div className="ContactLead__view-item">
                <span>Phone</span>
                <strong>{viewLead.phone}</strong>
              </div>

              <div className="ContactLead__view-item">
                <span>City</span>
                <strong>{viewLead.city}</strong>
              </div>

              <div className="ContactLead__view-item">
                <span>Date</span>
                <strong>
                  {formatDate(viewLead.date)}
                </strong>
              </div>

              <div className="ContactLead__view-item">
                <span>Status</span>

                <span
                  className={`ContactLead__status ContactLead__status--${viewLead.status.toLowerCase()}`}
                >
                  {viewLead.status}
                </span>

              </div>

            </div>

            <div className="ContactLead__message-box">

              <span>Message</span>

              <p>{viewLead.message}</p>

            </div>

            <div className="ContactLead__view-footer">

              <button
                type="button"
                className="ContactLead__modal-secondary"
                onClick={() =>
                  setViewLead(null)
                }
              >
                Close
              </button>

              <button
                type="button"
                className="ContactLead__modal-primary"
                onClick={() => {
                  setViewLead(null);
                  openEdit(viewLead);
                }}
              >
                <Icon type="edit" size={17} />
                Edit Lead
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =================================================
          EDIT MODAL
      ================================================= */}

      {editLead && (
        <div
          className="ContactLead__modal-overlay"
          onClick={() => setEditLead(null)}
        >

          <div
            className="ContactLead__edit-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="ContactLead__modal-close"
              onClick={() =>
                setEditLead(null)
              }
            >
              <Icon type="close" size={18} />
            </button>

            <div className="ContactLead__modal-heading">

              <div className="ContactLead__modal-icon ContactLead__modal-icon--green">
                <Icon type="edit" size={25} />
              </div>

              <div>
                <h3>Edit Contact Lead</h3>
                <p>
                  Update the lead information
                </p>
              </div>

            </div>

            <div className="ContactLead__edit-grid">

              <div className="ContactLead__edit-field">

                <label>Name</label>

                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) =>
                    handleEditChange(
                      "name",
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="ContactLead__edit-field">

                <label>Email</label>

                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) =>
                    handleEditChange(
                      "email",
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="ContactLead__edit-field">

                <label>Phone</label>

                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) =>
                    handleEditChange(
                      "phone",
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="ContactLead__edit-field">

                <label>City</label>

                <input
                  type="text"
                  value={editForm.city}
                  onChange={(e) =>
                    handleEditChange(
                      "city",
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="ContactLead__edit-field ContactLead__edit-field--full">

                <label>Status</label>

                <select
                  value={editForm.status}
                  onChange={(e) =>
                    handleEditChange(
                      "status",
                      e.target.value
                    )
                  }
                >
                  <option>New</option>
                  <option>Pending</option>
                  <option>Replied</option>
                </select>

              </div>

              <div className="ContactLead__edit-field ContactLead__edit-field--full">

                <label>Message</label>

                <textarea
                  rows="5"
                  value={editForm.message}
                  onChange={(e) =>
                    handleEditChange(
                      "message",
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            <div className="ContactLead__view-footer">

              <button
                type="button"
                className="ContactLead__modal-secondary"
                onClick={() =>
                  setEditLead(null)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="ContactLead__modal-primary"
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =================================================
          DELETE MODAL
      ================================================= */}

      {deleteLead && (
        <div
          className="ContactLead__modal-overlay"
          onClick={() => setDeleteLead(null)}
        >

          <div
            className="ContactLead__delete-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="ContactLead__modal-close"
              onClick={() =>
                setDeleteLead(null)
              }
            >
              <Icon type="close" size={18} />
            </button>

            <div className="ContactLead__delete-icon">
              <Icon type="delete" size={31} />
            </div>

            <h3>Delete Contact Lead?</h3>

            <p>
              Are you sure you want to delete{" "}
              <strong>
                {deleteLead.name}
              </strong>
              's contact inquiry? This action
              cannot be undone.
            </p>

            <div className="ContactLead__delete-actions">

              <button
                type="button"
                className="ContactLead__cancel-delete"
                onClick={() =>
                  setDeleteLead(null)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="ContactLead__confirm-delete"
                onClick={confirmDelete}
              >
                <Icon type="delete" size={17} />
                Delete Lead
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =================================================
          BULK DELETE MODAL
      ================================================= */}

      {showBulkDelete && (
        <div
          className="ContactLead__modal-overlay"
          onClick={() =>
            setShowBulkDelete(false)
          }
        >

          <div
            className="ContactLead__delete-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="ContactLead__modal-close"
              onClick={() =>
                setShowBulkDelete(false)
              }
            >
              <Icon type="close" size={18} />
            </button>

            <div className="ContactLead__delete-icon">
              <Icon type="delete" size={31} />
            </div>

            <h3>
              Delete Selected Leads?
            </h3>

            <p>
              You have selected{" "}
              <strong>
                {selectedIds.length}
              </strong>{" "}
              contact leads. Are you sure you
              want to delete them?
            </p>

            <div className="ContactLead__delete-actions">

              <button
                type="button"
                className="ContactLead__cancel-delete"
                onClick={() =>
                  setShowBulkDelete(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="ContactLead__confirm-delete"
                onClick={confirmBulkDelete}
              >
                <Icon type="delete" size={17} />
                Delete Selected
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default ContactLead;