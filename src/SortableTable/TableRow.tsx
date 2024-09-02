import { TableRowProps, TableRowType } from "./type";

function TableRow<T extends TableRowType>({ data, ...rest }: TableRowProps<T>) {
  return (
    <tr
      draggable
      {...rest}
      className={"hover:bg-gray-50 transition-transform duration-[0.09s]"}
    >
      {Object.keys(data).map((key) => {
        return (
          <td
            key={key}
            className="max-w-[300px] py-2 px-4 border-b border-gray-300 text-ellipsis text-nowrap overflow-hidden"
          >
            {data[`${key}`]}
          </td>
        );
      })}
    </tr>
  );
}

export default TableRow;
