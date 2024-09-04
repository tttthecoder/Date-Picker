import { useContext } from "react";
import { TableContext } from "./context";

function header() {
  const { rows, setSortBy, setSortOrder, sortOrder } = useContext(TableContext);
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
                  ? setSortOrder("DESC")
                  : setSortOrder("ASC");
                setSortBy(header);
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
