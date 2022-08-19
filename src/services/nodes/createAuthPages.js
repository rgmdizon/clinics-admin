const path = require("path")
const { flattenNode } = require("../arrays")
const { getAuthPages } = require("./utils/getAuthPages")

const ALL_AUTH_FORM_FIELDS_QUERY = `
  query AirtableRegistrationFormFields {
    allAirtableallFormFields(sort: {fields: data___Order}) {
      nodes {
        data {
          Type
          Required
          Name
          Add_Divider_After_Field
          Field_Names
          Label
          Module
          Min
          Options
          Order
          Placeholder
          Show_On_Website
          Validation
          Inclusions
        }
      }
    }
  }
`

const createAuthPages = (createPage, graphql) => {
  return new Promise(async (resolve, reject) => {
    try {
      let queryResult = await graphql(ALL_AUTH_FORM_FIELDS_QUERY)
      let authPages = getAuthPages()
      let formFields = flattenNode(queryResult.data.allAirtableallFormFields)

      authPages.map((authPage) => {
        createPage({
          path: authPage.path,
          component: path.resolve(authPage.componentPath),
          context: {
            ...authPage.context,
            formFields: formFields.filter(
              (formField) => formField.module === authPage.formModule
            ),
          },
        })
      })

      resolve()
    } catch (error) {
      reject(error)
      console.log(
        `%cError (createAuthPages): ${error}`,
        "background-color:#d84544; font-color:white;"
      )
    }
  })
}

module.exports = { createAuthPages }
