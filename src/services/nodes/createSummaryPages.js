const path = require("path")
const { getSummaryPages } = require("./utils/getSummaryPages")

const { flattenNode } = require("../arrays")

const ALL_FORM_FIELDS_SUMMARY_QUERY = `
  query AirtableFormFieldsSummary {
    allAirtableallFormFields(filter: {data: { Show_On_Website: {eq: true}}}){
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
          Sub_Module
          Options
          Order
          Reference_Answer
          Reference_Question
          Reference_Question_Name
          Section
          Section_ID
          Section_Message
          Show_On_Website
          Validation
          Other_Schedule_Names
          Summary_Section
          Summary_Label
          Section_Order
          Section_Link
          Min_Length
        }
      }
    }
  }
`

const createSummaryPages = (createPage, graphql) => {
  return new Promise(async (resolve, reject) => {
    try {
      let queryResult = await graphql(ALL_FORM_FIELDS_SUMMARY_QUERY)
      let formFields = flattenNode(queryResult.data.allAirtableallFormFields)
      let summaryPages = getSummaryPages()
      summaryPages.map((summaryPage) => {
        createPage({
          path: summaryPage.path,
          component: path.resolve(summaryPage.componentPath),
          context: {
            ...summaryPage.context,
            summaryFields: formFields.filter(
              (formField) =>
                !!formField.summaryLabel &&
                formField.subModule === summaryPage.subModule
            ),
            formFields: formFields.filter(
              (formField) => formField.module === summaryPage.formModule
            ),
          },
        })
      })

      resolve()
    } catch (error) {
      reject(error)
      console.log(
        `%cError (createSummaryPages): ${error}`,
        "background-color:#d84544; font-color:white;"
      )
    }
  })
}

module.exports = { createSummaryPages }
