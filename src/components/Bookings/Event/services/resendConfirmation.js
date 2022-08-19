import axios from "axios"

import {
  GATSBY_WEBSITE_URL,
  GATSBY_INTEGROMAT_SEND_VACCINEE_REGISTRATION_CONFIRMATION_WEBHOOK,
} from "gatsby-env-variables"

export const resendConfirmation = async ({
  payload,
  callback,
  errorCallback,
}) => {
  let {
    vaccinee,
    vaccinationUid,
    bookingDocument,
    organizationDocument,
  } = payload

  try {
    let response = await axios.post(
      GATSBY_INTEGROMAT_SEND_VACCINEE_REGISTRATION_CONFIRMATION_WEBHOOK,
      {
        domain: GATSBY_WEBSITE_URL,
        vaccinationUid: vaccinationUid,
        vaccinee: vaccinee,
        bookingDocument,
        organizationDocument,
        enrollmentCode: vaccinee?.enrollmentCode || "NA",
      }
    )

    if (callback) callback()
    return response
  } catch (error) {
    if (errorCallback) errorCallback()
  }
}
