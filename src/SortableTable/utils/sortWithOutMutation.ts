export function sortWithOutMutation<T extends Record<string | number, any>>(
  arrs: T[],
  sortBy: Extract<keyof T, string | number> | null,
  sortOrder: "ASC" | "DESC"
) {
  return [...arrs].sort((a: T, b: T) => {
    let first = a[`${sortBy}`];
    let second = b[`${sortBy}`];
    if (sortOrder === "ASC") {
      return first! > second! ? 1 : -1;
    } else {
      return first! < second! ? 1 : -1;
    }
  });
}
