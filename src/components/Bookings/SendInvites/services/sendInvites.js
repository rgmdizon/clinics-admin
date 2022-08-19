import axios from "axios"
import firebase from "firebase"

import { isBrowser } from "services/general"
import { GATSBY_WEBSITE_URL } from "gatsby-env-variables"
import { getSignedInUser } from "auth/services/user"

import { generateEnrollmentCodeParams } from "./generateEnrollmentCode"

import { GATSBY_INTEGROMAT_SEND_VACCINEE_INVITES_WEBHOOK } from "gatsby-env-variables"

const updateBooking = async (booking, values) => {
  let { bookingsData } = getSignedInUser()
  let totalRemainingDoses = parseInt(booking?.remainingDoses)
  let sentInvitations = values?.emails?.filter((email) => email !== "")?.length

  let pastInvites = booking?.invites || 0
  let remainingDoses = totalRemainingDoses

  await firebase
    .firestore()
    .collection("bookings")
    .doc(booking?.id)
    .update({
      remainingDoses: remainingDoses - sentInvitations,
      invites: pastInvites + sentInvitations,
    })

  let newBookingsData = bookingsData
  let bookingSessionIndex = newBookingsData.findIndex(
    (bookings) => bookings.id === booking.id
  )

  newBookingsData.splice(bookingSessionIndex, 1)
  if (isBrowser())
    sessionStorage.setItem(
      "bookingsData",
      JSON.stringify([
        ...newBookingsData,
        {
          ...booking,
          remainingDoses: remainingDoses - sentInvitations,
          invites: pastInvites + sentInvitations,
        },
      ])
    )
}

export const sendInvites = async ({
  values,
  callback,
  bookingsData,
  organization,
  errorCallback,
}) => {
  let isLocalhost = false
  if (isBrowser() && window?.location?.hostname === "localhost")
    isLocalhost = true

  try {
    values.emails = values?.emails?.filter((email) => !!email)
    let response = await axios.post(
      GATSBY_INTEGROMAT_SEND_VACCINEE_INVITES_WEBHOOK,
      {
        domain: isLocalhost ? "http://localhost:8002" : GATSBY_WEBSITE_URL,
        emails: values?.emails,
        booking: {
          ...bookingsData,
          googleCalendarEventId: bookingsData.googleCalendarEventId,
        },
        enrollmentCodeParams: {
          ...generateEnrollmentCodeParams({
            vaccineBrand: bookingsData?.vaccineBrand,
          }),
          companyCode: organization?.code,
        },
      }
    )

    /**
     * Add count of new invitations sent to the 'invites' field in the
     * organization document
     */
    await updateBooking(bookingsData, values)

    if (callback) callback()
    return response
  } catch (error) {
    if (errorCallback) errorCallback(error)
  }
}
