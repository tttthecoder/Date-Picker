import { DragEvent, TransitionEvent, useContext, useRef } from "react";
import { TableContext } from "./context";
import TableRow from "./TableRow";

export default function TableBody({
  baseRowClass,
  draggedRowClass,
}: {
  baseRowClass: string;
  draggedRowClass: string;
}) {
  const {
    rows,
    setSortBy,
    setSortOrder,
    page,
    rowsPerPage,
    swappingRows,
    currentDraggedElementIndex,
    setCurrentDraggedElementIndex,
    currentDraggedOverElementIndex,
    setCurrentDraggedOverElementIndex,
    isSwappingAnimationOnGoing,
    setIsSwappingAnimationOnGoing,
  } = useContext(TableContext);
  const tableRef = useRef<HTMLTableSectionElement>(null);

  const handleDragStart = (e: DragEvent, index: any) => {
    setSortBy(null);
    setSortOrder(null);
    setCurrentDraggedElementIndex(index);
    setCurrentDraggedOverElementIndex(null);
    e.dataTransfer.effectAllowed = "move";

    const freezedTargetElement = e.target;
    const dragEndHanlder = (e: DragEvent) => {
      setCurrentDraggedElementIndex(null);
      setCurrentDraggedOverElementIndex(null);
      setIsSwappingAnimationOnGoing(false);
    };
    (freezedTargetElement as any).addEventListener("dragend", dragEndHanlder, {
      once: true,
    });
  };

  const handleDragOver = (e: DragEvent, index: number) => {
    e.preventDefault();

    if (isSwappingAnimationOnGoing || index === currentDraggedElementIndex) {
      return;
    }

    setIsSwappingAnimationOnGoing(true);
    setCurrentDraggedOverElementIndex(index);
  };

  let draggedElementAnimatedStyles: string = "",
    draggedOverElementAnimatedStyles: string = "";

  if (
    currentDraggedOverElementIndex !== null &&
    currentDraggedElementIndex !== null &&
    isSwappingAnimationOnGoing
  ) {
    draggedElementAnimatedStyles =
      currentDraggedOverElementIndex > currentDraggedElementIndex
        ? " translate-y-full "
        : " -translate-y-full ";
    draggedOverElementAnimatedStyles =
      currentDraggedOverElementIndex < currentDraggedElementIndex
        ? " translate-y-full "
        : " -translate-y-full ";
  }

  console.log(
    currentDraggedElementIndex,
    currentDraggedOverElementIndex,
    isSwappingAnimationOnGoing
  );
  return (
    <tbody ref={tableRef}>
      {rows.map((row, index) => {
        return (
          <TableRow
            baseClass={baseRowClass}
            cursorStylesClass={
              currentDraggedElementIndex !== null
                ? "cursor-grabbing"
                : "cursor-grab"
            }
            draggedRowClass={
              currentDraggedElementIndex === index ? draggedRowClass : ""
            }
            animatedClass={`${
              isSwappingAnimationOnGoing
                ? currentDraggedElementIndex === index
                  ? draggedElementAnimatedStyles
                  : currentDraggedOverElementIndex === index
                  ? draggedOverElementAnimatedStyles
                  : ""
                : ""
            }`}
            onDragStart={
              currentDraggedElementIndex === null
                ? (e: DragEvent) => {
                    handleDragStart(e, index);
                  }
                : () => {}
            }
            onDragOver={
              currentDraggedElementIndex !== null
                ? (e: DragEvent) => handleDragOver(e, index)
                : () => {}
            }
            onTransitionEnd={
              isSwappingAnimationOnGoing && currentDraggedElementIndex === index
                ? (e: TransitionEvent) => {
                    // only interested in transform property
                    if (e.propertyName !== "transform") return;

                    setIsSwappingAnimationOnGoing(false);
                    setCurrentDraggedElementIndex(
                      currentDraggedOverElementIndex
                    );
                    setCurrentDraggedOverElementIndex(null);
                    swappingRows(
                      currentDraggedElementIndex as number,
                      currentDraggedOverElementIndex as number
                    );
                  }
                : (e: TransitionEvent) => {}
            }
            // keys here to make sure the two nodes involved in animations will get destroyed and rebuilt!
            key={row.id!.toString() + index.toString()}
            data={row}
          />
        );
      })}
    </tbody>
  );
}
