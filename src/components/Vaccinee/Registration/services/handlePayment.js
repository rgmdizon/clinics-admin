import { createCheckout } from "services/payment/brankas"
import { isBrowser } from "services/general"
// import { navigate } from "gatsby"

export const handlePayment = async ({
  vaccineeState,
  location,
  callback,
  values,
}) => {
  let redirectUrl = `${location.origin}/informed-consent`
  let totalAmount = vaccineeState?.payment?.totalAmount

  let paymentMethod = values?.paymentMethod?.includes("BPI") ? "BPI" : "BPI"

  let paymentTransaction = await createCheckout({
    amountDue: totalAmount,
    customerDetails: vaccineeState?.personalDetails,
    redirectUrl,
    paymentMethod,
  })

  let gatewayUrl = paymentTransaction.redirect_uri

  if (isBrowser()) window.open(gatewayUrl, "_self")

  if (callback) callback(paymentTransaction)
}
