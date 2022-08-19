const path = require("path")
const { getVaxCertPages } = require("./utils/getVaxCertPages")

const { flattenNode } = require("../arrays")

const ALL_VAX_CERT_QUERY = `
  query AirtableVaxCert {
    allAirtableallVaxCert(sort: {fields: data___Order}) {
      nodes {
        data {
          Step
          Screenshot {
            localFiles {
              childImageSharp {
                fluid {
                  originalImg
                }
              }
            }
          }
        }
      }
    }
  }
`

const createVaxCertPages = (createPage, graphql) => {
  return new Promise(async (resolve, reject) => {
    try {
      let queryResult = await graphql(ALL_VAX_CERT_QUERY)
      let vaxCertSteps = flattenNode(queryResult.data.allAirtableallVaxCert)
      let vaxCertPages = getVaxCertPages()
      vaxCertPages.map((vaccineesPage) => {
        createPage({
          path: vaccineesPage.path,
          component: path.resolve(vaccineesPage.componentPath),
          context: {
            ...vaccineesPage.context,
            vaxCertSteps,
          },
        })
      })

      resolve()
    } catch (error) {
      reject(error)
      console.log(
        `%cError (createVaccineePages): ${error}`,
        "background-color:#d84544; font-color:white;"
      )
    }
  })
}

module.exports = { createVaxCertPages }
