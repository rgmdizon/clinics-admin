import { queryDocuments } from "services/firebase/firebaseApi"

import { isBrowser } from "services/general"

export const handleDoctorVerification = async ({
  values,
  setVerificationError,
  errorCallback,
}) => {
  try {
    let doctorDocument = await queryDocuments({
      structuredQuery: createDoctorStructuredQuery({
        collectionId: "users",
        values,
      }),
    })

    let isVerified = false
    doctorDocument = doctorDocument[0]?.document
    if (isBrowser() && doctorDocument) {
      sessionStorage.setItem("doctorData", JSON.stringify(doctorDocument))
      isVerified = true
    } else {
      setVerificationError(
        "The credentials you entered do not match our records."
      )
    }

    return isVerified
  } catch (error) {
    setVerificationError(JSON.stringify(error))
    if (errorCallback) errorCallback()
    return error
  }
}

export const createDoctorStructuredQuery = ({ collectionId, values }) => {
  return {
    structuredQuery: {
      from: [{ collectionId }],
      where: {
        compositeFilter: {
          op: "AND",
          filters: [
            {
              fieldFilter: {
                field: {
                  fieldPath: "prcNumber",
                },
                op: "EQUAL",
                value: {
                  stringValue: values.prcNumber,
                },
              },
            },
            {
              fieldFilter: {
                field: {
                  fieldPath: "lastName",
                },
                op: "EQUAL",
                value: {
                  stringValue: values.lastName.toUpperCase(),
                },
              },
            },
          ],
        },
      },
    },
  }
}
