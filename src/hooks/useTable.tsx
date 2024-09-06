import { useEffect, useState } from "react";

function useTable<T extends Record<string, any> & { id: string | number }>(
  data: T[],
  sortBy: Exclude<keyof T, symbol> | null = null,
  sortOrder: "ASC" | "DESC" | null = null,
  filterBy: Exclude<keyof T, symbol> | null = null,
  filterValue: string | number | null = null,
  page: number | null = null,
  rowsPerPage: number | null = null
) {
  // _rows here is for internal data usage only and is the single source of truth for all the records we ever have!
  const [_rows, _setRows] = useState<T[]>(data);
  // _exposedRows here is for the output of the hooks. its to be returned to other code!
  const [_exposedRows, _setExposedRows] = useState<T[]>([...data]);
  const [_sortOrder, _setSortOrder] = useState(sortOrder);
  const [_sortBy, _setSortBy] = useState<Exclude<keyof T, symbol> | null>(
    sortBy
  );
  const [_filterBy, _setFilterBy] = useState<Exclude<keyof T, symbol> | null>(
    filterBy
  );
  const [_filterByValue, _setFilterByValue] = useState<string | number | null>(
    filterValue
  );
  const [_page, _setPage] = useState<number | null>(page);
  const [_rowsPerPage, _setRowsPerPage] = useState<number | null>(rowsPerPage);

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

    _setRows(newRows);
  }

  // effect for sorting on the entire _rows
  useEffect(() => {
    // guard against first mount and when dragging!
    if ((!_sortOrder && !_sortBy) || _rows.length < 2) return;
    console.log("sort");
    const sortedRows = _rows.sort((a, b) => {
      let first = a[`${_sortBy}`];
      let second = b[`${_sortBy}`];
      if (_sortOrder === "ASC") {
        return first! > second! ? 1 : -1;
      } else {
        return first! < second! ? 1 : -1;
      }
    });
    _setRows([...sortedRows]);
  }, [_sortBy, _sortOrder]);

  // effect for re-computing the entire _exposedRows
  useEffect(() => {
    var tobeExposedRows: T[] = [..._rows];
    if (filterBy !== null && filterValue !== null) {
      tobeExposedRows = tobeExposedRows.filter(
        // to be improved later
        (row) => row[`${filterBy}`] === row[`${filterValue}`]
      );
    }
    if (page !== null && rowsPerPage !== null) {
      tobeExposedRows = tobeExposedRows.filter((row, index) => {
        return index >= (page - 1) * rowsPerPage && index < page * rowsPerPage;
      });
    }
    _setExposedRows(tobeExposedRows);
  }, [page, rowsPerPage, filterBy, filterValue, _rows]);

  return {
    // testingOnlyTotalRows: _rows,
    rows: _exposedRows,
    sortOrder: _sortOrder,
    setSortOrder: _setSortOrder,
    sortBy: _sortBy,
    setSortBy: _setSortBy,
    filterBy: _filterBy,
    setFilterBy: _setFilterBy,
    filterByValue: _filterByValue,
    setFilterByValue: _setFilterByValue,
    page: _page,
    setPage: _setPage,
    rowsPerPage: _rowsPerPage,
    setRowsPerPage: _setRowsPerPage,
    movingRowToBeAfterAnotherRow: _movingRowToBeAfterAnotherRow,
  };
}

export default useTable;
