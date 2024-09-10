import { useCallback, useEffect, useState } from "react";

export type CursorType =
  | "auto"
  | "none"
  | "context-menu"
  | "help"
  | "pointer"
  | "progress"
  | "wait"
  | "cell"
  | "crosshair"
  | "text"
  | "vertical-text"
  | "alias"
  | "copy"
  | "move"
  | "no-drop"
  | "not-allowed"
  | "grab"
  | "grabbing"
  | "all-scroll"
  | "col-resize"
  | "row-resize"
  | "n-resize"
  | "e-resize"
  | "s-resize"
  | "w-resize"
  | "ne-resize"
  | "nw-resize"
  | "se-resize"
  | "sw-resize"
  | "ew-resize"
  | "ns-resize"
  | "zoom-in"
  | "zoom-out"
  | ""
  | null;

export function useForcedDocumentCursor(): {
  setDocumentCursor: (value?: CursorType) => void;
} {
  const [_cursor, _setCursor] = useState<CursorType>(null);

  useEffect(() => {
    if (!_cursor) return;

    const div = document.createElement("div");
    // Set the styles
    div.style.position = "fixed";
    div.style.cursor = _cursor;
    div.style.inset = "0";
    (div.style as any).zIndex = 2147483647;

    document.body.appendChild(div);

    return () => {
      document.body.removeChild(div);
    };
  }, [_cursor]);

  const setDocumentCursor = useCallback(
    (value: CursorType = ""): void => {
      // ============== create this function to make sure devs can still pass no arguments to the setState function and to make the identity of setDocumentCursor preserved, like _setCursor ========================
      return _setCursor(value);
    },
    [_setCursor]
  );

  return { setDocumentCursor };
}
