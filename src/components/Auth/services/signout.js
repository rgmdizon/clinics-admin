import firebase from "firebase"
import { navigate } from "gatsby"
import { hasSignedInUser, getSignedInUser } from "./user"

import { isBrowser } from "services/general"

const detachSnapshots = async (organization) => {
  const unSubBookings = await firebase
    .firestore()
    .collection("bookings")
    .where("organizationId", "==", organization.id)
    .onSnapshot(() => {})

  const unSubOrganization = await firebase
    .firestore()
    .collection("organizations")
    .where("id", "==", organization.id)
    .onSnapshot(() => {})

  unSubBookings()
  unSubOrganization()
}
export const handleSignOut = ({ redirect = true }) => {
  const { organization } = getSignedInUser()

  try {
    firebase.auth().signOut()
    if (isBrowser()) {
      sessionStorage.removeItem("userData")
      sessionStorage.removeItem("addresses")
      sessionStorage.removeItem("contextState")
      sessionStorage.removeItem(hasSignedInUser())
    }

    if (organization?.id) detachSnapshots(organization)

    if (redirect) navigate("/sign-in")
  } catch (error) {
    console.error("Sign Out Error", error)
  }
}
