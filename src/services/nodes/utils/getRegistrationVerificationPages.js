const getRegistrationVerificationPages = () => [
  {
    module: "Registration Verification",
    path: `/`,
    componentPath: `./src/components/StaticPages/Home/index.js`,
    formModule: "Registration Verification",
    context: {
      nextPath: `/personal-details`,
      backPath: `/`,
      module: {
        title: "Vaccinee Verification",
        seoTitle: "Vaccinee Verification",
      },
    },
  },
]

module.exports = { getRegistrationVerificationPages }
