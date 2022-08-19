import axios from "axios"
import { generateJWT } from "services/jwt"
import { firebaseApi } from "services/firebase/firebaseApi"

import { GATSBY_INTEGROMAT_SEND_VACCINATION_CONFIRMATION } from "gatsby-env-variables"

export const sendVaccinationRegistration = async ({
  values,
  callback,
  errorCallback,
  vaccineeState,
}) => {
  try {
    let vaccinationPayload = { ...vaccineeState, ...values }

    let {
      personalDetails,
      schedules,
      vaccines,
      payment,
      code,
      intakeForm,
    } = vaccinationPayload

    let { birthday, lastName } = personalDetails

    let lastNameCode = lastName?.slice(0, 3)
    let companyCode = code?.organization?.code
    let birthYearCode = birthday?.year?.value.toString().slice(2)
    let birthDateCode = String(birthday?.date?.value.toString()).padStart(
      2,
      "0"
    )

    let vaccineeCode = `${companyCode}${generateRandomLetters(
      0
    )}${lastNameCode}${birthDateCode}${birthYearCode}`
    vaccineeCode = vaccineeCode?.toUpperCase()
    let originalVaccineeCode = vaccineeCode

    let lengthOfDuplicateCodes =
      (await findDuplicateCodes({ vaccineeCode })) || 0
    vaccineeCode = `${vaccineeCode}${String.fromCharCode(
      65 + lengthOfDuplicateCodes
    )}`

    let allVaccineProductCode = vaccines
      ?.map((vaccine) => vaccine?.itemCode)
      ?.join(", ")

    let response = await axios.post(
      GATSBY_INTEGROMAT_SEND_VACCINATION_CONFIRMATION,
      {
        allVaccineProductCode,
        originalVaccineeCode,
        personalDetails,
        vaccineeCode,
        schedules,
        vaccines,
        intakeForm,
        payment,
        code,
      }
    )

    let vaccineeDocumentId = response?.data
      ?.split("/")
      .slice(-1)[0]
      ?.replace(" }", "")

    if (callback) callback(vaccineeDocumentId)
  } catch (error) {
    if (errorCallback) errorCallback(error)
  }
}

const generateRandomLetters = (length) => {
  let result = ""
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let charactersLength = characters.length
  for (let counter = 0; counter < length; counter++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const findDuplicateCodes = async ({ vaccineeCode }) => {
  const JWT_OBJECT = await generateJWT()
  const ACCESS_TOKEN = JWT_OBJECT?.data?.access_token

  let request = await firebaseApi({ accessToken: ACCESS_TOKEN }).post(
    `:runQuery`,
    {
      structuredQuery: {
        from: [
          {
            collectionId: "vaccinees",
          },
        ],
        where: {
          fieldFilter: {
            field: {
              fieldPath: "originalVaccineeCode",
            },
            op: "EQUAL",
            value: {
              stringValue: vaccineeCode,
            },
          },
        },
      },
    }
  )

  return request?.data?.filter((data) => !!data?.document)?.length
}
