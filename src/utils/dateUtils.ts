
export const formatDate = (date: Date): string => date.toISOString().split("T")[0];
export const getDaysInMonth = (year: number, month: number): number => (
  new Date(year, month, 0).getDate()
);
