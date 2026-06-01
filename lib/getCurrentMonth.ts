export const getDefaultDates = () => {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  return { startDate, endDate };
};

export const getCurrentWeekDates = () => {
  const now = new Date(); // 0 (Sunday) to 6 (Saturday)
  const firstDayOfWeek = now.getDate() - now.getDay(); // Sunday as the first day of the week
  const startDate = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek);
  const endDate = new Date(now.getFullYear(), now.getMonth(), firstDayOfWeek + 7);

  return { startDate, endDate };
}