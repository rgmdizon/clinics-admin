const getVaccineesPages = () => [
  {
    module: "vaccinees",
    path: `covid/vaccinees`,
    componentPath: `./src/components/Vaccinee/index.js`,
    formModule: "Vaccinees",
    context: {
      nextPath: `/vaccinees`,
      backPath: `/`,
      module: {
        name: "vaccinees",
        title: `Vaccinees`,
        seoTitle: "Vaccinees",
      },
    },
  },
  {
    module: "vaccinees",
    path: `covid/vaccinees/vaccinee`,
    componentPath: `./src/components/Vaccinee/VaccineeDetails/index.js`,
    formModule: "Vaccinee",
    context: {
      backPath: `/vaccinees`,
      module: {
        name: "vaccinees",
        title: `Vaccinees`,
        seoTitle: "Vaccinees",
      },
    },
  },
  {
    module: "vaccinees",
    path: `covid/vaccinee`,
    componentPath: `./src/components/Vaccinee/Registration/COVIDRegistration.js`,
    formModule: "Vaccinee Registration",
    context: {
      backPath: `/vaccinees`,
      module: {
        form: "registration",
        name: "vaccinees",
        title: `Vaccinee Registration`,
        seoTitle: `Vaccinee Registration`,
        subtitle:
          "Please fill out the details below to complete your vaccination registration.",
      },
    },
  },
  {
    module: "vaccinees",
    path: `covid/screening/`,
    componentPath: `./src/components/Vaccinee/Registration/COVIDRegistration.js`,
    formModule: "Screening Form",
    context: {
      backPath: `/covid/vaccinee`,
      module: {
        form: "screening",
        name: "vaccinees",
        title: `Vaccinee Registration`,
        seoTitle: `Vaccinee Registration`,
        subtitle:
          "Please fill out the screening form below to complete your vaccination registration.",
      },
    },
  },
  {
    module: "vaccinees",
    path: `covid/vaccinee/complete`,
    componentPath: `./src/components/Vaccinee/Registration/COVIDComplete.js`,
    formModule: "Vaccinee Registration",
    context: {
      backPath: `/vaccinees`,
      nextPath: `/`,
      module: {
        name: "vaccinees",
        title: `Thank you for registering for MedGrocer's COVID-19 Vaccination Program.`,
        seoTitle: `Registration Complete`,
      },
      content: {
        icon: "email",
      },
    },
  },
  {
    module: "vaccinees",
    path: `covid/vaccinee/invalid`,
    componentPath: `./src/components/Vaccinee/Registration/RegistrationInvalid.js`,
    formModule: "Vaccinee Registration",
    context: {
      nextPath: `/`,
      module: {
        name: "vaccinees",
        title: `Registration Invalid`,
        seoTitle: `Registration Invalid`,
      },
      content: {
        icon: "email",
      },
    },
  },
]

module.exports = { getVaccineesPages }
