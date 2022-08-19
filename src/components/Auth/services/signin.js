import React from "react"
import firebase from "firebase"
import { navigate, Link } from "gatsby"

import {
  initializeBookingSnapshot,
  initializeOrganizationSnapshot,
} from "./snapshotListeners"
import { updateAllocation } from "./allocations"
import { handleSignOut } from "./signout"
import { isBrowser, isObjectEmpty } from "services/general"
import VerifyEmailModal from "../VerifyEmailModal"

import { GATSBY_WEBSITE_URL } from "gatsby-env-variables"

export const verifyUser = async ({ organization, userData }) => {
  let roles = userData.roles

  let updatedRoles = []

  if (organization?.allocations) {
    roles.forEach((role) => {
      if (
        role?.subdomain === GATSBY_WEBSITE_URL &&
        role.status === "unverified"
      ) {
        role.status = "verified"
        updatedRoles.push(role)
      }
    })
  }

  //Update only if a role was updated
  if (updatedRoles.length > 0)
    await firebase
      .firestore()
      .collection("users")
      .doc(userData.id)
      .update({
        ...userData,
        roles,
      })

  return {
    ...userData,
    roles,
  }
}

export const getDocumentData = async ({
  collectionName,
  fieldName,
  value,
  operation = "==",
}) => {
  const filteredDocuments = await firebase
    .firestore()
    .collection(collectionName)
    .where(fieldName, operation, value)
    .get()
  let data
  filteredDocuments.forEach((doc) => {
    data = { ...doc.data(), id: doc?.id }
  })

  if (data) {
    return data
  } else {
    return {}
  }
}

export const getUserData = async ({ authUid }) => {
  let userData = await getDocumentData({
    collectionName: "users",
    fieldName: "authUid",
    operation: "==",
    value: authUid,
  })
  return userData
}

export const getOrganization = async ({ userDocumentId }) => {
  if (userDocumentId) {
    let organization = await getDocumentData({
      collectionName: "organizations",
      fieldName: "users",
      operation: "array-contains",
      value: userDocumentId,
    })
    await initializeOrganizationSnapshot({ userDocumentId })

    return organization
  } else return {}
}

export const getBookingsData = async ({ organizationId }) => {
  if (organizationId) {
    let bookings = []
    let bookingsData = await firebase
      .firestore()
      .collection("bookings")
      .where("organizationId", "==", organizationId)
      .get()
    bookingsData.forEach((doc) => {
      if (!!doc) bookings.push({ ...doc?.data(), id: doc?.id })
    })

    await initializeBookingSnapshot({ organizationId, bookings })

    return bookings
  } else return []
}

export const getAccountOwnerData = async ({ ownerDocumentId }) => {
  if (ownerDocumentId) {
    let data = await firebase
      .firestore()
      .collection("users")
      .doc(ownerDocumentId)
      .get()

    return { ...data?.data(), id: data?.id }
  }
  return {}
}

export const getUserAddresses = async ({ addressesId }) => {
  let filteredAddress = await firebase
    .firestore()
    .collection("addresses")
    .doc(addressesId || " ")
    .get()
  if (filteredAddress.data())
    filteredAddress = {
      ...filteredAddress.data(),
      id: filteredAddress.id,
    }
  else filteredAddress = {}

  return filteredAddress
}

export const handleSigninNavigate = ({ organization }) => {
  switch (true) {
    case !isObjectEmpty(organization):
      navigate("/profile")
      break
    default:
      navigate("/register")
      break
  }
}

export const handleEmailLogin = async ({
  values,
  setMessage,
  errorCallback,
  dispatch,
  setLoading,
  location,
}) => {
  let email = values?.email
  let password = values?.password

  try {
    // Sign in user
    let response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)

    // Handle if emil is verified through email verification
    const isVerified = response?.user?.emailVerified
    if (isVerified) {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

      const authUid = response?.user?.uid

      let userData = await getUserData({ authUid })

      let organization = await getOrganization({
        userDocumentId: userData?.id,
      })

      let bookingsData = await getBookingsData({
        organizationId: organization?.id,
      })

      let addressesId = organization?.addressesId

      let userAddresses = await getUserAddresses({ addressesId })
      //IMPORTANT: current user may be different from the account owner
      let accountOwnerData = await getAccountOwnerData({
        ownerDocumentId: organization?.owner,
      })
      userData = await verifyUser({ organization, userData })

      // Save user data and addresses to session
      if (isBrowser()) {
        sessionStorage.setItem("userData", JSON.stringify({ ...userData }))
        sessionStorage.setItem("addresses", JSON.stringify(userAddresses))
        sessionStorage.setItem(
          "bookingsData",
          JSON.stringify([...bookingsData])
        )
        sessionStorage.setItem("organization", JSON.stringify(organization))
        sessionStorage.setItem(
          "accountOwnerData",
          JSON.stringify(accountOwnerData)
        )
      }

      if (organization?.id) {
        await updateAllocation({
          organization,
          bookingsData,
          userData,
          authUser: response?.user,
        })
      }

      //TO DO: has to handle if the account has already registered an organization (if yes, go to profile)
      handleSigninNavigate({ organization })
      // navigate("/register/mechanics")
    } else {
      // If not verified, prevent login and show modal
      await handleSignOut({ redirect: false })
      setLoading(false)
      dispatch({
        type: "SHOW_MODAL",
        payload: {
          heading: "Your email is not verified",
          isCard: true,
          headerClass: `has-text-info has-background-info-light has-text-weight-bold is-size-5`,
          content: (
            <VerifyEmailModal user={response?.user} location={location} />
          ),
        },
      })
      return
    }
  } catch (error) {
    if (errorCallback) errorCallback()

    switch (error?.code) {
      case "auth/wrong-password":
        setMessage({
          type: "danger",
          content: {
            code: error.code,
            message:
              "Invalid email or password. Please check if your credentials are correct before logging in again.",
          },
        })
        break

      case "auth/user-not-found":
        setMessage({
          type: "danger",
          content: {
            code: error.code,
            message: (
              <span>
                The email you entered does not match our records. Please{" "}
                <Link to="/verify-email">create an account</Link> to avail of
                our services.
              </span>
            ),
          },
        })
        break

      default:
        setMessage({
          type: "danger",
          content: { code: error.code, message: error.message },
        })
    }
  }
}
