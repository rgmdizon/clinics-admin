import firebase from "firebase"

export const initializeBookingSnapshot = async ({
  organizationId,
  bookings,
}) => {
  await firebase
    .firestore()
    .collection("bookings")
    .where("organizationId", "==", organizationId)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let updatedBooking = change.doc

        let currentBookings = bookings.filter((booking, index) => {
          return booking.id !== updatedBooking.id
        })
        sessionStorage.setItem(
          "bookingsData",
          JSON.stringify([
            ...currentBookings,
            { ...updatedBooking.data(), id: updatedBooking.id },
          ])
        )
      })
    })
}

export const initializeOrganizationSnapshot = async ({ userDocumentId }) => {
  await firebase
    .firestore()
    .collection("organizations")
    .where("users", "array-contains", userDocumentId)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let updatedOrganization = change.doc
        sessionStorage.setItem(
          "organization",
          JSON.stringify({
            ...updatedOrganization.data(),
            id: updatedOrganization.id,
          })
        )
      })
    })
}
