import axios from "axios"

import {
  GATSBY_ZENDESK_BASE_URL,
  GATSBY_ZENDESK_API_KEY,
  GATSBY_ZENDESK_API_URL,
  GATSBY_ZENDESK_EMAIL,
} from "gatsby-env-variables"

export const zendesk = () => {
  let credentials = {
    EMAIL: GATSBY_ZENDESK_EMAIL,
    API_KEY: GATSBY_ZENDESK_API_KEY,
    SUBDOMAIN: GATSBY_ZENDESK_API_URL,
  }

  let zendeskKey = credentials.EMAIL + "/token:" + credentials.API_KEY
  let encryptedKey = Buffer.from(zendeskKey).toString("base64")

  let api = axios.create({
    baseURL: GATSBY_ZENDESK_BASE_URL,
    headers: {
      Authorization: "Basic " + encryptedKey,
      "Content-Type": "application/json",
      api_url: credentials.SUBDOMAIN,
    },
  })

  return api
}

const zendeskApiKey = process.env.GATSBY_ZENDESK_API_KEY
const TEST_ENV = process.env.GATSBY_ENV === "production" ? "" : "[TEST]"

export const zendeskApi = ({
  email = process.env.GATSBY_ZENDESK_EMAIL,
  apiKey = zendeskApiKey,
  apiUrl = process.env.GATSBY_ZENDESK_API_URL,
}) => {
  let zendeskKey = email + "/token:" + apiKey
  let encryptedKey = Buffer.from(zendeskKey).toString("base64")
  let api = axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: "Basic " + encryptedKey,
      "Content-Type": "application/json",
    },
  })

  return api
}

export const b64toBlob = (b64Data, contentType, sliceSize) => {
  contentType = contentType || ""
  sliceSize = sliceSize || 512
  let byteCharacters = atob(b64Data)
  let byteArrays = []
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize)
    let byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }
    let byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }
  let blob = new Blob(byteArrays, { type: contentType })
  return blob
}

export const generateUploadFiles = (uploadedFiles) =>
  uploadedFiles.map((response) => {
    return response.data.upload.token
  })

const checkFileSize = (fileArray) => {
  const MAX_SIZE = 10485760
  for (let i = 0; i < fileArray.length; i++) {
    if (fileArray[i].path.size >= MAX_SIZE) {
      let errorMessage = {
        code: 403,
        message: "File is too big to attach in zendesk.",
      }
      throw errorMessage
    }
  }
}

export const sendToZendesk = async (request, fileArray, module) => {
  checkFileSize(fileArray)
  const uploadedFiles = await zendeskUploadFiles(fileArray)
  const generatedFileToken = await generateUploadFiles(uploadedFiles)
  const comment = { ...request.comment, uploads: generatedFileToken }
  const requestTemplate = { request: { ...request, comment } }
  return await zendesk({ module }).post("/requests", requestTemplate)
}
export const zendeskUploadFiles = (fileArray, callback, zendeskConfig) =>
  axios.all(
    fileArray.map((file) => {
      const b64Data = file.path.split(",")[1]
      const contentType = file.path.split(",")[0].match(/:(.*?);/)[1]
      return zendeskApi({
        ...zendeskConfig,
      }).post(
        `/uploads.json?filename=${file.filename}`,
        b64toBlob(b64Data, contentType),
        { headers: { "Content-Type": "application/binary" } }
      )
    })
  )

export const generateTemplate = (
  subject,
  email,
  template,
  templateObjects,
  tags
) => {
  return {
    type: "request",
    subject: `${TEST_ENV} ${subject} ${email}`,
    requester: { name: email, email },
    comment: { body: template(templateObjects) },
    tags,
  }
}
