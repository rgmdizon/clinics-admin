import React from "react"
import moment from "moment"
import firebase from "firebase"
import { navigate } from "gatsby"
import classNames from "classnames"

import Button from "elements/Button"

import { resendInvite } from "./resendInvite"
import { getSignedInUser } from "auth/services/user"
import { resendConfirmation } from "./resendConfirmation"

export const getBookingDetails = async ({
  bookingId,
  showChangeVaccineeModal,
  appContext,
  setLoading,
  loading,
}) => {
  let { dispatch } = appContext
  let { bookingsData, organization, userData } = getSignedInUser()
  let selectedBooking = bookingsData?.find(
    (booking) => booking?.id === bookingId
  )

  const renderActionButton = (document) => {
    let vaccinationDate =
      typeof selectedBooking?.startDate === "string"
        ? new Date(selectedBooking?.startDate)
        : new Date(selectedBooking?.startDate?.seconds * 1000)
    let hasDatePassed = moment(moment()).isAfter(vaccinationDate)

    switch (document.data().status?.toLowerCase()) {
      case "cancelled":
      default:
        return (
          <div class="buttons">
            {document.data().status !== "Cancelled" &&
              document.data().status !== "Available" && (
                <Button
                  size="small"
                  variant="outlined"
                  color="danger"
                  isDisabled={
                    document.data().status === "Cancelled" || hasDatePassed
                  }
                  width="120px"
                  onClick={() =>
                    showChangeVaccineeModal({
                      vaccinee: { id: document.id, ...document.data() },
                    })
                  }
                >
                  Cancel Registration
                </Button>
              )}
            {document.data().status === "Registered" && (
              <Button
                size="small"
                variant="outlined"
                color="primary"
                isDisabled={
                  document.data().status === "Cancelled" || hasDatePassed
                }
                className={classNames({
                  "is-loading":
                    loading?.id === document.id && loading?.isLoading,
                })}
                width="120px"
                onClick={() => {
                  if (setLoading)
                    setLoading({ id: document?.id, isLoading: true })

                  resendConfirmation({
                    payload: {
                      organizationDocument: organization,
                      bookingDocument: selectedBooking,
                      vaccinationUid: document.id,
                      vaccinee: { id: document.id, ...document.data() },
                    },
                    callback: () => {
                      if (setLoading) setLoading({})
                      dispatch({
                        type: "SHOW_TOAST",
                        payload: {
                          message: `Resent registration confirmation.`,
                          color: "success",
                        },
                      })
                    },
                    errorCallback: () => {
                      if (setLoading) setLoading({})
                      dispatch({
                        type: "SHOW_TOAST",
                        payload: {
                          message: `An error occurred. Please try again.`,
                          color: "danger",
                        },
                      })
                    },
                  })
                }}
              >
                Resend Confirmation
              </Button>
            )}
            {document.data().status === "Invited" && (
              <Button
                size="small"
                variant="outlined"
                color="primary"
                isDisabled={
                  document.data().status === "Cancelled" || hasDatePassed
                }
                className={classNames({
                  "is-loading":
                    loading?.id === document.id && loading?.isLoading,
                })}
                width="120px"
                onClick={() => {
                  if (setLoading)
                    setLoading({ id: document?.id, isLoading: true })

                  resendInvite({
                    vaccinee: {
                      organization,
                      id: document.id,
                      ...document.data(),
                      booking: selectedBooking,
                    },
                    callback: () => {
                      if (setLoading) setLoading({})

                      dispatch({
                        type: "SHOW_TOAST",
                        payload: {
                          message: `Resent invite.`,
                          color: "success",
                        },
                      })
                    },
                    errorCallback: () => {
                      if (setLoading) setLoading({})
                    },
                  })
                }}
              >
                Resend Invite
              </Button>
            )}
            {document.data().status === "Available" && (
              <Button
                size="small"
                variant="outlined"
                color="primary"
                isDisabled={hasDatePassed}
                width="120px"
                onClick={() => {
                  navigate("/bookings/book/send-invites")
                }}
              >
                Send Invite
              </Button>
            )}
          </div>
        )
    }
  }

  if (userData) {
    let invitees = []
    const BOOKING_INVITES = await firebase
      .firestore()
      .collection("vaccinees")
      .where("bookingId", "==", bookingId)
      .get()

    let parsedBookingInvites = []
    BOOKING_INVITES.forEach((document) => {
      const getTagColor = (status) => {
        switch (status) {
          case "Registered":
            return "primary"

          case "Cancelled":
            return "danger"

          default:
            return "light"
        }
      }

      parsedBookingInvites.push({
        organization,
        id: document.id,
        ...document.data(),
        booking: selectedBooking,
      })

      invitees.push([
        document.data().email,
        {
          type: "tag",
          data: document.data().status || "Invited",
          color: getTagColor(document.data().status),
        },
        { id: true, type: "string", data: document.id },
        document.data().firstName,
        document.data().lastName,
        {
          type: "component",
          data: renderActionButton(document),
        },
      ])
    })

    let totalDoses = parseInt(selectedBooking?.doses)

    let totalSentInvitations =
      invitees?.length -
        invitees?.filter((invitee) => {
          return invitee[1].data.toLowerCase() === "cancelled"
        }).length || 0

    let availableSlots = Array.from(
      { length: totalDoses - totalSentInvitations },
      () => [
        { type: "tag", data: "Available", color: "-" },
        "",
        "",
        "",
        {
          type: "component",
          data: renderActionButton({
            data: () => {
              return { status: "Available" }
            },
          }),
        },
      ]
    )

    if (availableSlots.length < 10)
      return {
        bookingInvites: parsedBookingInvites,
        displayData: [...invitees, ...availableSlots],
      }

    return {
      bookingInvites: parsedBookingInvites,
      displayData: [...invitees, ...availableSlots],
    }
  }
}
