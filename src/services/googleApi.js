import axios from "axios"
// import { getAuthUser } from "components/Auth/utils/authUser"
import { isBrowser } from "./general"
import { GATSBY_GOOGLE_CALENDAR_API_URL } from "gatsby-env-variables"

export const googleApi = (props) => {
  if (isBrowser()) {
    let api = axios.create({
      baseURL: GATSBY_GOOGLE_CALENDAR_API_URL,
      headers: {
        Authorization: "Bearer " + (props?.token || ""),
        "Content-Type": "application/json",
      },
    })

    return api
  } else return null
}
