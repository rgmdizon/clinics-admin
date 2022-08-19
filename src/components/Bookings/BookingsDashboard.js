import React, { useEffect, useState, useContext } from "react"
import { navigate } from "gatsby"

import Datatable from "elements/Datatable"
import DashboardLayout from "layout/DashboardLayout"

import { columns } from "./utils/table"
import { getSignedInUser } from "../Auth/services/user"
import { getBookingsData } from "./services/getBookings"
import { getTableOptions } from "./services/getTableOptions"

import { BookingContext } from "./context/BookingContext"

const BOOK_EVENT_VIEW = "BOOK_EVENT_VIEW"

const BookingsDashboard = ({ pageContext, setView }) => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const { state, dispatch } = useContext(BookingContext)

  let { module } = pageContext
  let { organization } = getSignedInUser()

  const getBookings = async () => {
    let results = await getBookingsData()
    setBookings(results)
    if (!results.length) {
      if (setView) setView(BOOK_EVENT_VIEW)
      else navigate("/bookings/book")
    }

    setLoading(false)
  }

  const handleOnBookingEventClick = (data) => {
    dispatch({
      type: "SAVE_ACTIVE_BOOKING_EVENT",
      payload: data,
    })

    dispatch({
      type: "SAVE_CONTEXT_TO_SESSION",
      payload: {
        ...state,
        activeBooking: { ...state.activeBooking, ...data },
      },
    })
  }

  useEffect(() => {
    dispatch({ type: "RESET_BOOKING" })
    getBookings()
    //eslint-disable-next-line
  }, [])

  return (
    <DashboardLayout
      seoTitle={module?.seoTitle}
      title={`${organization?.tradeName} ${module?.title}`}
      links={[{ to: "/bookings/book", label: "Book Event" }]}
    >
      <div>
        <Datatable
          data={bookings}
          options={getTableOptions({
            isLoading: loading,
            callback: handleOnBookingEventClick,
          })}
          columns={columns}
        />
      </div>
    </DashboardLayout>
  )
}

export default BookingsDashboard
