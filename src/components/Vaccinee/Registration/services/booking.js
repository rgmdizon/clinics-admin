import { firebaseApi } from "services/firebase/firebaseApi"
import { generateJWT } from "services/jwt"

export const handleSubmitRegistration = async ({ payload }) => {
  try {
    const JWT_OBJECT = await generateJWT()
    const ACCESS_TOKEN = JWT_OBJECT?.data?.access_token

    const scheduleInfo = payload?.code?.schedules.filter(
      (sched) => sched.id === payload?.schedules?.venueId
    )[0]

    await firebaseApi({ accessToken: ACCESS_TOKEN }).patch(
      `accessRules/${payload?.code?.code?.id}/schedules/${payload?.schedules?.venueId}?updateMask.fieldPaths=reservedSlots`,
      {
        fields: {
          reservedSlots: {
            integerValue:
              scheduleInfo.reservedSlots +
              payload?.schedules?.totalVaccineeJabs,
          },
        },
      }
    )
  } catch (error) {
    console.error(error)
  }
}
