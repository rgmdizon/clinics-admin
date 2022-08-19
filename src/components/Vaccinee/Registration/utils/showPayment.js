export const showPayment = (arrangement) => {
  return String(arrangement).toLowerCase().localeCompare("company-paid")
}
