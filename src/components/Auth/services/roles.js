import { isBrowser } from "services/general"
import { GATSBY_WEBSITE_URL } from "gatsby-env-variables"
import { getSignedInUser, hasSignedInUser } from "./user"

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

export const checkIfUserIsAuthorized = (allowedPaths) => {
  let isUserAuthorized = false
  let pathName = window?.location?.pathname

  for (let counter = 0; counter < allowedPaths?.length; counter++) {
    let path = allowedPaths[counter]
    if (path?.includes("*") && pathName?.includes(path?.replace("/*", ""))) {
      isUserAuthorized = true
      break
    }
    isUserAuthorized = pathName === path?.replace("/*", "")
  }

  return isUserAuthorized
}
