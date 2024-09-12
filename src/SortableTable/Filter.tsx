import React, { useContext, useState } from "react";
import useDebouncedCallback from "../hooks/useDebounce";
import { Primitive } from "./type";
import { TableContext } from "./CommonTableStatesProvider";
import { capitalizeFirstChar } from "../common/utils/helpers/capitalizeFirstChar";
import Select from "../ControlledSelect";
import { IoSearch } from "react-icons/io5";

const Filter: React.FC = () => {
  const {
    filterBy,
    filterByValue,
    setFilterBy,
    setFilterByValue,
    columnNames,
  } = useContext(TableContext);

  const [localFilterByValue, setLocalFilterValue] =
    useState<Primitive>(filterByValue);
  useDebouncedCallback(
    (localFilterByValue: Primitive) => {
      setFilterByValue(localFilterByValue);
    },
    [localFilterByValue],
    200
  );

  // Handle changes in the filter input
  const handleFilterValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilterValue(e.target.value);
  };

  // Handle changes in the select input
  const handleFilterByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(e.target.value);
  };

  return (
    <div className="flex items-center justify-start w-full overflow-auto border border-slate-300 border-b-0 rounded-tl-lg rounded-tr-lg shadow-md font-mono">
      <Select
        getLabel={(value) =>
          value !== null ? capitalizeFirstChar(value.toString()) : "none"
        }
        name="filterBy"
        selectedOption={filterBy}
        options={columnNames}
        className="text-center px-2 py-2 appearance-none border-r border-slate-300 outline-none shadow-sm sm:text-sm "
        onChange={(nextOption) => setFilterBy(nextOption)}
      ></Select>
      <div className="flex items-center justify-center flex-grow  pr-2 border-none">
        <label
          htmlFor="filter-value"
          hidden
          className="block text-sm font-medium text-gray-700 sr-only"
        >
          Filter value:
        </label>
        <input
          id="filter-value"
          type="text"
          value={
            localFilterByValue !== null ? localFilterByValue.toString() : ""
          }
          onChange={handleFilterValueChange}
          placeholder={
            filterBy
              ? `Search by ${filterBy} ...`
              : "Choose a field to search by..."
          }
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm border-none focus:outline-none sm:text-sm"
        />
        <IoSearch className="text-slate-500" />
      </div>
    </div>
  );
};

export default Filter;
