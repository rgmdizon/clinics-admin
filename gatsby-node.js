const {
  createCompletePages,
} = require("./src/services/nodes/createCompletePages")
const { createAuthPages } = require("./src/services/nodes/createAuthPages")
const {
  createOrganizationPages,
} = require("./src/services/nodes/createOrganizationPages")
const {
  createVaxCertPages,
} = require("./src/services/nodes/createVaxCertPages")
const {
  createBookingPages,
} = require("./src/services/nodes/createBookingPages")
const {
  createSummaryPages,
} = require("./src/services/nodes/createSummaryPages")
const {
  createVaccineesPages,
} = require("./src/services/nodes/createVaccineesPages")
const {
  createScreeningPages,
} = require("./src/services/nodes/createScreeningPages")
const {
  createRegistrationVerificationPages,
} = require("./src/services/nodes/createRegistrationVerificationPages")
const {
  createRegistrationPages,
} = require("./src/services/nodes/createRegistrationPages")

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/app/)) {
    page.matchPath = `/app/*`

    createPage(page)
  }
}

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  return Promise.all([
    createAuthPages(createPage, graphql),
    createSummaryPages(createPage, graphql),
    createBookingPages(createPage, graphql),
    createVaxCertPages(createPage, graphql),
    createCompletePages(createPage, graphql),
    createVaccineesPages(createPage, graphql),
    createOrganizationPages(createPage, graphql),
    createScreeningPages(createPage, graphql),
    createRegistrationVerificationPages(createPage, graphql),
    createRegistrationPages(createPage, graphql),
  ])
}

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      externals: getConfig().externals.concat(function (
        context,
        request,
        callback
      ) {
        const regex = /^@?firebase(\/(.+))?/
        // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
        if (regex.test(request)) {
          return callback(null, "umd " + request)
        }
        callback()
      }),
    })
  }
}
