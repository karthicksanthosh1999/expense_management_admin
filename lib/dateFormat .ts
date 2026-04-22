export const dateFormat = (date: Date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ONLY FOR UPDATE FORM DATE INPUT
export const formatDateForInput = (date?: string | Date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};
