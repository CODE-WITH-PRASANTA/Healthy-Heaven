import React, { useEffect, useRef, useState } from "react";
import "./Gallery.css";

const Gallery = () => {
  const fileInputRef = useRef(null);

  const [galleryItems, setGalleryItems] = useState([]);
  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  /* ---------------------------------------
     LOAD DATA
  --------------------------------------- */

  useEffect(() => {
    const savedGallery = localStorage.getItem("galleryItems");

    if (savedGallery) {
      try {
        setGalleryItems(JSON.parse(savedGallery));
      } catch (error) {
        console.error("Failed to load gallery data", error);
      }
    }
  }, []);

  /* ---------------------------------------
     SAVE DATA
  --------------------------------------- */

  useEffect(() => {
    localStorage.setItem("galleryItems", JSON.stringify(galleryItems));
  }, [galleryItems]);

  /* ---------------------------------------
     FILE VALIDATION
  --------------------------------------- */

  const validateFile = (file) => {
    if (!file) return false;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload JPG, JPEG, PNG or WEBP image.");
      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return false;
    }

    return true;
  };

  /* ---------------------------------------
     IMAGE TO BASE64
  --------------------------------------- */

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  };

  /* ---------------------------------------
     HANDLE FILE
  --------------------------------------- */

  const handleFile = (file) => {
    if (!validateFile(file)) return;

    setSelectedImage(file);

    const imageURL = URL.createObjectURL(file);
    setPreviewImage(imageURL);
  };

  /* ---------------------------------------
     INPUT CHANGE
  --------------------------------------- */

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  /* ---------------------------------------
     DRAG EVENTS
  --------------------------------------- */

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);

    const file = event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  /* ---------------------------------------
     SAVE / UPDATE
  --------------------------------------- */

  const handleSaveGallery = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter image title.");
      return;
    }

    if (!editingId && !selectedImage) {
      alert("Please upload an image.");
      return;
    }

    try {
      let imageData = "";

      if (selectedImage) {
        imageData = await convertToBase64(selectedImage);
      }

      if (editingId) {
        setGalleryItems((prev) =>
          prev.map((item) =>
            item.id === editingId
              ? {
                  ...item,
                  title: title.trim(),
                  image: imageData || item.image,
                }
              : item
          )
        );

        alert("Gallery image updated successfully.");
      } else {
        const newItem = {
          id: Date.now(),
          title: title.trim(),
          image: imageData,
          uploadedOn: new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
        };

        setGalleryItems((prev) => [newItem, ...prev]);

        alert("Gallery image added successfully.");
      }

      resetForm();
      setCurrentPage(1);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while saving.");
    }
  };

  /* ---------------------------------------
     RESET FORM
  --------------------------------------- */

  const resetForm = () => {
    setTitle("");
    setSelectedImage(null);
    setPreviewImage("");
    setEditingId(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* ---------------------------------------
     EDIT
  --------------------------------------- */

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTitle(item.title);
    setPreviewImage(item.image);
    setSelectedImage(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ---------------------------------------
     DELETE MODAL
  --------------------------------------- */

  const openDeleteModal = (item = null) => {
    setDeleteTarget(item);
    setDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteTarget(null);
    setDeleteModal(false);
  };

  /* ---------------------------------------
     DELETE
  --------------------------------------- */

  const confirmDelete = () => {
    if (deleteTarget) {
      setGalleryItems((prev) =>
        prev.filter((item) => item.id !== deleteTarget.id)
      );

      setSelectedItems((prev) =>
        prev.filter((id) => id !== deleteTarget.id)
      );
    } else {
      setGalleryItems((prev) =>
        prev.filter((item) => !selectedItems.includes(item.id))
      );

      setSelectedItems([]);
    }

    closeDeleteModal();

    const filteredLength =
      galleryItems.length - (deleteTarget ? 1 : selectedItems.length);

    const maxPage = Math.max(
      1,
      Math.ceil(filteredLength / ITEMS_PER_PAGE)
    );

    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  };

  /* ---------------------------------------
     FILTER
  --------------------------------------- */

  const filteredItems = galleryItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /* ---------------------------------------
     PAGINATION
  --------------------------------------- */

  const totalPages = Math.ceil(
    filteredItems.length / ITEMS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /* ---------------------------------------
     SEARCH
  --------------------------------------- */

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  /* ---------------------------------------
     SELECT ITEM
  --------------------------------------- */

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  /* ---------------------------------------
     SELECT ALL
  --------------------------------------- */

  const handleSelectAll = () => {
    const currentIds = currentItems.map((item) => item.id);

    const allSelected = currentIds.every((id) =>
      selectedItems.includes(id)
    );

    if (allSelected) {
      setSelectedItems((prev) =>
        prev.filter((id) => !currentIds.includes(id))
      );
    } else {
      setSelectedItems((prev) => [
        ...new Set([...prev, ...currentIds]),
      ]);
    }
  };

  const isAllSelected =
    currentItems.length > 0 &&
    currentItems.every((item) =>
      selectedItems.includes(item.id)
    );

  /* ---------------------------------------
     PAGE CHANGE
  --------------------------------------- */

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  /* ---------------------------------------
     PAGE NUMBERS
  --------------------------------------- */

  const renderPageNumbers = () => {
    if (totalPages <= 5) {
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

  return (
    <div className="gallery">

      {/* ======================================
          PAGE HEADER
      ====================================== */}

      <div className="gallery__header">

        <div className="gallery__header-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>

        <div className="gallery__header-content">
          <h1>Gallery</h1>
          <p>Add and manage school gallery images</p>
        </div>

      </div>

      {/* ======================================
          ADD GALLERY CARD
      ====================================== */}

      <section className="gallery__form-card">

        <div className="gallery__section-heading">

          <div className="gallery__section-title">

            <span className="gallery__plus-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v8M8 12h8" />
              </svg>
            </span>

            <h2>
              {editingId
                ? "Edit Gallery Image"
                : "Add Gallery Image"}
            </h2>

          </div>

          {editingId && (
            <button
              type="button"
              className="gallery__cancel-edit"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}

        </div>

        <div className="gallery__divider"></div>

        <form
          className="gallery__form"
          onSubmit={handleSaveGallery}
        >

          {/* TITLE */}

          <div className="gallery__field">

            <label>
              Title <span>*</span>
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter image title"
            />

          </div>

          {/* IMAGE */}

          <div className="gallery__field">

            <label>
              Upload Image <span>*</span>
            </label>

            <div
              className={`gallery__upload ${
                dragActive ? "gallery__upload--active" : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >

              {previewImage ? (
                <div
                  className="gallery__preview-wrapper"
                  onClick={(e) => e.stopPropagation()}
                >

                  <img
                    src={previewImage}
                    alt="Preview"
                    className="gallery__preview"
                  />

                  <button
                    type="button"
                    className="gallery__remove-image"
                    onClick={() => {
                      setPreviewImage("");
                      setSelectedImage(null);

                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="gallery__preview-overlay">
                    <span>Change Image</span>
                  </div>

                </div>
              ) : (
                <>
                  <div className="gallery__upload-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 16V4" />
                      <path d="M7 9l5-5 5 5" />
                      <path d="M5 20h14" />
                    </svg>
                  </div>

                  <strong>
                    Click to upload or drag and drop
                  </strong>

                  <small>
                    Supports: JPG, PNG, JPEG, WEBP (Max 5MB)
                  </small>
                </>
              )}

            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
              hidden
            />

          </div>

          {/* SAVE */}

          <div className="gallery__form-actions">

            <button
              type="submit"
              className="gallery__save-button"
            >

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 4h12l2 2v14H5z" />
                <path d="M8 4v6h8V4" />
                <path d="M8 20v-6h8v6" />
              </svg>

              {editingId ? "Update" : "Save"}

            </button>

          </div>

        </form>

      </section>

      {/* ======================================
          GALLERY LIST
      ====================================== */}

      <section className="gallery__list-card">

        {/* LIST HEADER */}

        <div className="gallery__list-header">

          <div className="gallery__list-title">

            <span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </span>

            <h2>Gallery List</h2>

          </div>

          <div className="gallery__list-tools">

            {selectedItems.length > 0 && (
              <button
                type="button"
                className="gallery__bulk-delete"
                onClick={() => openDeleteModal()}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 7h16" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M6 7l1 14h10l1-14" />
                  <path d="M9 7V4h6v3" />
                </svg>

                Delete Selected ({selectedItems.length})
              </button>
            )}

            <div className="gallery__search">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4-4" />
              </svg>

              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={handleSearch}
              />

            </div>

          </div>

        </div>

        {/* TABLE */}

        <div className="gallery__table-wrapper">

          <table className="gallery__table">

            <thead>

              <tr>

                <th className="gallery__checkbox-column">
                  <label className="gallery__checkbox">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                    />
                    <span></span>
                  </label>
                </th>

                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Uploaded On</th>
                <th className="gallery__actions-column">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (

                  <tr
                    key={item.id}
                    className={
                      selectedItems.includes(item.id)
                        ? "gallery__row--selected"
                        : ""
                    }
                  >

                    <td>

                      <label className="gallery__checkbox">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() =>
                            handleSelectItem(item.id)
                          }
                        />
                        <span></span>
                      </label>

                    </td>

                    <td>
                      <span className="gallery__number">
                        {startIndex + index + 1}
                      </span>
                    </td>

                    <td>

                      <div className="gallery__table-image-wrapper">

                        <img
                          src={item.image}
                          alt={item.title}
                          className="gallery__table-image"
                        />

                      </div>

                    </td>

                    <td>
                      <div className="gallery__item-title">
                        {item.title}
                      </div>
                    </td>

                    <td>
                      <span className="gallery__date">
                        {item.uploadedOn}
                      </span>
                    </td>

                    <td>

                      <div className="gallery__actions">

                        <button
                          type="button"
                          className="gallery__action-button gallery__action-button--edit"
                          onClick={() => handleEdit(item)}
                          title="Edit"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.1 2.1 0 013 3L8 18l-4 1 1-4z" />
                          </svg>
                        </button>

                        <button
                          type="button"
                          className="gallery__action-button gallery__action-button--delete"
                          onClick={() =>
                            openDeleteModal(item)
                          }
                          title="Delete"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M4 7h16" />
                            <path d="M10 11v6M14 11v6" />
                            <path d="M6 7l1 14h10l1-14" />
                            <path d="M9 7V4h6v3" />
                          </svg>
                        </button>

                      </div>

                    </td>

                  </tr>

                ))
              ) : (
                <tr>

                  <td
                    colSpan="6"
                    className="gallery__empty"
                  >

                    <div className="gallery__empty-content">

                      <div className="gallery__empty-icon">

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                          />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>

                      </div>

                      <h3>No gallery images found</h3>

                      <p>
                        {searchTerm
                          ? "Try searching with a different title."
                          : "Add your first gallery image using the form above."}
                      </p>

                    </div>

                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* ======================================
            TABLE FOOTER
        ====================================== */}

        <div className="gallery__table-footer">

          <div className="gallery__entries">

            Showing{" "}
            <strong>
              {filteredItems.length === 0
                ? 0
                : startIndex + 1}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(
                startIndex + ITEMS_PER_PAGE,
                filteredItems.length
              )}
            </strong>{" "}
            of{" "}
            <strong>{filteredItems.length}</strong>{" "}
            entries

          </div>

          {totalPages > 1 && (
            <div className="gallery__pagination">

              <button
                type="button"
                className="gallery__page-button gallery__page-button--arrow"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {renderPageNumbers().map((page, index) => {

                if (page === "...") {
                  return (
                    <span
                      key={`dots-${index}`}
                      className="gallery__page-dots"
                    >
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    type="button"
                    className={`gallery__page-button ${
                      currentPage === page
                        ? "gallery__page-button--active"
                        : ""
                    }`}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                type="button"
                className="gallery__page-button gallery__page-button--arrow"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

            </div>
          )}

        </div>

      </section>

      {/* ======================================
          DELETE MODAL
      ====================================== */}

      {deleteModal && (
        <div
          className="gallery__modal-overlay"
          onClick={closeDeleteModal}
        >

          <div
            className="gallery__delete-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              className="gallery__modal-close"
              onClick={closeDeleteModal}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="gallery__delete-icon">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
                <path d="M10.3 3.8L2.8 17a2 2 0 001.7 3h15a2 2 0 001.7-3L13.7 3.8a2 2 0 00-3.4 0z" />
              </svg>

            </div>

            <h3>
              {deleteTarget
                ? "Delete Gallery Image?"
                : "Delete Selected Images?"}
            </h3>

            <p>
              {deleteTarget
                ? "Are you sure you want to delete this gallery image? This action cannot be undone."
                : `Are you sure you want to delete ${selectedItems.length} selected images? This action cannot be undone.`}
            </p>

            <div className="gallery__modal-actions">

              <button
                type="button"
                className="gallery__modal-cancel"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="gallery__modal-delete"
                onClick={confirmDelete}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 7h16" />
                  <path d="M10 11v6M14 11v6" />
                  <path d="M6 7l1 14h10l1-14" />
                  <path d="M9 7V4h6v3" />
                </svg>

                Delete
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Gallery;