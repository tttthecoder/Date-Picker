import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
}: SortableTableProps<T>) {
  const {
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
    swappingRows: _swappingRows,
  } = useTable(data, sortBy, sortOrder);
  const [_currentDraggedElementIndex, _setCurrentDraggedElement] = useState<
    number | null
  >(null);
  const [_currentDraggedOverElementIndex, _setCurrentDraggedOverElement] =
    useState<number | null>(null);
  const [_isSwappingAnimationOnGoing, _setIsSwappingAnimationOnGoing] =
    useState<boolean>(false);
  return (
    <TableContext.Provider
      value={{
        rows: _rows,
        setRows: _setRows as Dispatch<SetStateAction<TableRowType[]>>,
        sortOrder: _sortOrder,
        setSortOrder: _setSortOrder,
        sortBy: _sortBy,
        setSortBy: _setSortBy as Dispatch<
          SetStateAction<keyof TableRowType | null>
        >,
        page: _page,
        setPage: _setPage,
        rowsPerPage: _rowsPerPage,
        setRowsPerPage: _setRowsPerPage,
        swappingRows: _swappingRows,
        currentDraggedElementIndex: _currentDraggedElementIndex,
        setCurrentDraggedElementIndex: _setCurrentDraggedElement,
        isSwappingAnimationOnGoing: _isSwappingAnimationOnGoing,
        setIsSwappingAnimationOnGoing: _setIsSwappingAnimationOnGoing,
        currentDraggedOverElementIndex: _currentDraggedOverElementIndex,
        setCurrentDraggedOverElementIndex: _setCurrentDraggedOverElement,
      }}
    >
      <table className=" block bg-white border border-gray-300 shadow-md rounded-lg ">
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
