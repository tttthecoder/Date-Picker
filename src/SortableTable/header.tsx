import { useContext } from "react";
import { TableContext } from "./context";

function header() {
  const { rows, sortBy, sortOrder, sort } = useContext(TableContext);
  const keys = Object.keys(rows[0]);
  return (
    <thead>
      <tr className="bg-gray-100">
        {keys.map((header) => {
          return (
            <th
              draggable={false}
              onClick={() => {
                sortOrder === "ASC"
                  ? sort(header, "DESC")
                  : sort(header, "ASC");
              }}
              key={header}
              className="py-2 px-4 border-b border-gray-300 text-left cursor-pointer"
            >
              {header.toUpperCase()}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default header;
