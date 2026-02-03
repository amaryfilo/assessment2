export const mean = (items: number[]): number => {
  if (items.length === 0) return 0;
  return items.reduce((sum, num) => sum + num, 0) / items.length;
};
