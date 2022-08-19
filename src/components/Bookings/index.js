import React, { useState } from "react"

import Book from "./Book/index"
import BookingsDashboard from "./BookingsDashboard"
import AllocationsConsumed from "./Book/AllocationsConsumed"

const BOOKING_DASHBOARD_VIEW = "BOOKING_DASHBOARD_VIEW"
const ALLOCATIONS_VIEW = "ALLOCATIONS_VIEW"
const BOOK_EVENT_VIEW = "BOOK_EVENT_VIEW"

const BookingsView = ({ view, setView, pageContext }) => {
  switch (view) {
    case BOOK_EVENT_VIEW:
      return <Book setView={setView} pageContext={pageContext} />
    case ALLOCATIONS_VIEW:
      return <AllocationsConsumed setView={setView} pageContext={pageContext} />
    case BOOKING_DASHBOARD_VIEW:
    default:
      return <BookingsDashboard setView={setView} pageContext={pageContext} />
  }
}

const Bookings = ({ pageContext }) => {
  const [view, setView] = useState(BOOKING_DASHBOARD_VIEW)

  return (
    <BookingsView view={view} pageContext={pageContext} setView={setView} />
  )
}

export default Bookings
