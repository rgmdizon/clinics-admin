import moment from "moment"
import FireStoreParser from "firestore-parser"

import { generateJWT } from "services/jwt"
import { firebaseApi } from "services/firebase/firebaseApi"

const checkIsEventPassed = ({ bookingDocument }) => {
  try {
    let bookingEventEnd = bookingDocument?.endDate?.split("T")?.[0]
    bookingEventEnd = `${bookingEventEnd} 05:30 PM`

    return moment().isAfter(
      moment(bookingEventEnd, "YYYY-MM-DD HH:mm A"),
      "minute"
    )
  } catch {
    return moment().isAfter(moment(bookingDocument?.endDate), "minute")
  }
}

export const checkIsRegistrationValid = async ({
  vaccinationUid,
  setOrganizationBooking,
}) => {
  try {
    const JWT_OBJECT = await generateJWT()
    const ACCESS_TOKEN = JWT_OBJECT?.data?.access_token
    let vaccineeDocument = await firebaseApi({ accessToken: ACCESS_TOKEN }).get(
      `/vaccinees/${vaccinationUid}`
    )

    vaccineeDocument = FireStoreParser(vaccineeDocument?.data?.fields)

    const registrationDocuments = await getRegistrationData({
      vaccineeDocument,
    })

    setOrganizationBooking({
      vaccineeDocument,
      bookingDocument: registrationDocuments?.bookingDocument,
      organizationDocument: registrationDocuments?.organizationDocument,
    })

    let isEventPassed = checkIsEventPassed({
      bookingDocument: registrationDocuments?.bookingDocument,
    })

    switch (true) {
      case isEventPassed:
        return { isValid: false, reason: "date passed" }
      case vaccineeDocument.status === "Registered":
        return { isValid: false, reason: "claimed" }
      default:
        return { isValid: true }
    }
  } catch (error) {
    // RDIZON: throw error, show error on page
    return true
  }
}

export const getRegistrationData = async ({ vaccineeDocument }) => {
  try {
    const JWT_OBJECT = await generateJWT()
    const ACCESS_TOKEN = JWT_OBJECT?.data?.access_token

    let organizationDocument = await firebaseApi({
      accessToken: ACCESS_TOKEN,
    }).get(`/organizations/${vaccineeDocument?.organizationId}`)

    organizationDocument = FireStoreParser(organizationDocument.data.fields)

    let bookingDocument = await firebaseApi({ accessToken: ACCESS_TOKEN }).get(
      `/bookings/${vaccineeDocument?.bookingId}`
    )
    bookingDocument = FireStoreParser(bookingDocument.data.fields)

    return { bookingDocument, organizationDocument }
  } catch (error) {
    return true
  }
}
