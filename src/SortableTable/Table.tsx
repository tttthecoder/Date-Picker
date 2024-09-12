import { useEffect, useState } from "react";
import { TableProps } from "./type";

export function Table({ children, className, ...rest }: TableProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`w-fit max-w-[100%] overflow-x-auto overflow-y-hidden`}>
      <table
        className={`${
          mounted ? "table-fixed" : "table-auto"
        }  w-fit bg-white shadow-md  border-collapse`}
        {...rest}
      >
        {children}
      </table>
    </div>
  );
}
