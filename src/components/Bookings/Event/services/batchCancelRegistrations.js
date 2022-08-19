import { processChangeVaccinee } from "./processChangeVaccinee"

export const batchCancelRegistrations = ({ selectedInvitees, callback }) => {
  let batchCancelRegistration = selectedInvitees.filter(
    (invitee) => invitee?.status !== "Cancelled"
  )

  let cancelledInvitees = 0
  batchCancelRegistration.forEach((invitee) => {
    processChangeVaccinee({
      vaccinee: invitee,
      successCallback: () => {
        cancelledInvitees++

        if (callback && cancelledInvitees === batchCancelRegistration.length)
          callback(batchCancelRegistration)
      },
    })
  })
}
