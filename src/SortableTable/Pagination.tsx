import React, { useContext } from "react";
import { TableContext } from "./CommonTableStatesProvider.tsx";
import { IoCaretBackSharp, IoCaretForwardSharp } from "react-icons/io5";

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
    <div className="flex items-center flex-wrap overflow-auto justify-center gap-4 w-full mt-4 font-mono">
      {rowsPerPage !== null && page !== null ? (
        <>
          <button
            onClick={handlePrevious}
            disabled={page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoCaretBackSharp />
          </button>
          <span className="text-gray-700 text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IoCaretForwardSharp />
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
