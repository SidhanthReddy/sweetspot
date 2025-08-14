import React, { useState, useEffect } from "react";
import CakeCard from "./CakeCard.jsx";
import { Filter, Grid, List, ChevronLeft, ChevronRight } from "lucide-react";

const CakeGrid = ({
  cakes,
  sortBy,
  setSortBy,
  setFilterSidebarOpen,
  viewMode,
  setViewMode,
  onCakeCardClick,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const sortOptions = [
    { value: "best-selling", label: "Best Selling" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
    { value: "rating", label: "Customer Rating" },
  ];

  const itemsPerPageOptions = [
    { value: 20, label: "20" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  // Calculate pagination
  const totalItems = cakes.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCakes = cakes.slice(startIndex, endIndex);

  // Reset to first page when filters change or items per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [cakes.length, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of the grid
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex-1">
      {/* Header with sorting and view options */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setFilterSidebarOpen(true)}
            className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:shadow-sm transition-all font-parastoo"
            style={{ color: "rgba(79,79,79,0.7)" }}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>

          <p
            className="hidden sm:block font-parastoo"
            style={{ color: "rgba(79,79,79,0.7)" }}
          >
            Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of{" "}
            {totalItems} delicious option
            {totalItems !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* View mode toggle */}
          <div className="hidden sm:flex items-center space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid" ? "shadow-sm" : "hover:shadow-sm"
              }`}
              style={{
                backgroundColor:
                  viewMode === "grid"
                    ? "rgba(224, 99, 99, 0.1)"
                    : "transparent",
                color:
                  viewMode === "grid"
                    ? "rgba(224, 99, 99, 0.85)"
                    : "rgba(79,79,79,0.7)",
              }}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list" ? "shadow-sm" : "hover:shadow-sm"
              }`}
              style={{
                backgroundColor:
                  viewMode === "list"
                    ? "rgba(224, 99, 99, 0.1)"
                    : "transparent",
                color:
                  viewMode === "list"
                    ? "rgba(224, 99, 99, 0.85)"
                    : "rgba(79,79,79,0.7)",
              }}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:border-transparent font-parastoo"
              style={{
                color: "rgba(79,79,79,0.7)",
                focusRingColor: "rgba(224, 99, 99, 0.85)",
              }}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ color: "rgba(79,79,79,0.7)" }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Grid/List view */}
      {totalItems === 0 ? (
        <div className="text-center py-16">
          <p
            className="text-xl font-parastoo mb-2"
            style={{ color: "rgba(79,79,79,0.7)" }}
          >
            No cakes found matching your taste
          </p>
          <p
            className="italic font-parastoo"
            style={{ color: "rgba(79,79,79,0.5)" }}
          >
            "Try adjusting your filters to discover more sweet options"
          </p>
        </div>
      ) : (
        <>
          <div
            className={`
            ${
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          `}
          >
            {currentCakes.map((cake) => {
              return (
                <CakeCard
                  key={cake.id}
                  cake={cake}
                  onCardClick={onCakeCardClick}
                  onOpenModal={onCakeCardClick}
                />
              );
            })}
          </div>

          {/* Pagination */}
          <div className="mt-12 border-t border-gray-100 pt-8">
            {/* Results per page and pagination info */}
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 mb-6">
              <div className="flex items-center space-x-3">
                <span
                  className="font-parastoo text-sm"
                  style={{ color: "rgba(79,79,79,0.7)" }}
                >
                  Showing
                </span>
                <div className="relative">
                  <select
                    value={itemsPerPage}
                    onChange={(e) =>
                      handleItemsPerPageChange(Number(e.target.value))
                    }
                    disabled={totalItems <= 20}
                    className={`appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:border-transparent font-parastoo text-sm transition-all ${
                      totalItems <= 20 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    style={{
                      color: "rgba(79,79,79,0.7)",
                      focusRingColor: "rgba(224, 99, 99, 0.85)",
                    }}
                  >
                    {itemsPerPageOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: "rgba(79,79,79,0.7)" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <span
                  className="font-parastoo text-sm"
                  style={{ color: "rgba(79,79,79,0.7)" }}
                >
                  results
                </span>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center space-x-2">
                  <span
                    className="font-parastoo text-sm hidden sm:block"
                    style={{ color: "rgba(79,79,79,0.5)" }}
                  >
                    Page {currentPage} of {totalPages}
                  </span>
                </div>
              )}
            </div>

            {/* Pagination controls - only show if there are multiple pages */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2">
                {/* Previous button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg border transition-all font-parastoo text-sm ${
                    currentPage === 1
                      ? "border-gray-200 cursor-not-allowed opacity-50"
                      : "border-gray-200 hover:shadow-sm"
                  }`}
                  style={{
                    color:
                      currentPage === 1
                        ? "rgba(79,79,79,0.3)"
                        : "rgba(79,79,79,0.7)",
                  }}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                {/* Page numbers */}
                <div className="flex items-center space-x-1">
                  {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                      {page === "..." ? (
                        <span
                          className="px-3 py-2 font-parastoo text-sm"
                          style={{ color: "rgba(79,79,79,0.5)" }}
                        >
                          ...
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 rounded-lg transition-all font-parastoo text-sm ${
                            currentPage === page
                              ? "shadow-sm"
                              : "hover:shadow-sm"
                          }`}
                          style={{
                            backgroundColor:
                              currentPage === page
                                ? "rgba(224, 99, 99, 0.1)"
                                : "transparent",
                            color:
                              currentPage === page
                                ? "rgba(224, 99, 99, 0.85)"
                                : "rgba(79,79,79,0.7)",
                            border:
                              currentPage === page
                                ? "1px solid rgba(224, 99, 99, 0.2)"
                                : "1px solid transparent",
                          }}
                        >
                          {page}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Next button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg border transition-all font-parastoo text-sm ${
                    currentPage === totalPages
                      ? "border-gray-200 cursor-not-allowed opacity-50"
                      : "border-gray-200 hover:shadow-sm"
                  }`}
                  style={{
                    color:
                      currentPage === totalPages
                        ? "rgba(79,79,79,0.3)"
                        : "rgba(79,79,79,0.7)",
                  }}
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CakeGrid;
