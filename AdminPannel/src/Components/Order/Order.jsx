import React, { useEffect, useMemo, useState } from "react";
import "./Order.css";

const Order = () => {
  /* =========================================================
     DEMO ORDER DATA
  ========================================================= */

  const initialOrders = [
    {
      id: 1,
      orderId: "#ORD1001",
      customer: "Rahul Sharma",
      email: "rahul@gmail.com",
      items: [
        {
          name: "Classic Burger",
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&q=80",
        },
        {
          name: "French Fries",
          image:
            "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=100&q=80",
        },
        {
          name: "Cold Drink",
          image:
            "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=100&q=80",
        },
      ],
      moreItems: 2,
      total: 520,
      payment: "Paid",
      status: "Delivered",
      date: "2026-09-23",
      time: "10:45 AM",
      address: "Bhubaneswar, Odisha",
    },
    {
      id: 2,
      orderId: "#ORD1002",
      customer: "Priya Mehta",
      email: "priya@gmail.com",
      items: [
        {
          name: "Pizza",
          image:
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=100&q=80",
        },
        {
          name: "Cold Drink",
          image:
            "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=100&q=80",
        },
      ],
      moreItems: 1,
      total: 350,
      payment: "Paid",
      status: "Pending",
      date: "2026-09-22",
      time: "08:20 PM",
      address: "Cuttack, Odisha",
    },
    {
      id: 3,
      orderId: "#ORD1003",
      customer: "Amit Kumar",
      email: "amit@gmail.com",
      items: [
        {
          name: "Rice Bowl",
          image:
            "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&q=80",
        },
        {
          name: "Cold Drink",
          image:
            "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=100&q=80",
        },
      ],
      moreItems: 3,
      total: 780,
      payment: "COD",
      status: "Out for Delivery",
      date: "2026-09-22",
      time: "06:15 PM",
      address: "Kendrapara, Odisha",
    },
    {
      id: 4,
      orderId: "#ORD1004",
      customer: "Sneha Patel",
      email: "sneha@gmail.com",
      items: [
        {
          name: "Burger",
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&q=80",
        },
        {
          name: "French Fries",
          image:
            "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=100&q=80",
        },
      ],
      moreItems: 2,
      total: 410,
      payment: "Paid",
      status: "Preparing",
      date: "2026-09-21",
      time: "01:30 PM",
      address: "Bhubaneswar, Odisha",
    },
    {
      id: 5,
      orderId: "#ORD1005",
      customer: "Vikram Singh",
      email: "vikram@gmail.com",
      items: [
        {
          name: "Pizza",
          image:
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=100&q=80",
        },
        {
          name: "Cold Drink",
          image:
            "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=100&q=80",
        },
      ],
      moreItems: 1,
      total: 299,
      payment: "Paid",
      status: "Delivered",
      date: "2026-09-20",
      time: "11:10 AM",
      address: "Puri, Odisha",
    },
    {
      id: 6,
      orderId: "#ORD1006",
      customer: "Neha Reddy",
      email: "neha@gmail.com",
      items: [
        {
          name: "Rice Bowl",
          image:
            "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&q=80",
        },
        {
          name: "Cold Drink",
          image:
            "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=100&q=80",
        },
      ],
      moreItems: 4,
      total: 890,
      payment: "COD",
      status: "Cancelled",
      date: "2026-09-19",
      time: "09:25 PM",
      address: "Cuttack, Odisha",
    },
    {
      id: 7,
      orderId: "#ORD1007",
      customer: "Ankit Das",
      email: "ankit@gmail.com",
      items: [
        {
          name: "Burger",
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&q=80",
        },
      ],
      moreItems: 1,
      total: 430,
      payment: "Paid",
      status: "Preparing",
      date: "2026-09-18",
      time: "07:30 PM",
      address: "Puri, Odisha",
    },
    {
      id: 8,
      orderId: "#ORD1008",
      customer: "Riya Mohanty",
      email: "riya@gmail.com",
      items: [
        {
          name: "Pizza",
          image:
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=100&q=80",
        },
      ],
      moreItems: 2,
      total: 650,
      payment: "Paid",
      status: "Delivered",
      date: "2026-09-17",
      time: "04:20 PM",
      address: "Cuttack, Odisha",
    },
    {
      id: 9,
      orderId: "#ORD1009",
      customer: "Sourav Nayak",
      email: "sourav@gmail.com",
      items: [
        {
          name: "Rice Bowl",
          image:
            "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=100&q=80",
        },
      ],
      moreItems: 2,
      total: 590,
      payment: "COD",
      status: "Out for Delivery",
      date: "2026-09-16",
      time: "02:10 PM",
      address: "Aul, Odisha",
    },
    {
      id: 10,
      orderId: "#ORD1010",
      customer: "Puja Rout",
      email: "puja@gmail.com",
      items: [
        {
          name: "Burger",
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&q=80",
        },
      ],
      moreItems: 3,
      total: 740,
      payment: "Paid",
      status: "Pending",
      date: "2026-09-15",
      time: "08:45 PM",
      address: "Bhubaneswar, Odisha",
    },
    {
      id: 11,
      orderId: "#ORD1011",
      customer: "Manas Behera",
      email: "manas@gmail.com",
      items: [
        {
          name: "Pizza",
          image:
            "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=100&q=80",
        },
      ],
      moreItems: 1,
      total: 370,
      payment: "Paid",
      status: "Delivered",
      date: "2026-09-14",
      time: "01:10 PM",
      address: "Kendrapara, Odisha",
    },
    {
      id: 12,
      orderId: "#ORD1012",
      customer: "Sweta Jena",
      email: "sweta@gmail.com",
      items: [
        {
          name: "Burger",
          image:
            "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&q=80",
        },
      ],
      moreItems: 2,
      total: 480,
      payment: "COD",
      status: "Cancelled",
      date: "2026-09-13",
      time: "09:15 AM",
      address: "Puri, Odisha",
    },
  ];

  /* =========================================================
     STATES
  ========================================================= */

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("foodOrderData");

    if (savedOrders) {
      try {
        return JSON.parse(savedOrders);
      } catch {
        return initialOrders;
      }
    }

    return initialOrders;
  });

  const [search, setSearch] = useState("");
  const [orderStatus, setOrderStatus] =
    useState("All Status");

  const [paymentStatus, setPaymentStatus] =
    useState("All Payments");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [calendarType, setCalendarType] =
    useState(null);

  const [calendarMonth, setCalendarMonth] =
    useState(new Date().getMonth());

  const [calendarYear, setCalendarYear] =
    useState(new Date().getFullYear());

  const [selectedOrders, setSelectedOrders] =
    useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [viewOrder, setViewOrder] = useState(null);
  const [editOrder, setEditOrder] = useState(null);
  const [deleteOrder, setDeleteOrder] = useState(null);

  const [bulkDelete, setBulkDelete] =
    useState(false);

  const [editForm, setEditForm] = useState({
    customer: "",
    email: "",
    total: "",
    payment: "Paid",
    status: "Pending",
    address: "",
  });

  const ITEMS_PER_PAGE = 6;

  /* =========================================================
     SAVE LOCAL DATA
  ========================================================= */

  useEffect(() => {
    localStorage.setItem(
      "foodOrderData",
      JSON.stringify(orders)
    );
  }, [orders]);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const totalOrders = orders.length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const pendingOrders = orders.filter(
    (order) =>
      order.status === "Pending" ||
      order.status === "Preparing"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  /* =========================================================
     FILTER
  ========================================================= */

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        order.orderId
          .toLowerCase()
          .includes(searchValue) ||
        order.customer
          .toLowerCase()
          .includes(searchValue) ||
        order.email
          .toLowerCase()
          .includes(searchValue) ||
        order.items.some((item) =>
          item.name
            .toLowerCase()
            .includes(searchValue)
        );

      const matchesOrderStatus =
        orderStatus === "All Status" ||
        order.status === orderStatus;

      const matchesPayment =
        paymentStatus === "All Payments" ||
        order.payment === paymentStatus;

      const matchesFrom =
        !fromDate || order.date >= fromDate;

      const matchesTo =
        !toDate || order.date <= toDate;

      return (
        matchesSearch &&
        matchesOrderStatus &&
        matchesPayment &&
        matchesFrom &&
        matchesTo
      );
    });
  }, [
    orders,
    search,
    orderStatus,
    paymentStatus,
    fromDate,
    toDate,
  ]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredOrders.length / ITEMS_PER_PAGE
    )
  );

  const startIndex =
    (currentPage - 1) * ITEMS_PER_PAGE;

  const currentOrders = filteredOrders.slice(
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

  const currentOrderIds = currentOrders.map(
    (order) => order.id
  );

  const allSelected =
    currentOrderIds.length > 0 &&
    currentOrderIds.every((id) =>
      selectedOrders.includes(id)
    );

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedOrders((prev) =>
        prev.filter(
          (id) => !currentOrderIds.includes(id)
        )
      );
    } else {
      setSelectedOrders((prev) => [
        ...new Set([
          ...prev,
          ...currentOrderIds,
        ]),
      ]);
    }
  };

  /* =========================================================
     SINGLE SELECT
  ========================================================= */

  const handleSelectOrder = (id) => {
    setSelectedOrders((prev) =>
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
    setOrderStatus("All Status");
    setPaymentStatus("All Payments");
    setFromDate("");
    setToDate("");
    setCurrentPage(1);
    setCalendarType(null);
  };

  /* =========================================================
     REFRESH
  ========================================================= */

  const handleRefresh = () => {
    setSelectedOrders([]);
    setCurrentPage(1);
    setCalendarType(null);
  };

  /* =========================================================
     DELETE SINGLE
  ========================================================= */

  const confirmDelete = () => {
    if (!deleteOrder) return;

    setOrders((prev) =>
      prev.filter(
        (order) => order.id !== deleteOrder.id
      )
    );

    setSelectedOrders((prev) =>
      prev.filter(
        (id) => id !== deleteOrder.id
      )
    );

    setDeleteOrder(null);
  };

  /* =========================================================
     DELETE SELECTED
  ========================================================= */

  const confirmBulkDelete = () => {
    setOrders((prev) =>
      prev.filter(
        (order) =>
          !selectedOrders.includes(order.id)
      )
    );

    setSelectedOrders([]);
    setBulkDelete(false);
  };

  /* =========================================================
     OPEN EDIT
  ========================================================= */

  const openEdit = (order) => {
    setEditOrder(order);

    setEditForm({
      customer: order.customer,
      email: order.email,
      total: order.total,
      payment: order.payment,
      status: order.status,
      address: order.address,
    });
  };

  /* =========================================================
     EDIT FORM
  ========================================================= */

  const handleEditChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* =========================================================
     SAVE EDIT
  ========================================================= */

  const saveEdit = () => {
    if (!editOrder) return;

    setOrders((prev) =>
      prev.map((order) =>
        order.id === editOrder.id
          ? {
              ...order,
              customer: editForm.customer,
              email: editForm.email,
              total: Number(editForm.total),
              payment: editForm.payment,
              status: editForm.status,
              address: editForm.address,
            }
          : order
      )
    );

    setEditOrder(null);
  };

  /* =========================================================
     EXPORT CSV
  ========================================================= */

  const exportCSV = () => {
    if (!filteredOrders.length) {
      alert("No orders available to export.");
      return;
    }

    const headers = [
      "Order ID",
      "Customer",
      "Email",
      "Total Amount",
      "Payment",
      "Status",
      "Date",
      "Time",
      "Address",
    ];

    const rows = filteredOrders.map((order) => [
      order.orderId,
      order.customer,
      order.email,
      order.total,
      order.payment,
      order.status,
      formatDate(order.date),
      order.time,
      order.address,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) =>
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

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "food-orders.csv";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  /* =========================================================
     PAGINATION
  ========================================================= */

  const getPages = () => {
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

    const previousDays = new Date(
      calendarYear,
      calendarMonth,
      0
    ).getDate();

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: previousDays - i,
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
        day:
          days.length -
          daysInMonth -
          firstDay +
          1,
        outside: true,
      });
    }

    return days;
  };

  const changeMonth = (direction) => {
    if (direction === "prev") {
      if (calendarMonth === 0) {
        setCalendarMonth(11);
        setCalendarYear((year) => year - 1);
      } else {
        setCalendarMonth(
          (month) => month - 1
        );
      }
    } else {
      if (calendarMonth === 11) {
        setCalendarMonth(0);
        setCalendarYear((year) => year + 1);
      } else {
        setCalendarMonth(
          (month) => month + 1
        );
      }
    }
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
    }
  };

  const selectDate = (day, outside) => {
    if (outside) return;

    const month = String(
      calendarMonth + 1
    ).padStart(2, "0");

    const selectedDay = String(day).padStart(
      2,
      "0"
    );

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
    const month = String(
      calendarMonth + 1
    ).padStart(2, "0");

    const selectedDay = String(day).padStart(
      2,
      "0"
    );

    const value = `${calendarYear}-${month}-${selectedDay}`;

    return (
      value === fromDate ||
      value === toDate
    );
  };

  /* =========================================================
     ICON COMPONENT
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

    if (name === "bag") {
      return (
        <svg {...props}>
          <path d="M6 8h12l1 13H5L6 8Z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
      );
    }

    if (name === "check") {
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 2.5 2.5L16 9" />
        </svg>
      );
    }

    if (name === "clock") {
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    }

    if (name === "closeCircle") {
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="m9 9 6 6M15 9l-6 6" />
        </svg>
      );
    }

    if (name === "search") {
      return (
        <svg {...props}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
      );
    }

    if (name === "calendar") {
      return (
        <svg {...props}>
          <rect
            x="3"
            y="4"
            width="18"
            height="17"
            rx="2"
          />
          <path d="M8 2v4M16 2v4M3 9h18" />
        </svg>
      );
    }

    if (name === "filter") {
      return (
        <svg {...props}>
          <path d="M4 5h16l-6 7v6l-4 2v-8z" />
        </svg>
      );
    }

    if (name === "refresh") {
      return (
        <svg {...props}>
          <path d="M20 11a8 8 0 0 0-14.7-4L3 10" />
          <path d="M3 5v5h5" />
          <path d="M4 13a8 8 0 0 0 14.7 4L21 14" />
          <path d="M21 19v-5h-5" />
        </svg>
      );
    }

    if (name === "download") {
      return (
        <svg {...props}>
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M4 21h16" />
        </svg>
      );
    }

    if (name === "eye") {
      return (
        <svg {...props}>
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    }

    if (name === "edit") {
      return (
        <svg {...props}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
        </svg>
      );
    }

    if (name === "trash") {
      return (
        <svg {...props}>
          <path d="M4 7h16" />
          <path d="M10 11v6M14 11v6" />
          <path d="M6 7l1 14h10l1-14" />
          <path d="M9 7V4h6v3" />
        </svg>
      );
    }

    if (name === "arrowLeft") {
      return (
        <svg {...props}>
          <path d="m15 18-6-6 6-6" />
        </svg>
      );
    }

    if (name === "arrowRight") {
      return (
        <svg {...props}>
          <path d="m9 18 6-6-6-6" />
        </svg>
      );
    }

    if (name === "close") {
      return (
        <svg {...props}>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      );
    }

    if (name === "home") {
      return (
        <svg {...props}>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v11h14V9" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );
    }

    return null;
  };

  return (
    <div className="Order">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="Order__header">

        <div className="Order__headerLeft">

          <div className="Order__headerIcon">
            <Icon name="bag" size={28} />
          </div>

          <div>
            <h1>Orders</h1>

            <p>
              Manage and track all customer orders
            </p>
          </div>

        </div>

        <div className="Order__breadcrumb">

          <span>
            <Icon name="home" size={15} />
            Dashboard
          </span>

          <Icon name="arrowRight" size={14} />

          <strong>Orders</strong>

        </div>

      </div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="Order__stats">

        <div className="Order__statCard">

          <div className="Order__statIcon Order__statIcon--orange">
            <Icon name="bag" size={27} />
          </div>

          <div className="Order__statContent">

            <span>Total Orders</span>

            <div className="Order__statValue">
              <strong>{totalOrders + 316}</strong>

              <small className="Order__growth Order__growth--green">
                ↗ +12%
              </small>
            </div>

            <p>All time orders</p>

          </div>

        </div>

        <div className="Order__statCard">

          <div className="Order__statIcon Order__statIcon--green">
            <Icon name="check" size={27} />
          </div>

          <div className="Order__statContent">

            <span>Delivered</span>

            <div className="Order__statValue">
              <strong>256</strong>

              <small className="Order__growth Order__growth--green">
                ↗ +18%
              </small>
            </div>

            <p>Successfully delivered</p>

          </div>

        </div>

        <div className="Order__statCard">

          <div className="Order__statIcon Order__statIcon--yellow">
            <Icon name="clock" size={27} />
          </div>

          <div className="Order__statContent">

            <span>Pending</span>

            <div className="Order__statValue">
              <strong>34</strong>

              <small className="Order__growth Order__growth--red">
                ↘ -6%
              </small>
            </div>

            <p>Awaiting processing</p>

          </div>

        </div>

        <div className="Order__statCard">

          <div className="Order__statIcon Order__statIcon--red">
            <Icon name="closeCircle" size={27} />
          </div>

          <div className="Order__statContent">

            <span>Cancelled</span>

            <div className="Order__statValue">
              <strong>38</strong>

              <small className="Order__growth Order__growth--red">
                ↘ +4%
              </small>
            </div>

            <p>Total cancelled</p>

          </div>

        </div>

      </div>

      {/* =====================================================
          FILTER
      ===================================================== */}

      <div className="Order__filterCard">

        <div className="Order__filterField Order__searchField">

          <label>Search</label>

          <div className="Order__inputBox">

            <Icon name="search" size={17} />

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by order ID, customer, or item..."
            />

          </div>

        </div>

        <div className="Order__filterField">

          <label>Order Status</label>

          <select
            value={orderStatus}
            onChange={(e) => {
              setOrderStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Preparing</option>
            <option>Out for Delivery</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

        </div>

        <div className="Order__filterField">

          <label>Payment Status</label>

          <select
            value={paymentStatus}
            onChange={(e) => {
              setPaymentStatus(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option>All Payments</option>
            <option>Paid</option>
            <option>COD</option>
          </select>

        </div>

        {/* FROM DATE */}

        <div className="Order__filterField Order__calendarField">

          <label>From Date</label>

          <button
            type="button"
            className="Order__dateButton"
            onClick={() => openCalendar("from")}
          >
            <span>
              {fromDate
                ? formatDate(fromDate)
                : "dd-mm-yyyy"}
            </span>

            <Icon name="calendar" size={16} />
          </button>

          {calendarType === "from" && (
            <div className="Order__calendar">

              <div className="Order__calendarHeader">

                <button
                  type="button"
                  onClick={() =>
                    changeMonth("prev")
                  }
                >
                  <Icon
                    name="arrowLeft"
                    size={15}
                  />
                </button>

                <strong>
                  {monthNames[calendarMonth]}{" "}
                  {calendarYear}
                </strong>

                <button
                  type="button"
                  onClick={() =>
                    changeMonth("next")
                  }
                >
                  <Icon
                    name="arrowRight"
                    size={15}
                  />
                </button>

              </div>

              <div className="Order__calendarWeek">

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

              <div className="Order__calendarDays">

                {getCalendarDays().map(
                  (item, index) => (
                    <button
                      type="button"
                      key={index}
                      disabled={item.outside}
                      className={
                        isSelectedDate(
                          item.day
                        )
                          ? "Order__calendarSelected"
                          : ""
                      }
                      onClick={() =>
                        selectDate(
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

        <div className="Order__filterField Order__calendarField">

          <label>To Date</label>

          <button
            type="button"
            className="Order__dateButton"
            onClick={() => openCalendar("to")}
          >
            <span>
              {toDate
                ? formatDate(toDate)
                : "dd-mm-yyyy"}
            </span>

            <Icon name="calendar" size={16} />
          </button>

          {calendarType === "to" && (
            <div className="Order__calendar">

              <div className="Order__calendarHeader">

                <button
                  type="button"
                  onClick={() =>
                    changeMonth("prev")
                  }
                >
                  <Icon
                    name="arrowLeft"
                    size={15}
                  />
                </button>

                <strong>
                  {monthNames[calendarMonth]}{" "}
                  {calendarYear}
                </strong>

                <button
                  type="button"
                  onClick={() =>
                    changeMonth("next")
                  }
                >
                  <Icon
                    name="arrowRight"
                    size={15}
                  />
                </button>

              </div>

              <div className="Order__calendarWeek">

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

              <div className="Order__calendarDays">

                {getCalendarDays().map(
                  (item, index) => (
                    <button
                      type="button"
                      key={index}
                      disabled={item.outside}
                      className={
                        isSelectedDate(
                          item.day
                        )
                          ? "Order__calendarSelected"
                          : ""
                      }
                      onClick={() =>
                        selectDate(
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

        <div className="Order__filterButtons">

          <button
            type="button"
            className="Order__filterButton"
            onClick={() =>
              setCurrentPage(1)
            }
          >
            <Icon name="filter" size={17} />
            Filter
          </button>

          <button
            type="button"
            className="Order__resetButton"
            onClick={handleReset}
          >
            <Icon name="refresh" size={16} />
            Reset
          </button>

        </div>

      </div>

      {/* =====================================================
          ORDERS LIST
      ===================================================== */}

      <div className="Order__listCard">

        <div className="Order__listHeader">

          <div className="Order__listTitle">

            <div className="Order__listIcon">
              <Icon name="filter" size={22} />
            </div>

            <h2>Orders List</h2>

          </div>

          <div className="Order__listActions">

            <button
              type="button"
              className="Order__exportButton"
              onClick={exportCSV}
            >
              <Icon name="download" size={16} />
              Export CSV
            </button>

            <button
              type="button"
              className="Order__deleteSelected"
              disabled={!selectedOrders.length}
              onClick={() =>
                setBulkDelete(true)
              }
            >
              <Icon name="trash" size={16} />
              Delete Selected
            </button>

            <button
              type="button"
              className="Order__refreshButton"
              onClick={handleRefresh}
            >
              <Icon name="refresh" size={17} />
            </button>

          </div>

        </div>

        {/* =====================================================
            TABLE
        ===================================================== */}

        <div className="Order__tableWrapper">

          <table className="Order__table">

            <thead>

              <tr>

                <th className="Order__checkColumn">

                  <label className="Order__checkbox">

                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleSelectAll}
                    />

                    <span></span>

                  </label>

                </th>

                <th>#</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Order Date</th>
                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {currentOrders.length ? (
                currentOrders.map(
                  (order, index) => (
                    <tr key={order.id}>

                      <td>

                        <label className="Order__checkbox">

                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(
                              order.id
                            )}
                            onChange={() =>
                              handleSelectOrder(
                                order.id
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
                        <strong className="Order__orderId">
                          {order.orderId}
                        </strong>
                      </td>

                      <td>

                        <div className="Order__customer">

                          <div className="Order__customerAvatar">
                            {order.customer
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>

                            <strong>
                              {order.customer}
                            </strong>

                            <span>
                              {order.email}
                            </span>

                          </div>

                        </div>

                      </td>

                      <td>

                        <div className="Order__items">

                          {order.items
                            .slice(0, 3)
                            .map((item, itemIndex) => (
                              <img
                                key={itemIndex}
                                src={item.image}
                                alt={item.name}
                                title={item.name}
                              />
                            ))}

                          {order.moreItems > 0 && (
                            <span>
                              +{order.moreItems}
                            </span>
                          )}

                        </div>

                      </td>

                      <td>

                        <strong className="Order__amount">
                          ₹
                          {order.total.toFixed(2)}
                        </strong>

                      </td>

                      <td>

                        <span
                          className={`Order__payment Order__payment--${order.payment.toLowerCase()}`}
                        >
                          {order.payment}
                        </span>

                      </td>

                      <td>

                        <span
                          className={`Order__status Order__status--${order.status
                            .toLowerCase()
                            .replaceAll(
                              " ",
                              "-"
                            )}`}
                        >
                          {order.status}
                        </span>

                      </td>

                      <td>

                        <div className="Order__date">

                          <span>
                            {formatDate(
                              order.date
                            )}
                          </span>

                          <small>
                            {order.time}
                          </small>

                        </div>

                      </td>

                      <td>

                        <div className="Order__rowActions">

                          <button
                            type="button"
                            className="Order__rowButton Order__viewButton"
                            title="View order"
                            onClick={() =>
                              setViewOrder(
                                order
                              )
                            }
                          >
                            <Icon
                              name="eye"
                              size={16}
                            />
                          </button>

                          <button
                            type="button"
                            className="Order__rowButton Order__editButton"
                            title="Edit order"
                            onClick={() =>
                              openEdit(order)
                            }
                          >
                            <Icon
                              name="edit"
                              size={16}
                            />
                          </button>

                          <button
                            type="button"
                            className="Order__rowButton Order__deleteButton"
                            title="Delete order"
                            onClick={() =>
                              setDeleteOrder(
                                order
                              )
                            }
                          >
                            <Icon
                              name="trash"
                              size={16}
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
                    className="Order__empty"
                  >
                    No orders found.
                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* =====================================================
            PAGINATION
        ===================================================== */}

        <div className="Order__paginationWrapper">

          <div className="Order__paginationInfo">

            Showing{" "}
            <strong>
              {filteredOrders.length
                ? startIndex + 1
                : 0}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(
                startIndex + ITEMS_PER_PAGE,
                filteredOrders.length
              )}
            </strong>{" "}
            of{" "}
            <strong>
              {filteredOrders.length}
            </strong>{" "}
            entries

          </div>

          {totalPages > 1 && (
            <div className="Order__pagination">

              <button
                type="button"
                className="Order__pageButton Order__pageArrow"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    (page) => page - 1
                  )
                }
              >
                <Icon
                  name="arrowLeft"
                  size={16}
                />
              </button>

              {getPages().map(
                (page, index) =>
                  page === "..." ? (
                    <span
                      key={`dots-${index}`}
                      className="Order__dots"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      type="button"
                      key={page}
                      className={`Order__pageButton ${
                        currentPage === page
                          ? "Order__pageActive"
                          : ""
                      }`}
                      onClick={() =>
                        setCurrentPage(page)
                      }
                    >
                      {page}
                    </button>
                  )
              )}

              <button
                type="button"
                className="Order__pageButton Order__pageArrow"
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (page) => page + 1
                  )
                }
              >
                <Icon
                  name="arrowRight"
                  size={16}
                />
              </button>

            </div>
          )}

        </div>

      </div>

      {/* =====================================================
          VIEW MODAL
      ===================================================== */}

      {viewOrder && (
        <div
          className="Order__modalOverlay"
          onClick={() => setViewOrder(null)}
        >

          <div
            className="Order__viewModal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="Order__modalClose"
              onClick={() =>
                setViewOrder(null)
              }
            >
              <Icon name="close" size={17} />
            </button>

            <div className="Order__modalHeader">

              <div className="Order__modalIcon Order__modalIcon--orange">
                <Icon name="bag" size={24} />
              </div>

              <div>

                <h3>Order Details</h3>

                <p>
                  {viewOrder.orderId}
                </p>

              </div>

            </div>

            <div className="Order__viewGrid">

              <div className="Order__viewItem">
                <span>Customer</span>
                <strong>
                  {viewOrder.customer}
                </strong>
              </div>

              <div className="Order__viewItem">
                <span>Email</span>
                <strong>
                  {viewOrder.email}
                </strong>
              </div>

              <div className="Order__viewItem">
                <span>Total Amount</span>
                <strong>
                  ₹
                  {viewOrder.total.toFixed(2)}
                </strong>
              </div>

              <div className="Order__viewItem">
                <span>Payment</span>
                <strong>
                  {viewOrder.payment}
                </strong>
              </div>

              <div className="Order__viewItem">
                <span>Status</span>

                <span
                  className={`Order__status Order__status--${viewOrder.status
                    .toLowerCase()
                    .replaceAll(
                      " ",
                      "-"
                    )}`}
                >
                  {viewOrder.status}
                </span>

              </div>

              <div className="Order__viewItem">
                <span>Order Date</span>
                <strong>
                  {formatDate(
                    viewOrder.date
                  )}
                </strong>
              </div>

            </div>

            <div className="Order__viewAddress">

              <span>Delivery Address</span>

              <p>{viewOrder.address}</p>

            </div>

            <div className="Order__modalFood">

              <span>Order Items</span>

              <div>

                {viewOrder.items.map(
                  (item, index) => (
                    <img
                      key={index}
                      src={item.image}
                      alt={item.name}
                      title={item.name}
                    />
                  )
                )}

              </div>

            </div>

            <div className="Order__modalFooter">

              <button
                type="button"
                className="Order__cancelModalButton"
                onClick={() =>
                  setViewOrder(null)
                }
              >
                Close
              </button>

              <button
                type="button"
                className="Order__saveModalButton"
                onClick={() => {
                  setViewOrder(null);
                  openEdit(viewOrder);
                }}
              >
                <Icon
                  name="edit"
                  size={15}
                />
                Edit Order
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      {editOrder && (
        <div
          className="Order__modalOverlay"
          onClick={() => setEditOrder(null)}
        >

          <div
            className="Order__editModal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="Order__modalClose"
              onClick={() =>
                setEditOrder(null)
              }
            >
              <Icon name="close" size={17} />
            </button>

            <div className="Order__modalHeader">

              <div className="Order__modalIcon Order__modalIcon--green">
                <Icon name="edit" size={23} />
              </div>

              <div>

                <h3>Edit Order</h3>

                <p>
                  Update order information
                </p>

              </div>

            </div>

            <div className="Order__editGrid">

              <div className="Order__editField">

                <label>Customer Name</label>

                <input
                  type="text"
                  value={editForm.customer}
                  onChange={(e) =>
                    handleEditChange(
                      "customer",
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="Order__editField">

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

              <div className="Order__editField">

                <label>Total Amount</label>

                <input
                  type="number"
                  value={editForm.total}
                  onChange={(e) =>
                    handleEditChange(
                      "total",
                      e.target.value
                    )
                  }
                />

              </div>

              <div className="Order__editField">

                <label>Payment</label>

                <select
                  value={editForm.payment}
                  onChange={(e) =>
                    handleEditChange(
                      "payment",
                      e.target.value
                    )
                  }
                >
                  <option>Paid</option>
                  <option>COD</option>
                </select>

              </div>

              <div className="Order__editField">

                <label>Order Status</label>

                <select
                  value={editForm.status}
                  onChange={(e) =>
                    handleEditChange(
                      "status",
                      e.target.value
                    )
                  }
                >
                  <option>Pending</option>
                  <option>Preparing</option>
                  <option>
                    Out for Delivery
                  </option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>

              </div>

              <div className="Order__editField">

                <label>Address</label>

                <input
                  type="text"
                  value={editForm.address}
                  onChange={(e) =>
                    handleEditChange(
                      "address",
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            <div className="Order__modalFooter">

              <button
                type="button"
                className="Order__cancelModalButton"
                onClick={() =>
                  setEditOrder(null)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="Order__saveModalButton"
                onClick={saveEdit}
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {deleteOrder && (
        <div
          className="Order__modalOverlay"
          onClick={() =>
            setDeleteOrder(null)
          }
        >

          <div
            className="Order__deleteModal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="Order__modalClose"
              onClick={() =>
                setDeleteOrder(null)
              }
            >
              <Icon name="close" size={17} />
            </button>

            <div className="Order__deleteIcon">
              <Icon name="trash" size={30} />
            </div>

            <h3>Delete Order?</h3>

            <p>
              Are you sure you want to delete{" "}
              <strong>
                {deleteOrder.orderId}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="Order__deleteActions">

              <button
                type="button"
                className="Order__cancelDelete"
                onClick={() =>
                  setDeleteOrder(null)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="Order__confirmDelete"
                onClick={confirmDelete}
              >
                <Icon
                  name="trash"
                  size={16}
                />
                Delete Order
              </button>

            </div>

          </div>

        </div>
      )}

      {/* =====================================================
          BULK DELETE MODAL
      ===================================================== */}

      {bulkDelete && (
        <div
          className="Order__modalOverlay"
          onClick={() =>
            setBulkDelete(false)
          }
        >

          <div
            className="Order__deleteModal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              type="button"
              className="Order__modalClose"
              onClick={() =>
                setBulkDelete(false)
              }
            >
              <Icon name="close" size={17} />
            </button>

            <div className="Order__deleteIcon">
              <Icon name="trash" size={30} />
            </div>

            <h3>Delete Selected Orders?</h3>

            <p>
              You have selected{" "}
              <strong>
                {selectedOrders.length}
              </strong>{" "}
              orders. Are you sure you want to
              delete them?
            </p>

            <div className="Order__deleteActions">

              <button
                type="button"
                className="Order__cancelDelete"
                onClick={() =>
                  setBulkDelete(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="Order__confirmDelete"
                onClick={confirmBulkDelete}
              >
                <Icon
                  name="trash"
                  size={16}
                />
                Delete Selected
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Order;