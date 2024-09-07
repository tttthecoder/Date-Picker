export function isInRangeFromDraggedElementToTargetPosition(
  num: number,
  a: number,
  b: number
) {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return num >= min && num <= max;
}
