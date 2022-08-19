const getBookingPages = () => [
  {
    module: "booking",
    path: `bookings`,
    componentPath: `./src/components/Bookings/index.js`,
    formModule: "Bookings",
    context: {
      nextPath: `/bookings/book`,
      backPath: `/`,
      module: {
        name: "bookings",
        title: `Bookings`,
        seoTitle: "Bookings",
        bookEvent: {
          nextPath: "/bookings/book/summary",
          name: "bookings",
          title: `Book Event`,
          seoTitle: "Bookings",
          cta: "Review Summary",
        },
        allocations: {
          name: "bookings",
          seoTitle: "Allocations",
          cta: "Back",
        },
      },
    },
  },
  {
    module: "booking",
    path: `bookings/details`,
    componentPath: `./src/components/Bookings/Event/index.js`,
    formModule: "Bookings",
    context: {
      backPath: `/bookings`,
      module: {
        name: "bookings",
        title: `Booking`,
        seoTitle: "Booking Details",
      },
    },
  },
  {
    module: "booking",
    path: `bookings/book`,
    componentPath: `./src/components/Bookings/Book/index.js`,
    formModule: "Bookings",
    context: {
      nextPath: `/bookings/book/summary`,
      backPath: `/bookings`,
      module: {
        name: "bookings",
        title: `Book Event`,
        seoTitle: "Bookings",
        cta: "Review Summary",
      },
    },
  },
  {
    module: "booking",
    path: `/bookings/book/send-invites`,
    componentPath: `./src/components/Bookings/SendInvites/index.js`,
    formModule: "Bookings",
    context: {
      nextPath: `/bookings/book/send-invites/complete`,
      backPath: `/bookings/`,
      module: {
        name: "bookings",
        title: `Send Invite Links`,
        seoTitle: "Send Invite Links",
      },
    },
  },
  {
    module: "booking",
    path: `bookings/checkout`,
    componentPath: `./src/components/Bookings/Payment/index.js`,
    formModule: "Bookings",
    context: {
      backPath: `/bookings/book/summary`,
      module: {
        name: "bookings",
        title: `Checkout`,
        seoTitle: "Bookings",
        cta: "Checkout",
      },
    },
  },
  {
    module: "booking",
    path: `bookings/checkout/verify`,
    componentPath: `./src/components/Bookings/Payment/VerifyPayment/index.js`,
    formModule: "Bookings",
    context: {
      nextPath: `/bookings/book/complete`,
      module: {
        name: "bookings",
        title: `Checkout`,
        seoTitle: "Bookings",
        cta: "Checkout",
      },
    },
  },
  {
    module: "booking",
    path: `bookings/allocations-consumed`,
    componentPath: `./src/components/Bookings/Book/AllocationsConsumed.js`,
    formModule: "Bookings",
    context: {
      backPath: `/profile`,
      module: {
        name: "bookings",
        seoTitle: "Allocations",
        cta: "Back",
      },
    },
  },
]

module.exports = { getBookingPages }
