import axios from "axios"

import {
  GATSBY_PAYNAMICS_CLOUD_FUNCTION_URL,
  GATSBY_PAYNAMICS_API_URL,
  GATSBY_PAYNAMICS_USERNAME,
  GATSBY_PAYNAMICS_PASSWORD,
  GATSBY_PAYNAMICS_MERCHANT_ID,
  GATSBY_PAYNAMICS_MERCHANT_KEY,
} from "gatsby-env-variables"

import { generateId } from "../general"

export const paynamics = () => {
  const accountHash = btoa(
    `${GATSBY_PAYNAMICS_USERNAME}:${GATSBY_PAYNAMICS_PASSWORD}`
  )

  let api = axios.create({
    baseURL: GATSBY_PAYNAMICS_CLOUD_FUNCTION_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + accountHash,
      api_url: GATSBY_PAYNAMICS_API_URL,
    },
  })
  return api
}

export const createTransaction = async ({
  requestId,
  transactionDetails,
  customerDetails,
  redirectUrl,
}) => {
  const { paymentMethod, paymentChannel, amount } = transactionDetails
  const {
    firstName,
    lastName,
    middleName,
    legalName,
    tradeName,
    email,
    phoneNumber,
    mobileNumber,
  } = customerDetails
  var payload = {
    merchantCredentials: {
      merchantId: GATSBY_PAYNAMICS_MERCHANT_ID,
      merchantKey: GATSBY_PAYNAMICS_MERCHANT_KEY,
    },
    transactionDetails: {
      request_id: requestId,
      notification_url: redirectUrl,
      response_url: redirectUrl,
      cancel_url: redirectUrl,
      pmethod: paymentMethod,
      pchannel: paymentChannel,
      amount: amount.toString(),
      currency: "PHP",
    },
    customerDetails: {
      fname: firstName || legalName,
      lname: lastName || tradeName,
      mname: middleName || "",
      email: email || "",
      phone: phoneNumber || "",
      mobile: mobileNumber || "",
    },
  }

  let response = await paynamics().post(
    "/transactions",
    JSON.stringify(payload)
  )

  return response.data
}

export const getTransaction = async ({ transactionId }) => {
  let payload = {
    queryRequestId: generateId(10),
    transactionId,
    merchantId: GATSBY_PAYNAMICS_MERCHANT_ID,
    merchantKey: GATSBY_PAYNAMICS_MERCHANT_KEY,
  }

  let response = await paynamics().post("/query", JSON.stringify(payload))
  return response
}
