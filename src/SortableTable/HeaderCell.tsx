import React, { useContext, useEffect, useRef, useState } from "react";
import { TableHeaderCellProps } from "./type";
import { FaLongArrowAltUp } from "react-icons/fa";
import { capitalizeFirstChar } from "./utils/capitalizeFirstChar";
import { TableContext } from "./CommonTableStatesProvider";

export function HeaderCell({
  headerTitle,
  children,
  ...rest
}: TableHeaderCellProps) {
  // ============================================= common table states  ==========================================================
  const { sortBy, sortOrder, sort } = useContext(TableContext);

  // ============================================= header cell own states  ==========================================================
  const headerCellRef = useRef<HTMLTableCellElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [colWidth, setColWidth] = useState<number | null>(null);
  const [minColWidth, setMinColWidth] = useState<number | null>(null);
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const [starterMouseDownPosition, setInitialMouseDownPosition] = useState<
    number | null
  >(null);

  // ========================= this effect is for getting the initial width of the column after first mount =============================
  useEffect(() => {
    const width =
      headerCellRef.current!.getBoundingClientRect().right -
      headerCellRef.current!.getBoundingClientRect().left;

    setColWidth(width);
  }, []);

  // ========================= this effect is for getting the initial width of the span, this width will be the min width of the column ====================
  useEffect(() => {
    const textWidth =
      spanRef.current!.getBoundingClientRect().right -
      spanRef.current!.getBoundingClientRect().left;

    setMinColWidth(textWidth);
  }, []);

  // ========================= this effect is for the dynamic handling of the cursor ===================================================
  useEffect(() => {
    if (!isMouseDown) return;

    const mouseMoveHandler = (e: MouseEvent) => {
      const dx = e.clientX - starterMouseDownPosition!;
      if (colWidth! + dx < minColWidth!) return;
      setColWidth(colWidth! + dx);
    };
    const mouseUpHandler = (event: MouseEvent) => {
      setIsMouseDown(false);
      setInitialMouseDownPosition(null);
    };

    document.addEventListener("mousemove", mouseMoveHandler, true);
    document.addEventListener("mouseup", mouseUpHandler, true);

    return () => {
      document.removeEventListener("mousemove", mouseMoveHandler, true);
      document.removeEventListener("mouseup", mouseUpHandler, true);
    };
  }, [isMouseDown]);

  function handleMouseDownOnResizer(
    event: React.MouseEvent<HTMLTableCellElement, MouseEvent>
  ) {
    console.log("mouse down");
    setIsMouseDown(true);
    setInitialMouseDownPosition(event.clientX);
  }

  return (
    <th
      {...rest}
      key={headerTitle}
      ref={headerCellRef}
      draggable={false}
      className="select-none relative py-1 text-left cursor-pointer last:rounded-tr-md first:rounded-tl-md"
      onClick={() => {
        sortOrder === "ASC"
          ? sort(headerTitle.toString(), "DESC")
          : sort(headerTitle.toString(), "ASC");
      }}
      style={{ width: colWidth?.toString() + "px" }}
    >
      <span className="inline-block pl-2 pr-6" ref={spanRef}>
        {capitalizeFirstChar(headerTitle.toString())}
      </span>
      {sortOrder && sortBy === headerTitle ? (
        <FaLongArrowAltUp
          size={12}
          color="gray"
          className={`absolute right-3 top-1/2 -translate-y-1/2 transition-all ${
            sortOrder === "ASC" ? "" : "rotate-180"
          }`}
        />
      ) : null}
      <div
        onMouseDown={handleMouseDownOnResizer}
        className="absolute right-1 top-1/2 -translate-y-1/2 h-[60%] w-[1px] transition-none
         bg-slate-500 hover:cursor-col-resize hover:bg-slate-700 hover:scale-x-125 active:bg-slate-700 active:scale-x-125
         "
      ></div>
    </th>
  );
}
