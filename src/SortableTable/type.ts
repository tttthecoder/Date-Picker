import { Dispatch, SetStateAction } from "react";

export type Primitive = string | number | boolean | null | undefined;

export type TableRowType = Record<string | number, Primitive>;

export type ContextType = {
  rows: TableRowType[];
  setRows: Dispatch<SetStateAction<TableRowType[]>>;
  sortBy: keyof TableRowType | null;
  setSortBy: Dispatch<SetStateAction<string | number | null>>;
  sortOrder: "ASC" | "DESC" | null;
  setSortOrder: Dispatch<SetStateAction<"ASC" | "DESC" | null>>;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: Dispatch<SetStateAction<number>>;
  swappingRows: (currentIndex: number, targetIndex: number) => void;
};

export interface SortableTableProps<T extends TableRowType> {
  data: T[];
  sortBy?: Exclude<keyof T, symbol> | null;
  sortOrder?: "ASC" | "DESC" | null;
}

export interface TableRowProps<T>
  extends React.HTMLAttributes<HTMLTableRowElement> {
  data: T;
}
