import { createContext } from "react";

import { data } from "./constants";
import { ContextType, TableRowType } from "./type";
export const TableContext = createContext<ContextType<TableRowType>>({
  rows: data,
  testingOnlyTotalRows: [],
  sortBy: null,
  sort: () => {},
  sortOrder: null,
  page: 1,
  setPage: () => {},
  rowsPerPage: 5,
  setRowsPerPage: () => {},
  movingRowToBeAfterAnotherRow: (currentIndex, targetIndex) => {},
  targetPositionIndex: null,
  setTargetPositionIndex: () => {},
  draggedElementIndex: null,
  setDraggedElementIndex: () => {},
  sizeable: false,
  totalRows: 0,
});
