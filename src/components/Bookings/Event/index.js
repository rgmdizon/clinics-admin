import React, { useState, useContext, useEffect, Fragment } from "react"
import moment from "moment"
import { navigate } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

import Datatable from "elements/Datatable"
import CardRow from "elements/CardRow"
import DashboardLayout from "layout/DashboardLayout"
import ChangeVaccineeModal from "./ChangeVaccineeModal"
import EventMobileCardRow from "./components/EventMobileCardRow"

import { detailColumns } from "../utils/table"
import { getTableOptions } from "./services/getTableOptions"
import { getBookingDetails } from "./services/getBookingDetails"
import { calculateBookingLevels } from "./services/calculateBookingLevels"

import { isBrowser } from "services/general"
import { getSignedInUser } from "auth/services/user"
import { getContextFromSession } from "services/context"
import { BookingContext } from "../context/BookingContext"

import { AppContext } from "../../../context/AppContext"

const Event = ({ pageContext }) => {
  const { state, dispatch } = useContext(BookingContext)
  const appContext = useContext(AppContext)

  const [isTableDataLoading, setIsTableDataLoading] = useState(true)
  const [rawBookingInvitee, setRawBookingInvitee] = useState([])
  const [bookingInvitees, setBookingInvitees] = useState([])
  const [bookingLevels, setBookingLevels] = useState([
    { value: 0, label: "Booked Slots" },
    { value: 0, label: "Invited" },
    { value: 0, label: "Registered" },
  ])

  const [loading, setLoading] = useState({})

  let { module, backPath } = pageContext
  let { bookingsData } = getSignedInUser()

  const sessionState = getContextFromSession()

  const activeBooking = sessionState?.activeBooking
    ? sessionState?.activeBooking
    : state?.activeBooking
  const selectedBooking = bookingsData?.find(
    (booking) => booking?.id === activeBooking?.bookingId
  )

  let vaccinationDate =
    typeof selectedBooking?.startDate === "string"
      ? new Date(selectedBooking?.startDate)
      : new Date(selectedBooking?.startDate?.seconds * 1000)
  let hasDatePassed = moment(moment()).isAfter(vaccinationDate)

  const getInvitees = async () => {
    setIsTableDataLoading(true)
    let fetchedBookingInvitees = await getBookingDetails({
      bookingId: activeBooking?.bookingId,
      showChangeVaccineeModal,
      appContext,
      setLoading,
      loading,
    })

    setBookingInvitees(fetchedBookingInvitees?.displayData)
    setRawBookingInvitee(fetchedBookingInvitees?.bookingInvites)
    setIsTableDataLoading(false)
  }

  const getBookingLevels = async () => {
    let fetchedBookingInvitees = await getBookingDetails({
      bookingId: activeBooking?.bookingId,
      showChangeVaccineeModal,
      appContext,
    })

    let fetchedBookingLevels = await calculateBookingLevels({
      bookingsData,
      activeBooking,
      fetchedBookingInvitees,
    })

    setBookingLevels(fetchedBookingLevels)
  }

  const showChangeVaccineeModal = ({ vaccinee }) => {
    appContext.dispatch({
      type: "SHOW_MODAL",
      payload: {
        heading: "Please confirm change vaccinee",
        isCard: true,
        content: (
          <ChangeVaccineeModal vaccinee={vaccinee} appContext={appContext} />
        ),
        hideCloseButton: true,
      },
    })
  }

  useEffect(() => {
    dispatch({
      type: "GET_CONTEXT_FROM_SESSION",
    })
    if (isBrowser())
      if (
        activeBooking?.bookingId &&
        activeBooking?.date &&
        activeBooking?.venue &&
        activeBooking?.brand
      ) {
        getInvitees()
        getBookingLevels()
      } else navigate("/bookings")
    //eslint-disable-next-line
  }, [state?.toast?.isActive, loading])

  return (
    <DashboardLayout
      seoTitle={module?.seoTitle}
      title={`${activeBooking?.date}, ${activeBooking?.venue} Booking`}
      subtitle={`${activeBooking?.brand}, ${activeBooking?.vaccineeType}, ${activeBooking?.doseType} Doses`}
      links={[
        {
          to: backPath,
          color: "outlined",
          label: (
            <Fragment>
              <FontAwesomeIcon icon={faArrowLeft} />{" "}
              <span className="is-inline-block ml-1">Back</span>
            </Fragment>
          ),
        },
        {
          to: "/bookings/book/send-invites",
          disabled: hasDatePassed,
          label: "Send Invites",
        },
      ]}
    >
      <div>
        <div className="mx-2-mobile mx-2-tablet mx-1-desktop">
          <CardRow data={bookingLevels} />
        </div>
        <Datatable
          data={bookingInvitees}
          options={getTableOptions({
            isLoading: isTableDataLoading,
            rawBookingInvitee,
            hasDatePassed,
          })}
          MobileCard={EventMobileCardRow}
          columns={detailColumns}
          isLoading={isTableDataLoading}
        />
      </div>
    </DashboardLayout>
  )
}

export default Event
