import { useEffect, useRef } from "react";

export const useOutsideClick = <T extends HTMLElement>(
  callback: Function,
  dependencies: any[]
) => {
  const targetElement = useRef<T>(null);
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      !targetElement.current?.contains(e.target as Node) && callback();
    };
    document.body.addEventListener("click", clickHandler);
    return () => {
      document.body.removeEventListener("click", clickHandler);
    };
  }, [...dependencies]);
  return targetElement;
};
