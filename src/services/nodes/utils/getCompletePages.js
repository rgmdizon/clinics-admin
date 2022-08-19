const getCompletePages = () => [
  {
    module: "registration",
    componentPath: `./src/components/Organization/OrganizationRegistration/RegistrationComplete.js`,
    path: `register/complete`,
    context: {
      nextPath: `/profile`,
      module: {
        name: "registration",
        title: "Please check your email for acknowledgement",
        seoTitle: "Registration Complete",
      },
      content: {
        icon: "email",
      },
    },
  },
  {
    module: "booking",
    componentPath: `./src/components/Bookings/Complete/index.js`,
    path: `bookings/book/complete`,
    context: {
      backPath: "/bookings",
      nextPaths: {
        "Send invite links": "/bookings/book/send-invites",
        "Input individual vaccinee details": "/bookings/book/input-details/",
      },
      module: {
        name: "booking",
        title: "Thank you for Booking",
        seoTitle: "Booking Complete",
      },
    },
  },
  {
    module: "booking",
    componentPath: `./src/components/Bookings/SendInvites/Complete/index.js`,
    path: `bookings/book/send-invites/complete`,
    context: {
      nextPath: "/bookings/",
      module: {
        name: "booking",
        title: "Your invites are currently being processed.",
        seoTitle: "Invitations Sent",
      },
    },
  },
]

module.exports = { getCompletePages }
