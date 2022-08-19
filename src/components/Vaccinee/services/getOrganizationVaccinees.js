import firebase from "firebase"
import { getSignedInUser } from "auth/services/user"

export const getOrganizationVaccinees = async () => {
  let { organization, userData } = getSignedInUser()

  if (userData) {
    let invitees = []
    const ORGANIZATION_VACCINEES = await firebase
      .firestore()
      .collection("vaccinees")
      .where("organizationId", "==", organization?.id)
      .get()

    ORGANIZATION_VACCINEES.forEach((document) => {
      invitees.push([
        document?.id,
        `${document?.data()?.firstName || ""} ${
          document?.data()?.lastName || ""
        }`,
        document?.data().vaccineBrand,
        document?.data().doses,
        document?.data().location,
      ])
    })

    return [...invitees]
  }
  return []
}
