import { createContext } from "react";
import {
  CommonTableStateProviderProps,
  ContextType,
  TableRowType,
} from "./type";
import useTable from "../hooks/useTable";

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
  totalNumOfRowsWithNothingApplied: 0,
  totalNumOfRowsWithSortAndFilterApplied: 0,
  columnNames: [],
});

export function CommonTableStatesProvider<T extends TableRowType>({
  data,
  sortBy = null,
  sortOrder = null,
  rowsPerPage = 5,
  children,
}: CommonTableStateProviderProps<T>) {
  const {
    rowsWithSortPaginationAndFilterApplied:
      _rowsWithSortPaginationAndFilterApplied,
    totalNumOfRowsWithSortAndFilterApplied:
      _totalNumOfRowsWithSortAndFilterApplied,
    totalNumOfRowsWithNothingApplied: _totalNumOfRowsWithNothingApplied,
    filterBy: _filterBy,
    setFilterBy: _setFilterBy,
    testingOnlyTotalRows: testingOnlyTotalRows,
    filterByValue: _filterByValue,
    setFilterByValue: _setFilterByValue,
    sortOrder: _sortOrder,
    sortBy: _sortBy,
    page: _page,
    setPage: _setPage,
    rowsPerPage: _rowsPerPage,
    setRowsPerPage: _setRowsPerPage,
    movingRowToBeAfterAnotherRow: _movingRowToBeAfterAnotherRow,
    sort: _sort,
    columnNames: _columnNames,
  } = useTable<T>(data, sortBy, sortOrder, null, null, 1, rowsPerPage);
  console.log("CommonTableStateProvider");
  return (
    <TableContext.Provider
      value={{
        rowsWithSortPaginationAndFilterApplied:
          _rowsWithSortPaginationAndFilterApplied,
        totalNumOfRowsWithSortAndFilterApplied:
          _totalNumOfRowsWithSortAndFilterApplied,
        totalNumOfRowsWithNothingApplied: _totalNumOfRowsWithNothingApplied,
        testingOnlyTotalRows: testingOnlyTotalRows,
        sortOrder: _sortOrder,
        sortBy: _sortBy,
        filterBy: _filterBy,
        setFilterBy: _setFilterBy as React.Dispatch<
          React.SetStateAction<string | number | null>
        >,
        filterByValue: _filterByValue,
        setFilterByValue: _setFilterByValue,
        page: _page,
        setPage: _setPage,
        rowsPerPage: _rowsPerPage,
        setRowsPerPage: _setRowsPerPage,
        movingRowToBeAfterAnotherRow: _movingRowToBeAfterAnotherRow,
        sort: _sort as (sortBy: string, sortOrder: "ASC" | "DESC") => void,
        columnNames: _columnNames,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}
