const amount = 100000;

export const formatted = (amount: number): string => {
  return `₹${new Intl.NumberFormat("en-IN").format(amount)}`;
};
