import React, { Fragment, useState } from "react"

import Button from "elements/Button"

import { isBrowser } from "services/general"
import { batchCancelRegistrations } from "../services/batchCancelRegistrations"

const BatchCancelVaccineeModal = ({ vaccinees, dispatch }) => {
  const [loading, setLoading] = useState(false)

  let batchCancelRegistration = vaccinees.filter(
    (invitee) => invitee?.status !== "Cancelled"
  )

  const handleBatchCancelRegistration = () => {
    setLoading(true)
    batchCancelRegistrations({
      selectedInvitees: vaccinees,
      callback: (batchResendInvitees) => {
        dispatch({
          type: "SHOW_TOAST",
          payload: {
            message: `Cancelled registration for ${batchResendInvitees?.length} vaccinee/s`,
            color: "success",
          },
        })
        if (isBrowser()) {
          setLoading(false)
          window.location.reload()
        }
      },
    })
  }

  return (
    <Fragment>
      <div className="content">
        <p className="has-text-left">
          You are about to cancel {batchCancelRegistration?.length} vaccinee
          {batchCancelRegistration?.length > 1 ? "s" : ""}. You will be allowed
          to send another invite to a new email afterwards. The slot will be
          freed up and you will be able to send a new invitation to a new email
          address afterwards.
        </p>
        <div className="buttons is-centered">
          <Button
            variant="outline"
            onClick={() =>
              dispatch({
                type: "HIDE_MODAL",
              })
            }
          >
            Back
          </Button>
          <Button
            color="primary"
            onClick={handleBatchCancelRegistration}
            isLoading={loading}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Fragment>
  )
}

export default BatchCancelVaccineeModal
