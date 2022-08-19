const path = require("path")
const { getOrganizationPages } = require("./utils/getOrganizationPages")

const { flattenNode } = require("../arrays")

const ALL_ORGANIZATION_FORM_FIELDS_QUERY = `
  query AirtableRegistrationFormFields {
    allAirtableallFormFields(filter: {data: {Module: {glob: "Organization*"}, Show_On_Website: {eq: true}}}) {
      nodes {
        data {
          Type
          Required
          Name
          Add_Divider_After_Field
          Field_Names
          Follow_Up_Questions
          Follow_Up_Questions_Name
          Is_Follow_Up_Question
          Label
          Module
          Min
          Options
          Order
          Placeholder
          Reference_Answer
          Reference_Question
          Reference_Question_Name
          Section
          Section_ID
          Section_Order
          Section_Message
          Sub_Module
          Is_Disabled
          Max_Length
          Show_On_Website
          Validation
          Other_Schedule_Names
        }
      }
    }
  }
`

const createOrganizationPages = (createPage, graphql) => {
  return new Promise(async (resolve, reject) => {
    try {
      let queryResult = await graphql(ALL_ORGANIZATION_FORM_FIELDS_QUERY)
      let formFields = flattenNode(queryResult.data.allAirtableallFormFields)
      let registrationPages = getOrganizationPages()
      registrationPages.map((registrationPage) => {
        createPage({
          path: registrationPage.path,
          component: path.resolve(registrationPage.componentPath),
          context: {
            ...registrationPage.context,
            formFields: formFields.filter(
              (formField) => formField.module === registrationPage.formModule
            ),
          },
        })
      })

      resolve()
    } catch (error) {
      reject(error)
      console.log(
        `%cError (createOrganizationPages): ${error}`,
        "background-color:#d84544; font-color:white;"
      )
    }
  })
}

module.exports = { createOrganizationPages }
