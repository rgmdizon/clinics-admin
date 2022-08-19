import FireStoreParser from "firestore-parser"

import { generateJWT } from "services/jwt"
import { GATSBY_WEBSITE_URL } from "gatsby-env-variables"
import { firebaseApi } from "services/firebase/firebaseApi"

export const verifyCode = async ({ values, callback, errorCallback }) => {
  try {
    const JWT_OBJECT = await generateJWT()
    const ACCESS_TOKEN = JWT_OBJECT?.data?.access_token

    // fetch code document
    let fetchedCodeDocument = await queryDocument({
      value: values?.vaccineCode?.toUpperCase(),
      accessToken: ACCESS_TOKEN,
      collection: "accessRules",
      operator: "EQUAL",
      hasFilter: true,
      field: "code",
    })

    let codeDocumentId = fetchedCodeDocument?.data?.[0]?.document?.name
      .split("/")
      .at(-1)

    let parsedCodeDocument = FireStoreParser(
      fetchedCodeDocument?.data?.[0]?.document?.fields
    )
    parsedCodeDocument.id = codeDocumentId

    // fetch code schedules
    let fetchedScheduleDocuments = await queryDocument({
      parent: `accessRules/${codeDocumentId}`,
      accessToken: ACCESS_TOKEN,
      collection: "schedules",
    })

    let parsedSchedules = []
    fetchedScheduleDocuments.data.forEach((data) => {
      let scheduleId = data?.document?.name?.split("/").at(-1)
      parsedSchedules.push(
        FireStoreParser({ id: scheduleId, ...data.document.fields })
      )
    })

    let parsedVaccines = []
    for (const schedule of parsedSchedules) {
      let fetchedVaccinesDocuments = await queryDocument({
        parent: `accessRules/${codeDocumentId}/schedules/${schedule?.id}`,
        accessToken: ACCESS_TOKEN,
        collection: "vaccines",
      })

      fetchedVaccinesDocuments.data.forEach((data) => {
        let vaccineId = data?.document?.name?.split("/").at(-1)

        parsedVaccines.push(
          FireStoreParser({
            id: vaccineId,
            ...data.document.fields,
            scheduleId: schedule?.id,
          })
        )
      })
    }

    // fetch organization
    let fetchedOrganizationDocument = await firebaseApi({
      accessToken: ACCESS_TOKEN,
    }).get(`organizations/${parsedCodeDocument?.organizationId}`)

    let parsedOrganizationDocument = FireStoreParser(
      fetchedOrganizationDocument?.data?.fields
    )

    // if (!values?.workEmail?.includes(parsedOrganizationDocument?.subdomain))
    //   throw new Error()

    if (callback)
      callback({
        code: parsedCodeDocument,
        schedules: parsedSchedules,
        vaccines: parsedVaccines,
        organization: {
          id: parsedCodeDocument?.organizationId,
          ...parsedOrganizationDocument,
        },
      })
  } catch (error) {
    if (errorCallback) errorCallback()
    return true
  }
}

const queryDocument = async ({
  value,
  field,
  parent,
  operator,
  hasFilter,
  collection,
  accessToken,
}) => {
  let structuredQuery = {
    from: [{ collectionId: collection }],
  }

  if (hasFilter)
    structuredQuery.where = {
      compositeFilter: {
        op: "AND",
        filters: [
          {
            fieldFilter: {
              field: {
                fieldPath: field,
              },
              op: operator,
              value: {
                stringValue: value,
              },
            },
          },
          {
            fieldFilter: {
              field: {
                fieldPath: "status",
              },
              op: "EQUAL",
              value: {
                stringValue: "Active",
              },
            },
          },
          {
            fieldFilter: {
              field: {
                fieldPath: "subdomain",
              },
              op: "EQUAL",
              value: {
                stringValue: GATSBY_WEBSITE_URL,
              },
            },
          },
        ],
      },
    }

  return await firebaseApi({ accessToken }).post(`${parent || ""}:runQuery`, {
    structuredQuery,
  })
}
