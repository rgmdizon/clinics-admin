import firebase from "firebase"
import { isBrowser } from "services/general"
export const calculateRemainingDoses = async ({
  selectedBooking,
  updateInvitesField = false,
  bookingsData,
}) => {
  let { doses, id } = selectedBooking
  let totalVaccineesInvited = 0
  let totalCancelled = 0
  // let remainingDoses = 0

  let bookingVaccinees = await firebase
    .firestore()
    .collection("vaccinees")
    .where("bookingId", "==", id)
    .get()

  bookingVaccinees.forEach((vaccinee) => {
    if (vaccinee?.data()?.status === "Cancelled") totalCancelled++
    totalVaccineesInvited++
  })
  //NOTE: use whatever value is greater as a safeguard from pending invites
  //if they are the same then it means that the booking has been completed
  totalVaccineesInvited =
    !!selectedBooking?.invites &&
    selectedBooking?.invites > totalVaccineesInvited
      ? selectedBooking?.invites
      : totalVaccineesInvited

  //NOTE: This block of code corrects old bookings made before adding 'invites' field in the bookings
  //IMPORTANT: This ASSUMES that all bookings during deployment have no movement
  if (!selectedBooking.invites && updateInvitesField) {
    await firebase.firestore().collection("bookings").doc(id).update({
      invites: totalVaccineesInvited,
      cancelled: totalCancelled,
    })
  }

  let newBookingsData = bookingsData
  let bookingSessionIndex = newBookingsData.findIndex(
    (bookings) => bookings.id === id
  )

  newBookingsData.splice(bookingSessionIndex, 1)
  if (isBrowser())
    sessionStorage.setItem(
      "bookingsData",
      JSON.stringify([
        ...newBookingsData,
        { ...selectedBooking, invites: totalVaccineesInvited },
      ])
    )

  return doses + totalCancelled - totalVaccineesInvited <= 0
    ? 0
    : doses + totalCancelled - totalVaccineesInvited
}
