import { useEffect, useState } from "react";
import { TableProps } from "./type";

export function Table({ children, ...rest }: TableProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  console.log("table ");
  return (
    <div className="w-full">
      <table
        className={`${
          mounted ? "table-fixed" : "table-auto"
        }  bg-white border border-gray-300 shadow-md  border-collapse`}
      >
        {children}
      </table>
    </div>
  );
}
