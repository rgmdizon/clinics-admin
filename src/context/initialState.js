export const initialState = {
  app: {
    hasRefreshed: false,
  },
  bookings: [],
  documents: [],
  auth: {
    email: "",
    password: "",
    confirmPassword: "",
    hasBeenVerified: false,
  },
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
  bottomNotifications: {
    isActive: true,
  },
}
