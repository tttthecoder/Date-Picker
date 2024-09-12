import { CommonTableStatesProvider } from "./CommonTableStatesProvider.tsx";
import { SortableTableProps, TableRowType } from "./type";
import TableBody from "./TableBody";
import Pagination from "./Pagination";
import Header from "./header.tsx";
import { Table } from "./Table";
import Filter from "./Filter.tsx";

function SortableTable<T extends TableRowType>({
  data,
  sortBy = null,
  sortOrder = null,
  rowsPerPage = 5,
  baseRowClass = "",
  titlesRowClass = "",
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
      <div className={`w-fit max-w-[100%] overflow-x-auto overflow-y-hidden `}>
        <Filter />
        <Table {...rest}>
          <Header titlesRowClass={titlesRowClass} />
          <TableBody
            baseRowClass={baseRowClass}
            draggedRowClass={draggedRowClass}
          />
        </Table>
        <Pagination />
      </div>
    </CommonTableStatesProvider>
  );
}

export default SortableTable;
