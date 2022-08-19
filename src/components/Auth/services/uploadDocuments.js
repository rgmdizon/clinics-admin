import firebase from "firebase"

import { isBrowser, isObjectEmpty, b64toBlob } from "services/general"

import { GATSBY_WEBSITE_URL } from "gatsby-env-variables"

export const uploadDocuments = async ({
  documents,
  path,
  docBaseName,
  docType,
}) => {
  let idUrlsArray = []

  if (isBrowser() && !isObjectEmpty(documents)) {
    let uploadedIds =
      documents?.filter((document) =>
        document?.name?.toLowerCase()?.startsWith(docType)
      ) || documents[0]

    let storageRef = firebase.storage().ref()

    for (const uploadedId of uploadedIds) {
      let uploadRef = storageRef.child(
        `${
          GATSBY_WEBSITE_URL || "vax-develop.medgrocer.io"
        }${path}${docBaseName}_${uploadedId.name}`
      )
      let b64Data = uploadedId?.path?.split(",")[1]
      let contentType = uploadedId?.path?.split(",")[0]?.match(/:(.*?);/)[1]
      let newUploadedFile = b64toBlob(b64Data, contentType)
      let storageResponse = await uploadRef.put(newUploadedFile)
      let fileURL = await storageResponse.ref.getDownloadURL()

      idUrlsArray.push({
        type: docType.toUpperCase(),
        url: fileURL,
      })
    }
    return idUrlsArray
  }
}
