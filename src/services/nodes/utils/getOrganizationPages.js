const getOrganizationPages = () => [
  {
    module: "profile",
    path: `profile`,
    componentPath: `./src/components/Organization/index.js`,
    formModule: "Organization Profile",
    context: {
      module: {
        name: "profile",
        title: `Profile`,
        seoTitle: "Profile",
      },
    },
  },
  {
    module: "registration",
    path: `register/mechanics`,
    componentPath: `./src/components/Organization/OrganizationRegistration/RegistrationMechanics.js`,
    formModule: "Organization Registration Mechanics",
    context: {
      nextPath: `/register`,
      backPath: `/register/mechanics`,
      module: {
        name: "registration",
        cta: "Next",
        title: `Privacy Policy and Terms of Service Agreement`,
        subtitle: ``,
        seoTitle: "Privacy Policy and Terms of Service Agreement",
      },
    },
  },
  {
    module: "registration",
    path: `register`,
    componentPath: `./src/components/Organization/OrganizationRegistration/index.js`,
    formModule: "Organization Registration",
    context: {
      nextPath: `/profile`,
      backPath: `/`,
      module: {
        name: "registration",
        cta: "Next",
        title: `Registration`,
        subtitle: `Please provide your company related information.`,
        seoTitle: "Registration",
      },
    },
  },
]

module.exports = { getOrganizationPages }
