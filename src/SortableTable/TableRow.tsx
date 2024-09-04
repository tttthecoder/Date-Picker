import { TableRowProps, TableRowType } from "./type";
import { twMerge } from "tailwind-merge";

function TableRow<T extends TableRowType>({
  data,
  baseClass,
  draggedRowClass,
  animatedClass,
  cursorStylesClass,
  className,
  ...rest
}: TableRowProps<T>) {
  return (
    <tr
      draggable
      {...rest}
      style={{ transition: "all 0.06s linear" }}
      className={twMerge(
        baseClass,
        draggedRowClass,
        animatedClass,
        cursorStylesClass
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
