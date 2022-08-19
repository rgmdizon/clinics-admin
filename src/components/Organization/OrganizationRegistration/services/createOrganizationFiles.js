import { uploadDocuments } from "auth/services/uploadDocuments"

export const createOrganizationFiles = async ({ registration, authUser }) => {
  const { documents, tradeName } = registration
  const { email } = authUser
  const path = `/${email}/registration/`
  const docBaseName = tradeName
  const docType = `birform`
  const documentUrlsArray = await uploadDocuments({
    documents,
    path,
    docBaseName,
    docType,
  })
  return documentUrlsArray || []
}
