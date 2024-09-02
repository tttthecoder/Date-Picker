import { DragEvent, useContext, useEffect, useRef } from "react";
import { TableContext } from "./context";
import TableRow from "./TableRow";

export default function TableBody() {
  const { rows, setSortBy, setSortOrder, page, rowsPerPage, swappingRows } =
    useContext(TableContext);
  const tableRef = useRef<HTMLTableSectionElement>(null);
  const draggedElementIndexRef = useRef<number>(null);
  const beingDraggedOverElementIndexRef = useRef<number>(null);
  const isAnimationOngoing = useRef<boolean>(false);
  useEffect(() => {
    // release the lock and update the currently being dragged element's index correspondingly
    if (isAnimationOngoing.current) {
      isAnimationOngoing.current = false;
      (draggedElementIndexRef as any).current = (
        beingDraggedOverElementIndexRef as any
      ).current;
      (beingDraggedOverElementIndexRef as any).current = null;
    }
  });
  const handleDragStart = (e: DragEvent, index: any) => {
    setSortBy(null);
    setSortOrder(null);

    (draggedElementIndexRef as any).current = index;
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragOver = (e: DragEvent, index: number) => {
    // draggedElementIndexRef.current is the element being currently dragged!
    // index is the index of the element that is being dragged over!!!

    e.preventDefault();

    // guard for animation!
    if (isAnimationOngoing.current) return;

    if (index === draggedElementIndexRef.current) return;

    // remember the being dragged over element!
    (beingDraggedOverElementIndexRef as any).current = index;

    // locking for animation!
    isAnimationOngoing.current = true;

    // handle actual DOM nodes animation
    const currentDraggingDomNode = tableRef.current?.children![
      draggedElementIndexRef.current as number
    ] as HTMLTableRowElement;
    const currentDraggedOverDomNode = tableRef.current?.children[
      index
    ] as HTMLTableRowElement;

    if (index > draggedElementIndexRef.current!) {
      currentDraggingDomNode.style.transform = `translateY(100%)`;
      currentDraggedOverDomNode.style.transform = `translateY(-100%)`;
    } else {
      currentDraggingDomNode.style.transform = `translateY(-100%)`;
      currentDraggedOverDomNode.style.transform = `translateY(100%)`;
    }

    currentDraggingDomNode?.addEventListener("transitionend", () => {
      swappingRows(
        page * rowsPerPage + draggedElementIndexRef.current!,
        page * rowsPerPage + index
      );
    });
  };

  return (
    <tbody ref={tableRef}>
      {rows.map((row, index) => {
        return (
          <TableRow
            onDragStart={(e: DragEvent) => {
              handleDragStart(e, index);
            }}
            onDragOver={(e: DragEvent) => handleDragOver(e, index)}
            // keys here to make sure the two nodes involved in animations will get destroyed and rebuilt!
            key={row.id!.toString() + index.toString()}
            data={row}
          />
        );
      })}
    </tbody>
  );
}
