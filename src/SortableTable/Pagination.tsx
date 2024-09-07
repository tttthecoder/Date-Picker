import React, { useContext } from "react";
import { TableContext } from "./context";

const Pagination: React.FC = () => {
  const { page, rowsPerPage, setPage, totalNumOfRowsWithSortAndFilterApplied } =
    useContext(TableContext);

  // Calculate total pages
  const totalPages =
    rowsPerPage &&
    Math.ceil(totalNumOfRowsWithSortAndFilterApplied / rowsPerPage);

  // Handlers for page navigation
  const handlePrevious = () => {
    if (page && page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page && totalPages && page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-4">
      {rowsPerPage !== null && page !== null ? (
        <>
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </>
      ) : (
        <span className="text-gray-700">
          Total Records: {totalNumOfRowsWithSortAndFilterApplied}
        </span>
      )}
    </div>
  );
};

export default Pagination;
