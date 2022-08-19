const getCompletePages = () => [
  {
    module: "mental-health",
    componentPath: `./src/components/MentalHealth/Booking/BookingComplete/index.js`,
    path: `mental-health/complete`,
    context: {
      nextPath: `/`,
      module: {
        name: "mental-health",
        title: "Thank You!",
        seoTitle: "Teleconsult Request Sent",
      },
      content: {
        icon: "email",
      },
    },
  },
]

module.exports = { getCompletePages }
