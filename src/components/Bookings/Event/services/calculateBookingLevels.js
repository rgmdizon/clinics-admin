export const calculateBookingLevels = async ({
  bookingsData,
  activeBooking,
  fetchedBookingInvitees,
}) => {
  let totalInvited = 0
  let totalRegistered = 0

  let selectedBooking = bookingsData?.find(
    (booking) => booking?.id === activeBooking?.bookingId
  )

  fetchedBookingInvitees.displayData.forEach((invitee) => {
    if (invitee?.[1]?.data === "Invited" || invitee?.[1]?.data === "Registered")
      totalInvited++
    if (invitee?.[1]?.data === "Registered") totalRegistered++
  })

  return [
    { value: selectedBooking?.doses, label: "Booked Slots" },
    { value: totalInvited - totalRegistered, label: "Invited" },
    { value: totalRegistered, label: "Registered" },
  ]
}
