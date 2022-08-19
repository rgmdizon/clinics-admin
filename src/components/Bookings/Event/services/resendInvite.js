import axios from "axios"

import { isBrowser } from "services/general"
import {
  GATSBY_WEBSITE_URL,
  GATSBY_INTEGROMAT_RESEND_INVITE_WEBHOOK,
} from "gatsby-env-variables"

export const resendInvite = async ({ vaccinee, callback, errorCallback }) => {
  let isLocalhost = false
  try {
    if (isBrowser() && window?.location?.hostname === "localhost")
      isLocalhost = true

    let response = await axios.post(GATSBY_INTEGROMAT_RESEND_INVITE_WEBHOOK, {
      domain: isLocalhost ? "http://localhost:8002" : GATSBY_WEBSITE_URL,
      vaccinee,
    })

    if (callback) callback()

    return response
  } catch (error) {
    if (errorCallback) errorCallback(error)
  }
}
