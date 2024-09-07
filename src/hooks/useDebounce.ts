import { useEffect } from "react";

function useDebouncedCallback<T extends (...args: any[]) => void>(
  callback: T,
  values: Parameters<T>,
  delay: number,
  dependencies: any[] = []
) {
  useEffect(() => {
    const id = setTimeout(() => {
      callback(...values);
    }, delay);
    return () => clearTimeout(id);
  }, [...values, ...dependencies, delay]);
}

export default useDebouncedCallback;
