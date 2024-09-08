import { useContext } from "react";
import { TableContext } from "./context";
import { FaLongArrowAltUp } from "react-icons/fa";
import { capitalizeFirstChar } from "./utils/capitalizeFirstChar";

function Header() {
  const { sortBy, sortOrder, sort, columnNames } = useContext(TableContext);
  return (
    <thead>
      <tr className="bg-slate-200">
        {columnNames.map((header) => (
          <th
            draggable={false}
            onClick={() => {
              sortOrder === "ASC"
                ? sort(header.toString(), "DESC")
                : sort(header.toString(), "ASC");
            }}
            key={header}
            className="relative py-2 px-4 border-b border-gray-300 text-left cursor-pointer"
          >
            {sortOrder && sortBy === header ? (
              <FaLongArrowAltUp
                size={12}
                className={`absolute right-1 top-1/2 -translate-y-1/2 transition-all ${
                  sortOrder === "ASC" ? "" : "rotate-180"
                }`}
              />
            ) : null}
            {capitalizeFirstChar(header.toString())}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default Header;
