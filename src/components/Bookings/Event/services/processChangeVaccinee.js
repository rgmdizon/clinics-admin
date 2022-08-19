import moment from "moment"
import firebase from "firebase"
import FireStoreParser from "firestore-parser"

import { getSignedInUser } from "auth/services/user"

import { processChangelog } from "auth/services/processChangelog"

import vaccineeRegistrationDefaultValues from "../../../Vaccinee/Registration/utils/vaccineeRegistrationDefaultValues.json"

import { isBrowser } from "services/general"
import { processUpdatedBy } from "../../../Auth/services/processChangelog"
const updateBookingRemainingDoses = async (bookingId) => {
  let { bookingsData } = getSignedInUser()

  let booking = bookingsData.find((bookingObject) => {
    return bookingObject.id === bookingId
  })
  let totalRemainingDoses = parseInt(booking?.remainingDoses)

  if (!!totalRemainingDoses) totalRemainingDoses = totalRemainingDoses + 1

  await firebase
    .firestore()
    .collection("bookings")
    .doc(bookingId)
    .update({ remainingDoses: totalRemainingDoses })

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
        { ...booking, remainingDoses: totalRemainingDoses },
      ])
    )
}

export const processChangeVaccinee = async ({
  vaccinee,
  successCallback,
  errorCallback,
}) => {
  let { userData, authUser } = getSignedInUser()

  try {
    let { bookingsData } = getSignedInUser()
    const CHANGE_VACCINEE_TAG = `CHANGE-${moment().format("YYMMDD")}`

    let defaultValues = FireStoreParser(vaccineeRegistrationDefaultValues)

    let fieldsToUpdate = {
      status: "Cancelled",
      updateTime: new Date(),
      ...defaultValues,
    }

    let vaccineeChangelog = processChangelog({
      document: vaccinee,
      fieldsToUpdate,
    })

    let vaccineeUpdatedBy = processUpdatedBy({
      userData,
      authUser,
      fieldsToUpdate,
    })

    fieldsToUpdate.tags = vaccinee?.tags?.length
      ? [...vaccinee?.tags, CHANGE_VACCINEE_TAG]
      : [CHANGE_VACCINEE_TAG]

    fieldsToUpdate.tags = defaultValues?.tags?.length
      ? [...defaultValues?.tags, ...fieldsToUpdate.tags]
      : fieldsToUpdate.tags

    // Fetch active booking
    let activeBooking = await firebase
      .firestore()
      .collection("bookings")
      .doc(vaccinee.bookingId)
      .get()

    // Update active booking's remaining doses

    const bookingFieldsToUpdate = {
      remainingDoses: activeBooking.data()?.remainingDoses + 1,
    }

    let bookingsChangelog = processChangelog({
      document: activeBooking.data(),
      fieldsToUpdate: bookingFieldsToUpdate,
    })

    let bookingsUpdatedBy = processUpdatedBy({
      userData,
      authUser,
      fieldsToUpdate: bookingFieldsToUpdate,
    })

    await firebase
      .firestore()
      .collection("bookings")
      .doc(vaccinee.bookingId)
      .update({
        ...bookingFieldsToUpdate,
        changelog: bookingsChangelog,
        _updatedBy: bookingsUpdatedBy,
      })

    await firebase
      .firestore()
      .collection("vaccinees")
      .doc(vaccinee?.id)
      .update({
        ...fieldsToUpdate,
        changelog: vaccineeChangelog,
        _updatedBy: vaccineeUpdatedBy,
      })

    updateBookingRemainingDoses(vaccinee.bookingId)

    /**
     * create new doc
     */

    // Update session storage to match firebase
    let newBookingsData = bookingsData
    let bookingSessionIndex = newBookingsData.findIndex(
      (bookings) => bookings.id === vaccinee.bookingId
    )

    let booking = bookingsData.find((bookingObject) => {
      return bookingObject.id === vaccinee.bookingId
    })

    newBookingsData.splice(bookingSessionIndex, 1)
    if (isBrowser())
      sessionStorage.setItem(
        "bookingsData",
        JSON.stringify([
          ...newBookingsData,
          {
            ...booking,
            remainingDoses: activeBooking.data()?.remainingDoses + 1,
          },
        ])
      )

    if (successCallback) successCallback()
  } catch (error) {
    if (errorCallback) errorCallback()
  }
}
