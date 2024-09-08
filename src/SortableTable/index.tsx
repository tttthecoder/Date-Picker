import { TableContext } from "./context";
import { SortableTableProps, TableRowType } from "./type";
import TableBody from "./TableBody";
import useTable from "../hooks/useTable";
import Pagination from "./Pagination";
import Filter from "./Filter";
import Header from "./Header";

function SortableTable<T extends TableRowType>({
  data,
  sortBy = null,
  sortOrder = null,
  baseRowClass = "",
  draggedRowClass = "",
  sizeable = false,
  rowsPerPage = 5,
}: SortableTableProps<T>) {
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
        sizeable: sizeable,
        sort: _sort as (sortBy: string, sortOrder: "ASC" | "DESC") => void,
        columnNames: _columnNames,
      }}
    >
      <Filter />
      <table className=" block bg-white border border-gray-300 shadow-md rounded-lg border-collapse">
        <Header />
        <TableBody
          baseRowClass={baseRowClass}
          draggedRowClass={draggedRowClass}
        />
      </table>
      <Pagination />
    </TableContext.Provider>
  );
}

export default SortableTable;
