const path = require("path")
const { getVaccineesPages } = require("./utils/getVaccineesPages")

const { flattenNode } = require("../arrays")

const ALL_ENROLLMENT_FIELDS_QUERY = `
  query AirtableVaccineeFormFields {
    allAirtableallFormFields {
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
          Other_Schedule_Names
        }
      }
    }
  }
`

const createVaccineesPages = (createPage, graphql) => {
  return new Promise(async (resolve, reject) => {
    try {
      let queryResult = await graphql(ALL_ENROLLMENT_FIELDS_QUERY)
      let formFields = flattenNode(queryResult.data.allAirtableallFormFields)
      let vaccineesPages = getVaccineesPages()
      vaccineesPages.map((vaccineesPage) => {
        createPage({
          path: vaccineesPage.path,
          component: path.resolve(vaccineesPage.componentPath),
          context: {
            ...vaccineesPage.context,
            formFields: formFields.filter(
              (formField) => formField.module === vaccineesPage.formModule
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

module.exports = { createVaccineesPages }
