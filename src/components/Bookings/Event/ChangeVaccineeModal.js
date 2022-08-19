import React, { Fragment, useState } from "react"

import Button from "elements/Button"
import { processChangeVaccinee } from "./services/processChangeVaccinee"

import { isBrowser } from "services/general"

const ChangeVaccineeModal = ({ vaccinee, appContext }) => {
  const [loading, setLoading] = useState(false)
  const { dispatch } = appContext
  let vaccineeName = vaccinee?.firstName
    ? `${vaccinee?.firstName} ${vaccinee.lastName}`
    : vaccinee?.email

  const handleChangeConfirm = () => {
    setLoading(true)
    processChangeVaccinee({
      vaccinee,
      successCallback: async () => {
        setLoading(false)
        dispatch({
          type: "HIDE_MODAL",
        })
        dispatch({
          type: "SHOW_TOAST",
          payload: {
            message: `Changed vaccinee.`,
            color: "success",
          },
        })
        if (isBrowser()) {
          window.location.reload()
        }
      },
      errorCallback: () => {
        setLoading(false)
        dispatch({
          type: "SHOW_TOAST",
          payload: {
            message: `Something went wrong with you request.`,
            color: "danger",
          },
        })
      },
    })
  }
  return (
    <Fragment>
      <div className="content">
        <p className="has-text-left">
          Changing vaccinee will remove <b>{vaccineeName}</b>. You will be
          allowed to send another invite to a new email afterwards. The slot
          will be freed up and you will be able to send a new invitation to a
          new email address afterwards.
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
            onClick={handleChangeConfirm}
            isLoading={loading}
          >
            Confirm
          </Button>
        </div>
      </div>
    </Fragment>
  )
}

export default ChangeVaccineeModal
