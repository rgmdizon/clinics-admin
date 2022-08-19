const getRegistrationPages = () => [
  // {
  //   module: "Ordering For",
  //   path: `ordering-for`,
  //   componentPath: `./src/components/Vaccinee/Registration/index.js`,
  //   formModule: "Ordering For",
  //   context: {
  //     nextPath: `/personal-details`,
  //     backPath: `/`,
  //     module: {
  //       stateKey: "orderingFor",
  //       dispatchKey: "SAVE_ORDERING_FOR",
  //       module: "ordering-for",
  //       title: "Who are you ordering for?",
  //       subTitle:
  //         "Please ensure that the information provided below is correct.",
  //       seoTitle: "Vaccinee Registration",
  //     },
  //   },
  // },
  {
    module: "Personal Details",
    path: `personal-details`,
    componentPath: `./src/components/Vaccinee/Registration/index.js`,
    formModule: "Personal Details",
    context: {
      nextPath: `/vaccines`,
      backPath: `/`,
      requiredData: ["vaccineCode"],
      module: {
        stateKey: "personalDetails",
        dispatchKey: "SAVE_PERSONAL_DETAILS",
        module: "personal-details",
        title: "Vaccine Registration",
        subTitle:
          "Please ensure that the information provided below is correct.",
        seoTitle: "Vaccinee Registration",
      },
    },
  },
  {
    module: "Vaccines",
    path: `vaccines`,
    componentPath: `./src/components/Vaccinee/Registration/RegistrationCart/index.js`,
    formModule: "Vaccine",
    context: {
      nextPath: `/intake-form`,
      backPath: `/personal-details`,
      requiredData: ["vaccineCode"],
      module: {
        stateKey: "vaccines",
        dispatchKey: "SAVE_VACCINE",
        module: "vaccine",
        title: "Add Vaccines",
        subTitle: "",
        seoTitle: "Vaccinee Registration",
      },
    },
  },
  {
    module: "Intake Form",
    path: `intake-form`,
    componentPath: `./src/components/Vaccinee/Registration/index.js`,
    formModule: "Intake Form",
    context: {
      nextPath: `/schedules`,
      backPath: `/vaccines`,
      requiredData: ["vaccineCode"],
      module: {
        stateKey: "intakeForm",
        dispatchKey: "SAVE_INTAKE_FORM",
        module: "intake-form",
        title: "Screening Questionnaire",
        subTitle:
          "The doctor will need your health information to assess if you are eligible to be vaccinated.",
        seoTitle: "Vaccinee Registration",
      },
    },
  },
  {
    module: "Vaccination Schedule",
    path: `schedules`,
    componentPath: `./src/components/Vaccinee/Registration/RegistrationSchedule.js`,
    formModule: "Schedules",
    context: {
      nextPath: `/checkout`,
      backPath: `/intake-form`,
      requiredData: ["vaccineCode"],
      module: {
        stateKey: "schedules",
        dispatchKey: "SAVE_SCHEDULE_FORM",
        module: "schedules",
        title: "Select Schedule",
        subTitle: "Please select your preferred branch and schedule.",
        seoTitle: "Vaccinee Registration",
      },
    },
  },
  {
    module: "Payment Methods",
    path: `checkout`,
    componentPath: `./src/components/Vaccinee/Registration/index.js`,
    formModule: "Payment",
    context: {
      nextPath: `/informed-consent`,
      backPath: `/schedules`,
      requiredData: ["vaccineCode"],
      module: {
        stateKey: "payment",
        dispatchKey: "SAVE_PAYMENT",
        module: "payment",
        title: "Select Payment Method",
        subTitle: "You will be redirected to the payment gateway afterwards.",
        seoTitle: "Vaccinee Registration",
      },
    },
  },
  {
    module: "informed-consent",
    path: `informed-consent`,
    componentPath: `./src/components/Vaccinee/Registration/index.js`,
    formModule: "Informed Consent",
    context: {
      nextPath: `/summary`,
      backPath: `/checkout`,
      requiredData: ["vaccineCode"],
      module: {
        stateKey: "informedConsent",
        dispatchKey: "SAVE_INFORMED_CONSENT",
        module: "informedConsent",
        title: "Informed Consent",
        subTitle: "Please read the mechanics and provide consent.",
        seoTitle: "Vaccinee Registration",
      },
    },
  },
  {
    module: "summary",
    path: `summary`,
    componentPath: `./src/components/Vaccinee/Registration/RegistrationSummary/index.js`,
    formModule: "Personal Details",
    context: {
      nextPath: `/complete`,
      backPath: `/informed-consent`,
      requiredData: ["vaccineCode"],
      module: {
        module: "summary",
        title: "Registration Summary",
        subTitle: "Please ensure that the information below is correct.",
        seoTitle: "Vaccinee Registration",
      },
    },
  },
  {
    module: "registration-complete",
    path: `complete`,
    componentPath: `./src/components/Vaccinee/Registration/RegistrationComplete.js`,
    formModule: "Vaccinee Registration",
    context: {
      backPath: `/summary`,
      nextPath: `/`,
      requiredData: ["vaccineCode"],
      module: {
        name: "registrationComplete",
        title: `Registration Complete`,
        seoTitle: `Registration Complete`,
      },
      content: {
        icon: "email",
      },
    },
  },
]

module.exports = { getRegistrationPages }
