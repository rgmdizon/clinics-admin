import firebase from "firebase"
import moment from "moment-timezone"

import { GATSBY_GOOGLE_VACCINATIONS_CALENDAR_ID } from "gatsby-env-variables"

import { getSignedInUser } from "auth/services/user"

import { googleApi } from "services/googleApi"

import { generateJWT } from "services/jwt"

moment.tz.setDefault("Asia/Manila")

export const getAllDates = async () => {
  let allDates = await getVaccinationCalendarEvents()

  for (var index = 0; index < allDates.length; index++) {
    let dateObject = allDates[index]
    let bookingDocuments = await firebase
      .firestore()
      .collection("bookings")
      .where("googleCalendarEventId", "==", dateObject.id)
      .get()

    let bookings = []
    bookingDocuments.forEach((doc) => {
      if (doc) bookings.push({ ...doc.data(), id: doc?.id })
    })

    if (bookings.length) {
      let reservedSlots = bookings
        .map((booking) => parseFloat(booking?.doses))
        .reduce((slots, doses) => {
          return (slots += doses)
        }, 0)
      dateObject.reservedSlots = reservedSlots
    } else dateObject.reservedSlots = 0
  }

  return allDates
}

//change to filter dates
export const getDateOptions = ({ allDates, bookingValues }) => {
  const { organization } = getSignedInUser()

  let filteredDates = allDates?.map((eventObject) => {
    let organizationId
    let companyCode
    let venue
    let vaccineBrand
    let maxSlots

    if (eventObject.description) {
      try {
        maxSlots = parseFloat(
          eventObject?.description?.split("Max Slots: ")[1].split("\n")[0]
        )
        vaccineBrand = eventObject?.description
          ?.split("Vaccine Brand: ")[1]
          .split("\n")[0]

        organizationId = eventObject?.description
          ?.split("Organization ID: ")[1]
          .split("\n")[0]
        venue = eventObject?.description?.split("Venue: ")[1]
        companyCode = eventObject?.description
          ?.split("Organization Code: ")[1]
          .split("\n")[0]
      } catch (error) {}
    }

    return {
      googleCalendarEventId: eventObject.id,
      startDate: eventObject.start.dateTime,
      companyCode,
      endDate: eventObject.end.dateTime,
      organizationId,
      vaccineBrand,
      maxSlots,
      venue,
      remainingSlots: maxSlots - eventObject.reservedSlots,
    }
  })

  filteredDates = filteredDates.filter((dateObject) => {
    let selectedVaccine = `${bookingValues?.brand?.value}`
    let doses = parseFloat(bookingValues.numberOfDoses) || 0

    let startDate = dateObject.startDate

    let isBeforeEvent = moment().isBefore(moment(startDate))

    let hasVaccineBrand =
      dateObject?.vaccineBrand?.toLowerCase() === selectedVaccine.toLowerCase()

    let hasRemainingSlots = dateObject?.remainingSlots >= doses

    let hasCompanyCode = dateObject?.companyCode === organization.code

    let includesGeneralEvents = organization?.includeGeneralEvents
      ? (organization?.includeGeneralEvents &&
          dateObject.organizationId.toLowerCase() === "general") ||
        hasCompanyCode
      : hasCompanyCode

    return (
      hasVaccineBrand &&
      hasRemainingSlots &&
      isBeforeEvent &&
      includesGeneralEvents &&
      !!doses
    )
  })

  filteredDates = filteredDates.sort((a, b) => {
    return new Date(a.startDate) - new Date(b.startDate)
  })

  filteredDates = filteredDates.map((dateObject) => {
    let formattedDate = moment(dateObject.startDate).format("MMMM DD, YYYY")
    let formattedStartTime = moment(dateObject.startDate).format("hh:mm A")
    let formattedEndTime = moment(dateObject.endDate).format("hh:mm A")

    let label = `${formattedDate} | ${formattedStartTime} - ${formattedEndTime} | ${dateObject.remainingSlots} slots left`

    return {
      label,
      value: dateObject,
    }
  })

  return filteredDates
}

export const getVaccinationCalendarEvents = async () => {
  try {
    const jwtObject = await generateJWT()
    const response = await googleApi({
      token: jwtObject?.data?.access_token,
    }).get(`/calendars/${GATSBY_GOOGLE_VACCINATIONS_CALENDAR_ID}/events`, {
      params: {
        timeMin: moment().format(),
      },
    })

    const events = response.data?.items
    return events || []
  } catch (error) {
    return []
  }
}
