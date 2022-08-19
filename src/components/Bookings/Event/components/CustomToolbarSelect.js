import React, { useContext, useState } from "react"

import Button from "elements/Button"
import BatchCancelVaccineeModal from "./BatchCancelVaccineeModal"

import { AppContext } from "context/AppContext"
import { batchResendInvites } from "../services/batchResendInvites"
import { batchResendConfirmations } from "../services/batchResendConfirmations"

const CustomToolbarSelect = ({
  displayData,
  selectedRows,
  rawBookingInvitee,
  hasDatePassed,
}) => {
  const { dispatch } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [selectedAction, setSelectedAction] = useState("")

  const STATUS_INDEX = 1
  let hasResendInvites = false
  let hasResendConfirmations = false
  let hasCancelRegistration = false

  // Get all selected rows
  let selectedRowIndexes = selectedRows.data.map((row) => row?.dataIndex)
  let selectedRowData = displayData
    ?.filter(
      (row) =>
        selectedRowIndexes?.includes(row?.dataIndex) &&
        row?.data?.[STATUS_INDEX]?.data !== "Cancelled"
    )
    ?.map((row) => row?.data)

  // Checks for resend invites or resend confirmations
  let rowVaccineesUid = selectedRowData
    ?.map((rowData) => {
      if (rowData?.[STATUS_INDEX]?.data === "Invited") {
        hasResendInvites = true
        hasCancelRegistration = true
      }
      if (rowData?.[STATUS_INDEX]?.data === "Registered") {
        hasResendConfirmations = true
        hasCancelRegistration = true
      }

      return rowData?.[2]?.data
    })
    ?.filter((rowData) => !!rowData)

  // Filter all booking invites
  let selectedInvitees = []
  rawBookingInvitee.forEach((invitee) => {
    if (rowVaccineesUid?.includes(invitee?.id)) selectedInvitees.push(invitee)
  })

  // Batch Cancel Registration
  const handleBatchCancelRegistrations = () => {
    dispatch({
      type: "SHOW_MODAL",
      payload: {
        heading: "Please confirm cancel vaccinees",
        isCard: true,
        content: (
          <BatchCancelVaccineeModal
            vaccinees={selectedInvitees}
            dispatch={dispatch}
          />
        ),
      },
    })
  }

  // Batch Resend Invitations
  const handleBatchResendInvitation = () => {
    setLoading(true)
    setSelectedAction("invite")
    batchResendInvites({
      selectedInvitees,
      callback: (batchResendInvitees) => {
        setLoading(false)
        setSelectedAction("")

        dispatch({
          type: "SHOW_TOAST",
          payload: {
            message: `Invitations sent to ${batchResendInvitees?.length} vaccinee/s`,
            color: "success",
          },
        })
      },
    })
  }

  // Batch Resend Confirmations
  const handleBatchResendConfirmations = () => {
    setLoading(true)
    setSelectedAction("confirm")
    batchResendConfirmations({
      selectedInvitees,
      callback: (batchResendInvitees) => {
        setLoading(false)
        setSelectedAction("")

        dispatch({
          type: "SHOW_TOAST",
          payload: {
            message: `Registration confirmation emails sent to ${batchResendInvitees?.length} vaccinee/s`,
            color: "success",
          },
        })
      },
    })
  }

  return (
    <div className="buttons mr-2">
      {hasCancelRegistration && (
        <Button
          size="small"
          color="danger"
          width="160px"
          onClick={handleBatchCancelRegistrations}
          disabled={hasDatePassed}
        >
          Cancel Registration
        </Button>
      )}
      {hasResendInvites && (
        <Button
          size="small"
          color="primary"
          width="160px"
          isLoading={loading && selectedAction === "invite"}
          onClick={handleBatchResendInvitation}
          disabled={hasDatePassed}
        >
          Resend Invites
        </Button>
      )}
      {hasResendConfirmations && (
        <Button
          size="small"
          color="primary"
          width="160px"
          isLoading={loading && selectedAction === "confirm"}
          onClick={handleBatchResendConfirmations}
          disabled={hasDatePassed}
        >
          Resend Registration Emails
        </Button>
      )}
    </div>
  )
}

export default CustomToolbarSelect
