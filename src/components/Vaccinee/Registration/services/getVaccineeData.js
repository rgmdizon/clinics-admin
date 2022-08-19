import FireStoreParser from "firestore-parser"

import { generateJWT } from "services/jwt"
import { firebaseApi } from "services/firebase/firebaseApi"

export const getVaccineeData = async ({ vaccinationUid }) => {
  try {
    const JWT_OBJECT = await generateJWT()
    const ACCESS_TOKEN = JWT_OBJECT?.data?.access_token
    let vaccineeDocument = await firebaseApi({ accessToken: ACCESS_TOKEN }).get(
      `/vaccinees/${vaccinationUid}`
    )

    vaccineeDocument = FireStoreParser(vaccineeDocument?.data?.fields)

    return vaccineeDocument
  } catch (error) {
    return true
  }
}
