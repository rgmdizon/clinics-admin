import moment from "moment"
import FireStoreParser from "firestore-parser"

import {
  getDocument,
  queryDocuments,
  queryRawDocuments,
} from "services/firebase/firebaseApi"
import { isObjectEmpty } from "services/general"

export const getVaccineeDetails = async ({
  vaccineeUid,
  errorCallback,
  enrollmentCode,
}) => {
  try {
    let vaccineeDocument = {}

    if (enrollmentCode) {
      vaccineeDocument = await queryRawDocuments({
        structuredQuery: createVaccineeStructureQuery({
          collectionId: "vaccinees",
          enrollmentCode: enrollmentCode,
        }),
      })

      let id = vaccineeDocument?.data?.[0]?.document?.name.split("/").at(-1)
      vaccineeDocument = FireStoreParser(
        vaccineeDocument?.data?.[0]?.document?.fields
      )
      vaccineeDocument = { ...vaccineeDocument, documentId: id, id }
    } else {
      vaccineeDocument = await getDocument({
        collection: "vaccinees",
        documentId: vaccineeUid,
      })
    }

    let bookingDocument
    let organizationDocument
    let vaccinationDocument

    if (!isObjectEmpty(vaccineeDocument)) {
      vaccineeDocument["payment"]["totalAmount"] = "100"

      if (!enrollmentCode) vaccineeDocument = FireStoreParser(vaccineeDocument)
      bookingDocument = vaccineeDocument.bookingId
        ? await getDocument({
            collection: "bookings",
            documentId: vaccineeDocument.bookingId,
          })
        : {}
      bookingDocument = FireStoreParser(bookingDocument)
      organizationDocument = vaccineeDocument.organizationId
        ? await getDocument({
            collection: "organizations",
            documentId: vaccineeDocument.organizationId,
          })
        : {}

      vaccinationDocument = await queryDocuments({
        structuredQuery: createVaccinationStructuredQuery({
          collectionId: "vaccinations",
          vaccineeId: vaccineeDocument.id,
        }),
      })

      let rawVaccinationDocument = await queryRawDocuments({
        structuredQuery: createVaccinationStructuredQuery({
          collectionId: "vaccinations",
          vaccineeId: vaccineeDocument.id,
        }),
      })

      let vaccinations = vaccinationDocument[0]?.document?.fields?.vaccinations
      let vaccinationUid = vaccinationDocument[0]?.document?.name?.split("/")

      //eslint-disable-next-line
      if (!vaccinationUid) throw "U403"

      vaccinationUid = vaccinationUid[vaccinationUid?.length - 1]

      //Get the most recent vaccination date
      let latestVaccination = {}
      if (vaccinations?.length) {
        vaccinations.forEach((vaccination) => {
          if (
            moment(vaccination.date).isAfter(latestVaccination.date) ||
            isObjectEmpty(latestVaccination)
          )
            latestVaccination = vaccination
        })
      }

      // organizationDocument = FireStoreParser(bookingDocument)
      return {
        ...vaccineeDocument,
        ...organizationDocument,
        ...bookingDocument,
        ...vaccineeDocument.screening,
        ...latestVaccination,
        vaccinationUid,
        vaccinations: vaccinations,
        rawVaccination: rawVaccinationDocument,
      }
    } else {
      if (errorCallback) {
        errorCallback()
      }
    }
  } catch (error) {
    let message = ""

    if (error === "U403")
      message =
        "The vaccinee isn't registered yet. Please have them complete the vaccinee registration form to proceed."
    if (errorCallback) errorCallback(message)
    return error
  }
}

const createVaccineeStructureQuery = ({ enrollmentCode, collectionId }) => {
  return {
    structuredQuery: {
      from: [{ collectionId }],
      where: {
        fieldFilter: {
          field: {
            fieldPath: "enrollmentCode",
          },
          op: "EQUAL",
          value: {
            stringValue: enrollmentCode,
          },
        },
      },
    },
  }
}

export const createVaccinationStructuredQuery = ({
  collectionId,
  vaccineeId,
}) => {
  return {
    structuredQuery: {
      from: [{ collectionId }],
      where: {
        fieldFilter: {
          field: {
            fieldPath: "uid",
          },
          op: "EQUAL",
          value: {
            stringValue: vaccineeId,
          },
        },
      },
    },
  }
}
