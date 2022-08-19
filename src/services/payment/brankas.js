import axios from "axios"

import {
  GATSBY_TEST_BRANKAS_DESTINATION_ACCOUNT_ID,
  GATSBY_BRANKAS_LIVE_DESTINATION_ACCOUNT_ID,
  GATSBY_BRANKAS_CLOUD_FUNCTION_URL,
  GATSBY_BRANKAS_LIVE_API_LINK,
  GATSBY_BRANKAS_LIVE_API_KEY,
  GATSBY_THUMBNAIL_URL,
} from "gatsby-env-variables"

export const brankas = () => {
  let api = axios.create({
    baseURL: GATSBY_BRANKAS_CLOUD_FUNCTION_URL,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": GATSBY_BRANKAS_LIVE_API_KEY,
      api_url: GATSBY_BRANKAS_LIVE_API_LINK,
    },
  })
  return api
}

export const getTransaction = async ({ transactionId }) => {
  let response = await brankas().get(`/transfer?transferId=${transactionId}`)
  return response?.data?.transfers[0]
}
export const createCheckout = async ({
  amountDue,
  customerDetails,
  redirectUrl,
  paymentMethod,
}) => {
  const { email, firstName, lastName, mobileNumber } = customerDetails

  let fromData = {
    type: "BANK",
    country: "PH",
  }

  if (
    GATSBY_TEST_BRANKAS_DESTINATION_ACCOUNT_ID !==
    GATSBY_BRANKAS_LIVE_DESTINATION_ACCOUNT_ID
  )
    fromData.bank_code = `${paymentMethod}_PERSONAL`

  let data = {
    from: fromData,
    destination_account_id: GATSBY_BRANKAS_LIVE_DESTINATION_ACCOUNT_ID,
    amount: {
      cur: "PHP",
      num: parseFloat(amountDue).toFixed(2).replace(/\./g, ""),
    },
    memo: "Vaccination payment",
    customer: {
      fname: firstName,
      lname: lastName,
      email: email,
      mobile: mobileNumber,
    },
    reference_id: "",
    payment_channel: "_",
    client: {
      display_name: "MedGrocer",
      logo_url: GATSBY_THUMBNAIL_URL,
      return_url: redirectUrl,
      fail_url: `https://failed.com`,
      deep_link: false,
      statement_retrieval: false,
    },
  }

  let response = await brankas().post("/checkout", JSON.stringify(data))

  return response.data
}
