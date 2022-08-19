const getSummaryPages = () => [
  {
    componentPath: `./src/components/Bookings/Summary/index.js`,
    path: `bookings/book/summary`,
    subModule: "Bookings",
    context: {
      backPath: `/bookings/book`,
      nextPath: `/bookings/book`,
      module: {
        title: "Review Booking Details",
        subtitle: "",
        cta: "Submit Booking Event",
        seoTitle: "Booking Summary",
      },
    },
  },
]

module.exports = { getSummaryPages }
