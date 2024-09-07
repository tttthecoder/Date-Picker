import { useContext } from "react";
import { TableContext } from "./context";

function Header() {
  const { sortBy, sortOrder, sort, columnNames } = useContext(TableContext);
  return (
    <thead>
      <tr className="bg-gray-100">
        {columnNames.map((header) => {
          return (
            <th
              draggable={false}
              onClick={() => {
                sortOrder === "ASC"
                  ? sort(header.toString(), "DESC")
                  : sort(header.toString(), "ASC");
              }}
              key={header}
              className="py-2 px-4 border-b border-gray-300 text-left cursor-pointer"
            >
              {header.toString().toUpperCase()}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

export default Header;
