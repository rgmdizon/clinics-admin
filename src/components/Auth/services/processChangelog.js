import { getSignedInUser } from "./user"
import { isObjectEmpty } from "services/general"

export const processUpdatedBy = ({
  userData = {},
  authUser = {},
  fieldsToUpdate = {},
  isPatch = false,
}) => {
  const { firstName, lastName, email, id } = userData
  const { emailVerified, isAnonymous, photoURL } = authUser

  let _updatedBy = {}
  if (isPatch) {
    _updatedBy = {
      mapValue: {
        fields: {
          displayName: {
            stringValue: `${firstName} ${lastName}`,
          },
          uid: {
            stringValue: id || "",
          },
          email: {
            stringValue: email || "",
          },
          isAnonymous: {
            booleanValue: isAnonymous || true,
          },
          emailVerified: {
            booleanValue: emailVerified || true,
          },
          timestamp: {
            timestampValue: new Date(),
          },
          photoURL: {
            stringValue: authUser?.photoURL || "",
          },
        },
      },
    }
    if (!isObjectEmpty(fieldsToUpdate))
      _updatedBy.mapValue.fields.updatedField = {
        mapValue: { fields: fieldsToUpdate },
      }
  } else {
    _updatedBy = {
      displayName: `${firstName} ${lastName}`,
      uid: id || "",
      email: email || "",
      isAnonymous: isAnonymous || true,
      emailVerified: emailVerified || false,
      timestamp: new Date(),
      photoURL: photoURL || "",
    }

    if (!isObjectEmpty(fieldsToUpdate)) _updatedBy.updatedField = fieldsToUpdate
  }
  return _updatedBy
}
export const processChangelog = ({
  document = {},
  fieldsToUpdate,
  userData,
}) => {
  let changelog = document.changelog ? document.changelog : []

  const { updateTime, ...remainingFieldsToUpdate } = fieldsToUpdate

  changelog = [
    ...changelog,
    {
      updateBy: userData?.id || getSignedInUser().userData?.id,
      updateTime: new Date(),
      data: remainingFieldsToUpdate,
    },
  ]

  // if (patch) {
  //   changelog = {
  //     arrayValue: {
  //       values: [
  //         {
  //           // updateBy: {
  //           //   stringValue: email,
  //           // },
  //           updateTime: {
  //             timestampValue: new Date(),
  //           },
  //         },
  //       ],
  //     },
  //   }

  return changelog
}
