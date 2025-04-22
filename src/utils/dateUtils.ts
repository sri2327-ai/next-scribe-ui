
// Utility functions for date handling
export const formatDate = (date: Date): string => date.toISOString().split('T')[0];

export const getDaysInMonth = (year: number, month: number): number => 
  new Date(year, month, 0).getDate();

export const getWeekDates = (date: Date): { start: Date; end: Date } => {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay());
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start, end };
};
