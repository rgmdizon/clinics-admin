import { generateJWT } from "services/jwt"
import { firebaseApi } from "services/firebase/firebaseApi"

export const handleDoctorAssessment = async ({
  values,
  callback,
  errorCallback,
}) => {
  try {
    const JWT_OBJECT = await generateJWT()
    const ACCESS_TOKEN = JWT_OBJECT?.data?.access_token

    let {
      rawVaccination,
      vaccinationUid,
      doctorAssessment,
      deferralReason,
      documentId,
      startDate,
      vaccineBrand,
    } = values

    let fieldNamesMask = `updateMask.fieldPaths=vaccinations&updateMask.fieldPaths=_updatedBy&updateMask.fieldPaths=changelog`
    let vaccinations = rawVaccination?.data[0]?.document?.fields?.vaccinations

    // Get last vaccination document
    let vaccination = vaccinations?.arrayValue?.values
    let latestVaccination = vaccination[vaccination?.length - 1]
    let oldVaccinations =
      rawVaccination?.data[0]?.document?.fields?.vaccinations

    let doctorData = JSON.parse(sessionStorage.getItem("doctorData"))
    let vaccinatorName = `${doctorData?.fields?.lastName}, ${doctorData?.fields?.firstName}`

    let updatePayload = {
      doctorAssessment: { stringValue: doctorAssessment },
      deferralReason: { stringValue: deferralReason },
      brand: { stringValue: vaccineBrand },
      vaccinatorName: { stringValue: vaccinatorName },
      vaccinatorPRCNumber: { stringValue: doctorData?.fields?.prcNumber },
      deferral: { booleanValue: doctorAssessment === "Defer" ? true : false },
    }

    latestVaccination.mapValue.fields = {
      ...latestVaccination?.mapValue?.fields,
      ...updatePayload,
      vaccinationDate: { timestampValue: startDate },
    }

    let _updatedBy = {
      fields: {
        userData: {
          mapValue: {
            fields: {
              vaccinatorName: { stringValue: vaccinatorName },
              vaccinatorPRCNumber: {
                stringValue: doctorData?.fields?.prcNumber,
              },
            },
          },
        },
        isPatch: { booleanValue: true },
        oldVaccinations,
        updatedFields: { arrayValue: { values: [vaccination] } },
      },
    }

    await firebaseApi({ accessToken: ACCESS_TOKEN }).patch(
      `vaccinations/${vaccinationUid}?${fieldNamesMask}`,
      {
        fields: {
          _updatedBy: { mapValue: _updatedBy },
          vaccinations: { arrayValue: { values: [vaccination] } },
          updateTime: {
            timestampValue: new Date(),
          },
        },
      }
    )

    // Update vaccinee status
    let vaccineeFieldNamesMask = `updateMask.fieldPaths=status`
    let status = doctorAssessment === "Administer" ? "Administer" : "Deferred"
    await firebaseApi({ accessToken: ACCESS_TOKEN }).patch(
      `vaccinees/${documentId}?${vaccineeFieldNamesMask}`,
      {
        fields: {
          status: { stringValue: status },
          updateTime: {
            timestampValue: new Date(),
          },
        },
      }
    )

    if (callback) callback()
  } catch (error) {
    if (errorCallback) errorCallback()
  }
}
