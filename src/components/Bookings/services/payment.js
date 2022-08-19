import { createBookingDocument } from "./book"
import { generateId, isBrowser } from "services/general"
import { createTransaction } from "services/payment/paynamics"
import { createCheckout } from "services/payment/brankas"
import { navigate } from "gatsby"

export const handleBookingPayment = async ({
  bookingData,
  gateway,
  transactionDetails,
  customerDetails,
  location,
  callback,
  errorCallback,
}) => {
  const { amount } = transactionDetails
  let redirectUrl = `${location.origin}/bookings/checkout/verify`
  let gatewayUrl
  if (gateway) {
    try {
      switch (gateway) {
        case "paynamics":
          let transactionId = generateId(10)
          let createdPaynamicsTransaction = await createTransaction({
            requestId: transactionId,
            redirectUrl: `${redirectUrl}/?transaction_id=${transactionId}`,
            transactionDetails,
            customerDetails,
          })
          gatewayUrl = createdPaynamicsTransaction.payment_action_info
          break
        case "brankas":
        default:
          let createdBrankasTransaction = await createCheckout({
            amountDue: amount,
            customerDetails,
            redirectUrl,
          })
          gatewayUrl = createdBrankasTransaction.redirect_uri
          break
      }
      await createBookingDocument({
        bookingData,
        paymentData: {
          amount,
          status: "pending",
          gateway,
        },
      })
      if (isBrowser()) {
        window.open(gatewayUrl, "_self")
      }
      if (callback) callback()
    } catch (error) {
      if (errorCallback) errorCallback()
    }
  } else {
    await createBookingDocument({
      bookingData,
      paymentData: {
        amount,
        status: "completed",
        gateway: "prepaid",
      },
      callback: (data) => {
        if (callback) callback()
        navigate("/bookings/book/send-invites", { state: data })
      },
    })
  }
}
