import { useEffect, useRef } from "react";

export const triggerCbOnEscapeKeyForAnElement = <T extends HTMLElement>(
  callback: Function,
  dependencies: any[]
) => {
  const wrapper = useRef<T>(null);
  useEffect(() => {
    if (wrapper.current!.tabIndex < 0) {
      wrapper.current!.tabIndex = 0;
    }
  });

  useEffect(() => {
    const bodyEscapeKeyHandler = (e: KeyboardEvent) => {
      wrapper.current?.contains(e.target as Node) &&
        e.key === "Escape" &&
        callback();
    };
    document.body.addEventListener("keydown", bodyEscapeKeyHandler);
    return () => {
      document.body.removeEventListener("keydown", bodyEscapeKeyHandler);
    };
  }, [...dependencies]);
  return wrapper;
};
