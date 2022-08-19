import { resendInvite } from "../services/resendInvite"

export const batchResendInvites = ({ selectedInvitees, callback }) => {
  let batchResendInvitees = selectedInvitees.filter(
    (invitee) => invitee?.status === "Invited"
  )

  let sentInvites = 0
  batchResendInvitees.forEach((invitee) => {
    resendInvite({
      vaccinee: invitee,
      callback: () => {
        sentInvites++

        if (callback && sentInvites === batchResendInvitees.length)
          callback(batchResendInvitees)
      },
    })
  })
}
