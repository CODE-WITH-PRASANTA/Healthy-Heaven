import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./Gallery.css";

const Gallery = () => {
  const fileInputRef = useRef(null);
  const galleryListRef = useRef(null);

  const ITEMS_PER_PAGE = 6;

  /* =====================================================
     DUMMY DATA
  ===================================================== */

  const dummyData = [
    {
      id: 1,
      title: "Annual Sports Day",
      image: "https://picsum.photos/seed/gallery001/700/450",
      uploadedOn: "23 Sept 2026",
    },
    {
      id: 2,
      title: "School Annual Function",
      image: "https://picsum.photos/seed/gallery002/700/450",
      uploadedOn: "22 Sept 2026",
    },
    {
      id: 3,
      title: "Independence Day Celebration",
      image: "https://picsum.photos/seed/gallery003/700/450",
      uploadedOn: "21 Sept 2026",
    },
    {
      id: 4,
      title: "Republic Day Program",
      image: "https://picsum.photos/seed/gallery004/700/450",
      uploadedOn: "20 Sept 2026",
    },
    {
      id: 5,
      title: "Science Exhibition",
      image: "https://picsum.photos/seed/gallery005/700/450",
      uploadedOn: "19 Sept 2026",
    },
    {
      id: 6,
      title: "Cultural Program",
      image: "https://picsum.photos/seed/gallery006/700/450",
      uploadedOn: "18 Sept 2026",
    },
    {
      id: 7,
      title: "Teachers Day Celebration",
      image: "https://picsum.photos/seed/gallery007/700/450",
      uploadedOn: "17 Sept 2026",
    },
    {
      id: 8,
      title: "Children's Day Event",
      image: "https://picsum.photos/seed/gallery008/700/450",
      uploadedOn: "16 Sept 2026",
    },
    {
      id: 9,
      title: "School Picnic",
      image: "https://picsum.photos/seed/gallery009/700/450",
      uploadedOn: "15 Sept 2026",
    },
    {
      id: 10,
      title: "Classroom Activities",
      image: "https://picsum.photos/seed/gallery010/700/450",
      uploadedOn: "14 Sept 2026",
    },
  ];

  /* =====================================================
     STATES
  ===================================================== */

  const [galleryItems, setGalleryItems] =
    useState(dummyData);

  const [title, setTitle] = useState("");
  const [selectedImage, setSelectedImage] =
    useState(null);

  const [previewImage, setPreviewImage] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [selectedItems, setSelectedItems] =
    useState([]);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [dragActive, setDragActive] =
    useState(false);

  /*
    IMPORTANT:
    Keep track of only blob URLs created by uploaded images.
  */

  const blobUrlsRef = useRef(new Set());

  /* =====================================================
     CLEANUP ONLY WHEN COMPONENT UNMOUNTS
     
     IMPORTANT:
     Do NOT use galleryItems as dependency here.
     Otherwise every state update would revoke images.
  ===================================================== */

  useEffect(() => {
    return () => {
      blobUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url);
      });

      blobUrlsRef.current.clear();
    };
  }, []);

  /* =====================================================
     CREATE IMAGE URL
  ===================================================== */

  const createImageUrl = (file) => {
    const url = URL.createObjectURL(file);

    blobUrlsRef.current.add(url);

    return url;
  };

  /* =====================================================
     REVOKE IMAGE URL
  ===================================================== */

  const revokeImageUrl = (url) => {
    if (!url) return;

    if (url.startsWith("blob:")) {
      URL.revokeObjectURL(url);
      blobUrlsRef.current.delete(url);
    }
  };

  /* =====================================================
     FILE VALIDATION
  ===================================================== */

  const validateFile = (file) => {
    if (!file) return false;

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Please upload JPG, JPEG, PNG or WEBP image."
      );

      return false;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(
        "Image size must be less than 5MB."
      );

      return false;
    }

    return true;
  };

  /* =====================================================
     HANDLE FILE
  ===================================================== */

  const handleFile = (file) => {
    if (!validateFile(file)) {
      return;
    }

    /*
      If there is an old temporary preview,
      remove only that preview.
    */

    if (
      previewImage &&
      previewImage.startsWith("blob:")
    ) {
      revokeImageUrl(previewImage);
    }

    const imageUrl = createImageUrl(file);

    setSelectedImage(file);
    setPreviewImage(imageUrl);
  };

  /* =====================================================
     FILE INPUT
  ===================================================== */

  const handleImageChange = (event) => {
    const file =
      event.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  /* =====================================================
     DRAG OVER
  ===================================================== */

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  /* =====================================================
     DRAG LEAVE
  ===================================================== */

  const handleDragLeave = () => {
    setDragActive(false);
  };

  /* =====================================================
     DROP
  ===================================================== */

  const handleDrop = (event) => {
    event.preventDefault();

    setDragActive(false);

    const file =
      event.dataTransfer.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  /* =====================================================
     SAVE / UPDATE
  ===================================================== */

  const handleSaveGallery = (event) => {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter image title.");
      return;
    }

    if (!editingId && !selectedImage) {
      alert("Please upload an image.");
      return;
    }

    /* =================================================
       UPDATE
    ================================================= */

    if (editingId) {
      setGalleryItems((previous) =>
        previous.map((item) => {
          if (item.id !== editingId) {
            return item;
          }

          /*
            If user selected a new image,
            previewImage is the new blob URL.
          */

          if (selectedImage && previewImage) {
            /*
              Remove old uploaded blob URL
              only if it is different.
            */

            if (
              item.image &&
              item.image !== previewImage &&
              item.image.startsWith("blob:")
            ) {
              revokeImageUrl(item.image);
            }

            return {
              ...item,
              title: title.trim(),
              image: previewImage,
            };
          }

          /*
            No new image selected.
            Keep existing image.
          */

          return {
            ...item,
            title: title.trim(),
          };
        })
      );

      /*
        IMPORTANT:
        Do NOT revoke previewImage here.
        It is now being used by the table.
      */

      setTitle("");
      setSelectedImage(null);
      setPreviewImage("");
      setEditingId(null);
      setDragActive(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      alert(
        "Gallery image updated successfully."
      );

      return;
    }

    /* =================================================
       ADD NEW
    ================================================= */

    const newItem = {
      id:
        Date.now() +
        Math.floor(Math.random() * 100000),

      title: title.trim(),

      /*
        IMPORTANT:
        Keep the blob URL.
        Do not revoke it after save.
      */

      image: previewImage,

      uploadedOn:
        new Date().toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        ),
    };

    setGalleryItems((previous) => [
      newItem,
      ...previous,
    ]);

    /*
      Reset form WITHOUT revoking previewImage.
      The image is now owned by galleryItems.
    */

    setTitle("");
    setSelectedImage(null);
    setPreviewImage("");
    setEditingId(null);
    setDragActive(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    /*
      New item is inserted at top.
    */

    setCurrentPage(1);

    alert(
      "Gallery image added successfully."
    );

    setTimeout(() => {
      galleryListRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  /* =====================================================
     RESET FORM
     
     IMPORTANT:
     This function does NOT revoke previewImage.
     Because during edit, previewImage may already
     belong to galleryItems.
  ===================================================== */

  const resetForm = () => {
    setTitle("");
    setSelectedImage(null);
    setPreviewImage("");
    setEditingId(null);
    setDragActive(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =====================================================
     CANCEL EDIT
  ===================================================== */

  const handleCancelEdit = () => {
    /*
      If user selected a new image during edit
      but did not save it, remove that temporary URL.
    */

    if (
      selectedImage &&
      previewImage &&
      previewImage.startsWith("blob:")
    ) {
      revokeImageUrl(previewImage);
    }

    resetForm();
  };

  /* =====================================================
     EDIT
  ===================================================== */

  const handleEdit = (item) => {
    /*
      If another unsaved preview exists,
      clean it first.
    */

    if (
      selectedImage &&
      previewImage &&
      previewImage.startsWith("blob:")
    ) {
      revokeImageUrl(previewImage);
    }

    setEditingId(item.id);
    setTitle(item.title);

    /*
      Existing item image is shown.
    */

    setPreviewImage(item.image);

    setSelectedImage(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     REMOVE PREVIEW
  ===================================================== */

  const handleRemovePreview = (event) => {
    event.stopPropagation();

    /*
      Only revoke if this is our blob URL.
    */

    if (
      previewImage &&
      previewImage.startsWith("blob:")
    ) {
      /*
        If editing and previewImage is already
        the item's current image, do not revoke it.
      */

      const currentItem = galleryItems.find(
        (item) =>
          item.id === editingId
      );

      const isCurrentSavedImage =
        currentItem?.image ===
        previewImage;

      if (!isCurrentSavedImage) {
        revokeImageUrl(previewImage);
      }
    }

    setPreviewImage("");
    setSelectedImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =====================================================
     SEARCH
  ===================================================== */

  const filteredItems = useMemo(() => {
    const search =
      searchTerm.trim().toLowerCase();

    if (!search) {
      return galleryItems;
    }

    return galleryItems.filter(
      (item) =>
        item.title
          .toLowerCase()
          .includes(search)
    );
  }, [galleryItems, searchTerm]);

  /* =====================================================
     TOTAL PAGES
  ===================================================== */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredItems.length /
        ITEMS_PER_PAGE
    )
  );

  /* =====================================================
     CURRENT PAGE FIX
  ===================================================== */

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [
    currentPage,
    totalPages,
  ]);

  /* =====================================================
     CURRENT ITEMS
  ===================================================== */

  const startIndex =
    (currentPage - 1) *
    ITEMS_PER_PAGE;

  const currentItems =
    filteredItems.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );

  /* =====================================================
     SEARCH
  ===================================================== */

  const handleSearch = (event) => {
    setSearchTerm(
      event.target.value
    );

    setCurrentPage(1);
  };

  /* =====================================================
     SELECT ITEM
  ===================================================== */

  const handleSelectItem = (id) => {
    setSelectedItems((previous) => {
      if (previous.includes(id)) {
        return previous.filter(
          (itemId) =>
            itemId !== id
        );
      }

      return [
        ...previous,
        id,
      ];
    });
  };

  /* =====================================================
     SELECT ALL
  ===================================================== */

  const currentPageIds =
    currentItems.map(
      (item) => item.id
    );

  const isAllSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) =>
      selectedItems.includes(id)
    );

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItems((previous) =>
        previous.filter(
          (id) =>
            !currentPageIds.includes(
              id
            )
        )
      );
    } else {
      setSelectedItems((previous) => [
        ...new Set([
          ...previous,
          ...currentPageIds,
        ]),
      ]);
    }
  };

  /* =====================================================
     DELETE MODAL
  ===================================================== */

  const openDeleteModal = (
    item = null
  ) => {
    setDeleteTarget(item);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteTarget(null);
    setShowDeleteModal(false);
  };

  /* =====================================================
     DELETE
  ===================================================== */

  const confirmDelete = () => {
    if (deleteTarget) {
      /*
        Revoke uploaded image URL.
      */

      if (
        deleteTarget.image?.startsWith(
          "blob:"
        )
      ) {
        revokeImageUrl(
          deleteTarget.image
        );
      }

      setGalleryItems((previous) =>
        previous.filter(
          (item) =>
            item.id !==
            deleteTarget.id
        )
      );

      setSelectedItems((previous) =>
        previous.filter(
          (id) =>
            id !== deleteTarget.id
        )
      );
    } else {
      /*
        Bulk delete
      */

      const idsToDelete =
        selectedItems;

      galleryItems.forEach(
        (item) => {
          if (
            idsToDelete.includes(
              item.id
            ) &&
            item.image?.startsWith(
              "blob:"
            )
          ) {
            revokeImageUrl(
              item.image
            );
          }
        }
      );

      setGalleryItems((previous) =>
        previous.filter(
          (item) =>
            !idsToDelete.includes(
              item.id
            )
        )
      );

      setSelectedItems([]);
    }

    closeDeleteModal();
  };

  /* =====================================================
     PAGE CHANGE
  ===================================================== */

  const goToPage = (page) => {
    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    setCurrentPage(page);

    setTimeout(() => {
      galleryListRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  /* =====================================================
     PAGE NUMBERS
  ===================================================== */

  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from(
        {
          length: totalPages,
        },
        (_, index) =>
          index + 1
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

    if (
      currentPage >=
      totalPages - 2
    ) {
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
     JSX
  ===================================================== */

  return (
    <div className="gallery">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="gallery__header">

        <div className="gallery__headerIcon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="3"
            />

            <circle
              cx="8.5"
              cy="8.5"
              r="1.5"
            />

            <path d="M21 15l-5-5L5 21" />
          </svg>
        </div>

        <div>
          <h1>Gallery</h1>

          <p>
            Add and manage school
            gallery images
          </p>
        </div>

      </div>

      {/* =================================================
          FORM
      ================================================= */}

      <section className="gallery__formCard">

        <div className="gallery__formHeader">

          <div className="gallery__formTitle">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
              />

              <path d="M12 8v8M8 12h8" />
            </svg>

            <h2>
              {editingId
                ? "Edit Gallery Image"
                : "Add Gallery Image"}
            </h2>

          </div>

          {editingId && (
            <button
              type="button"
              className="gallery__cancelButton"
              onClick={
                handleCancelEdit
              }
            >
              Cancel Edit
            </button>
          )}

        </div>

        <div className="gallery__line" />

        <form
          className="gallery__form"
          onSubmit={
            handleSaveGallery
          }
        >

          {/* TITLE */}

          <div className="gallery__field">

            <label>
              Title{" "}
              <span>*</span>
            </label>

            <input
              type="text"
              value={title}
              placeholder="Enter image title"
              onChange={(event) =>
                setTitle(
                  event.target.value
                )
              }
            />

          </div>

          {/* IMAGE */}

          <div className="gallery__field">

            <label>
              Upload Image{" "}
              <span>*</span>
            </label>

            <div
              className={`gallery__upload ${
                dragActive
                  ? "gallery__upload--active"
                  : ""
              }`}
              onClick={() =>
                fileInputRef.current?.click()
              }
              onDragOver={
                handleDragOver
              }
              onDragLeave={
                handleDragLeave
              }
              onDrop={handleDrop}
            >

              {previewImage ? (
                <div className="gallery__previewBox">

                  <img
                    src={previewImage}
                    alt={
                      title ||
                      "Gallery preview"
                    }
                  />

                  <div className="gallery__previewOverlay">
                    Change Image
                  </div>

                  <button
                    type="button"
                    className="gallery__removePreview"
                    onClick={
                      handleRemovePreview
                    }
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

                </div>
              ) : (
                <>
                  <div className="gallery__uploadIcon">

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
                    Click to upload or
                    drag and drop
                  </strong>

                  <small>
                    Supports: JPG, PNG,
                    JPEG, WEBP (Max
                    5MB)
                  </small>
                </>
              )}

            </div>

            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={
                handleImageChange
              }
            />

          </div>

          {/* SAVE */}

          <div className="gallery__saveArea">

            <button
              type="submit"
              className="gallery__saveButton"
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

              {editingId
                ? "Update"
                : "Save"}

            </button>

          </div>

        </form>

      </section>

      {/* =================================================
          LIST
      ================================================= */}

      <section
        className="gallery__listCard"
        ref={galleryListRef}
      >

        <div className="gallery__listHeader">

          <div className="gallery__listHeading">

            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <rect
                x="3"
                y="3"
                width="7"
                height="7"
              />

              <rect
                x="14"
                y="3"
                width="7"
                height="7"
              />

              <rect
                x="3"
                y="14"
                width="7"
                height="7"
              />

              <rect
                x="14"
                y="14"
                width="7"
                height="7"
              />
            </svg>

            <div>
              <h2>Gallery List</h2>

              <span>
                {filteredItems.length}{" "}
                entries
              </span>
            </div>

          </div>

          <div className="gallery__tools">

            {selectedItems.length >
              0 && (
              <button
                type="button"
                className="gallery__deleteSelected"
                onClick={() =>
                  openDeleteModal()
                }
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

                Delete Selected (
                {selectedItems.length})
              </button>
            )}

            <div className="gallery__search">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                />

                <path d="M20 20l-4-4" />
              </svg>

              <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={
                  handleSearch
                }
              />

              {searchTerm && (
                <button
                  type="button"
                  className="gallery__clearSearch"
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                >
                  ×
                </button>
              )}

            </div>

          </div>

        </div>

        {/* =================================================
            TABLE
        ================================================= */}

        <div className="gallery__tableWrapper">

          <table className="gallery__table">

            <thead>

              <tr>

                <th className="gallery__checkColumn">

                  <label className="gallery__checkbox">

                    <input
                      type="checkbox"
                      checked={
                        isAllSelected
                      }
                      onChange={
                        handleSelectAll
                      }
                    />

                    <span />

                  </label>

                </th>

                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Uploaded On</th>

                <th className="gallery__actionsHead">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {currentItems.length >
              0 ? (
                currentItems.map(
                  (
                    item,
                    index
                  ) => (

                    <tr
                      key={
                        item.id
                      }
                    >

                      <td>

                        <label className="gallery__checkbox">

                          <input
                            type="checkbox"
                            checked={selectedItems.includes(
                              item.id
                            )}
                            onChange={() =>
                              handleSelectItem(
                                item.id
                              )
                            }
                          />

                          <span />

                        </label>

                      </td>

                      <td>
                        <span className="gallery__number">
                          {startIndex +
                            index +
                            1}
                        </span>
                      </td>

                      <td>

                        <div className="gallery__imageBox">

                          <img
                            src={
                              item.image
                            }
                            alt={
                              item.title
                            }
                            loading="lazy"
                            onError={(event) => {
                              event.currentTarget.src =
                                "https://picsum.photos/seed/fallback" +
                                item.id +
                                "/700/450";
                            }}
                          />

                        </div>

                      </td>

                      <td>
                        <span className="gallery__itemTitle">
                          {
                            item.title
                          }
                        </span>
                      </td>

                      <td>
                        <span className="gallery__date">
                          {
                            item.uploadedOn
                          }
                        </span>
                      </td>

                      <td>

                        <div className="gallery__actions">

                          <button
                            type="button"
                            className="gallery__edit"
                            title="Edit"
                            onClick={() =>
                              handleEdit(
                                item
                              )
                            }
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
                            className="gallery__delete"
                            title="Delete"
                            onClick={() =>
                              openDeleteModal(
                                item
                              )
                            }
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
                  )
                )
              ) : (
                <tr>

                  <td
                    colSpan="6"
                    className="gallery__empty"
                  >

                    <div className="gallery__emptyBox">

                      <div className="gallery__emptyIcon">

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

                          <circle
                            cx="8.5"
                            cy="8.5"
                            r="1.5"
                          />

                          <path d="M21 15l-5-5L5 21" />
                        </svg>

                      </div>

                      <h3>
                        No gallery
                        images found
                      </h3>

                      <p>
                        {searchTerm
                          ? "Try searching with another title."
                          : "Add your first gallery image using the form above."}
                      </p>

                    </div>

                  </td>

                </tr>
              )}

            </tbody>

          </table>

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="gallery__footer">

          <div className="gallery__showing">

            Showing{" "}

            <strong>
              {filteredItems.length ===
              0
                ? 0
                : startIndex + 1}
            </strong>

            {" to "}

            <strong>
              {Math.min(
                startIndex +
                  ITEMS_PER_PAGE,
                filteredItems.length
              )}
            </strong>

            {" of "}

            <strong>
              {filteredItems.length}
            </strong>

            {" entries"}

          </div>

          {totalPages > 1 && (
            <div className="gallery__pagination">

              <button
                type="button"
                className="gallery__pageArrow"
                disabled={
                  currentPage === 1
                }
                onClick={() =>
                  goToPage(
                    currentPage - 1
                  )
                }
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

              <div className="gallery__pageNumbers">

                {renderPageNumbers().map(
                  (
                    page,
                    index
                  ) =>
                    page ===
                    "..." ? (
                      <span
                        key={
                          "dots-" +
                          index
                        }
                        className="gallery__dots"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        type="button"
                        key={page}
                        className={`gallery__page ${
                          currentPage ===
                          page
                            ? "gallery__page--active"
                            : ""
                        }`}
                        onClick={() =>
                          goToPage(
                            page
                          )
                        }
                      >
                        {page}
                      </button>
                    )
                )}

              </div>

              <button
                type="button"
                className="gallery__pageArrow"
                disabled={
                  currentPage ===
                  totalPages
                }
                onClick={() =>
                  goToPage(
                    currentPage + 1
                  )
                }
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

      {/* =================================================
          DELETE MODAL
      ================================================= */}

      {showDeleteModal && (
        <div
          className="gallery__modalOverlay"
          onClick={
            closeDeleteModal
          }
        >

          <div
            className="gallery__modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="gallery__modalClose"
              onClick={
                closeDeleteModal
              }
            >
              ×
            </button>

            <div className="gallery__warningIcon">

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
                ? "Are you sure you want to delete this gallery image?"
                : `Are you sure you want to delete ${selectedItems.length} selected images?`}
            </p>

            <div className="gallery__modalActions">

              <button
                type="button"
                className="gallery__cancelDelete"
                onClick={
                  closeDeleteModal
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="gallery__confirmDelete"
                onClick={
                  confirmDelete
                }
              >
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