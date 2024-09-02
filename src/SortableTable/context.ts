import { createContext } from "react";

import { data } from "./constants";
import { ContextType } from "./type";
export const TableContext = createContext<ContextType>({
  rows: data,
  setRows: () => {},
  sortBy: null,
  sortOrder: null,
  setSortBy: () => {},
  setSortOrder: () => {},
  page: 1,
  setPage: () => {},
  rowsPerPage: 5,
  setRowsPerPage: () => {},
  swappingRows: (currentIndex, targetIndex) => {},
});
