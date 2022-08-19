export const handleGetPayment = ({ location, vaccineeDispatch }) => {
  let urlSearchParams = new URLSearchParams(location?.search)
  let transactionId = urlSearchParams.get("transaction_id")
  let status = urlSearchParams.get("status")

  let paymentObject = ""
  if (transactionId) {
    paymentObject = {
      transactionId,
      channel: "Brankas",
      date: new Date(),
      status: status === "2" ? "success" : "failed",
    }

    vaccineeDispatch({ type: "SAVE_PAYMENT", payload: paymentObject })
  }
}
