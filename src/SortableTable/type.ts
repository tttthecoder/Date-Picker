import { Dispatch, SetStateAction } from "react";

export type Primitive = string | number | boolean | null | undefined;

export type TableRowType = Record<string | number, Primitive> & {
  id: string | number;
};

export type ContextType<T extends TableRowType> = {
  rows: T[];
  testingOnlyTotalRows: any[];
  sortBy: Extract<keyof T, string | number> | null;
  sortOrder: "ASC" | "DESC" | null;
  sort: (sortBy: Extract<keyof T, string>, sortOrder: "ASC" | "DESC") => void;
  page: number | null;
  setPage: Dispatch<SetStateAction<number | null>>;
  rowsPerPage: number | null;
  setRowsPerPage: Dispatch<SetStateAction<number | null>>;
  movingRowToBeAfterAnotherRow: (
    currentID: string | number,
    targetID: string | number
  ) => void;
  targetPositionIndex: number | null;
  setTargetPositionIndex: Dispatch<SetStateAction<number | null>>;
  draggedElementIndex: number | null;
  setDraggedElementIndex: Dispatch<SetStateAction<number | null>>;
  sizeable: boolean;
  totalRows: number;
};

export interface SortableTableProps<T extends TableRowType> {
  data: T[];
  sortBy?: Extract<keyof T, string | number> | null;
  sortOrder?: "ASC" | "DESC" | null;
  baseRowClass: string;
  draggedRowClass: string;
  sizeable?: boolean;
  rowsPerPage: number;
}

export interface TableRowProps<T>
  extends React.HTMLAttributes<HTMLTableRowElement> {
  data: T;
  cursorStylesClass: string;
  animatedStyles: Record<"transform" | "transition", string> | {};
}
