import firebase from "firebase"
import { checkIfUserAlreadyExists } from "auth/services/signup"

import {
  GATSBY_WEBSITE_URL,
  GATSBY_FIREBASE_PROJECT_ID,
  GATSBY_FIREBASE_REPRESENTATIVE_ROLE_ID,
  GATSBY_FIREBASE_DEFAULT_VERIFIED_STATUS,
} from "gatsby-env-variables"

/*
 * Creates the user document of the organization owner
 * Returns document uid
 */

export const createOwnerDocument = async ({ registration, authUser }) => {
  const { firstName, lastName, mobileNumber, designation } = registration
  let email = authUser?.email
  let authUid = authUser?.uid

  let userData = await checkIfUserAlreadyExists(authUser.email)
  let userDocumentId = userData?.id

  let userRoles =
    userData?.roles?.filter((role) => role.subdomain !== GATSBY_WEBSITE_URL) ||
    []

  let userAllowedSubdomains =
    userData?.allowedSubdomains?.filter(
      (subdomain) => subdomain !== GATSBY_WEBSITE_URL
    ) || []

  const USER_DOCUMENT = {
    ...userData,
    firstName: firstName || null,
    lastName: lastName || null,
    mobileNumber: mobileNumber || null,
    email: email || null,
    designation: designation || null,
    roles: [
      ...userRoles,
      {
        status: GATSBY_FIREBASE_DEFAULT_VERIFIED_STATUS,
        subdomain: GATSBY_WEBSITE_URL,
        role: GATSBY_FIREBASE_REPRESENTATIVE_ROLE_ID || "WPs209pnZKg7DMtGQR5y",
        projectId: GATSBY_FIREBASE_PROJECT_ID,
      },
    ],
    allowedSubdomains: [...userAllowedSubdomains, GATSBY_WEBSITE_URL],
  }

  /*
   * userData will be null if no document has been generated
   * this is so we can account for duplicate documents made from retries due to duplicate errors
   */

  if (userDocumentId) {
    await firebase
      .firestore()
      .collection("users")
      .doc(userDocumentId)
      .update({ ...USER_DOCUMENT, authUid })
  } else {
    let document = await firebase
      .firestore()
      .collection("users")
      .add({ ...USER_DOCUMENT, authUid })
    userDocumentId = document.id
  }

  sessionStorage.setItem(
    "userData",
    JSON.stringify({ ...USER_DOCUMENT, authUid, id: userDocumentId })
  )
  sessionStorage.setItem(
    "accountOwnerData",
    JSON.stringify({ ...USER_DOCUMENT, id: userDocumentId })
  )

  return userDocumentId
}
