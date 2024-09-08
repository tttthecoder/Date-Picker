import { createContext } from "react";
import { ContextType, TableRowType } from "./type";

export const TableContext = createContext<ContextType<TableRowType>>({
  rowsWithSortPaginationAndFilterApplied: [],
  testingOnlyTotalRows: [],
  sortBy: null,
  sort: () => {},
  sortOrder: null,
  filterBy: null,
  setFilterBy: () => {},
  filterByValue: null,
  setFilterByValue: () => {},
  page: 1,
  setPage: () => {},
  rowsPerPage: 5,
  setRowsPerPage: () => {},
  movingRowToBeAfterAnotherRow: (currentIndex, targetIndex) => {},
  sizeable: false,
  totalNumOfRowsWithNothingApplied: 0,
  totalNumOfRowsWithSortAndFilterApplied: 0,
  columnNames: [],
});
