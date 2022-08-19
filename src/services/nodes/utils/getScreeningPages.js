const getScreeningPages = () => [
  {
    module: "screening",
    path: `vaccinee/screening`,
    componentPath: `./src/components/Screening/index.js`,
    formModule: [
      "Vaccinee Registration",
      "Doctor Assessment",
      "Screening Form",
    ],
    context: {
      nextPath: `/`,
      backPath: `/`,
      module: {
        name: "Verification",
        title: `Screening`,
        seoTitle: "Screening",
      },
    },
  },
  {
    module: "screening",
    path: `screening/verification`,
    componentPath: `./src/components/Screening/DoctorVerification/index.js`,
    formModule: ["Doctor.Verification"],
    context: {
      nextPath: `/vaccinee/screening`,
      module: {
        name: "Doctor Verification",
        title: `Doctor Verification`,
        seoTitle: "Doctor Verification",
        subtitle: "Please input your PRC number and last name to proceed.",
      },
    },
  },
]

module.exports = { getScreeningPages }
