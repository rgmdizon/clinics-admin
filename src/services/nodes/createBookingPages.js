const path = require("path")
const { getBookingPages } = require("./utils/getBookingPages")

const { flattenNode } = require("../arrays")

const ALL_ENROLLMENT_FIELDS_QUERY = `
  query AirtableBookingFormFields {
    allAirtableallFormFields (
      filter: {
        data: {
          Show_On_Website: { eq: true }
        }
      }
    ){
      nodes {
        data {
          Type
          Required
          Name
          Date_Config
          Add_Divider_After_Field
          Field_Names
          Follow_Up_Questions
          Follow_Up_Questions_Name
          Is_Follow_Up_Question
          Initial_Values
          Label
          Module
          Min
          Max
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
          Show_On_Website
          Validation
          Other_Schedule_Names
        }
      }
    }
  }
`

const createBookingPages = (createPage, graphql) => {
  return new Promise(async (resolve, reject) => {
    try {
      let queryResult = await graphql(ALL_ENROLLMENT_FIELDS_QUERY)
      let formFields = flattenNode(queryResult.data.allAirtableallFormFields)
      let bookingPages = getBookingPages()
      bookingPages.map((bookingPage) => {
        createPage({
          path: bookingPage.path,
          component: path.resolve(bookingPage.componentPath),
          context: {
            ...bookingPage.context,
            formFields: formFields.filter(
              (formField) => formField.module === bookingPage.formModule
            ),
          },
        })
      })

      resolve()
    } catch (error) {
      reject(error)
      console.log(
        `%cError (createBookingPages): ${error}`,
        "background-color:#d84544; font-color:white;"
      )
    }
  })
}

module.exports = { createBookingPages }
