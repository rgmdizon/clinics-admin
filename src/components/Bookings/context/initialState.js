export const initialState = {
  activeBooking: {},
  bookings: [],
  documents: [],
  allDates: [],
  modal: {
    isCard: false,
    isFullheight: false,
    isActive: false,
    content: null,
    heading: "",
    headerClass: null,
    hideCloseButton: true,
    background: {
      color: null,
      opacity: "100",
    },
  },
  toast: {
    isActive: false,
    message: null,
    color: null,
  },
}
