import React, { useContext, useState } from "react";
import { TableContext } from "./context.tsx";
import useDebouncedCallback from "../hooks/useDebounce";
import { Primitive } from "./type";

const Filter: React.FC = () => {
  const {
    filterBy,
    filterByValue,
    setFilterBy,
    setFilterByValue,
    columnNames,
  } = useContext(TableContext);

  const [localFilterValue, setLocalFilterValue] =
    useState<Primitive>(filterByValue);
  useDebouncedCallback(
    (localFilterValue: Primitive) => {
      setFilterByValue(localFilterValue);
    },
    [localFilterValue],
    200
  );
  console.log("filter", filterBy, filterByValue, localFilterValue);

  // Handle changes in the filter input
  const handleFilterValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilterValue(e.target.value);
  };

  // Handle changes in the select input
  const handleFilterByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(e.target.value);
  };

  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-md">
      <div className="mb-4">
        <label
          htmlFor="filter-by"
          className="block text-sm font-medium text-gray-700"
        >
          Filter by:
        </label>
        <select
          id="filter-by"
          value={filterBy ? filterBy : undefined}
          onChange={handleFilterByChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {columnNames.map((column) => {
            return (
              <option key={column} value={column}>
                {column.toString().toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label
          htmlFor="filter-value"
          className="block text-sm font-medium text-gray-700"
        >
          Filter value:
        </label>
        <input
          id="filter-value"
          type="text"
          value={localFilterValue !== null ? localFilterValue.toString() : ""}
          onChange={handleFilterValueChange}
          placeholder={filterBy ? `Enter ${filterBy}` : "..."}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
  );
};

export default Filter;
