import { resendConfirmation } from "../services/resendConfirmation"

export const batchResendConfirmations = ({ selectedInvitees, callback }) => {
  let batchResendConfirmations = selectedInvitees.filter(
    (invitee) => invitee?.status === "Registered"
  )

  let sentConfirmations = 0
  batchResendConfirmations.forEach((invitee) => {
    resendConfirmation({
      payload: {
        organizationDocument: invitee?.organization,
        bookingDocument: invitee?.booking,
        vaccinationUid: invitee.id,
        vaccinee: { id: invitee.id, ...invitee },
      },
      callback: () => {
        sentConfirmations++

        if (callback && sentConfirmations === batchResendConfirmations.length)
          callback(batchResendConfirmations)
      },
    })
  })
}
