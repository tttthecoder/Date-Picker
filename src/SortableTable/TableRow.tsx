import { TableRowProps, TableRowType } from "./type";
import { twMerge } from "tailwind-merge";

function TableRow<T extends TableRowType>({
  data,
  animatedStyles,
  cursorStylesClass,
  className,
  ...rest
}: TableRowProps<T>) {
  return (
    <tr
      draggable
      {...rest}
      style={{ ...animatedStyles }}
      className={twMerge(
        className,
        cursorStylesClass,
        "last:*:last:rounded-br-lg first:*:last:rounded-bl-lg"
      )}
    >
      {Object.keys(data).map((key) => {
        return (
          <td
            key={key}
            draggable={false}
            className="max-w-[300px] py-2 px-4 text-ellipsis text-nowrap overflow-hidden"
          >
            {data[`${key}`]}
          </td>
        );
      })}
    </tr>
  );
}

export default TableRow;
