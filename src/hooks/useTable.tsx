import { useMemo, useState } from "react";
import { sortWithOutMutation } from "../common/utils/helpers/sortWithOutMutation";

export type Primitive = string | number | boolean | null;

function useTable<
  T extends Record<string, Primitive> & { id: string | number }
>(
  data: T[],
  sortBy: Extract<keyof T, string | number> | null = null,
  sortOrder: "ASC" | "DESC" | null = null,
  filterBy: Extract<keyof T, string | number> | null = null,
  filterValue: Primitive = null,
  page: number | null = null,
  rowsPerPage: number | null = null
) {
  // ================ this function will compute the initial sorted data only once for the initial value of the useState hook(of the _rows) ========================
  const _initialSortedRowsFor1stRender = useMemo(() => {
    if (sortBy === null || sortOrder === null) return data;
    return sortWithOutMutation(data, sortBy, sortOrder);
  }, []);

  // ========================================= hooks below ======================================================================================
  // _rows here is for internal data usage only and is the single source of truth for all the records we ever have!
  const [_rows, _setRows] = useState<T[]>(_initialSortedRowsFor1stRender);
  const [_sortOrder, _setSortOrder] = useState(sortOrder);
  const [_sortBy, _setSortBy] = useState<Extract<
    keyof T,
    string | number
  > | null>(sortBy);
  const [_filterBy, _setFilterBy] = useState<Extract<
    keyof T,
    string | number
  > | null>(filterBy);
  const [_filterByValue, _setFilterByValue] = useState<Primitive>(filterValue);
  const [_page, _setPage] = useState<number | null>(page);
  const [_rowsPerPage, _setRowsPerPage] = useState<number | null>(rowsPerPage);

  // ================ this function will expose the action of sorting on our _rows ========================================
  function _sort(
    sortBy: Extract<keyof T, string | number>,
    sortOrder: "ASC" | "DESC"
  ) {
    if (sortBy === null || sortOrder === null) return;
    try {
      var tobeExposedRows = sortWithOutMutation(_rows, sortBy, sortOrder);

      _setRows(tobeExposedRows);
      _setSortBy(sortBy);
      _setSortOrder(sortOrder);
    } catch (error) {
      console.log(error);
    }
  }

  // ================ this function will expose the action of moving a row to be after another row in our _rows =========================
  function _movingRowToBeAfterAnotherRow(
    currentRowId: number | string,
    targetRowId: number | string
  ) {
    if (currentRowId === targetRowId || !currentRowId || !targetRowId) return;

    const newRows = [..._rows];
    const currentRowIndex = newRows.findIndex((row) => row.id === currentRowId);
    const targetRowIndex = newRows.findIndex((row) => row.id === targetRowId);

    const draggedItem = newRows[currentRowIndex];
    newRows.splice(currentRowIndex as any, 1);
    newRows.splice(targetRowIndex, 0, draggedItem);

    _setSortBy(null);
    _setSortOrder(null);
    _setRows(newRows);
  }

  // ======= compute the to be exposed rows that factors in the pagination and filter configuration ======================
  const {
    rowsWithPaginationSortAndFilterApplied:
      _rowsWithSortPaginationAndFilterApplied,
    totalNumOfRowsWithSortAndFilterApplied:
      _totalNumOfRowsWithSortAndFilterApplied,
  } = useMemo(() => {
    var accumulatingRows: T[] = [..._rows];
    if (_filterBy !== null && _filterByValue !== null) {
      accumulatingRows = accumulatingRows.filter(
        // to be improved later
        (row) => {
          return `${row[`${_filterBy}`]}`
            .toLowerCase()
            .includes(`${_filterByValue}`.toLowerCase());
        }
      );
    }
    const totalNumOfRowsWithSortAndFilterApplied = accumulatingRows.length;
    if (_page !== null && _rowsPerPage !== null) {
      accumulatingRows = accumulatingRows.filter((row, index) => {
        return (
          index >= (_page - 1) * _rowsPerPage && index < _page * _rowsPerPage
        );
      });
    }

    return {
      rowsWithPaginationSortAndFilterApplied: accumulatingRows,
      totalNumOfRowsWithSortAndFilterApplied:
        totalNumOfRowsWithSortAndFilterApplied,
    };
  }, [_page, _rowsPerPage, _filterBy, _filterByValue, _rows]);

  // ====================== compute the columns' names ==========================================
  const _columnNames = Object.keys(_rows[0]);

  return {
    testingOnlyTotalRows: _rows,
    rowsWithSortPaginationAndFilterApplied:
      _rowsWithSortPaginationAndFilterApplied,
    totalNumOfRowsWithSortAndFilterApplied:
      _totalNumOfRowsWithSortAndFilterApplied,
    totalNumOfRowsWithNothingApplied: _rows.length,
    sortOrder: _sortOrder,
    sortBy: _sortBy,
    filterBy: _filterBy,
    setFilterBy: _setFilterBy,
    filterByValue: _filterByValue,
    setFilterByValue: _setFilterByValue,
    page: _page,
    setPage: _setPage,
    rowsPerPage: _rowsPerPage,
    setRowsPerPage: _setRowsPerPage,
    movingRowToBeAfterAnotherRow: _movingRowToBeAfterAnotherRow,
    sort: _sort,
    columnNames: _columnNames,
  };
}

export default useTable;
