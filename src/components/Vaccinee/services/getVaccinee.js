import firebase from "firebase"

export const getVaccinee = async ({ id }) => {
  let vaccineeDetail = await firebase
    .firestore()
    .collection("vaccinees")
    .doc(id)
    .get()
  let vaccineeDetailData = vaccineeDetail?.data()

  let organizationDetails = await firebase
    .firestore()
    .collection("organizations")
    .doc(vaccineeDetailData?.organizationId)
    .get()
  let organizationDetailsData = organizationDetails?.data()

  return { ...vaccineeDetailData, ...organizationDetailsData }
}
