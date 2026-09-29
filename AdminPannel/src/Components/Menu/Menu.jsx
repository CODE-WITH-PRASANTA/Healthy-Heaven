import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Upload,
  Image as ImageIcon,
  Tag,
  FileText,
  IndianRupee,
  Plus,
  RotateCcw,
  Search,
  Pencil,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Utensils,
  LoaderCircle,
  ListFilter,
} from "lucide-react";

import API, {
  IMG_URL,
} from "../../api/axios";

import "./Menu.css";

// =====================================================
// CATEGORIES
// =====================================================

const MENU_CATEGORIES = [
  "Juices & Drinks",
  "Salads & Bowls",
  "Eggs & Breakfast",
  "Healthy Rolls",
];

const Menu = () => {
  const fileInputRef =
    useRef(null);

  // =====================================================
  // FORM
  // =====================================================

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      price: "",
      category: "",
      image: null,
    });

  const [
    previewImage,
    setPreviewImage,
  ] = useState(null);

  // =====================================================
  // DATA
  // =====================================================

  const [
    menuItems,
    setMenuItems,
  ] = useState([]);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    filterCategory,
    setFilterCategory,
  ] = useState("");

  const [
    editingId,
    setEditingId,
  ] = useState(null);

  // =====================================================
  // PAGINATION
  // =====================================================

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const itemsPerPage = 8;

  const [
    pagination,
    setPagination,
  ] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 1,
  });

  // =====================================================
  // LOADING
  // =====================================================

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    submitLoading,
    setSubmitLoading,
  ] = useState(false);

  const [
    deleteLoading,
    setDeleteLoading,
  ] = useState(null);

  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUrl = (
    image
  ) => {
    if (!image) {
      return "";
    }

    if (
      image.startsWith(
        "http://"
      ) ||
      image.startsWith(
        "https://"
      ) ||
      image.startsWith(
        "blob:"
      )
    ) {
      return image;
    }

    const cleanImage =
      image.replace(
        /^\/+/,
        ""
      );

    if (
      cleanImage.startsWith(
        "uploads/"
      )
    ) {
      return `${IMG_URL}/${cleanImage}`;
    }

    return `${IMG_URL}/uploads/menu/${cleanImage}`;
  };

  // =====================================================
  // FETCH MENU
  // =====================================================

  const fetchMenuItems = async (
    page = currentPage
  ) => {
    try {
      setLoading(true);

      const response =
        await API.get(
          "/menu",
          {
            params: {
              search:
                search.trim(),

              category:
                filterCategory,

              page,

              limit:
                itemsPerPage,
            },
          }
        );

      const result =
        response.data;

      setMenuItems(
        Array.isArray(
          result?.data
        )
          ? result.data
          : []
      );

      setPagination(
        result?.pagination || {
          page,
          limit:
            itemsPerPage,
          total: 0,
          totalPages: 1,
        }
      );
    } catch (error) {
      console.error(
        "FETCH MENU ERROR:",
        error
      );

      setMenuItems([]);

      alert(
        error?.response?.data
          ?.message ||
          "Failed to fetch menu items"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SEARCH / FILTER / PAGE
  // =====================================================

  useEffect(() => {
    const timer =
      setTimeout(() => {
        fetchMenuItems(
          currentPage
        );
      }, 300);

    return () =>
      clearTimeout(timer);
  }, [
    search,
    filterCategory,
    currentPage,
  ]);

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleInputChange = (
    e
  ) => {
    const {
      name,
      value,
    } = e.target;

    if (name === "price") {
      let cleanPrice =
        value
          .replace(
            /[₹,\s]/g,
            ""
          )
          .replace(
            /[^\d.]/g,
            ""
          );

      const decimalParts =
        cleanPrice.split(
          "."
        );

      if (
        decimalParts.length >
        2
      ) {
        cleanPrice =
          decimalParts[0] +
          "." +
          decimalParts
            .slice(1)
            .join("");
      }

      setFormData(
        (prev) => ({
          ...prev,
          price:
            cleanPrice,
        })
      );

      return;
    }

    setFormData(
      (prev) => ({
        ...prev,
        [name]: value,
      })
    );
  };

  // =====================================================
  // IMAGE SELECT
  // =====================================================

  const handleImageChange = (
    e
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      alert(
        "Please select a valid image."
      );

      e.target.value = "";

      return;
    }

    if (
      file.size >
      2 * 1024 * 1024
    ) {
      alert(
        "Image size should be less than 2MB."
      );

      e.target.value = "";

      return;
    }

    if (
      previewImage &&
      previewImage.startsWith(
        "blob:"
      )
    ) {
      URL.revokeObjectURL(
        previewImage
      );
    }

    const preview =
      URL.createObjectURL(
        file
      );

    setFormData(
      (prev) => ({
        ...prev,
        image: file,
      })
    );

    setPreviewImage(
      preview
    );
  };

  // =====================================================
  // REMOVE IMAGE
  // =====================================================

  const removeImage = () => {
    if (
      previewImage &&
      previewImage.startsWith(
        "blob:"
      )
    ) {
      URL.revokeObjectURL(
        previewImage
      );
    }

    setFormData(
      (prev) => ({
        ...prev,
        image: null,
      })
    );

    setPreviewImage(null);

    if (
      fileInputRef.current
    ) {
      fileInputRef.current.value =
        "";
    }
  };

  // =====================================================
  // RESET
  // =====================================================

  const resetForm = () => {
    if (
      previewImage &&
      previewImage.startsWith(
        "blob:"
      )
    ) {
      URL.revokeObjectURL(
        previewImage
      );
    }

    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      image: null,
    });

    setPreviewImage(null);

    setEditingId(null);

    if (
      fileInputRef.current
    ) {
      fileInputRef.current.value =
        "";
    }
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    // IMAGE
    if (
      !editingId &&
      !(
        formData.image instanceof
        File
      )
    ) {
      alert(
        "Please upload a food image."
      );

      return;
    }

    // NAME
    if (
      !formData.name.trim()
    ) {
      alert(
        "Please enter food item name."
      );

      return;
    }

    // DESCRIPTION
    if (
      !formData.description.trim()
    ) {
      alert(
        "Please enter food item description."
      );

      return;
    }

    // CATEGORY
    if (
      !formData.category
    ) {
      alert(
        "Please select a category."
      );

      return;
    }

    // PRICE
    const cleanPrice =
      String(
        formData.price
      )
        .replace(
          /[₹,\s]/g,
          ""
        )
        .trim();

    const numericPrice =
      Number(cleanPrice);

    if (
      !cleanPrice ||
      !Number.isFinite(
        numericPrice
      ) ||
      numericPrice < 0
    ) {
      alert(
        "Please enter a valid price."
      );

      return;
    }

    try {
      setSubmitLoading(true);

      const data =
        new FormData();

      data.append(
        "name",
        formData.name.trim()
      );

      data.append(
        "description",
        formData.description.trim()
      );

      data.append(
        "price",
        String(
          numericPrice
        )
      );

      data.append(
        "category",
        formData.category
      );

      if (
        formData.image instanceof
        File
      ) {
        data.append(
          "image",
          formData.image
        );
      }

      // CREATE
      if (!editingId) {
        await API.post(
          "/menu",
          data
        );
      }

      // UPDATE
      else {
        await API.put(
          `/menu/${editingId}`,
          data
        );
      }

      alert(
        editingId
          ? "Menu item updated successfully"
          : "Menu item added successfully"
      );

      resetForm();

      setCurrentPage(1);

      await fetchMenuItems(1);
    } catch (error) {
      console.error(
        "SAVE MENU ERROR:",
        error
      );

      alert(
        error?.response?.data
          ?.message ||
          "Failed to save menu item"
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (
    item
  ) => {
    setEditingId(
      item._id
    );

    setFormData({
      name:
        item.name || "",

      description:
        item.description ||
        "",

      price:
        String(
          item.price ?? ""
        ).replace(
          /[₹,\s]/g,
          ""
        ),

      category:
        item.category || "",

      image: null,
    });

    setPreviewImage(
      item.image
        ? getImageUrl(
            item.image
          )
        : null
    );

    if (
      fileInputRef.current
    ) {
      fileInputRef.current.value =
        "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete =
    async (id) => {
      const confirmed =
        window.confirm(
          "Are you sure you want to delete this food item?"
        );

      if (!confirmed) {
        return;
      }

      try {
        setDeleteLoading(id);

        const response =
          await API.delete(
            `/menu/${id}`
          );

        alert(
          response.data?.message ||
            "Menu item deleted successfully"
        );

        if (
          menuItems.length ===
            1 &&
          currentPage > 1
        ) {
          setCurrentPage(
            (prev) =>
              Math.max(
                prev - 1,
                1
              )
          );
        } else {
          await fetchMenuItems(
            currentPage
          );
        }

        if (
          editingId === id
        ) {
          resetForm();
        }
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Failed to delete menu item"
        );
      } finally {
        setDeleteLoading(
          null
        );
      }
    };

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (
    e
  ) => {
    setSearch(
      e.target.value
    );

    setCurrentPage(1);
  };

  // =====================================================
  // CATEGORY FILTER
  // =====================================================

  const handleFilterCategory =
    (e) => {
      setFilterCategory(
        e.target.value
      );

      setCurrentPage(1);
    };

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages =
    Math.max(
      pagination.totalPages ||
        1,
      1
    );

  const safeCurrentPage =
    Math.min(
      currentPage,
      totalPages
    );

  const startItem =
    pagination.total === 0
      ? 0
      : (safeCurrentPage - 1) *
          itemsPerPage +
        1;

  const endItem =
    Math.min(
      safeCurrentPage *
        itemsPerPage,
      pagination.total || 0
    );

  // =====================================================
  // JSX
  // =====================================================

  return (
    <div className="Menu">

      <div className="Menu-container">

        {/* =================================================
            FORM
        ================================================= */}

        <div className="Menu-formCard">

          <div className="Menu-cardHeader">

            <div className="Menu-headerIcon">
              <Utensils
                size={22}
              />
            </div>

            <div>
              <h2>
                {editingId
                  ? "Edit Food Item"
                  : "Add Food Item"}
              </h2>

              <p>
                {editingId
                  ? "Update your menu item details"
                  : "Add a new item to your menu"}
              </p>
            </div>

          </div>

          <form
            className="Menu-form"
            onSubmit={
              handleSubmit
            }
          >

            {/* IMAGE */}

            <div className="Menu-field">

              <label className="Menu-label">
                Food Image{" "}
                <span>*</span>
              </label>

              <div className="Menu-imageUploadRow">

                {!previewImage ? (
                  <div
                    className="Menu-uploadBox"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                  >

                    <div className="Menu-uploadIcon">
                      <ImageIcon
                        size={25}
                      />
                    </div>

                    <strong>
                      Click to upload image
                    </strong>

                    <span>
                      JPG, PNG, WEBP
                      (Max 2MB)
                    </span>

                  </div>
                ) : (
                  <div className="Menu-previewBox">

                    <img
                      src={
                        previewImage
                      }
                      alt="Menu Preview"
                      className="Menu-previewImage"
                      onError={(
                        e
                      ) => {
                        e.currentTarget.style.display =
                          "none";
                      }}
                    />

                    <button
                      type="button"
                      className="Menu-removeImage"
                      onClick={
                        removeImage
                      }
                    >
                      <X
                        size={15}
                      />
                    </button>

                  </div>
                )}

                <input
                  ref={
                    fileInputRef
                  }
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  onChange={
                    handleImageChange
                  }
                  required={
                    !editingId &&
                    !formData.image
                  }
                  hidden
                />

              </div>

            </div>

            {/* NAME */}

            <div className="Menu-field">

              <label className="Menu-label">
                Item Name{" "}
                <span>*</span>
              </label>

              <div className="Menu-inputWrapper">

                <Tag size={18} />

                <input
                  type="text"
                  name="name"
                  value={
                    formData.name
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="Enter food item name"
                />

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="Menu-field">

              <label className="Menu-label">
                Description{" "}
                <span>*</span>
              </label>

              <div className="Menu-textareaWrapper">

                <FileText
                  size={18}
                />

                <textarea
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="Enter food item description"
                  rows="4"
                />

              </div>

            </div>

            {/* CATEGORY */}

            <div className="Menu-field">

              <label className="Menu-label">
                Category{" "}
                <span>*</span>
              </label>

              <div className="Menu-inputWrapper">

                <ListFilter
                  size={18}
                />

                <select
                  name="category"
                  value={
                    formData.category
                  }
                  onChange={
                    handleInputChange
                  }
                >

                  <option value="">
                    Select Category
                  </option>

                  {MENU_CATEGORIES.map(
                    (category) => (
                      <option
                        key={
                          category
                        }
                        value={
                          category
                        }
                      >
                        {category}
                      </option>
                    )
                  )}

                </select>

              </div>

            </div>

            {/* PRICE */}

            <div className="Menu-field">

              <label className="Menu-label">
                Price (₹){" "}
                <span>*</span>
              </label>

              <div className="Menu-inputWrapper">

                <IndianRupee
                  size={18}
                />

                <input
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  value={
                    formData.price
                  }
                  onChange={
                    handleInputChange
                  }
                  placeholder="Enter price"
                />

              </div>

            </div>

            {/* BUTTONS */}

            <div className="Menu-formActions">

              <button
                type="button"
                className="Menu-resetButton"
                onClick={
                  resetForm
                }
                disabled={
                  submitLoading
                }
              >
                <RotateCcw
                  size={17}
                />

                Reset
              </button>

              <button
                type="submit"
                className="Menu-submitButton"
                disabled={
                  submitLoading
                }
              >

                {submitLoading ? (
                  <>
                    <LoaderCircle
                      size={19}
                      className="Menu-spin"
                    />

                    {editingId
                      ? "Updating..."
                      : "Adding..."}
                  </>
                ) : (
                  <>
                    <Plus
                      size={19}
                    />

                    {editingId
                      ? "Update Item"
                      : "Add Item"}
                  </>
                )}

              </button>

            </div>

          </form>

        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="Menu-tableCard">

          <div className="Menu-tableHeader">

            <div className="Menu-tableTitle">

              <div className="Menu-listIcon">
                <Upload
                  size={20}
                />
              </div>

              <div>

                <h2>
                  Food Items List
                </h2>

                <p>
                  Manage all your menu
                  items here
                </p>

              </div>

            </div>

            <div
              className="Menu-searchBox"
            >

              <Search
                size={18}
              />

              <input
                type="text"
                value={search}
                onChange={
                  handleSearch
                }
                placeholder="Search items..."
              />

            </div>

          </div>

          {/* CATEGORY FILTER */}

          <div className="Menu-categoryFilter">

            <select
              value={
                filterCategory
              }
              onChange={
                handleFilterCategory
              }
            >

              <option value="">
                All Categories
              </option>

              {MENU_CATEGORIES.map(
                (category) => (
                  <option
                    key={
                      category
                    }
                    value={
                      category
                    }
                  >
                    {category}
                  </option>
                )
              )}

            </select>

          </div>

          {/* TABLE */}

          <div className="Menu-tableWrapper">

            <table className="Menu-table">

              <thead>

                <tr>

                  <th>
                    #
                  </th>

                  <th>
                    Image
                  </th>

                  <th>
                    Name
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Description
                  </th>

                  <th>
                    Price
                  </th>

                  <th>
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {loading ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="Menu-emptyState"
                    >
                      Loading menu
                      items...
                    </td>

                  </tr>

                ) : menuItems.length >
                  0 ? (

                  menuItems.map(
                    (
                      item,
                      index
                    ) => {

                      const imageUrl =
                        getImageUrl(
                          item.image
                        );

                      return (
                        <tr
                          key={
                            item._id
                          }
                        >

                          <td className="Menu-number">
                            {startItem +
                              index}
                          </td>

                          {/* IMAGE */}

                          <td className="Menu-imageCell">

                            {imageUrl ? (
                              <img
                                src={
                                  imageUrl
                                }
                                alt={
                                  item.name
                                }
                                className="Menu-tableImage"
                                onError={(
                                  e
                                ) => {
                                  e.currentTarget.style.display =
                                    "none";

                                  const errorBox =
                                    e.currentTarget
                                      .nextElementSibling;

                                  if (
                                    errorBox
                                  ) {
                                    errorBox.style.display =
                                      "flex";
                                  }
                                }}
                              />
                            ) : null}

                            <div
                              className="Menu-imageError"
                              style={{
                                display:
                                  imageUrl
                                    ? "none"
                                    : "flex",
                              }}
                            >
                              <ImageIcon
                                size={20}
                              />

                              <span>
                                Image unavailable
                              </span>
                            </div>

                          </td>

                          {/* NAME */}

                          <td>

                            <strong className="Menu-itemName">
                              {
                                item.name
                              }
                            </strong>

                          </td>

                          {/* CATEGORY */}

                          <td>

                            <span className="Menu-categoryBadge">
                              {
                                item.category ||
                                "Uncategorized"
                              }
                            </span>

                          </td>

                          {/* DESCRIPTION */}

                          <td>

                            <span className="Menu-description">
                              {
                                item.description
                              }
                            </span>

                          </td>

                          {/* PRICE */}

                          <td>

                            <strong className="Menu-price">
                              ₹
                              {Number(
                                item.price ||
                                  0
                              ).toFixed(
                                2
                              )}
                            </strong>

                          </td>

                          {/* ACTIONS */}

                          <td>

                            <div className="Menu-actionButtons">

                              <button
                                type="button"
                                className="Menu-editButton"
                                onClick={() =>
                                  handleEdit(
                                    item
                                  )
                                }
                                disabled={
                                  submitLoading ||
                                  deleteLoading ===
                                    item._id
                                }
                                title="Edit"
                              >
                                <Pencil
                                  size={
                                    16
                                  }
                                />
                              </button>

                              <button
                                type="button"
                                className="Menu-deleteButton"
                                onClick={() =>
                                  handleDelete(
                                    item._id
                                  )
                                }
                                disabled={
                                  deleteLoading ===
                                  item._id
                                }
                                title="Delete"
                              >

                                {deleteLoading ===
                                item._id ? (
                                  <LoaderCircle
                                    size={
                                      16
                                    }
                                    className="Menu-spin"
                                  />
                                ) : (
                                  <Trash2
                                    size={
                                      16
                                    }
                                  />
                                )}

                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )

                ) : (

                  <tr>

                    <td
                      colSpan="7"
                      className="Menu-emptyState"
                    >
                      {search ||
                      filterCategory
                        ? "No food items found."
                        : "No food items found."}
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

          {/* FOOTER */}

          <div className="Menu-tableFooter">

            <span>
              Showing{" "}
              {startItem} to{" "}
              {endItem} of{" "}
              {pagination.total ||
                0}{" "}
              items
            </span>

            <div className="Menu-pagination">

              <button
                type="button"
                disabled={
                  safeCurrentPage ===
                    1 ||
                  loading
                }
                onClick={() =>
                  setCurrentPage(
                    (prev) =>
                      Math.max(
                        prev - 1,
                        1
                      )
                  )
                }
              >
                <ChevronLeft
                  size={17}
                />
              </button>

              <span>
                {
                  safeCurrentPage
                }{" "}
                /{" "}
                {totalPages}
              </span>

              <button
                type="button"
                disabled={
                  safeCurrentPage >=
                    totalPages ||
                  loading
                }
                onClick={() =>
                  setCurrentPage(
                    (prev) =>
                      Math.min(
                        prev + 1,
                        totalPages
                      )
                  )
                }
              >
                <ChevronRight
                  size={17}
                />
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Menu;