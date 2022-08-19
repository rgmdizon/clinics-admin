export const getAvailablePaymentMethods = ({ code }) => {
  return {
    order: 1,
    section: "Select Payment Methods",
    type: "radio",
    label: "Payment Method",
    options: code?.paymentMethod || [],
    required: true,
    name: "paymentMethod",
  }
}
