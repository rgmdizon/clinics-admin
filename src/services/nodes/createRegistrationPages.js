const path = require("path")
const { getRegistrationPages } = require("./utils/getRegistrationPages")

const { flattenNode } = require("../arrays")

const ALL_ENROLLMENT_FIELDS_QUERY = `
  query AirtableVaccineeFormFields {
    allAirtableallFormFields(filter: {data: {Show_On_Website: {eq: true}}}, sort: {fields: data___Order, order: ASC}) {
      nodes {
        data {
          Type
          Required
          Name
          Add_Divider_After_Field
          Field_Names
          Follow_Up_Questions
          Date_Config
          Follow_Up_Questions_Name
          Is_Follow_Up_Question
          Label
          Module
          Min
          Options
          Order
          Pattern
          Placeholder
          Reference_Answer
          Reference_Question
          Reference_Question_Name
          Restricted_Option
          Section
          Section_ID
          Max_Length
          Section_Order
          Sub_Module
          Section_Message
          Show_On_Website
          Validation
          Helper
          Alternate_Option
          Vaccine_Inclusions
        }
      }
    }
  }
`

const createRegistrationPages = (createPage, graphql) => {
  return new Promise(async (resolve, reject) => {
    try {
      let queryResult = await graphql(ALL_ENROLLMENT_FIELDS_QUERY)
      let formFields = flattenNode(queryResult.data.allAirtableallFormFields)
      let registrationPages = getRegistrationPages()

      let numberOfPages = registrationPages?.length

      registrationPages.map((registrationPage, index) => {
        createPage({
          path: registrationPage.path,
          component: path.resolve(registrationPage.componentPath),
          context: {
            numberOfPages,
            progress: index + 1,
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
        `%cError (createVaccineePages): ${error}`,
        "background-color:#d84544; font-color:white;"
      )
    }
  })
}

module.exports = { createRegistrationPages }
