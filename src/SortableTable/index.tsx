import { CommonTableStatesProvider } from "./CommonTableStatesProvider.tsx";
import { SortableTableProps, TableRowType } from "./type";
import TableBody from "./TableBody";
import Pagination from "./Pagination";
import Header from "./header.tsx";
import { Table } from "./Table";

function SortableTable<T extends TableRowType>({
  data,
  sortBy = null,
  sortOrder = null,
  rowsPerPage = 5,
  baseRowClass = "",
  draggedRowClass = "",
  ...rest
}: SortableTableProps<T>) {
  return (
    <CommonTableStatesProvider
      data={data}
      sortBy={sortBy}
      sortOrder={sortOrder}
      rowsPerPage={rowsPerPage}
    >
      <Table {...rest}>
        <Header />
        <TableBody
          baseRowClass={baseRowClass}
          draggedRowClass={draggedRowClass}
        />
      </Table>
      <Pagination />
    </CommonTableStatesProvider>
  );
}

export default SortableTable;
