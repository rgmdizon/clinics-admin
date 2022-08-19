const path = require("path")
const { getScreeningPages } = require("./utils/getScreeningPages")

const { flattenNode } = require("../arrays")

const ALL_SCREENING_VIEW_FORM_FIELDS_QUERY = `
  query AirtableAirtableScreeningFormFieldsFormFields {
    allAirtableallFormFields(
      filter: {
        data: {
          Show_On_Website: { eq: true }
        }
      }
    ) {
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
          Date_Config
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
          Subdomain
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

const createScreeningPages = (createPage, graphql) => {
  return new Promise(async (resolve, reject) => {
    try {
      let queryResult = await graphql(ALL_SCREENING_VIEW_FORM_FIELDS_QUERY)
      let formFields = flattenNode(queryResult.data.allAirtableallFormFields)
      let screeningPages = getScreeningPages()
      screeningPages.map((screeningPage) => {
        createPage({
          path: screeningPage.path,
          component: path.resolve(screeningPage.componentPath),
          context: {
            ...screeningPage.context,
            formFields: formFields.filter((formField) =>
              screeningPage.formModule.includes(formField.module)
            ),
          },
        })
      })

      resolve()
    } catch (error) {
      reject(error)
      console.log(
        `%cError (createScreeningPages): ${error}`,
        "background-color:#d84544; font-color:white;"
      )
    }
  })
}

module.exports = { createScreeningPages }
