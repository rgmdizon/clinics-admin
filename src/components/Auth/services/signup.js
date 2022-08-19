import React from "react"
import firebase from "firebase"
import FireStoreParser from "firestore-parser"

import VerifyEmailModal from "../VerifyEmailModal"

import { hasSignedInUser } from "./user"
import { generateJWT } from "services/jwt"
import { firebaseApi } from "services/firebase/firebaseApi"

export const checkIfEmailAlreadyExists = async (email) => {
  const PROVIDERS = await firebase.auth().fetchSignInMethodsForEmail(email)
  return PROVIDERS.includes("password")
}

export const checkIfUserAlreadyExists = async (email) => {
  if (hasSignedInUser()) {
    let filteredUsers = await firebase
      .firestore()
      .collection("users")
      .where("email", "==", email)
      .get()

    let userDocuments = []

    filteredUsers.forEach((user) =>
      userDocuments.push({ ...user.data(), id: user.id })
    )

    let userDocument = userDocuments.find((user) => user.email === email)
    return userDocument
  } else {
    const JWT_OBJECT = await generateJWT()
    const ACCESS_TOKEN = JWT_OBJECT?.data?.access_token
    let request = await firebaseApi({ accessToken: ACCESS_TOKEN }).post(
      `:runQuery`,
      {
        structuredQuery: {
          select: {
            fields: [],
          },
          from: [
            {
              collectionId: "users",
            },
          ],
          where: {
            fieldFilter: {
              field: {
                fieldPath: "email",
              },
              op: "EQUAL",
              value: {
                stringValue: email,
              },
            },
          },
        },
      }
    )

    let id = request?.data[0]?.document?.name || ""

    if (id) {
      id = id.split("/")
      id = id[id.length - 1]
      request = await firebaseApi({ accessToken: ACCESS_TOKEN }).get(
        `users/${id}`
      )

      const USER_DATA = FireStoreParser(request?.data?.fields)
      return { ...USER_DATA, id: id }
    } else return {}
  }
}

export const handleSignUp = async ({
  values,
  callBack,
  setMessage,
  resetForm,
  errorCallback,
  dispatch,
  location,
}) => {
  try {
    let email = values?.email
    // let transformedEmail = email?.trim() + GATSBY_CLIENT_EMAIL_DOMAIN
    let response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, values.password)

    let continueUrl = `${location?.origin}/sign-in`
    await response?.user.sendEmailVerification({ url: continueUrl })
    if (callBack) callBack()

    dispatch({
      type: "SHOW_MODAL",
      payload: {
        heading: "We have sent a verification email",
        isCard: true,
        headerClass: `has-text-info has-background-info-light has-text-weight-bold is-size-5`,
        content: <VerifyEmailModal user={response?.user} location={location} />,
      },
    })

    if (resetForm) resetForm()
  } catch (error) {
    setMessage({ type: "danger", content: error.message })
    if (errorCallback) errorCallback()
  }
}
