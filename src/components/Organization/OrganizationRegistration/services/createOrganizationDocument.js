import firebase from "firebase"
import { getSignedInUser } from "auth/services/user"
import { isBrowser } from "services/general"

import { GATSBY_FIREBASE_DEFAULT_ORGANIZATION_CODE } from "gatsby-env-variables"

import { createOwnerDocument } from "./createOwnerDocument"
import { createOrganizationFiles } from "./createOrganizationFiles"

import defaultValues from "../utils/organizationRegistrationDefaultValues.json"

export const createOrganizationDocument = async ({
  registration,
  callback,
  errorCallback,
}) => {
  const { legalName, tradeName, tinNumber } = registration

  let { authUser } = getSignedInUser()
  //create and assign unverified account owner
  try {
    let ownerDocumentId = await createOwnerDocument({
      registration,
      authUser,
    })
    //upload documents to firebase storage
    let documentUrlsArray = await createOrganizationFiles({
      registration,
      authUser,
    })

    //handle if existing (replace with actual)
    let currentOrganizationDocuments = []
    let currentOrganizationUsers = []

    let organizationDocument = {
      legalName: legalName || null,
      tradeName,
      tinNumber: tinNumber || null,
      code: GATSBY_FIREBASE_DEFAULT_ORGANIZATION_CODE,
      documents: [
        ...currentOrganizationDocuments,
        { bir2303: documentUrlsArray },
      ],
      users: [...currentOrganizationUsers, ownerDocumentId],
      owner: ownerDocumentId,
      ...defaultValues,
    }

    let document = await firebase
      .firestore()
      .collection("organizations")
      .add({ ...organizationDocument })

    organizationDocument = { ...organizationDocument, id: document.id }

    if (isBrowser()) {
      sessionStorage.setItem(
        "organization",
        JSON.stringify(organizationDocument)
      )
    }

    if (callback) callback()
  } catch (error) {
    if (errorCallback) errorCallback()
  }
}
