import firebase from "firebase"
import moment from "moment"
import { isBrowser } from "services/general"
import { getSignedInUser } from "auth/services/user"
import { uploadDocuments } from "auth/services/uploadDocuments"

import defaultValues from "../utils/bookingDefaultValues.json"
import { formatDoseType, formatVaccineeType } from "./formatBookingDocument"

import { updateAllocation } from "auth/services/allocations"

//upload organization fields
export const createBookingFiles = async ({ bookingData, authUser }) => {
  const { documents } = bookingData
  const { email } = authUser
  const path = `/${email}/booking/`
  const docBaseName = `${email}_delivery_receipt`
  const docType = `receipt`
  const documentUrlsArray = await uploadDocuments({
    documents,
    path,
    docBaseName,
    docType,
  })
  return documentUrlsArray
}

//creates the organization document
export const createBookingDocument = async ({
  bookingData,
  paymentData,
  callback,
}) => {
  let { authUser, organization, bookingsData, userData } = getSignedInUser()
  //upload documents to firebase storage
  let documentUrlsArray = await createBookingFiles({
    bookingData,
    authUser,
  })

  const BOOKING_DOCUMENT = {
    organizationId: organization?.id,
    date: new Date(),
    updateTime: new Date(),
    type: bookingData?.vaccine?.value,
    googleCalendarEventId:
      bookingData?.bookingDate?.value?.googleCalendarEventId ||
      defaultValues.googleCalendarEventId,
    startDate: moment(bookingData?.bookingDate?.value?.startDate).toDate(),
    endDate: moment(bookingData?.bookingDate?.value?.endDate).toDate(),
    vaccineBrand: bookingData?.brand?.value,
    doses: bookingData?.numberOfDoses,
    remainingDoses: bookingData?.numberOfDoses,
    doseType: formatDoseType({ doseType: bookingData?.doseType }),
    vaccineeType: formatVaccineeType({
      vaccineeType: bookingData?.vaccineeType,
    }),
    changelog: [],
    venue: bookingData?.venue?.label || defaultValues.venue,
  }

  if (documentUrlsArray.length > 0)
    BOOKING_DOCUMENT.documents = [{ deliveryReceipt: documentUrlsArray }]

  if (paymentData) BOOKING_DOCUMENT["payment"] = paymentData
  let document = await firebase
    .firestore()
    .collection("bookings")
    .add(BOOKING_DOCUMENT)

  if (isBrowser()) {
    sessionStorage.setItem(
      "bookingsData",
      JSON.stringify([
        ...bookingsData,
        { ...BOOKING_DOCUMENT, id: document?.id },
      ])
    )
  }
  await updateAllocation({
    organization,
    bookingsData: [...bookingsData, { ...BOOKING_DOCUMENT, id: document?.id }],
    userData,
  })

  if (callback) callback([document.id])
}
