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
      className={twMerge(className, cursorStylesClass)}
    >
      {Object.keys(data).map((key) => {
        return (
          <td
            key={key}
            draggable={false}
            className="max-w-[300px] py-2 px-4 text-ellipsis text-nowrap overflow-hidden border-inherit border"
          >
            {data[`${key}`]}
          </td>
        );
      })}
    </tr>
  );
}

export default TableRow;
