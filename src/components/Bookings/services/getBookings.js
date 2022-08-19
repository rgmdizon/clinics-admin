import firebase from "firebase"

import { isBrowser } from "services/general"
import { getSignedInUser } from "auth/services/user"
import { formatDateWithDay } from "../../../services/date"

export const getBookingsData = async () => {
  if (isBrowser()) {
    let { bookingsData, userData } = getSignedInUser()

    if (userData) {
      let sortedBookingData = bookingsData.sort(
        (a, b) =>
          new Date(new Date(b?.createdDate?.seconds * 1000)) -
          new Date(new Date(a?.createdDate?.seconds * 1000))
      )
      return await Promise.all(
        sortedBookingData.map(async (booking) => {
          let totalRegistered = 0
          let totalInvitees = 0
          const BOOKING_INVITES = await firebase
            .firestore()
            .collection("vaccinees")
            .where("bookingId", "==", booking?.id)
            .get()

          BOOKING_INVITES.forEach((doc) => {
            if (doc.data()?.status && doc.data()?.status === "Registered")
              totalRegistered++
            if (doc.data()?.status && doc.data()?.status !== "Cancelled")
              totalInvitees++
          })

          if (!!booking.invited && !!booking.cancelled)
            totalInvitees = booking.invites - booking.cancelled

          let vaccinationDate =
            typeof booking?.startDate === "string"
              ? new Date(booking?.startDate)
              : new Date(booking?.startDate?.seconds * 1000)

          return [
            { id: true, type: "string", data: booking?.id },
            {
              type: "date",
              date: vaccinationDate,
              data: formatDateWithDay(vaccinationDate),
            },
            { type: "string", data: booking?.vaccineBrand },
            { type: "string", data: booking?.doseType },
            { type: "string", data: booking?.vaccineeType },
            { type: "string", data: booking?.venue },
            { type: "string", data: booking?.doses },
            {
              type: "component",
              data: `${
                totalInvitees - totalRegistered
              } invited | ${totalRegistered} registered`,
            },
          ]
        })
      )
    }
    return {}
  }
}
