import { isBrowser } from "services/general"
import { GATSBY_WEBSITE_URL } from "gatsby-env-variables"
import { getSignedInUser, hasSignedInUser } from "auth/services/user"

const getUserRole = (userData) => {
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

export const getAuthenticatedUser = (roles) => {
  let currentUser = null

  if (isBrowser() && hasSignedInUser()) {
    let { userData } = getSignedInUser()
    let userRole = getUserRole(userData)

    let allowedPaths = roles?.find((role) => role?.key === userRole)
      ?.allowedPaths

    currentUser = {
      ...userData,
      allowedPaths: allowedPaths,
    }
  }

  return currentUser
}
