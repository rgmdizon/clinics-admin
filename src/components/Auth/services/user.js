import { camelizeKeys } from "humps"
import { isBrowser } from "services/general"
import { GATSBY_WEBSITE_URL } from "gatsby-env-variables"

export const hasSignedInUser = () => {
  if (isBrowser()) {
    const USER = Object.keys(window.sessionStorage).filter((item) =>
      item.startsWith("firebase:authUser")
    )[0]

    return USER
  }
}

//IMPORTANT: this function builds the data you need from firebase on sign-in
export const getSignedInUser = () => {
  if (isBrowser()) {
    const fauthUser = Object.keys(window.sessionStorage).filter((item) =>
      item.startsWith("firebase:authUser")
    )[0]
    const authUser = JSON.parse(sessionStorage.getItem(fauthUser))
    const userData = camelizeKeys(
      JSON.parse(sessionStorage.getItem("userData"))
    )
    const organization = camelizeKeys(
      JSON.parse(sessionStorage.getItem("organization"))
    )
    const bookingsData = camelizeKeys(
      JSON.parse(sessionStorage.getItem("bookingsData"))
    )
    const accountOwnerData = camelizeKeys(
      JSON.parse(sessionStorage.getItem("accountOwnerData"))
    )
    const addresses = JSON.parse(sessionStorage.getItem("addresses"))

    const doctorData = JSON.parse(sessionStorage.getItem("doctorData"))
    return {
      authUser,
      userData,
      addresses,
      organization,
      accountOwnerData,
      bookingsData,
      doctorData,
    }
  } else return {}
}

export const getUserRole = () => {
  const { userData } = getSignedInUser()
  let parsedRole = ""

  if (userData) {
    let userRole = userData?.roles?.find(
      (role) => role?.subdomain === GATSBY_WEBSITE_URL
    )

    if (userRole) {
      parsedRole = btoa(`${userRole?.role}-${userRole?.status}`)
    }
  }

  return parsedRole
}

export const hasRoles = () => {
  const { userData } = getSignedInUser()

  let hasRoles = false

  if (userData) {
    let activeRole = userData?.roles?.find(
      (role) =>
        role?.subdomain === GATSBY_WEBSITE_URL && role?.status === "verified"
    )
    if (activeRole) hasRoles = true
  }

  return hasRoles
}

export const isEmailVerified = () => {
  const { authUser } = getSignedInUser()

  if (authUser && authUser.emailVerified) {
    return true
  }
  return false
}
