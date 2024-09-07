import { Dispatch, SetStateAction, useState } from "react";
import { TableContext } from "./context";
import Header from "./header";
import { SortableTableProps, TableRowType } from "./type";
import TableBody from "./TableBody";
import useTable from "../hooks/useTable";

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
    rows: _rows,
    filterBy: _filterBy,
    setFilterBy: _setFilterBy,
    // testingOnlyTotalRows: testingOnlyTotalRows,
    filterByValue: _filterValue,
    setFilterByValue: _setFilterByValue,
    sortOrder: _sortOrder,
    sortBy: _sortBy,
    page: _page,
    setPage: _setPage,
    rowsPerPage: _rowsPerPage,
    setRowsPerPage: _setRowsPerPage,
    movingRowToBeAfterAnotherRow: _movingRowToBeAfterAnotherRow,
    sort: _sort,
  } = useTable<T>(data, sortBy, sortOrder, null, null, 1, rowsPerPage);
  const [_targetPositionIndex, _setTargetPositionIndex] = useState<
    number | null
  >(null);
  const [_draggedElementIndex, _setDraggedElementIndex] = useState<
    number | null
  >(null);

  return (
    <TableContext.Provider
      value={{
        rows: _rows,
        // testingOnlyTotalRows: testingOnlyTotalRows,
        // setRows: _setRows as Dispatch<SetStateAction<TableRowType[]>>,
        sortOrder: _sortOrder,
        // setSortOrder: _setSortOrder,
        sortBy: _sortBy,
        // setSortBy: _setSortBy as Dispatch<
        //   SetStateAction<keyof TableRowType | null>
        // >,
        page: _page,
        setPage: _setPage,
        rowsPerPage: _rowsPerPage,
        setRowsPerPage: _setRowsPerPage,
        movingRowToBeAfterAnotherRow: _movingRowToBeAfterAnotherRow,
        draggedElementIndex: _draggedElementIndex,
        setDraggedElementIndex: _setDraggedElementIndex,
        targetPositionIndex: _targetPositionIndex,
        setTargetPositionIndex: _setTargetPositionIndex,
        sizeable: sizeable,
        sort: _sort as (
          sortBy: string | number,
          sortOrder: "ASC" | "DESC"
        ) => void,
      }}
    >
      <table className=" block bg-white border border-gray-300 shadow-md rounded-lg border-separate ">
        <Header />
        <TableBody
          baseRowClass={baseRowClass}
          draggedRowClass={draggedRowClass}
        />
      </table>
    </TableContext.Provider>
  );
}

export default SortableTable;
