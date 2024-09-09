import { Dispatch, ReactNode, SetStateAction } from "react";

export type Primitive = string | number | boolean | null;

export type TableRowType = Record<string | number, Primitive> & {
  id: string | number;
};

export type ContextType<T extends TableRowType> = {
  rowsWithSortPaginationAndFilterApplied: T[];
  totalNumOfRowsWithSortAndFilterApplied: number;
  testingOnlyTotalRows: any[];
  sortBy: Extract<keyof T, string | number> | null;
  sortOrder: "ASC" | "DESC" | null;
  filterBy: Extract<keyof T, string | number> | null;
  setFilterBy: Dispatch<
    SetStateAction<Extract<keyof T, string | number> | null>
  >;
  filterByValue: Primitive;
  setFilterByValue: Dispatch<SetStateAction<Primitive>>;
  sort: (sortBy: Extract<keyof T, string>, sortOrder: "ASC" | "DESC") => void;
  page: number | null;
  setPage: Dispatch<SetStateAction<number | null>>;
  rowsPerPage: number | null;
  setRowsPerPage: Dispatch<SetStateAction<number | null>>;
  movingRowToBeAfterAnotherRow: (
    currentID: string | number,
    targetID: string | number
  ) => void;
  totalNumOfRowsWithNothingApplied: number;
  columnNames: (keyof T)[];
};

export interface SortableTableProps<T extends TableRowType> {
  data: T[];
  sortBy?: Extract<keyof T, string | number> | null;
  sortOrder?: "ASC" | "DESC" | null;
  baseRowClass: string;
  draggedRowClass: string;
  rowsPerPage: number;
}

export interface TableRowProps<T>
  extends React.HTMLAttributes<HTMLTableRowElement> {
  data: T;
  cursorStylesClass: string;
  animatedStyles: Record<"transform" | "transition", string> | {};
}
export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableCellElement> {
  headerTitle: string | number;
}

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

export interface CommonTableStateProviderProps<T extends TableRowType> {
  data: T[];
  sortBy?: Extract<keyof T, string | number> | null;
  sortOrder?: "ASC" | "DESC" | null;
  rowsPerPage: number;
  children: ReactNode;
}
