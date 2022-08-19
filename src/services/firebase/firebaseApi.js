import FireStoreParser from "firestore-parser"

import { GATSBY_FIREBASE_PROJECT_ID } from "gatsby-env-variables"
import { isBrowser } from "../general"
import { generateJWT } from "services/jwt"
import axios from "axios"

export const firebaseApi = ({ accessToken }) => {
  if (isBrowser()) {
    let api = axios.create({
      baseURL: `https://firestore.googleapis.com/v1/projects/${GATSBY_FIREBASE_PROJECT_ID}/databases/(default)/documents/`,
      headers: {
        Authorization: "Bearer " + (accessToken || ""),
        "Content-Type": "application/json",
      },
    })
    return api
  }
  return null
}

export const getDocument = async ({ collection, documentId }) => {
  const JWT_OBJECT = await generateJWT()
  const ACCESS_TOKEN = JWT_OBJECT?.data?.access_token

  let document = await firebaseApi({ accessToken: ACCESS_TOKEN }).get(
    `/${collection}/${documentId}`
  )

  let id = document?.data?.name.split("/").at(-1)

  document = FireStoreParser(document?.data?.fields)

  return { ...document, id }
}

export const queryDocuments = async ({ structuredQuery }) => {
  const JWT_OBJECT = await generateJWT()
  const ACCESS_TOKEN = JWT_OBJECT?.data?.access_token

  let documents = await firebaseApi({ accessToken: ACCESS_TOKEN }).post(
    ":runQuery",
    structuredQuery
  )
  documents = FireStoreParser(documents?.data)

  return documents
}

export const queryRawDocuments = async ({ structuredQuery }) => {
  const JWT_OBJECT = await generateJWT()
  const ACCESS_TOKEN = JWT_OBJECT?.data?.access_token

  let documents = await firebaseApi({ accessToken: ACCESS_TOKEN }).post(
    ":runQuery",
    structuredQuery
  )

  return documents
}
