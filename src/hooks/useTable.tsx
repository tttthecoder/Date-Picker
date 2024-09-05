import { useEffect, useState } from "react";

function useTable<T extends Record<string, any> & { id: string | number }>(
  data: T[],
  sortBy: Exclude<keyof T, symbol> | null = null,
  sortOrder: "ASC" | "DESC" | null = null,
  filterBy: Exclude<keyof T, symbol> | null = null,
  filterValue: string | number | null = null,
  page: number = 1,
  rowsPerPage: number = 5
) {
  const [_rows, _setRows] = useState<T[]>(data);
  const [_sortOrder, _setSortOrder] = useState(sortOrder);
  const [_sortBy, _setSortBy] = useState<Exclude<keyof T, symbol> | null>(
    sortBy
  );
  const [_page, _setPage] = useState(page);
  const [_rowsPerPage, _setRowsPerPage] = useState(rowsPerPage);

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

  return {
    rows: _rows,
    setRows: _setRows,
    sortOrder: _sortOrder,
    setSortOrder: _setSortOrder,
    sortBy: _sortBy,
    setSortBy: _setSortBy,
    page: _page,
    setPage: _setPage,
    rowsPerPage: _rowsPerPage,
    setRowsPerPage: _setRowsPerPage,
    movingRowToBeAfterAnotherRow: _movingRowToBeAfterAnotherRow,
  };
}

export default useTable;
