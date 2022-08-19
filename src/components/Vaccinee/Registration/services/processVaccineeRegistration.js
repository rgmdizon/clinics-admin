import axios from "axios"

import { generateJWT } from "services/jwt"
import { GATSBY_WEBSITE_URL } from "gatsby-env-variables"
import { firebaseApi } from "services/firebase/firebaseApi"

import { GATSBY_INTEGROMAT_SEND_VACCINEE_REGISTRATION_CONFIRMATION_WEBHOOK } from "gatsby-env-variables"

import { parseFirebaseDocument } from "../../../../services/firebase/parseFirebaseDocument"
import vaccineeRegistrationDefaultValues from "../utils/vaccineeRegistrationDefaultValues.json"
import registrationDocumentExclusions from "../utils/registrationDocumentExclusions.json"
import { vaccinationDefaultValues } from "../utils/vaccinationDefaultValues.js"
import { processUpdatedBy } from "../../../Auth/services/processChangelog"

export const processVaccineeRegistration = async ({
  callback,
  vaccinee,
  isPediatric,
  organizationBooking,
  errorCallback,
  vaccinationUid,
}) => {
  const {
    organizationDocument,
    bookingDocument,
    vaccineeDocument,
  } = organizationBooking
  try {
    let fieldNamesMask = ""
    const JWT_OBJECT = await generateJWT()
    const ACCESS_TOKEN = JWT_OBJECT?.data?.access_token

    Object.keys({
      ...vaccinee,
      ...vaccineeRegistrationDefaultValues,
    }).forEach((field) => {
      fieldNamesMask += `updateMask.fieldPaths=${field}&`
    })
    fieldNamesMask += `updateMask.fieldPaths=updateTime&`
    fieldNamesMask += `updateMask.fieldPaths=changelog&`
    fieldNamesMask += `updateMask.fieldPaths=_updatedBy&`
    fieldNamesMask += `updateMask.fieldPaths=updatedField&`
    fieldNamesMask += `updateMask.fieldPaths=guardianName&`
    fieldNamesMask += `updateMask.fieldPaths=screening&`
    fieldNamesMask += `updateMask.fieldPaths=vaccinationUid&`
    fieldNamesMask = `${fieldNamesMask}updateMask.fieldPaths=status`

    let activeVaccinee = await firebaseApi({ accessToken: ACCESS_TOKEN }).get(
      `vaccinees/${vaccinationUid}`
    )

    let currentStatus = activeVaccinee?.data?.fields?.status?.stringValue
    currentStatus = currentStatus === "Cancelled" ? currentStatus : "Registered"

    let vaccinationFields = {
      ...vaccinationDefaultValues(bookingDocument),
      ...parseFirebaseDocument({
        document: vaccinee,
        exclusions: registrationDocumentExclusions.vaccination,
      }),
    }

    let vaccinationResponse = await firebaseApi({
      accessToken: ACCESS_TOKEN,
    }).post(`vaccinations/`, {
      fields: {
        uid: { stringValue: vaccinationUid },
        vaccinations: {
          arrayValue: {
            values: [{ mapValue: { fields: { ...vaccinationFields } } }],
          },
        },
        updateTime: {
          timestampValue: new Date(),
        },
      },
    })

    let vaccinationDocumentSplit = vaccinationResponse?.data?.name?.split("/")
    let vaccinationDocumentUid =
      vaccinationDocumentSplit[vaccinationDocumentSplit?.length - 1]

    const vaccineeFieldsToUpdate = {
      updateTime: {
        timestampValue: new Date(),
      },
      status: { stringValue: currentStatus },
      vaccinationId: { stringValue: vaccinationDocumentUid },
      ...parseFirebaseDocument({
        document: vaccinee,
        exclusions: registrationDocumentExclusions.vaccinee,
      }),
      ...vaccineeRegistrationDefaultValues,
      guardianName: {
        stringValue: `${vaccinee?.guardianLastName?.toUpperCase()}, ${vaccinee?.guardianFirstName?.toUpperCase()}`,
      },
    }

    if (vaccinee?.specifyComorbidity)
      vaccineeFieldsToUpdate.comorbidity.arrayValue.values.push({
        stringValue: vaccinee?.specifyComorbidity.trim(),
      })

    let _updatedBy = processUpdatedBy({
      userData: {
        firstName: vaccinee?.firstName,
        lastName: vaccinee?.lastName,
        email: vaccinee?.email,
      },
      isPatch: true,
      fieldsToUpdate: vaccineeFieldsToUpdate,
    })

    await firebaseApi({ accessToken: ACCESS_TOKEN }).patch(
      `vaccinees/${vaccinationUid}?${fieldNamesMask}`,
      {
        fields: {
          ...vaccineeFieldsToUpdate,
          updateTime: {
            timestampValue: new Date(),
          },
          _updatedBy,
        },
      }
    )

    let response = await axios.post(
      GATSBY_INTEGROMAT_SEND_VACCINEE_REGISTRATION_CONFIRMATION_WEBHOOK,
      {
        domain: GATSBY_WEBSITE_URL,
        vaccinationUid: vaccinationUid,
        vaccinee: vaccinee,
        bookingDocument,
        organizationDocument,
        enrollmentCode: vaccineeDocument?.enrollmentCode || "NA",
      }
    )

    if (callback) callback()
    return response
  } catch (error) {
    if (errorCallback) errorCallback()
  }
}
