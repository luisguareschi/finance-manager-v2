export const formatCurrency = (amount: number) => {
  // Format amount to EUR currency format
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
};
