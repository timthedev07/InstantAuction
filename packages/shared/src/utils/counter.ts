export const Counter = (array: (string | number)[]) => {
  const count: Record<string | number, number> = {};
  array.forEach((val) => (count[val] = (count[val] || 0) + 1));
  return count;
};
