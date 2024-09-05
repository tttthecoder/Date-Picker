import { DragEvent, useContext } from "react";
import { TableContext } from "./context";
import TableRow from "./TableRow";
import { isInRangeFromDraggedElementToTargetPosition } from "./utils";

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
    movingRowToBeAfterAnotherRow,
    draggedElementIndex,
    setDraggedElementIndex,
    targetPositionIndex,
    setTargetPositionIndex,
  } = useContext(TableContext);

  const handleDragEnd = (e: DragEvent, index: number) => {
    // this function will be called at the end of the dragging operation and inside this function, we have the latest variables' values.
    setTargetPositionIndex(null);
    setDraggedElementIndex(null);
    // if we don't have target, we are not moving at all, then returns. When dragged element index equals target position index, we also don't have to change the dragged element to a new position in the array!
    if (!targetPositionIndex || draggedElementIndex === targetPositionIndex)
      return;
    const targetID = rows[targetPositionIndex as number].id;
    const currentID = rows[draggedElementIndex as number].id;
    movingRowToBeAfterAnotherRow(currentID, targetID);
  };
  const handleDragStart = (e: DragEvent, index: any) => {
    setSortBy(null);
    setSortOrder(null);
    setDraggedElementIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragEnter = (e: DragEvent, index: number) => {
    e.preventDefault();
    setTargetPositionIndex(index);
  };

  if (draggedElementIndex !== null && targetPositionIndex !== null) {
    var draggedElementAnimatedStyles = {},
      otherElementsInRangeAnimatedStyles = {};
    const distance = Math.abs(draggedElementIndex - targetPositionIndex) * 100;
    draggedElementAnimatedStyles =
      draggedElementIndex > targetPositionIndex
        ? {
            transition: "all 0.2s linear",
            transform: `translateY(${-distance}%)`,
          }
        : {
            transition: "all 0.2s linear",
            transform: `translateY(${distance}%)`,
          };

    otherElementsInRangeAnimatedStyles =
      draggedElementIndex > targetPositionIndex
        ? {
            transition: "all 0.2s linear",
            transform: `translateY(100%)`,
          }
        : {
            transition: "all 0.2s linear",
            transform: `translateY(-100%)`,
          };
  }

  return (
    <tbody>
      {rows.map((row, index) => {
        var animatedStylesObj: Record<string, any>;
        var cursorStylesClass: string;
        var myPositionIndexWithTranslationFactoredIn: number;
        if (draggedElementIndex !== null) {
          cursorStylesClass = "cursor-grabbing";
          const isInRange = isInRangeFromDraggedElementToTargetPosition(
            index,
            draggedElementIndex as number,
            targetPositionIndex as number
          );
          const isBeingDraggedElement = draggedElementIndex === index;
          animatedStylesObj = isBeingDraggedElement
            ? draggedElementAnimatedStyles
            : isInRange
            ? otherElementsInRangeAnimatedStyles
            : { transform: "none", transition: "all 0.2s linear" };

          // You have to adjust to get the real position (with translation factored in) of the element because the element could be translated to a
          // different position in the array and its current translated position index might not always be its index
          myPositionIndexWithTranslationFactoredIn = isBeingDraggedElement
            ? (targetPositionIndex as number)
            : isInRange
            ? (targetPositionIndex as number) > draggedElementIndex
              ? index - 1
              : index + 1
            : index;
        } else {
          animatedStylesObj = { transform: "none", transition: "none" };
          cursorStylesClass = "cursor-grab";
          myPositionIndexWithTranslationFactoredIn = index;
        }
        return (
          <TableRow
            className={
              baseRowClass +
              (index === draggedElementIndex ? " " + draggedRowClass : " ")
            }
            cursorStylesClass={cursorStylesClass}
            animatedStyles={animatedStylesObj}
            onDragStart={
              draggedElementIndex === null
                ? (e: DragEvent) => {
                    handleDragStart(e, index);
                  }
                : undefined
            }
            onDragEnter={
              draggedElementIndex !== null
                ? (e: DragEvent) =>
                    handleDragEnter(e, myPositionIndexWithTranslationFactoredIn)
                : undefined
            }
            onDragEnd={
              draggedElementIndex !== null && draggedElementIndex === index
                ? (e) => {
                    handleDragEnd(e, index);
                  }
                : undefined
            }
            onDragOver={
              draggedElementIndex !== null
                ? (e) => {
                    e.preventDefault();
                  }
                : undefined
            }
            key={row.id!.toString()}
            data={row}
          />
        );
      })}
    </tbody>
  );
}
